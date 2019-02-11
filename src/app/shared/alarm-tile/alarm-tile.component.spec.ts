import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlarmComponent } from '../alarm/alarm.component';
import { AlarmTooltipComponent } from '../alarm-tooltip/alarm-tooltip.component';
import { AlarmTileComponent } from './alarm-tile.component';
import { Alarm } from '../../data/alarm';
import { MockAlarms, MockImageSet, MockImageUnreliableSet } from './fixtures';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('AlarmTileComponent', () => {
  let component: AlarmTileComponent;
  let fixture: ComponentFixture<AlarmTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AlarmTileComponent, AlarmComponent, AlarmTooltipComponent ],
      imports: [ NgbModule, BrowserAnimationsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmTileComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.alarm = Alarm.asAlarm(MockAlarms[0]);
    component.images = MockImageSet;
    component.imagesUnreliable = MockImageUnreliableSet;
    component.showActionBadges = true;
    component.size = 'md';
    component.tooltipDirection = 'right';
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
