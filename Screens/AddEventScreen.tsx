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

const AddEventScreen: FC = () => {
  const [nameOfEvent, setNameOfEvent] = useState<string>("");
  const [eventDetails, setEventDetails] = useState<string>("");
  const [eventAddress, setEventAddress] = useState<string>("");

  //dummy usestates!
  const [eventDate, setEventDate] = useState<string>("");
  const [eventTime, setEventTime] = useState<string>("");
  const [eventState, setEventState] = useState<string>("");
  const [eventCity, setEventCity] = useState<string>("");

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
              flexDirection: "row",
              marginTop: 50,
              paddingLeft: 20,
            }}
          >
            <View style={{ flex: 1, alignItems: "flex-start" }}>
              <Text
                style={{
                  fontFamily: "Lato_700Bold",
                  fontWeight: "bold",
                  fontSize: 35,
                  color: "white",
                }}
              >
                Event
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Lato_700Bold",
                  fontWeight: "bold",
                  fontSize: 20,
                  color: "white",
                }}
              >
                Category
              </Text>
            </View>
          </View>
          <View style={{ flex: 1, marginTop: 20 }}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setNameOfEvent(text)}
              value={nameOfEvent}
              placeholder="Name of the event"
              accessibilityLabel="Enter the event's name"
              placeholderTextColor={"rgba(59, 86, 124, 1)"}
            />
          </View>

          <View style={{ flex: 1, flexDirection: "row" }}>
            {/*Calendar and clocks  */}
            {/* Peter used a view to mimic the textInput instead! */}
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={[styles.smallerInput, { flexDirection: "row" }]}>
                <MaterialCommunityIcons
                  name="calendar-month"
                  size={30}
                  color="rgba(59, 86, 124, 1)"
                  style={{ marginTop: 3, marginLeft: 8 }}
                />
                <TextInput
                  style={{
                    backgroundColor: "orange",
                    paddingRight: 40,
                    paddingLeft: 10,
                  }}
                  onChangeText={(text) => setEventDate(text)}
                  value={eventDate}
                  placeholder="Date"
                  accessibilityLabel="Enter the date of when the event takes place"
                  placeholderTextColor={"rgba(59, 86, 124, 1)"}
                />
              </View>
            </View>
            <View style={[styles.smallerInput, { flexDirection: "row" }]}>
              <MaterialCommunityIcons
                name="clock-time-three-outline"
                size={30}
                color="rgba(59, 86, 124, 1)"
                style={{ marginLeft: 8, marginTop: 3 }}
              />
              <TextInput
                style={{
                  backgroundColor: "orange",
                  paddingRight: 40,
                  paddingLeft: 10,
                }}
                onChangeText={(text) => setEventTime(text)}
                value={eventTime}
                placeholder="Time"
                accessibilityLabel="Enter the time of when the event starts"
                placeholderTextColor={"rgba(59, 86, 124, 1)"}
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
                fontSize: 35,
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
              <TextInput
                style={styles.smallerInput}
                onChangeText={(text) => setEventAddress(text)}
                value={eventState}
                placeholder="State"
                accessibilityLabel="Enter the state where your event takes place"
                placeholderTextColor={"rgba(59, 86, 124, 1)"}
              />
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


          {/* Add the need help section here */}
          
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
});

export default AddEventScreen;
