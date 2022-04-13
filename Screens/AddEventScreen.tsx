import { FC, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableHighlight,
  Pressable,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

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

const AddEventScreen: FC = () => {

    const [nameOfEvent, setNameOfEvent] = useState<string>("");
    const [eventDetails, setEventDetails] = useState<string>("");

    //dummy usestates! 
    const [eventDate, setEventDate] = useState<string>("");
    const [eventTime,  setEventTime] = useState<string>("");

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
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={GreenCourt}
        resizeMode="cover"
        style={{ height: "100%", width: "100%" }}
      >
        <ScrollView style={{ flex: 1 }}>
          <View
            style={{
              flex: 0.1,
              backgroundColor: "red",
              flexDirection: "row",
              marginTop: 50,
              paddingLeft: 20
            }}
          >
            <View style={{ flex: 1, alignItems: "flex-start"}}>
                <Text style={{fontFamily: "Lato_700Bold", fontWeight: "bold", fontSize: 35, color: "white"}}>Event</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
                <Text style={{fontFamily: "Lato_700Bold", fontWeight: "bold", fontSize: 20, color: "white"}}>Category</Text>
            </View>
          </View>
          <View style={{flex: 1, backgroundColor: "orange", marginTop: 30}}>
            <TextInput style={styles.input} onChangeText={(text) => setNameOfEvent(text)} value={nameOfEvent} placeholder="Name of the event" accessibilityLabel="Enter the event's name" placeholderTextColor={"rgba(59, 86, 124, 1)"}/>
          </View>

          <View style={{flex: 1, backgroundColor: "green", flexDirection: "row"}}>
                {/*Calendar and clocks  */}
                {/* Peter used a view to mimic the textInput instead! */}
                <View style={{flex: 1, flexDirection: "row"}}>
                    <View style={[styles.smallerInput, {flexDirection: "row"}]}>
                        <MaterialCommunityIcons name="calendar-month" size={30} color="rgba(59, 86, 124, 1)" style={{ marginTop: 3, marginLeft: 8}} />
                        <TextInput style={{backgroundColor: "orange", paddingRight: 40, paddingLeft: 10}} onChangeText={(text) => setEventDate(text)} value={eventDate} placeholder="Date" accessibilityLabel="Enter the date of when the event takes place" placeholderTextColor={"rgba(59, 86, 124, 1)"} />
                    </View>
                </View>
                <View style={[styles.smallerInput, {flexDirection: "row"}]}>
                        <MaterialCommunityIcons name="clock-time-three-outline" size={30} color="rgba(59, 86, 124, 1)" style={{ marginLeft:8, marginTop:3 }} />
                        <TextInput style={{backgroundColor: "orange", paddingRight: 40, paddingLeft: 10}} onChangeText={(text) => setEventTime(text)} value={eventTime} placeholder="Time" accessibilityLabel="Enter the time of when the event starts" placeholderTextColor={"rgba(59, 86, 124, 1)"} />
                </View>
          </View>
          <View style={{flex: 1, backgroundColor: "red" }}>
            <TextInput style={[styles.LargeTxtInput,{alignItems: "flex-start"}]} multiline={true} maxLength={200} onChangeText={(text) => setEventDetails(text)} value={eventDetails} placeholder="Event Details" accessibilityLabel="Enter the time of when the event starts" placeholderTextColor={"rgba(59, 86, 124, 1)"} />
          </View>

          <View style={{flex: 1, backgroundColor: "green" }}>
              <Text>Space to Add images!!!</Text>
          </View>
          <View>
              
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
  },
  input:{
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
  smallerInput:{
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
  LargeTxtInput:{
    fontFamily: "Roboto_400Regular",
    color: "rgba(59, 86, 124, 1)",
    fontSize: 15,
    height: 100,
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
  }
});

export default AddEventScreen;
