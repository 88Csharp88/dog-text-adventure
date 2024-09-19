window.startGame = function(dogBalance, loboBalance) {
    const gameOutput = document.getElementById('game-output');

    // Clear the output box for a fresh start
    gameOutput.innerHTML = '';

    const level = calculateLevel(dogBalance);
    const hasLobo = loboBalance > 1;
    let mana = level; // Initialize mana based on level
    const maxMana = 20; // Set maximum mana

    // Display initial game information
    updateGameOutput(`Starting game with DOG balance: ${dogBalance} and LOBO balance: ${loboBalance}`);
    updateGameOutput(`Player Level: ${level}`);
    updateGameOutput(`Mana: ${mana}/${maxMana}`);
    
    // Start the text adventure
    startAdventure(level, hasLobo, mana, maxMana);
};

// Update the startAdventure function to take mana as an argument
function startAdventure(level, hasLobo, mana, maxMana) {
    const gameOutput = document.getElementById('game-output');

    if (level > 0) {
        updateGameOutput(`You begin your journey as Level ${level}!`);
        if (hasLobo) {
            updateGameOutput('Your Lobo companion joins you, ready to fight!');
        } else {
            updateGameOutput('You venture alone, but determined.');
        }

        presentChoice('You awake from your slumber. GM. Do you want to log onto socials, begin coding a $DOG application, block your ex from contacts, take a walk, or make a $DOG influencer video?', handleCaveDecision.bind(null, level, hasLobo, mana, maxMana));
    } else {
        updateGameOutput('You do not have enough DOG to start the adventure. Gather more to level up!');
    }
}

function handleCaveDecision(level, hasLobo, mana, maxMana, choice) {
    if (choice === 'yes') {
        updateGameOutput('You log onto socials and immediately encounter a FUDer!');
        const fuderImage = `
            <div>
                <img src="https://github.com/88Csharp88/dog-text-adventure/blob/main/images/FUDer.png?raw=true" alt="FUDer" style="width: 200px; height: auto;"/>
            </div>
        `;
        const gameOutput = document.getElementById('game-output');
        gameOutput.innerHTML += fuderImage; // Add the image to the game output

        // Present new options
        presentNewOptions(level, hasLobo, mana, maxMana);
    } else {
        updateGameOutput('You decide not to log onto X. Go back to bed and gather your strength...');
    }
}

// Updated presentNewOptions to take mana and maxMana as arguments
function presentNewOptions(level, hasLobo, mana, maxMana) {
    const gameOutput = document.getElementById('game-output');
    let options = `<div><p>You have several options:</p>`;

    options += `<button onclick="handleNewChoice('log onto socials', ${level}, ${hasLobo}, ${mana}, ${maxMana})">Log onto socials</button>`;
    options += `<button onclick="handleNewChoice('coding', ${level}, ${hasLobo}, ${mana}, ${maxMana})">Begin coding a $DOG application</button>`;
    options += `<button onclick="handleNewChoice('block ex', ${level}, ${hasLobo}, ${mana}, ${maxMana})">Block your ex from contacts</button>`;
    options += `<button onclick="handleNewChoice('take a walk', ${level}, ${hasLobo}, ${mana}, ${maxMana})">Take a walk</button>`;
    options += `<button onclick="handleNewChoice('influencer video', ${level}, ${hasLobo}, ${mana}, ${maxMana})">Make a $DOG influencer video</button>`;

    options += `</div>`;
    gameOutput.innerHTML += options;
}

