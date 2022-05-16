import { useContext, useState } from "react";
import { Image, Pressable, Text, View, Button } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { UpdateUser, GetUserById } from "../Services/DataService";
import UserContext from "../Context/UserContext";

const ImageHandler = () => {

    const { userItems, updateProfileScreen, setUpdateProfileScreen, setUserItems, setUpdateScreen } = useContext(UserContext);
    const [pickedImagePath, setPickedImagePath] = useState(userItems.image);
    const [isNewImage, setIsNewImage] = useState(false);
    const saveImage = async () =>{
        //we are going to start off by getting the file type using a split.
        let fileType = pickedImagePath.split(".")[1];
        //using FormData to be able to send out data over to the api correctly.
        let formData = new FormData();
        //Getting the file name using a regex (regular expression)
        let fileName = pickedImagePath.replace(/^.*[\\\/]/, "");
        formData.append('photo', {uri:pickedImagePath, name:fileName, type:`image/${fileType}`})
        //formData.append('photo', {uri: pictureURL, name:fileName, type:`image/${fileType}`})
        let res = await fetch(`https://pugbackendwebapp.azurewebsites.net/Image/uploadImage`, {
          method:"POST",
          headers: {
            'Accept':'application/json'
          },
          body:formData
        })
        let photoUrl = await res.json();
        console.log(photoUrl.path);
        let userData = {
            Id: userItems.id,
            FirstName: userItems.firstName,
            LastName: userItems.lastName,
            Username: userItems.username,
            Salt: userItems.salt,
            Hash: userItems.hash,
            DateOfBirth:userItems.dateOfBirth,
            City:userItems.city,
            State:userItems.state,
            isTermsAccepted:userItems.isTermsAccepted,
            isEighteen:userItems.isEighteen,
            Image:photoUrl.path,
            IsDeleted:false
          };
          console.log("test")
          console.log(userData)
          let updateUserImage = await UpdateUser(userData);
          console.log(updateUserImage);
          setUpdateScreen(true);
          let updatedUser = await GetUserById(userItems.id);
          setUserItems(updatedUser);
          setIsNewImage(false);
      }


  const showImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();
    console.log(result);
    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
      setIsNewImage(true);
    }
  }

    return (
        <>
           <View style={{alignItems:'center'}}>
            <Pressable onPress={() => console.log('Change Photo')}>
                   <View style={{marginTop:20,flexDirection:'row'}}>
                <Pressable onPress={showImagePicker}>
              <View style={{backgroundColor:'#7E90AB', height:100, width:100, borderRadius:50, marginTop: 8}}>
                {
                  pickedImagePath !== null ? <Image
                  source={{ uri: pickedImagePath }}
                  style={{ height: 100, width: 100, borderRadius: 50,}}
                  />
                  :
                  <View>
                  <MaterialCommunityIcons name="image-plus" size={40} color="white" style={{marginLeft:30, marginTop:30}}/>
                  </View>
                }
                {/* <Button title="Save Image" onPress={saveImage}></Button>  */}
              </View>
                {
                    pickedImagePath !== null && isNewImage ?  
                    <Pressable onPress={saveImage} accessibilityLabel="Save image selected to be profile photo.">
                      <View style={{alignItems: "center"}}>
                       <Text style={{color:'white',fontSize:15, fontFamily: "Lato_900Black", marginTop:10, marginBottom: 10}}>Save Image</Text> 
                      </View>
                    </Pressable>
                    : null
                }
                </Pressable>
              </View>

            </Pressable>
            <Pressable onPress={showImagePicker}>
                <Text style={{color:'white', fontSize:15, fontFamily: "Lato_900Black",textDecorationLine:'underline', marginTop:5 }}>{ pickedImagePath == '' ? "Upload Profile Photo" : "Change Profile Photo"}</Text>
            </Pressable>
          </View>
        </>
    )
}
export { ImageHandler }

