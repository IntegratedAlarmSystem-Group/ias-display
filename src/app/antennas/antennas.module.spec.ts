import { AntennasModule } from './antennas.module';

describe('AntennasModule', () => {
  let antennasModule: AntennasModule;

  beforeEach(() => {
    antennasModule = new AntennasModule();
  });

  it('should create an instance', () => {
    expect(antennasModule).toBeTruthy();
  });
});
