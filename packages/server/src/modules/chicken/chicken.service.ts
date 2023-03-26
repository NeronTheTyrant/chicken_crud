import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
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
    return this.prisma.chicken.create({ data: createInput });
  }

  findAll() {
    return this.prisma.chicken.findMany()
  }

  findOne(id: number) {
    return this.prisma.chicken.findUnique({
      where: { id }
    })
  }

  update(id: number, updateChickenDto: UpdateChickenDto) {
    const { coopId, ...dto } = updateChickenDto
    const updateInput: Prisma.chickenUpdateInput = dto;
    if (coopId !== undefined) {
      updateInput.coop = {
        connect: { id: coopId }
      }
    }
    return this.prisma.chicken.update(
      {
        where: { id },
        data: updateChickenDto
      }
    )
  }

  updateOrCreate(id: number, createChickenDto: CreateChickenDto) {
    return this.prisma.chicken.upsert({
      where: { id },
      create: createChickenDto,
      update: createChickenDto
    });
  }

  remove(id: number) {
    return this.prisma.chicken.delete({ where: { id } })
  }

  run(id: number) {
    return this.prisma.chicken.update({
      where: { id },
      data: { steps: { increment: 1 }, isRunning: true }
    })
  }
}