function handleNewChoice(choice, level, hasLobo, mana, maxMana) {
    const gameOutput = document.getElementById('game-output');
    gameOutput.innerHTML = ''; // Clear previous output

    updateGameOutput(`You chose to ${choice}.`);

    switch (choice) {
        case 'log onto socials':
            updateGameOutput('You log onto socials and encounter a FUDer!');
            presentAttackOptions(level, hasLobo, mana, maxMana);
            break;
        case 'coding':
            updateGameOutput('You get lost in coding a $DOG application! Gain 1 mana.');
            mana = Math.min(mana + 1, maxMana);
            updateGameOutput(`Mana: ${mana}/${maxMana}`);
            break;
        case 'block ex':
            updateGameOutput('You block your ex from contacts. Peace of mind achieved! Gain 2 mana.');
            mana = Math.min(mana + 2, maxMana);
            updateGameOutput(`Mana: ${mana}/${maxMana}`);
            break;
        case 'take a walk':
            updateGameOutput('You take a walk and feel refreshed! Gain 1 mana.');
            mana = Math.min(mana + 1, maxMana);
            updateGameOutput(`Mana: ${mana}/${maxMana}`);
            break;
        case 'influencer video':
            updateGameOutput('You make a $DOG influencer video and gain followers! Gain 3 mana.');
            mana = Math.min(mana + 3, maxMana);
            updateGameOutput(`Mana: ${mana}/${maxMana}`);
            break;
        default:
            updateGameOutput('Nothing happened.');
            break;
    }
}

// Updated presentAttackOptions to take mana and maxMana as arguments
function presentAttackOptions(level, hasLobo, mana, maxMana) {
    const gameOutput = document.getElementById('game-output');
    let attackOptions = `<div><p>Choose your attack method:</p>`;

    // Level 1 or higher can use Bite
    if (level >= 1) {
        attackOptions += `<button onclick="handleAttackChoice('bite', ${level}, ${hasLobo}, ${mana}, ${maxMana})">Bite (0 mana)</button>`;
    }
    // Level 3 or higher can use Scratch
    if (level >= 3) {
        attackOptions += `<button onclick="handleAttackChoice('scratch', ${level}, ${hasLobo}, ${mana}, ${maxMana})">Scratch (1 mana)</button>`;
    }
    // Level 5 or higher can use Pee on them
    if (level >= 5) {
        attackOptions += `<button onclick="handleAttackChoice('pee on them', ${level}, ${hasLobo}, ${mana}, ${maxMana})">Pee on them (2 mana)</button>`;
    }
    // Level 8 or higher can use Psyop
    if (level >= 8) {
        attackOptions += `<button onclick="handleAttackChoice('psyop', ${level}, ${hasLobo}, ${mana}, ${maxMana})">Psyop (3 mana)</button>`;
    }
    // Level 10 can use Laser Eyes
    if (level === 10) {
        attackOptions += `<button onclick="handleAttackChoice('laser eyes', ${level}, ${hasLobo}, ${mana}, ${maxMana})">Laser Eyes (4 mana)</button>`;
    }

    attackOptions += `</div>`;
    gameOutput.innerHTML += attackOptions;
}

// Updated handleAttackChoice to deduct mana
window.handleAttackChoice = function(attackType, level, hasLobo, mana, maxMana) {
    let attackModifier = 0;
    let manaCost = 0;

    // Apply different bonuses based on the attack type and set mana cost
    if (attackType === 'bite') {
        attackModifier = 2; // Small bonus
        manaCost = 0;
    } else if (attackType === 'scratch') {
        attackModifier = 4; // Medium bonus
        manaCost = 1;
    } else if (attackType === 'pee on them') {
        attackModifier = Math.floor(Math.random() * 6) - 2; // Risky, could be a negative bonus or a big bonus
        manaCost = 2;
    } else if (attackType === 'psyop') {
        attackModifier = 8; // Strong attack
        manaCost = 3;
    } else if (attackType === 'laser eyes') {
        attackModifier = 10; // Ultimate attack
        manaCost = 4;
    }

    // Check if player has enough mana
    if (mana < manaCost) {
        updateGameOutput('Not enough mana to perform this attack!');
        return; // Abort if not enough mana
    }

    // Deduct mana
    mana -= manaCost;

    updateGameOutput(`You choose to ${attackType}! Attack modifier: ${attackModifier}. Mana: ${mana}/${maxMana}`);

    // Clear attack options and start the fight
    const gameOutput = document.getElementById('game-output');
    gameOutput.innerHTML = '';

    simulateFight(level, attackModifier, hasLobo, mana, maxMana);
};

