import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { DataModule } from './data/data.module';

import { HttpClientService } from './http-client.service';
import { IasMaterialModule } from './ias-material/ias-material.module';

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
        HttpClientModule,
        BrowserAnimationsModule,
        IasMaterialModule,
        DataModule,
      ],
      providers: [
        HttpClientService,
        HttpClient,
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
