import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateInstitutionInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;
}
