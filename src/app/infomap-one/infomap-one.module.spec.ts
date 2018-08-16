import { InfomapOneModule } from './infomap-one.module';

describe('InfomapOneModule', () => {
  let infomapOneModule: InfomapOneModule;

  beforeEach(() => {
    infomapOneModule = new InfomapOneModule();
  });

  it('should create an instance', () => {
    expect(infomapOneModule).toBeTruthy();
  });
});
