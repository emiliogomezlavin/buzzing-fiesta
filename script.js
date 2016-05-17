window.onload = function () {
	test();
};

function test (){
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

