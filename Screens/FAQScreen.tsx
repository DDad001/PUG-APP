import { FC, useState } from "react";
import { ScrollView, theme } from "native-base";
import { color } from "native-base/lib/typescript/theme/styled-system";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { Container, Accordion } from "native-base";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { List } from "react-native-paper";
import GradientBackground from '../assets/GradientBackground.png';


const FAQScreen: FC = () => {

    const [expanded, setExpanded] = useState<boolean>(false);

    const handlePress = () => {
        setExpanded(!expanded);
    }

    return (
        <>
      <View style={styles.container}>
          <ImageBackground source={GradientBackground} resizeMode="cover" style={{ height: "100%", width: "100%"}}>
             <ScrollView style={{flex: 1}}>
                 <View style={{flex: 0.1, alignItems: "center",justifyContent: "center", marginBottom: 10, marginTop: 15}}>
                    <Text style={{color: "white", fontWeight: "bold", fontSize: 25}}>Frequently Asked Questions (FAQ)</Text>
                 </View>
                <List.Section title="" style={{width: "100%"}}>
                    <List.Accordion
                        style={{backgroundColor: "white"}}
                        titleStyle={{color: "#0A326D", fontSize: 18}}
                        title="Adding an Event"
                        left={props => <MaterialCommunityIcons name="text-box-plus" size={30} color="#0A326D" style={{paddingLeft: 10,marginRight: 15}}/>}>
                            <List.Item style={{ backgroundColor: "white", width: "100%", maxHeight: "100%" }}  title=""                            
                            left={props => <List.Item style={{ backgroundColor: "white", width: "100%", maxHeight: "100%" }} titleStyle={{color: "#0A326D", fontSize: 18}} titleNumberOfLines={3} title="Adding an Event"
                            descriptionNumberOfLines={4} descriptionStyle={{color: "#0A326D", fontSize: 15, lineHeight: 20}}
                            description="Navigate to the add event screen indicated by the ''+'' symbol. Then fill out the form regarding your event's information including: sport, title, date, time, address, event details, state, and city."/>}/>
                    </List.Accordion>
                    <List.Accordion
                        style={{backgroundColor: "white"}}
                        titleStyle={{color: "#0A326D", fontSize: 18}}
                        title="Finding Sport Events"
                        left={props => <Ionicons name="ios-search" size={30} color="#0A326D" style={{paddingLeft: 10,marginRight: 15}}/>}>
                            <List.Item style={{ backgroundColor: "white", width: "100%", maxHeight: "100%" }}  title=""                            
                            left={props => <List.Item style={{ backgroundColor: "white", width: "100%", maxHeight: "100%" }} titleStyle={{color: "#0A326D", fontSize: 18}} titleNumberOfLines={2} title="Finding Sport Events"
                            descriptionNumberOfLines={6} descriptionStyle={{color: "#0A326D", fontSize: 15, lineHeight: 20}}
                            description="In the search bar of the sport events screen you can specify a city to find events held in that city. You can also choose a specific sport and time frame to make your searches concise."/>}/>
                    </List.Accordion>
                </List.Section>
             </ScrollView>
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