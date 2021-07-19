import {registerDependencies} from './dependencies.register';
import {injector} from 'jx-injector';
export let appInjector: injector | null = null;

export const initInjector = (isAppInMockState: boolean) => {
  appInjector = registerDependencies(isAppInMockState);
};
