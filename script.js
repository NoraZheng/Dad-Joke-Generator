const app = {};

app.url = 'https://icanhazdadjoke.com/';
app.fetchData = url => {
  const response = fetch(url, {
    headers: {
      Accept: 'application/json'
    }
  })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
      return null;
    })
    .catch(() => null);
  return response;
};

app.fetchRandomJoke = async () => {
  const randomDiv = document.querySelector('#randomJoke');
  const errorMessage =
    '<p class="fadeIn">Sorry! The server is down. Please try again later! </p>';

  try {
    const data = await app.fetchData(app.url);
    randomDiv.innerHTML = `<p class="fadeIn">${data.joke}</p>`;
  } catch (error) {
    randomDiv.innerHTML = errorMessage;
  }
};

app.searchJoke = async event => {
  event.preventDefault();

  const searchTerm = document.querySelector('#search').value;
  const resList = document.querySelector('#resultsList');

  const fetchError =
    '<li class="fadeIn error">Sorry! The server is down. ಠ_ಠ </li><li class="fadeIn error">Please try again later.</li>';

  const noResult =
    '<li class="fadeIn error">Sorry! That keyword returned no result ಠ_ಠ; </li><li class="fadeIn error">Please try another keyword (e.g. banana, pizza, light, guitar)</li>';

  try {
    const data = await app.fetchData(app.url + `search?term=${searchTerm}`);
    if (data.results.length !== 0) {
      resList.innerHTML = '';
      data.results.map(result => {
        const joke = document.createElement('li');
        joke.innerHTML = `${result.joke}`;
        resList.appendChild(joke);
      });
    } else {
      resList.innerHTML = noResult;
    }
  } catch (error) {
    resList.innerHTML = fetchError;
  }
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
