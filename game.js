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

function presentChoice(question, callback) {
    const gameOutput = document.getElementById('game-output');
    
    // Clear previous output
    gameOutput.innerHTML = '';
    
    // Display the question
    updateGameOutput(question);
    
    // Create buttons for the choices
    const choices = [
        'log onto socials',
        'begin coding a $DOG application',
        'block your ex from contacts',
        'take a walk',
        'make a $DOG influencer video'
    ];

    choices.forEach(choice => {
        const button = document.createElement('button');
        button.innerText = choice;
        button.onclick = () => {
            callback(choice); // Call the provided callback with the chosen option
        };
        gameOutput.appendChild(button);
    });
}

function startAdventure(level, hasLobo, mana, maxMana) {
    const gameOutput = document.getElementById('game-output');
    const buttonContainer = document.getElementById('button-container'); // Ensure this exists in your HTML

    if (level > 0) {
        updateGameOutput(`You begin your journey as Level ${level}!`);
        if (hasLobo) {
            updateGameOutput('Your Lobo companion joins you, ready to fight!');
        } else {
            updateGameOutput('You venture alone, but determined.');
        }

        // Create a "Ready to Start" button
        const startButton = document.createElement('button');
        startButton.textContent = "Are you ready to start your adventure?";
        buttonContainer.appendChild(startButton);

        // Add event listener to the button
        startButton.addEventListener('click', () => {
            // Remove the button after clicking
            buttonContainer.removeChild(startButton);
            
            // Proceed with the next part of the adventure
            presentNewOptions(level, hasLobo, mana, maxMana);
        });
    } else {
        updateGameOutput('You do not have enough DOG to start the adventure. Gather more to level up!');
    }
}

// Updated presentNewOptions to take mana and maxMana as arguments
function presentNewOptions(level, hasLobo, mana, maxMana) {
    const gameOutput = document.getElementById('game-output');
    gameOutput.innerHTML = ''; // Clear previous output
    
    let options = `<div><p>You awake from your slumber. Do you want to log onto socials, begin coding a $DOG application, block your ex from contacts, take a walk, or make a $DOG influencer video?:</p>`;

    options += `<button onclick="handleNewChoice('log onto socials', ${level}, ${hasLobo}, ${mana}, ${maxMana})">Log onto socials</button>`;
    options += `<button onclick="handleNewChoice('coding', ${level}, ${hasLobo}, ${mana}, ${maxMana})">Begin coding a $DOG application</button>`;
    options += `<button onclick="handleNewChoice('block your ex', ${level}, ${hasLobo}, ${mana}, ${maxMana})">Block your ex from contacts</button>`;
    options += `<button onclick="handleNewChoice('take a walk', ${level}, ${hasLobo}, ${mana}, ${maxMana})">Take a walk</button>`;
    options += `<button onclick="handleNewChoice('influencer video', ${level}, ${hasLobo}, ${mana}, ${maxMana})">Make a $DOG influencer video</button>`;

    options += `</div>`;
    gameOutput.innerHTML += options;
}

// Define an array of enemies
const enemies = [
    { name: "FUDer", 
        image: "https://github.com/88Csharp88/dog-text-adventure/blob/main/images/FUDer.png?raw=true",
        deadImage: "https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2-of-2/images/Dead%20Cat.png?raw=true"
    },
    
    { name: "Gary Gensler", 
         image: "https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2/images/GaryGensler.jpeg?raw=true",
        deadImage: "https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2-of-2/images/DeadGensler.jpg?raw=true"
    },
    
    { name: "Your Ex", 
         image: "https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2/images/ex.jpg?raw=true",
        deadImage: "https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2-of-2/images/DeadEx.jpg?raw=true"
    }, 
    
    { name: "Tax Collector", 
         image: "https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2/images/TaxCollector.jpeg?raw=true",
        deadImage: "https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2-of-2/images/DeadTaxCollector.jpg?raw=true"
    }, 
    
    { name: "Hacker", 
     image: "https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2/images/Hacker.jpg?raw=true",
        deadImage: "https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2-of-2/images/DeadHacker.jpg?raw=true"
    }, 
    
    { name: "Zombie Elon", 
         image: "https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2/images/ZombieElon.jpeg?raw=true",
         deadImage: "https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2-of-2/images/DeadZombieElon.jpg?raw=true"
    }, 
    
    { name: "Hater", 
         image: "https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2/images/Hater.jpg?raw=true",
        deadImage: "https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2-of-2/images/DeadHater.jpg?raw=true"
    }, 
    
    { name: "Animal Control", 
         image: "https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2/images/AnimalControl.jpg?raw=true",
        deadImage: "https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2-of-2/images/DeadAnimalControl.jpg?raw=true"
    }, 
    
    { name: "Mad Dad", 
         image: "https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2/images/MadDad.jpg?raw=true",
        deadImage: "https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2-of-2/images/DeadMadDad.jpg?raw=true"
    },
    
    { name: "Toxic Neighbor", 
         image: "https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2/images/ToxicNeighbor.jpg?raw=true",
        deadImage: "https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2-of-2/images/DeadToxicNeighbor.jpg?raw=true"
    } 
];

