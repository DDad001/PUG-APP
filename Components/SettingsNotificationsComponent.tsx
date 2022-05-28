import React, { FC, useState, useContext } from "react";
import {  ScrollView, StyleSheet, Image, View, Pressable, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { Switch } from "react-native-paper";
import AppLoading from "expo-app-loading";
import { DatePickerModal } from 'react-native-paper-dates';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import UserContext  from '../Context/UserContext';
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

import {
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
} from "@expo-google-fonts/roboto";

import { Ionicons } from '@expo/vector-icons';
import {
  Modal,
  Center,
  Button,
  FormControl,
  Input,
  Select,
  Text,
  CheckIcon,
  Box, 
  useToast
} from "native-base";

import { DeleteUser, UpdateUser, UpdatePassword, GetUserById, GetItemsByUserId, DeleteEventItem, GetFollowersByUserId, DeleteFollower, GetFollowingByUserId, GetLikedEventsByUserId, DeleteLikedEvent, GetNotificationsByUserId, DeleteNotification, GetNotificationsByPersonWhoLiked  } from '../Services/DataService'
import { position } from "native-base/lib/typescript/theme/styled-system";
import { NativeStackScreenProps } from "@react-navigation/native-stack";


interface SettingsProps{ 
  onHelpPress: Function,
  onEditProfilePress: Function,
  onDeleteAccountPress: Function
}

// type RootStackParamList = {
//   CreateAccount: undefined;
//   login: undefined;
//   Nav: undefined;
//   event: { name: string };
//   profile: { name: string };
//   PastEvents: undefined;
//   LikedEvents: undefined;
//   settings: undefined;
//   following: undefined;
//   LookAtEvent: undefined;
//   OtherPersonsFollowers: undefined;
//   OtherPersonsFollowings: undefined;
//   YourActiveEvents: undefined;
//   followers: undefined;
//   FAQ: undefined;
// };

// type Props = NativeStackScreenProps<RootStackParamList, "Nav">;

const SettingsNotificationsComponent: FC<SettingsProps> = (props) => {
  const { userItems, setUserItems, pushToken, setUpdateScreen, setUpdateProfileScreen, setUpdateEventScreen, setUpdateProfileOther, isSwitchOn, setIsSwitchOn } = useContext<any>(UserContext);

   const HelpHandler = () => {
    props.onHelpPress();
   }

   const EditProfileHandler = () => {
    props.onEditProfilePress();
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
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
  });

//   if (!fontsLoaded) {
//     return <AppLoading />;
//   }



  const onToggleSwitch = async() => {
    setIsSwitchOn(!isSwitchOn);
    if(isSwitchOn == true){
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
      console.log("userUpdate", userData);
      let updateData = await UpdateUser(userData);
      console.log("updatedData", updateData);
      console.log(isSwitchOn)
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
        NotificationToken:pushToken,
        IsDeleted:false
      };
      console.log("userUpdate", userData);
      let updateData = await UpdateUser(userData);
      console.log("updatedData", updateData);
      console.log(isSwitchOn)
      setUpdateScreen(true);
      setUpdateEventScreen(true);
      setUpdateProfileScreen(true);
      setUpdateProfileOther(true);
    }
  };

  const [showModal, setShowModal] = useState(false);
  let [updatedState, setUpdatedState] = useState(userItems.state);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const [firstName, setFirstName] = useState<string>(userItems.firstName);
  const [lastName, setLastName] = useState<string>(userItems.lastName);
  const [username, setUsername] = useState<string>(userItems.username);
  const [password, setPassword] = useState<string>("");
  const [dob, setDob] = useState<string>(userItems.dateOfBirth);
  const [city, setCity] = useState<string>(userItems.city);

  const [visible, setVisible] = React.useState<boolean>(false)

  const Errortoast = useToast();
  const Successtoast = useToast();
  
  const handleEditProfile = async () => {
    let edittedProfile = {
      Id: userItems.id, //userId useContext
      FirstName: firstName,
      LastName: lastName,
      Username: username,
      Salt: userItems.salt, //useContext
      Hash: userItems.hash,//useContext
      DateOfBirth: dob,
      City: city,
      State: updatedState,
      isTermsAccepted: userItems.isTermsAccepted,
      isEighteen: userItems.isEighteen,
      Image: userItems.image,
      IsDeleted: userItems.isDeleted
    }

    let today = new Date();
    let birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    var regex = /^[A-Za-z]+$/
    let FirstNameInput = regex.test(firstName);
    let LastNameInput = regex.test(lastName);
    let CityInput = regex.test(city);

    //console.log(FirstNameInput);
    //console.log(age);
    //console.log(userData);

    let result:any;
    //check if all the fields are empty!
    if(firstName.length < 1 || lastName.length < 1 || username.length < 1 || city.length < 1 || updatedState.length < 1 || password.length < 1){
      // Use zIndex on all of them go get the toast to appear in the front!
      Errortoast.show({ placement: "top",render: () => {return <Box style={{zIndex:1}} bg="danger.500" px="5" py="1" rounded="sm" mb={5}>Error: all fields must be filled out!</Box>;}});
    }
    else if(FirstNameInput == false){
      Errortoast.show({ placement:  "top",render: () => {return <Box style={{zIndex: 1}} bg="danger.500" px="2" py="1" rounded="sm" mb={5}>Error: first name must include characters only</Box>;}});
      //setShowModal(true);
    }
    else if(LastNameInput == false){
      Errortoast.show({ placement: "top",render: () => {return <Box style={{zIndex: 1}} bg="danger.500" px="2" py="1" rounded="sm" mb={5}>Error: last name must include characters only</Box>;}});
      //setShowModal(true);
    }
    else if(username.length < 8 ){
      Errortoast.show({ placement: "top",render: () => {return <Box style={{zIndex: 1}} bg="danger.500" px="2" py="1" rounded="sm" mb={5}>Error: username length is too small</Box>;}});
      //setShowModal(true);
    }
    else if(age < 18){
      Errortoast.show({ placement: "top",render: () => {return <Box style={{zIndex: 1}} bg="danger.500" px="2" py="1" rounded="sm" mb={5}>Error: you must be 18 years or older to create an account</Box>;}});
      //setShowModal(true);
    }
    else if(CityInput == false){
      Errortoast.show({ placement: "top",render: () => {return <Box style={{zIndex: 1}} bg="danger.500" px="2" py="1" rounded="sm" mb={5}>Error: city must include characters only</Box>;}});
      //setShowModal(true);
    }else if(password.length < 8){
      Errortoast.show({ placement: "top",render: () => {return <Box style={{zIndex: 1}} bg="danger.500" px="2" py="1" rounded="sm" mb={5}>Error: password length is too small</Box>;}});
    }
    else{
      result = await UpdateUser(edittedProfile);
      //console.log(result);
      if(!result){
        Errortoast.show({ placement: "top",render: () => {return <Box style={{zIndex: 1}} bg="danger.500" px="2" py="1" rounded="sm" mb={5}>Error: username has already been taken</Box>;}});
        //setShowModal(true);
      }else{
        Successtoast.show({ placement: "top",render: () => {return <Box style={{zIndex: 1}} bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>Account successfully updated!</Box>}});
        setShowModal(false);
        setTimeout(() => {
          UpdatePassword(userItems.id, password);
        }, 1000)
        let updatedUser = await GetUserById(userItems.id);
        setUserItems(updatedUser);
      }
    }

    // if(password != ""){
    //   if(password.length < 8){
    //     Errortoast.show({ placement: "top",render: () => {return <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>Error: password length is too small</Box>;}});
    //     // setShowModal(true);
    //   }else{
        // setTimeout(() => {
        //   UpdatePassword(userItems.id, password);
        // }, 1000)
    //     // setShowModal(false);
    //   }
    // }
  }



  const DeleteAccountHandler = async () => {
    //need to use useContext for this to get user's username
    //event Model
    let usersEvents = await GetItemsByUserId(userItems.id);
    usersEvents.map(async(event: any, idx: number) => {
      await DeleteEventItem(event.id);
    })
    //Followers Model
    let usersFollowers = await GetFollowersByUserId(userItems.id);
    usersFollowers.map(async(follower: any, idx: number) => {
      await DeleteFollower(follower.userId, userItems.id);
    })
    //Following Model
    let usersFollowing = await GetFollowingByUserId(userItems.id);
    usersFollowing.map(async(following: any, idx: number) =>{
      await DeleteFollower(userItems.id, following.followerId );
    })
    //Liked Events Model
    let usersLikedEvents = await GetLikedEventsByUserId(userItems.id);
    usersLikedEvents.map(async(likedEvent: any, idx: number) => {
      await DeleteLikedEvent(userItems.id, likedEvent.eventId);
    })
    //Notifications Model 
    let usersNotifications = await GetNotificationsByUserId(userItems.id);
    usersNotifications.map(async(notification: any, idx: number) => {
      await DeleteNotification(notification.id);
    })

    let usersOtherNotifications = await GetNotificationsByPersonWhoLiked(userItems.id);
    usersOtherNotifications.map(async (notification: any, idx: number) => {
      await DeleteNotification(notification.id);
    })
    //Delete User
    await DeleteUser(userItems.username);
    //console.log('Deleted');
    //Set userItems to {}
    setUserItems({});
    props.onDeleteAccountPress();
  }

  const onDismiss = React.useCallback(() => {
    setVisible(false)
  }, [setVisible])

  const onChange = React.useCallback(({ date }) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      
    setVisible(false)
    let d = date.toString();
    let splArr = d.split(" ")
    let month = splArr.slice(1, 2).join(" ")
    let day = splArr.slice(2, 3).join(" ")
    let year = splArr.slice(3, 4).join(" ")
    month = months.indexOf(month);
    setDob( month+1+'/'+day +'/'+year );
  }, [])

  const newDate = new Date()

  const theme = { ...DefaultTheme,colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  }, }

  // 150
  const offset = (Platform.OS === 'android') ? -300 : 150;


  return (
    <View style={styles.ScrollStyle}>
      <View style={styles.NotificationView }>
        <Text style={styles.TextStyle}>Notifications</Text>
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} style={[styles.SwitchStyle, styles.IconStyle]} />
      </View>

      <Pressable onPress={EditProfileHandler}>
        <View style={styles.NotificationView}>
        <Text style={styles.TextStyle}>Edit Profile</Text>
        <Ionicons name="chevron-forward" size={32} color="#E8F1FF" style={styles.IconStyle} />
        </View>
      </Pressable>

        <Pressable onPress={HelpHandler}>
        <View style={styles.NotificationView}>
        <Text style={styles.TextStyle}>Help</Text>
        <Ionicons name="chevron-forward" size={32} color="#E8F1FF" style={styles.IconStyle} />
        </View>
        </Pressable>

      <Pressable onPress={() => setShowDeleteModal(true)}>
        <View style={styles.NotificationView}>
        <Text style={styles.TextStyle}>Delete Account</Text>
        
        <Ionicons name="chevron-forward" size={32} color="#E8F1FF" style={styles.IconStyle} />
        </View>
      </Pressable>

    <Center style={{ marginTop: 50, flexDirection: 'row' }}>
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Body style={{ marginLeft: 25, marginRight: 25, marginTop: 20}}>
            <Text style={{ fontFamily: 'Lato_700Bold', fontSize: 16, fontWeight: '800', color: '#0A326D', textAlign: 'center' }}>Are You Sure You Want to Delete Your Account? Your Account Will Be Permanently Deleted.</Text>
          </Modal.Body>
              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 20}}> 
              <Button
                style={{backgroundColor: '#0A326D', paddingLeft: 30, paddingRight: 30, borderRadius: 10}}
                onPress={() => {
                  setShowDeleteModal(false);
                  DeleteAccountHandler();
                }}
              >
                <Text style={{ fontFamily: 'Lato_700Bold', fontSize: 16, fontWeight: '800', color: 'white'}}>Yes</Text>
              </Button>
              <Button
                onPress={() => {
                  setShowDeleteModal(false);
                }}
                style={{backgroundColor: '#0A326D', paddingLeft: 35, paddingRight: 35, borderRadius: 10}}
              >
                <Text style={{ fontFamily: 'Lato_700Bold', fontSize: 16, fontWeight: '800', color: 'white'}}>No</Text>
              </Button>
              </View>
            
        </Modal.Content>
      </Modal>
    </Center>


    </View>
  );
};

