import { APP_BASE_HREF } from '@angular/common';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AlarmService } from './alarm.service';
import { AlarmsListComponent } from './alarms-list/alarms-list.component';

import { NbThemeModule } from '@nebular/theme';
import { NbLayoutModule } from '@nebular/theme';
import { NbCardModule } from '@nebular/theme';
import { NbSidebarModule } from '@nebular/theme';
import { NbSidebarService } from '@nebular/theme';

import { NbMenuService } from '@nebular/theme';
import { NbMenuItem } from '@nebular/theme';
import { NbMenuModule } from '@nebular/theme';

import { RouterModule, Routes } from '@angular/router';


const appRoutes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path:'overview', component: AlarmsListComponent },
  { path:'weather', component: AlarmsListComponent }
];

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        AlarmsListComponent,
      ],
      imports: [
        NbThemeModule.forRoot({ name: 'default' }),
        NbLayoutModule,
        NbCardModule,
        NbSidebarModule.forRoot(),
        NbMenuModule.forRoot(),
        RouterModule.forRoot(appRoutes),
      ],
      providers: [
        AlarmService,
        NbSidebarService,
        NbMenuService,
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
