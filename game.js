var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var i = 0;
var j = 0;
var k = 0;
$("h1").text("Press A Key to Start");

function nextSequence() {
	$("h1").text("level " + i);
	if (userClickedPattern.length != 0 && gamePattern.length != 0) {
		console.log(userClickedPattern[k]);
		console.log(gamePattern[k]);
		console.log(JSON.stringify(userClickedPattern));
		console.log(JSON.stringify(gamePattern));
		console.log(
			JSON.stringify(userClickedPattern[k]) == JSON.stringify(gamePattern[k])
		);
		actionSequence();
	}
	if (k == gamePattern.length || j == 0) {
		var randomNumber = Math.floor(Math.random() * 4);
		var randomChoosenColour = buttonColours[randomNumber];
		gamePattern.push(randomChoosenColour);
		$("." + randomChoosenColour)
			.fadeIn(100)
			.fadeOut(100)
			.fadeIn(100);
		var audio = new Audio("sounds/" + randomChoosenColour + ".mp3");
		audio.play();
		userClickedPattern.length = 0;
		console.log(userClickedPattern);
		k = 0;
	}
}

function actionSequence() {
	if (JSON.stringify(userClickedPattern[k]) == JSON.stringify(gamePattern[k])) {
		if(k==(gamePattern.length-1)) {
			i++;
		}
		$("h1").text("level " + i);
		k++;
	} else {
		userClickedPattern = [];
		gamePattern = [];
		i = 0;
		j = 0;
		k = 0;
		$("h1").text("Game Over, Press Any key To Restart");
	}
}

$(".btn").click(function () {
	userChosenColour = $(this).attr("id");
	userClickedPattern.push(userChosenColour);
	setTimeout(function () {
		nextSequence();
	}, 500);
	j++;
});

function playSound(name) {
	$("." + name)
		.fadeIn(100)
		.fadeOut(100)
		.fadeIn(100);
	var audio = new Audio("sounds/" + name + ".mp3");
	audio.play();
}

function animatePress(currentColour) {
	$("#" + currentColour).addClass("pressed");
	setTimeout(function () {
		$("#" + currentColour).removeClass("pressed");
	}, 100);
}

$(document).keypress(function (e) {
	if (i === 0) {
		i++;
		nextSequence();
	}
});
