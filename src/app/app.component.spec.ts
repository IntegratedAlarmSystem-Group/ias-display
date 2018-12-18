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

describe(`The component should be able to use count labels on the navigation items
if there are, or are not, alarms not acknowledged in the related view`, () => {

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

  it(`should use a 'nonzero-count' class for the label
  if there is, at least, one not acknowledged alarm for the view`,
  () => {

    alarmService.countByView = {'weather': 2, 'antenna': 1};

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
      const className = component.getNavItemCountClass(
        navItem, alarmService.countByView);
      expect(className).toEqual('nonzero-count');
    }

  });

  it(`should use a 'zero-count' class for the label
  if there are zero not acknowledged alarms for the view`,
  () => {

    alarmService.countByView = {'weather': 0, 'antenna': 0};

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
      const className = component.getNavItemCountClass(
        navItem, alarmService.countByView);
      expect(className).toEqual('zero-count');
    }

  });

  it(`should use an 'unknown-count' class for the label if the counter key
  can not be found in the 'counter per view' available in the alarm service`,
  () => {

    alarmService.countByView = {'weather': 2, 'antenna': 0};

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
      const className = component.getNavItemCountClass(
        navItem, alarmService.countByView);
      expect(className).toEqual('unknown-count');
    }

  });

  it(`should use an 'hide-count' class for the label if the counter key is empty`,
  () => {

    alarmService.countByView = {'weather': 2, 'antenna': 0};

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
      const className = component.getNavItemCountClass(
        navItem, alarmService.countByView);
      expect(className).toEqual('hide-count');
    }

  });

});

describe(`The component should be able to show or not a text
related to the count by view, on the navigation items,
if there are, or are not, alarms not acknowledged in the related view`, () => {

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

  it(`should be able to use a text with the count of unack alarms for a view
  if there is, at least, one not acknowledged alarm for a selected view`,
  () => {

    alarmService.countByView = {'weather': 2, 'antenna': 101};

    component.navigationSidenavItems = [
      {
        title: 'Weather',
        link: 'weather',
        icon: 'ias_weather',  // custom icon
        svgIcon: true,  // custom svg icon
        counter: 'weather'
      },
      {
        title: 'Antenna',
        link: 'antenna',
        icon: 'ias_antenna',
        svgIcon: true,
        counter: 'antenna'
      }
    ];

    let navItem;
    let countText = '';

    navItem = component.navigationSidenavItems[0];
    countText = component.getNavItemCountText(
      navItem, alarmService.countByView);
    expect(countText).toEqual('2');

    navItem = component.navigationSidenavItems[1];
    countText = component.getNavItemCountText(
      navItem, alarmService.countByView);
    expect(countText).toEqual('>100');

  });

  it(`should be able to use a text with a zero count
  if there are zero not acknowledged alarms for a selected view`,
  () => {

    alarmService.countByView = {'antenna': 0};

    component.navigationSidenavItems = [
      {
        title: 'Antenna',
        link: 'antenna',
        icon: 'ias_antenna',
        svgIcon: true,
        counter: 'antenna'
      }
    ];

    const navItem = component.navigationSidenavItems[0];
    const countText = component.getNavItemCountText(
      navItem, alarmService.countByView);
    expect(countText).toEqual('0');

  });

  it(`should be able to use a special text if the counter key
  can not be found in the 'counter per view' available in the alarm service`,
  () => {

    alarmService.countByView = {'weather': 2, 'antenna': 0};

    component.navigationSidenavItems = [
      {
        title: 'Another',
        link: 'another',
        icon: 'language',  // not custom icon
        svgIcon: false,  // angular material icon
        counter: 'another'
      }
    ];

    const navItem = component.navigationSidenavItems[0];
    const className = component.getNavItemCountText(
      navItem, alarmService.countByView);
    expect(className).toEqual('?');

  });

  it(`should be able to show the count if there is a negative count
  from the webserver (this should not happen and
  must be highlighted as an error)`,
  () => {

    alarmService.countByView = {'antenna': -1};

    component.navigationSidenavItems = [
      {
        title: 'Antenna',
        link: 'antenna',
        icon: 'ias_antenna',
        svgIcon: true,
        counter: 'antenna'
      }
    ];

    const navItem = component.navigationSidenavItems[0];
    const countText = component.getNavItemCountText(
      navItem, alarmService.countByView);
    expect(countText).toEqual('-1');
  });

});
