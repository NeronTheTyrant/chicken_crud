import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotAcceptableResponse, ApiOkResponse, ApiPreconditionFailedResponse, ApiTags } from '@nestjs/swagger';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { CoopService } from './coop.service';
import { CreateCoopDto } from './dto/create-coop.dto';
import { UpdateCoopDto } from './dto/update-coop.dto';

@ApiTags('coop')
@Controller('coop')
export class CoopController {
  constructor(private readonly coopService: CoopService) { }

  @Post()
  @ApiCreatedResponse({ description: 'Coop object is created' })
  @ApiNotAcceptableResponse({ description: 'Unique field not available' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  create(@Body() createCoopDto: CreateCoopDto) {
    try {
      return this.coopService.create(createCoopDto);
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
  @ApiOkResponse({ description: 'All Coop objects are returned' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  findAll() {
    try {
      return this.coopService.findAll();
    }
    catch (err) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Coop object is returned' })
  @ApiPreconditionFailedResponse({ description: 'Record not found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  findOne(@Param('id') id: string) {
    try {
      return this.coopService.findOne(+id);
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
  @ApiOkResponse({ description: 'Coop object is updated' })
  @ApiPreconditionFailedResponse({ description: 'Record not found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  update(@Param('id') id: string, @Body() updateCoopDto: UpdateCoopDto) {
    try {
      return this.coopService.update(+id, updateCoopDto);
    }
    catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2025')
          throw new HttpException('Record not found', HttpStatus.PRECONDITION_FAILED);
      }
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Coop object is deleted' })
  @ApiPreconditionFailedResponse({ description: 'Record not found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  remove(@Param('id') id: string) {
    try {
      return this.coopService.remove(+id);
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
