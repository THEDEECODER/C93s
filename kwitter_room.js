const firebaseConfig = {
    apiKey: "AIzaSyD21bp1h-zftrac0rcUT__qtHMqVZP2I-M",
    authDomain: "kwittwer-1495e.firebaseapp.com",
    databaseURL: "https://kwittwer-1495e-default-rtdb.firebaseio.com",
    projectId: "kwittwer-1495e",
    storageBucket: "kwittwer-1495e.appspot.com",
    messagingSenderId: "277418564759",
    appId: "1:277418564759:web:6686895c48b428950c9dd2",
  };
  firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("username");
document.getElementById("welcome").innerHTML = "welcome "+user_name+" !";

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
      Room_names = childKey;
      //Start code
      console.log(Room_names);
      row ="<div class='room_name' id="+Room_names+" onclick= 'redirecttoroomname(this.id)'>#"+Room_names+"</div><hr>"
      document.getElementById("output").innerHTML += row;

      //End code
      });});}
getData();
function addroom(){
      room_name = document.getElementById("roomname").value;
            firebase.database().ref("/").child(room_name).update({
            purpose: "addingRoomName"
      });
      localStorage.setItem("room_name", room_name);
      window.location = "kwitter_page.html";
}

function redirecttoroomname(name){
console.log(name);
localStorage.setItem("room_name", name);
window.location = "kwitter_page.html";
}
function Logout(){
window.location = "index.html";
localStorage.removeItem("username");
}
