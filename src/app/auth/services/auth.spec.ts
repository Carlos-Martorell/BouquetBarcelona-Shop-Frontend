
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { environment } from '@env/environments';
import { AuthService } from '@auth';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;
  const apiUrl = `${environment.apiUrl}/api/auth`;


  const mockUser = {
    id: '123',
    name: 'Test User',
    email: 'test@test.com',
    role: 'client' as const
  };

  const mockLoginResponse = {
    access_token: 'mock-jwt-token',
    user: mockUser
  };

  beforeEach(() => {
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: Router, useValue: routerSpyObj }
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with no user logged in', () => {
    expect(service.isLoggedIn()).toBe(false);
    expect(service.currentUser()).toBeNull();
    expect(service.token()).toBeNull();
  });


  it('should login user and store token', (done) => {
    service.login('test@test.com', '123456').subscribe({
      next: (response) => {
        expect(response).toEqual(mockLoginResponse);
        expect(service.isLoggedIn()).toBe(true);
        expect(service.currentUser()).toEqual(mockUser);
        expect(service.token()).toBe('mock-jwt-token');
        expect(localStorage.getItem('token')).toBe('mock-jwt-token');
        expect(localStorage.getItem('user')).toBe(JSON.stringify(mockUser));
        done();
      }
    });

    const req = httpMock.expectOne(`${apiUrl}/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email: 'test@test.com', password: '123456' });
    req.flush(mockLoginResponse);
  });

  it('should register user and auto-login', (done) => {
    const registerData = {
      name: 'Test User',
      email: 'test@test.com',
      password: '123456',
      phone: '+34 666555444'
    };

    service.register(registerData).subscribe({
      next: () => {
        expect(service.isLoggedIn()).toBe(true);
        expect(service.currentUser()).toEqual(mockUser);
        done();
      }
    });

    const registerReq = httpMock.expectOne(`${apiUrl}/register`);
    expect(registerReq.request.method).toBe('POST');
    expect(registerReq.request.body).toEqual(registerData);
    registerReq.flush(mockUser);

    const loginReq = httpMock.expectOne(`${apiUrl}/login`);
    expect(loginReq.request.method).toBe('POST');
    loginReq.flush(mockLoginResponse);
  });



  it('should logout user and clear storage', (done) => {

    service.login('test@test.com', '123456').subscribe(() => {
      service.logout();

      expect(service.isLoggedIn()).toBe(false);
      expect(service.currentUser()).toBeNull();
      expect(service.token()).toBeNull();
      expect(localStorage.getItem('token')).toBeNull();
      expect(localStorage.getItem('user')).toBeNull();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
      done();
    });

    httpMock.expectOne(`${apiUrl}/login`).flush(mockLoginResponse);
  });


  it('should load user from localStorage on init', () => {

    localStorage.setItem('token', 'stored-token');
    localStorage.setItem('user', JSON.stringify(mockUser));

    TestBed.resetTestingModule(); 
    
    TestBed.configureTestingModule({
        providers: [
        AuthService,
        provideHttpClient(),
        provideHttpClientTesting(), 
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) }
        ]
    });

    const newServiceInstance = TestBed.inject(AuthService);

    expect(newServiceInstance.isLoggedIn()).toBe(true);
    expect(newServiceInstance.currentUser()).toEqual(mockUser);
    expect(newServiceInstance.token()).toBe('stored-token');
  });



  it('should compute isLoggedIn correctly', (done) => {
    expect(service.isLoggedIn()).toBe(false);

    service.login('test@test.com', '123456').subscribe(() => {
      expect(service.isLoggedIn()).toBe(true);
      done();
    });

    httpMock.expectOne(`${apiUrl}/login`).flush(mockLoginResponse);
  });

  it('should compute isAdmin correctly', (done) => {
    const adminUser = { ...mockUser, role: 'admin' as const };
    const adminResponse = { access_token: 'token', user: adminUser };

    service.login('admin@test.com', '123456').subscribe(() => {
      expect(service.isAdmin()).toBe(true);
      done();
    });

    httpMock.expectOne(`${apiUrl}/login`).flush(adminResponse);
  });

  it('should return false for isAdmin when user is not admin', (done) => {
    service.login('test@test.com', '123456').subscribe(() => {
      expect(service.isAdmin()).toBe(false);
      done();
    });

    httpMock.expectOne(`${apiUrl}/login`).flush(mockLoginResponse);
  });
});