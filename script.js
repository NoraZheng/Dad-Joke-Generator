$(document).ready(function() {
  //fetch a random joke
  $(`button`).on('click', () => {
    $.ajax({
      url: 'https://icanhazdadjoke.com/',
      method: 'GET',
      dataType: 'json'
    }).then(res => {
      $(`div.randomJoke`).empty();
      $(`div.randomJoke`)
        .append(`<p>${res.joke}</p>`)
        .hide()
        .fadeIn(300);
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
          $(`ul.searchResults`).empty();
          $(`ul.searchResults`)
            .append(
              `<p>Sorry! That keyword returned no result ಠ_ಠ; </p><p>Try another keyword (e.g. banana, pizza, light, guitar)</p>`
            )
            .hide()
            .fadeIn(300);
        } else {
          $(`ul.searchResults`).empty();
          res.results.map(result => {
            console.log(result);
            $(`ul.searchResults`)
              .append(`<li>${result.joke}</li>`)
              .hide()
              .fadeIn(300);
          });
        }
      })
      .catch(error => {
        $(`ul.searchResults`).empty();
        $(`ul.searchResults`)
          .append(`<p>Sorry! The server is down. </p><p>Try again later.</p>`)
          .hide()
          .fadeIn(300);
      });
    $('html, body').animate(
      {
        scrollTop: $('#searchResults').offset().top
      },
      550
    );
  });
});
