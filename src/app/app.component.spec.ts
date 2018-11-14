import { APP_BASE_HREF } from '@angular/common';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterModule, Routes } from '@angular/router';
import { IasMaterialModule } from './ias-material/ias-material.module';
import { AuthModule } from './auth/auth.module';
import { DataModule } from './data/data.module';
import { OverviewModule } from './overview/overview.module';
import { TabularModule } from './tabular/tabular.module';
import { AppRoutingModule } from './app-routing/app-routing.module';
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
        AppRoutingModule,
        AuthModule,
        IasMaterialModule,
        OverviewModule,
        TabularModule,
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
