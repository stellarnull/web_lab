var main = function () {
	"use strict";

	var addDashList = function (t) {
		console.log(t);
		console.log("Loading dashes from server");
		var dashlist = document.getElementById("dashlist");
		$("#dashlist").empty();
		var li = document.createElement("li");
		li.innerHTML = t;
		dashlist.appendChild(li);
		
	};


	$.getJSON("../todos", addDashList)
	.error(function (jqXHR, textStatus, errorThrown) 
	{
		console.log("error " + textStatus);
		console.log("incoming Text " + jqXHR.responseText);
	});

	/*setInterval(function () 
	{
		$.getJSON("../t", addDashList)
			.error(function (jqXHR, textStatus, errorThrown) 
			{
				console.log("error " + textStatus);
				console.log("incoming Text " + jqXHR.responseText);
			});
		}, 2000);*/
};


$(document).ready(main);
