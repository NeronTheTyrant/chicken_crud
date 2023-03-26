import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put, NotFoundException, HttpStatus, HttpException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ChickenService } from './chicken.service';
import { CreateChickenDto } from './dto/create-chicken.dto';
import { UpdateChickenDto } from './dto/update-chicken.dto';
import { ApiTags, ApiCreatedResponse, ApiPreconditionFailedResponse, ApiNotAcceptableResponse, ApiOkResponse, ApiBadRequestResponse } from '@nestjs/swagger'

@ApiTags('chicken')
@Controller('chicken')
export class ChickenController {
  constructor(private readonly chickenService: ChickenService) { }

  @Post()
  @ApiCreatedResponse({ description: 'Chicken object is created' })
  @ApiNotAcceptableResponse({ description: 'Unique field not available' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  create(@Body() createChickenDto: CreateChickenDto) {
    try {
      return this.chickenService.create(createChickenDto);
    }
    catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002')
          throw new HttpException('Unique field not avalaible', HttpStatus.NOT_ACCEPTABLE);
      }
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @ApiOkResponse({ description: 'All Chicken objects are returned' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  findAll() {
    try {
      return this.chickenService.findAll();
    }
    catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      }
    }
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Chicken object is returned' })
  @ApiPreconditionFailedResponse({ description: 'Record not found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  findOne(@Param('id', new ParseIntPipe) id: number) {
    try {
      return this.chickenService.findOne(+id);
    }
    catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2025')
          throw new HttpException('Record not found', HttpStatus.PRECONDITION_FAILED);
      }
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Chicken object is updated' })
  @ApiPreconditionFailedResponse({ description: 'Record not found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  update(@Param('id', new ParseIntPipe) id: number, @Body() updateChickenDto: UpdateChickenDto) {
    try {
      return this.chickenService.update(+id, updateChickenDto);
    }
    catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2025')
          throw new HttpException('Record not found', HttpStatus.PRECONDITION_FAILED);
      }
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Chicken object is either updated or created' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  updateOrCreate(@Param('id', new ParseIntPipe) id: number, @Body() createChickenDto: CreateChickenDto) {
    try {
      return this.chickenService.updateOrCreate(+id, createChickenDto);
    }
    catch (err) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Chicken object is deleted' })
  @ApiPreconditionFailedResponse({ description: 'Record not found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  remove(@Param('id', new ParseIntPipe) id: number) {
    try {
      return this.chickenService.remove(+id);
    }
    catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2025')
          throw new HttpException('Record not found', HttpStatus.PRECONDITION_FAILED);
      }
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @Patch('/run/:id')
  @ApiOkResponse({ description: "Chicken object's 'step' attribute is incremented, and its 'isRunning' attribute is set to true" })
  @ApiPreconditionFailedResponse({ description: 'Record not found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  run(@Param('id', new ParseIntPipe) id: number) {
    try {
      return this.chickenService.run(+id);
    }
    catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2025')
          throw new HttpException('Record not found', HttpStatus.PRECONDITION_FAILED);
      }
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
}
