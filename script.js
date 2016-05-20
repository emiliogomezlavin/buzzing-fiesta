
// var itunesData = "https://itunes.apple.com/search?term=jack+johnson&country=US";
var data = [];
var alerts;

window.onload = function () {
	alerts = document.getElementById("alerts");
	getPlayersDetails();
};
	
function getTermData (answer) {
	// var answer = "jack+johnson";
	fetchData(answer);
}

function fetchData(searchTerm) {
  var query = typeof searchTerm === "undefined" ? "jack+johnson" : searchTerm;
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

var player1;
var player2;
var artistName;

function getPlayersDetails () {
	$("#startForm").on("submit", function(event){
    event.preventDefault(); 
    player1 = $("input#player1Input").val();
    player2 = $("input#player2Input").val();
    artistName = $("input#artistInput").val();
    
    document.getElementById("player1").innerHTML = player1;
    var element = document.createElement("p");
    element.innerHTML = "Use the letter S";
    document.getElementById("player1").appendChild(element);
    document.getElementById("player2").innerHTML = player2;
    var element2 = document.createElement("p");
    element2.innerHTML = "Use the letter L";
    document.getElementById("player2").appendChild(element2);

    getTermData(artistName);

    var startForm = document.getElementById("startForm");
	startForm.parentNode.removeChild(startForm);

	var ready = document.createElement("h2");
	ready.innerHTML = "GET READY!!! </br> </br>CLICK ON THE START BUTTON!!";
	ready.setAttribute("id", "ready");
	document.getElementById("board").appendChild(ready);

	initialize();
	});
}



function initialize (){
	document.getElementById("btn").addEventListener("click", createQuestion);
	document.addEventListener("keypress", checkWinner);
}


function checkWinner (event) {
		
	if (event.keyCode == "115") {
		document.getElementById("buzzerX").setAttribute("style", "background-color: #f39c12");
		// document.getElementById("buzzerX").setAttribute("style", "border: 3px solid #ecf0f1");
		// document.getElementById("buzzerX").innerHTML = "WINNER!!";
		// for(i=0; i<6; i++) {
		// 	fadeInfadeOut("X");
		// }
		// animateBuzzer(document.getElementById("buzzerX"));
		// document.getElementById("flashX").setAttribute("class", "animated flash"); 
		// document.getElementById("flashX").setAttribute("style", "background-color: rgba(0,0,0,0.6)");
		
		alerts.innerHTML = player1 + " buzzed first!";
		document.removeEventListener("keypress", checkWinner);
		currentPlayer = "X";
	}
	else if (event.keyCode == "108") {
		document.getElementById("buzzerY").setAttribute("style", "background-color: #f39c12");
		// document.getElementById("buzzerY").setAttribute("style", "border: 3px solid #ecf0f1");
		// document.getElementById("buzzerY").innerHTML = "WINNER!!";
		// for(i=0; i<6; i++) {
		// 	fadeInfadeOut("Y");
		// }
		
		alerts.innerHTML = player2 + " buzzed first!";
		document.removeEventListener("keypress", checkWinner);
		currentPlayer = "Y";
	}
	else {
		document.removeEventListener("keypress", checkWinner);	
		document.addEventListener("keypress", checkWinner);
	}
}

// function fadeInfadeOut (win) {
// 	$("#buzzer" +win).fadeOut(100);
// 	$("#buzzer" +win).fadeIn(100);
// }

// function animateBuzzer (buzzer) {
// 	console.log(buzzer);
//     buzzer.setAttribute("class", "animated flash");  
//     console.log(buzzer);
//     buzzer.removeAttribute("class", "animated flash");  
//     console.log(buzzer);
// 	window.setTimeout( function(){
// 	    buzzer.removeClass("animated flash");
// 	}, 200);         
// }


var randoms = [];
var randomInd;
var firstTime = true;

function createQuestion (event) {
	// $("#buzzerX").keypress(checkWinner(event));
	alerts.innerHTML = "Select an option and submit";
	if (firstTime) {
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
	document.getElementById("submitButton").setAttribute("value", "SUBMIT");
	document.getElementById("submitButton").setAttribute("style", "bottom: 60px");
	document.getElementById("submitButton").setAttribute("class", "gameButton");
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

// addSubmitButton("submit", "submit", "Submit Answer", "submitButton");
// addSubmitButton("submit", "submit", "Next Song", "next");
// function addSubmitButton(type, name, text, id) {
//     var board = document.getElementById("board");
//     var element = document.createElement("input");
//     element.setAttribute("type", type);
//     element.setAttribute("name", name);
//     element.setAttribute("id", id);
//     board.appendChild(element);
//     board.innerHTML += text;
// }

function addRadioButton(type, name, text, id) {
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

var currentPlayer;
var currentScoreX = 0;
var currentScoreY = 0;
var count = 0;

function verifyAnswer (event) {
	event.preventDefault();

	if (checkAnswer()) {
		asignWinner();
		alerts.innerHTML = "Well done! That was the correct answer!";
		nextQuestion();
	}
	else if (count === 0) {
		switchPlayer();
		count ++;
	}
	else {
		alerts.innerHTML = "Both players were wrong! The right answer was " + data[randoms[randomInd]].trackName;
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
	// var removeSubmit = document.getElementById("submitButton");
	// removeSubmit.parentNode.removeChild(removeSubmit);
	alerts.innerHTML = "Try a new song!";
	addRadioButton("submit", "submit", "", "next");
	document.getElementById("next").setAttribute("value", "NEXT SONG");
	document.getElementById("submitButton").setAttribute("class", "gameButton");
	document.getElementById("next").addEventListener("click", clearBoard);
}

// Falta incluir como regresa el buzzer al principio y como va a hacer animacion cuando cambia de jugador

function clearBoard () {
	var form = document.getElementById("form");
	form.innerHTML = "<audio autoplay></audio>";
	document.querySelector("audio").setAttribute("id", "song");
	currentPlayer = "";
	count = 0;
	randoms = [];
	randomInd = 0;
	firstTime = false;
	document.getElementById("buzzerX").removeAttribute("style", "background-color: #f39c12");
	document.getElementById("buzzerX").removeAttribute("style", "background-color: #f39c12");
	document.getElementById("buzzerX").removeAttribute("style", "border: 3px solid #ecf0f1");
	document.getElementById("buzzerY").removeAttribute("style", "border: 3px solid #ecf0f1");
	document.addEventListener("keypress", checkWinner);
	createQuestion();
}
 

