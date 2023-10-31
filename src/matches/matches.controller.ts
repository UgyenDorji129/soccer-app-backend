import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { TeamDto } from './dto/team.dto';
import { MatchDto } from './dto/match.dto';
import { DetailsDto } from './dto/details.dto';
import { PlayerDto } from './dto/player.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}
  

  @Post("match")
  addMatch(
    @Body("teamOne") teamOne: TeamDto,
    @Body("teamTwo") teamTwo: TeamDto,
    @Body("match") match : MatchDto,
    @Body("details") details : DetailsDto,
    @Body("playerOne") playerOne : PlayerDto[],
    @Body("playerTwo") playerTwo: PlayerDto[]
  ){
    return this.matchesService.createMatch(teamOne, teamTwo, match, details, playerOne, playerTwo);
  }

  @Get("allmatches")
  getAllMatches(){
    return this.matchesService.getAllMatches();
  }

  @Get("match/:id")
  getMatchById(@Param() id: string){
    return this.matchesService.getMatchById(id);
  }

  @Post("/bettings")
  makeBetting(
    @Req() req:any,
    @Body("matchId") matchId: string,
    @Body("prediction") prediction : string,
    @Body("amount") amount :  string
  ){
    return this.matchesService.makeBetting(req.userId, matchId, prediction, amount);
  }

  @Post("/isBetted")
  isBetted(
    @Req() req:any,
    @Body("matchId") matchId: string,
  ){
    return this.matchesService.isBetted(req.userId, matchId);
  }

  @Post("/booking")
  makeBooking(
    @Req() req:any,
    @Body("matchId") matchId: string,){
    return this.matchesService.makeBooking(req.userId, matchId);
  }

  @Post("/isBooked")
  isBooked(
    @Req() req:any,
    @Body("matchId") matchId: string,
  ){
    return this.matchesService.isBooked(req.userId, matchId);
  }


}
