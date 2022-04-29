import { FC, useState, useContext, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableHighlight,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import FollowingComponent from "../Components/FollowingComponent";
import { FontAwesome } from "@expo/vector-icons";

import UserContext from "../Context/UserContext";
import {
  DeleteFollower,
  GetUserByUsername,
  GetUserById,
  GetFollowingByUserId,
} from "../Services/DataService";

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

import BaseballPicture from "../assets/BaseballGlove.png";
import Skier from "../assets/Skier.png";

const FollowingScreen: FC = () => {
  const { userItems } = useContext<any>(UserContext);
  const [displayFollowing, setDisplayFollowing] = useState<any>([]);

  useEffect(() => {
    getFollowing();
  }, []);

  const getFollowing = async () => {
    let followingArr: any[] = [];
    let following = await GetFollowingByUserId(userItems.id);
    //console.log(followers);
    following.map(async (person: any) => {
      let follower: object = await GetUserById(person.followerId);
      followingArr.push(follower);
      //console.log(follower);
    });

    setTimeout(() => {
      setDisplayFollowing(followingArr);
    }, 1000);
  };

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

  const [input, setInput] = useState("");

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const handleUnfollow = async (unfollowId: number) => {
    console.log("Deleted");
    DeleteFollower(userItems.id, unfollowId);

    setTimeout(() => {
      getFollowing();
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={BaseballPicture}
        resizeMode="cover"
        style={{ height: "100%", width: "100%", backgroundColor: "#0A326D" }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            paddingBottom: 33,
            marginTop: 30,
          }}
        >
          <View>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setInput(text)}
              onSubmitEditing={() => {
                alert(`Your message is: ${input}`);
                setInput("");
              }}
              value={input}
              placeholder="Search following"
              placeholderTextColor={"#959494"}
            />
          </View>
          <TouchableHighlight>
            <View
              style={{
                backgroundColor: "#0A326D",
                width: 54,
                height: 45,
                marginTop: 18,
                borderBottomRightRadius: 7,
                borderTopRightRadius: 7,
              }}
            >
              <FontAwesome
                name="search"
                size={15}
                color="white"
                style={{ marginTop: 14, marginLeft: 17 }}
              />
            </View>
          </TouchableHighlight>
        </View>

        <View style={styles.overlayContainer}>
          <Text style={styles.FollowingText}>Following</Text>
          <ScrollView>
            {displayFollowing.map((person: any, idx: number) => {
              return (
                <View style={styles.NotificationView} key={idx}>
                  <Image source={Skier} style={styles.ImageStyle} />
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.TextStyle}>{person.username} </Text>

                    <Pressable
                      style={styles.unfollowBtn}
                      onPress={() => handleUnfollow(person.id)}
                      accessibilityLabel="Followers Button"
                    >
                      <Text style={styles.unfollowTxt}>Unfollow</Text>
                    </Pressable>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlayContainer: {
    flex: 6,
    // marginTop: 104,
  },
  FollowingText: {
    fontFamily: "Lato_400Regular",
    fontStyle: "normal",
    fontWeight: "800",
    color: "white",
    fontSize: 32,
    marginBottom: 5,
    marginLeft: 25,
  },
  input: {
    marginLeft: 10,
    marginTop: 18,
    width: 300,
    height: 45,
    backgroundColor: "white",
    borderColor: "white",
    borderWidth: 1,
    borderTopStartRadius: 7,
    borderBottomStartRadius: 7,
    padding: 10,
  },
  loginBtnTxt: {
    color: "#0A326D",
    fontFamily: "Lato_400Regular",
    fontSize: 14,
    fontWeight: "600",
    justifyContent: "center",
    paddingLeft: 28,
    paddingRight: 28,
    paddingTop: "10%",
    paddingBottom: "10%",
  },
  ImageStyle: {
    height: 70,
    width: 70,
    borderRadius: 50,
    marginRight: 15,
  },
  TextStyle: {
    color: "white",
    fontSize: 22,
    fontFamily: "Roboto_500Medium",
    fontWeight: "500",
  },
  TimeText: {
    color: "#DFE6F5",
    fontSize: 13,
    paddingTop: 5,
    fontFamily: "Roboto_500Medium",
  },
  NotificationView: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    paddingTop: 5,
    paddingBottom: 34,
    // marginLeft: 10,
    //marginRight: 25,
  },
  MiddleTextStyle: {
    color: "white",
    fontSize: 16,
    fontFamily: "Lato_300Light",
  },
  unfollowBtn: {
    backgroundColor: "#0A326D",
    borderRadius: 10,
    marginLeft: 15,
    //marginRight: 55,
  },
  unfollowTxt: {
    color: "white",
    fontFamily: "Lato_700Bold",
    fontSize: 15,
    fontWeight: "800",
    justifyContent: "center",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 12,
    paddingBottom: 12,
  },
});

export default FollowingScreen;
