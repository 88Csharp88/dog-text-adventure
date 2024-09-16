// game.js
window.startGame = function(dogBalance, loboBalance) {
    const outputDiv = document.getElementById('game-output'); // Get the div to display output
    outputDiv.innerHTML = ''; // Clear previous content

    // Determine player's level based on DOG balance
    const level = calculateLevel(dogBalance);
    const hasLobo = loboBalance > 1;

    // Display player's level
    //outputDiv.innerHTML += `<p>Player Level: ${level}</p>`;
    //if (hasLobo) {
    //    outputDiv.innerHTML += '<p>You have a Lobo companion to help you fight!</p>';
    //} else {
    //    outputDiv.innerHTML += '<p>You do not have a Lobo companion.</p>';
   // }

    // Start the text adventure game based on level and companion status
    startAdventure(level, hasLobo, outputDiv);
};

function calculateLevel(dogBalance) {
    if (dogBalance >= 1000000) return 3;
    if (dogBalance >= 50000) return 2;
    if (dogBalance >= 1000) return 1;
    return 0; // Not enough DOG balance for level 1
}

function startAdventure(level, hasLobo, outputDiv) {
    // Add text adventure game logic here
    if (level > 0) {
        outputDiv.innerHTML += `<p>You begin your journey at Level ${level}!</p>`;
        if (hasLobo) {
            outputDiv.innerHTML += '<p>Your Lobo companion joins you, ready to fight!</p>';
        } else {
            outputDiv.innerHTML += '<p>You venture alone, but determined.</p>';
        }
    } else {
        outputDiv.innerHTML += '<p>You do not have enough DOG to start the adventure. Gather more to level up!</p>';
    }
}
