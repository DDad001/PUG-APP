import { FC } from "react";
import { View, StyleSheet, Text, Button, Pressable, Image } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
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


  //You can't style a button have to use a pressable!
  const PUGHeader: FC = () => {
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
  });

  if(!fontsLoaded){
      return <AppLoading/>;
  }

  return (
      <>
      <View style={styles.container}> 
          <Text style={{fontSize:22, color:'white', marginLeft:12, marginTop:10, fontFamily:"Lato_900Black"}}>Sport Events</Text>
          <View style={{flex:1, alignItems: 'flex-end', marginTop:7, marginRight:10}}>
              <MaterialIcons name="notifications" size={35} color="#E8F1FF" />
          </View>
          <View style={{backgroundColor:'#7E90AB',borderBottomLeftRadius:50, borderBottomEndRadius:5, borderTopLeftRadius:5, width:45, height: 46}}>
          <Ionicons name="add" size={45} color="white" style={{marginLeft:4}}/>
          </View>
      </View>
      </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingTop: 25,
    flex: 0.2 
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
    borderColor: 'white'
  },
});

export default PUGHeader;
