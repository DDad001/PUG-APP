import { FC, useState } from "react";
import { theme } from "native-base";
import { color } from "native-base/lib/typescript/theme/styled-system";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { Container, Accordion } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { List } from "react-native-paper";
import GradientBackground from '../assets/GradientBackground.png';


const FAQScreen: FC = () => {

    const [expanded, setExpanded] = useState<boolean>(false);

    const handlePress = () => {
        setExpanded(!expanded);
    }
    const dataArray = [
        { title: "First Element", content: "Lorem ipsum dolor sit amet" },
        { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
        { title: "Third Element", content: "Lorem ipsum dolor sit amet" }
      ];

    return (
        <>
      <View style={styles.container}>
          <ImageBackground source={GradientBackground} resizeMode="cover" style={{ height: "100%", width: "100%"}}>
             <Text style={{color:'white',fontSize:20}}>FAQ</Text>
             <View style={{flex: 1,}}>
                <List.Section title="" style={{width: "100%"}}>
                    <List.Accordion
                        style={{backgroundColor: "white"}}
                        titleStyle={{color: "#0A326D", fontSize: 18}}
                        title="Creating an Event"
                        left={props => <MaterialCommunityIcons name="help-box" size={30} color="#0A326D" style={{paddingLeft: 10,marginRight: 15}} />}>
                            <List.Item style={{ backgroundColor: "white", width: "100%", maxHeight: "100%" }}  title=""                            
                            left={props => <List.Item style={{  backgroundColor: "white", width: "100%", maxHeight: "100%" }} titleStyle={{color: "#0A326D", fontSize: 18}} titleNumberOfLines={2} title="First item"
                            descriptionNumberOfLines={3} descriptionStyle={{color: "#0A326D", fontSize: 15}}
                            description="ajsld;kfja;lsd fjkldasjfasdl;kfj jalksdjfal;ksfj sjklad;fjals;fdk "/>}/>
                    </List.Accordion>
                </List.Section>
             </View>
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