const styles = StyleSheet.create({
  ImageStyle: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  ScrollStyle: {
    flex: 1,
    marginBottom: 50
  },
  TextStyle: {
    color: "white",
    fontSize: 20,
    fontFamily: "Lato_400Regular",
    marginLeft: 35,
  },
  NotificationView: {
    //flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 30,
    alignItems: 'center',
  },
  SwitchStyle: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 15,
  },
  IconStyle: {
    marginRight: 35,
  },Input:{
    fontFamily: "Roboto_400Regular",
    color: "rgba(59, 86, 124, 1)",
    fontSize: 15,
    height: 55,
    // marginTop: 10,
    marginLeft: 18,
    marginRight: 20,
    // marginBottom: 20,
    borderWidth: 1,
    padding: 10,
    borderColor: "white",
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 10,
  },
  cityInput: {
    fontFamily: "Roboto_400Regular",
    color: "rgba(59, 86, 124, 1)",
    fontSize: 15,
    height: 55,
    width: 150,
    marginLeft: 10,
    marginRight: 25,
    borderWidth: 1,
    padding: 10,
    borderColor: "white",
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 10,
  },
  LabelTxt: {
    fontFamily: "Roboto_400Regular",
    color: "rgba(59, 86, 124, 1)",
    fontSize: 15,
  },
  ToastStyle:{
    zIndex: 1 
  },
  top: {
    marginBottom: "auto",
    marginTop: 45
  },
});

export default SettingsNotificationsComponent;