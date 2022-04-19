import { FC, useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
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
} from "native-base";

//You can't style a button have to use a pressable!
const SignoutBtnComponent: FC = () => {
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

  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }

  const [showSignoutModal, setShowSignoutModal] = useState(false);

  return (
    <View style={styles.NotificationView}>
      <Pressable
        style={{
          backgroundColor: "#7E90AB",
          borderRadius: 50,
          alignItems: "center", 
          //justifyContent: "center",
          marginLeft: 100,
          marginRight: 100,
        }}
        onPress={() => setShowSignoutModal(true)}
        accessibilityLabel="Take Me Home"
      >
        <Text
          style={{
            color: "white",
            fontFamily: "Roboto_400Regular",
            fontSize: 20,
            justifyContent: "center",
            paddingTop: 15,
            paddingBottom: 15,
          }}
        >
          Sign out
        </Text>
      </Pressable>

      <Center style={{ marginTop: 50, flexDirection: "row" }}>
        <Modal
          isOpen={showSignoutModal}
          onClose={() => setShowSignoutModal(false)}
        >
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Body
              style={{ marginLeft: 25, marginRight: 25, marginTop: 20 }}
            >
              <Text
                style={{
                  fontFamily: "Lato_700Bold",
                  fontSize: 16,
                  fontWeight: "800",
                  color: "#0A326D",
                  textAlign: "center",
                }}
              >
                Are You Sure You Want To Sign Out?
              </Text>
            </Modal.Body>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginBottom: 20,
              }}
            >
              <Button
                style={{
                  backgroundColor: "#0A326D",
                  paddingLeft: 30,
                  paddingRight: 30,
                  borderRadius: 10,
                }}
                onPress={() => {
                  setShowSignoutModal(false);
                }}
              >
                <Text
                  style={{
                    fontFamily: "Lato_700Bold",
                    fontSize: 16,
                    fontWeight: "800",
                    color: "white",
                  }}
                >
                  Yes
                </Text>
              </Button>
              <Button
                onPress={() => {
                  setShowSignoutModal(false);
                }}
                style={{
                  backgroundColor: "#0A326D",
                  paddingLeft: 35,
                  paddingRight: 35,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Lato_700Bold",
                    fontSize: 16,
                    fontWeight: "800",
                    color: "white",
                  }}
                >
                  No
                </Text>
              </Button>
            </View>
          </Modal.Content>
        </Modal>
      </Center>
    </View>
  );
};

const styles = StyleSheet.create({
  BtnBox: {
    color: "white",
    fontFamily: "Roboto_400Regular",
    fontSize: 24,
    paddingRight: 117,
    paddingTop: 24,
    paddingLeft: 117,
    paddingBottom: 24,
    backgroundColor: "#7E90AB",
    borderRadius: 10,
  },
  Btn: {},
  NotificationView: {
    flex: 1,
    // flexDirection: 'row',
    justifyContent: "center",
  },
});

export default SignoutBtnComponent;
