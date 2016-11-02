var main = function (triviaObjects) {
	"use strict";

	var answerId = 1;

	$("#answerQuestion").on("click", function(event) {
		window.location.href = "trivia.html";
	});

	$("#createQuestion").on("click", function(event) {
		window.location.href = "question.html";
	});

	var getQuestion = function() {
		$.get("/questions", function(data) {
			console.log(data);
			if(data) {
				$("#question").html(data.question);
				answerId = data.answerId;
			}
			else {
				console.log("There is no question in the database.");
			}
		});
	};

	$("#getQuestionButton").on("click", function() {
		getQuestion();
	});

	var getAnswer = function() {
		var jsonData,
			result;

		if($("#answer").val() !== " ") {
			jsonData = JSON.stringify({answer:answer, answerId:answerId});
		}

		$.ajax({
			type: "POST",
			url: "/answer",
			dataType: "json",
			data: jsonData,
			success: function(response) {
				console.log(response);
				result = response.correct ? "True":"False";
				$("#getAnswer").html(result);
			},
			contentType: "application/json"
		});
		$("#answer").val("");
	};

	$("#getAnswerButton").on("click", function() {
		getAnswer();
	});

	$("#getAnswerButton").on("keypress", function(event) {
		if(event.keyCode === 13) {
			getAnswer();
		}
	});

	var makeUpQuestion = function() {
		var qstn = $("#makeQuestion").val(),
			ans = $("#createAnswer").val(),
			jsonData = JSON.stringify({question:qstn, answer:ans});

		$.ajax({
			type: "POST",
			url: "/questions",
			dataType: "json",
			data: jsonData,
			success: function(response) {
				console.log(response);
			},
			contentType: "application/json"
		});
	};

	$("#submitQuestion").on("click", function() {
		makeUpQuestion();
	});

	$("#submitQuestions").on("keypress", function(event) {
		if(event.keyCode === 13) {
			makeUpQuestion();
		}
	});

	var getScore = function() {
		$.ajax({
			type: "GET",
			url: "/score",
			dataType: "json",
			success: function(response) {
				console.log(response);
				$("#correcScore").append("Right: " + response.right);
				$("#wrongScore").append("Wrong: " + response.wrong);
			}
		});
	};

	$("#getTotalScore").on("click", function() {
		getScore();
	});
};

$(document).ready(main);