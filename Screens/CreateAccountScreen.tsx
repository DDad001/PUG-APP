import React, { FC, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ImageBackground,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import { Datepicker, Icon, Layout } from "@ui-kitten/components";
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
import { Box, CheckIcon, FormControl, Select, HStack, Checkbox, Center, Modal, Button, VStack, NativeBaseProvider, Input } from "native-base";
import { Entypo } from "@expo/vector-icons";
import { DatePickerModal } from 'react-native-paper-dates';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { createAccount } from "../Services/DataService";


const CreateAccountScreen: FC = () => {
  const [newFirstName, setNewFirstName] = useState<string>("");
  const [newLastName, setNewLastName] = useState<string>("");
  const [newUsername, setNewUsername] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  //Native base useStates
  const [showModal, setShowModal] = useState<boolean>(false);

  const [date, setDate] = useState<Date>(new Date());

  //place holders Not actually being used!
  const [DOB, setDOB] = useState<string>("MM/DD/YYYY");
  const [state, setState] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [visible, setVisible] = React.useState<boolean>(false)

  const [isTermsOfServiceAccepted, setIsTermsOfServiceAccepted] = useState<boolean>(false);
  const [isOverAgeOf18, setIsOverAgeOf18] = useState<boolean>(false);

  const areTermsAccepted = (isTermsAccepted:boolean) => {
    setIsTermsOfServiceAccepted(isTermsAccepted);
  }

  const isUser18orOrGreater = (isUser18OrOver:boolean) => {
    setIsOverAgeOf18(isUser18OrOver);
  }

  const handleCreateAccount = async () => {
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
    let result = await createAccount(userData);
    console.log(userData);
    // result ? navigate("/projectDashboard") : toggleShowA();
  };

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
    <View style={styles.container}>
      <ImageBackground
        source={CourtPicture}
        resizeMode="cover"
        style={{ height: "100%", width: "100%" }}
      >
        <View
          style={{
            flex: 0.14,
            justifyContent: "flex-end",
          }}
        >
          <Ionicons
            name="chevron-back"
            size={35}
            color="white"
            style={{ marginTop: 7, marginLeft: 15, alignSelf: "flex-start" }}
          />
        </View>
        <View
          style={{
            flex: 0.1,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 5,
          }}
        >
          <Text style={styles.headingTxt}>
            Want to upload your first event?
          </Text>
        </View>
        <View style={{ flex: 0.08, alignItems: "center" }}>
          <Text style={styles.subheadingTxt}>
            Join the PUG family to create your account.
          </Text>
        </View>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
          <ScrollView style={[styles.overlayContainer, {}]}>
            <View style={{ flex: 0.7 }}>
              <TextInput
                style={[styles.input, { marginTop: 0 }]}
                onChangeText={(text) => setNewFirstName(text)}
                value={newFirstName}
                placeholder="First name"
                keyboardType="default"
                placeholderTextColor={"rgba(59, 86, 124, 1)"}
                accessibilityLabel="Enter first name"
              />
              <TextInput
                style={styles.input}
                onChangeText={(text) => setNewLastName(text)}
                value={newLastName}
                placeholder="Last name"
                keyboardType="default"
                placeholderTextColor={"rgba(59, 86, 124, 1)"}
                accessibilityLabel="Enter last name"
              />
              <TextInput
                style={styles.input}
                onChangeText={(text) => setNewUsername(text)}
                value={newUsername}
                placeholder="Username"
                keyboardType="default"
                placeholderTextColor={"rgba(59, 86, 124, 1)"}
                accessibilityLabel="Enter username"
              />
              <TextInput
                style={styles.input}
                onChangeText={(text) => setNewPassword(text)}
                value={newPassword}
                placeholder="Password"
                keyboardType="default"
                placeholderTextColor={"rgba(59, 86, 124, 1)"}
                accessibilityLabel="Enter password"
              />
              {/* <Datepicker
                style={[styles.input, {}]}
                // date={new Date(2000, 0, 1)}
                initialVisibleDate={new Date(2000, 0, 1)}
                date={date}
                min={new Date(1900, 0, 0)}
                max={new Date(2004, 7, 4)}
                onSelect={(nextDate) => setDate(nextDate)}
              /> */}

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
                <Pressable style={{backgroundColor:'white', flex:0.95, height:55, borderRadius:20, marginLeft:16, marginBottom:20, shadowOffset: { width: -2, height: 4 },shadowOpacity: 0.5,shadowRadius: 3}} onPress={()=> setVisible(true)}>
                  <View style={{flexDirection:'row', shadowColor: "black",}}>
                  <Text style={{color:'#3B567C', marginLeft:10, marginTop:19, fontSize:15}}>Date of birth</Text>
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
                        <Select.Item label="CA" value="CA" />
                        <Select.Item label="AL" value="AL" />
                        <Select.Item label="PA" value="PA" />
                        <Select.Item label="WD" value="WD" />
                        <Select.Item label="NY" value="NY" />
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
            <View style={{flex: 0.2, marginBottom: 20,}}>     
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
              <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
              <Modal.Content maxWidth="400px">
              <Modal.CloseButton />
              <Modal.Header>PUG's Terms and Services</Modal.Header>
              <Modal.Body>
                <Box>
                  <Text>
                    We, the PUG team are not liable for any damages, or bodily harm that occur when using the app. Use descretion when going to sporting events.
                  </Text>
                </Box>
              </Modal.Body>
              <Modal.Footer>
            <Button.Group space={2}>
              <Button onPress={() => {
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
              <Pressable
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
                onPress={() => console.log("Send the user to Login Screen!")}
                accessibilityLabel="Go to login screen"
              >
                <Text style={styles.subTxt}>Login here!</Text>
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
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
  headingTxt: {
    color: "white",
    fontWeight: "600",
    fontFamily: "Roboto_700Bold",
    fontSize: 24,
    // marginTop: 30,
  },
  subheadingTxt: {
    fontSize: 16,
    paddingLeft: 15,
    color: "white",
  },
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
