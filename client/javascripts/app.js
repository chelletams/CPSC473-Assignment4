var main = function (triviaObjects) {
	"use strict";

	var trivias = triviaObjects.map(function (trivia) {
		return trivia.question;
	});

	$("#answerQuestion").on("click", function(event) {
		window.location.href = "trivia.html";
	});

	$("#createQuestion").on("click", function(event) {
		window.location.href = "question.html";
	});

};

$(document).ready(main);