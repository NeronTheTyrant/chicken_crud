import { ImATeapotException, Injectable, NotAcceptableException, PreconditionFailedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../prisma/prisma.service';
import { CreateChickenDto } from './dto/create-chicken.dto';
import { UpdateChickenDto } from './dto/update-chicken.dto';

@Injectable()
export class ChickenService {
  constructor(private readonly prisma: PrismaService) { }

  create(createChickenDto: CreateChickenDto) {
    const { coopId, ...dto } = createChickenDto
    const createInput: Prisma.chickenCreateInput = dto;
    if (coopId !== undefined) {
      createInput.coop = {
        connect: { id: coopId }
      }
    }
    try {
      return this.prisma.chicken.create({ data: createInput });
    }
    catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002')
          throw new NotAcceptableException('Unique field not avalaible');
      }
      throw new ImATeapotException('Something unexpected happened');
    }
  }

  findAll() {
    return this.prisma.chicken.findMany()
  }

  findOne(id: number) {
    try {

      return this.prisma.chicken.findUnique({
        where: { id }
      })
    }
    catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2025')
          throw new PreconditionFailedException('Record not found');
      }
      throw new ImATeapotException('Something unexpected happened');
    }
  }

  update(id: number, updateChickenDto: UpdateChickenDto) {
    const { coopId, ...dto } = updateChickenDto
    const updateInput: Prisma.chickenUpdateInput = dto;
    if (coopId !== undefined) {
      updateInput.coop = {
        connect: { id: coopId }
      }
    }
    try {
      return this.prisma.chicken.update(
        {
          where: { id },
          data: updateChickenDto
        }
      )
    }
    catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2025')
          throw new PreconditionFailedException('Record not found');
        else if (err.code === 'P2002')
          throw new NotAcceptableException('Unique field not avalaible');
      }
      throw new ImATeapotException('Something unexpected happened');
    }
  }

  updateOrCreate(id: number, createChickenDto: CreateChickenDto) {
    try {
      return this.prisma.chicken.upsert({
        where: { id },
        create: createChickenDto,
        update: createChickenDto
      });
    }
    catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2025')
          throw new PreconditionFailedException('Record not found');
        else if (err.code === 'P2002')
          throw new NotAcceptableException('Unique field not avalaible');
      }
      throw new ImATeapotException('Something unexpected happened');
    }
  }

  remove(id: number) {
    try {
      return this.prisma.chicken.delete({ where: { id } })
    }
    catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2025')
          throw new PreconditionFailedException('Record not found');
        else if (err.code === 'P2002')
          throw new NotAcceptableException('Unique field not avalaible');
      }
      throw new ImATeapotException('Something unexpected happened');
    }
  }

  run(id: number) {
    console.log("hello")
    try {
      return this.prisma.chicken.update({
        where: { id },
        data: { steps: { increment: 1 }, isRunning: true }
      })
    }
    catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2025')
          throw new PreconditionFailedException('Record not found');
        else if (err.code === 'P2002')
          throw new NotAcceptableException('Unique field not avalaible');
      }
      throw new ImATeapotException('Something unexpected happened');
    }
  }
}
