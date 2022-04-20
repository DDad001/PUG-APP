import React, { FC } from 'react';
import { FlatList, Image, StyleSheet, Text, View, TextInput, TouchableHighlight, Picker, ScrollView, Pressable } from 'react-native';
import { Box, CheckIcon, FormControl, Select } from "native-base";
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
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

interface CardProps{ 
  onProfilePress: Function,
  onEventDisplayPress: Function
}

  type RootStackParamList ={
    Nav: undefined,
    event:{name: string},
    schedule:undefined,
    cardList:{name:string}
  }

  // type Props = NativeStackScreenProps<RootStackParamList, "cardList">;
  // const navigation = useNavigation();


  const CardListComponent: FC<CardProps> = (props) => {
 
    const ProfileHandler = () => {
      props.onProfilePress()
    }

    const EventHandler = () => {
      props.onEventDisplayPress()
    }

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
          <View style={{ backgroundColor: '#0A326D', width: 54, height: 45, borderBottomRightRadius: 7, borderTopRightRadius: 7, }}>
            <FontAwesome name="search" size={15} color="white" style={{ marginTop: 14, marginLeft: 17 }} />
          </View>
        </TouchableHighlight>
      </View>

      <View style={{flex: 0, alignItems: "flex-end", justifyContent: "center", marginTop: 20, marginBottom: 5}}>
      <View style={{ marginRight: 10 }}>
                    <Box
                      maxW="155"
                      borderRadius={8}
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
                        placeholder="Filters"
                        _selectedItem={{
                          bg: "black.300",
                          endIcon: <CheckIcon size={5} color="#3B567C" />,
                        }}
                        borderWidth="0"
                        fontFamily={"Roboto_500Medium"}
                        fontSize={15}
                        color={"#0A326D"}
                      >
                        <Select.Item label="Basketball" value="ux" />
                        <Select.Item label="Soccer" value="web" />
                        <Select.Item label="Football" value="cross" />
                        <Select.Item label="Tennis" value="ui" />
                        <Select.Item label="Handball" value="backend" />
                      </Select>
                      {/* <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Please make a selection!
        </FormControl.ErrorMessage> */}
                    </Box>
                  </View>   
      </View>

        {/* make into fliatlist when time to map or later */}

        <ScrollView>
      <View style={styles.card}>
        <View style={styles.cardContent}>
                <Pressable onPress={EventHandler}>
          <View style={{ flexDirection: 'row',flex:1,}}>
            <Image source={man} style={{ flex:1, height: 90, width: 120, borderRadius: 8 }} />
            <View>
              <View style={{ flex:1, flexDirection: 'row',  }}>

                <Text style={{marginLeft: 20, fontSize: 12, marginTop: 10, fontFamily:"Lato_700Bold" }}>Oak Park Basketball Game</Text>

                <Pressable onPress={() => console.log('clicked')}>
                <MaterialIcons name="location-on" size={15} color="white" style={{ backgroundColor: '#0A326D', borderRadius: 3, overflow:'hidden', marginTop: 5, marginLeft: 8, padding:7  }} />
                </Pressable>

                <Pressable onPress={() => console.log('clicked')}>
                <FontAwesome5 name="heart" size={13} color="white" style={{ backgroundColor: '#0A326D', borderRadius: 3, overflow:'hidden', padding:8,marginLeft:9, marginTop: 5, }} />
                </Pressable>

              </View>
              <View style={{ flexDirection: 'column', }}>
                <View style={{ flexDirection: 'row', }}>
                  <Text style={{ fontSize: 10, marginLeft: 21, marginBottom:10, fontFamily:"Lato_400Regular" }}>4520 W Eight Mile Rd,{'\n'}Stockton, CA 95209</Text>
                  <MaterialCommunityIcons name="calendar-month" size={18} color="#0A326D" style={{ marginTop: 10, marginLeft: 43 }} />
                  <Text style={{ fontSize: 10, marginTop: 12, marginLeft: 4, fontFamily:"Roboto_400Regular" }}>Today</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>

                  <Pressable onPress={ProfileHandler}>
                    <View  style={{ flexDirection: 'row' }}>
                  <Image source={man} style={{ height: 22, width: 22, borderRadius: 10, marginLeft: 22 }} />
                  <Text style={{ marginLeft: 10, marginTop:7, fontSize: 10, fontFamily:"Roboto_500Medium" }}>Matthew David</Text>
                    </View>
                  </Pressable>
           
                  <MaterialCommunityIcons name="clock-time-three-outline" size={18} color="#0A326D" style={{ marginLeft: 41, marginTop: 4, }} />
                  <Text style={{ fontSize: 10, marginTop: 7, marginLeft: 4, fontFamily:"Roboto_400Regular"}}>9:30 am</Text>
                </View>

              </View>
            </View>
          </View>
                </Pressable>


        </View>
      </View>
      <View style={styles.card}>
        <View style={styles.cardContent}>
                <Pressable onPress={EventHandler}>
          <View style={{ flexDirection: 'row',flex:1,}}>
            <Image source={man} style={{ flex:1, height: 90, width: 120, borderRadius: 8 }} />
            <View>
              <View style={{ flex:1, flexDirection: 'row',  }}>

                <Text style={{marginLeft: 20, fontSize: 12, marginTop: 10, fontFamily:"Lato_700Bold" }}>Oak Park Basketball Game</Text>

                <Pressable onPress={() => console.log('clicked')}>
                <MaterialIcons name="location-on" size={15} color="white" style={{ backgroundColor: '#0A326D', borderRadius: 3, overflow:'hidden', marginTop: 5, marginLeft: 8, padding:7  }} />
                </Pressable>

                <Pressable onPress={() => console.log('clicked')}>
                <FontAwesome5 name="heart" size={13} color="white" style={{ backgroundColor: '#0A326D', borderRadius: 3, overflow:'hidden', padding:8,marginLeft:9, marginTop: 5, }} />
                </Pressable>

              </View>
              <View style={{ flexDirection: 'column', }}>
                <View style={{ flexDirection: 'row', }}>
                  <Text style={{ fontSize: 10, marginLeft: 21, marginBottom:10, fontFamily:"Lato_400Regular" }}>4520 W Eight Mile Rd,{'\n'}Stockton, CA 95209</Text>
                  <MaterialCommunityIcons name="calendar-month" size={18} color="#0A326D" style={{ marginTop: 10, marginLeft: 43 }} />
                  <Text style={{ fontSize: 10, marginTop: 12, marginLeft: 4, fontFamily:"Roboto_400Regular" }}>Today</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>

                  <Pressable onPress={ProfileHandler}>
                    <View  style={{ flexDirection: 'row' }}>
                  <Image source={man} style={{ height: 22, width: 22, borderRadius: 10, marginLeft: 22 }} />
                  <Text style={{ marginLeft: 10, marginTop:7, fontSize: 10, fontFamily:"Roboto_500Medium" }}>Matthew David</Text>
                    </View>
                  </Pressable>
           
                  <MaterialCommunityIcons name="clock-time-three-outline" size={18} color="#0A326D" style={{ marginLeft: 41, marginTop: 4, }} />
                  <Text style={{ fontSize: 10, marginTop: 7, marginLeft: 4, fontFamily:"Roboto_400Regular"}}>9:30 am</Text>
                </View>

              </View>
            </View>
          </View>
                </Pressable>


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
  
  card: {
    borderRadius: 8,
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 8,
    marginTop:17
  },
  cardContent: {
    marginHorizontal: 8,
    marginVertical: 8,
  },
  input: {
    marginLeft: 10,
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