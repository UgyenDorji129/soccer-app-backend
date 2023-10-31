import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
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

  @UseGuards(JwtAuthGuard)
  @Get("match/:id")
  getMatchById(@Param() id: string){
    return this.matchesService.getMatchById(id);
  }


}
