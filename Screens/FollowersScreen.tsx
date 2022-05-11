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
  SafeAreaView,
  FlatList,
} from "react-native";
import FollowingComponent from "../Components/FollowingComponent";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

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
import UserContext from "../Context/UserContext";
import {
  GetFollowersByUserId,
  GetUserById,
  GetFollowingByUserId,
} from "../Services/DataService";

const FollowerItem = ({
  handleUnfollow,
  username,
  id,
  displayFollowing,
  image
}: any) => {
  return (
    <View>
      <View style={styles.NotificationView}>
        {
          image === null ? <Ionicons name="person-circle-sharp" size={75} style={styles.ImageStyle} color="white" />
          : <Image source={{uri: image}} style={styles.ImageStyle} />
        }
        
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.TextStyle}>{username} </Text>
        </View>
      </View>
    </View>
  );
};

const FollowersScreen: FC = () => {
  const { userItems, viewUserProfile, followersBool } =
    useContext<any>(UserContext);
  const [displayFollowers, setDisplayFollowers] = useState<any>([]);

  useEffect(() => {
    getFollowers();
  }, []);

  const getFollowers = async () => {
    if (followersBool) {
      let followersArr: any[] = [];
      let followers = await GetFollowersByUserId(userItems.id);
      //console.log(followers);
      followers.map(async (person: any) => {
        let follower: object = await GetUserById(person.userId);
        followersArr.push(follower);
        //console.log(follower);
      });

      setTimeout(() => {
        setDisplayFollowers(followersArr);
      }, 1000);
    } else {
      let followersArr: any[] = [];
      let followers = await GetFollowersByUserId(viewUserProfile.id);
      //console.log(followers);
      followers.map(async (person: any) => {
        let follower: object = await GetUserById(person.userId);
        followersArr.push(follower);
        //console.log(follower);
      });

      setTimeout(() => {
        setDisplayFollowers(followersArr);
      }, 1000);
    }
  };

  const renderItem = ({ item }: any) => {
    return (
      <FollowerItem
        id={item.id}
        firstName={item.firstName}
        username={item.username}
        image={item.image}
        displayFollowers={displayFollowers}
      />
    );
  };

  const [input, setInput] = useState("");

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

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  let searchData = displayFollowers.filter((item: any) => {
    return item.username.toLowerCase().includes(input.toLowerCase());
  });

  return (
    <>
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
                onChangeText={setInput}
                onSubmitEditing={() => {
                  // alert(`Your message is: ${input}`);
                  // setInput("");
                }}
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

          <Text style={styles.FollowingText}>Followers</Text>

          <SafeAreaView style={styles.containerFlat}>
            <FlatList
              data={searchData}
              renderItem={renderItem}
              keyExtractor={(item: any) => item.id}
            />
          </SafeAreaView>
        </ImageBackground>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  containerFlat: {
    flex: 1,
    marginBottom: 62,
  },

  card: {
    borderRadius: 8,
    elevation: 10,
    backgroundColor: "#fff",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 8,
    marginTop: 17,
  },
  cardContent: {
    marginHorizontal: 8,
    marginVertical: 8,
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
  FollowingText: {
    fontFamily: "Lato_400Regular",
    fontStyle: "normal",
    fontWeight: "800",
    color: "white",
    fontSize: 32,
    marginBottom: 5,
    marginLeft: 25,
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
  ImageStyle: {
    height: 70,
    width: 70,
    borderRadius: 50,
    marginRight: 15,
  },
  NotificationView: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    paddingTop: 5,
    paddingBottom: 34,
  },
  TextStyle: {
    color: "white",
    fontSize: 22,
    fontFamily: "Roboto_500Medium",
    fontWeight: "500",
  },
});

export default FollowersScreen;
