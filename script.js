
var itunesData = "https://itunes.apple.com/search?term=jack+johnson&country=US";
var data = [];

window.onload = function () {
	initialize();
	fetchData();
};

function fetchData() {
  $.ajax({
    url: itunesData,
    jsonp : "callback",
    dataType : "jsonp",
    success : onSuccess
  });
}

function onSuccess(json) {
  data = json.results;
}

function initialize (){
	document.getElementById("btn").addEventListener("click", createQuestion);
	document.addEventListener("keypress", checkWinner);
}


function checkWinner (event) {
	
	if (event.keyCode == "115") {
		document.getElementById("buzzerX").setAttribute("style", "background-color: white");
		alert("Player 1");
		document.removeEventListener("keypress", checkWinner);
		currentPlayer = "X";
	}
	else if (event.keyCode == "108") {
		document.getElementById("buzzerO").setAttribute("style", "background-color: white");
		alert("Player 2");
		document.removeEventListener("keypress", checkWinner);
		currentPlayer = "Y";
	}
	else {
		document.removeEventListener("keypress", checkWinner);	
		document.addEventListener("keypress", checkWinner);
	}
}

var randoms = [];
var randomInd;

function createQuestion (event) {

	randomInd = Math.floor(Math.random()*4);
	randoms = createRandoms(data);
	
	var song = document.getElementById("song");
	song.setAttribute("src", data[randoms[randomInd]].previewUrl);

	for(var i=0; i<randoms.length; i++) {
		addButton("radio", "question", data[randoms[i]].trackName, "opt"+(i+1));
	}
	addButton("submit", "submit", "", "submitButton"); 
 
	document.getElementById("btn").removeEventListener("click", createQuestion);	
	document.getElementById("submitButton").addEventListener("click", verifyAnswer);
}

function createRandoms (data) {
	var arr = [];
	while(arr.length < 4){
	  var random = Math.ceil(Math.random()*data.length);
	  var found = false;
	  for(var i=0; i < arr.length; i++){	
		if(arr[i] == random){
			found = true;
			break;
		}
	  }
	  if (!found) {
	  	arr[arr.length] = random;
	  }
	}
	arr.sort(function (a, b) {
		return a - b;
	});
	return arr;
}


function addButton(type, name, text, id) {
    var label = document.createElement("label");
    var element = document.createElement("input");
    element.setAttribute("type", type);
    element.setAttribute("value", text);
    element.setAttribute("name", name);
    element.setAttribute("id", id);

    label.appendChild(element);
    label.innerHTML += text;

    var radio1 = document.getElementById("form");
    radio1.appendChild(label);
}

var currentPlayer;
var currentScoreX = 0;
var currentScoreY = 0;
var count = 0;

function verifyAnswer (event) {
	event.preventDefault();

	if (checkAnswer()) {
		asignWinner();
		nextQuestion();
	}
	else if (count === 0) {
		switchPlayer();
		count ++;
	}
	else {
		alert("Both players were wrong! The right answer was " + data[randoms[randomInd]].trackName);
		nextQuestion();
	}
}

function switchPlayer () {
	if (currentPlayer === "X") {
		alert("Wrong answer. Player 2 gets a chance to answer");
		currentPlayer = "Y";
		document.getElementById("submitButton").removeEventListener("click", verifyAnswer);
		document.getElementById("submitButton").addEventListener("click", verifyAnswer);			
	}
	else {
		alert("Wrong answer. Player 1 gets a chance to answer");
		currentPlayer = "X";
		document.getElementById("submitButton").removeEventListener("click", verifyAnswer);
		document.getElementById("submitButton").addEventListener("click", verifyAnswer);
	}
}

function asignWinner () {

	alert("right answer");
	var scoresX = document.getElementById("scoresX");

	var scoresY = document.getElementById("scoresY");


	if (currentPlayer === "X") {
		currentScoreX = currentScoreX + 100;
		scoresX.textContent = currentScoreX;
	}
	else {
		currentScoreY = currentScoreY + 100;
		scoresY.textContent = currentScoreY;	
	}
}

function checkAnswer() {
	var currentQuestion = data[randoms[randomInd]].trackName;
	var val = checkRadioButtons();
	if (val === currentQuestion) {
		return true;
	}
	else {
		return false;
	}
}

function checkRadioButtons () {
	var radios = document.getElementsByName("question");
	var val;
	for(var i = 0; i < radios.length; i++){
	    if(radios[i].checked){
	    val = radios[i].value;
		}
	}
	return val;
}


function nextQuestion () {
	document.getElementById("submitButton").removeEventListener("click", verifyAnswer);
	addButton("submit", "submit", "", "next");
	document.getElementById("next").addEventListener("click", clearBoard);
}

function clearBoard () {
	var form = document.getElementById("form");
	form.innerHTML = "<audio autoplay></audio>";
	document.querySelector("audio").setAttribute("id", "song");
	console.log(document.getElementById("form"));
	currentPlayer = "";
	count = 0;
	randoms = [];
	randomInd = 0;
	createQuestion();
	document.addEventListener("keypress", checkWinner);
}
 

