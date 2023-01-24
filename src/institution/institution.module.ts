import { Module } from '@nestjs/common';
import { InstitutionResolver } from './institution.resolver';
import { InstitutionService } from './institution.service';
import { Institution, InstitutionSchema } from './entities/institution';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Institution.name, schema: InstitutionSchema },
    ]),
  ],
  providers: [InstitutionResolver, InstitutionService],
})
export class InstitutionsModule {}
