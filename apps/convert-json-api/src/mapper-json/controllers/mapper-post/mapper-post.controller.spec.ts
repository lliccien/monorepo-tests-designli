import { Test, TestingModule } from '@nestjs/testing';
import { MapperPostController } from './mapper-post.controller';

describe('MapperGetController', () => {
  let controller: MapperPostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MapperPostController],
    }).compile();

    controller = module.get<MapperPostController>(MapperPostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