function simulateFight(level, attackModifier, hasLobo, mana, maxMana) {
    const playerRoll = Math.floor(Math.random() * 20) + 1 + level + attackModifier; // Modify based on the chosen attack
    const enemyRoll = Math.floor(Math.random() * 20) + 1;

    updateGameOutput(`You roll a ${playerRoll} including your level bonus and attack modifier. The FUDer rolls a ${enemyRoll}.`);

    if (playerRoll > enemyRoll) {
        updateGameOutput('You win the fight!');
        // Add the Dead FUDer image
        const deadFuderImage = `
            <div>
                <img src="https://github.com/88Csharp88/dog-text-adventure/blob/main/images/Dead%20Cat.png?raw=true" alt="DeadFUDer" style="width: 200px; height: auto;"/>
            </div>
        `;
        const gameOutput = document.getElementById('game-output');
        gameOutput.innerHTML += deadFuderImage; // Add the image to the game output

        // Refill some mana after a win
        mana = Math.min(mana + 2, maxMana);
        updateGameOutput(`You regain 2 mana! Current Mana: ${mana}/${maxMana}`);
    } else {
        updateGameOutput('You lose the fight...');

        // Add the Dead Dog image
        const deadDogImage = `
            <div>
                <img src="https://github.com/88Csharp88/dog-text-adventure/blob/main/images/Dead%20Dog.png?raw=true" alt="DeadDog" style="width: 200px; height: auto;"/>
            </div>
        `;
        const gameOutput = document.getElementById('game-output');
        gameOutput.innerHTML += deadDogImage; // Add the image to the game output
        
        // Check if the player has a LOBO companion and give a second chance
        if (hasLobo) {
            updateGameOutput('But wait! Your LOBO companion bites the FUDer, giving you another chance!');

            // Add the Lobo image
            const loboImage = `
                <div>
                    <img src="https://github.com/88Csharp88/dog-text-adventure/blob/main/images/Lobo.jpg?raw=true" alt="Lobo" style="width: 200px; height: auto;"/>
                </div>
            `;
            gameOutput.innerHTML += loboImage; // Add the image to the game output
            
            // Simulate a second fight with the same attack method
            const secondPlayerRoll = Math.floor(Math.random() * 20) + 1 + level + attackModifier;
            const secondEnemyRoll = Math.floor(Math.random() * 20) + 1;

            updateGameOutput(`You roll a ${secondPlayerRoll} with LOBO’s help. The FUDer rolls a ${secondEnemyRoll}.`);

            if (secondPlayerRoll > secondEnemyRoll) {
                updateGameOutput('With LOBO’s help, you win the fight!');

                const deadFuderImage2 = `
                    <div>
                        <img src="https://github.com/88Csharp88/dog-text-adventure/blob/main/images/Dead%20Cat.png?raw=true" alt="DeadFUDer2" style="width: 200px; height: auto;"/>
                    </div>
                `;
                gameOutput.innerHTML += deadFuderImage2; // Add the image to the game output
                
                // Refill some mana after a win
                mana = Math.min(mana + 2, maxMana);
                updateGameOutput(`You regain 2 mana! Current Mana: ${mana}/${maxMana}`);
            } else {
                updateGameOutput('Even with LOBO’s interference, you still lose the fight...');
                const deadDogImage2 = `
                    <div>
                        <img src="https://github.com/88Csharp88/dog-text-adventure/blob/main/images/Dead%20Dog.png?raw=true" alt="DeadDog2" style="width: 200px; height: auto;"/>
                    </div>
                `;
                gameOutput.innerHTML += deadDogImage2; // Add the image to the game output
            }
        }
    }
}
