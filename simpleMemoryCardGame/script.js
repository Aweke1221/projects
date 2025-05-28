document.addEventListener('DOMContentLoaded', () => {
  const cardContainer = document.querySelector('.card-container');
  const scoreDisplay = document.getElementById('score');
  const playAgainButton = document.getElementById('playAgainButton');
  let score = 0;
  let cards = [];
  let flippedCards = [];
  let matchedPairs = 0;

  // More card symbols, including Joker (🃏) and others
  const symbols = ['A', 'B', 'C', 'D', 'E', 'F', '🃏'];
  const numPairs = symbols.length - 1; // Except joker

  // Duplicate symbols and add a Joker card pair
  const cardSymbols = symbols.slice(0, numPairs).concat(symbols.slice(0, numPairs)).concat([symbols[numPairs], symbols[numPairs]]);

  // Function to shuffle the cards using Fisher-Yates shuffle algorithm
  function shuffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Function to create a card element
  function createCard(symbol, index) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.index = index; // Store the index for matching purposes

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    cardBack.textContent = symbol;

    card.appendChild(cardBack);
    cardContainer.appendChild(card);

    return {element: card, symbol: symbol, index: index}; // Return an object
  }

  // Function to handle card clicks
  function handleCardClick(card) {
    if (flippedCards.length < 2 && !card.element.classList.contains('flipped') && !card.element.classList.contains('matched')) {
      card.element.classList.add('flipped');
      flippedCards.push(card);

      if (flippedCards.length === 2) {
        setTimeout(checkForMatch, 500); // Delay to show the second card
      }
    }
  }

  // Function to check for a match
  function checkForMatch() {
    const card1 = flippedCards[0];
    const card2 = flippedCards[1];

    if (card1.symbol === card2.symbol) {
      // Match found!
      card1.element.classList.add('matched');
      card2.element.classList.add('matched');
      matchedPairs++;
      score += 10;
      scoreDisplay.textContent = score;

      // Check if all pairs have been matched (Excluding the Joker)
      if (matchedPairs === numPairs + 1) {
        bodyBackgroundColor('win');
        playAgainButton.style.display = 'block'; // Show the button
      }
    } else {
      // No match, flip the cards back
      card1.element.classList.remove('flipped');
      card2.element.classList.remove('flipped');
      score -= 2;
      scoreDisplay.textContent = score;
      bodyBackgroundColor('lose');
    }

    flippedCards = []; // Reset flipped cards array
  }

  // Function to change the background color
  function bodyBackgroundColor(state) {
    if (state === 'win') {
      document.body.style.backgroundColor = '#aaffaa'; // Light green for win
    } else if (state === 'lose') {
      document.body.style.backgroundColor = '#ffaaaa'; // Light red for lose
    } else {
      document.body.style.backgroundColor = '#f0f0f0'; // Default
    }
  }

  // Function to reset the game
  function resetGame() {
    cardContainer.innerHTML = ''; // Clear existing cards
    cards = [];
    flippedCards = [];
    matchedPairs = 0;
    score = 0;
    scoreDisplay.textContent = score;
    bodyBackgroundColor('default');
    playAgainButton.style.display = 'none';
    initializeGame();
  }


  // Initialize the game
  function initializeGame() {
    shuffleCards(cardSymbols);

    for (let i = 0; i < cardSymbols.length; i++) {
      const card = createCard(cardSymbols[i], i);
      cards.push(card); // Store the card object in the array

      // Add event listener to the card
      card.element.addEventListener('click', () => {
        handleCardClick(card);
      });
    }
  }

  // Event listener for the "Play Again" button
  playAgainButton.addEventListener('click', resetGame);

  initializeGame();
});