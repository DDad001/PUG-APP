import { FC } from "react";
import { View, StyleSheet, Text } from "react-native";
import AppLoading from 'expo-app-loading';

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
} from '@expo-google-fonts/lato';

const PUGHeader: FC = () => {
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
    <>
      <View style={styles.container}>
        <Text style={{ fontSize: 22, color: 'white', marginLeft: 12, fontFamily: "Lato_900Black" }}>Sport Events</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingBottom: 20,
    flex: 0.15,
    alignItems: "flex-end",
  },
  BtnBox: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    backgroundColor: 'rgba(10, 50, 109, 0.1)',
    paddingRight: 8,
    paddingTop: 8,
    paddingLeft: 8,
    paddingBottom: 8,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: 'white',
  },
});

export default PUGHeader;
