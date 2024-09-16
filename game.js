// game.js
window.startGame = function(dogBalance, loboBalance) {
    const gameOutput = document.getElementById('game-output');

    // Clear the output box for a fresh start
    gameOutput.innerHTML = '';

    const level = calculateLevel(dogBalance);
    const hasLobo = loboBalance > 1;

    // Display initial game information
    updateGameOutput(`Starting game with DOG balance: ${dogBalance} and LOBO balance: ${loboBalance}`);
    updateGameOutput(`Player Level: ${level}`);
    
    //if (hasLobo) {
      //  updateGameOutput('You have a Lobo companion to help you fight!');
    //} else {
      //  updateGameOutput('You do not have a Lobo companion.');
    //}

    // Start the text adventure
    startAdventure(level, hasLobo);
};

// Function to calculate player's level
function calculateLevel(dogBalance) {
    if (dogBalance >= 50000000) return 10;
    if (dogBalance >= 25000000) return 9;
    if (dogBalance >= 10000000) return 8;
    if (dogBalance >= 5000000) return 7;
    if (dogBalance >= 1000000) return 6;
    if (dogBalance >= 500000) return 5;
    if (dogBalance >= 250000) return 4;
    if (dogBalance >= 100000) return 3;
    if (dogBalance >= 10000) return 2;
    if (dogBalance >= 1000) return 1;
    return 0; // Not enough DOG balance for level 1
}

// Function to update the game output box
function updateGameOutput(text) {
    const gameOutput = document.getElementById('game-output');
    gameOutput.innerHTML += `<p>${text}</p>`;
}

// Adventure logic with choices
function startAdventure(level, hasLobo) {
    const gameOutput = document.getElementById('game-output');

    if (level > 0) {
        updateGameOutput(`You begin your journey as Level ${level}!`);
        if (hasLobo) {
            updateGameOutput('Your Lobo companion joins you, ready to fight!');
        } else {
            updateGameOutput('You venture alone, but determined.');
        }

        // Simulate a simple choice for the user (this could later be a button click)
        presentChoice('Do you want to log onto X and shill some $DOG? (yes/no)', handleCaveDecision.bind(null, level)); // Pass level to decision);
    } else {
        updateGameOutput('You do not have enough DOG to start the adventure. Gather more to level up!');
    }
}

// Function to present a choice and wait for user's response
function presentChoice(question, callback) {
    const gameOutput = document.getElementById('game-output');
    const inputForm = `
        <div>
            <p>${question}</p>
            <button onclick="handleChoice('yes', ${callback.name})">Yes</button>
            <button onclick="handleChoice('no', ${callback.name})">No</button>
        </div>
    `;
    gameOutput.innerHTML += inputForm;
}

// Function to handle the user's decision
window.handleChoice = function(choice, callback) {
    // Clear the buttons after making a choice
    const gameOutput = document.getElementById('game-output');
    gameOutput.innerHTML = '';

    updateGameOutput(`You chose: ${choice}`);
    callback(choice);
};

// Handle cave decision
function handleCaveDecision(level, choice) {
    if (choice === 'yes') {
        updateGameOutput('You log onto X and immediately encounter a FUDer!');
        // Simulate a fight
        simulateFight(level);
    } else {
        updateGameOutput('You decide not to log onto X. The adventure continues...');
    }
}

// Simulate a fight (with simple dice rolls)
function simulateFight(level) {
    const playerRoll = Math.floor(Math.random() * 20) + 1 + level;
    const enemyRoll = Math.floor(Math.random() * 20) + 1;

    updateGameOutput(`You roll a ${playerRoll} (including your level bonus). The FUDer rolls a ${enemyRoll}.`);

    if (playerRoll > enemyRoll) {
        updateGameOutput('You win the fight!');
    } else {
        updateGameOutput('You lose the fight...');
    }
}
