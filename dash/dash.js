var main = function () {
	"use strict";

	$.get("/todosAmount", function (res) {
		$(".data").append(res);
	});

	$.get("/getTags", function (res) {
		console.log(res);
		$(".data").append(res);
	});

	$.get("/tagsFrequency", function (res) {
		$(".data").append(res);
	});

	$.get("/totalPendingAndCompleted", function (res) {
		$(".data").append(res);
	});
	
	$.get("/totalPendingAndCompleted", function (res) {
		$(".data").append(res);
	});
	
	$.get("/todosCompletedEachWeek", function (res) {
		$(".data").append(res);
	});
	
	$.get("/averageCompletionTime", function (res) {
		$(".data").append(res);
	});
	
	$.get("/lowerThenAverageCompletionTime", function (res) {
		$(".data").append(res);
	});

};


$(document).ready(main);
