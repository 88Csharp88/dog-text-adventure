function startGame(dogBalance, loboBalance) {
    const level = calculateLevel(dogBalance);
    const hasLobo = loboBalance > 1;
    console.log(`Player Level: ${level}`);
    if (hasLobo) {
        console.log('You have a Lobo companion to help you fight!');
    }
    // Further game logic based on level and companion
}

function calculateLevel(dogBalance) {
    if (dogBalance >= 1000000) return 3;
    if (dogBalance >= 50000) return 2;
    if (dogBalance >= 1000) return 1;
    return 0; // Not enough DOG balance for level 1
}
