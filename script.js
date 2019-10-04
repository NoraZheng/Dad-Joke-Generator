const app = {};

app.fetchRandomJoke = () => {
	$.ajax({
		url: 'https://icanhazdadjoke.com/',
		method: 'GET',
		dataType: 'json'
	}).then(res => {
		document.querySelector(
			'#randomJoke'
		).innerHTML = `<p class="fadeIn">${res.joke}</p>`;
	});
};

app.searchJoke = event => {
	event.preventDefault();

	const searchTerm = document.querySelector('#search').value;
	const resDiv = document.querySelector('#results');
	const resList = document.querySelector('#resultsList');

	$.ajax({
		url: 'https://icanhazdadjoke.com/search',
		method: 'GET',
		dataType: 'json',
		data: {
			term: searchTerm
		}
	})
		.then(res => {
			if (res.results.length == 0) {
				resDiv.innerHTML = `<p class="fadeIn">Sorry! That keyword returned no result ಠ_ಠ; </p><p class="fadeIn">Try another keyword (e.g. banana, pizza, light, guitar)</p>`;
			} else {
				resList.innerHTML = '';
				res.results.map(result => {
					const joke = document.createElement('li');
					joke.innerHTML = `${result.joke}`;
					resList.appendChild(joke);
				});
			}
		})
		.catch(() => {
			resDiv.innerHTML = `<p>Sorry! The server is down. </p><p>Try again later.</p>`;
		});
};

app.init = () => {
	document
		.querySelector('#fetchRandom')
		.addEventListener('click', app.fetchRandomJoke);

	document.querySelector('#submit').addEventListener('click', app.searchJoke);
};

document.addEventListener('DOMContentLoaded', function() {
	app.init();
});
