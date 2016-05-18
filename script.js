
window.onload = function () {
	test();
};

function test (){
	document.getElementById("btn").addEventListener("click", createQuestion);
	document.addEventListener("keydown", checkWinner);
}


function checkWinner () {
	var winner = checkKeyPressed(event);
	console.log(winner);
	if (winner === "X") {
		document.getElementById("buzzerX").setAttribute("style", "background-color: white");
		document.removeEventListener("keydown", checkWinner);
	}
	else {
		document.getElementById("buzzerO").setAttribute("style", "background-color: white");
		document.removeEventListener("keydown", checkWinner);
	}
}

function createRandoms () {
	var arr = [];
	while(arr.length < 4){
	  var random = Math.ceil(Math.random()*dataDummie.length);
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
	return arr;	
}


function createQuestion (event) {

	dataDummie[0].sample.play();
	var randoms = createRandoms();
	// var opt1 = ;
	// var opt2 = dataDummie[randoms[1]].bandName;
	// var opt3 = dataDummie[randoms[2]].bandName;
	// var opt4 = dataDummie[randoms[3]].bandName;

	for(var i=0; i<randoms.length; i++) {
		var prueba = addRadioButton("radio", "question", dataDummie[randoms[i]].bandName, "opt"+(i+1));
		console.log(prueba);
	}


	// addRadioButton("radio", "question", opt2, "opt2");
	// addRadioButton("radio", "question", opt3, "opt3");
	// addRadioButton("radio", "question", opt4, "opt4");
	addRadioButton("submit", "submit", "", "submitButton");

	document.getElementById("btn").removeEventListener("click", createQuestion);	
	document.getElementById("submitButton").addEventListener("click", verifyAnswer);
}


var answer;

function verifyAnswer (event) {
	event.preventDefault();
	var currentQuestion = dataDummie[1].bandName;
	var val = checkRadioButtons();

	if (val === currentQuestion) {
		alert("right answer");
		console.log(answer);
	}
	else {
		answer = false;
		alert("incorrect answer");
		console.log(answer);
	}
}

function checkRadioButtons () {
	var radios = document.getElementsByName("question");
	var val;
	for(var i = 0; i < radios.length; i++){
	    if(radios[i].checked){
	    val = radios[i].value;
	    console.log(val);
		}
	}
	return val;
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



 
function checkKeyPressed(e) {
    // if (e.keyCode != "83" && e.keyCode != "76") {
    // 	document.removeEventListener("keydown", checkWinner);
    // 	document.addEventListener("keydown", checkWinner);
    // 	Define how to remove the eventListener from all the other letters
    // }
    if (e.keyCode == "83") {
        alert("Player 1");
        // e.preventDefault();
        return "X";
    }
    else if(e.keyCode == "76") {
    	alert("Player 2");
    	// e.preventDefault();
    	return "O";
    }
}

