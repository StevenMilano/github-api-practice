'use strict';
let username = "";

function getUserRepo() {
  fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayRepo(responseJson))
    
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function displayRepo(responseJson) {
  $('#results-list').empty();
  for (let i = 0; i < responseJson.length; i++) {
    $('#results-list').append(
      `<li>
      <a href="https://github.com/${responseJson[i].full_name}"><h3>${responseJson[i].name}</h3></a>
      </li>`
    )};
    $('#results').removeClass('hidden');
  }

function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      username = $('#js-search-user').val();
      getUserRepo();
    });
  }


watchForm();