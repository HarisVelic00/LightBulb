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
let dbPower = firebase.database().ref("power");
let dbBrightness = firebase.database().ref("brightness");
firebase.analytics();
let upaljeno;

dbPower.on('value', (data) => {
  upaljeno = data.val();
  let body = document.querySelector("body");
  if (upaljeno == true) {
    body.classList.remove("off");
    body.classList.add("on");
    document.getElementById("brightnessRange").disabled = false;
  }
  if (upaljeno == false) {
    body.classList.remove("on");
    body.classList.add("off");
    document.getElementById("brightnessRange").disabled = true;
  }
})

function upaliSvjetlo() {
  let btn = document.querySelector(".btn");
  let body = document.querySelector("body");
  body.classList.toggle("on");
  let audio = document.querySelector("#audio");
  audio.play();
  upaljeno = !upaljeno;
  dbPower.set(upaljeno);
}

dbBrightness.on('value', (data) => {
  const input = document.getElementById("brightnessRange");
  input.value = data.val();
})

function promjeniSvjetlinu(value) {
  var val = value.value;
  let parsedValue = parseInt(val);
  dbBrightness.set(parsedValue);
}

//Random Broj
let dbBroj = firebase.database().ref("broj");
function randomBroj() {
  var broj = Math.floor(Math.random() * 100);
  dbBroj.set(broj);
}

//Random String
let dbString = firebase.database().ref("string");
function randomString() {
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  var lenString = 7;
  var randomstring = '';

  for (var i = 0; i < lenString; i++) {
    var rnum = Math.floor(Math.random() * characters.length);
    randomstring += characters.substring(rnum, rnum + 1);
  }

  dbString.set(randomstring);
}

//Input String
let dbInput = firebase.database().ref("input");
function sendInput() {
  var input = document.getElementById("inputField").value;
  dbInput.set(input);
}