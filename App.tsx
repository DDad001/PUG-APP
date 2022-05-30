import "intl";
import "intl/locale-data/jsonp/en";
import { StyleSheet, Text, View } from "react-native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Layout } from "@ui-kitten/components";

import LoginScreen from "./Screens/LoginScreen";
import CreateAccountScreen from "./Screens/CreateAccountScreen";
import FollowingScreen from "./Screens/FollowingScreen";
import SettingsScreen from "./Screens/SettingsScreen"

import ListViewEventsScreen from "./Screens/ListViewEventsScreen";
import EventDisplayedScreen from "./Screens/EventDisplayedScreen";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";

import useUser from './Hooks/use-user';
import UserContext from './Context/UserContext';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FAQScreen from "./Screens/FAQScreen";
import React, { FC } from 'react';
import NavigationComponent from "./Components/NavigationComponent";
import PassedEventsScreen from "./Screens/PassedEventsScreen";
import LikedEventsScreen from "./Screens/LikedEventsScreen";
import ProfileOfOther from "./Screens/ProfileOfOther";
import FollowersScreen from "./Screens/FollowersScreen";
import { Platform } from "react-native";
import YourEventScreen from "./Screens/YourEventScreen";
import EditProfileScreen from "./Screens/EditProfileScreen";
import OtherUsersEvent from "./Screens/OtherUsersEvent";

type RootStackParamList = {
  CreateAccount: undefined,
  login: undefined,
  Nav: undefined,
  event: { name: string },
  profile: undefined,
  PastEvents: undefined,
  LikedEvents: undefined,
  settings: undefined,
  EditProfile: undefined,
  OtherUserEvent: undefined,
  following: undefined,
  OtherPersonsFollowers: undefined,
  OtherPersonsFollowings: undefined,
  YourActiveEvent: undefined,
  followers: undefined,
  FAQ: undefined,
  CardListScreen: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: FC = () => {
  if (Platform.OS === "android") {
    if (typeof (Intl as any).__disableRegExpRestore === "function") {
      (Intl as any).__disableRegExpRestore();
    }
  }


  return (
    <UserContext.Provider value={useUser()}>

      <NavigationContainer>
        <ApplicationProvider {...eva} theme={eva.light}>
          <NativeBaseProvider>
            <Stack.Navigator>
              <Stack.Screen name="login"
                component={LoginScreen}
                options={{ headerShown: false }} />
              <Stack.Screen name="CreateAccount"
                component={CreateAccountScreen}
                options={{ headerShown: false }} />
              <Stack.Screen name="Nav"
                component={NavigationComponent}
                options={{ headerShown: false, gestureEnabled: false }} />
              <Stack.Screen name="event"
                options={{ title: 'Event' }}
                component={EventDisplayedScreen} />
              <Stack.Screen name="profile"
                options={{ title: 'Profile' }}
                component={ProfileOfOther} />
              <Stack.Screen name="PastEvents"
                options={{ title: 'Past Events', headerShown: false }}
                component={PassedEventsScreen} />
              <Stack.Screen name="LikedEvents"
                options={{ title: 'Liked Events', headerShown: false }}
                component={LikedEventsScreen} />
              <Stack.Screen name="settings"
                options={{ title: 'Settings', }}
                component={SettingsScreen} />
              <Stack.Screen name="following"
                options={{ title: 'Following', }}
                component={FollowingScreen} />
              <Stack.Screen name="EditProfile"
                options={{ title: 'Edit Profile' }}
                component={EditProfileScreen} />
              <Stack.Screen name="followers"
                options={{ title: 'Followers', }}
                component={FollowersScreen} />
              <Stack.Screen name="OtherUserEvent"
                options={{ title: '', }}
                component={OtherUsersEvent} />
              <Stack.Screen name="OtherPersonsFollowers"
                options={{ title: '', }}
                component={FollowersScreen} />
              <Stack.Screen name="OtherPersonsFollowings"
                options={{ title: '', }}
                component={FollowingScreen} />
              <Stack.Screen name="YourActiveEvent"
                options={{ title: 'Your Event', }}
                component={YourEventScreen} />
              <Stack.Screen name="FAQ"
                options={{ title: 'FAQ', }}
                component={FAQScreen} />
              <Stack.Screen name="CardListScreen"
                options={{ title: 'CardListScreen', headerShown: false }}
                component={ListViewEventsScreen} />

            </Stack.Navigator>
          </NativeBaseProvider>
        </ApplicationProvider>
      </NavigationContainer>

    </UserContext.Provider>

  );
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
