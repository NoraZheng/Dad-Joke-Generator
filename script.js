const app = {};

app.fetchRandomJoke = () => {
  const randomDiv = document.querySelector('#randomJoke');

  fetch('https://icanhazdadjoke.com/', {
    headers: {
      Accept: 'application/json'
    }
  })
    .then(response => {
      if (response.status !== 200) {
        resList.innerHTML = fetchError;
        return;
      }
      response.json().then(data => {
        randomDiv.innerHTML = `<p class="fadeIn">${data.joke}</p>`;
      });
    })
    .catch(() => {
      randomDiv.innerHTML =
        '<p class="fadeIn>Sorry! The server is down. Please try again later!</p>';
    });
};

app.searchJoke = event => {
  event.preventDefault();

  const searchTerm = document.querySelector('#search').value;
  const resList = document.querySelector('#resultsList');

  const fetchError =
    '<li class="fadeIn error">Sorry! The server is down. ಠ_ಠ </li><li class="fadeIn error">Please try again later.</li>';

  const noResult =
    '<li class="fadeIn error">Sorry! That keyword returned no result ಠ_ಠ; </li><li class="fadeIn error">Try another keyword (e.g. banana, pizza, light, guitar)</li>';

  fetch(`https://icanhazdadjoke.com/search?term=${searchTerm}`, {
    headers: { Accept: 'application/json' }
  })
    .then(response => {
      if (response.status !== 200) {
        resList.innerHTML = fetchError;
        return;
      }
      response.json().then(data => {
        if (data.results.length === 0) {
          resList.innerHTML = noResult;
        } else {
          resList.innerHTML = '';
          data.results.map(result => {
            const joke = document.createElement('li');
            joke.innerHTML = `${result.joke}`;
            resList.appendChild(joke);
          });
        }
      });
    })
    .catch(() => {
      resList.innerHTML = fetchError;
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
