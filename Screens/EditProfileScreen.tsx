import { Box, Button, Center, Checkbox, CheckIcon, FormControl, HStack, Icon, Input, KeyboardAvoidingView, Modal, Select, useToast } from "native-base";
import React, { useState,useContext, FC } from "react";
import { ImageBackground, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import {
  en,
  registerTranslation,
} from 'react-native-paper-dates'
registerTranslation('en', en)

import { DatePickerModal } from "react-native-paper-dates";
import { DeleteUser, GetCitiesByState, GetUserById, UpdatePassword, UpdateUser } from "../Services/DataService";
import { Switch } from "react-native-paper";
import AppLoading from "expo-app-loading";
import UserContext  from '../Context/UserContext';
import CourtPicture from "../assets/Court.png";
import { MaterialIcons } from '@expo/vector-icons';

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


const EditProfileScreen: FC = () => {
    const { userItems, setUserItems, setUpdateScreen, setUpdateEventScreen, setUpdateProfileScreen, setUpdateProfileOther } = useContext<any>(UserContext);
    const [disableBtn, setDisableBtn] = useState(false);

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
   const [show, setShow] = React.useState(false);
   const [EditAccountBtnColor, setEditAccountBtnColor] = useState("rgba(10, 50, 109, 1)")

   const Errortoast = useToast();
   const Successtoast = useToast();
   
   const handleEditProfile = async () => {
     setDisableBtn(true);
     setEditAccountBtnColor("gray");
     let edittedProfile = {
       Id: userItems.id,
       FirstName: firstName,
       LastName: lastName,
       Username: username,
       Salt: userItems.salt, 
       Hash: userItems.hash,
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
 
     let citiesArr: any = await GetCitiesByState(updatedState);
    let cityNames: string[] = [];

    for (let i = 0; i < citiesArr.length; i++) {
      cityNames.push(citiesArr[i].name);
    }
     var regex = /^[A-Za-z]+$/
     let FirstNameInput = regex.test(firstName);
     let LastNameInput = regex.test(lastName);
     let CityInput = regex.test(city);
 
     let result:any;
     if(firstName == ""){ 
      Errortoast.show({ placement: "top",render: () => {return <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>Error: You must include a first name to edit account</Box>;}});
      setDisableBtn(false);
      setEditAccountBtnColor("rgba(10, 50, 109, 1)");
    }
    else if(lastName == ""){ 
      Errortoast.show({ placement: "top",render: () => {return <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>Error: You must include a last name to edit account</Box>;}});
      setDisableBtn(false);
      setEditAccountBtnColor("rgba(10, 50, 109, 1)");
    }
    else if(FirstNameInput == false){
      Errortoast.show({ placement: "top",render: () => {return <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>Error: first name must include characters only and no spaces</Box>;}});
      setDisableBtn(false);
      setEditAccountBtnColor("rgba(10, 50, 109, 1)");
    }
    else if(LastNameInput == false){
      Errortoast.show({ placement: "top",render: () => {return <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>Error: last name must include characters only and no spaces</Box>;}});
      setDisableBtn(false);
      setEditAccountBtnColor("rgba(10, 50, 109, 1)");
    }
    else if(username.length < 8 ){
      Errortoast.show({ placement: "top",render: () => {return <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>Enter in a username: username length must be at least 8 characters long</Box>;}});
      setDisableBtn(false);
      setEditAccountBtnColor("rgba(10, 50, 109, 1)");
    }
    else if(password.length < 8){
      Errortoast.show({ placement: "top",render: () => {return <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>Enter in a new password: password length must be at least 8 characters long</Box>;}});
      setDisableBtn(false);
      setEditAccountBtnColor("rgba(10, 50, 109, 1)");
    }
    else if(age < 18){
      Errortoast.show({ placement: "top",render: () => {return <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>Error: Date Of Birth: you must be 18 years or older to create an account</Box>;}});
      setDisableBtn(false);
      setEditAccountBtnColor("rgba(10, 50, 109, 1)");
    }
    else if(updatedState == ""){
      Errortoast.show({ placement: "top",render: () => {return <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>Error: You must include a state to create an account</Box>;}});
      setDisableBtn(false);
      setEditAccountBtnColor("rgba(10, 50, 109, 1)");
    } 
    else if(city == ""){
      Errortoast.show({ placement: "top",render: () => {return <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>Error: You must include a city to create an account</Box>;}});
      setDisableBtn(false);
      setEditAccountBtnColor("rgba(10, 50, 109, 1)");
    } 
    else if(CityInput == false){
      Errortoast.show({ placement: "top",render: () => {return <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>Error: city field must include characters only</Box>;}});
      setDisableBtn(false);
      setEditAccountBtnColor("rgba(10, 50, 109, 1)");
    } 
    else if(!cityNames.includes(city)){
      Errortoast.show({ placement: "top",render: () => {return <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>Error: enter a valid city that corresponds to your event's state!</Box>;}});
      setDisableBtn(false);
      setEditAccountBtnColor("rgba(10, 50, 109, 1)");
    }
     else{
       result = await UpdateUser(edittedProfile);
       if(!result){
         Errortoast.show({ placement: "top",render: () => {return <Box style={{zIndex: 1}} bg="danger.500" px="2" py="1" rounded="sm" mb={5}>Error: username has already been taken</Box>;}});
         setDisableBtn(false);
         setEditAccountBtnColor("rgba(10, 50, 109, 1)");
       }else{
         Successtoast.show({ placement: "top",render: () => {return <Box style={{zIndex: 1}} bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>Account successfully updated!</Box>}});
         setShowModal(false);
         setDisableBtn(false);
         setEditAccountBtnColor("rgba(10, 50, 109, 1)");
         let updatedUser = await GetUserById(userItems.id);
         setUserItems(updatedUser);
         setUpdateScreen(true);
         setUpdateEventScreen(true);
         setUpdateProfileScreen(true);
         setUpdateProfileOther(true)
       }
     }
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
     month += 1;

    if(month < 10){
      setDob("0" + month + "/" + day + "/" + year);
    }else{
      setDob(month + "/" + day + "/" + year);
    }
   }, [])
 
   const newDate = new Date()
 
   const theme = { ...DefaultTheme,colors: {
     ...DefaultTheme.colors,
     primary: '#3498db',
     accent: '#f1c40f',
   }, }
 
   const offset = (Platform.OS === 'android') ? -300 : 100;
 
return (
<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
<View style={styles.container}>
<ImageBackground
  source={CourtPicture}
  resizeMode="cover"
  style={{ height: "100%", width: "100%" }}
>

        <View>
          <Text
                style={{
                  fontFamily: "Lato_700Bold",
                  fontWeight: "bold",
                  fontSize: 28,
                  color: "white",
                  marginLeft: 20,
                  marginBottom: 10,
                  marginTop: 15,
                }}
              >
                Edit Profile
              </Text>
          </View>

    <KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={offset} behavior={Platform.OS === "android" ? "height" : "padding"}>
    <ScrollView style={{flex: 1}}>
      <View style={{ flex: 0.7, marginTop:20}}>
        <TextInput
          style={[styles.input, { marginTop: 0 }]}
          onChangeText={(text) => setFirstName(text)}
          value={firstName}
          placeholder="First name"
          keyboardType="default"
          placeholderTextColor={"rgba(59, 86, 124, 1)"}
          accessibilityLabel="Enter first name"
        />

        <TextInput
          style={styles.input}
          onChangeText={(text) => setLastName(text)}
          value={lastName}
          placeholder="Last name"
          keyboardType="default"
          placeholderTextColor={"rgba(59, 86, 124, 1)"}
          accessibilityLabel="Enter last name"
        />

        <TextInput
          style={styles.input}
          onChangeText={(text) => setUsername(text)}
          value={username}
          placeholder="Username"
          keyboardType="default"
          placeholderTextColor={"rgba(59, 86, 124, 1)"}
          accessibilityLabel="Enter username"
        />

        {/* <TextInput
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        value={password}
        placeholder="Enter new password"
        keyboardType="default"
        placeholderTextColor={"rgba(59, 86, 124, 1)"}
        accessibilityLabel="Enter new password"
        /> */}

          <View style={{height: 75, shadowColor: "black", shadowOffset: { width: -2, height: 4 }, shadowOpacity: 0.5, shadowRadius: 3}}>
          <Input
              backgroundColor={'white'} borderWidth={0} w={"91%"} marginLeft={4} bg={'white'} shadowColor={"black"} shadow={9} marginBottom={5} borderRadius={20} fontSize="15" fontFamily={"Roboto_400Regular"} h={{base:"75%"}}  type={show ? "text" : "password"} 
              InputRightElement={<Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={7} mr="5" color="rgba(59, 86, 124, 1)" onPress={() => setShow(!show)} />} placeholder="Enter new password" 
              placeholderTextColor={"rgba(59, 86, 124, 1)"}  onChangeText={(text) => setPassword(text)} value={password} accessibilityLabel="Enter new password" keyboardType="default"/>

          </View>


          <PaperProvider theme={theme}>
            <View style={{flexDirection:'row',flex: 1}}>
          <DatePickerModal 
            mode="single"
            visible={visible}
            onDismiss={onDismiss}
            date={newDate}
            onConfirm={onChange}
            saveLabel="Save" // optional
            label="Select date" // optional
            animationType="slide" // optional, default is 'slide' on ios/android and 'none' on web
            locale={'en'}// optional, default is automically detected by your system  
            /> 
          <Pressable style={{backgroundColor:'white', flex:0.95, height:55, borderRadius:20, marginLeft:16, marginBottom:20, shadowOffset: { width: -2, height: 4 },shadowOpacity: 0.5,shadowRadius: 3}} onPress={()=> setVisible(true)}>
            <View style={{flexDirection:'row', shadowColor: "black",}}>
            <Text style={{color:'#3B567C', marginLeft:10, marginTop:19, fontSize:15, flex:0.9}}>Date of birth</Text>
           <Text style={{color:'#3B567C',  marginLeft:130, marginTop:19, fontSize:15}}>{dob}</Text>
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
                  onValueChange={(itemValue) => setUpdatedState(itemValue)}
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

      <View style={{ flex: 0.2, alignItems: "center", marginTop: 20, marginBottom:40}}>
        <Pressable
          style={{
            backgroundColor: EditAccountBtnColor,
            borderRadius: 50,
            paddingLeft: 60,
            paddingRight: 60,
          }}
          onPress={handleEditProfile}
        >
          <Text style={styles.SaveChangesBtnTxt}>Save Changes</Text>
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
      input: {
        fontFamily: "Roboto_400Regular",
        color: "rgba(59, 86, 124, 1)",
        fontSize: 15,
        height: 55,
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
        marginLeft: 18,
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
      SaveChangesBtnTxt: {
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

export default EditProfileScreen;