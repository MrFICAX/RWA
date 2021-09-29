/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Player } from 'src/entities/player.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) {}

  async create(player: Player): Promise<Player> {
    return await this.playerRepository.save(player);
  }

  async readAll(): Promise<Player[]> {
    return await this.playerRepository.find();
  }

  async update(player: Player): Promise<Player> {
    await this.playerRepository.update(player.id, player);
    return player;
  }

  async updateLikes(id: number, likes: number): Promise<Player>{
    console.log("STIGAO SAM DO SERVISA NA BACKENDU");
    
    const property = await this.playerRepository.findOne({
      where: { id }
    });
    console.log(property);
    
    return this.playerRepository.save({
      ...property, // existing fields
      likes: likes // updated fields
    });
  }

  async updateDislikes(playerId: number, DislikesValue: number): Promise<Player>{
    const property = await this.playerRepository.findOne({
      where: { id:playerId }
    });
    
    return this.playerRepository.save({
      ...property, // existing fields
      dislikes: DislikesValue // updated fields
    });
  }

  async delete(id): Promise<DeleteResult> {
     await this.playerRepository.delete(id);
    return id;
    }
}
