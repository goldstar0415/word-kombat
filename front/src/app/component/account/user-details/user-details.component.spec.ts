import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { User } from '../../../model/user.model';
import { UserService } from '../../../service/user/user.service';
import { SocketService } from '../../../service/socket/socket.service';
import { UserDetailsComponent } from './user-details.component';

describe('UserDetailsComponent', () => {
  let userDetailsComponent: UserDetailsComponent;
  let userDetailsFixture: ComponentFixture<UserDetailsComponent>;
  let userService: UserService;
  let userServiceUpdateSpy;
  let userServiceUploadImageSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backendInstance, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        { provide: SocketService, useValue: {socket: {on: new Function()}} },
        UserService
      ],
      declarations: [ UserDetailsComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    userDetailsFixture = TestBed.createComponent(UserDetailsComponent);
    userDetailsComponent = userDetailsFixture.componentInstance;

    userService = userDetailsFixture.debugElement.injector.get(UserService);

    userServiceUpdateSpy = spyOn(userService, 'update')
      .and.returnValue(Observable.from([new User()]));

    userServiceUpdateSpy = spyOn(userService, 'uploadImage');
  });

  it('should create component', async(() => {
    const component = userDetailsFixture.debugElement.componentInstance;
    expect(component).toBeDefined();
  }));

  it('should call userService.update method', () => {
    userDetailsComponent.update();
    userDetailsFixture.whenStable().then(() => {
      expect(userServiceUpdateSpy.update).toHaveBeenCalled();
    });
  });

  it('should call userService.update method only once', () => {
    userDetailsComponent.update();
    userDetailsFixture.whenStable().then(() => {
      expect(userServiceUpdateSpy.update.callsCount).toEqual(1);
    });
  });

  it('should call userService.upload method', () => {
    userDetailsComponent.upload();
    userDetailsFixture.whenStable().then(() => {
      expect(userServiceUploadImageSpy.update).toHaveBeenCalled();
    });
  });

  it('should call userService.upload method only once', () => {
    userDetailsComponent.upload();
    userDetailsFixture.whenStable().then(() => {
      expect(userServiceUploadImageSpy.update.callsCount).toEqual(1);
    });
  });
  
});
