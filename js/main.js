$(function() {

	const allMatches = 'http://worldcup.sfg.io/matches';
	const matchesToday =  'http://worldcup.sfg.io/matches/today';
	const currentMatch = 'http://worldcup.sfg.io/matches/current';
	const teamResults = 'http://worldcup.sfg.io/teams/results';
	const groupResults = 'http://worldcup.sfg.io/teams/group_results';
	const participants = 'http://files.sequelgroup.co.uk/sweepstake/participants.json';

	const joinJson = () => {

	}

	const todaysMatches = () => {
		$.getJSON(matchesToday, function(data) {

			console.log(data);
			
			for(i = 0; i < data.length; i++) {

			    let homeTeam = data[i].home_team.country;
			    let awayTeam = data[i].away_team.country;
			    let datetime = data[i].datetime;
			    datetime = moment(datetime, "YYYY/MM/DD HH:mm:ss Z").format('LLLL');
			    let homeGoals = data[i].home_team.goals;
			    let awayGoals = data[i].away_team.goals;
			    let time = [];

			    console.log(datetime);

			    // console.log(datetime);
			    
			    var $match = $('<div>', { 'class': 'match' }),
			    	$home = $('<div>', { 'class': 'home' }),
			    	$timeVs = $('<div>', { 'class': 'time-vs' }),
			    	$away = $('<div>', { 'class': 'away' });

			    $home.append($('<h3>', { 'text': homeTeam, 'class': 'country-name' }));

			    if(datetime < Date.now()) {
			    	$timeVs.append($('<div>', {'text': time, 'class': 'start-time'}));
			    } else {
			    	$timeVs.append($('<div>', {'text': homeGoals, 'class': 'goals goals--home'}));
			    	$timeVs.append($('<div>', {'text': awayGoals, 'class': 'goals goals--away'}));
			    }

			    $away.append($('<h3>', { 'text': awayTeam, 'class': 'country-name' }));
			    $match.append($home);
			    $match.append($timeVs);
			    $match.append($away);

			    $('.todays-matches').append($match);
			}

		});
	};

	todaysMatches();


});