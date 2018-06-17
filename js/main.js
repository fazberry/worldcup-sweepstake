$(function() {

	const allMatches = 'http://worldcup.sfg.io/matches';
	const matchesToday =  'http://worldcup.sfg.io/matches/today';
	const currentMatch = 'http://worldcup.sfg.io/matches/current';
	const teamResults = 'http://worldcup.sfg.io/teams/results';
	const groupResults = 'http://worldcup.sfg.io/teams/group_results';
	const participants = 'http://files.sequelgroup.co.uk/sweepstake/participants.json';

	const joinJson = (file) => {
		$.getJSON(file, function(data) {
			//console.log(data);
		
		});
	}
	joinJson(matchesToday)


	const todaysMatches = () => {
		$.getJSON(matchesToday, function(data) {
			
			for(i = 0; i < data.length; i++) {

			    let homeTeam = data[i].home_team.country;
			    let awayTeam = data[i].away_team.country;
			    let datetime = data[i].datetime;
			    datetime = moment(datetime, "YYYY/MM/DD HH:mm:ss Z").format('LLLL');
			    let homeGoals = data[i].home_team.goals;
			    let awayGoals = data[i].away_team.goals;
			    let time = [];
			    
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

	const groups = () => {
		$.getJSON(groupResults, function(data) {
			
			for(i = 0; i < data.length; i++) {


				let groupLetter = data[i].group.letter;
				let teamsList = data[i].group.teams;

				var $container = $('<div>', { 'class': 'group' }),
					$table = $('<table>'),
					$thead = $('<thead>'),
					$tbody = $('<tbody>');

					$container.append($('<h4>', { 'text': 'Group ' + groupLetter}));

					$container.append($table);
					$table.append($thead);
					$table.append($tbody);

					$thead.append($('<th>', { 'text': 'Country' }));
					$thead.append($('<th>', { 'text': 'GD' }));
					$thead.append($('<th>', { 'text': 'Pts' }));


					
				for(j = 0; j < teamsList.length; j++) {

					let country = teamsList[j].team.country;
					let gd = teamsList[j].team.goal_differential;
					let pts = teamsList[j].team.points;

					console.log(teamsList[j]);

					var $tr = $('<tr>');


					$tbody.append($tr);
					$tr.append($('<th>', {'text' : country}));
					$tr.append($('<td>', {'text' : gd}));
					$tr.append($('<td>', {'text' : pts}));
				}

				$('.group-stage').append($container);
			   
			}

		});
	};

	groups();


});