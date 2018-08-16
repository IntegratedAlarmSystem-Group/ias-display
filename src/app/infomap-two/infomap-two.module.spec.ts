import { InfomapTwoModule } from './infomap-two.module';

describe('InfomapTwoModule', () => {
  let infomapTwoModule: InfomapTwoModule;

  beforeEach(() => {
    infomapTwoModule = new InfomapTwoModule();
  });

  it('should create an instance', () => {
    expect(infomapTwoModule).toBeTruthy();
  });
});
