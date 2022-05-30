import { TabRouter, useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useContext, useEffect, useState } from "react"
import { ImageBackground, StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard } from "react-native"
import SoccerBall from '../assets/SoccerBall.png';
import CardListComponent from "../Components/CardListComponent";
import PUGHeader from "../Components/PUGHeader";
import * as Notifications from "expo-notifications";
import UserContext from "../Context/UserContext";
import { UpdateUser } from "../Services/DataService";

type RootStackParamList ={
    Nav: undefined,
    event:{name: string},
    schedule:undefined,
    cardList:{name:string},
    GoToEvent:undefined,
    profile:undefined,
  }
type Props = NativeStackScreenProps<RootStackParamList, "GoToEvent">;

let show = false;
Notifications.setNotificationHandler({
  handleNotification: async () => {
   show = !show; 
    
    if (!show) return Promise.reject('This notification should not be shown');

    return {
      shouldShowAlert: true,
      shouldSetBadge: false,
      shouldPlaySound: false,
    }
}});


const ListViewEventsScreen: FC<Props> = ({navigation, route}) => {

    const { userItems, setPushToken, pushToken, setUpdateScreen, setUpdateEventScreen, setUpdateProfileScreen, setUpdateProfileOther, isSwitchOn} = useContext<any>(UserContext);


    const handleUpdatingUser = async (token:any) => {
      if(isSwitchOn == false){
        let userData = {
          Id: userItems.id,
          FirstName: userItems.firstName,
          LastName: userItems.lastName,
          Username: userItems.username,
          Salt: userItems.salt,
          Hash: userItems.hash,
          DateOfBirth:userItems.dateOfBirth,
          City:userItems.city,
          State:userItems.state,
          isTermsAccepted:userItems.isTermsAccepted,
          isEighteen:userItems.isEighteen,
          Image:userItems.image,
          NotificationToken:null,
          IsDeleted:false
        };
        let updateData = await UpdateUser(userData);
        setUpdateScreen(true);
        setUpdateEventScreen(true);
        setUpdateProfileScreen(true);
        setUpdateProfileOther(true);
      }
      else{
        let userData = {
            Id: userItems.id,
            FirstName: userItems.firstName,
            LastName: userItems.lastName,
            Username: userItems.username,
            Salt: userItems.salt,
            Hash: userItems.hash,
            DateOfBirth:userItems.dateOfBirth,
            City:userItems.city,
            State:userItems.state,
            isTermsAccepted:userItems.isTermsAccepted,
            isEighteen:userItems.isEighteen,
            Image:userItems.image,
            NotificationToken:token,
            IsDeleted:false
          };
          let updateData = await UpdateUser(userData);
          setUpdateScreen(true);
          setUpdateEventScreen(true);
          setUpdateProfileScreen(true);
          setUpdateProfileOther(true);
      }
    }

    useEffect(() => {
        Notifications.getPermissionsAsync()
          .then((statusObj) => {
            if (statusObj.status !== "granted") {
              return Notifications.requestPermissionsAsync();
            }
            return statusObj;
          })
          .then((statusObj) => {
            if (statusObj.status !== "granted") {
              throw new Error("Permission not granted.");
            }
          })
          .then(() => {
            return Notifications.getExpoPushTokenAsync();
        })
        .then((response) => {
            const token:any = response.data;
            setPushToken(token);
            handleUpdatingUser(token);
          })
          .catch((err) => {
            return null;
          });
      }, []);
    
      useEffect(() => {
        const backgroundSubscription =
          Notifications.addNotificationResponseReceivedListener((response) => {
          });
    
        const foregroundSubscription =
          Notifications.addNotificationReceivedListener((notification) => {
          });
        return () => {
          backgroundSubscription.remove();
          foregroundSubscription.remove();
        };
      }, []);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
          <ImageBackground source={SoccerBall} resizeMode="cover" style={{ height: "100%", width: "100%", backgroundColor: "#0A326D" }}>
              <PUGHeader/>
              <CardListComponent onEventDisplayPress={() =>  navigation.navigate('event', {name: 'danial'})} onProfilePress={() => navigation.navigate('profile')}/>
          </ImageBackground>
      </View>
      </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: "100%",
        height: "100%",
    },
})

export default ListViewEventsScreen;