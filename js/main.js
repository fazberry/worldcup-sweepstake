$(function() {

	var matchesToday =  'https://worldcup.sfg.io/matches/today';
	var groupResults = 'https://worldcup.sfg.io/teams/group_results';
	var knockoutResults = 'https://raw.githubusercontent.com/lsv/fifa-worldcup-2018/master/data.json';
	var participants = 'https://files.sequelgroup.co.uk/sweepstake/participants.json';


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
			   
			    var strHome = homePerson.name;
				var matchesHome  = strHome.match(/\b(\w)/g);
				var initialsHome = matchesHome.join(''); 
				var strAway = awayPerson.name;
				var matchesAway  = strAway.match(/\b(\w)/g);
				var initialsAway = matchesAway.join(''); 


			    if(homePerson.avatar.length) {
			    	$home.append($('<div>', {'class': 'avatar', 'style': 'background-image: url(\'' + homePerson.avatar + '\')' }));
			    } else {
			    	$home.append($('<div>', {'class': 'avatar-name', 'text': initialsHome }));
			    }

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

			    if(awayPerson.avatar.length) {
			    	$away.append($('<div>', {'class': 'avatar', 'style': 'background-image: url(\'' + awayPerson.avatar + '\')' }));
			    } else {
			    	$away.append($('<div>', {'class': 'avatar-name', 'text': initialsAway }));
			    }
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

			// var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
			// for (var group = 0; group < 8; group++) {
			// 	for (var position = 0; position < 2; position++) {
			// 		var team = data[group].ordered_teams[position],
			// 			groupLetter = letters[group];

			// 		var $target = $('.team--' + groupLetter + (position + 1));
			// 		var person = getPerson(team.fifa_code, people);

			// 		$target.find('h4').text(team.country);

			// 		$target.find('.avatar').css({
			// 			'background-image' : 'url(\'' + person.avatar + '\')',
			// 			'text-indent' : -9999
			// 		});
			// 	}
			// }

		//	console.log(data);
			
			for(i = 0; i < data.length; i++) {

				var groupLetter = data[i].letter;
				var teamsList = data[i].ordered_teams;

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

					var countryCode = teamsList[j].fifa_code;
					var country = teamsList[j].country;
					var gd = teamsList[j].goal_differential;
					var pts = teamsList[j].points;
					
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

	function knockout(people) {
		$.getJSON(knockoutResults, function(data) {

			console.log(data);

			var knockout16 = data.knockout.round_16;

			console.log(knockout16);


		});
	}

	knockout();


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