import React, { FC, useEffect, useState, useContext } from "react";
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
  Image,
} from "react-native";
import { Box, Button, CheckIcon, FormControl, Input, Select, useToast } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import GreenCourt from "../assets/GreenCourt.png";
import AppLoading from "expo-app-loading";
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


import DateField from 'react-native-datefield';
import { DatePickerModal } from 'react-native-paper-dates'
import { TimePickerModal } from 'react-native-paper-dates'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import * as ImagePicker from 'expo-image-picker';


import { AddEventItem, GetAddress, GetCitiesByState } from '../Services/DataService';
import { compareSpecificity } from "native-base/lib/typescript/hooks/useThemeProps/propsFlattener";
import { NativeStackScreenProps } from "@react-navigation/native-stack";


const AddEventScreen: FC = () => {
  const { userItems, setUpdateScreen } = useContext<any>(UserContext);
  const [pickedImagePath, setPickedImagePath] = useState('');
  
  const showImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();
    console.log(result);
    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
    }
  }

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync();
    console.log(result);
  
    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
    }
  }

  const Errortoast = useToast();
  const Successtoast = useToast();
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
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      
    setVisible(false)
    let d = date.toString();
    let splArr = d.split(" ")
    let month = splArr.slice(1, 2).join(" ")
    let day = splArr.slice(2, 3).join(" ")
    let year = splArr.slice(3, 4).join(" ")
    month = months.indexOf(month);
    setEventDate( month+1+'/'+day +'/'+year );
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
      let morningOrEvening = "";
      //console.log(hour)
      //console.log( minute)
      if(hour > 12){
        hour = hour - 12
        morningOrEvening = "pm";
      }
      else{
        morningOrEvening = "am";
      }
      if(minute < 10){
        minute = '0'+minute
      }
      if(hour == 0){
        hour = 12
      }
      let time = (hour +":" + minute + ' '+morningOrEvening);
      
      setEventTime(time);
    },
    [setShowTimePicker]
  );

  const HandleCreateEvent = async() => {
    let newEvent = {
      Id: 0,
      UserID: userItems.id, 
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

    //order of forms
    //name
    //date
    //time
    //event details
    //address
    //state
    //city


    //Don't forget validating the image
    var regex = /^[A-Za-z ]+$/


    //what if what the user enters is not a valid address?
    let addressArr: string[] = eventAddress.split(" "); //split the string array
    let formatedAddress: string = addressArr.join("+") //put it in the correct format
    let obtainedAddress:any = await GetAddress(formatedAddress); 
    let countryCode: string = "";
    let isAddressValid:boolean = false;
    if(obtainedAddress.length >= 1){
      countryCode = obtainedAddress[0]['address']['country_code'];
      isAddressValid = true;
    }

    let citiesArr:any = await GetCitiesByState(eventState);
    let cityNames: string[] = [];

    for(let i = 0; i <citiesArr.length; i++){
      cityNames.push(citiesArr[i].name);
    }


    //save the state to a variable
    let stateFound:any = [];
    let statesArr: any[] = 
    [{stateInitial: "al", stateName: "Alabama"},
    {stateInitial: "ak", stateName: "Arkansas"},
    {stateInitial: "az", stateName: "Arizona"},
    {stateInitial: "ar", stateName: "Arkansas"},
    {stateInitial: "ca", stateName: "California"},
    {stateInitial: "co", stateName: "Colorado"},
    {stateInitial: "ct", stateName: "Connecticut"},
    {stateInitial: "de", stateName: "Delaware"},
    {stateInitial: "fl", stateName: "Florida"},
    {stateInitial: "ga", stateName: "Georgia"},
    {stateInitial: "hi", stateName: "Hawaii"},
    {stateInitial: "id", stateName: "Idaho"},
    {stateInitial: "il", stateName: "Illinois"},
    {stateInitial: "in", stateName: "Indiana"},
    {stateInitial: "ia", stateName: "Iowa"},
    {stateInitial: "ks", stateName: "Kansas"},
    {stateInitial: "ky", stateName: "Kentucky"},
    {stateInitial: "la", stateName: "Louisiana"},
    {stateInitial: "me", stateName: "Maine"},
    {stateInitial: "md", stateName: "Maryland"},
    {stateInitial: "ma", stateName: "Massachusetts"},
    {stateInitial: "mi", stateName: "Michigan"},
    {stateInitial: "mn", stateName: "Minnesota"},
    {stateInitial: "ms", stateName: "Mississippi"},
    {stateInitial: "mo", stateName: "Missouri"},
    {stateInitial: "mt", stateName: "Montana"},
    {stateInitial: "ne", stateName: "Nebraska"},
    {stateInitial: "nv", stateName: "Nevada"},
    {stateInitial: "nh", stateName: "New Hampshire"},
    {stateInitial: "nj", stateName: "New Jersey"},
    {stateInitial: "nm", stateName: "New Mexico"},
    {stateInitial: "ny", stateName: "New York"},
    {stateInitial: "nc", stateName: "North Carolina"},
    {stateInitial: "nd", stateName: "North Dakota"},
    {stateInitial: "oh", stateName: "Ohio"},
    {stateInitial: "ok", stateName: "Oklahoma"},
    {stateInitial: "or", stateName: "Oregon"},
    {stateInitial: "pa", stateName: "Pennsylvania"},
    {stateInitial: "ri", stateName: "Rhode Island"},
    {stateInitial: "sc", stateName: "South Carolina"},
    {stateInitial: "sd", stateName: "South Dakota"},
    {stateInitial: "tn", stateName: "Tennessee"},
    {stateInitial: "tx", stateName: "Texas"},
    {stateInitial: "ut", stateName: "Utah"},
    {stateInitial: "vt", stateName: "Vermont"},
    {stateInitial: "va", stateName: "Virginia"},
    {stateInitial: "wa", stateName: "Washington"},
    {stateInitial: "wv", stateName: "West Virginia"},
    {stateInitial: "wi", stateName: "Wisconsin"},
    {stateInitial: "wy", stateName: "Wyoming"},]

    stateFound = statesArr.filter(element => element.stateInitial === eventState);

    if(eventSport == "" || nameOfEvent == "" || eventDate == "" || eventTime == "" || eventDetails == "" || eventAddress == "" || eventState == ""){
      Errortoast.show({ placement: "top",render: () => {return <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>Error: all fields need to be filled!</Box>;}});
    }else if(regex.test(eventCity) == false){
      Errortoast.show({ placement: "top",render: () => {return <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>Error: event city must include characters only!</Box>;}});
    }else if(obtainedAddress.length < 1){
      Errortoast.show({ placement: "top",render: () => {return <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>Error: enter a valid address for your event!</Box>;}});
    }
    //Added validation to check if the address is inside the United States
    else if(isAddressValid == false || countryCode != "us"){
      Errortoast.show({ placement: "top",render: () => {return <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>Error: enter a valid address for your event in the US!</Box>;}});
    }
    //Added validation to check if the address is inside the state the user themself specified
    else if(eventState != stateFound[0]["stateInitial"]){
      Errortoast.show({ placement: "top",render: () => {return <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>Error: enter a valid address for your event in the state you specified</Box>;}});
    }
    //Added validation to check if the address is inside the city the user themself specified
    else if(eventCity != obtainedAddress[0]["address"]["city"]){
      Errortoast.show({ placement: "top",render: () => {return <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>Error: enter a valid address for your event in the city you specified</Box>;}});
    }else if(!cityNames.includes(eventCity)){
      Errortoast.show({ placement: "top",render: () => {return <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>Error: enter a valid city that corresponds to your event's state!</Box>;}});
    }else{
      // AddEventItem(newEvent);
      console.log("All good G!")
      // result = await AddEventItem(newEvent);
      Successtoast.show({ placement: "top",render: () => {return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>Event successfully created!</Box>}});
      setUpdateScreen(true);
    }
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
                        <Select.Item label="Badminton" value="Badminton" />
                        <Select.Item label="Baseball" value="Baseball" />
                        <Select.Item label="Basketball" value="Basketball" />
                        <Select.Item label="Cycling" value="Cycling" />
                        <Select.Item label="Hockey" value="Hockey" />
                        <Select.Item label="Disc golf" value="Disc golf" />
                        <Select.Item label="Fishing" value="Fishing" />
                        <Select.Item label="Football" value="Football" />
                        <Select.Item label="Frisbee" value="Frisbee" />
                        <Select.Item label="Golf" value="Golf" />
                        <Select.Item label="Handball" value="Handball" />
                        <Select.Item label="Hiking" value="Handball" />
                        <Select.Item label="Cricket" value="Cricket" />
                        <Select.Item label="Rugby" value="Rugby" />
                        <Select.Item label="Pickleball" value="Pickleball" />
                        <Select.Item label="Running" value="Running" />
                        <Select.Item label="Soccer" value="Soccer" />
                        <Select.Item label="Softball" value="Softball" />
                        <Select.Item label="Spikeball" value="Spikeball" />
                        <Select.Item label="Tennis" value="Tennis" />
                        <Select.Item label="Lacrosse" value="Lacrosse" />
                        <Select.Item label="Volleyball" value="Volleyball" />
                        <Select.Item label="Other" value="Other" />
                      </Select>
                      {/* <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Please make a selection!
        </FormControl.ErrorMessage> */}
                    </Box>
                  </View>            
            </View>
          </View>
          <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <ScrollView style={{ flex: 1, marginBottom: 30 }}>
              <View style={{ flex: 1 }}>
                <TextInput
                  style={[styles.input,{marginBottom: 5}]}
                  onChangeText={(text) => setNameOfEvent(text)}
                  value={nameOfEvent}
                  maxLength={25}
                  placeholder="Name of the event"
                  accessibilityLabel="Enter the event's name"
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
                  {nameOfEvent.length}/25 character limit
                </Text>
              </View>

              <View style={{flex: 1, marginBottom: 20, flexDirection:'row', marginTop:10}}>

              <PaperProvider theme={theme}>
                <View style={{flexDirection:'row',flex: 1}}>
                  <View style={{flexDirection:'row',flex: 0.93}}>
                <DatePickerModal 
                  mode="single"
                  validRange={{
                   startDate: new Date()
                   }}
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
                {/* If no date is chosen display Data, otherwise display the date chosen */}
                <Text style={{color:'#3B567C', marginLeft:10, marginTop:19, fontSize:15}}>{eventDate === "" ? "Date" : eventDate}</Text>
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
              <Text style={{color:'#3B567C', marginLeft:10, marginTop:19, fontSize:15}}>{eventTime === "" ? "Time" : eventTime}</Text>
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
        

              {/* <View style={{marginTop:20,flexDirection:'row'}}>
                <Pressable onPress={showImagePicker}>
              <View style={{backgroundColor:'#7E90AB', width:120, height: 90, marginLeft:18, borderRadius: 8}}>
                {
                  pickedImagePath !== '' ? <Image
                  source={{ uri: pickedImagePath }}
                  style={styles.image}
                  />
                  :
                  <View>
                  <MaterialCommunityIcons name="image-plus" size={40} color="white" style={{marginLeft:38, marginTop:25}}/>
                  </View>
                }
              </View>
                </Pressable>
              </View> */}

              
              {/* <Button onPress={showImagePicker} title="Select an image" />
              <Button onPress={openCamera} title="Open camera" /> */}





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
                        <Select.Item label="AL" value="al" />
                        <Select.Item label="AK" value="ak" />
                        <Select.Item label="AZ" value="az" />
                        <Select.Item label="AR" value="ar" />
                        <Select.Item label="CA" value="ca" />
                        <Select.Item label="CO" value="co" />
                        <Select.Item label="CT" value="ct" />
                        <Select.Item label="DE" value="de" />
                        <Select.Item label="FL" value="fl" />
                        <Select.Item label="GA" value="ga" />
                        <Select.Item label="HI" value="hi" />
                        <Select.Item label="ID" value="id" />
                        <Select.Item label="IL" value="il" />
                        <Select.Item label="IN" value="in" />
                        <Select.Item label="IA" value="ia" />
                        <Select.Item label="KS" value="ks" />
                        <Select.Item label="KY" value="ky" />
                        <Select.Item label="LA" value="la" />
                        <Select.Item label="ME" value="me" />
                        <Select.Item label="MD" value="md" />
                        <Select.Item label="MA" value="ma" />
                        <Select.Item label="MI" value="mi" />
                        <Select.Item label="MN" value="mn" />
                        <Select.Item label="MS" value="ms" />
                        <Select.Item label="MO" value="mo" />
                        <Select.Item label="MT" value="mt" />
                        <Select.Item label="NE" value="ne" />
                        <Select.Item label="NV" value="nv" />
                        <Select.Item label="NH" value="nh" />
                        <Select.Item label="NJ" value="nj" />
                        <Select.Item label="NM" value="nm" />
                        <Select.Item label="NY" value="ny" />
                        <Select.Item label="NC" value="nc" />
                        <Select.Item label="ND" value="nd" />
                        <Select.Item label="OH" value="oh" />
                        <Select.Item label="OK" value="ok" />
                        <Select.Item label="OR" value="or" />
                        <Select.Item label="PA" value="pa" />
                        <Select.Item label="RI" value="ri" />
                        <Select.Item label="SC" value="sc" />
                        <Select.Item label="SD" value="sd" />
                        <Select.Item label="TN" value="tn" />
                        <Select.Item label="TX" value="tx" />
                        <Select.Item label="UT" value="ut" />
                        <Select.Item label="VT" value="vt" />
                        <Select.Item label="VA" value="va" />
                        <Select.Item label="WA" value="wa" />
                        <Select.Item label="WV" value="wv" />
                        <Select.Item label="WI" value="wi" />
                        <Select.Item label="WY" value="wy" />
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
    elevation: 10,
    
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
    elevation: 10,

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
  image: {
    width: 120,
    height: 90,
    borderRadius: 8,
    resizeMode: 'cover'
  }
});

export default AddEventScreen;
