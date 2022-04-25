import { FC, useState } from "react";
import {  ScrollView, StyleSheet, Image, View, Pressable} from "react-native";
import { Switch } from "react-native-paper";
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
  Box
} from "native-base";

import { DeleteUser } from '../Services/DataService'


interface SettingsProps{ 
  onHelpPress: Function,
}


const SettingsNotificationsComponent: FC<SettingsProps> = (props) => {

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
  let [updatedState, setUpdatedState] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [dob, setDob] = useState<string>("");
  const [city, setCity] = useState<string>("");
  
  const handleEditProfile = () => {
    let edittedProfile = {
      Id: 2, //userId
      FirstName: firstName,
      LastName: lastName,
      Username: username,
      Salt: "", //?
      Hash: "",//?
      DateOfBirth: dob,
      City: city,
      State: updatedState,
      isTermsAccepted: true,
      isEighteen: true,
      Image: "",
      IsDeleted: false
    }
    console.log(edittedProfile);
    //AddEventItem(newEvent);
  }

  const handleDeleteProfile = () => {
    //need to use useContext for this to get user's username
    //DeleteUser(useContext.username);
    console.log('Deleted');
  }

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
              <Input placeholder="Enter First Name"
              onChangeText={(text) => setFirstName(text)}
              />
            </Box>
            <Box mt="3">
              <FormControl.Label>Last Name</FormControl.Label>
              <Input placeholder="Enter Last Name" 
              onChangeText={(text) => setLastName(text)}
              />
            </Box>
            <Box mt="3">
              <FormControl.Label>Username</FormControl.Label>
              <Input placeholder="Enter Username" 
              onChangeText={(text) => setUsername(text)}
              />
            </Box>
            <Box mt="3">
              <FormControl.Label>Password</FormControl.Label>
              <Input placeholder="Enter Password" type="password"
              onChangeText={(text) => setPassword(text)}
              />
            </Box>
            <Box mt="3">
              <FormControl.Label>Date of Birth</FormControl.Label>
              <Input placeholder="MM/DD/YYYY" />
            </Box>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 13}}>
            <Box>
              <FormControl.Label>State</FormControl.Label>
              <Select
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
              <Input placeholder="Enter City" minWidth="150" 
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
                  setShowModal(false);
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