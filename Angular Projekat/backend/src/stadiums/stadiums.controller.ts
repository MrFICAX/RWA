import { Controller, Get, Post,Put, Delete, Body, Param } from '@nestjs/common';
import { StadiumService } from 'src/stadium/stadium.service';
import { Stadium } from 'src/entities/stadium.entity';

@Controller('stadiums')
export class StadiumsController {
    constructor(private stadiumService: StadiumService){
    }

    @Get()
    read(): Promise<Stadium[]> {
      return this.stadiumService.readAll();
    }
    
    @Post('create')
    async create(@Body() contact: Stadium): Promise<any> {
      return this.stadiumService.create(contact);
    }  
    
    @Put(':id/update')
    async update(@Param('id') id, @Body() contact: Stadium): Promise<any> {
        contact.id = Number(id);
        return this.stadiumService.update(contact);
    }  
    
    @Delete(':id/delete')
    async delete(@Param('id') id): Promise<any> {
      return this.stadiumService.delete(id);
    }
}
