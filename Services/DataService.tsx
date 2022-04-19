import AsyncStorage from '@react-native-async-storage/async-storage';

// function checkToken() {
//     let result = false
//     let lsData = AsyncStorage.getItem('Token');
//     if(lsData && lsData != null)
//     {
//         result = true
//     }
//     return result;
// }

async function GetAllFriends(){
    let res = await fetch("http://localhost:5216/Friend/GetAllFriends");
    let data = await res.json();
    return data;
}

async function GetUserByUsername(username:string){
    let res = await fetch(`http://localhost:5216/User/GetUserByUsername/${username}`);
    let data = await res.json();
    return data;
}

async function LoginUser(userData:object){
   let res = await fetch('http://localhost:5216/User/login', {
       method:"POST",
       headers:{
           "Content-Type": "application/json"
       },
       body:JSON.stringify(userData)
     
   });
   if(!res.ok)
   {
       const message =`An Error has Occured ${res.status}`
       throw new Error(message)
   }
   let data = await res.json();
   return data;
}

export{ GetAllFriends, LoginUser, GetUserByUsername }