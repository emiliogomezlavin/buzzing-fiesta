

var data = [];
var alerts;

// On load, program sets the form for players to input their names and the name of the artist to play to
window.onload = function () {
	alerts = document.getElementById("alerts");
	getPlayersDetails();
};


// AJAX function to "GET" the json data from iTunes API
function fetchData(searchTerm) {
  var query = typeof searchTerm === "undefined" ? "jack+johnson" : searchTerm; //Jack Johnson is the default artist
  $.ajax({
    url: "https://itunes.apple.com/search?term=" + query + "&country=US",
    jsonp : "callback",
    dataType : "jsonp",
    success : onSuccess
  });
}

function onSuccess(json) {
  data = json.results;
}

// Function that gets the artist name from the input form and sends to the AJAX request for iTunes API
function getTermData (answer) {
	fetchData(answer);
}

var player1;
var player2;
var artistName;

// Form to get
function getPlayersDetails () {
	$("#startForm").on("submit", function(event){
    event.preventDefault(); 
    player1 = $("input#player1Input").val();
    player2 = $("input#player2Input").val();
    artistName = $("input#artistInput").val();
    
    // Adds the text of the name of the players input in form.
    document.getElementById("player1").innerHTML = player1 +"<p>Use the letter S</p>";
    document.getElementById("player2").innerHTML = player2 +"<p>Use the letter L</p>";

    getTermData(artistName);

    // Removes input form
    var startForm = document.getElementById("startForm");
	startForm.parentNode.removeChild(startForm);

	// Adds start button and message. Initializes game.
	createStartMessage();
	// createStartButton();
	initialize();
	});
}

// function createStartButton () {
// 	var button = document.createElement("button");
// 	button.setAttribute("class", "btn");
// 	button.setAttribute("class", "btn-danger");
// 	button.setAttribute("id", "btn");
// 	button.innerHTML = "PLAY";
// 	document.getElementById("board").appendChild(button);
// 	button.setAttribute("style", "width: 200px");
// 	button.setAttribute("style", "position: absolute");
// 	button.setAttribute("style", "left: 210px");
// 	button.setAttribute("style", "bottom: 30px");
// }

function createStartMessage () {
	var ready = document.createElement("h2");
	ready.innerHTML = "GET READY!!! </br> </br>CLICK ON THE START BUTTON!!";
	ready.setAttribute("id", "ready");
	document.getElementById("board").appendChild(ready);
}

function initialize (){
	document.getElementById("btn").addEventListener("click", createQuestion);
	document.addEventListener("keypress", checkWinner);
}


function checkWinner (event) {
		
	if (event.keyCode == "115") {
		document.getElementById("buzzerX").setAttribute("class", "animated wobble");
		setTimeOut("X");
		addPointer("X", "arrow-right");
		alerts.innerHTML = player1 + " buzzed first!";
		document.removeEventListener("keypress", checkWinner);
		currentPlayer = "X";
	}
	else if (event.keyCode == "108") {
		document.getElementById("buzzerY").setAttribute("class", "animated wobble");
		setTimeOut("Y");
		addPointer("Y", "arrow-left");
		alerts.innerHTML = player2 + " buzzed first!";
		document.removeEventListener("keypress", checkWinner);
		currentPlayer = "Y";
	}
	else {
		document.removeEventListener("keypress", checkWinner);	
		document.addEventListener("keypress", checkWinner);
	}
}

function setTimeOut (Z) {
	window.setTimeout(function () {
		document.getElementById("buzzer"+Z).removeAttribute("class", "animated wobble");
	}, 20000);
}

function addPointer (Z, arrowSide) {
	var arrow = document.createElement("div");
	arrow.setAttribute("class", arrowSide);
	arrow.setAttribute("class", "arrow");
	document.getElementById(Z +"side").appendChild(arrow);
}

var randoms = [];
var randomInd;
var firstTime = true;

