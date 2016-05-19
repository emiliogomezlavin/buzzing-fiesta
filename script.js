
var itunesData = "https://itunes.apple.com/search?term=jack+johnson&country=US";
var data = [];

window.onload = function () {
	initialize();
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
	fetchData();

	document.getElementById("btn").addEventListener("click", createQuestion);
	document.addEventListener("keypress", checkWinner);
}


function checkWinner (event) {
	
	if (event.keyCode == "115") {
		document.getElementById("buzzerX").setAttribute("style", "background-color: white");
		alert("Player 1");
		document.removeEventListener("keypress", checkWinner);
	}
	else if (event.keyCode == "108") {
		document.getElementById("buzzerO").setAttribute("style", "background-color: white");
		alert("Player 2");
		document.removeEventListener("keypress", checkWinner);
	}
	else {
		document.removeEventListener("keypress", checkWinner);	
		document.addEventListener("keypress", checkWinner);
	}
}

function createRandoms (dataArray) {
	var arr = [];
	while(arr.length < 4){
	  var random = Math.ceil(Math.random()*dataArray.length);
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

var randoms;
var randomInd;

function createQuestion (event) {

	var randomInd = Math.floor(Math.random()*4);
	randoms = [];
	randoms = createRandoms(dataDummie);
	console.log(randoms);	
	dataDummie[randoms[randomInd]].sample.play();

	for(var i=0; i<randoms.length; i++) {
		addRadioButton("radio", "question", dataDummie[randoms[i]].bandName, "opt"+(i+1));
		console.log(dataDummie[randoms[i]].bandName);
	}
	addRadioButton("submit", "submit", "", "submitButton");
 
	document.getElementById("btn").removeEventListener("click", createQuestion);	
	document.getElementById("submitButton").addEventListener("click", verifyAnswer);
}

function addRadioButton(type, name, text, id) {
    var label = document.createElement("label");
    var element = document.createElement("input");
    element.setAttribute("type", type);
    element.setAttribute("value", text);
    element.setAttribute("name", name);
    element.setAttribute("id", id);

    label.appendChild(element);
    label.innerHTML += text;

    var radio1 = document.getElementById("form");
    var prueba = radio1.appendChild(label);
    console.log(prueba);
}

var answer;

function checkRadioButtons () {
	var radios = document.getElementsByName("question");
	console.log(radios);
	var val;
	for(var i = 0; i < radios.length; i++){
	    if(radios[i].checked){
	    val = radios[i].value;
	    console.log(val);
		}
	}
	return val;
}

function verifyAnswer (event) {
	event.preventDefault();
	var currentQuestion = dataDummie[randoms[randomInd]].bandName;
	var val = checkRadioButtons();

	if (val === currentQuestion) {
		alert("right answer");
	}
	else {
		alert("incorrect answer");
	}
}

function nextQuestion () {

}


 

