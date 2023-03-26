import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCoopDto } from './dto/create-coop.dto';
import { UpdateCoopDto } from './dto/update-coop.dto';

@Injectable()
export class CoopService {
  constructor(private readonly prisma: PrismaService) { }

  create(createCoopDto: CreateCoopDto) {
    return this.prisma.coop.create({ data: createCoopDto, include: { chickens: true } });
  }

  findAll() {
    return this.prisma.coop.findMany({ include: { chickens: true } });
  }

  findOne(id: number) {
    return this.prisma.coop.findUnique({ where: { id }, include: { chickens: true } });
  }

  update(id: number, updateCoopDto: UpdateCoopDto) {
    return this.prisma.coop.update({ where: { id }, data: updateCoopDto, include: { chickens: true } });
  }

  remove(id: number) {
    return this.prisma.coop.delete({ where: { id } });
  }
}
