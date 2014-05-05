$(document).ready(function(){
  $("#submit").click(function(){
    $.post("submit", {
	grade: $("#grade").val(),
	name: $("#name").val(),
	time: $("#time").val(),
	task: $("#task").val(),
	complete: $("#complete").val(),
	issue: $("#issue").val(),
	all: $("#all").val(),
	task: $("#task").val(),
	} );
	
  	console.log("task:"+
  				$("#grade").val() +
  				$("#name").val() +
  				$("#time").val() +
  				$("#task").val() +
  				$("#complete").val() +
  				$("#issue").val() +
  				$("#all").val() +
  				$("#task").val()
  						);
  });
});