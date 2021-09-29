import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Player } from './entities/player.entity';
import { Stadium } from './entities/stadium.entity';
import { PlayerService } from './player/player.service';
import { StadiumService } from './stadium/stadium.service';
import { PlayersController } from './players/players.controller';
import { StadiumsController } from './stadiums/stadiums.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: 'nestappclub2',
      username: 'root',
      password: 'root',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Player, Stadium]),
  ],
  controllers: [AppController, PlayersController, StadiumsController],
  providers: [AppService, PlayerService, StadiumService],
})
export class AppModule {}
