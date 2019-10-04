const app = {};
app.randomButton = document.querySelector('#randomButton');
app.randomJokeDiv = document.querySelector('#randomJoke');
app.resultsList = document.querySelector('#searchResults');

document.addEventListener('DOMContentLoaded', function() {
	//fetch a random joke

	app.randomButton.addEventListener('click', () => {
		$.ajax({
			url: 'https://icanhazdadjoke.com/',
			method: 'GET',
			dataType: 'json'
		}).then(res => {
			app.randomJokeDiv.innerHTML = `<p class="fadeIn">${res.joke}</p>`;
		});
	});

	//search joke by keyword
	$(`input[type='submit']`).on('click', event => {
		event.preventDefault();
		$.ajax({
			url: 'https://icanhazdadjoke.com/search',
			method: 'GET',
			dataType: 'json',
			data: {
				term: $(`input[type=text]`).val()
			}
		})
			.then(res => {
				if (res.results.length == 0) {
					app.resultsList.innerHTML = `<p class="fadeIn">Sorry! That keyword returned no result ಠ_ಠ; </p><p class="fadeIn">Try another keyword (e.g. banana, pizza, light, guitar)</p>`;
				} else {
					app.resultsList.innerHTML = '';
					res.results.map(result => {
						const joke = document.createElement('li');
						joke.innerHTML = `${result.joke}`;
						app.resultsList.appendChild(joke);
					});
				}
			})
			.catch(error => {
				app.resultsList.innerHTML = `<p>Sorry! The server is down. </p><p>Try again later.</p>`;
			});
	});
});
