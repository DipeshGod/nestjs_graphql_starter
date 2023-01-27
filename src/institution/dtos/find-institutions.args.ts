import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class FindInstitutionsArgs {
  @Field({ nullable: true })
  search?: string;

  @Field({ nullable: true })
  sort?: string;

  @Field({ defaultValue: 0 })
  skip?: number;

  @Field({ defaultValue: 10 })
  take?: number;
}
