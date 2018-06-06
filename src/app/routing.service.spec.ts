import { Router } from '@angular/router';
import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppModule, appRoutes } from './app.module';
import { RoutingService } from './routing.service';


describe('RoutingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(appRoutes),
        AppModule,
      ],
      providers: [
        RoutingService,
      ]
    });
  });

  it('should be created', inject([RoutingService], (service: RoutingService) => {
    expect(service).toBeTruthy();
  }));
});
