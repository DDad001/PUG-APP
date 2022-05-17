
import React, { FC, useState, useContext, useEffect } from "react";
import { Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View, TextInput } from "react-native";
import PUGHeader from "../Components/PUGHeader";
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import man from '../assets/man.jpg';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppLoading from "expo-app-loading";
import { StatusBar } from 'expo-status-bar';
import { Box, CheckIcon, FormControl, Select, HStack, Checkbox, Center, Modal, Button, VStack, NativeBaseProvider, Input, Radio, useToast } from "native-base";
import UserContext from '../Context/UserContext';
import { AddFollower, AddLikedEvent, DeleteLikedEvent, DeleteFollower, ReportUser, ReportEvent, GetUserById, GetIsFollowed, triggerNotificationFollowingHandler, AddNotification } from '../Services/DataService'


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
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import BasketballEvent from "../assets/BasketballEvent.jpg";
import soccer from "../assets/soccer.jpg";
import volleyballevent from "../assets/volleyballevent.jpg";
import spikeball from "../assets/spikeball.jpg";
import softball from "../assets/softball.jpg";
import running from "../assets/running.jpg";
import rugby from "../assets/rugby.jpg";
import pickleball from "../assets/pickleball.jpg";
import lacrosse from "../assets/lacrosse.jpg";
import hockey from "../assets/hockey.jpg";
import hiking from "../assets/hiking.jpg";
import handball from "../assets/handball.jpg";
import golf from "../assets/golf.jpg";
import frisbee from "../assets/frisbee.jpg";
import football from "../assets/football.jpg";
import fishing from "../assets/fishing.jpg";
import discGolf1 from "../assets/discGolf1.jpg";
import cricketevent from "../assets/cricketevent.jpg";
import biking1 from "../assets/biking1.jpg";
import baseball from "../assets/baseball.jpg";
import badminton from "../assets/badminton.jpg";
import tennis from "../assets/tennis.jpg";
import pugEvent from "../assets/pugEvent.png";
import EventDisplayedImageComponent from "../Components/EventDisplayedImageComponent";


type RootStackParamList = {
  Nav: undefined,
  event: { name: string },
  schedule: undefined,
  cardList: { name: string },
  GoToEvent: undefined,
  profile: { name: string },
  GoToProfile: undefined,
}
type Props = NativeStackScreenProps<RootStackParamList, "GoToProfile">;

