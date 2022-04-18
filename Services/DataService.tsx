let userData = {}
function checkToken() {
    let result = false
    let lsData = localStorage.getItem('Token');
    if(lsData && lsData != null)
    {
        result = true
    }
    return result;
}

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

async function login(loginUser:string){
   let res = await fetch('http://localhost:5216/User/login', {
       method:"POST",
       headers:{
           "Content-Type": "application/json"
       },
       body:JSON.stringify(loginUser)
     
   });
   if(!res.ok)
   {
       const message =`An Error has Occured ${res.status}`
       throw new Error(message)
   }
   let data = await res.json();
   return data;
}

export{ GetAllFriends, login, GetUserByUsername, checkToken }