import { FC, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableHighlight,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { Box, CheckIcon, FormControl, Input, Select } from "native-base";
import FooterComponent from "../Components/FooterComponent";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import GreenCourt from "../assets/GreenCourt.png";
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


import DateField from 'react-native-datefield';

const AddEventScreen: FC = () => {
  const [nameOfEvent, setNameOfEvent] = useState<string>("");
  const [eventDetails, setEventDetails] = useState<string>("");
  const [eventAddress, setEventAddress] = useState<string>("");
  
  //dummy usestates!
  const [eventDate, setEventDate] = useState<string>("");
  const [eventTime, setEventTime] = useState<string>("");
  const [eventState, setEventState] = useState<string>("");
  const [eventCity, setEventCity] = useState<string>("");

  
  // const handleGetAllFriends = async () => {
  //   let results = await GetAllFriends();
  //   console.log(results);
  // };


  
  // useEffect( async () => {

  //     let allPeople = await GetAllFriends();
  //     console.log(allPeople);

  // }, []);
  
  
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
    <>
      <View style={styles.container}>
        <ImageBackground
          source={GreenCourt}
          resizeMode="cover"
          style={{ height: "100%", width: "100%" }}
        >
          <View
            style={{
              flex: 0.15,
              flexDirection: "row",
              paddingLeft: 20,
              marginBottom: 10,
              marginTop: 25,
              // backgroundColor :"orange"
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Lato_700Bold",
                  fontWeight: "bold",
                  fontSize: 28,
                  color: "white",
                }}
              >
                Add an Event
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
                    <View style={{ marginLeft: 18, marginRight: 30 }}>
                    <Box
                      maxW="155"
                      borderRadius={14}
                      style={{
                        backgroundColor: "#E8F1FF",
                        shadowColor: "black",
                        shadowOffset: { width: -2, height: 4 },
                        shadowOpacity: 0.5,
                        shadowRadius: 3,
                      }}
                    >
                      <Select
                        minWidth="150"
                        minHeight="25"
                        accessibilityLabel="Choose the sport type for this event"
                        placeholderTextColor={"#0A326D"}
                        placeholder="Choose Sport"
                        _selectedItem={{
                          bg: "black.300",
                          endIcon: <CheckIcon size={5} color="#3B567C" />,
                        }}
                        borderWidth="0"
                        fontFamily={"Roboto_500Medium"}
                        fontSize={15}
                        color={"#0A326D"}
                      >
                        <Select.Item label="Basketball" value="ux" />
                        <Select.Item label="Soccer" value="web" />
                        <Select.Item label="Football" value="cross" />
                        <Select.Item label="Tennis" value="ui" />
                        <Select.Item label="Handball" value="backend" />
                      </Select>
                      {/* <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Please make a selection!
        </FormControl.ErrorMessage> */}
                    </Box>
                  </View>            
            </View>
          </View>
          <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <ScrollView style={{ flex: 1 }}>
              <View style={{ flex: 1 }}>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => setNameOfEvent(text)}
                  value={nameOfEvent}
                  placeholder="Name of the event"
                  accessibilityLabel="Enter the event's name"
                  placeholderTextColor={"rgba(59, 86, 124, 1)"}
                />
              </View>

              <View>
                <Text style={[ styles.dateHeading ,{flex: 0.1, marginBottom: 10, marginLeft: 20}]}>
                  Enter the date of the event below!
                </Text>
              </View>

              <View style={{flex: 0.5, marginBottom: 10}}>
                {/*Calendar and clocks  */}
                <View style={{ flex: 1, alignItems: "center", justifyContent: "space-evenly" }}>
                  <DateField
                  containerStyle={{}}
                  styleInput={[styles.inputBorder, { marginRight: 15, marginLeft: 14}]}
                  labelDate="Date"
                  labelMonth="Month"
                  labelYear="Year"
                  placeholderTextColor="#0A326D"
                  maximumDate={new Date(2023, 3, 10)}
                  minimumDate={new Date(2021, 4, 21)}
                  handleErrors={() => console.log('You must be the age of 18 years to create an account')}
                  
                  />

                </View>
              </View>
              <View style={{ flex: 1 }}>
                <TextInput
                  style={[styles.LargeTxtInput, { alignItems: "flex-start" }]}
                  multiline={true}
                  maxLength={200}
                  onChangeText={(text) => setEventDetails(text)}
                  value={eventDetails}
                  placeholder="Event Details"
                  accessibilityLabel="Enter the details of the event under 200 characters or less"
                  placeholderTextColor={"rgba(59, 86, 124, 1)"}
                />
                <Text
                  style={{
                    color: "white",
                    fontFamily: "Roboto_400Regular",
                    fontSize: 15,
                    paddingLeft: 25,
                  }}
                >
                  {eventDetails.length}/200 character limit
                </Text>
              </View>

              <View style={{ flex: 1, backgroundColor: "green" }}>
                <Text>Space to Add images!!!</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "flex-start",
                  marginBottom: 10,
                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Lato_700Bold",
                    fontWeight: "bold",
                    fontSize: 28,
                    paddingLeft: 20,
                    color: "white",
                  }}
                >
                  Location
                </Text>
              </View>

              <View style={{ flex: 1 }}>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => setEventAddress(text)}
                  value={eventAddress}
                  placeholder="Address"
                  accessibilityLabel="Enter the address of where the event takes place"
                  placeholderTextColor={"rgba(59, 86, 124, 1)"}
                />
              </View>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <View style={{ marginTop: 10, marginLeft: 18 }}>
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
                        <Select.Item label="CA" value="ux" />
                        <Select.Item label="AL" value="web" />
                        <Select.Item label="PA" value="cross" />
                        <Select.Item label="WD" value="ui" />
                        <Select.Item label="NY" value="backend" />
                      </Select>
                      {/* <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Please make a selection!
        </FormControl.ErrorMessage> */}
                    </Box>
                  </View>
                </View>
                <TextInput
                  style={styles.smallerInput}
                  onChangeText={(text) => setEventCity(text)}
                  value={eventCity}
                  placeholder="City"
                  accessibilityLabel="Enter the city where your event takes place"
                  placeholderTextColor={"rgba(59, 86, 124, 1)"}
                />
              </View>

              {/* Add the create event button here */}
              <View style={{ flex: 1, alignItems: "center", marginTop: 30 }}>
                <Pressable
                  onPress={() => console.log("Create an Event!")}
                  accessibilityLabel="Click this button to create an event"
                  style={{
                    backgroundColor: "rgba(10, 50, 109, 1)",
                    borderRadius: 50,
                    paddingLeft: 60,
                    paddingRight: 60,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontFamily: "Roboto_400Regular",
                      fontSize: 20,
                      justifyContent: "center",
                      paddingTop: 20,
                      paddingBottom: 20,
                    }}
                  >
                    Create an event
                  </Text>
                </Pressable>
              </View>

              <View style={{ flex: 0.2, alignItems: "center", marginTop: 40 }}>
                <Pressable
                  onPress={() => console.log("Send the user to help!")}
                  accessibilityLabel="Click here if you need help?"
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.subTxt}>Need help</Text>
                    <FontAwesome
                      name="question-circle-o"
                      size={19}
                      color="white"
                    />
                  </View>
                </Pressable>
              </View>

              {/* Add the need help section here */}
            </ScrollView>
          </KeyboardAvoidingView>
          <FooterComponent />
        </ImageBackground>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
  },
  input: {
    fontFamily: "Roboto_400Regular",
    color: "rgba(59, 86, 124, 1)",
    fontSize: 15,
    height: 55,
    marginTop: 10,
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
  },
  smallerInput: {
    fontFamily: "Roboto_400Regular",
    color: "rgba(59, 86, 124, 1)",
    fontSize: 15,
    height: 55,
    width: 150,
    marginTop: 10,
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
  },
  // dateInput: {
  //   fontFamily: "Roboto_400Regular",
  //   color: "rgba(59, 86, 124, 1)",
  //   fontSize: 8,
  //   height: 55,
  //   width: 300,
  //   marginTop: 10,
  //   marginLeft: 18,
  //   marginRight: 20,
  //   marginBottom: 20,
  //   borderWidth: 1,
  //   padding: 10,
  //   borderColor: "white",
  //   backgroundColor: "white",
  //   borderRadius: 20,
  //   shadowColor: "black",
  //   shadowOffset: { width: -2, height: 4 },
  //   shadowOpacity: 0.5,
  //   shadowRadius: 3,
  // },
  LargeTxtInput: {
    fontFamily: "Roboto_400Regular",
    color: "rgba(59, 86, 124, 1)",
    fontSize: 15,
    height: 100,
    marginTop: 10,
    marginLeft: 18,
    marginRight: 20,
    marginBottom: 5,
    borderWidth: 1,
    padding: 10,
    borderColor: "white",
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
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
  dateHeading: {
    color: "white",
    fontFamily: "Roboto_500Medium",
    fontSize: 18,
  },
  inputBorder: {
    height: '100%',
    width: '25%',
    color:'#0A326D',
    borderRadius: 20,
    borderColor: 'white',
    backgroundColor:'white',
    borderWidth: 1,
    marginTop: 8,
    marginBottom: 20,
    shadowColor: 'black',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,

  },
});

export default AddEventScreen;
