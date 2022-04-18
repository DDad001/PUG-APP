import { FC } from "react"
import { ImageBackground, StyleSheet, Text, View } from "react-native"
import GradientBackground from '../assets/GradientBackground.png';


const FAQScreen: FC = () => {
    return (
        <>
      <View style={styles.container}>
          <ImageBackground source={GradientBackground} resizeMode="cover" style={{ height: "100%", width: "100%"}}>
             <Text>FAQ</Text>
          </ImageBackground>
      </View>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
})

export default FAQScreen;