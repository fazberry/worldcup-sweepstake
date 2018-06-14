$(function() {

	const allMatches = 'http://worldcup.sfg.io/matches';
	const matchesToday =  'http://worldcup.sfg.io/matches/today';
	const currentMatch = 'http://worldcup.sfg.io/matches/current ';
	const teamResults = 'http://worldcup.sfg.io/teams/results ';
	const groupResults = 'http://worldcup.sfg.io/teams/group_results ';

	$.getJSON(groupResults, function(data) {
	    console.log(data);
	});

});