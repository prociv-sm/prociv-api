import { Test, TestingModule } from '@nestjs/testing';
import { SectorsController } from './sectors.controller';

describe('SectorController', () => {
  let controller: SectorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SectorsController],
    }).compile();

    controller = module.get<SectorsController>(SectorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
