import { APP_BASE_HREF } from '@angular/common';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterModule, Routes } from '@angular/router';
import { IasMaterialModule } from './ias-material/ias-material.module';
import { DataModule } from './data/data.module';
import { AppComponent } from './app.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' }
];

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        RouterModule.forRoot(appRoutes),
        IasMaterialModule,
        DataModule,
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });
  it('should create the app', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
