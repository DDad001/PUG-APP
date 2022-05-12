//-------------ALL FETCHES FOR USERCONTROLLER----------------- 

async function createAccount(createdUser:object){
    let res = await fetch('https://pugbackendwebapp.azurewebsites.net/User/AddUsers', {
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(createdUser)
    });
    if(!res.ok)
    {
        const message =`An Error has Occured ${res.status}`
        throw new Error(message)
    }
    let data = await res.json();
    return data;
}

async function LoginUser(userData:object){
   let res = await fetch('https://pugbackendwebapp.azurewebsites.net/User/login', {
       method:"POST",
       headers:{
           "Content-Type": "application/json"
       },
       body:JSON.stringify(userData)
     
   });
//    if(!res.ok)
//    {
//        const message =`An Error has Occured ${res.status}`
//        throw new Error(message)
//     }
    let data = await res.json();
    return data;
}

async function GetUserById(id:number){
    let res = await fetch(`https://pugbackendwebapp.azurewebsites.net/User/GetUserById/${id}`);
    let data = await res.json();
    return data;
}

async function GetUserByUsername(username:string){
    let res = await fetch(`https://pugbackendwebapp.azurewebsites.net/User/GetUserByUsername/${username}`);
    let data = res.json();
    return data;
}

async function UpdateUser(User:object){
   let res = await fetch('https://pugbackendwebapp.azurewebsites.net/User/UpdateUser', {
       method:"POST",
       headers:{
           "Content-Type": "application/json"
       },
       body:JSON.stringify(User)
   });
   if(!res.ok)
   {
       const message =`An Error has Occured ${res.status}`
       throw new Error(message)
    }
    let data = await res.json();
    console.log(data);
    return data;
}

async function UpdateUsername(id:number, username:string){
   let res = await fetch(`https://pugbackendwebapp.azurewebsites.net/User/UpdateUser/${id}/${username}`, {
       method:"POST",
       headers:{
           "Content-Type": "application/json"
       },
       body:JSON.stringify(username)
   });
   if(!res.ok)
   {
       const message =`An Error has Occured ${res.status}`
       throw new Error(message)
    }
    let data = await res.json();
    console.log(data);
    return data;
}

async function DeleteUser(userToDelete:string) {

    let res = await fetch(`https://pugbackendwebapp.azurewebsites.net/User/DeleteUser/${userToDelete}`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(userToDelete)
    });
    if(!res.ok)
    {
        const message = `An error has occured ${res.status}`;
        throw new Error(message);
    }
    let data = await res.json();
    console.log(data);
    return data;

}

async function UpdatePassword(id: number, password: string){
    let res = await fetch(`https://pugbackendwebapp.azurewebsites.net/User/UpdatePassword/${id}/${password}`, {
       method:"POST",
       headers:{
           "Content-Type": "application/json"
       },
       body:JSON.stringify(password)
   });
   if(!res.ok)
   {
       const message =`An Error has Occured ${res.status}`
       throw new Error(message)
    }
    let data = await res.json();
    console.log(data);
    return data;
}

//-------------ALL FETCHES FOR USER CONTROLLER----------------- 





//---------------ALL FETCHES FOR EVENT CONTROLLER-----------------

async function AddEventItem(newEventItem:object){
    let res = await fetch('https://pugbackendwebapp.azurewebsites.net/Event/AddEventItem', {
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(newEventItem)
    });
    if(!res.ok)
    {
        const message =`An Error has Occured ${res.status}`
        throw new Error(message)
    }
    let data = await res.json();
    console.log(data)
}

async function GetEventItems(){
    let res = await fetch(`https://pugbackendwebapp.azurewebsites.net/Event/GetEventItems`);
    let data = await res.json();
    return data;
}

async function GetItemsByUserId(UserID:number){
    let res = await fetch(`https://pugbackendwebapp.azurewebsites.net/Event/GetItemsByUserId/${UserID}`);
    let data = res.json();
    return data;
}

async function GetItemsBySport(Sport:string){
    let res = await fetch(`https://pugbackendwebapp.azurewebsites.net/Event/GetItemsBySport/${Sport}`);
    let data = res.json();
    return data;
}