function createQuestion (event) {
	alerts.innerHTML = "Select an option and submit";
	if (firstTime) {
		document.getElementById("acdc").pause();
		var startButton = document.getElementById("btn");
		startButton.parentNode.removeChild(startButton);
		var ready = document.getElementById("ready");
		ready.parentNode.removeChild(ready);
	}
	randomInd = Math.floor(Math.random()*4);
	randoms = createRandoms(data);
	
	var song = document.getElementById("song");
	song.setAttribute("src", data[randoms[randomInd]].previewUrl);

	for(var i=0; i<randoms.length; i++) {
		addRadioButton("radio", "question", data[randoms[i]].trackName, "opt"+(i+1));
	}
	
	addRadioButton("submit", "submit", "", "submitButton");
	addRadioAttributes();
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


function addRadioButton (type, name, text, id) {
    var label = document.createElement("label");
    var element = document.createElement("input");
    element.setAttribute("type", type);
    element.setAttribute("value", text);
    element.setAttribute("name", name);
    element.setAttribute("id", id);
    label.appendChild(element);
    label.innerHTML += ("        " +text);
    var radio1 = document.getElementById("form");
    radio1.appendChild(label);
}

function addRadioAttributes () {
	document.getElementById("submitButton").setAttribute("value", "SUBMIT");
	document.getElementById("submitButton").setAttribute("style", "bottom: 60px");
	document.getElementById("submitButton").setAttribute("class", "gameButton");
}

var currentPlayer;
var currentScoreX = 0;
var currentScoreY = 0;
var count = 0;

function verifyAnswer (event) {
	event.preventDefault();
	if (currentPlayer !== undefined) {
		if (checkAnswer()) {
			asignWinner();
			alerts.innerHTML = "Well done! That was the correct answer!";
			window.setTimeout(function(){console.log("Pause");}, 20000);
			nextQuestion();
		}
		else if (count === 0) {
			switchPlayer();
			count ++;
		}
		else {
			alerts.innerHTML = "Both players were wrong! The right answer was " + data[randoms[randomInd]].trackName;
			window.setTimeout(function(){console.log("Pause");}, 20000);
			nextQuestion();
		}
	}
	else {
		alerts.innerHTML = "Neither player buzzed! No one gets points";
		nextQuestion();
	}
}

function switchPlayer () {
	if (currentPlayer === "X") {
		alerts.innerHTML = "Wrong answer. " +player2 +" gets a chance to answer";
		document.getElementById("buzzerX").setAttribute("style", "background-color: black");
		document.getElementById("buzzerY").setAttribute("style", "background-color: #f39c12");
		currentPlayer = "Y";
		document.getElementById("submitButton").removeEventListener("click", verifyAnswer);
		document.getElementById("submitButton").addEventListener("click", verifyAnswer);			
	}
	else {
		alerts.innerHTML = "Wrong answer. " +player1 +" gets a chance to answer";
		document.getElementById("buzzerY").setAttribute("style", "background-color: black");
		document.getElementById("buzzerX").setAttribute("style", "background-color: #f39c12");
		currentPlayer = "X";
		document.getElementById("submitButton").removeEventListener("click", verifyAnswer);
		document.getElementById("submitButton").addEventListener("click", verifyAnswer);
	}
}

function asignWinner () {
	var scoresX = document.getElementById("scoresX");
	var scoresY = document.getElementById("scoresY");
	if (currentPlayer === "X") {
		currentScoreX = currentScoreX + 100;
		scoresX.textContent = currentScoreX;
	}
	else if (currentPlayer === "Y") {
		currentScoreY = currentScoreY + 100;
		scoresY.textContent = currentScoreY;	
	}
	else if (currentPlayer === undefined) {
		alerts.innerHTML = "Neither player buzzed! No one gets points";
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
	alerts.innerHTML = "Try a new song!";
	// addRadioButton("submit", "submit", "", "next");
	addNextSongAttributes("submit", "submit", "NEXT SONG", "next");
	addCoolFact();
}

function addCoolFact () {
	document.getElementById("coolfact").textContent = coolFacts[Math.floor(Math.random()*coolFacts.length)];
	document.getElementById("coolfacttitle").innerHTML = "DID </br> YOU </br> KNOW?";
}

function addNextSongAttributes (type, name, text, id) {
    var element = document.createElement("input");
    element.setAttribute("type", type);
    element.setAttribute("name", name);
    element.setAttribute("value", text);
    element.setAttribute("id", id);
    document.getElementById("boardCol").appendChild(element);
	// document.getElementById("next").setAttribute("value", "NEXT SONG");
	document.getElementById("submitButton").setAttribute("class", "gameButton");
	document.getElementById("next").addEventListener("click", clearBoard);
}



function clearBoard () {
	var form = document.getElementById("form");
	form.innerHTML = "<audio autoplay></audio>";
	document.querySelector("audio").setAttribute("id", "song");
	currentPlayer = "";
	count = 0;
	randoms = [];
	randomInd = 0;
	firstTime = false;
	var nextSong = document.getElementById("next");
	nextSong.parentNode.removeChild(nextSong);
	document.addEventListener("keypress", checkWinner);
	createQuestion();
}
 

