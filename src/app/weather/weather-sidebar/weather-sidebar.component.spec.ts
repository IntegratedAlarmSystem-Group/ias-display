import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IasMaterialModule } from '../../ias-material/ias-material.module';
import { WeatherSidebarComponent } from './weather-sidebar.component';

describe('WeatherSidebarComponent', () => {
  let component: WeatherSidebarComponent;
  let fixture: ComponentFixture<WeatherSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WeatherSidebarComponent
      ],
      imports: [
        IasMaterialModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
