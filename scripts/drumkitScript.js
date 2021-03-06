console.log("Linked!");

window.onload = function () {
	setEventListeners();
};

function setEventListeners() {
	
	// var i=0;
	// sounds.forEach(function(sound) {
	// 	console.log(sound);
	// 	var position = document.getElementById("pos"+i);
	// 	position.addEventListener("click", playSound);
	// 	i++;
	// });

	// keys.forEach(function(key) {
	// 	document.addEventListener("keypress", playKey);
	// });

	for (i=1; i<9; i++) {
		document.getElementById("pos"+i).addEventListener("click", playSound);
		document.addEventListener("keypress", playKey);
	}
}

function playSound (event) {
	var position = event.target.getAttribute("id");
	switch (position) {
		case "pos1":
        	sounds.pos1.play();
        	break;
	    case "pos2":
	        sounds.pos2.play();
	        break;
	    case "pos3":
	        sounds.pos3.play();
	        break;
	    case "pos4":
	        sounds.pos4.play();
	        break;
	    case "pos5":
	        sounds.pos5.play();
	        break;
	    case "pos6":
	        sounds.pos6.play();
	        break;
	    case "pos7":
	        sounds.pos7.play();
	        break;
	    case "pos8":
	        sounds.pos8.play();
	        break;
	}
}

function playKey (event) {
	var position = event.keyCode;
	switch (position) {
		case 114:
        	sounds.pos1.play();
        	break;
	    case 116:
	        sounds.pos2.play();
	        break;
	    case 121:
	        sounds.pos3.play();
	        break;
	    case 117:
	        sounds.pos4.play();
	        break;
	    case 106:
	        sounds.pos5.play();
	        break;
	    case 102:
	        sounds.pos6.play();
	        break;
	    case 32:
	        sounds.pos7.play();
	        break;
	    case 107:
	        sounds.pos8.play();
	        break;
	    default:
	    	document.removeEventListener("keypress", playKey);
	    	document.addEventListener("keypress", playKey);
	}
}



keys = {
	114: new Audio("media/drumkit/ridecrash-1.wav"),
	116: new Audio("media/drumkit/hitom-left-2.wav"),
	121: new Audio("media/drumkit/hitom-right-3.wav"),
	117: new Audio("media/drumkit/ride-4.wav"),
	106: new Audio("media/drumkit/hihat-5.wav"),
	102: new Audio("media/drumkit/snare-6.wav"),
	32: new Audio("media/drumkit/bass-kick-7.wav"),
	107: new Audio("media/drumkit/lowtom-8.wav"),
	pos9: new Audio("media/drumkit/ridebell-4a.wav"),
	pos10: new Audio("media/drumkit/hihatO-5a.wav")
};

sounds = {
	pos1: new Audio("media/drumkit/ridecrash-1.wav"),
	pos2: new Audio("media/drumkit/hitom-left-2.wav"),
	pos3: new Audio("media/drumkit/hitom-right-3.wav"),
	pos4: new Audio("media/drumkit/ride-4.wav"),
	pos5: new Audio("media/drumkit/hihat-5.wav"),
	pos6: new Audio("media/drumkit/snare-6.wav"),
	pos7: new Audio("media/drumkit/bass-kick-7.wav"),
	pos8: new Audio("media/drumkit/lowtom-8.wav"),
	pos9: new Audio("media/drumkit/ridebell-4a.wav"),
	pos10: new Audio("media/drumkit/hihatO-5a.wav")
};