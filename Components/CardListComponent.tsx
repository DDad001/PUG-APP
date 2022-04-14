import React from 'react';
import { FlatList, Image, StyleSheet, Text, View, TextInput, TouchableHighlight, Picker, ScrollView } from 'react-native';
import { useState } from 'react';
import man from '../assets/man.jpg';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';
// import { Divider, Menu, Provider, Button } from 'react-native-paper';

// import SelectDropdown from 'react-native-select-dropdown'
// import { IndexPath, Layout, Select, SelectItem } from '@ui-kitten/components';

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

  
  
  const CardListComponent = () => {
  
    const [visible, setVisible] = React.useState(false);
  
    const openMenu = () => setVisible(true);
  
    const closeMenu = () => setVisible(false);
    const [input, setInput] = useState("")

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
    Roboto_700Bold,
    Roboto_500Medium,
    Roboto_400Regular,
  });
 

if(!fontsLoaded){
    return <AppLoading/>;
}

  console.log(input)
  return (
    <>
      <View style={{ flexDirection: 'row' }}>

        <View style={{flex:1}}>
          <TextInput style={styles.input} onChangeText={(text) => setInput(text)}
            onSubmitEditing={() => {
              alert(`Your message is: ${input}`);
              setInput("");
            }}
            value={input}
            placeholder="Search for an event..."
            placeholderTextColor={'#959494'}
          />
        </View>
        <TouchableHighlight style={{ marginRight:10}} >
          <View style={{ backgroundColor: '#0A326D', width: 54, height: 45, marginTop: 18, borderBottomRightRadius: 7, borderTopRightRadius: 7, }}>
            <FontAwesome name="search" size={15} color="white" style={{ marginTop: 14, marginLeft: 17 }} />
          </View>
        </TouchableHighlight>
      </View>

      <View>

      </View>

        {/* make into fliatlist when time to map or later */}

        <ScrollView>
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View style={{ flexDirection: 'row', }}>
            <Image source={man} style={{ height: 90, width: 120, borderRadius: 8 }} />
            <View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ marginLeft: 20, fontSize: 12, marginTop: 10, fontFamily:"Lato_700Bold" }}>Oak Park Basketball Game</Text>
                <MaterialIcons name="location-on" size={13} color="white" style={{ backgroundColor: '#0A326D', borderRadius: 3, overflow:'hidden', marginTop: 10, marginLeft: 8, padding:5  }} />
                <FontAwesome5 name="heart" size={11} color="white" style={{ backgroundColor: '#0A326D', borderRadius: 3, overflow:'hidden', padding:6.5,marginLeft:9, marginTop: 10, }} />
              </View>
              <View style={{ flexDirection: 'column', }}>
                <View style={{ flexDirection: 'row', }}>
                  <Text style={{ fontSize: 10, marginLeft: 21, marginTop: 2, fontFamily:"Lato_400Regular" }}>4520 W Eight Mile Rd,{'\n'}Stockton, CA 95209</Text>
                  <MaterialCommunityIcons name="calendar-month" size={18} color="black" style={{ marginTop: 10, marginLeft: 43 }} />
                  <Text style={{ fontSize: 10, marginTop: 12, marginLeft: 4, fontFamily:"Roboto_400Regular" }}>Today</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <Image source={man} style={{ height: 22, width: 22, borderRadius: 10, marginTop: 8, marginLeft: 22 }} />
                  <Text style={{ marginLeft: 10, marginTop: 13, fontSize: 10, fontFamily:"Roboto_500Medium" }}>Matthew David</Text>
                  <MaterialCommunityIcons name="clock-time-three-outline" size={18} color="black" style={{ marginLeft: 41, marginTop: 4, }} />
                  <Text style={{ fontSize: 10, marginTop: 7, marginLeft: 4, fontFamily:"Roboto_400Regular"}}>9:30 am</Text>
                </View>

              </View>
            </View>
          </View>


        </View>
      </View>
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View style={{ flexDirection: 'row', }}>
            <Image source={man} style={{ height: 90, width: 120, borderRadius: 8 }} />
            <View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ marginLeft: 20, fontSize: 12, marginTop: 10, fontFamily:"Lato_700Bold" }}>Oak Park Basketball Game</Text>
                <MaterialIcons name="location-on" size={13} color="white" style={{ backgroundColor: '#0A326D', borderRadius: 3, overflow:'hidden', marginTop: 10, marginLeft: 8, padding:5  }} />
                <FontAwesome5 name="heart" size={11} color="white" style={{ backgroundColor: '#0A326D', borderRadius: 3, overflow:'hidden', padding:6.5,marginLeft:9, marginTop: 10, }} />
              </View>
              <View style={{ flexDirection: 'column', }}>
                <View style={{ flexDirection: 'row', }}>
                  <Text style={{ fontSize: 10, marginLeft: 21, marginTop: 2, fontFamily:"Lato_400Regular" }}>4520 W Eight Mile Rd,{'\n'}Stockton, CA 95209</Text>
                  <MaterialCommunityIcons name="calendar-month" size={18} color="black" style={{ marginTop: 10, marginLeft: 43 }} />
                  <Text style={{ fontSize: 10, marginTop: 12, marginLeft: 4, fontFamily:"Roboto_400Regular" }}>Today</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <Image source={man} style={{ height: 22, width: 22, borderRadius: 10, marginTop: 8, marginLeft: 22 }} />
                  <Text style={{ marginLeft: 10, marginTop: 13, fontSize: 10, fontFamily:"Roboto_500Medium" }}>Matthew David</Text>
                  <MaterialCommunityIcons name="clock-time-three-outline" size={18} color="black" style={{ marginLeft: 41, marginTop: 4, }} />
                  <Text style={{ fontSize: 10, marginTop: 7, marginLeft: 4, fontFamily:"Roboto_400Regular"}}>9:30 am</Text>
                </View>

              </View>
            </View>
          </View>


        </View>
      </View>
      </ScrollView>
  
      {/* <View
        style={{
          marginTop: 120,
          flexDirection: 'row',
          justifyContent: 'center',
          position:"absolute",
          backgroundColor:'none',
        }}>
        <Provider>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={<Button onPress={openMenu}>Show menu</Button>}>
            <Menu.Item onPress={() => { }} title="Item 1" />
            <Menu.Item onPress={() => { }} title="Item 2" />
            <Divider />
            <Menu.Item onPress={() => { }} title="Item 3" />
          </Menu>
        </Provider>
      </View> */}
    </>
  )
};

const styles = StyleSheet.create({
  container: {
    minHeight: 128,
  },
  card: {
    borderRadius: 8,
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 8,
    marginTop:25
  },
  cardContent: {
    marginHorizontal: 8,
    marginVertical: 8,
  },
  input: {
    marginLeft: 10,
    marginTop: 18,
    height: 45,
    backgroundColor: 'white',
    borderColor: "white",
    borderWidth: 1,
    borderTopStartRadius: 7,
    borderBottomStartRadius: 7,
    padding: 10, 
    fontFamily:"OpenSans_400Regular",
    fontSize:12
  }

});

export default CardListComponent;