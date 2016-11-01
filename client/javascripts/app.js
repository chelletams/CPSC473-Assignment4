var main = function (triviaObjects) {
	"use strict";

	var trivias = triviaObjects.map(function (trivia) {
		return trivia.question;
	});

	$.get("/questions", function(data) {
		if(data) {
			$
		}
	});
};

$(document).ready(main);