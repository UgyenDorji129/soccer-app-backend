import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PlayerDto } from './dto/player.dto';
import { Model } from 'mongoose';
import { TeamDto } from './dto/team.dto';
import { MatchDto } from './dto/match.dto';
import { DetailsDto } from './dto/details.dto';
import { ObjectId } from 'mongodb';
import { Request } from 'express';


@Injectable()
export class MatchesService {
    
    constructor(
        @InjectModel("Player") private readonly playerModel: Model<any>,
        @InjectModel("Match") private readonly matchModel: Model<any>,
        @InjectModel("Team") private readonly teamModel: Model<any>,
        @InjectModel("Details") private readonly detailsModel: Model<any>,
        @InjectModel("Betting") private readonly bettingModel: Model<any>,
    ){}

    getYearAndMonth(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.toLocaleString('default', { month: 'long' });
      
        return { year, month };
      }

    getDayDateMonth(dateString) {
        const date = new Date(dateString);
        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const day = daysOfWeek[date.getUTCDay()];
        const dateOfMonth = date.getUTCDate();
        const month = date.toLocaleString('default', { month: 'short' });
      
        return { day, date: dateOfMonth, month };
      }

    getTimeFromDate(dateString) {
        const date = new Date(dateString);
        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      
        return formattedTime;
      }

    async createMatch(teamOne: TeamDto, teamTwo:TeamDto, match : MatchDto, details : DetailsDto, playerOne : PlayerDto[], playerTwo : PlayerDto[]){
        try{
            const teamOneId = await this.makeTeam(teamOne);
            const teamTwoId = await this.makeTeam(teamTwo);
            
            await this.makePlayer(playerOne, teamOneId);
            await this.makePlayer(playerTwo, teamTwoId);

            const matchId = await this.makeMatch(teamOneId, teamTwoId, match);
            await this.makeMatchDetails(matchId, details);
            return{
                message:"Match Created",
                success: true
            }
        }
        catch(e){
            return{
                message:"Match Not Created" + e,
                success: false
            }
        }
    }

    async makeTeam(teams : TeamDto){
        const newTeam = await new this.teamModel({ name: teams.name, logo: teams.logo }).save();
        return await newTeam._id;
    }

    async makePlayer(players : PlayerDto[], teamId: string){
        for(let i = 0; i < players.length; i++){
            const newPlayer = await new this.playerModel({name: players[i].name, tshirt: players[i].tshirt, teamId: teamId}).save()
        }
    }

    async makeMatch(teamOneId : string, teamTwoId : string, match){
        const newMatch = await new this.matchModel({category: match.category, league: match.league, teamOneId : teamOneId, teamTwoId: teamTwoId, referee: match.referee, linesMenOne: match.linesMenOne, linesMenTwo: match.linesMenTwo}).save();
        return await newMatch._id;
    }

    async makeMatchDetails(matchId:string, details:DetailsDto){
        const newDetails = await new this.detailsModel({
            stadium: details.stadium,
            time: details.time,
            status: details.status,
            goal: details.goal,
            matchId: matchId
        }).save();
    }

    async getAllMatches(){
        try{
            const matches = await this.matchModel.find();
            const matchesDetail = []
            for(let i = 0; i < matches.length; i++){
                const detail = await this.detailsModel.findOne({matchId:matches[i]._id});
                matchesDetail.push(detail)
            }
            const teamOne = []
            for(let i = 0; i < matches.length; i++){
                const detail = await this.teamModel.findOne({_id:matches[i].teamOneId});
                teamOne.push(detail)
            }
            const teamTwo = []
            for(let i = 0; i < matches.length; i++){
                const detail = await this.teamModel.findOne({_id:matches[i].teamTwoId});
                teamTwo.push(detail)
            }

            const result = []
            for(let i = 0; i < matches.length; i++){
                const data = {
                    matchId: matchesDetail[i]._id,
                    stadium: matchesDetail[i].stadium,
                    year_month : this.getYearAndMonth(matchesDetail[i].time),
                    dayDateMonth: this.getDayDateMonth(matchesDetail[i].time),
                    teamOne: teamOne[i].name,
                    teamOneLogo: teamOne[i].logo,
                    teamTwo: teamTwo[i].name,
                    teamTwoLogo: teamTwo[i].logo,
                    time: this.getTimeFromDate(matchesDetail[i].time)
                }
                result.push(data);
            }
            return {
                success:true,
                data: result
            }
        }
        catch(e){
            return{
                success:false,
                message:e
            }
        }
    }
    

    async getMatchById(id:string){
        try{
            const _id = new ObjectId(id);
            const match = await this.matchModel.findOne({_id:_id});
            const detail = await this.detailsModel.findOne({matchId:match._id});
            const teamOne = await this.teamModel.findOne({_id: match.teamOneId});
            const teamTwo = await this.teamModel.findOne({_id: match.teamTwoId});
            return{
                success: true,
                match: match,
                detail: detail,
                teamOne: teamOne,
                teamTwo: teamTwo
            }
        }
        catch(e){
            return {
                success: false,
                message: e
            }
        }
    }

    async makeBetting(userId:string, matchId : string, prediction : string, amount: string){
        try{
            const betting = await new this.bettingModel({
                userId,
                matchId,
                prediction,
                amount
            }).save();
            return {
                message:betting,
                success: true
            }
        }catch(e){
            return {
                message: e,
                success: false
            }
        }

    }

    async isBetted(userId: string, matchId:string){
        try{
            const res = await this.bettingModel.findOne({userId, matchId});
            if(res){
                return {
                    success: true,
                    data: res.prediction
                }
            }
        }catch(e){
            return{
                success:false,
                message:e
            }
        }
    }

}
