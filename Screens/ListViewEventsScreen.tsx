import { FC } from "react"
import { ImageBackground, StyleSheet, Text, View } from "react-native"
import SoccerBall from '../assets/SoccerBall.png';
// import NotificationsBell from "../Components/NotificationsBell";
import PUGbutton from "../Components/PUGButton";
import FooterComponent from "../Components/FooterComponent";
import CardListComponent from "../Components/CardListComponent";
import PUGHeader from "../Components/PUGHeader";

const ListViewEventsScreen: FC = () => {
    return (
        <>
      <View style={styles.container}>
          <ImageBackground source={SoccerBall} resizeMode="cover" style={{ height: "100%", width: "100%", backgroundColor: "#0A326D" }}>
              <PUGHeader/>
              <CardListComponent/>
          </ImageBackground>
      </View>
      <FooterComponent/>
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
    customMargin:{
        marginTop:10
    },
    stretch: {
        width: 100,
        height: 100,
        resizeMode:'stretch'
      },
})

export default ListViewEventsScreen;