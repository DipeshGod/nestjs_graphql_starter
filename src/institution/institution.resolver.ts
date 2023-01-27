import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Institution } from './entities/institution';
import { InstitutionService } from './institution.service';
import { CreateInstitutionInput } from './dtos/create-institution.input';
import { UpdateInstitutionInput } from './dtos/update-institution.input';

@Resolver(() => Institution)
export class InstitutionResolver {
  constructor(private readonly institutionService: InstitutionService) {}

  @Query(() => [Institution])
  async findAllInstitutions() {
    return this.institutionService.findAllInstitutions();
  }

  @Query(() => Institution)
  async findInstitutionById(
    @Args('institutionId') institutionId: string,
  ): Promise<Institution> {
    return this.institutionService.findInstitutionById(institutionId);
  }

  @Mutation(() => Institution)
  async createInstitution(
    @Args('createInstiutionInput')
    createInstitutionInput: CreateInstitutionInput,
  ) {
    return this.institutionService.createInstitution(createInstitutionInput);
  }

  @Mutation(() => Institution)
  async updateInstitution(
    @Args('id') id: string,
    @Args('updateInstitutionInput')
    updateInstitutionInput: UpdateInstitutionInput,
  ) {
    return this.institutionService.updateInstitution(
      id,
      updateInstitutionInput,
    );
  }

  @Mutation(() => Institution)
  async deleteInstitution(@Args('institutionId') institutionId: string) {
    return this.institutionService.deleteInstitution(institutionId);
  }
}
