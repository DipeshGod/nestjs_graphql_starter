import { Test, TestingModule } from '@nestjs/testing';
import { InstitutionResolver } from './institution.resolver';
import { InstitutionService } from './institution.service';

describe('InstitutionResolver', () => {
  let resolver: InstitutionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InstitutionResolver, InstitutionService],
    })
      .overrideProvider(InstitutionService)
      .useValue({
        findAllInstitutions: jest.fn().mockResolvedValue([]),
        findInstitutionById: jest.fn().mockResolvedValue({
          _id: '63cd47e954421454f8802048',
          name: 'test insitution 9377',
          description: 'random',
        }),
        createInstitution: jest.fn().mockResolvedValue({
          _id: '63cd47e954421454f8802048',
          name: 'test insitution 9377',
          description: 'random',
        }),
        updateInstitution: jest.fn().mockRejectedValue(null),
        deleteInstitution: jest.fn().mockResolvedValue({
          _id: '63cd47e954421454f8802048',
          name: 'test insitution 9377',
          description: 'random',
        }),
      })
      .compile();

    resolver = module.get<InstitutionResolver>(InstitutionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should get all institution', async () => {
    expect(await resolver.findAllInstitutions()).toEqual([]);
  });

  it('should find institution by id', async () => {
    expect(await resolver.findInstitutionById('random')).toEqual({
      _id: '63cd47e954421454f8802048',
      name: 'test insitution 9377',
      description: 'random',
    });
  });

  it('should create insitution', async () => {
    expect(
      await resolver.createInstitution({
        name: 'test insitution 9377',
        description: 'random',
      }),
    ).toEqual({
      _id: '63cd47e954421454f8802048',
      name: 'test insitution 9377',
      description: 'random',
    });
  });

  it('should delete insitutution', async () => {
    expect(await resolver.deleteInstitution('randpm')).toEqual({
      _id: '63cd47e954421454f8802048',
      name: 'test insitution 9377',
      description: 'random',
    });
  });
});
