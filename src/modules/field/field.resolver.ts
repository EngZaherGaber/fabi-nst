import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FieldService } from './field.service';
import { CreateFieldInput } from './dto/create-field.input';
import { UpdateFieldInput } from './dto/update-field.input';
import { Field } from './field.schema';

@Resolver(() => Field)
export class FieldResolver {
  constructor(private readonly fieldService: FieldService) {}

  @Mutation(() => Field)
  createField(@Args('createFieldInput') createFieldInput: CreateFieldInput) {
    return this.fieldService.create(createFieldInput);
  }

  @Query(() => [Field], { name: 'field' })
  findAll() {
    return this.fieldService.findAll();
  }

  @Query(() => Field, { name: 'field' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.fieldService.findOne(id);
  }

  @Mutation(() => Field)
  updateField(@Args('updateFieldInput') updateFieldInput: UpdateFieldInput) {
    return this.fieldService.update(updateFieldInput.id, updateFieldInput);
  }

  @Mutation(() => Field)
  removeField(@Args('id', { type: () => Int }) id: number) {
    return this.fieldService.remove(id);
  }
}
