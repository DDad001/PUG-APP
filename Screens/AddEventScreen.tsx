import React, { FC, useEffect, useState } from "react";
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
import { DatePickerModal } from 'react-native-paper-dates'
import { TimePickerModal } from 'react-native-paper-dates'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import { AddEventItem, } from '../Services/DataService';

const AddEventScreen: FC = () => {
  const [nameOfEvent, setNameOfEvent] = useState<string>("");
  const [eventDetails, setEventDetails] = useState<string>("");
  const [eventAddress, setEventAddress] = useState<string>("");
  const [eventSport, setEventSport] = useState<string>("");
  const [eventHours, setEventHour] = useState<any>("");
  const [eventMinutes, setEventMinutes] = useState<any>("");
  
  //dummy usestates!
  const [eventDate, setEventDate] = useState<any>("");
  const [eventTime, setEventTime] = useState<any>("");
  const [eventState, setEventState] = useState<string>("");
  const [eventCity, setEventCity] = useState<string>("");

  const [visible, setVisible] = React.useState(false)
  const onDismiss = React.useCallback(() => {
    setVisible(false)
  }, [setVisible])

  const onChange = React.useCallback(({ date }) => {
    setVisible(false)
    setEventDate({ date })
  }, [])

  const date = new Date()

  const [showTimePicker, setShowTimePicker] = React.useState(false)
  const onCancel = React.useCallback(() => {
    setShowTimePicker(false)
  }, [setShowTimePicker])

  const onApproved= React.useCallback(
    ({ hours, minutes }) => {
      setShowTimePicker(false);
      let hour = ( hours );
      let minute = ( minutes );
      //console.log(hour)
      //console.log( minute)
      let time = (hour +":" + minute);
      setEventTime(time);
    },
    [setShowTimePicker]
  );

  const HandleCreateEvent = () => {
    let newEvent = {
      Id: 0,
      UserID: 2, 
      SportOfEvent: eventSport,
      NameOfEvent: nameOfEvent,
      DateOfEvent: eventDate,
      TimeOfEvent: eventTime,
      DescriptionOfEvent: eventDetails,
      ImageOfEvent: "Event Image",
      AddressOfEvent: eventAddress,
      CityOfEvent: eventCity,
      StateOfEvent: eventState,
      isActive: true,
      IsDeleted: false
    }
    console.log(newEvent);
    AddEventItem(newEvent);
  }
  
  const theme = { ...DefaultTheme,colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  }, }

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
                        width="150"
                        height="10"
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

                        onValueChange = {(itemValue) => setEventSport(itemValue)}
                      >
                        <Select.Item label="Basketball" value="Basketball" />
                        <Select.Item label="Soccer" value="Soccer" />
                        <Select.Item label="Football" value="Football" />
                        <Select.Item label="Tennis" value="Tennis" />
                        <Select.Item label="Handball" value="Handball" />
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

              <View style={{flex: 1, marginBottom: 20, flexDirection:'row', marginTop:10}}>

              <PaperProvider theme={theme}>
                <View style={{flexDirection:'row',flex: 1}}>
                  <View style={{flexDirection:'row',flex: 0.93}}>
                <DatePickerModal 
                  mode="single"
                  visible={visible}
                  onDismiss={onDismiss}
                  date={date}
                  onConfirm={onChange}
                  saveLabel="Save" // optional
                  label="Select date" // optional
                  animationType="slide" // optional, default is 'slide' on ios/android and 'none' on web
                  locale={'en'}// optional, default is automically detected by your system  
                  /> 
                <Pressable style={{backgroundColor:'white', width:150, height:55, borderRadius:20, marginLeft:16, shadowOffset: { width: -2, height: 4 },shadowOpacity: 0.5,shadowRadius: 3}} onPress={()=> setVisible(true)}>
                  <View style={{flexDirection:'row', shadowColor: "black",}}>
                <MaterialCommunityIcons name="calendar-month" size={23} color="#0A326D" style={{ marginTop: 17, marginLeft: 20}} />
                <Text style={{color:'#3B567C', marginLeft:10, marginTop:19, fontSize:15}}>Date</Text>
                  </View>
                </Pressable>
                  </View>

                <TimePickerModal
                visible={showTimePicker}
                onDismiss={onCancel}
                onConfirm={onApproved}
                hours={12} // default: current hours
                minutes={14} // default: current minutes
                label="Select time" // optional, default 'Select time'
                cancelLabel="Cancel" // optional, default: 'Cancel'
                confirmLabel="Ok" // optional, default: 'Ok'
                animationType="fade" // optional, default is 'none'
                locale={'en'} // optional, default is automically detected by your system
                />
              <Pressable style={{backgroundColor:'white', width:150, height:55, borderRadius:20, shadowOffset: { width: -2, height: 4 },shadowOpacity: 0.5,shadowRadius: 3,}} onPress={()=> setShowTimePicker(true)}>
                <View style={{flexDirection:'row', shadowColor: "black"}}>
              <MaterialCommunityIcons name="clock-time-three-outline" size={23} color="#0A326D" style={{ marginTop:17, marginLeft: 20 }} />
              <Text style={{color:'#3B567C', marginLeft:10, marginTop:19, fontSize:15}}>Time</Text>
                </View>
              </Pressable> 
                </View>
                  </PaperProvider>
              </View>

                <TextInput
                  style={[styles.LargeTxtInput,{alignItems: 'flex-start'}]}
                  textAlignVertical="top"
                  multiline={true}
                  maxLength={200}
                  onChangeText={(text) => setEventDetails(text)}
                  value={eventDetails}
                  placeholder="Event Details"
                  accessibilityLabel="Enter the details of the event under 200 characters or less"
                  placeholderTextColor={"rgba(59, 86, 124, 1)"}
                  numberOfLines={5}
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
        

              <View style={{ flex: 1, marginTop:20}}>
              <View style={{backgroundColor:'#7E90AB', width:120, height: 90, marginLeft:18, borderRadius: 8}}>
              <MaterialCommunityIcons name="image-plus" size={40} color="white" style={{marginLeft:38, marginTop:25}}/>
              </View>
              </View>



              <View
                style={{
                  flex: 1,
                  alignItems: "flex-start",
                  marginBottom:10,
                  marginTop: 20,
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
                        onValueChange = {(itemValue) => setEventState(itemValue)}
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
                  onPress={() => HandleCreateEvent()}
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
    minWidth:200,
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
