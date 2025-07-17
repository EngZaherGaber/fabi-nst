import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Header } from './header.schema';
import { Model } from 'mongoose';

@Injectable()
export class HeaderService {
  constructor(@InjectModel(Header.name) private headerModel: Model<Header>) {}
}
