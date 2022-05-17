import { FC, useState, useContext, useEffect } from "react";
import { Text, View, StyleSheet, ImageBackground, ScrollView, FlatList, Image, Animated, TouchableOpacity } from "react-native";
import NotificationComponent from "../Components/NotificationComponent";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Lato_100Thin,
  Lato_100Thin_Italic,
  Lato_300Light,
  Lato_300Light_Italic,
  Lato_400Regular,
  Lato_400Regular_Italic,
  Lato_700Bold,
  Lato_700Bold_Italic,
  Lato_900Black,
  Lato_900Black_Italic,
} from "@expo-google-fonts/lato";

import CricketPicture from "../assets/Cricket.png";
import { Ionicons } from '@expo/vector-icons';

import { GetNotificationsByUserId, DeleteNotification, GetUserById } from "../Services/DataService";
import UserContext  from '../Context/UserContext';
import {Swipeable, GestureHandlerRootView} from 'react-native-gesture-handler';


const Notification = ({notification}: any) => {
  const { setUpdateNotificationsScreen } = useContext<any>(UserContext);
  const [user, setUser] = useState<any>('');

  useEffect(() => {
    getUser();
  })

  const getUser = async () => {
    let userData = await GetUserById(notification.personWhoLikedId)
    setUser(userData);
  }

  const deleteNotification = () => {
    DeleteNotification(notification.id);
    setUpdateNotificationsScreen(true);
  }

  const swipeRight = (progress: Animated.AnimatedInterpolation, dragAnimatedValue: Animated.AnimatedInterpolation) => {
    const opacity = dragAnimatedValue.interpolate({
      inputRange: [-150, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    }) 
    return(
      <TouchableOpacity onPress={deleteNotification} activeOpacity={1}>
      <Animated.View style={[styles.DeleteBox, {opacity}]}>
        <Ionicons name="md-trash" size={30} color="white" />
      </Animated.View>
      </TouchableOpacity>
    )
  }


  return(
    <GestureHandlerRootView>
    <Swipeable
    renderRightActions={swipeRight}
    >
  <View style={styles.NotificationView}>
    {
      user.image === null ? <Ionicons name="person-circle-sharp" size={75} style={styles.ImageStyle} color="white" />
      : <Image source={{uri: user.image}} style={styles.ImageStyle} />
    }
        <View style={{ justifyContent: "center" }}>
          <View style={{ flexDirection: "row", width: 225}}>
            <Text style={styles.TextStyle}>{notification.notificationText} </Text>
          </View>
        </View>
      </View>
      </Swipeable>
      </GestureHandlerRootView>
  )
}





const NotificationsScreen: FC = () => {
  const { userItems, updateNotificationsScreen, setUpdateNotificationsScreen } = useContext<any>(UserContext);
  const [notifications, setNotifications] = useState<any>([]);

  useEffect(() => {
    getNotifications();
    setUpdateNotificationsScreen(false);
  }, [updateNotificationsScreen])

  const getNotifications = async () => {
    let fetchedNotifications = await GetNotificationsByUserId(userItems.id);
    setNotifications(fetchedNotifications.reverse());
  }

  let [fontsLoaded] = useFonts({
    Lato_100Thin,
    Lato_100Thin_Italic,
    Lato_300Light,
    Lato_300Light_Italic,
    Lato_400Regular,
    Lato_400Regular_Italic,
    Lato_700Bold,
    Lato_700Bold_Italic,
    Lato_900Black,
    Lato_900Black_Italic,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const renderItem = ({ item }: any) => {
    return (
    <Notification 
      notification={item}
    />
    )
};

  return (
    <View style={styles.container}>
      <ImageBackground
        source={CricketPicture}
        resizeMode="cover"
        style={{ height: "100%", width: "100%", backgroundColor: "#0A326D" }}
      >
        <View style={styles.overlayContainer}>
          <Text style={styles.NotificationsText}>Notifications</Text>
          <FlatList
                data={notifications}
                renderItem={renderItem}
                keyExtractor={(item: any) => item.id}
                />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  NotificationsText: {
    fontFamily: "Lato_400Regular",
    fontStyle: "normal",
    fontWeight: "800",
    color: "white",
    fontSize: 32,
    marginBottom: 5,
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlayContainer: {
    flex: 1,
    marginTop: 40,
    marginLeft: 27,
    marginBottom: 50,    
  },
  ImageStyle: {
    height: 70,
    width: 70,
    borderRadius: 50,
    marginRight: 20,
  },
  TextStyle: {
    color: "white",
    fontSize: 16,
    fontFamily: "Lato_700Bold",
  },
  TimeText: {
    color: "#DFE6F5",
    fontSize: 13,
    paddingTop: 5,
    fontFamily: "Roboto_500Medium",
  },
  NotificationView: {
    flexDirection: "row",
    paddingTop: 5,
    paddingBottom: 34,
  },
  MiddleTextStyle: {
    color: "white",
    fontSize: 16,
    fontFamily: "Lato_300Light",
  },
  DeleteBox: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 100, 
    height: 80
  }
});

export default NotificationsScreen;
