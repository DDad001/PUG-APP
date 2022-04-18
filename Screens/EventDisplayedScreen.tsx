import React,{ FC, useState } from "react";
import { Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View, TextInput } from "react-native";
import PUGHeader from "../Components/PUGHeader";
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import man from '../assets/man.jpg';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FooterComponent from "../Components/FooterComponent";
import AppLoading from "expo-app-loading";
import { StatusBar } from 'expo-status-bar';
import { Box, CheckIcon, FormControl, Select, HStack, Checkbox, Center, Modal, Button, VStack, NativeBaseProvider, Input, Radio } from "native-base";


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

  const EventDisplayedScreen:FC = () => {
    
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showModal2, setShowModal2] = useState<boolean>(false);

    const [selectItem, setSelectItem] = useState<string>("");
    const [selectReportUser, setSelectReportUser] = useState<boolean>(false);
    const [selectReportEvent, setSelectReportEvent] = useState<boolean>(false);

    //Report an event other reason
    const [eventOtherReason, setEventOtherReason] = useState<boolean>(false);
    const [otherReasonTxt, setOtherReasonTxt] = useState<string>("");

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

        const reportUserOrEvent = (str: string) => {
          console.log(str);
          if(str.length > 0){
            if(str === "reportUser"){
              // setSelectReportUser(true);
              //show the first modal to report the user!
              setShowModal(true);
            }else{
              setShowModal2(true);
            }
          }
        }

      return (
        <>
        <StatusBar style="dark" />
        <View style={styles.container}> 
        <View style={{ flexDirection:'row', marginBottom:10 ,}}>
            <View style={{alignItems: 'flex-start', marginLeft:8}}>
                 <Ionicons name="chevron-back" size={35} color="#7E90AB" style={{marginTop:7, justifyContent:'flex-start'}}/>
            </View>
        </View>

        <ScrollView>
        <View style={{ flex:1,}}>

        <ImageBackground source={man} resizeMode="cover" style={{ height:250}}>
            <View style={styles.containerInsideImage}> 
            <View style={{flex:1, alignItems: 'flex-end', marginTop:7, marginRight:10}}>
            <MaterialIcons name="location-on" size={20} color="white" style={{ backgroundColor: '#0A326D', borderRadius: 3, overflow:'hidden', marginTop: 10, marginLeft: 12, padding:5  }} />
            </View>
            <View style={{marginTop:7, marginRight:10}}>
            <FontAwesome5 name="heart" size={17} color="white" style={{ backgroundColor: '#0A326D', borderRadius: 3, overflow:'hidden', marginTop: 10, padding:6.5 }} />
            </View>
        </View>
        </ImageBackground>
        </View>
            <View style={{marginLeft:15}}>
                <Text style={{fontFamily:"Lato_700Bold", fontSize:18, marginTop:17}}>Oak Park Basketball Game</Text>
                <Text style={{marginTop:10,fontFamily:"Lato_400Regular", fontSize:13}}>4520 W Eight Mile Rd,{'\n'}Stockton, CA 95209</Text>
            </View>
                <View style={{flexDirection:'row'}}>
                    <MaterialCommunityIcons name="calendar-month" size={22} color="black" style={{ marginTop: 10, marginLeft: 14}} />
                    <Text style={{ marginTop: 12, marginLeft: 9, fontFamily:"Roboto_400Regular",fontSize:13}}>04/22/22</Text>
                    <MaterialCommunityIcons name="clock-time-three-outline" size={22} color="black" style={{ marginLeft:25, marginTop:10 }} />
                    <Text style={{ marginLeft:9, marginTop:12, fontFamily:"Roboto_400Regular", fontSize:13 }} >9:30 am</Text>
                </View>

                <View style={{flexDirection:'row', flex:1, marginTop:10}}>

                  <View style={{flexDirection:'column', flex:0.93}}>
                   <Text style={{marginLeft:15,fontFamily:"Lato_700Bold",}}>Sport being played:</Text>
                   <Text  style={{marginLeft:15,fontFamily:"Lato_400Regular",}}>Basketball</Text>
                  </View>
                
                <Pressable onPress={() => console.log('clicked')} style={{marginLeft:9}}>
                  {/* <View style={{ backgroundColor: '#0A326D', borderRadius: 2, overflow:'hidden', marginTop:5, marginLeft: 20, padding:5, width:130, height:30,}} >
                      <Text style={{marginLeft:7,marginTop:2, color:'white', fontFamily:"Lato_400Regular"}}>Report this...</Text>
                  </View> */}
                  <View>
                  <Box
                      maxW="155"
                      borderRadius={2}
                      style={{
                        backgroundColor: "white",
                        borderColor: "black",
                        borderWidth: 1,
                        // shadowColor: "black",
                        // shadowOffset: { width: -2, height: 4 },
                        // shadowOpacity: 0.5,
                        // shadowRadius: 3,
                      }}
                    >
                      <Select
                        minWidth="150"
                        minHeight="25"
                        accessibilityLabel="Report this event or user"
                        placeholderTextColor={"black"}
                        placeholder="Report..."
                        onValueChange={(text) => reportUserOrEvent(text)}
                        _selectedItem={{
                          bg: "black",
                          opacity: 0.2,
                          endIcon: <CheckIcon size={5} color="white" />,
                        }}
                        borderWidth="0"
                        fontFamily={"Roboto_400Regular"}
                        fontSize={15}
                        color={"black"}
                      >
                          <Select.Item label="Report User" value="reportUser" />
                          <Select.Item label="Report Event" value="reportEvent" />
                        {/* <Select.Item label="Cancel" value="cancel" /> */}
                      </Select>
                      {/* <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Please make a selection!
        </FormControl.ErrorMessage> */}
                    </Box>
                  </View>
                </Pressable>
                </View>
                
                  <Center>
                    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                    <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Report this user</Modal.Header>
                    <Modal.Body>
                      <Box>
                        <Text>
                          Why would you like to report this user?
                        </Text>
                      </Box>
                    </Modal.Body>
                    <Modal.Footer>
                  <Button.Group space={2}>
                    <Button onPress={() => {
                    setShowModal(false)
                  }}>
                      Close
                    </Button>
                  </Button.Group>
                </Modal.Footer>
              </Modal.Content>
            </Modal>
          </Center>
          <Center>
            <Modal isOpen={showModal2} onClose={() => setShowModal2(false)} size="full">
            <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Report this event</Modal.Header>
            <Modal.Body>
              <Box>
                <Text style={{fontSize: 18, fontFamily: "Roboto_400Regular", color: "black", alignItems: "center"}}>
                  What are the following reasons for reporting this event?
                </Text>
                <View style={{marginTop: 10}}>
                  <Radio.Group name="Report Event" accessibilityLabel="Choose a reason to report this event">
                  <Radio value="one" my={1}>
                    <Text style={{fontSize: 16, fontFamily: "Roboto_400Regular", color: "black"}}>Malicious Content</Text>
                  </Radio>
                  <Radio value="two" my={1}>
                    <Text style={{fontSize: 16, fontFamily: "Roboto_400Regular", color: "black"}}>Illegal activity</Text>
                  </Radio>
                  <Radio value="three" my={1}>
                    <Text style={{fontSize: 16, fontFamily: "Roboto_400Regular", color: "black"}}>Hate speech or symbols</Text>
                  </Radio>
                  <Radio value="four" my={1}>
                    <Text style={{fontSize: 16, fontFamily: "Roboto_400Regular", color: "black"}}>Bullying or harassment</Text>
                  </Radio>
                  <Radio value="five" my={1}>
                    <Text style={{fontSize: 16, fontFamily: "Roboto_400Regular", color: "black"}}>Nudity or sexual activity</Text>
                  </Radio>
                  <Radio value="six" my={1}>
                    <Text style={{fontSize: 16, fontFamily: "Roboto_400Regular", color: "black"}}>Spam</Text>
                  </Radio>
                  <Radio value="seven" my={1} >
                    <Text style={{fontSize: 16, fontFamily: "Roboto_400Regular", color: "black"}}>Other</Text>
                  </Radio>
                  </Radio.Group>
                </View>
                <View style={{flex: 1, backgroundColor: "red",}}>
                   {
                     eventOtherReason === true ?
                    //  <TextInput onChangeText={(text) => setOtherReasonTxt(text)} value={otherReasonTxt}  multiline={true} maxLength={200} />
                    <View>
                      <TextInput onChangeText={(text) => setOtherReasonTxt(text)} value={otherReasonTxt} multiline={true}/>
                    </View>
                     : null
                   } 
                </View>
              </Box>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button onPress={() => {
                setShowModal2(false)
              }}>
                  Close
                </Button>
              </Button.Group>
            </Modal.Footer>
            </Modal.Content>
            </Modal>
          </Center>
                <View style={{flexDirection:'row'}}>
                <View style={{flexDirection:'row', flex: 1, backgroundColor: '#7E90AB', marginTop: 15, height:80,shadowRadius:8,shadowColor: '#333',shadowOffset: { width: 5, height: 5 },shadowOpacity: 0.4}}>
                <Image source={man} style={{ height: 55, width: 55, borderRadius: 30, marginTop: 13, marginLeft: 22 }} />
                <Text style={{flex:0.9, marginTop:30, marginLeft:17, fontSize:16,color:'white', fontFamily:"Roboto_700Bold"}}>Matthew David</Text>

                <Pressable onPress={() => console.log('clicked')} style={{marginLeft:20, marginTop:17}} accessibilityLabel="Follow this user">
                <View style={{ backgroundColor: '#0A326D', borderRadius: 2, overflow:'hidden', marginTop: 10, marginLeft: 12, padding:5, width:90, height:27 }} >
                    <Text style={{marginLeft:16, color:'white', fontFamily:"Lato_400Regular"}}>Follow</Text>
                </View>
                </Pressable>

                </View>
                </View>

                <View style={{marginLeft:20, marginTop:15}} >
                    <Text style={{fontFamily:"Roboto_500Medium", fontSize:17}}>Details:</Text>
                    <Text style={{marginTop:10, fontFamily:"Lato_400Regular", fontSize:15, marginBottom:20}}>We want to play at least 3 games. With at least 15 people on each team. If we have more players we will swap between new games. </Text>
                </View>
           </ScrollView>
        </View>
           <FooterComponent/>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flex: 1,
      },

      containerInsideImage: {
        flexDirection: "row",
        paddingTop: 5,
      },
});
export default EventDisplayedScreen;