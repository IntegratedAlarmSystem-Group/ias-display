import { TabularModule } from './tabular.module';

describe('TabularModule', () => {
  let tabularModule: TabularModule;

  beforeEach(() => {
    tabularModule = new TabularModule();
  });

  it('should create an instance', () => {
    expect(tabularModule).toBeTruthy();
  });
});
