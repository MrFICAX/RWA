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
  async create(@Body() contact: Player): Promise<any> {
    return this.playerService.create(contact);
  }
//   @Post('createAll')
//   async createAll(@Body() contact: Player[]): Promise<any> {
//     contact.forEach(e => this.playerService.create(e));
//   }

  @Put(':id/update')
  async update(@Param('id') id, @Body() contact: Player): Promise<any> {
    contact.id = Number(id);
    return this.playerService.update(contact);
  }

  @Delete(':id/delete')
  async delete(@Param('id') id): Promise<any> {
    return this.playerService.delete(id);
  }
}
