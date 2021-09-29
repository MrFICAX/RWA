import { PlayerService } from 'src/player/player.service';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { Player } from 'src/entities/player.entity';

@Controller('players')
export class PlayersController {
  constructor(private playerService: PlayerService) {}

  @Get()
  read(): Promise<Player[]> {
    return this.playerService.readAll();
  }

  @Post('create')
  async create(@Body() player: Player): Promise<any> {
    return this.playerService.create(player);
  }
//   @Post('createAll')
//   async createAll(@Body() player: Player[]): Promise<any> {
//     player.forEach(e => this.playerService.create(e));
//   }

  @Put(':id/update')
  async update(@Param('id') id, @Body() player: Player): Promise<any> {
    player.id = Number(id);
    return this.playerService.update(player);
  }

  @Put(':id/updateLikes')
  async updateLikes(@Param('id') id, @Body() likes: number): Promise<any> {
    console.log("KRECEM SA UPDATE LIKE");
    return this.playerService.updateLikes(Number(id), likes);
  }

  @Put(':id/updateDislikes')
  async updateDislikes(@Param('id') id, @Body() DislikesValue: number): Promise<any> {
    return this.playerService.updateDislikes(Number(id), DislikesValue);

  }

  @Delete(':id/delete')
  async delete(@Param('id') id): Promise<any> {
    return this.playerService.delete(id);
  }
}
