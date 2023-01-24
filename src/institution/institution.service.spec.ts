import { Test, TestingModule } from '@nestjs/testing';
import { InstitutionService } from './institution.service';
import { Institution, InstitutionSchema } from './entities/institution';
import { MongooseModule } from '@nestjs/mongoose';
import {
  closeInMongodConnection,
  dropDatabase,
  rootMongooseTestModule,
} from '../helpers/mongoose.helper';
import { Chance } from 'chance';
import { CreateInstitutionInput } from './dtos/create-institution.input';
import { MongooseError } from 'mongoose';

describe('InstitutionService', () => {
  const chance = new Chance();

  const createInstitutionInput: CreateInstitutionInput = {
    name: chance.country() + 'University',
    description: chance.string({ length: 10 }),
  };

  let service: InstitutionService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          {
            name: Institution.name,
            schema: InstitutionSchema,
          },
        ]),
      ],
      providers: [InstitutionService],
    }).compile();

    service = module.get<InstitutionService>(InstitutionService);
  });

  afterAll(async () => {
    if (module) {
      await module.close();
      await closeInMongodConnection();
    }
  });

  afterEach(() => {
    dropDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllInstitutions', () => {
    it('should return [] when there are no institutions', async () => {
      expect(await service.findAllInstitutions()).toEqual([]);
    });

    it('should return institution array when there are institutions', async () => {
      await service.createInstitution(createInstitutionInput);
      let findAllInstitutions = await service.findAllInstitutions();
      expect(findAllInstitutions.length).toEqual(1);
      expect(findAllInstitutions[0]._id).toBeDefined();
      const createInstitutionInput2: CreateInstitutionInput = {
        name: chance.country() + 'University',
        description: chance.string({ length: 10 }),
      };
      await service.createInstitution(createInstitutionInput2);
      findAllInstitutions = await service.findAllInstitutions();
      expect(findAllInstitutions.length).toEqual(2);
    });
  });

  describe('createInstitution', () => {
    it('should create an institution with createInstitutionInput', async () => {
      const institution = await service.createInstitution(
        createInstitutionInput,
      );
      expect(institution._id).toBeDefined();
      expect(institution.name).toBe(createInstitutionInput.name);
      expect(institution.description).toBe(createInstitutionInput.description);
    });

    it('should not allow to create two instiution with same name', async () => {
      await service.createInstitution(createInstitutionInput);
      service
        .createInstitution(createInstitutionInput)
        .catch((err: MongooseError) => expect(err).toBeDefined());
    });
  });

  describe('updateInstitution', () => {
    it('should create an institution with createInstitutionInput', async () => {
      const createInstitutionInput: CreateInstitutionInput = {
        name: 'test uni3',
        description: 'random desc',
      };
      const institution = await service.createInstitution(
        createInstitutionInput,
      );

      const updatedInstitution = await service.updateInstitution(
        institution._id as unknown as string,
        { description: 'updated desc' } as any,
      );

      expect(updatedInstitution._id).toStrictEqual(institution._id);
      expect(updatedInstitution.name).toBe(institution.name);
      expect(updatedInstitution.description).toBe('updated desc');
    });
  });

  describe('findInstitutionById', () => {
    it('should find institution for given id', async () => {
      const createInstitutionInput: CreateInstitutionInput = {
        name: 'test uni2',
        description: 'random desc',
      };
      const newInstitution = await service.createInstitution(
        createInstitutionInput,
      );

      const findInstitution = await service.findInstitutionById(
        newInstitution._id as unknown as string,
      );

      expect(findInstitution._id).toBeDefined();
      expect(findInstitution.name).toBe(createInstitutionInput.name);
      expect(findInstitution.description).toBe(
        createInstitutionInput.description,
      );
    });

    it('should return null if institution of given id is not found', async () => {
      const findInstitution = await service.findInstitutionById(
        '63ce9fe4b09b862a53737eed',
      );

      expect(findInstitution).toBe(null);
    });
  });

  describe('deleteInstitution', () => {
    it('should delete institution for given valid institution.id', async () => {
      const createInstitutionInput: CreateInstitutionInput = {
        name: 'test uni',
        description: 'random desc',
      };
      const newInstitution = await service.createInstitution(
        createInstitutionInput,
      );

      const deletedInstitution = await service.deleteInstitution(
        newInstitution._id as unknown as string,
      );

      expect(deletedInstitution._id).toBeDefined();
      expect(deletedInstitution.name).toBe(createInstitutionInput.name);
      expect(deletedInstitution.description).toBe(
        createInstitutionInput.description,
      );
    });
  });
});
