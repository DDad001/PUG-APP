import "intl";
import "intl/locale-data/jsonp/en";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Layout } from "@ui-kitten/components";

//Screens
import LoginScreen from "./Screens/LoginScreen";
import LoadingLogoScreen from "./Screens/LoadingLogoScreen";
import CreateAccountScreen from "./Screens/CreateAccountScreen";
import NotificationsScreen from "./Screens/NotificationsScreen";
import FollowingScreen from "./Screens/FollowingScreen";
import SettingsScreen from "./Screens/SettingsScreen"
import AddEventScreen from "./Screens/AddEventScreen";

//Components
import PUGbutton from "./Components/PUGButton";
import ListViewEventsScreen from "./Screens/ListViewEventsScreen";

import CardListComponent from "./Components/CardListComponent";
import EventDisplayedScreen from "./Screens/EventDisplayedScreen";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";

import useUser from './Hooks/use-user';
import UserContext from './Context/UserContext';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GetAllFriends } from './Services/DataService';
import { useEffect, useState } from 'react';
import FAQScreen from "./Screens/FAQScreen";
import FollowingComponent from "./Components/FollowingComponent";
import React, { FC } from 'react';
import NavigationComponent from "./Components/NavigationComponent";
import PassedEventsScreen from "./Screens/PassedEventsScreen";
import LikedEventsScreen from "./Screens/LikedEventsScreen";
import ProfileOfOther from "./Screens/ProfileOfOther";
import FollowersScreen from "./Screens/FollowersScreen";
import { Platform } from "react-native";

type RootStackParamList ={
  login:undefined,
  Nav: undefined,
  event:{name:string},
  profile:{name:string},
  PastEvents:undefined,
  LikedEvents:undefined,
  settings:undefined,
  following:undefined,
  LookAtEvent:undefined,
  OtherPersonsFollowers:undefined,
  OtherPersonsFollowings:undefined,
  YourActiveEvents:undefined,
  followers:undefined,
  FAQ:undefined,
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: FC =()=> {
  if (Platform.OS === "android") {
      // See https://github.com/expo/expo/issues/6536 for this issue.
      if (typeof (Intl as any).__disableRegExpRestore === "function") {
          (Intl as any).__disableRegExpRestore();
      }
  }
  const [allFriends, setAllFriends] = useState([]);
  
  useEffect(() => {
    fetchFriend();
  }, [])
  
  const fetchFriend = async () => {
    let results = await GetAllFriends();
    setAllFriends(results.value)
    console.log(results);
  }


  return (
    <UserContext.Provider value={useUser()}>
      
      <NavigationContainer>
        <ApplicationProvider {...eva} theme={eva.light}>
          <NativeBaseProvider>
          <Stack.Navigator>
          {/* <Stack.Screen name="login"
          component={LoginScreen}
          options={{headerShown: false}} /> */}
          <Stack.Screen name="Nav"
          component={NavigationComponent}
          options={{headerShown: false}} />
          <Stack.Screen name="event"
           options={{ title: 'Event' }}
          component={EventDisplayedScreen}/>
          <Stack.Screen name="profile"
           options={{ title: 'Profile' }}
          component={ProfileOfOther}/>
          <Stack.Screen name="PastEvents"
           options={{ title: 'Past Events', headerShown: false}}
          component={PassedEventsScreen}/>
          <Stack.Screen name="LikedEvents"
           options={{ title: 'Liked Events', headerShown: false}}
          component={LikedEventsScreen}/>
          <Stack.Screen name="settings"
           options={{ title: 'Settings',}}
          component={SettingsScreen}/>
          <Stack.Screen name="following"
           options={{ title: 'Following',}}
          component={FollowingScreen}/>
          <Stack.Screen name="followers"
           options={{ title: 'Followers',}}
          component={FollowersScreen}/>
          <Stack.Screen name="LookAtEvent"
           options={{ title: 'Look At Event',}}
          component={EventDisplayedScreen}/>
          <Stack.Screen name="OtherPersonsFollowers"
           options={{ title: 'OtherPersonFollowers',}}
          component={FollowersScreen}/>
          <Stack.Screen name="OtherPersonsFollowings"
           options={{ title: 'OtherPersonsFollowings',}}
          component={FollowingScreen}/>
          <Stack.Screen name="YourActiveEvents"
           options={{ title: 'Your Active Events',}}
          component={EventDisplayedScreen}/>
          <Stack.Screen name="FAQ"
           options={{ title: 'FAQ',}}
          component={FAQScreen}/>

            {/* <ListViewEventsScreen/> */}
            {/* <AddEventScreen /> */}
            {/* <PassedLikedEventsScreen/> */}
            {/* <ProfileScreen/> */}
            {/* <FAQScreen/> */}
            {/* <CreateAccountScreen /> */}
            {/* <SettingsScreen /> */}
            {/* <EventDisplayedScreen/> */}

         </Stack.Navigator>  
          </NativeBaseProvider>
        </ApplicationProvider>
      </NavigationContainer>
    
    </UserContext.Provider>
    

    // <PassedLikedEventsScreen />
    // <CreateAccountScreen />
    //   <LoadingLogoScreen/>
    //   <LoginScreen />
    //   <CreateAccountScreen />
    //   <LoadingLogoScreen/>
    //   <NotificationsScreen />
    //  <FollowingScreen />
    // <SettingsScreen />

    // <View style={styles.container}>
    //   <Text>In the Dev Branch</Text>
    // </View>
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
