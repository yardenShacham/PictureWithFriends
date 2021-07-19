import {injector} from 'jx-injector';
import {APP_SERVICES} from 'configuration-and-constants/app-configuration';
import {HttpService} from 'services/http-service';
import {FlickrService} from 'services/flickr-service';
import {HttpMockService} from 'mocks/services/http-mock-service';

const registerAppDependencies = (appInjector: any, isMock: boolean) => {
  appInjector.register(
    APP_SERVICES.httpService,
    isMock ? HttpMockService : HttpService,
  );
  appInjector.register(APP_SERVICES.photosService, FlickrService);
};

export const registerDependencies = (isMock: boolean) => {
  const appInjector = new injector();
  if (appInjector) {
    registerAppDependencies(appInjector, isMock);
    return appInjector;
  } else {
    throw new Error('rejector has does not exsit or have some problems');
  }
};
