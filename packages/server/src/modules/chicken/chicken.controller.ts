import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { ChickenService } from './chicken.service';
import { CreateChickenDto } from './dto/create-chicken.dto';
import { UpdateChickenDto } from './dto/update-chicken.dto';

@Controller('chicken')
export class ChickenController {
  constructor(private readonly chickenService: ChickenService) { }

  @Post()
  create(@Body() createChickenDto: CreateChickenDto) {
    return this.chickenService.create(createChickenDto);
  }

  @Get()
  findAll() {
    return this.chickenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe) id: number) {
    return this.chickenService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', new ParseIntPipe) id: number, @Body() updateChickenDto: UpdateChickenDto) {
    return this.chickenService.update(+id, updateChickenDto);
  }

  @Put(':id')
  updateOrCreate(@Param('id', new ParseIntPipe) id: number, @Body() createChickenDto: CreateChickenDto) {
    return this.chickenService.updateOrCreate(+id, createChickenDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe) id: number) {
    return this.chickenService.remove(+id);
  }

  @Patch('/run/:id')
  run(@Param('id', new ParseIntPipe) id: number) {
    return this.chickenService.run(+id);
  }
}
