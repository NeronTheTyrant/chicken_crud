import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateChickenDto } from './dto/create-chicken.dto';
import { UpdateChickenDto } from './dto/update-chicken.dto';

@Injectable()
export class ChickenService {
  constructor(private readonly prisma: PrismaService) { }

  create(createChickenDto: CreateChickenDto) {
    const { coopName, ...dto } = createChickenDto
    const createInput: Prisma.chickenCreateInput = dto;
    if (coopName) {
      createInput.coop = {
        connect: { name: coopName }
      }
    }
    return this.prisma.chicken.create({ data: createInput });
    // return 'This action adds a new chicken';
  }

  findAll() {
    return `This action returns all chicken`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chicken`;
  }

  update(id: number, updateChickenDto: UpdateChickenDto) {
    return `This action updates a #${id} chicken`;
  }

  remove(id: number) {
    return `This action removes a #${id} chicken`;
  }
}
