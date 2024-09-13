// game.js
window.startGame = function(dogBalance, loboBalance) {
    console.log(`Starting game with DOG balance: ${dogBalance} and LOBO balance: ${loboBalance}`);

    // Determine player's level based on DOG balance
    const level = calculateLevel(dogBalance);
    const hasLobo = loboBalance > 1;

    console.log(`Player Level: ${level}`);
    if (hasLobo) {
        console.log('You have a Lobo companion to help you fight!');
    } else {
        console.log('You do not have a Lobo companion.');
    }

    // Start the text adventure game here based on level and companion status
    startAdventure(level, hasLobo);
};

function calculateLevel(dogBalance) {
    if (dogBalance >= 1000000) return 3;
    if (dogBalance >= 50000) return 2;
    if (dogBalance >= 1000) return 1;
    return 0; // Not enough DOG balance for level 1
}

function startAdventure(level, hasLobo) {
    // Add your text adventure game logic here based on the level and companion
    if (level > 0) {
        console.log(`Welcome to Level ${level} of your adventure!`);
        if (hasLobo) {
            console.log('Your Lobo companion joins you, ready to fight!');
        } else {
            console.log('You venture alone, but determined.');
        }
    } else {
        console.log('You do not have enough DOG to start the adventure. Gather more to level up!');
    }
}
