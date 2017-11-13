import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AlarmService } from './alarm.service';
import { AlarmsListComponent } from './alarms-list/alarms-list.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        AlarmsListComponent,
      ],
      providers: [AlarmService],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Alma Alarm Display'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Alma Alarm Display');
  }));
});
