
// let cards = search_block.querySelectorAll('.row')[1].querySelector('.mb-40');


function liveSearch() {
  let cards = document.querySelectorAll('.mb-40')
  // let search_block = document.querySelector('.found-services');
  // Locate the card elements
  // Locate the search input
  let search_query = document.querySelector(".activity-search").value;

  // if (search_query) {
  //   search_block.removeAttribute("hidden");
  // } else {
  //   search_block.setAttribute("hidden", '');
  // }

  // Loop through the cards
  for (let i = 0; i < cards.length; i++) {
    // If the text is within the card...
    if(cards[i].innerHTML.toLowerCase()
      // ...and the text matches the search query...
      .includes(search_query.toLowerCase())) {
        // ...remove the `.is-hidden` class.
        cards[i].classList.remove("is-hidden");
    } else {
      // Otherwise, add the class.
      cards[i].classList.add("is-hidden");
    }
  }
}

//A little delay
// let typingTimer;
// let typeInterval = 500;
// let searchInput = document.querySelector('.searchInputField');
//
// searchInput.addEventListener('keyup', () => {
//     clearTimeout(typingTimer);
//     typingTimer = setTimeout(liveSearch, typeInterval);
// });