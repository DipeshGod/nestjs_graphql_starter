import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Institution } from './entities/institution';
import { Model } from 'mongoose';
import { CreateInstitutionInput } from './dtos/create-institution.input';
import { UpdateInstitutionInput } from './dtos/update-institution.input';
import { ApolloError } from 'apollo-server-express';

@Injectable()
export class InstitutionService {
  constructor(
    @InjectModel(Institution.name)
    private readonly institutionModel: Model<Institution>,
  ) {}

  async findAllInstitutions(): Promise<Institution[]> {
    const institutions = await this.institutionModel.find();
    return institutions;
  }

  async findInstitutionById(institutionId: string): Promise<Institution> {
    return this.institutionModel.findById(institutionId);
  }

  async createInstitution(
    createInstitutionInput: CreateInstitutionInput,
  ): Promise<Institution> {
    try {
      await this.institutionModel.ensureIndexes();
      const institution = await this.institutionModel.create(
        createInstitutionInput,
      );
      return institution.save();
    } catch (err) {
      throw new ApolloError('Duplication value error');
    }
  }

  async updateInstitution(
    id: string,
    dto: UpdateInstitutionInput,
  ): Promise<Institution> {
    return this.institutionModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
  }

  async deleteInstitution(institutionId: string): Promise<Institution> {
    return this.institutionModel.findByIdAndDelete(institutionId);
  }
}
