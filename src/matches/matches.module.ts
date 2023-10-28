import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { PlayerSchema } from './models/player.model';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamSchema } from './models/team.model';
import { MatchSchema } from './models/match.model';
import { DetailSchema } from './models/details.model';

@Module({
  imports:[
    MongooseModule.forFeature([{name: 'Player', schema: PlayerSchema}]),
    MongooseModule.forFeature([{name: 'Team', schema: TeamSchema}]),
    MongooseModule.forFeature([{name: 'Match', schema: MatchSchema}]),
    MongooseModule.forFeature([{name: 'Details', schema: DetailSchema}]),
  ],
  controllers: [MatchesController],
  providers: [MatchesService],
})
export class MatchesModule {}
