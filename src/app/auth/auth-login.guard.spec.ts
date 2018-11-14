import { TestBed, async, inject } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataModule } from '../data/data.module';
import { AuthLoginGuard } from './auth-login.guard';
import { AuthService } from './auth.service';

describe('AuthLoginGuard', () => {
  const spyRoutingTable = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        DataModule
      ],
      providers: [
        AuthLoginGuard,
        AuthService,
        { provide: Router, useValue: spyRoutingTable },
      ]
    });
  });

  it('should ...', inject([AuthLoginGuard], (guard: AuthLoginGuard) => {
    expect(guard).toBeTruthy();
  }));
});
