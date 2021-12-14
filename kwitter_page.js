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
room_name = localStorage.getItem("room_name");

console.log(user_name);
console.log(room_name);

function send(){
      inp = document.getElementById("inputs").value;
      firebase.database().ref(room_name).push({
            name : user_name,
            message : inp,
            like : 0
      });
      document.getElementById("inputs").innerHTML = "";
}

function logout(){
      localStorage.removeItem("username");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
      firebase_message_id = childKey;
      message_data = childData;
      console.log(message_data);
      console.log(firebase_message_id);
      names = message_data['name'];
      like = message_data['like'];
      message = message_data['message'];
      namewithtag = "<h4>"+names+"<img src='tick.png' class='user_tick'></h4>";
      messages = "<h4 class='message_h4'>"+ message+"</h4>";
      buttonlikes = "<button class='btn btn-warning' id="+firebase_message_id+"value="+like+" onclick='updatelikes(this.id)'>";
      spanwith = "<span class='glyphicon glyphicon-thumbs-up'>Likes :"+like+"</span></button><hr>";
      row = namewithtag+messages+buttonlikes+spanwith;
      document.getElementById("output").innerHTML += row;
   } });  }); }
getData();

function updatelikes(message_id){
      console.log("clicked on button"+ message_id);
      button_id = message_id;
      likes= document.getElementById(button_id).value;
      updatelike = Number(likes) + 1;
      console.log(updatelike);
      firebase.database().ref(room_name).child(message_id).update({
       like : updatelike
      
});
}