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
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

import UserContext from "../Context/UserContext";
import {
  DeleteFollower,
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
import { FlatList } from "native-base";

const FollowerItem = ({

  username,
  id,
  image,
  getFollowing
}: any) => {
  const { followingBool, userItems, setUpdateProfileScreen } = useContext<any>(UserContext);

  const [disableBtn, setDisableBtn] = useState(false);
  const [changeBtnColor, setChangeBtnColor] = useState("#0A326D");

  const handleUnfollow = async (unfollowId: number) => {
    setDisableBtn(true);
    setChangeBtnColor("gray");
    await DeleteFollower(userItems.id, unfollowId);


    getFollowing();

    setUpdateProfileScreen(true);
  };


  return (
    <View>
      <View style={styles.NotificationView}>
        {
          image === null ? <Ionicons name="person-circle-sharp" size={75} style={styles.ImageStyle} color="white" />
            : <Image source={{ uri: image }} style={styles.ImageStyle} />
        }
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ width: 150, alignItems: "center" }}>
            <Text style={styles.TextStyle}>{username}</Text>
          </View>

          {followingBool ? (
            <Pressable
              style={{ backgroundColor: changeBtnColor, borderRadius: 10, marginLeft: 15, }}
              onPress={() => handleUnfollow(id)}
              accessibilityLabel="Followers Button"
              disabled={disableBtn}
            >
              <Text style={styles.unfollowTxt}>Unfollow</Text>
            </Pressable>
          ) : null}
        </View>
      </View>
    </View>
  );
};

const FollowingScreen: FC = () => {
  const { userItems, setUpdateProfileScreen, viewUserProfile, followingBool } =
    useContext<any>(UserContext);
  const [displayFollowing, setDisplayFollowing] = useState<any>([]);


  useEffect(() => {
    getFollowing();
  }, []);

  const getFollowing = async () => {
    if (followingBool) {
      let followingArr: any[] = [];
      let following = await GetFollowingByUserId(userItems.id);
      await following.map(async (person: any) => {
        let follower = await GetUserById(person.followerId);
        followingArr.push(follower);
      });

      setTimeout(() => {
        setDisplayFollowing(followingArr);
      }, 500);
    } else {
      let followingArr: any[] = [];
      let following = await GetFollowingByUserId(viewUserProfile.id);
      await following.map(async (person: any) => {
        let follower = await GetUserById(person.followerId);
        followingArr.push(follower);
      });

      setTimeout(() => {
        setDisplayFollowing(followingArr);
      }, 500);
    }
  };



  const renderItem = ({ item }: any) => {
    return (
      <FollowerItem
        id={item.id}
        firstName={item.firstName}
        username={item.username}
        image={item.image}
        displayFollowing={displayFollowing}

        getFollowing={getFollowing}
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

  let searchData = displayFollowing.filter((item: any) => {
    return item.username.toLowerCase().includes(input.toLowerCase());
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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

          <Text style={styles.FollowingText}>Following</Text>

          <SafeAreaView style={styles.containerFlat}>
            <FlatList
              data={searchData}
              renderItem={renderItem}
              keyExtractor={(item: any) => item.id}
            />
          </SafeAreaView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
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
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
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
    flexDirection: "row",
    paddingTop: 5,
    paddingBottom: 34,
    paddingLeft: 25
  },
  TextStyle: {
    color: "white",
    fontSize: 19,
    fontFamily: "Roboto_500Medium",
    fontWeight: "500",
  },
});

export default FollowingScreen;
