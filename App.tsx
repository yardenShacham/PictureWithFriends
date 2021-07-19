import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {enableScreens} from 'react-native-screens';
import {Provider} from 'mobx-react';
import {
  APP_ROUTES,
  APP_STORES,
} from 'configuration-and-constants/app-configuration';
import getAllStores from 'stores';
import getAllViewStores from 'view-stores';
import MainPage from 'components/pages/main-page';
import ContactListPage from 'components/pages/contact-list-page';
import {initInjector} from './app-injector';
import {useEffect} from 'react';
import {IContactListStore} from 'typescript/stores';
import {setNativeExceptionHandler} from 'react-native-exception-handler';

setNativeExceptionHandler(exceptionString => {
  console.error(exceptionString);
});

initInjector(false);
enableScreens();
const AppStack = createNativeStackNavigator();

const Navigator = () => (
  <NavigationContainer>
    <AppStack.Navigator
      initialRouteName={APP_ROUTES.MAIN}
      screenOptions={{
        headerShown: false,
      }}>
      <AppStack.Screen
        options={{
          headerShown: false,
        }}
        name={APP_ROUTES.MAIN}
        component={MainPage}
      />
      <AppStack.Screen
        options={{
          headerShown: false,
        }}
        name={APP_ROUTES.CONTACT_LIST}
        component={ContactListPage}
      />
    </AppStack.Navigator>
  </NavigationContainer>
);

export default function App() {
  const allStores = getAllStores();
  const allViewStore = getAllViewStores(allStores);

  useEffect(() => {
    const contactStore: IContactListStore = allStores[
      APP_STORES.CONTACT_LIST_STORE
    ] as IContactListStore;

    contactStore.fetchUserContact();
  }, []);

  return (
    <Provider {...allStores} {...allViewStore}>
      <Navigator />
    </Provider>
  );
}
