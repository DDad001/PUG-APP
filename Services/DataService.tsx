async function GetAllFriends(){
    let res = await fetch("http://localhost:5216/Friend/GetAllFriends");
    let data = await res.json();
    return data;
}
export{ GetAllFriends }