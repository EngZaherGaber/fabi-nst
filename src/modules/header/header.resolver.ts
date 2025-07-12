import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { HeaderService } from './header.service';
import { Header } from './entities/header.entity';
import { CreateHeaderInput } from './dto/create-header.input';
import { UpdateHeaderInput } from './dto/update-header.input';

@Resolver(() => Header)
export class HeaderResolver {
  constructor(private readonly headerService: HeaderService) {}

  @Mutation(() => Header)
  createHeader(@Args('createHeaderInput') createHeaderInput: CreateHeaderInput) {
    return this.headerService.create(createHeaderInput);
  }

  @Query(() => [Header], { name: 'header' })
  findAll() {
    return this.headerService.findAll();
  }

  @Query(() => Header, { name: 'header' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.headerService.findOne(id);
  }

  @Mutation(() => Header)
  updateHeader(@Args('updateHeaderInput') updateHeaderInput: UpdateHeaderInput) {
    return this.headerService.update(updateHeaderInput.id, updateHeaderInput);
  }

  @Mutation(() => Header)
  removeHeader(@Args('id', { type: () => Int }) id: number) {
    return this.headerService.remove(id);
  }
}
