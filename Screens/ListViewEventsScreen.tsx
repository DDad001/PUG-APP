import { TabRouter, useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC } from "react"
import { ImageBackground, StyleSheet, Text, View } from "react-native"
import SoccerBall from '../assets/SoccerBall.png';
import CardListComponent from "../Components/CardListComponent";
import PUGHeader from "../Components/PUGHeader";


type RootStackParamList ={
    Nav: undefined,
    event:{name: string},
    schedule:undefined,
    cardList:{name:string},
    GoToEvent:undefined,
    profile:{name:string} 
  }

//   interface ProfileCardProps{ 
//     navigation: string; 
//     route: string; 
//     name:string, 
//     myName:string
//   }
type Props = NativeStackScreenProps<RootStackParamList, "GoToEvent">;

const ListViewEventsScreen: FC<Props> = ({navigation, route}) => {
    //    const navigation = useNavigation();

    return (
        <>
      <View style={styles.container}>
          <ImageBackground source={SoccerBall} resizeMode="cover" style={{ height: "100%", width: "100%", backgroundColor: "#0A326D" }}>
              <PUGHeader/>
              <CardListComponent onEventDisplayPress={() =>  navigation.navigate('event', {name: 'danial'})} onProfilePress={() => navigation.navigate('profile', {name: 'danial'})}/>
          </ImageBackground>
      </View>
        </>
    //   ic:baseline-notifications
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: "100%",
        height: "100%",
    },
})

export default ListViewEventsScreen;