async function GetEventItemById(eventID:number){
    let res = await fetch(`https://pugbackendwebapp.azurewebsites.net/Event/GetEventItemById/${eventID}`);
    let data = res.json();
    return data;
}

async function UpdateEventItem(EventUpdate:object){
   let res = await fetch('https://pugbackendwebapp.azurewebsites.net/Event/UpdateEventItem', {
       method:"POST",
       headers:{
           "Content-Type": "application/json"
       },
       body:JSON.stringify(EventUpdate)
   });
   if(!res.ok)
   {
       const message =`An Error has Occured ${res.status}`
       throw new Error(message)
    }
    let data = await res.json();
    console.log(data);
    return data;
}

async function DeleteEventItem(id:number) {

    let res = await fetch(`https://pugbackendwebapp.azurewebsites.net/Event/DeleteEventItem/${id}`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(id)
    });
    if(!res.ok)
    {
        const message = `An error has occured ${res.status}`;
        throw new Error(message);
    }
    let data = await res.json();
    console.log(data);
    return data;

}

//---------------ALL FETCHES FOR EVENT CONTROLLER-----------------


//---------------FETCH FOR ADD EVENT ADDRESS VALIDATION-----------------
async function GetAddress(address:string){
    //1798+Diablo+Creek+Drive
    let res = await fetch(`https://nominatim.openstreetmap.org/?addressdetails=1&q=${address}&format=json&limit=1`);
    let data = res.json();
    return data;
}

async function GetCitiesByState(state:string) {
    var headers = new Headers();
    headers.append("X-CSCAPI-KEY", "dHEycHl0SEE5NHRHR3I5RktwTkZYYTBITldndzA0akJtRm9qVEo0Zg==");
    
    var requestOptions = {
     method: 'GET',
     headers: headers,
    };
    // fetch(`https://api.countrystatecity.in/v1/countries/us/states/${state}/cities`, requestOptions)
    // .then(response => response.text())
    // .then(result => console.log(result))
    // .catch(error => console.log('error', error));

    let res = await fetch(`https://api.countrystatecity.in/v1/countries/us/states/${state}/cities`, requestOptions)
    let data = res.json();
    return data;

}


//get cities by state
//---------------FETCH FOR ADD EVENT ADDRESS VALIDATION-----------------




//---------------ALL FETCHES FOR FOLLOWERS CONTROLLER-----------------

async function AddFollower(newFollower:object){
    let res = await fetch('https://pugbackendwebapp.azurewebsites.net/Followers/AddFollower', {
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(newFollower)
    });
    if(!res.ok)
    {
        const message =`An Error has Occured ${res.status}`
        throw new Error(message)
    }
    let data = await res.json();
    console.log(data)
}

async function GetFollowersByUserId(userId:number){
    let res = await fetch(`https://pugbackendwebapp.azurewebsites.net/Followers/GetFollowersByUserId/${userId}`);
    let data = await res.json();
    // console.log(data)
    return data;
}

async function GetFollowId(userId:number,followerId:number){
    let res = await fetch(`https://pugbackendwebapp.azurewebsites.net/Followers/GetFollowId/${userId}/${followerId}`);
    let data = res.json();
    return data;
}

async function GetFollowingByUserId(userId:number){
    let res = await fetch(`https://pugbackendwebapp.azurewebsites.net/Followers/GetFollowingByUserId/${userId}`);
    let data = res.json();
    // console.log(data);
    return data;
}

async function DeleteFollower(userId:number, followerId:number) {

    let res = await fetch(`https://pugbackendwebapp.azurewebsites.net/Followers/DeleteFollower/${userId}/${followerId}`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(userId)
    });
    if(!res.ok)
    {
        const message = `An error has occured ${res.status}`;
        throw new Error(message);
    }
    let data = await res.json();
    console.log(data);
    return data;

}

async function GetIsFollowed(userId:number, followerId:number){
    let res = await fetch(`https://pugbackendwebapp.azurewebsites.net/Followers/GetIsFollowed/${userId}/${followerId}`);
    let data = await res.json();
    //console.log(data);
    return data;
}
//---------------ALL FETCHES FOR FOLLOWERS CONTROLLER-----------------


//---------------ALL FETCHES FOR LIKED EVENTS CONTROLLER-----------------


