$(function() {

	var allMatches = 'http://worldcup.sfg.io/matches';
	var matchesToday =  'http://worldcup.sfg.io/matches/today';
	var currentMatch = 'http://worldcup.sfg.io/matches/current';
	var teamResults = 'http://worldcup.sfg.io/teams/results';
	var groupResults = 'http://worldcup.sfg.io/teams/group_results';
	var participants = 'http://files.sequelgroup.co.uk/sweepstake/participants.json';

	function todaysMatches(people) {
		$.getJSON(matchesToday, function(data) {
			
			for(i = 0; i < data.length; i++) {

			    var homeTeam = data[i].home_team.country;
			    var awayTeam = data[i].away_team.country;
			    var datetime = data[i].datetime;
			    datetime = moment(datetime, "YYYY/MM/DD HH:mm:ss Z");
			    var homeGoals = data[i].home_team.goals;
			    var awayGoals = data[i].away_team.goals;
			    var homeCountryCode = data[i].home_team.code;
	    		var awayCountryCode = data[i].away_team.code;

			    var $match = $('<div>', { 'class': 'match' }),
			    	$home = $('<div>', { 'class': 'home' }),
			    	$timeVs = $('<div>', { 'class': 'time-vs' }),
			    	$away = $('<div>', { 'class': 'away' });


			    var homePerson = getPerson(homeCountryCode, people);
			    var awayPerson = getPerson(awayCountryCode, people);
			    $home.append($('<div>', {'class': 'avatar', 'style': 'background-image: url(\'' + homePerson.avatar + '\')' }));


			    $home.append($('<h3>', { 'text': homeTeam, 'class': 'country-name' }));

			    if(datetime > moment()) {
			    	var time = datetime.format('k:mm');

			    	$timeVs.append($('<div>', {'text': time, 'class': 'start-time'}));
			    } else {
			    	$timeVs.append($('<div>', {'text': homeGoals, 'class': 'goals goals--home'}));
			    	$timeVs.append($('<div>', {'text': awayGoals, 'class': 'goals goals--away'}));
			    	if(datetime.add(120, 'minutes') > moment()) {
			    		$timeVs.append($('<div>', {'text': 'In progress', 'class': 'in-progress'})).addClass('time-vs--playing');
			    	}
			    }
			    $away.append($('<div>', {'class': 'avatar', 'style': 'background-image: url(\'' + awayPerson.avatar + '\')' }));
			    $away.append($('<h3>', { 'text': awayTeam, 'class': 'country-name' }));
			    $match.append($home);
			    $match.append($timeVs);
			    $match.append($away);

			    $('.todays-matches').append($match);
			}

		});
	};

	function groups(people) {
		$.getJSON(groupResults, function(data) {

		//	console.log(data);
			
			for(i = 0; i < data.length; i++) {

				var groupLetter = data[i].group.letter;
				var teamsList = data[i].group.teams;

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

					//console.log(teamsList[j]);

					//console.log(countryCode);

					var countryCode = teamsList[j].team.fifa_code;
					var country = teamsList[j].team.country;
					var gd = teamsList[j].team.goal_differential;
					var pts = teamsList[j].team.points;
					
					var person = getPerson(countryCode, people);

					var str = person.name;
					var matches  = str.match(/\b(\w)/g);
					var initials = matches.join('');  


					// console.log(countryCode, person);

					var $tr = $('<tr>');
					var $country = $('<th>');

					if(person.avatar.length) {
						$country.append($('<div>', {'class': 'avatar', 'style': 'background-image: url(\'' + person.avatar + '\')' }));
					} else {
						$country.append($('<div>', {'class': 'avatar-name', 'text': initials }));
					}
					$country.append($('<span>', {'text' : country}));

					$tbody.append($tr);
					$tr.append($country);
					$tr.append($('<td>', {'text' : gd}));
					$tr.append($('<td>', {'text' : pts}));
				}

				$('.group-stage').append($container);
			   
			}

		});
	};



	function getPerson(code, people) {
		for(var j = 0; j < people.length; j++) {
			var person = people[j];
	    	if(code === person.code) {
				return people[j].participant;
			}
    	}
	}


	$.getJSON(participants, function(data) {
		todaysMatches(data);
		groups(data);
	});


});