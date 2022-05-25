import React, { FC, useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ImageBackground,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform
} from "react-native";
// import { Datepicker, Icon, Layout } from "@ui-kitten/components";
import PUGbutton from "../Components/PUGButton";
import CourtPicture from "../assets/Court.png";
import AppLoading from "expo-app-loading";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import {
  useFonts,
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

import {
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
  en,
  // nl,
  // de,
  // pl,
  // pt,
  //enGB,
  registerTranslation,
} from 'react-native-paper-dates'
registerTranslation('en', en)

import { Box, CheckIcon, FormControl, Select, HStack, Checkbox, Center, Modal, Button, VStack, NativeBaseProvider, Input, Stack, useToast } from "native-base";
import { Entypo } from "@expo/vector-icons";
import { DatePickerModal } from 'react-native-paper-dates';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { createAccount, GetUserByUsername, GetCitiesByState } from "../Services/DataService";

import { Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { blueGrey100 } from "react-native-paper/lib/typescript/styles/colors";
import { Item } from "react-native-paper/lib/typescript/components/List/List";
import { FontAwesome5 } from '@expo/vector-icons';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import UserContext  from '../Context/UserContext';

type RootStackParamList ={
  CreateAccount: undefined,
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

type Props = NativeStackScreenProps<RootStackParamList, "CreateAccount">;


const CreateAccountScreen: FC<Props> = ({navigation}) => {
  const { setUserItems } = useContext<any>(UserContext);

  const [newFirstName, setNewFirstName] = useState<string>("");
  const [newLastName, setNewLastName] = useState<string>("");
  const [newUsername, setNewUsername] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  //Native base useStates
  const [showModal, setShowModal] = useState<boolean>(false);

  const [date, setDate] = useState<Date>(new Date());
  const Errortoast = useToast();
  const Successtoast = useToast();
  const [DOB, setDOB] = useState<string>("MM/DD/YYYY");
  const [state, setState] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [visible, setVisible] = React.useState<boolean>(false)
  const [show, setShow] = React.useState(false);
  const [isTermsOfServiceAccepted, setIsTermsOfServiceAccepted] = useState<boolean>(false);
  const [isOverAgeOf18, setIsOverAgeOf18] = useState<boolean>(false);
  const [disableBtn, setDisableBtn] = useState<boolean>(false);

  const areTermsAccepted = (isTermsAccepted:boolean) => {
    setIsTermsOfServiceAccepted(isTermsAccepted);
  }

  const isUser18orOrGreater = (isUser18OrOver:boolean) => {
    setIsOverAgeOf18(isUser18OrOver);
  }

  const handleCreateAccount = async () => {
    setDisableBtn(true);
    console.log("disabled");
    let userData = {
      Id: 0,
      FirstName: newFirstName,
      LastName: newLastName,
      Username: newUsername,
      Password: newPassword,
      DateOfBirth:DOB,
      City:city,
      State:state,
      isTermsAccepted:isTermsOfServiceAccepted,
      isEighteen:isOverAgeOf18,
    };

    let today = new Date();
    let birthDate = new Date(DOB);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    //Get the info of the cities of a state
    let citiesArr:any = await GetCitiesByState(state);
    let cityNames: string[] = [];

    for(let i = 0; i <citiesArr.length; i++){
      cityNames.push(citiesArr[i].name);
    }

    var regex = /^[A-Za-z]+$/
    let FirstNameInput = regex.test(newFirstName);
    let LastNameInput = regex.test(newLastName);
    let CityInput = regex.test(city);

    console.log(FirstNameInput);
    console.log(age);
    console.log(userData);

    let result:any;
    if(newFirstName == ""){ 
      Errortoast.show({ placement: "top",render: () => {return <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>Error: You must include a first name to create an account</Box>;}});
    }
    else if(newLastName == ""){ 
      Errortoast.show({ placement: "top",render: () => {return <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>Error: You must include a last name to create an account</Box>;}});
    }
    else if(FirstNameInput == false){
      Errortoast.show({ placement: "top",render: () => {return <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>Error: first name must include characters only and no spaces</Box>;}});
    }
    else if(LastNameInput == false){
      Errortoast.show({ placement: "top",render: () => {return <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>Error: last name must include characters only and no spaces</Box>;}});
    }
    else if(newUsername.length < 8 ){
      Errortoast.show({ placement: "top",render: () => {return <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>Error: username length must be at least 8 characters long</Box>;}});
    }
    else if(newPassword.length < 8){
      Errortoast.show({ placement: "top",render: () => {return <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>Error: password length must be at least 8 characters long</Box>;}});
    }
    else if(age < 18){
      Errortoast.show({ placement: "top",render: () => {return <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>Error: Date Of Birth: you must be 18 years or older to create an account</Box>;}});
    }
    else if(state == ""){
      Errortoast.show({ placement: "top",render: () => {return <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>Error: You must include a state to create an account</Box>;}});
    } 
    else if(city == ""){
      Errortoast.show({ placement: "top",render: () => {return <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>Error: You must include a city to create an account</Box>;}});
    } 
    else if(CityInput == false){
      Errortoast.show({ placement: "top",render: () => {return <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>Error: city field must include characters only</Box>;}});
    } 
    else if(!cityNames.includes(city)){
      Errortoast.show({ placement: "top",render: () => {return <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>Error: enter a valid city that corresponds to your event's state!</Box>;}});
    } 
    else if(!isTermsOfServiceAccepted){
      Errortoast.show({ placement: "top",render: () => {return <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>Error: You must Accept PUG's Terms of Service to create an account</Box>;}});
    }
    else if(!isOverAgeOf18){
      Errortoast.show({ placement: "top",render: () => {return <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>Error: You must Accept that you are 18 years or Older to create an account</Box>;}});
    }
    else{
      result = await createAccount(userData);
      console.log(result);
      if(!result){
        Errortoast.show({ placement: "top",render: () => {return <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>Error: username has already been taken</Box>;}});
      }else{
      Successtoast.show({ placement: "top",render: () => {return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>Account successfully created!</Box>}});
      navigation.navigate('Nav');
      let userItems1 = await GetUserByUsername(userData.Username);
      setUserItems(userItems1);
      //console.log(userItems1);
      }
    }

    setTimeout(() => {
      setDisableBtn(false);
      console.log("enabled");
    }, 2000)
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
    setDOB( month+1+'/'+day +'/'+year );
  }, [])

  const newDate = new Date()

  const theme = { ...DefaultTheme,colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  }, }

  let [fontsLoaded, error] = useFonts({
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

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <ImageBackground
        source={CourtPicture}
        resizeMode="cover"
        style={{ height: "100%", width: "100%" }}
      >
       <SafeAreaView>
          <Pressable onPress={() => navigation.navigate('login')}  style={{marginTop:20, marginLeft:30}}>
          <FontAwesome5 name="chevron-left" size={24} color="white" />
          </Pressable>
       </SafeAreaView>

          <Text style={{marginTop:20, marginLeft:25, fontFamily:"Roboto_400Regular", fontSize:20, color:"white", marginBottom: 5}}>
             Join the PUG family and create your account. 
          </Text>


          <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
          <ScrollView style={{flex: 1}}>
            <View style={{ flex: 0.7, marginTop:20}}>

              <TextInput
                style={[styles.input, { marginTop: 0 }]}
                onChangeText={(text) => setNewFirstName(text)}
                maxLength={15}
                value={newFirstName}
                placeholder="First name"
                keyboardType="default"
                placeholderTextColor={"rgba(59, 86, 124, 1)"}
                accessibilityLabel="Enter first name"
              />
              <TextInput
                style={styles.input}
                onChangeText={(text) => setNewLastName(text)}
                maxLength={15}
                value={newLastName}
                placeholder="Last name"
                keyboardType="default"
                placeholderTextColor={"rgba(59, 86, 124, 1)"}
                accessibilityLabel="Enter last name"
              />
              <View style={{}}>
                <TextInput
                  style={styles.UsernameInput}
                  onChangeText={(text) => setNewUsername(text)}
                  maxLength={15}
                  value={newUsername}
                  placeholder="Username"
                  keyboardType="default"
                  placeholderTextColor={"rgba(59, 86, 124, 1)"}
                  accessibilityLabel="Enter username"
                />
                <Text style={{
                  marginTop: 5,
                  marginBottom: 10,
                  color: "white",
                  fontFamily: "Roboto_400Regular",
                  fontSize: 15,
                  paddingLeft: 25,

                }}
                >{newUsername.length}/15 max length</Text>
              </View>
              {/* <TextInput
                style={styles.input}
                onChangeText={(text) => setNewPassword(text)}
                value={newPassword}
                placeholder="Password"
                keyboardType="default"
                placeholderTextColor={"rgba(59, 86, 124, 1)"}
                accessibilityLabel="Enter password"

              /> */}

          <View style={{height: 75, shadowColor: "black", shadowOffset: { width: -2, height: 4 }, shadowOpacity: 0.5, shadowRadius: 3}}>
              <Input
              backgroundColor={'white'} borderWidth={0} w={"91%"} marginLeft={4} bg={'white'} shadowColor={"black"} shadow={9} marginBottom={40} borderRadius={20} fontSize="15" fontFamily={"Roboto_400Regular"} h={{base:"75%"}}  type={show ? "text" : "password"} 
              InputRightElement={<Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={7} mr="5" color="rgba(59, 86, 124, 1)" onPress={() => setShow(!show)} />} placeholder="Password" 
              placeholderTextColor={"rgba(59, 86, 124, 1)"}  onChangeText={(text) => setNewPassword(text)} value={newPassword} accessibilityLabel="Enter password" keyboardType="default"/>
          </View>


         
        {/* shadowColor: "black",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3, */}

              {/* <Datepicker
                style={[styles.input, {}]}
                // date={new Date(2000, 0, 1)}
                initialVisibleDate={new Date(2000, 0, 1)}
                date={date}
                min={new Date(1900, 0, 0)}
                max={new Date(2004, 7, 4)}
                onSelect={(nextDate) => setDate(nextDate)}
              /> */}

                <View></View>
                <PaperProvider theme={theme}>
                  <View style={{flexDirection:'row',flex: 1}}>
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
                
                <Pressable style={{ backgroundColor:'white', flex:0.95, height:55, borderRadius:20, marginLeft:16, marginBottom:20, shadowOffset: { width: -2, height: 4 },shadowOpacity: 0.5,shadowRadius: 3}} onPress={()=> setVisible(true)}>
                  <View style={{flexDirection:'row', shadowColor: "black",}}>
                  <Text style={{color:'#3B567C', marginLeft:10, marginTop:19, fontSize:15, flex:0.9}}>Date of birth</Text>
                 <Text style={{color:'#3B567C',  marginLeft:130, marginTop:19, fontSize:15}}>{DOB}</Text>
                  </View>
                </Pressable>
                  </View>
                  </PaperProvider>


              {/* State dropdown and city input field! */}
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <View style={{ marginTop: 3, marginLeft: 18 }}>
                    <Box
                      maxW="155"
                      borderRadius={15}
                      style={{
                        backgroundColor: "white",
                        shadowColor: "black",
                        shadowOffset: { width: -2, height: 4 },
                        shadowOpacity: 0.5,
                        shadowRadius: 3,
                      }}
                    >
                      <Select
                        minWidth="150"
                        minHeight="53"
                        onValueChange={(text) => setState(text)}
                        accessibilityLabel="Choose Service"
                        placeholderTextColor={"#3B567C"}
                        placeholder="Select State"
                        _selectedItem={{
                          bg: "black.300",
                          endIcon: <CheckIcon size={5} color="#3B567C" />,
                        }}
                        borderWidth="0"
                        fontFamily={"Roboto_400Regular"}
                        fontSize={15}
                        color={"#3B567C"}
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
                      {/* <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Please make a selection!
        </FormControl.ErrorMessage> */}
                    </Box>
                  </View>
                </View>
                <TextInput
                  style={styles.cityInput}
                  onChangeText={(text) => setCity(text)}
                  value={city}
                  placeholder="City"
                  keyboardType="default"
                  placeholderTextColor={"rgba(59, 86, 124, 1)"}
                  accessibilityLabel="Enter the city you reside in"
                />
              </View>
            </View>

            {/* one checkBox */}
            <View style={{flex: 0.2, marginBottom: 20,marginTop:20}}>     
              <HStack>
                  <Checkbox style={{height: 40, width: 40, marginLeft: 20}} value="true" size="lg" onChange={(Boolean) => areTermsAccepted(Boolean)} accessibilityLabel="I accept PUG's terms and services" />
                  <View style={{flex: 1, marginLeft: 10,alignItems: "center", flexDirection: "row"}}>
                    <Text style={styles.subTxtNoUnderline}>I accept PUG's</Text>
                    <Pressable onPress={() => setShowModal(true)}>
                      <Text style={styles.subTxtNoMargin}>terms and services</Text>
                    </Pressable>
                  </View>
              </HStack>
            </View> 
            {/* One checkbox */}
            <View style={{flex: 0.2}}>     
              <HStack>
                  <Checkbox style={{height: 40, width: 40, marginLeft: 20}} value="true" size="lg" onChange={(Boolean) => isUser18orOrGreater(Boolean)} accessibilityLabel="I am 18 years old or over to use the application!" />
                  <View style={{flex: 1, marginLeft: 10, justifyContent: "center"}}>
                    <Text style={styles.subTxtNoUnderline}>I am 18 years old or over</Text>
                  </View>
              </HStack>
            </View> 
            <Center>
              <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="full">
              <Modal.Content size="full">
              <Modal.CloseButton />
              <Modal.Header>PUG's Terms and Services</Modal.Header>
              <Modal.Body>
                <Box>
                  <Text style={{marginBottom:10, fontFamily:"Lato_700Bold" }}>1. Eligiblity and Registration</Text>
                  <Text style={{fontFamily:"Lato_400Regular"}}>We, the PUG team are not liable for any damages, or bodily harm that occur when using the app. Use descretion when going to sporting events.</Text>
                  <Text style={{marginBottom:10, marginTop:20, fontFamily:"Lato_700Bold" }}>2. Eligiblity and Registration</Text>
                  <Text style={{fontFamily:"Lato_400Regular"}}>We, the PUG team are not liable for any damages, or bodily harm that occur when using the app. Use descretion when going to sporting events.</Text>
                  <Text style={{marginBottom:10, marginTop:20, fontFamily:"Lato_700Bold" }}>3. Eligiblity and Registration</Text>
                  <Text style={{fontFamily:"Lato_400Regular"}}>We, the PUG team are not liable for any damages, or bodily harm that occur when using the app. Use descretion when going to sporting events.</Text>
                  <Text style={{marginBottom:10, marginTop:20, fontFamily:"Lato_700Bold" }}>4. Eligiblity and Registration</Text>
                  <Text style={{fontFamily:"Lato_400Regular"}}>We, the PUG team are not liable for any damages, or bodily harm that occur when using the app. Use descretion when going to sporting events.</Text>
                </Box>
              </Modal.Body>
              <Modal.Footer>
            <Button.Group space={2}>
              <Button colorScheme={"rgba(10, 50, 109, 1)"} _pressed={{bg: 'muted.500'}} onPress={() => {
              setShowModal(false);
            }}>
                Close
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>

            {/* Flex losses all meaning when scroll view is used! Disregard logic with flex below! */}
            <View style={{ flex: 0.2, alignItems: "center", marginTop: 20}}>
              <Pressable disabled={disableBtn}
                style={{
                  backgroundColor: "rgba(10, 50, 109, 1)",
                  borderRadius: 50,
                  paddingLeft: 60,
                  paddingRight: 60,
                }}
                onPress={handleCreateAccount}
              >
                <Text style={styles.createAccountBtnTxt}>Create Account</Text>
              </Pressable>
            </View>
            <View
              style={{
                flex: 0.2,
                justifyContent: "center",
                marginTop: 25,
                flexDirection: "row",
              }}
            >
              <Text style={styles.subTxtNoUnderline}>
                Already have an account?
              </Text>
              <Pressable
                onPress={() => navigation.navigate('login')}
                accessibilityLabel="Go to login screen"
              >
                <Text style={styles.subTxt}>Login here!</Text>
              </Pressable>
            </View>

          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlayContainer: {
    flex: 1,
  },
  // headingTxt: {
  //   color: "white",
  //   fontWeight: "600",
  //   fontFamily: "Roboto_700Bold",
  //   fontSize: 24,
  //   // marginTop: 30,
  // },
  // subheadingTxt: {
  //   fontSize: 16,
  //   paddingLeft: 15,
  //   color: "white",
  // },
  input: {
    //Text styling for the input fields!
    fontFamily: "Roboto_400Regular",
    color: "rgba(59, 86, 124, 1)",
    fontSize: 15,
    height: 55,
    // marginTop: 10,
    marginLeft: 18,
    marginRight: 20,
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
    borderColor: "white",
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 10
  },
  stateInput: {
    fontFamily: "Roboto_400Regular",
    color: "rgba(59, 86, 124, 1)",
    fontSize: 15,
    height: 55,
    width: 150,
    // marginTop: 10,
    marginLeft: 18, //might actually need this!
    // marginRight: 20,
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
    borderColor: "white",
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 10
  },
  cityInput: {
    fontFamily: "Roboto_400Regular",
    color: "rgba(59, 86, 124, 1)",
    fontSize: 15,
    height: 55,
    width: 150,
    marginLeft: 31,
    marginRight: 20,
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
    borderColor: "white",
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 10
  },
  UsernameInput: {
    //Text styling for the input fields!
    fontFamily: "Roboto_400Regular",
    color: "rgba(59, 86, 124, 1)",
    fontSize: 15,
    height: 55,
    // marginTop: 10,
    marginLeft: 18,
    marginRight: 20,
    borderWidth: 1,
    padding: 10,
    borderColor: "white",
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 10
  },
  createAccountBtnTxt: {
    color: "white",
    fontFamily: "Roboto_400Regular",
    fontSize: 20,
    justifyContent: "center",
    paddingTop: 20,
    paddingBottom: 20,
  },
  subTxt: {
    color: "white",
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    textDecorationLine: "underline",
    textDecorationColor: "white",
    marginRight: 7,
    marginBottom: 50,
  },
  subTxtNoMargin: {
    color: "white",
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    textDecorationLine: "underline",
    textDecorationColor: "white",
  },
  subTxtNoUnderline: {
    color: "white",
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    textDecorationColor: "white",
    marginRight: 7,
  },
});

export default CreateAccountScreen;
