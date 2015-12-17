var main = function () {
	"use strict";

	var addDashList = function (q) {
		console.log("Loading dashes from server");
		var dashlist = document.getElementById("dashlist");
		$("#dashlist").empty();
		for (var key in q) 
		{
			//console.log(q[key]);
			var li = document.createElement("li");
			li.innerHTML = JSON.stringify(q[key]);
			dashlist.appendChild(li);
		}
	};


	$.getJSON("../home", addDashList)
	.error(function (jqXHR, textStatus, errorThrown) 
	{
		console.log("error " + textStatus);
		console.log("incoming Text " + jqXHR.responseText);
	});

	setInterval(function () 
	{
		$.getJSON("../home", addDashList)
			.error(function (jqXHR, textStatus, errorThrown) 
			{
				console.log("error " + textStatus);
				console.log("incoming Text " + jqXHR.responseText);
			});
		}, 2000);
};


$(document).ready(main);
