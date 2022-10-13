const firebaseConfig = {
  apiKey: "AIzaSyDY-hPWJYIxBwqDTTnp4ZLWw1SHekT2zRc",
  authDomain: "iot-seminarskirad.firebaseapp.com",
  databaseURL: "https://iot-seminarskirad-default-rtdb.firebaseio.com",
  projectId: "iot-seminarskirad",
  storageBucket: "iot-seminarskirad.appspot.com",
  messagingSenderId: "331468493886",
  appId: "1:331468493886:web:2d2c4f75c25e94f20b2d6f",
  measurementId: "G-85NCHH3M9Q",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
let dbBrightness = firebase.database().ref("brightness");
let dbPower = firebase.database().ref("power");

dbPower.on("value", (data) => {
  let body = document.querySelector("body");
  if (data.val() == true) {
    body.classList.remove("off");
    body.classList.add("on");
    dbBrightness.on("value", (svjetlina) => {
      var bulb = document.getElementById("bulb");
      var val = svjetlina.val();
      if (val < 10) {
        body.classList.remove("on");
        body.classList.add("off");
      }
      if (val > 10) {
        bulb.setAttribute("style", "filter: brightness(" + val + "%);");
        body.classList.remove("off");
        body.classList.add("on");
      }
    });
  }
  if (data.val() == false) {
    body.classList.remove("on");
    body.classList.add("off");
  }
});

//Random Broj
let dbBroj = firebase.database().ref("broj");
dbBroj.on("value", data => {
  document.getElementById("displayBroj").innerText = data.val();
})

//Random String
let dbString = firebase.database().ref("string");
dbString.on("value", data => {
  document.getElementById("displayString").innerText = data.val();
})

//Input String
let dbInput = firebase.database().ref("input");
dbInput.on("value", data => {
  document.getElementById("inputText").innerText = data.val();
})