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

import { DeleteUser, UpdateUser, UpdatePassword, GetUserById } from '../Services/DataService'
import { position } from "native-base/lib/typescript/theme/styled-system";


interface SettingsProps{ 
  onHelpPress: Function,
}


const SettingsNotificationsComponent: FC<SettingsProps> = (props) => {
  const { userItems, setUserItems } = useContext<any>(UserContext);

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

  // 150
  const offset = (Platform.OS === 'android') ? -300 : 150;


  return (
    <View style={styles.ScrollStyle}>
      <View style={styles.NotificationView }>
        <Text style={styles.TextStyle}>Notifications</Text>
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} style={[styles.SwitchStyle, styles.IconStyle]} />
      </View>

      <Pressable onPress={() => setShowModal(true)}>
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
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="full">
        {/* Removed avoidKeyboard, added a maxHeight, moved modal to the top of the screen */}
        {/* It also accomodates the Iphone se but not smaller phones though!!! */}
        <Modal.Content maxWidth="400px" maxHeight="375px"  style={styles.top}>
          <Modal.CloseButton />
          <Modal.Header><Text style={{color: '#0A326D', fontSize: 20,}}>Edit Profile</Text></Modal.Header>
          <Modal.Body overflow="hidden">
            <Box>
              <FormControl.Label>
                <Text style={[styles.LabelTxt, {marginLeft: 20}]}>First Name</Text>
              </FormControl.Label>
              <TextInput
                  style={styles.Input}
                  onChangeText={(text) => setFirstName(text)}
                  value={firstName}
                  placeholder={firstName}
                  accessibilityLabel="Enter your first name"
                  placeholderTextColor={"rgba(59, 86, 124, 1)"}
                />
            </Box>
            <Box mt="3">
              <FormControl.Label>
                <Text style={[styles.LabelTxt, {marginLeft: 20}]}>Last Name</Text>
              </FormControl.Label>
              <TextInput
                  style={styles.Input}
                  onChangeText={(text) => setLastName(text)}
                  value={lastName}
                  placeholder={lastName}
                  accessibilityLabel="Enter your last name"
                  placeholderTextColor={"rgba(59, 86, 124, 1)"}
                />
            </Box>
            <Box mt="3">
              <FormControl.Label>
                <Text style={[styles.LabelTxt, {marginLeft: 20}]}>Username</Text>
              </FormControl.Label>
              <TextInput
                  style={styles.Input}
                  onChangeText={(text) => setUsername(text)}
                  value={username}
                  placeholder={username}
                  accessibilityLabel="Enter your username"
                  placeholderTextColor={"rgba(59, 86, 124, 1)"}
                />
            </Box>
            <Box mt="3">
              <FormControl.Label>
                <Text style={[styles.LabelTxt, {marginLeft: 20}]}>Password</Text>
              </FormControl.Label>
              <TextInput
                  style={styles.Input}
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                  placeholder="Enter new password"
                  accessibilityLabel="Enter your password"
                  placeholderTextColor={"rgba(59, 86, 124, 1)"}
                />
            </Box>

            <Box mt='3'>
            <FormControl.Label>
              <Text style={[styles.LabelTxt, {marginLeft: 20}]}>Date of Birth</Text>
            </FormControl.Label>
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
                {/* <Pressable style={{backgroundColor: '#FAFAFA', borderWidth: 1, borderColor:'lightgray', borderRadius: 5,}} onPress={()=> setVisible(true)}>
                  <View style={{flexDirection:'row',  }}>
                  <Text style={{ fontSize:12, marginRight: 199, paddingTop: 5, paddingBottom: 5, paddingLeft: 11, color:"gray", fontFamily: 'Roboto_400Regular', opacity: 0.6}}>{dob}</Text>
                  </View>
                </Pressable> */}
                <Pressable style={{backgroundColor:'white', flex:0.95, height:55, borderRadius:20, marginLeft:16, shadowOffset: { width: -2, height: 4 },shadowOpacity: 0.5,shadowRadius: 3, elevation: 10}} onPress={()=> setVisible(true)}>
                  <View style={{flexDirection:'row', shadowColor: "black",}}>
                  <Text style={{color:'#3B567C', marginLeft:10, marginTop:19, fontSize:15, flex:0.9}}>Date of birth</Text>
                 <Text style={{color:'#3B567C',  marginLeft:130, marginTop:19, fontSize:15}}>{dob}</Text>
                  </View>
                </Pressable>
                  </View>
                  </PaperProvider>
              </Box>


            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 13}}>
            <Box>
              <FormControl.Label>
                  <Text style={[styles.LabelTxt, {marginLeft: 20}]}>State</Text>
              </FormControl.Label>
              <Box
                      maxW="155"
                      borderRadius={15}
                      style={{
                        backgroundColor: "white",
                        shadowColor: "black",
                        shadowOffset: { width: -2, height: 4 },
                        shadowOpacity: 0.5,
                        shadowRadius: 3,
                        marginLeft: 20,
                        elevation: 10
                      }}
                    >
                      <Select
                        minWidth="150"
                        minHeight="53"
                        accessibilityLabel="Choose Service"
                        placeholderTextColor={"#3B567C"}
                        placeholder={updatedState}
                        _selectedItem={{
                          bg: "black.300",
                          endIcon: <CheckIcon size={5} color="#3B567C" />,
                        }}
                        borderWidth="0"
                        fontFamily={"Roboto_400Regular"}
                        fontSize={15}
                        color={"#3B567C"}
                        onValueChange = {(itemValue) => setUpdatedState(itemValue)}
                      >
                        <Select.Item label="AL" value="AL" />
                        <Select.Item label="AK" value="AK" />
                        <Select.Item label="AZ" value="AZ" />
                        <Select.Item label="AR" value="AR" />
                        <Select.Item label="CA" value="CA" />
                        <Select.Item label="CO" value="CO" />
                        <Select.Item label="CT" value="CT" />
                        <Select.Item label="DE" value="DE" />
                        <Select.Item label="FL" value="FL" />
                        <Select.Item label="GA" value="GA" />
                        <Select.Item label="HI" value="HI" />
                        <Select.Item label="ID" value="ID" />
                        <Select.Item label="IL" value="IL" />
                        <Select.Item label="IN" value="IN" />
                        <Select.Item label="IA" value="IA" />
                        <Select.Item label="KS" value="KS" />
                        <Select.Item label="KY" value="KY" />
                        <Select.Item label="LA" value="LA" />
                        <Select.Item label="ME" value="ME" />
                        <Select.Item label="MD" value="MD" />
                        <Select.Item label="MA" value="MA" />
                        <Select.Item label="MI" value="MI" />
                        <Select.Item label="MN" value="MN" />
                        <Select.Item label="MS" value="MS" />
                        <Select.Item label="MO" value="MO" />
                        <Select.Item label="MT" value="MT" />
                        <Select.Item label="NE" value="NE" />
                        <Select.Item label="NV" value="NV" />
                        <Select.Item label="NH" value="NH" />
                        <Select.Item label="NJ" value="NJ" />
                        <Select.Item label="NM" value="NM" />
                        <Select.Item label="NY" value="NY" />
                        <Select.Item label="NC" value="NC" />
                        <Select.Item label="ND" value="ND" />
                        <Select.Item label="OH" value="OH" />
                        <Select.Item label="OK" value="OK" />
                        <Select.Item label="OR" value="OR" />
                        <Select.Item label="PA" value="PA" />
                        <Select.Item label="RI" value="RI" />
                        <Select.Item label="SC" value="SC" />
                        <Select.Item label="SD" value="SD" />
                        <Select.Item label="TN" value="TN" />
                        <Select.Item label="TX" value="TX" />
                        <Select.Item label="UT" value="UT" />
                        <Select.Item label="VT" value="VT" />
                        <Select.Item label="VA" value="VA" />
                        <Select.Item label="WA" value="WA" />
                        <Select.Item label="WV" value="WV" />
                        <Select.Item label="WI" value="WI" />
                        <Select.Item label="WY" value="WY" />
                      </Select>
                    </Box>
            </Box>
            <Box>
              <FormControl.Label>
                <Text style={[styles.LabelTxt, {marginLeft: 10}]}>
                City
                </Text></FormControl.Label>
              <TextInput
                  style={styles.cityInput}
                  onChangeText={(text) => setCity(text)}
                  value={city}
                  placeholder="City"
                  keyboardType="default"
                  placeholderTextColor={"rgba(59, 86, 124, 1)"}
                  accessibilityLabel="Enter the city you reside in"
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