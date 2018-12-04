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
import { AlarmService } from './data/alarm.service';


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

describe(`The component should be able to use marks on the navigation items
if there are not acknowledged alarms in the related view`, () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let alarmService: AlarmService;
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
    alarmService = fixture.debugElement.injector.get(AlarmService);
    component = fixture.componentInstance;
  });

  it(`should use a 'nonzero-count' class for the mark
  if there is, at least, one not acknowledged alarm for the view`,
  () => {

    alarmService.countPerView = {'weather': 2, 'antenna': 1};

    component.navigationSidenavItems = [
      {
        title: 'Weather',
        link: 'weather',
        icon: 'ias_weather',  // custom icon
        svgIcon: true,  // custom svg icon
        counter: 'weather'
      }
    ];

    for (let i = 0; i < component.navigationSidenavItems.length; i++) {
      const navItem = component.navigationSidenavItems[i];
      const className = component.getNavItemMarkClass(
        navItem, alarmService.countPerView);
      expect(className).toEqual('nonzero-count-mark');
    }

  });

  it(`should use a 'zero-count' class for the mark
  if there are not acknowledged alarms for the view`,
  () => {

    alarmService.countPerView = {'weather': 0, 'antenna': 0};

    component.navigationSidenavItems = [
      {
        title: 'Antenna',
        link: 'antenna',
        icon: 'ias_antenna',
        svgIcon: true,
        counter: 'antenna'
      }
    ];

    for (let i = 0; i < component.navigationSidenavItems.length; i++) {
      const navItem = component.navigationSidenavItems[i];
      const className = component.getNavItemMarkClass(
        navItem, alarmService.countPerView);
      expect(className).toEqual('zero-count-mark');
    }

  });

  it(`should use an 'unknown-count' class for the mark if the counter key
  can not be found in the 'counter per view' available in the alarm service`,
  () => {

    alarmService.countPerView = {'weather': 2, 'antenna': 0};

    component.navigationSidenavItems = [
      {
        title: 'Another',
        link: 'another',
        icon: 'language',  // not custom icon
        svgIcon: false,  // angular material icon
        counter: 'another'
      }
    ];

    for (let i = 0; i < component.navigationSidenavItems.length; i++) {
      const navItem = component.navigationSidenavItems[i];
      const className = component.getNavItemMarkClass(
        navItem, alarmService.countPerView);
      expect(className).toEqual('unknown-count-mark');
    }

  });

  it(`should use an 'hide-count' class for the mark if the counter key is empty`,
  () => {

    alarmService.countPerView = {'weather': 2, 'antenna': 0};

    component.navigationSidenavItems = [
      {
        title: 'Weather',
        link: 'weather',
        icon: 'ias_weather',  // custom icon
        svgIcon: true,  // custom svg icon
        counter: ''
      },
      {
        title: 'Another',
        link: 'another',
        icon: 'language',  // not custom icon
        svgIcon: false,  // angular material icon
        counter: ''
      }
    ];

    for (let i = 0; i < component.navigationSidenavItems.length; i++) {
      const navItem = component.navigationSidenavItems[i];
      const className = component.getNavItemMarkClass(
        navItem, alarmService.countPerView);
      expect(className).toEqual('hide-count-mark');
    }

  });


});
