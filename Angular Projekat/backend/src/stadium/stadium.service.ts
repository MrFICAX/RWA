import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult } from  'typeorm';
import { Stadium } from 'src/entities/stadium.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StadiumService {
    constructor(
        @InjectRepository(Stadium)
        private stadiumRepository: Repository<Stadium>
    ) { }

    async create(stadium: Stadium): Promise<Stadium> {
        return await this.stadiumRepository.save(stadium);
    }
    
    async  readAll(): Promise<Stadium> {
        return await this.stadiumRepository.findOneOrFail();
    }

    async update(stadium: Stadium): Promise<UpdateResult> {

        return await this.stadiumRepository.update(stadium.id,stadium);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.stadiumRepository.delete(id);
    }
}
