import { Injectable } from '@nestjs/common';
import { CreateHeaderInput } from './dto/create-header.input';
import { UpdateHeaderInput } from './dto/update-header.input';
import { CheckHeaderInput } from './dto/check-header.input';
import { CheckHeaderOutput } from './dto/check-header.output';
import { InjectModel } from '@nestjs/mongoose';
import { Header, HeaderSchema } from './header.schema';
import { Model } from 'mongoose';

@Injectable()
export class HeaderService {
  constructor(@InjectModel(Header.name) private headerModel: Model<Header>) {}

  create(createHeaderInput: CreateHeaderInput) {
    return 'This action adds a new header';
  }

  findAll() {
    return `This action returns all header`;
  }

  findOne(id: number) {
    return `This action returns a #${id} header`;
  }

  update(id: number, updateHeaderInput: UpdateHeaderInput) {
    return `This action updates a #${id} header`;
  }

  remove(id: number) {
    return `This action removes a #${id} header`;
  }
}
