import { Resolver } from '@nestjs/graphql';
import { HeaderService } from './header.service';
import { Header } from './entities/header.entity';

@Resolver(() => Header)
export class HeaderResolver {
  constructor(private readonly headerService: HeaderService) {}
}
