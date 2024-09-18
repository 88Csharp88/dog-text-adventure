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
        presentChoice('You awake from your slumber. GM. Do you want to log onto socials and shill some $DOG? (yes/no)', handleCaveDecision.bind(null, level, hasLobo));

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
            <button onclick="handleChoice('yes')">Yes</button>
            <button onclick="handleChoice('no')">No</button>
        </div>
    `;
    gameOutput.innerHTML += inputForm;

    // Store the callback to be used later in handleChoice
    window.currentCallback = callback;
}

// Function to handle the user's decision
window.handleChoice = function(choice) {
    const gameOutput = document.getElementById('game-output');
    gameOutput.innerHTML = ''; // Clear the buttons after making a choice

    updateGameOutput(`You chose: ${choice}`);
    
    // Call the stored callback function
    if (window.currentCallback) {
        window.currentCallback(choice);
    }
};

function handleCaveDecision(level, hasLobo, choice) {
    if (choice === 'yes') {
        updateGameOutput('You log onto socials and immediately encounter a FUDer!');

        // Add the FUDer image
        const fuderImage = `
            <div>
                <img src="https://github.com/88Csharp88/dog-text-adventure/blob/main/images/FUDer.png?raw=true" alt="FUDer" style="width: 200px; height: auto;"/>
            </div>
        `;
        const gameOutput = document.getElementById('game-output');
        gameOutput.innerHTML += fuderImage; // Add the image to the game output

        // Present attack options before simulating the fight
        presentAttackOptions(level, hasLobo);
    } else {
        updateGameOutput('You decide not to log onto X. Go back to bed and gather your strength...');
    }
}

function simulateFight(level, attackModifier, hasLobo) {
    const playerRoll = Math.floor(Math.random() * 20) + 1 + level + attackModifier; // Modify based on the chosen attack
    const enemyRoll = Math.floor(Math.random() * 20) + 1;

    updateGameOutput(`You roll a ${playerRoll} including your level bonus and attack modifier. The FUDer rolls a ${enemyRoll}.`);

    if (playerRoll > enemyRoll) {
        updateGameOutput('You win the fight!');
        // Add the Dead FUDer image
        const DeadfuderImage = `
            <div>
                <img src="https://github.com/88Csharp88/dog-text-adventure/blob/main/images/Dead%20Cat.png?raw=true" alt="DeadFUDer" style="width: 200px; height: auto;"/>
            </div>
        `;
        const gameOutput = document.getElementById('game-output');
        gameOutput.innerHTML += DeadfuderImage; // Add the image to the game output
    } else {
        updateGameOutput('You lose the fight...');

        // Add the Dead Dog image
        const DeadDogImage = `
            <div>
                <img src="https://github.com/88Csharp88/dog-text-adventure/blob/main/images/Dead%20Dog.png?raw=true" alt="DeadDog" style="width: 200px; height: auto;"/>
            </div>
        `;
        const gameOutput = document.getElementById('game-output');
        gameOutput.innerHTML += DeadDogImage; // Add the image to the game output
        
        // Check if the player has a LOBO companion and give a second chance
        if (hasLobo) {
            updateGameOutput('But wait! Your LOBO companion bites the FUDer, giving you another chance!');

            // Add the Lobo image
        const LoboImage = `
            <div>
                <img src="https://github.com/88Csharp88/dog-text-adventure/blob/main/images/Lobo.jpg?raw=true" alt="Lobo" style="width: 200px; height: auto;"/>
            </div>
        `;
        const gameOutput = document.getElementById('game-output');
        gameOutput.innerHTML += LoboImage; // Add the image to the game output
            
            // Simulate a second fight with the same attack method
            const secondPlayerRoll = Math.floor(Math.random() * 20) + 1 + level + attackModifier;
            const secondEnemyRoll = Math.floor(Math.random() * 20) + 1;

            updateGameOutput(`You roll a ${secondPlayerRoll} with LOBO’s help. The FUDer rolls a ${secondEnemyRoll}.`);

            if (secondPlayerRoll > secondEnemyRoll) {
                updateGameOutput('With LOBO’s help, you win the fight!');

                // Add the Dead FUDer image
        const DeadfuderImage2 = `
            <div>
                <img src="https://github.com/88Csharp88/dog-text-adventure/blob/main/images/Dead%20Cat.png?raw=true" alt="DeadFUDer2" style="width: 200px; height: auto;"/>
            </div>
        `;
        const gameOutput = document.getElementById('game-output');
        gameOutput.innerHTML += DeadfuderImage2; // Add the image to the game output
            } else {
                updateGameOutput('Even with LOBO’s interference, you still lose the fight...');
                // Add the Dead Dog image
        const DeadDogImage2 = `
            <div>
                <img src="https://github.com/88Csharp88/dog-text-adventure/blob/main/images/Dead%20Dog.png?raw=true" alt="DeadDog2" style="width: 200px; height: auto;"/>
            </div>
        `;
        const gameOutput = document.getElementById('game-output');
        gameOutput.innerHTML += DeadDogImage2; // Add the image to the game output
            }
        }
    }
}

function presentAttackOptions(level, hasLobo) {
    const gameOutput = document.getElementById('game-output');
    let inputForm = '<p>Choose your attack method:</p>';

    // Allow different attacks based on the player's level
    if (level >= 1 && level <= 2) {
        inputForm += `<button onclick="handleAttackChoice('bite', ${level}, ${hasLobo})">Bite (small bonus)</button>`;
    }
    if (level >= 3 && level <= 4) {
        inputForm += `<button onclick="handleAttackChoice('scratch', ${level}, ${hasLobo})">Scratch (medium bonus)</button>`;
    }
    if (level >= 5 && level <= 6) {
        inputForm += `<button onclick="handleAttackChoice('pee on them', ${level}, ${hasLobo})">Pee on them (high risk, high reward!)</button>`;
    }
    if (level >= 8 && level <= 9) {
        inputForm += `<button onclick="handleAttackChoice('psyop', ${level}, ${hasLobo})">Psyop (mind games!)</button>`;
    }
    if (level == 10) {
        inputForm += `<button onclick="handleAttackChoice('laser eyes', ${level}, ${hasLobo})">Laser Eyes (ultimate attack!)</button>`;
    }

    gameOutput.innerHTML += `<div>${inputForm}</div>`;
}

// Handle the attack choice
window.handleAttackChoice = function(attackType, level, hasLobo) {
    let attackModifier = 0;

    // Apply different bonuses based on the attack type
    if (attackType === 'bite') {
        attackModifier = 2; // Small bonus
        updateGameOutput('You choose to Bite! Small bonus applied.');
    } else if (attackType === 'scratch') {
        attackModifier = 4; // Medium bonus
        updateGameOutput('You choose to Scratch! Medium bonus applied.');
    } else if (attackType === 'pee on them') {
        attackModifier = Math.floor(Math.random() * 6) - 2; // Risky, could be a negative bonus or a big bonus
        updateGameOutput('You choose to Pee on them! High risk, high reward!');
    } else if (attackType === 'psyop') {
        attackModifier = 8; // Strong attack
        updateGameOutput('You choose Psyop! You mess with their mind!');
    } else if (attackType === 'laser eyes') {
        attackModifier = 10; // Ultimate attack
        updateGameOutput('You choose Laser Eyes! The FUDer trembles in fear!');
    }

    // Clear attack options and start the fight
    const gameOutput = document.getElementById('game-output');
    gameOutput.innerHTML = '';

    simulateFight(level, attackModifier, hasLobo);
};

