import { Injectable } from '@nestjs/common';
import { CreateCoopDto } from './dto/create-coop.dto';
import { UpdateCoopDto } from './dto/update-coop.dto';

@Injectable()
export class CoopService {
  create(createCoopDto: CreateCoopDto) {
    return 'This action adds a new coop';
  }

  findAll() {
    return `This action returns all coop`;
  }

  findOne(id: number) {
    return `This action returns a #${id} coop`;
  }

  update(id: number, updateCoopDto: UpdateCoopDto) {
    return `This action updates a #${id} coop`;
  }

  remove(id: number) {
    return `This action removes a #${id} coop`;
  }
}
