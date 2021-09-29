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

  async update(player: Player): Promise<UpdateResult> {
    return await this.playerRepository.update(player.id, player);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.playerRepository.delete(id);
  }
}
