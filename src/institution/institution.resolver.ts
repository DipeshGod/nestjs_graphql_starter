import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Institution } from './entities/institution';
import { InstitutionService } from './institution.service';
import { CreateInstitutionInput } from './dtos/create-institution.input';

@Resolver(() => Institution)
export class InstitutionResolver {
  constructor(private readonly institutionService: InstitutionService) {}

  @Query(() => [Institution])
  findAllInstitutions() {
    return this.institutionService.findAllInstitutions();
  }

  @Mutation(() => Institution)
  createInstitution(
    @Args('createInstiutionInput')
    createInstitutionInput: CreateInstitutionInput,
  ) {
    return this.institutionService.createInstitution(createInstitutionInput);
  }
}
