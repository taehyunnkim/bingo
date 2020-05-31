'use strict';

(function() {
  const BASE_URL = 'http://localhost:8080/';
  window.addEventListener('load', init);

  function init() {
    let newButton = eid('new-game');
    newButton.addEventListener('click', newGame);
    let sizeInput = eid('size-select');
    sizeInput.addEventListener('change', populateCards);
  }

  function newGame(e) {
    e.preventDefault();
    let nameInput = eid('name');
    let selectionInput = eid('size-select');
    let name = nameInput.value;
    let option = selectionInput.value;
    if (option === '') {
      showAlert('Please select a board size');
    } else if (name === '') {
      showAlert('Please enter a name');
    } else {
    fetch(BASE_URL + 'newGame/?name=' + name + '&size=' + option,)
      .then(checkStatus)
      .then(resp => resp.json())
      .then(showResponse)
      .catch(handleError);

    nameInput.setAttribute('disabled', true);
    selectionInput.setAttribute('disabled', true);
    }
  }

  function populateCards() {
    let board = eid('board');
    board.innerHTML = '';
    for (let i = 0; i < this.value; i++) {
      let container = document.createElement('div');
      for(let j = 0; j < this.value; j++) {
        let card = document.createElement('div');
        let scenario = document.createElement('p');
        scenario.classList.add('scenario');
        card.appendChild(scenario);
        card.classList.add('square');
        container.appendChild(card);
      }
      board.appendChild(container);
    }
  }
  
  function showResponse(responseData) {
    document.getElementById("results").textContent = responseData.result;
  }

  function handleError(responseText) {
    showAlert(responseText);
  }

  function checkStatus(response) {
    if (response.ok) {
      return response;
    } else {
       throw Error("Error in request: " + response.statusText);
    }
  }

  function showAlert(message) {
    let alert = eid('error');
    alert.textContent = 'Error: ' + message;
    setTimeout(function() {
      alert.textContent = '';
    }, 2000);
  }

  function eid(id) {
    return document.getElementById(id);
  }
})();

// let formData = new FormData(document.getElementById("input-form"));
// fetch(URL, { method: "POST", body: formData })
//   .then(checkStatus)
//   .then(resp => resp.json())
//   .then(showResponse)
//   .catch(handleError);