async function AddLikedEvent(newLikedEvent:object){
    let res = await fetch('https://pugbackendwebapp.azurewebsites.net/LikedEvents/AddLikedEvent', {
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(newLikedEvent)
    });
    if(!res.ok)
    {
        const message =`An Error has Occured ${res.status}`
        throw new Error(message)
    }
    let data = await res.json();
    console.log(data)
}

async function GetLikedEventsByUserId(userId:number){
    let res = await fetch(`https://pugbackendwebapp.azurewebsites.net/LikedEvents/GetLikedEventsByUserId/${userId}`);
    let data = await res.json();
    return data;
}

async function GetLikedId(userId:number, eventId:number){
    let res = await fetch(`https://pugbackendwebapp.azurewebsites.net/LikedEvents/GetLikedId/${userId}/${eventId}`);
    let data = await res.json();
    console.log(data);
    return data;
}

async function DeleteLikedEvent(userId:number, eventId:number) {

    let res = await fetch(`https://pugbackendwebapp.azurewebsites.net/LikedEvents/DeleteLikedEvent/${userId}/${eventId}`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(userId)
    });
    if(!res.ok)
    {
        const message = `An error has occured ${res.status}`;
        throw new Error(message);
    }
    let data = await res.json();
    console.log(data);
    return data;

}

async function GetIsLiked(userId:number, eventId:number){
    let res = await fetch(`https://pugbackendwebapp.azurewebsites.net/LikedEvents/GetIsLiked/${userId}/${eventId}`);
    let data = await res.json();
    //console.log(data);
    return data;
}


//---------------ALL FETCHES FOR LIKED EVENTS CONTROLLER-----------------



//---------------ALL FETCHES FOR REPORTING-------------------------------

async function ReportEvent(eventToReport:object) {

    let res = await fetch(`https://pugbackendwebapp.azurewebsites.net/ReportEvent/AddEventReport`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(eventToReport)
    });
    if(!res.ok)
    {
        const message = `An error has occured ${res.status}`;
        throw new Error(message);
    }
    let data = await res.json();
    console.log(data);
    return data;

}

async function ReportUser(userToReport:object) {

    let res = await fetch(`https://pugbackendwebapp.azurewebsites.net/ReportUser/AddUserReport`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(userToReport)
    });
    if(!res.ok)
    {
        const message = `An error has occured ${res.status}`;
        throw new Error(message);
    }
    let data = await res.json();
    console.log(data);
    return data;

}


//---------------ALL FETCHES FOR REPORTING-------------------------------


//-------------------------Fetch For Notification----------------------------------

const triggerNotificationHandler = async (userItems:any, viewUserProfile:any) => {
    fetch("https://exp.host/--/api/v2/push/send/", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Accept-Encoding": "gzip, deflate",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
                    to: `${viewUserProfile.notificationToken}`,
                    sound: "default",
                    data: { extraData: "Some data in the push notification" },
                    title: "PUG",
                    body: `${userItems.firstName} ${userItems.lastName} Liked Your Event`,
                  }),
                });
};

const triggerNotificationFollowingHandler = async (userItems:any, viewUserProfile:any) => {
    fetch("https://exp.host/--/api/v2/push/send/", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Accept-Encoding": "gzip, deflate",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
                    to: `${viewUserProfile.notificationToken}`,
                    sound: "default",
                    data: { extraData: "Some data in the push notification" },
                    title: "PUG",
                    body: `${userItems.firstName} ${userItems.lastName} Followed You`,
                  }),
                });
};
//-------------------------Fetch For Notification----------------------------------



export{ 

    createAccount,LoginUser,GetUserById,GetUserByUsername,UpdateUser,
    UpdateUsername,DeleteUser,AddEventItem,GetEventItems,GetItemsByUserId,
    GetItemsBySport,GetEventItemById,UpdateEventItem,DeleteEventItem,
    AddFollower,GetFollowersByUserId,GetFollowId,GetFollowingByUserId,
    DeleteFollower,AddLikedEvent,GetLikedEventsByUserId,GetLikedId,
    DeleteLikedEvent,GetAddress,UpdatePassword,GetCitiesByState,
    ReportEvent,ReportUser, GetIsLiked, GetIsFollowed, triggerNotificationHandler, triggerNotificationFollowingHandler

}