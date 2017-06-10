import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { User } from '../../../model/user.model';
import { UserService } from '../../../service/user/user.service';
import { SocketService } from '../../../service/socket/socket.service';
import { UserDetailsComponent } from './user-details.component';

describe('UserDetailsComponent', () => {
  let userDetailsComponent: UserDetailsComponent;
  let userDetailsFixture: ComponentFixture<UserDetailsComponent>;
  let userService: UserService;
  let userServiceSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
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

    userServiceSpy = spyOn(userService, 'update')
      .and.returnValue(Observable.from([new User()]));

    userServiceSpy = spyOn(userService, 'uploadImage');
  });

  it('should create component', async(() => {
    const component = userDetailsFixture.debugElement.componentInstance;
    expect(component).toBeDefined();
  }));

  it('should call userService.update method', () => {
    userDetailsComponent.onUserDetailsSubmit();
    userDetailsFixture.whenStable().then(() => {
      expect(userServiceSpy.update).toHaveBeenCalled();
    });
  });

  it('should call userService.update method only once', () => {
    userDetailsComponent.onUserDetailsSubmit();
    userDetailsFixture.whenStable().then(() => {
      expect(userServiceSpy.update.callsCount).toEqual(1);
    });
  });

  it('should call userService.upload method', () => {
    userDetailsComponent.onImageUploadSubmit();
    userDetailsFixture.whenStable().then(() => {
      expect(userServiceSpy.uploadImage).toHaveBeenCalled();
    });
  });

  it('should call userService.upload method only once', () => {
    userDetailsComponent.onImageUploadSubmit();
    userDetailsFixture.whenStable().then(() => {
      expect(userServiceSpy.uploadImage.callsCount).toEqual(1);
    });
  });

  it('should return false if file is invalid', () => {
    userDetailsComponent.file = null;
    expect(userDetailsComponent.isFileValid()).toBeFalsy();
  });

  it('should return true if file is valid', () => {
    userDetailsComponent.file = new File([""], "filename");
    expect(userDetailsComponent.isFileValid()).toBeTruthy();
  });

  it('should return false if username is invalid', () => {
  });
  
});