const OtherUsersEvent: FC<Props> = ({ navigation, route }) => {

  const Errortoast = useToast();
  const Successtoast = useToast();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModal2, setShowModal2] = useState<boolean>(false);

  const [selectItem, setSelectItem] = useState<string>("");
  const [selectReportUser, setSelectReportUser] = useState<boolean>(false);
  const [selectReportEvent, setSelectReportEvent] = useState<boolean>(false);

  //Report an event other reason
  const [radioEventValue, setRadioEventValue] = useState<string>("");
  const [otherReasonEventTxt, setOtherReasonEventTxt] = useState<string>("");

  const [radioUserValue, setRadioUserValue] = useState<string>("");
  const [otherReasonUserTxt, setOtherReasonUserTxt] = useState<string>("");

  const { userItems, eventItems, nameContext, setUpdateProfileOther, setEventItems, setNameContext, setViewUserProfile, setUpdateProfileScreen, updateEventScreen, setUpdateEventScreen, viewUserProfile, setUpdateNotificationsScreen } = useContext<any>(UserContext);

  // const [isLiked, setIsLiked] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [profileImage, setProfileImage] = useState<any>(null);

  useEffect(() => {
    handleIsFollowed();
    getProfileImage();
  }, [])

  const handleIsFollowed = async () => {
    let followed = await GetIsFollowed(userItems.id, eventItems.userId);
    setIsFollowed(followed);
  }

  const getProfileImage = async () => {
    let userData = await GetUserById(eventItems.userId);
    setProfileImage(userData.image);
  }

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
    // console.log(str);
    if (str.length > 0) {
      if (str === "reportUser") {
        // setSelectReportUser(true);
        //show the first modal to report the user!
        setShowModal(true);
      } else {
        setShowModal2(true);
      }
    }
  }

  const handleReportUser =  async() => {
    let reportUser: object;
    if(radioUserValue.length < 1){
      Errortoast.show({ placement: "top",render: () => {return <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>Error: enter a reason to report this user!</Box>;}});
    }else{
      if(radioUserValue == "OtherUser"){
        reportUser = {
          Id : 0,
          UserId : userItems.id, 
          UserBeingReportedId: eventItems.userId,
          ReportDetails: otherReasonUserTxt
        }
      }else{
        reportUser = {
          Id : 0,
          UserId : userItems.id, 
          UserBeingReportedId: eventItems.userId,
          ReportDetails: radioUserValue
        }
      }
      let bool = await ReportUser(reportUser);
      setShowModal(false);
      setRadioUserValue("");
      Successtoast.show({ placement: "top",render: () => {return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>User successfully reported!</Box>}});
    }
  }

  const handleReportEvent = async () => {
    //data validation on reporting! I need toasts!
    let reportEvent: object;
    if(radioEventValue.length < 1){
      Errortoast.show({ placement: "top",render: () => {return <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>Error: enter a reason to report this event!</Box>;}});
    }else{
      if(radioEventValue == "seven"){
        reportEvent = {
          Id: 0,
          UserId: userItems.id,
          EventBeingReportedId: eventItems.id, //get the id of the user you're reporting
          ReportDetails: otherReasonEventTxt
        }
      }else{
        reportEvent = {
          Id: 0,
          UserId: userItems.id,
          EventBeingReportedId: eventItems.id, //get the id of the user you're reporting
          ReportDetails: radioEventValue
        }
      }
      let bool = await ReportEvent(reportEvent);
      setShowModal2(false);
      Successtoast.show({ placement: "top",render: () => {return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>Event successfully reported!</Box>}});
    }
  }

  const RadioEvent = (value: string) => {
    setRadioEventValue(value);
    if (value != "seven") {
      setOtherReasonEventTxt("");
    }
  }

  const RadioUser = (value: string) => {
    setRadioUserValue(value);
    if (value != "OtherUser") {
      setOtherReasonUserTxt("");
    }
  }

  const handleFollow = () => {
    setIsFollowed(!isFollowed);
    let followed = isFollowed;
    if (!followed) {
      let newFollower = {
        Id: 0,
        UserId: userItems.id,
        FollowerId: eventItems.userId,
        isUnfollowed: false
      }
      let addNotification = {
        Id: 0,
        userId: eventItems.userId,
        PersonWhoLikedId: userItems.id,
        NotificationText: `${userItems.username} Followed You`
      }
      triggerNotificationFollowingHandler(userItems, viewUserProfile)
      AddNotification(addNotification);
      AddFollower(newFollower);
      setUpdateNotificationsScreen(true);
      //console.log('Followed')
    } else {
      DeleteFollower(userItems.id, eventItems.userId);
      //console.log('Unfollowed')
    }
    setUpdateProfileScreen(true);
  }


  const handleSaveUser = async () => {
    let userData = await GetUserById(eventItems.userId);
    setViewUserProfile(userData);
    setNameContext(`${userData.firstName} ${userData.lastName}`)
    setUpdateProfileOther(true);
  }

  

  // const handleLiked = () => {
  //   setIsLiked(!isLiked)
  //   let liked = isLiked;
  //   if (!liked) {
  //     let addLike = {
  //       Id: 0,
  //       UserId: userItems.id,
  //       EventId: eventItems.id,
  //       EventUnliked: false
  //     }
  //     AddLikedEvent(addLike)
  //   } else {
  //     DeleteLikedEvent(userItems.id, eventItems.id)
  //   }

  // }

  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <ScrollView>
          <View style={{ flex: 1, }}>

            {
              eventItems.sportOfEvent === "Basketball" ?
                <ImageBackground source={BasketballEvent} resizeMode="cover" style={{ height: 250 }}>
                  <EventDisplayedImageComponent />
                </ImageBackground>
                : eventItems.sportOfEvent === "Soccer" ?
                  <ImageBackground source={soccer} resizeMode="cover" style={{ height: 250 }}>
                    <EventDisplayedImageComponent />
                  </ImageBackground>
                  : eventItems.sportOfEvent === "Badminton" ?
                    <ImageBackground source={badminton} resizeMode="cover" style={{ height: 250 }}>
                      <EventDisplayedImageComponent />
                    </ImageBackground>
                    : eventItems.sportOfEvent === "Baseball" ?
                      <ImageBackground source={baseball} resizeMode="cover" style={{ height: 250 }}>
                        <EventDisplayedImageComponent />
                      </ImageBackground>
                      : eventItems.sportOfEvent === "Cycling" ?
                        <ImageBackground source={biking1} resizeMode="cover" style={{ height: 250 }}>
                          <EventDisplayedImageComponent />
                        </ImageBackground>
                        : eventItems.sportOfEvent === "Hockey" ?
                          <ImageBackground source={hockey} resizeMode="cover" style={{ height: 250 }}>
                            <EventDisplayedImageComponent />
                          </ImageBackground>
                          : eventItems.sportOfEvent === "Disc golf" ?
                            <ImageBackground source={discGolf1} resizeMode="cover" style={{ height: 250 }}>
                              <EventDisplayedImageComponent />
                            </ImageBackground>
                            : eventItems.sportOfEvent === "Fishing" ?
                              <ImageBackground source={fishing} resizeMode="cover" style={{ height: 250 }}>
                                <EventDisplayedImageComponent />
                              </ImageBackground>
                              : eventItems.sportOfEvent === "Football" ?
                                <ImageBackground source={football} resizeMode="cover" style={{ height: 250 }}>
                                  <EventDisplayedImageComponent />
                                </ImageBackground>
                                : eventItems.sportOfEvent === "Frisbee" ?
                                  <ImageBackground source={frisbee} resizeMode="cover" style={{ height: 250 }}>
                                    <EventDisplayedImageComponent />
                                  </ImageBackground>
                                  : eventItems.sportOfEvent === "Golf" ?
                                    <ImageBackground source={golf} resizeMode="cover" style={{ height: 250 }}>
                                      <EventDisplayedImageComponent />
                                    </ImageBackground>
                                    : eventItems.sportOfEvent === "Handball" ?
                                      <ImageBackground source={handball} resizeMode="cover" style={{ height: 250 }}>
                                        <EventDisplayedImageComponent />
                                      </ImageBackground>
                                      : eventItems.sportOfEvent === "Hiking" ?
                                        <ImageBackground source={hiking} resizeMode="cover" style={{ height: 250 }}>
                                          <EventDisplayedImageComponent />
                                        </ImageBackground>
                                        : eventItems.sportOfEvent === "Cricket" ?
                                          <ImageBackground source={cricketevent} resizeMode="cover" style={{ height: 250 }}>
                                            <EventDisplayedImageComponent />
                                          </ImageBackground>
                                          : eventItems.sportOfEvent === "Rugby" ?
                                            <ImageBackground source={rugby} resizeMode="cover" style={{ height: 250 }}>
                                              <EventDisplayedImageComponent />
                                            </ImageBackground>
                                            : eventItems.sportOfEvent === "Pickleball" ?
                                              <ImageBackground source={pickleball} resizeMode="cover" style={{ height: 250 }}>
                                                <EventDisplayedImageComponent />
                                              </ImageBackground>
                                              : eventItems.sportOfEvent === "Running" ?
                                                <ImageBackground source={running} resizeMode="cover" style={{ height: 250 }}>
                                                  <EventDisplayedImageComponent />
                                                </ImageBackground>
                                                : eventItems.sportOfEvent === "Softball" ?
                                                  <ImageBackground source={softball} resizeMode="cover" style={{ height: 250 }}>
                                                    <EventDisplayedImageComponent />
                                                  </ImageBackground>
                                                  : eventItems.sportOfEvent === "Spikeball" ?
                                                    <ImageBackground source={spikeball} resizeMode="cover" style={{ height: 250 }}>
                                                      <EventDisplayedImageComponent />
                                                    </ImageBackground>
                                                    : eventItems.sportOfEvent === "Tennis" ?
                                                      <ImageBackground source={tennis} resizeMode="cover" style={{ height: 250 }}>
                                                        <EventDisplayedImageComponent />
                                                      </ImageBackground>
                                                      : eventItems.sportOfEvent === "Lacrosse" ?
                                                        <ImageBackground source={lacrosse} resizeMode="cover" style={{ height: 250 }}>
                                                          <EventDisplayedImageComponent />
                                                        </ImageBackground>
                                                        : eventItems.sportOfEvent === "Volleyball" ?
                                                          <ImageBackground source={volleyballevent} resizeMode="cover" style={{ height: 250 }}>
                                                            <EventDisplayedImageComponent />
                                                          </ImageBackground>
                                                          :
                                                          <ImageBackground source={pugEvent} resizeMode="cover" style={{ height: 250 }}>
                                                            <EventDisplayedImageComponent />
                                                          </ImageBackground>


            }

          </View>



          <View style={{ marginLeft: 15 }}>
            <Text style={{ fontFamily: "Lato_700Bold", fontSize: 18, marginTop: 17 }}>{eventItems.nameOfEvent}</Text>
            <Text style={{ marginTop: 10, fontFamily: "Lato_400Regular", fontSize: 13 }}>{eventItems.addressOfEvent}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <MaterialCommunityIcons name="calendar-month" size={22} color="black" style={{ marginTop: 10, marginLeft: 14 }} />
            <Text style={{ marginTop: 12, marginLeft: 9, fontFamily: "Roboto_400Regular", fontSize: 13 }}>{eventItems.dateOfEvent}</Text>
            <MaterialCommunityIcons name="clock-time-three-outline" size={22} color="black" style={{ marginLeft: 25, marginTop: 10 }} />
            <Text style={{ marginLeft: 9, marginTop: 12, fontFamily: "Roboto_400Regular", fontSize: 13 }} >{eventItems.timeOfEvent}</Text>
          </View>

          <View style={{ flexDirection: 'row', flex: 1, marginTop: 10 }}>

            <View style={{ flexDirection: 'column', flex: 0.93 }}>
              <Text style={{ marginLeft: 15, fontFamily: "Lato_700Bold", }}>Sport being played:</Text>
              <Text style={{ marginLeft: 15, fontFamily: "Lato_400Regular", }}>{eventItems.sportOfEvent}</Text>
            </View>

            <Pressable onPress={() => console.log('clicked')} style={{ marginLeft: 9 }}>
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
                  </Select>
                  {/* <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Please make a selection!
        </FormControl.ErrorMessage> */}
                </Box>
              </View>
            </Pressable>
          </View>

          <Pressable onPress={() => {
            handleSaveUser();
            navigation.navigate('profile', { name: 'profile' }
            )}}>
            <Center>
              <Modal isOpen={showModal} size="full" onClose={() => setShowModal(false)}>
                <Modal.Content maxWidth="400px">
                  <Modal.CloseButton />
                  <Modal.Header>Report this user</Modal.Header>
                  <Modal.Body>
                    <Text style={{ fontSize: 18, fontFamily: "Roboto_400Regular", color: "black", alignItems: "center" }}>Why are you reporting this user?</Text>
                    <View style={{ marginTop: 10 }}>
                      <Radio.Group name="Report User" accessibilityLabel="Choose a reason to report this user" onChange={(value) => RadioUser(value)}>
                        <Radio value="User posts content not suitable to PUG" my={1}>
                          <Text style={{ fontSize: 16, fontFamily: "Roboto_400Regular", color: "black" }} accessibilityLabel="Radio box, user posts content not suitable to PUG">User posts content not suitable to PUG</Text>
                        </Radio>
                        <Radio value="Account is pretending to be someone else" my={1}>
                          <Text style={{ fontSize: 16, fontFamily: "Roboto_400Regular", color: "black" }} accessibilityLabel="Radio box, account is pretending to be someone else">Account is pretending to be someone else</Text>
                        </Radio>
                        <Radio value="User may be under the age of 18" my={1}>
                          <Text style={{ fontSize: 16, fontFamily: "Roboto_400Regular", color: "black" }} accessibilityLabel="Radio box, user may be under the age of 18">User may be under the age of 18</Text>
                        </Radio>
                        <Radio value="User's profile image" my={1}>
                          <Text style={{ fontSize: 16, fontFamily: "Roboto_400Regular", color: "black" }} accessibilityLabel="Radio box, user's profile image is inappropriate">User's profile image is inappropriate</Text>
                        </Radio>
                        <Radio value="OtherUser" my={1}>
                          <Text style={{ fontSize: 16, fontFamily: "Roboto_400Regular", color: "black" }}>Other</Text>
                        </Radio>
                      </Radio.Group>
                    </View>
                    <View style={{ flex: 1 }}>
                      {
                        radioUserValue === "OtherUser" ?
                          <View>
                            <TextInput style={[ styles.LargeTxtInput,{alignItems: "flex-start"}] } onChangeText={(text) => setOtherReasonUserTxt(text)} value={otherReasonUserTxt} accessibilityLabel="Enter the reason you are reporting this user in 200 characters or less."
                            textAlignVertical="top"
                            multiline={true}
                            maxLength={200}
                            placeholder="Enter the reason you are reporting this user..."
                            placeholderTextColor={"rgba(59, 86, 124, 1)"}
                            numberOfLines={5} />
                            <Text style={{color: "rgba(59, 86, 124, 1)", paddingLeft: 20}}>{otherReasonUserTxt.length}/200 character limit</Text>
                          </View>
                          : null
                      }
                    </View>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button.Group space={2}>
                      <Button backgroundColor={"#0A326D"} onPress={() => {
                        setShowModal(false)
                      }}>
                        Close
                      </Button>
                      <Button backgroundColor={"#0A326D"} onPress={() => {
                        handleReportUser()
                      }}>
                        Report User
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
                      <Text style={{ fontSize: 18, fontFamily: "Roboto_400Regular", color: "black", alignItems: "center" }}>
                        What are the following reasons for reporting this event?
                      </Text>
                      <View style={{ marginTop: 10 }}>
                        <Radio.Group name="Report Event" accessibilityLabel="Choose a reason to report this event" onChange={(value) => RadioEvent(value)}>
                          <Radio value="Malicious Content" my={1}>
                            <Text style={{ fontSize: 16, fontFamily: "Roboto_400Regular", color: "black" }}>Malicious Content</Text>
                          </Radio>
                          <Radio value="Illegal Activity" my={1}>
                            <Text style={{ fontSize: 16, fontFamily: "Roboto_400Regular", color: "black" }}>Illegal activity</Text>
                          </Radio>
                          <Radio value="Hate speech or symbols" my={1}>
                            <Text style={{ fontSize: 16, fontFamily: "Roboto_400Regular", color: "black" }}>Hate speech or symbols</Text>
                          </Radio>
                          <Radio value="Bullying or harassment" my={1}>
                            <Text style={{ fontSize: 16, fontFamily: "Roboto_400Regular", color: "black" }}>Bullying or harassment</Text>
                          </Radio>
                          <Radio value="Nudity or sexual activity" my={1}>
                            <Text style={{ fontSize: 16, fontFamily: "Roboto_400Regular", color: "black" }}>Nudity or sexual activity</Text>
                          </Radio>
                          <Radio value="Spam" my={1}>
                            <Text style={{ fontSize: 16, fontFamily: "Roboto_400Regular", color: "black" }}>Spam</Text>
                          </Radio>
                          <Radio value="seven" my={1}>
                            <Text style={{ fontSize: 16, fontFamily: "Roboto_400Regular", color: "black" }}>Other</Text>
                          </Radio>
                        </Radio.Group>
                      </View>
                      <View style={{ flex: 1 }}>
                        {
                          radioEventValue === "seven" ?
                            <View>
                              <TextInput style={[styles.LargeTxtInput, {alignItems: "flex-start"}]} onChangeText={(text) => setOtherReasonEventTxt(text)} value={otherReasonEventTxt}
                                textAlignVertical="top"
                                multiline={true}
                                maxLength={200}
                                placeholder="Enter your reason for reporting this event..."
                                accessibilityLabel="Enter the reason you are reporting this event in 200 characters or less."
                                placeholderTextColor={"rgba(59, 86, 124, 1)"}
                                numberOfLines={5}/>
                                <Text style={{color: "rgba(59, 86, 124, 1)", paddingLeft: 20}}>{otherReasonEventTxt.length}/200 character limit</Text>
                            </View>
                            : null
                        }
                      </View>
                    </Box>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button.Group space={2}>
                      <Button backgroundColor={"#0A326D"} onPress={() => {
                        setShowModal2(false)
                      }}>
                        Close
                      </Button>
                      <Button backgroundColor={"#0A326D"} onPress={() => {
                        handleReportEvent()
                      }}>
                        Report Event
                      </Button>
                    </Button.Group>
                  </Modal.Footer>
                </Modal.Content>
              </Modal>
            </Center>
            <View style={{ flexDirection: 'row' }}>

              <View style={{ flexDirection: 'row', flex: 1, backgroundColor: '#7E90AB', marginTop: 15, height: 80, shadowRadius: 8, shadowColor: '#333', shadowOffset: { width: 5, height: 5 }, shadowOpacity: 0.4 }}>

                {
                  profileImage === null ? <Ionicons name="person-circle-sharp" size={65} style={{alignSelf: 'center', marginLeft: 22}} color="black" />
                  : <Image source={{uri: profileImage}} style={{ height: 55, width: 55, borderRadius: 30, marginTop: 13, marginLeft: 22 }} />

                }
                <Text style={{ flex: 0.9, marginTop: 30, marginLeft: 17, fontSize: 16, color: 'white', fontFamily: "Roboto_700Bold" }}>{nameContext}</Text>


                <Pressable onPress={handleFollow} style={{ marginLeft: 20, marginTop: 17 }}>
                  <View style={{ backgroundColor: '#0A326D', borderRadius: 2, overflow: 'hidden', marginTop: 10, marginLeft: 12, padding: 5, width: 90, height: 27 }} >
                    {
                      isFollowed ? <Text style={{ marginLeft: 14, color: 'white', fontFamily: "Lato_400Regular"}}>Unfollow</Text>
                        : <Text style={{ marginLeft: 16, color: 'white', fontFamily: "Lato_400Regular" }}>Follow</Text>
                    }

                  </View>
                </Pressable>

              </View>

            </View>
          </Pressable>

          <View style={{ marginLeft: 20, marginTop: 15 }} >
            <Text style={{ fontFamily: "Roboto_500Medium", fontSize: 17 }}>Details:</Text>
            <Text style={{ marginTop: 10, fontFamily: "Lato_400Regular", fontSize: 15, marginBottom: 20 }}>{eventItems.descriptionOfEvent}</Text>
          </View>
        </ScrollView>
      </View>
    </>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  containerInsideImage: {
    flexDirection: "row",
    paddingTop: 5,
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
    minWidth:200,
    borderColor: "white",
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
});
export default OtherUsersEvent;