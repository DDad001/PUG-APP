import React, { FC, useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import ListViewEventsScreen from '../Screens/ListViewEventsScreen';
import AddEventScreen from '../Screens/AddEventScreen';
import NotificationsScreen from '../Screens/NotificationsScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import man from '../assets/man.jpg';
import PUGbutton from './PUGButton';

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomTabBarHeightContext } from '@react-navigation/bottom-tabs';
import FollowingScreen from '../Screens/FollowingScreen';
import UserContext from '../Context/UserContext';


type RootStackParamList ={
  Nav: undefined,
}
type Props = NativeStackScreenProps<RootStackParamList, 'Nav'>

const Tab = createBottomTabNavigator();
const MyTabs: FC = () =>{
    const { userItems, usersNotifications, setUpdateNotificationsScreen  } = useContext<any>(UserContext);

 const [BorderColor, setBorderColor] = useState('black')
 const [notificationBadgeVisible, setNotificationBadgeVisible] = React.useState(false);
  return (

    <Tab.Navigator
    
    initialRouteName="Feed"
    screenOptions={{
        
        tabBarActiveTintColor: 'black',
        // sceneContainerStyle:"black",
        tabBarStyle: {
            position: 'absolute',
            backgroundColor:'#0A326D',
        },
        tabBarInactiveTintColor: 'white', 
    }}
    >
      <Tab.Screen
        name="ListEvents"
        component={ListViewEventsScreen}
        options={{
            headerShown: false,
            tabBarStyle: {
                position: 'absolute',
                backgroundColor:'#0A326D',
                height:60,
                paddingBottom:0,
                paddingTop:10,     
            },
            tabBarLabel: '',
            tabBarAccessibilityLabel:'Home Screen',
            tabBarActiveTintColor:'#5E7FB4',
            tabBarLabelStyle:{
                marginBottom:5
            },

            tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="home" size={31} color={color}/>
                ),
            }}
            />
                 
      <Tab.Screen
        name="AddEvent"
        component={AddEventScreen}
        options={{
            tabBarStyle: {
                position: 'absolute',
                backgroundColor:'#0A326D',
                height:60,
                paddingBottom:0,
                paddingTop:10,     
            },
            headerShown: false,
            tabBarLabel: '',
            tabBarLabelStyle:{
                marginBottom:5
            },
            tabBarActiveTintColor:'#5E7FB4',
            tabBarIcon: ({ color, size }) => (
                <Entypo name="plus" size={33} color={color}/>
                )
            }}
            />
      <Tab.Screen
        name="PUGLogo"
        component={FollowingScreen}
        listeners={{
            tabPress: e => {
              e.preventDefault();
              // Prevent default action
            },
          }}
        options={{
            tabBarStyle: {
                position: 'absolute',
                backgroundColor:'#0A326D',
                height:60,
                paddingBottom:0,
                paddingTop:10,     
            },
            tabBarActiveTintColor:'#5E7FB4',
            headerShown: false,
            tabBarLabel: '',
            tabBarLabelStyle:{
                marginBottom:5
            },
            tabBarIcon: ({ color, size }) => (
                <PUGbutton/>
                ),
            }}
            />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
            tabBarStyle: {
                position: 'absolute',
                backgroundColor:'#0A326D',
                height:60,
                paddingBottom:0,
                paddingTop:10,     
            },
            tabBarBadge: (notificationBadgeVisible ? usersNotifications.length : null), 
            tabBarActiveTintColor:'#5E7FB4',
            headerShown: false,
            tabBarLabel: '',
            tabBarLabelStyle:{
                marginBottom:5
            },
            tabBarIcon: ({ color, size }) => (
                setNotificationBadgeVisible(true),
                setUpdateNotificationsScreen(true),
                console.log(notificationBadgeVisible),
                <MaterialIcons name="notifications" size={31} color={color} />
                
                ),
            }}
            />

      {
        userItems.image === null ? 
          <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
              tabBarStyle: {
                  position: 'absolute',
                  backgroundColor:'#0A326D',
                  height:60,
                  paddingBottom:0,
                  paddingTop:10,    
              },
              tabBarActiveTintColor:'#5E7FB4',
              headerShown: false,
              tabBarLabel: '',
              tabBarLabelStyle:{
                  marginBottom:5
              },
  
              tabBarIcon: ({ color, size }) => (
                    <Ionicons name="person-circle-sharp" size={31} color="white" />
                      //<Image source={{uri: userItems.image}}  style={{height: 31, width:31, borderRadius:50, borderWidth:2, borderColor:'white' }}/>
                  ),
              }}
              />
              : 
              <Tab.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                  tabBarStyle: {
                      position: 'absolute',
                      backgroundColor:'#0A326D',
                      height:60,
                      paddingBottom:0,
                      paddingTop:10,    
                  },
                  tabBarActiveTintColor:'#5E7FB4',
                  headerShown: false,
                  tabBarLabel: '',
                  tabBarLabelStyle:{
                      marginBottom:5
                  },
      
                  tabBarIcon: ({ color, size }) => (
                      // <MaterialIcons name="notifications" size={33} color="black"/>
                          <Image source={{uri: userItems.image}}  style={{height: 31, width:31, borderRadius:50, borderWidth:2, borderColor:'white' }}/>
                      ),
                  }}
                  />
      }      

     
    </Tab.Navigator>
 




  );
}
const NavigationComponent:FC <Props> =()=> {
    return (
        <MyTabs />
  );
}

export default NavigationComponent;