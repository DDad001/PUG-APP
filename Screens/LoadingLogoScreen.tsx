import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import AppLoading from 'expo-app-loading';
import { LinearGradient } from 'expo-linear-gradient';

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

import {
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_500Medium,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    OpenSans_800ExtraBold,
    OpenSans_300Light_Italic,
    OpenSans_400Regular_Italic,
    OpenSans_500Medium_Italic,
    OpenSans_600SemiBold_Italic,
    OpenSans_700Bold_Italic,
    OpenSans_800ExtraBold_Italic,
  } from '@expo-google-fonts/open-sans';

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
  } from '@expo-google-fonts/roboto';

const LoadingLogoScreen: FC = () => {

    let [fontsLoaded, error]= useFonts({
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
        OpenSans_400Regular,
    });

    if(!fontsLoaded){
        return <AppLoading/>;
    }

    return (
        <View style={styles.container}>
            <Text style={[{fontFamily: "Lato_400Regular",  fontSize:20}, styles.Titletxt]}>PUG</Text>
            {/* <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']}>
            <Text>Sign in with Facebook</Text>
            </LinearGradient> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0A326D",
        justifyContent: "center",
        alignItems: "center"
    },
    Titletxt: {
        // fontFamily: "Lato" ,
        fontSize: 64,
        fontWeight: "bold",
        color: "white",
        borderWidth: 5,
        borderColor: "white",
        paddingTop: 50,
        paddingBottom: 50,
        paddingLeft: 50,
        paddingRight: 50
      
    }
});

export default LoadingLogoScreen;

