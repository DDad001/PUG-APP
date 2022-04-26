import React, { FC, useState, useContext } from "react";
import {  ScrollView, StyleSheet, Image, View, Pressable} from "react-native";
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

import { DeleteUser, UpdateUser, UpdatePassword } from '../Services/DataService'


interface SettingsProps{ 
  onHelpPress: Function,
}


const SettingsNotificationsComponent: FC<SettingsProps> = (props) => {
  const { userItems } = useContext<any>(UserContext);

   const HelpHandler = () => {
    props.onHelpPress();
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

  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

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
    if(FirstNameInput == false){
      Errortoast.show({ placement: "top",render: () => {return <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>Error: first name must include characters only</Box>;}});
      //setShowModal(true);
    }
    else if(LastNameInput == false){
      Errortoast.show({ placement: "top",render: () => {return <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>Error: last name must include characters only</Box>;}});
      //setShowModal(true);
    }
    else if(username.length < 8 ){
      Errortoast.show({ placement: "top",render: () => {return <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>Error: username length is too small</Box>;}});
      //setShowModal(true);
    }
    else if(age < 18){
      Errortoast.show({ placement: "top",render: () => {return <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>Error: you must be 18 years or older to create an account</Box>;}});
      //setShowModal(true);
    }
    else if(CityInput == false){
      Errortoast.show({ placement: "top",render: () => {return <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>Error: city must include characters only</Box>;}});
      //setShowModal(true);
    }
    else{
      result = await UpdateUser(edittedProfile);
      //console.log(result);
      if(!result){
        Errortoast.show({ placement: "top",render: () => {return <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>Error: username has already been taken</Box>;}});
        //setShowModal(true);
      }else{
        Successtoast.show({ placement: "top",render: () => {return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>Account successfully updated!</Box>}});
        setShowModal(false);
      }
    }

    if(password != ""){
      if(password.length < 8){
        Errortoast.show({ placement: "top",render: () => {return <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>Error: password length is too small</Box>;}});
        setShowModal(true);
      }else{
        setTimeout(() => {
          UpdatePassword(userItems.id, password);
        }, 1000)
        setShowModal(false);
      }
    }
  }

  const handleDeleteProfile = () => {
    //need to use useContext for this to get user's username
    DeleteUser(userItems.username);
    //console.log('Deleted');

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

  return (
    <View style={styles.ScrollStyle}>
      <View style={styles.NotificationView }>
        <Text style={styles.TextStyle}>Notifications</Text>
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} style={[styles.SwitchStyle, styles.IconStyle]} />
      </View>

      <View style={styles.NotificationView}>
      <Text style={styles.TextStyle}>Edit Profile</Text>
        <Pressable onPress={() => setShowModal(true)}>
        <Ionicons name="chevron-forward" size={32} color="#E8F1FF" style={styles.IconStyle} />
        </Pressable>
        
      </View>

        <Pressable onPress={HelpHandler}>
        <View style={styles.NotificationView}>
        <Text style={styles.TextStyle}>Help</Text>
        <Ionicons name="chevron-forward" size={32} color="#E8F1FF" style={styles.IconStyle} />
        </View>
        </Pressable>

      <View style={styles.NotificationView}>
        <Text style={styles.TextStyle}>Delete Account</Text>
        <Pressable onPress={() => setShowDeleteModal(true)}>
        
        <Ionicons name="chevron-forward" size={32} color="#E8F1FF" style={styles.IconStyle} />
        </Pressable>
      </View>

      <Center style={{ marginTop: 50, flexDirection: 'row' }}>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header><Text style={{color: '#0A326D', fontSize: 20,}}>Edit Profile</Text></Modal.Header>
          <Modal.Body>
            <Box>
              <FormControl.Label> First Name</FormControl.Label>
              <Input fontFamily="Roboto_400Regular" placeholder={firstName}
              onChangeText={(text) => setFirstName(text)}
              />
            </Box>
            <Box mt="3">
              <FormControl.Label>Last Name</FormControl.Label>
              <Input fontFamily="Roboto_400Regular" placeholder={lastName} 
              onChangeText={(text) => setLastName(text)}
              />
            </Box>
            <Box mt="3">
              <FormControl.Label>Username</FormControl.Label>
              <Input fontFamily="Roboto_400Regular" placeholder={username} 
              onChangeText={(text) => setUsername(text)}
              />
            </Box>
            <Box mt="3">
              <FormControl.Label>Password</FormControl.Label>
              <Input fontFamily="Roboto_400Regular" placeholder="Enter New Password" type="password"
              onChangeText={(text) => setPassword(text)}
              />
            </Box>

            <Box mt='3'>
            <FormControl.Label>Date of Birth</FormControl.Label>
            <PaperProvider theme={theme}>
                  <View style={{flexDirection:'row',flex: 1,}}>
                <DatePickerModal 
                  mode="single"
                  visible={visible}
                  onDismiss={onDismiss}
                  date={newDate}
                  // validRange={{
                  //   startDate: new Date(2005, 15, 2),  // optional
                  //    endDate: new Date(2005, 3, 2), // optional
                  //  }}
                  onConfirm={onChange}
                  saveLabel="Save" // optional
                  label="Select date" // optional
                  animationType="slide" // optional, default is 'slide' on ios/android and 'none' on web
                  locale={'en'}// optional, default is automically detected by your system  
                  /> 
                <Pressable style={{backgroundColor: '#FAFAFA', borderWidth: 1, borderColor:'lightgray', borderRadius: 5,}} onPress={()=> setVisible(true)}>
                  <View style={{flexDirection:'row',  }}>
                  <Text style={{ fontSize:12, marginRight: 199, paddingTop: 5, paddingBottom: 5, paddingLeft: 11, color:"gray", fontFamily: 'Roboto_400Regular', opacity: 0.6}}>{dob}</Text>
                  </View>
                </Pressable>
                  </View>
                  </PaperProvider>
              </Box>


            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 13}}>
            <Box>
              <FormControl.Label>State</FormControl.Label>
              <Select
                fontFamily="Roboto_400Regular"
                selectedValue={updatedState}
                minWidth="130"
                accessibilityLabel="Choose Service"
                placeholder="Choose State"
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />,
                }}
                onValueChange={(itemValue) => setUpdatedState(itemValue)}
              >
                <Select.Item label="California" value="CA" />
                <Select.Item label="Arizona" value="AZ" />
                <Select.Item label="Nevada" value="NV" />
                <Select.Item label="Oregon" value="OR" />
                <Select.Item label="Washington" value="WA" />
              </Select>
            </Box>
            <Box>
              <FormControl.Label >City</FormControl.Label>
              <Input fontFamily="Roboto_400Regular" placeholder={city} minWidth="150" 
              onChangeText={(text) => setCity(text)}
              />
            </Box>
            </View>
            
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onPress={() => {
                  handleEditProfile();
                }}
                style={{backgroundColor: '#0A326D'}}
              >
                Save Changes
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>

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
                  handleDeleteProfile();
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
  }
});

export default SettingsNotificationsComponent;