function handleNewChoice(choice, level, hasLobo, mana, maxMana) {
    const gameOutput = document.getElementById('game-output');
    gameOutput.innerHTML = ''; // Clear previous output

    updateGameOutput(`You chose to ${choice}.`);

    let enemy;

    switch (choice) {
        case 'log onto socials':
            updateGameOutput('You log onto socials and encounter a FUDer!');
            // Add the FUDer image
            const fuderImage = `
                <div>
                    <img src="https://github.com/88Csharp88/dog-text-adventure/blob/main/images/FUDer.png?raw=true" alt="FUDer" style="width: 200px; height: auto;"/>
                </div>
            `;
            gameOutput.innerHTML += fuderImage; // Add the image to the game output
            enemy = enemies.find(e => e.name === "FUDer");
            presentAttackOptions(level, hasLobo, mana, maxMana, enemy);
            break;
        case 'coding':
            updateGameOutput('You get lost in coding a $DOG application! Gain 1 mana.');
            mana = Math.min(mana + 1, maxMana);
            updateGameOutput(`Mana: ${mana}/${maxMana}`);
            break;
        case 'block your ex':
            updateGameOutput('You block your ex from contacts but she breaks into your house!');
              // Add the FUDer image
            const ExImage = `
                <div>
                    <img src="https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2/images/ex.jpg?raw=true" alt="FUDer" style="width: 200px; height: auto;"/>
                </div>
            `;
            gameOutput.innerHTML += ExImage; // Add the image to the game output
            //mana = Math.min(mana + 2, maxMana);
            //updateGameOutput(`Mana: ${mana}/${maxMana}`);
            enemy = enemies.find(e => e.name === "Your Ex");
            presentAttackOptions(level, hasLobo, mana, maxMana, enemy);
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
    // Call to present new options after the choice
    //presentNewOptions(level, hasLobo, mana, maxMana);
}


function presentAttackOptions(level, hasLobo, mana, maxMana, enemy) {
    const gameOutput = document.getElementById('game-output');
    let attackOptions = `<div><p>Choose your attack method against ${enemy.name}:</p>`;

    // Level-based attack options
    if (level >= 1) {
        attackOptions += `<button onclick="handleAttackChoice('bite', ${level}, ${hasLobo}, ${mana}, ${maxMana}, '${enemy.name}')">Bite (0 mana)</button>`;
    }
    if (level >= 3) {
        attackOptions += `<button onclick="handleAttackChoice('scratch', ${level}, ${hasLobo}, ${mana}, ${maxMana}, '${enemy.name}')">Scratch (1 mana)</button>`;
    }
    if (level >= 5) {
        attackOptions += `<button onclick="handleAttackChoice('pee on them', ${level}, ${hasLobo}, ${mana}, ${maxMana}, '${enemy.name}')">Pee on them (2 mana)</button>`;
    }
    if (level >= 8) {
        attackOptions += `<button onclick="handleAttackChoice('psyop', ${level}, ${hasLobo}, ${mana}, ${maxMana}, '${enemy.name}')">Psyop (3 mana)</button>`;
    }
    if (level === 10) {
        attackOptions += `<button onclick="handleAttackChoice('laser eyes', ${level}, ${hasLobo}, ${mana}, ${maxMana}, '${enemy.name}')">Laser Eyes (4 mana)</button>`;
    }

    attackOptions += `</div>`;
    gameOutput.innerHTML += attackOptions;
}


window.handleAttackChoice = function(attackType, level, hasLobo, mana, maxMana, enemyName) {
    let attackModifier = 0;
    let manaCost = 0;

    // Apply different bonuses based on the attack type and set mana cost
    if (attackType === 'bite') {
        attackModifier = 0; // Small bonus
        manaCost = 0;
    } else if (attackType === 'scratch') {
        attackModifier = 1; // Medium bonus
        manaCost = 1;
    } else if (attackType === 'pee on them') {
        attackModifier = Math.floor(Math.random() * 6) - 4; // Risky
        manaCost = 2;
    } else if (attackType === 'psyop') {
        attackModifier = 4; // Strong attack
        manaCost = 3;
    } else if (attackType === 'laser eyes') {
        attackModifier = 6; // Ultimate attack
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

    // Find the enemy by name
    const enemy = enemies.find(e => e.name === enemyName);
    simulateFight(level, attackModifier, hasLobo, mana, maxMana, enemy);
};

function simulateFight(level, attackModifier, hasLobo, mana, maxMana, enemy) {
    // Player roll
    const playerRoll = Math.floor(Math.random() * 20) + 1 + Math.round(level / 2) + attackModifier;

    // Enemy roll
    const enemyRoll = Math.floor(Math.random() * 20) + 1;

    // Display rolls
    updateGameOutput(`You roll a ${playerRoll} including your level bonus and attack modifier. The ${enemy.name} rolls a ${enemyRoll}.`);

    // Determine the outcome
    if (playerRoll > enemyRoll) {
        updateGameOutput(`You win the fight against ${enemy.name}!`);

        // Display the dead enemy image
        const deadEnemyImage = `
            <div>
                <img src="${enemy.deadImage}" alt="Dead ${enemy.name}" style="width: 200px; height: auto;"/>
            </div>
        `;
        const gameOutput = document.getElementById('game-output');
        gameOutput.innerHTML += deadEnemyImage;

        // Refill some mana after a win
        mana = Math.min(mana + 1, maxMana);
        updateGameOutput(`You regain 1 mana! Current Mana: ${mana}/${maxMana}`);
    } else {
        updateGameOutput(`You lose the fight against ${enemy.name}...`);

        // Display the dead dog image (player lost)
        const deadDogImage = `
            <div>
                <img src="https://github.com/88Csharp88/dog-text-adventure/blob/main/images/Dead%20Dog.png?raw=true" alt="Dead Dog" style="width: 200px; height: auto;"/>
            </div>
        `;
        const gameOutput = document.getElementById('game-output');
        gameOutput.innerHTML += deadDogImage;

        // Check if the player has a LOBO companion and give a second chance
        if (hasLobo) {
            updateGameOutput(`But wait! Your LOBO companion bites ${enemy.name}, giving you another chance!`);

            // Display the Lobo image
            const loboImage = `
                <div>
                    <img src="https://github.com/88Csharp88/dog-text-adventure/blob/main/images/Lobo.jpg?raw=true" alt="Lobo" style="width: 200px; height: auto;"/>
                </div>
            `;
            gameOutput.innerHTML += loboImage;

            // Simulate a second fight with the same attack method
            const secondPlayerRoll = Math.floor(Math.random() * 20) + 1 + Math.round(level / 2) + attackModifier;
            const secondEnemyRoll = Math.floor(Math.random() * 20) + 1;

            updateGameOutput(`You roll a ${secondPlayerRoll} with LOBO’s help. The ${enemy.name} rolls a ${secondEnemyRoll}.`);

            if (secondPlayerRoll > secondEnemyRoll) {
                updateGameOutput(`With LOBO’s help, you win the fight against ${enemy.name}!`);

                const deadEnemyImage2 = `
                    <div>
                        <img src="${enemy.deadImage}" alt="Dead ${enemy.name}" style="width: 200px; height: auto;"/>
                    </div>
                `;
                gameOutput.innerHTML += deadEnemyImage2;

                // Refill some mana after a win
                mana = Math.min(mana + 1, maxMana);
                updateGameOutput(`You regain 1 mana! Current Mana: ${mana}/${maxMana}`);
            } else {
                updateGameOutput(`Even with LOBO’s interference, you still lose the fight against ${enemy.name}...`);
                
                // Display the dead dog image (player lost again)
                const deadDogImage2 = `
                    <div>
                        <img src="https://github.com/88Csharp88/dog-text-adventure/blob/main/images/Dead%20Dog.png?raw=true" alt="Dead Dog" style="width: 200px; height: auto;"/>
                    </div>
                `;
                gameOutput.innerHTML += deadDogImage2;
            }
        }
    }
}



