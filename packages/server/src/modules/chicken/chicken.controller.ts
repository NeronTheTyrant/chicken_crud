import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChickenService } from './chicken.service';
import { CreateChickenDto } from './dto/create-chicken.dto';
import { UpdateChickenDto } from './dto/update-chicken.dto';

@Controller('chicken')
export class ChickenController {
  constructor(private readonly chickenService: ChickenService) {}

  @Post()
  create(@Body() createChickenDto: CreateChickenDto) {
    return this.chickenService.create(createChickenDto);
  }

  @Get()
  findAll() {
    return this.chickenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chickenService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChickenDto: UpdateChickenDto) {
    return this.chickenService.update(+id, updateChickenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chickenService.remove(+id);
  }
}
