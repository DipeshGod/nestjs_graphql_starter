import { ObjectType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
@ObjectType()
export class Institution {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ unique: true, required: true })
  @Field(() => String, { description: 'Name of the institutition' })
  name: string;

  @Prop()
  @Field(() => String, { description: 'Description of the institutition' })
  description: string;
}

export const InstitutionSchema = SchemaFactory.createForClass(Institution);
