window.startGame = function(dogBalance, loboBalance) {
    const gameOutput = document.getElementById('game-output');

    // Clear the output box for a fresh start
    gameOutput.innerHTML = '';

    const level = calculateLevel(dogBalance);
    const hasLobo = loboBalance > 1;
    let mana = level; // Initialize mana based on level
    let hitpoints = level*2; //Initialize hitpoints based on level times two
    let gold = 0; //Initialize gold
    const maxMana = 20; // Set maximum mana
    const maxHitpoints = 20; // Set maximum hitpoints
    const maxGold = 20; //Set maximum gold
  
    // Prompt the user to choose a class
    chooseClass(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);

    // Display initial game information
    updateGameOutput(`Starting game with DOG balance: ${dogBalance} and LOBO balance: ${loboBalance}`);
};

function chooseClass(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold) {
    const gameOutput = document.getElementById('game-output');
    const buttonContainer = document.getElementById('button-container');

    updateGameOutput('Choose your class:');
    const classes = ['Warrior', 'Mage', 'Merchant'];
    
    classes.forEach(cls => {
        const classButton = document.createElement('button');
        classButton.textContent = cls;
        buttonContainer.appendChild(classButton);

        classButton.addEventListener('click', () => {
            // Adjust stats based on chosen class
            if (cls === 'Warrior') {
                hitpoints += 5;
            } else if (cls === 'Mage') {
                mana += 10;
            } else if (cls === 'Merchant') {
                gold += 5;
            }

            // Clamp values to max limits
            mana = Math.min(mana, maxMana);
            hitpoints = Math.min(hitpoints, maxHitpoints);
            gold = Math.min(gold, maxGold);

            // Clear the buttons before starting the adventure
            buttonContainer.innerHTML = '';

            // Display updated stats
            updateGameOutput(`You have chosen the ${cls} class!`);
            updateGameOutput(`Mana: ${mana}/${maxMana}`);
            updateGameOutput(`Hitpoints: ${hitpoints}/${maxHitpoints}`);
            updateGameOutput(`Gold: ${gold}/${maxGold}`);
            
            // Start the adventure with the chosen stats
            startAdventure(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
        });
    });
}

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

function startAdventure(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold) {
    const gameOutput = document.getElementById('game-output');
    const buttonContainer = document.getElementById('button-container'); // Ensure this exists in your HTML

    // Clear initial content
    const initialContent = document.getElementById('address-form');
    const resultDiv = document.getElementById('result');
    const dogImage = document.querySelector('img'); // Assuming the dog image is the first img tag

    // Remove or hide the initial content
    if (initialContent) {
        initialContent.style.display = 'none'; // Hide the form
    }
    if (resultDiv) {
        resultDiv.style.display = 'none'; // Hide the result display
    }
   
    if (level > 0) {
        updateGameOutput(`You begin your journey as Level ${level}!`);
        if (hasLobo) {
            updateGameOutput('Your Lobo companion joins you, ready to fight!');
        } else {
            updateGameOutput('You venture alone, but determined.');
        }

        // Create a "Ready to Start" button
        const startButton = document.createElement('button');
        startButton.textContent = "Start your adventure";
        buttonContainer.appendChild(startButton);

        // Add event listener to the button
        startButton.addEventListener('click', () => {
            // Remove the button after clicking
            buttonContainer.removeChild(startButton);
            
            // Proceed with the next part of the adventure
            presentNewOptions(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
        });
    } else {
        updateGameOutput('You do not have enough DOG to start the adventure. Gather more to level up!');
    }
}

function presentNewOptions(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold) {
    const gameOutput = document.getElementById('game-output');
    gameOutput.innerHTML = ''; // Clear previous output

    const allOptions = [
        { text: 'Log onto socials', action: 'log onto socials' },
        { text: 'Begin coding a $DOG application', action: 'coding' },
        { text: 'Block your ex from contacts', action: 'block your ex' },
        { text: 'Take a walk', action: 'take a walk' },
        { text: 'Make a $DOG influencer video', action: 'influencer video' },
        { text: 'Go to the park', action: 'go to the park' },
        { text: 'Quit your job', action: 'quit your job' },
        { text: 'Play video games', action: 'play video games' }
    ];

    // Shuffle options
    for (let i = allOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
    }

    // Select the first 3 options
    const selectedOptions = allOptions.slice(0, 3);

    let options = `<div><p>You awake from your slumber. Choose an action:</p>`;
    selectedOptions.forEach(option => {
        options += `<button onclick="handleNewChoice('${option.action}', ${level}, ${hasLobo}, ${mana}, ${maxMana}, ${hitpoints}, ${maxHitpoints}, ${gold}, ${maxGold})">${option.text}</button>`;
    });

    options += `</div>`;
    gameOutput.innerHTML += options;
}

function presentSecondOptions(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold) {
    const gameOutput = document.getElementById('game-output');
    gameOutput.innerHTML = ''; // Clear previous output

    const allOptions = [
        { text: 'Log onto socials', action: 'log onto socials' },
        { text: 'Begin coding a $DOG application', action: 'coding' },
        { text: 'Block your ex from contacts', action: 'block your ex' },
        { text: 'Take a walk', action: 'take a walk' },
        { text: 'Make a $DOG influencer video', action: 'influencer video' },
        { text: 'Go to the park', action: 'go to the park' },
        { text: 'Quit your job', action: 'quit your job' },
        { text: 'Play video games', action: 'play video games' }
    ];

    // Shuffle options
    for (let i = allOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
    }

    // Select the first 3 options
    const selectedOptions = allOptions.slice(0, 3);

    // Check if the player has enough gold and if Leonidas appears
    if (gold >= 20 && Math.random() < 0.33) {
        selectedOptions.push({
            text: 'Fight the bosses with Leonidas\'s help',
            action: 'fight bosses'
        });
    }

    let options = `<div><p>What would you like to do next? Choose an action:</p>`;
    selectedOptions.forEach(option => {
        options += `<button onclick="handleNewChoice('${option.action}', ${level}, ${hasLobo}, ${mana}, ${maxMana}, ${hitpoints}, ${maxHitpoints}, ${gold}, ${maxGold})">${option.text}</button>`;
    });

    options += `</div>`;
    gameOutput.innerHTML += options;
}

// Define an array of enemies
const enemies = [
    { name: "FUDer", 
        image: "https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2-of-2/images/FUDer.jpg?raw=true",
        deadImage: "https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2-of-2/images/DeadFUDer.jpg?raw=true"
    },
    
    { name: "Gary Gensler", 
         image: "https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2-of-2/images/GaryGensler.jpg?raw=true",
        deadImage: "https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2-of-2/images/DeadGaryGensler.jpg?raw=true"
    },
    
    { name: "Your Ex", 
         image: "https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2-of-2/images/ex.jpg?raw=true",
        deadImage: "https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2-of-2/images/Deadex.jpg?raw=true"
    }, 
    
    { name: "Tax Collector", 
         image: "https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2-of-2/images/TaxCollector.jpg?raw=true",
        deadImage: "https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2-of-2/images/DeadTaxCollector.jpg?raw=true"
    }, 
    
    { name: "Hacker", 
     image: "https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2-of-2/images/Hacker.jpg?raw=true",
        deadImage: "https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2-of-2/images/DeadHacker.jpg?raw=true"
    }, 
    
    { name: "Zombie Elon", 
         image: "https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2-of-2/images/ZombieElon.jpg?raw=true",
         deadImage: "https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2-of-2/images/DeadZombieElon.jpg?raw=true"
    }, 
    
    { name: "Hater", 
         image: "https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2-of-2/images/Hater.jpg?raw=true",
        deadImage: "https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2-of-2/images/DeadHater.jpg?raw=true"
    }, 
    
    { name: "Animal Control", 
         image: "https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2-of-2/images/AnimalControl.jpg?raw=true",
        deadImage: "https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2-of-2/images/DeadAnimalControl.jpg?raw=true"
    }, 
    
    { name: "Mad Dad", 
         image: "https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2-of-2/images/MadDad.jpg?raw=true",
        deadImage: "https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2-of-2/images/DeadMadDad.jpg?raw=true"
    },
    
    { name: "Toxic Neighbor", 
         image: "https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2-of-2/images/ToxicNeighbor.jpg?raw=true",
        deadImage: "https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2-of-2/images/DeadToxicNeighbor.jpg?raw=true"
    } 
];

function handleNewChoice(choice, level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold) {
    const gameOutput = document.getElementById('game-output');
    gameOutput.innerHTML = ''; // Clear previous output

    updateGameOutput(`You chose to ${choice}.`);

    let enemy;

    switch (choice) {
        
    case 'log onto socials':
        // Define possible outcomes
        const outcomes = [
            {
                message: 'You log onto socials and encounter a FUDer!',
                enemyName: 'FUDer',
                image: 'https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2-of-2/images/FUDer.jpg?raw=true'
            },
            {
                message: 'You receive a DM from a $DOG influencer!',
                enemyName: null,
                image: null
            },
            {
                message: 'You read an interesting post by a $DOG influencer!',
                enemyName: null,
                image: null
            }
        ];

        // Generate a random index
        const randomIndex = Math.floor(Math.random() * outcomes.length);
        const outcome = outcomes[randomIndex];

        // Update game output with the selected outcome
        updateGameOutput(outcome.message);

        // If it's the DM from the influencer
        if (outcome.message.includes('DM from a $DOG influencer')) {
            const buttonContainer = document.getElementById('button-container');

            // Create buttons for opening or ignoring the DM
            const openDMButton = document.createElement('button');
            openDMButton.textContent = "Open DM";
            buttonContainer.appendChild(openDMButton);

            const ignoreDMButton = document.createElement('button');
            ignoreDMButton.textContent = "Ignore DM";
            buttonContainer.appendChild(ignoreDMButton);

            openDMButton.addEventListener('click', () => {
                buttonContainer.removeChild(openDMButton);
                buttonContainer.removeChild(ignoreDMButton); // Remove the ignore button

                // 50/50 chance to increase or decrease mana
                const manaChange = Math.random() < 0.5 ? 1 : -1; // 50% chance
                mana = Math.min(Math.max(mana + manaChange, 0), maxMana); // Ensure mana stays within bounds
                
                const manaChangeMessage = manaChange > 0 
                    ? `You gain 1 mana! Current Mana: ${mana}/${maxMana}` 
                    : `You lose 1 mana! Current Mana: ${mana}/${maxMana}`;
                
                updateGameOutput(manaChangeMessage);
                addContinueButton(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
            });

            ignoreDMButton.addEventListener('click', () => {
                buttonContainer.removeChild(openDMButton);
                buttonContainer.removeChild(ignoreDMButton); // Remove the open button
                updateGameOutput("You ignore the DM and continue your adventure.");
                addContinueButton(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
            });
        } 
        
        // If it's reading a post by the influencer
        else if (outcome.message.includes('interesting post by a $DOG influencer')) {
            const buttonContainer = document.getElementById('button-container');

            // Create buttons for reading or ignoring the post
            const readPostButton = document.createElement('button');
            readPostButton.textContent = "Read Post";
            buttonContainer.appendChild(readPostButton);

            const ignorePostButton = document.createElement('button');
            ignorePostButton.textContent = "Ignore Post";
            buttonContainer.appendChild(ignorePostButton);

            readPostButton.addEventListener('click', () => {
                buttonContainer.removeChild(readPostButton);
                buttonContainer.removeChild(ignorePostButton); // Remove the ignore button

                // 50/50 chance to increase or decrease gold
                const goldChange = Math.random() < 0.5 ? 1 : -1; // 50% chance
                gold = Math.min(Math.max(gold + goldChange, 0), maxGold); // Ensure gold stays within bounds
                
                const goldChangeMessage = goldChange > 0 
                    ? `You earn 1 gold! Current Gold: ${gold}/${maxGold}` 
                    : `You lose 1 gold! Current Gold: ${gold}/${maxGold}`;
                
                updateGameOutput(goldChangeMessage);
                addContinueButton(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
            });

            ignorePostButton.addEventListener('click', () => {
                buttonContainer.removeChild(readPostButton);
                buttonContainer.removeChild(ignorePostButton); // Remove the read button
                updateGameOutput("You ignore the post and continue your adventure.");
                addContinueButton(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
            });
        } 
        
        // Handle other outcomes (like encountering an enemy)
        else if (outcome.enemyName) {
            const enemyImage = `
                <div>
                    <img src="${outcome.image}" alt="${outcome.enemyName}" style="width: 200px; height: auto;"/>
                </div>
            `;
            gameOutput.innerHTML += enemyImage; // Add the image to the game output
            enemy = enemies.find(e => e.name === outcome.enemyName);
            presentAttackOptions(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold, enemy);
        }
        break;
        case 'coding':
    // Define possible outcomes
    const codingOutcomes = [
        {
            message: 'You decide to continue coding for 2 more hours!',
            effect: 'mana' // Indicates that this will affect mana
        },
        {
            message: 'You try to compile your code!',
            effect: 'hitpoints' // Indicates that this will affect hitpoints
        },
        {
            message: 'You encounter a Hacker!',
            effect: 'fight', // Indicates that this will trigger a fight
            enemyName: 'Hacker',
            image: 'https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2-of-2/images/Hacker.jpg?raw=true'
        }
    ];

    // Generate a random index
    const randomIndex2 = Math.floor(Math.random() * codingOutcomes.length);
    const outcome2 = codingOutcomes[randomIndex2];

    // Update game output with the selected outcome
    updateGameOutput(outcome2.message);

    // If the outcome is to continue coding
    if (outcome2.effect === 'mana') {
        const buttonContainer = document.getElementById('button-container');

        // Create buttons for continuing coding or ignoring
        const continueCodingButton = document.createElement('button');
        continueCodingButton.textContent = "Continue coding for 2 more hours";
        buttonContainer.appendChild(continueCodingButton);

        const ignoreCodingButton = document.createElement('button');
        ignoreCodingButton.textContent = "Ignore and continue your adventure";
        buttonContainer.appendChild(ignoreCodingButton);

        continueCodingButton.addEventListener('click', () => {
            buttonContainer.removeChild(continueCodingButton);
            buttonContainer.removeChild(ignoreCodingButton); // Remove the ignore button

            // 50/50 chance to increase or decrease mana
            const manaChange = Math.random() < 0.5 ? 1 : -1; // 50% chance
            mana = Math.min(Math.max(mana + manaChange, 0), maxMana); // Ensure mana stays within bounds
            
            const manaChangeMessage = manaChange > 0 
                ? `You gain 1 mana! Current Mana: ${mana}/${maxMana}` 
                : `You lose 1 mana! Current Mana: ${mana}/${maxMana}`;
            
            updateGameOutput(manaChangeMessage);
            addContinueButton(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
        });

        ignoreCodingButton.addEventListener('click', () => {
            buttonContainer.removeChild(continueCodingButton);
            buttonContainer.removeChild(ignoreCodingButton); // Remove the continue button
            updateGameOutput("You ignore the coding and continue your adventure.");
            addContinueButton(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
        });
    } 
    
    // If the outcome is to try to compile code
    else if (outcome2.effect === 'hitpoints') {
        const buttonContainer = document.getElementById('button-container');

        // Create buttons for compiling or ignoring
        const compileButton = document.createElement('button');
        compileButton.textContent = "Try to compile your code";
        buttonContainer.appendChild(compileButton);

        const ignoreCompileButton = document.createElement('button');
        ignoreCompileButton.textContent = "Ignore and continue your adventure";
        buttonContainer.appendChild(ignoreCompileButton);

        compileButton.addEventListener('click', () => {
            buttonContainer.removeChild(compileButton);
            buttonContainer.removeChild(ignoreCompileButton); // Remove the ignore button

            // 50/50 chance to increase or decrease hitpoints
            const hitpointsChange = Math.random() < 0.5 ? 1 : -1; // 50% chance
            hitpoints = Math.max(hitpoints + hitpointsChange, 0); // Ensure hitpoints stay above 0
            
            const hitpointsChangeMessage = hitpointsChange > 0 
                ? `You gain 1 hitpoint! Current Hitpoints: ${hitpoints}/${maxHitpoints}` 
                : `You lose 1 hitpoint! Current Hitpoints: ${hitpoints}/${maxHitpoints}`;
            
            updateGameOutput(hitpointsChangeMessage);
            addContinueButton(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
        });

        ignoreCompileButton.addEventListener('click', () => {
            buttonContainer.removeChild(compileButton);
            buttonContainer.removeChild(ignoreCompileButton); // Remove the compile button
            updateGameOutput("You ignore the compilation and continue your adventure.");
            addContinueButton(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
        });
    } 
    
    // If the outcome is to fight the Hacker
    else if (outcome2.effect === 'fight') {
        const hackerImage = `
            <div>
                <img src="${outcome2.image}" alt="${outcome2.enemyName}" style="width: 200px; height: auto;"/>
            </div>
        `;
        gameOutput.innerHTML += hackerImage; // Add the image to the game output
        enemy = enemies.find(e => e.name === outcome2.enemyName);
        presentAttackOptions(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold, enemy);
    }
    break;
        case 'block your ex':
    // Define possible outcomes
    const outcomes3 = [
        {
            message: "Your ex's mom calls you!",
            effect: 'mana' // Indicates that this will affect mana
        },
        {
            message: "There is a knock at your window!",
            effect: 'gold' // Indicates that this will affect gold
        },
        {
            message: "You encounter your ex!",
            effect: 'fight', // Indicates that this will trigger a fight
            enemyName: 'Your Ex',
            image: 'https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2-of-2/images/ex.jpg?raw=true'
        }
    ];

    // Generate a random index
    const randomIndex3 = Math.floor(Math.random() * outcomes3.length);
    const outcome3 = outcomes3[randomIndex3];

    // Update game output with the selected outcome
    updateGameOutput(outcome3.message);

    // If the outcome is your ex's mom calling
    if (outcome3.effect === 'mana') {
        const buttonContainer = document.getElementById('button-container');

        // Create buttons for answering or ignoring
        const answerCallButton = document.createElement('button');
        answerCallButton.textContent = "Answer the call from your ex's mom";
        buttonContainer.appendChild(answerCallButton);

        const ignoreCallButton = document.createElement('button');
        ignoreCallButton.textContent = "Ignore the call and continue your adventure";
        buttonContainer.appendChild(ignoreCallButton);

        answerCallButton.addEventListener('click', () => {
            buttonContainer.removeChild(answerCallButton);
            buttonContainer.removeChild(ignoreCallButton); // Remove the ignore button

            // 50/50 chance to increase or decrease mana
            const manaChange = Math.random() < 0.5 ? 1 : -1; // 50% chance
            mana = Math.min(Math.max(mana + manaChange, 0), maxMana); // Ensure mana stays within bounds
            
            const manaChangeMessage = manaChange > 0 
                ? `You gain 1 mana! Current Mana: ${mana}/${maxMana}` 
                : `You lose 1 mana! Current Mana: ${mana}/${maxMana}`;
            
            updateGameOutput(manaChangeMessage);
            addContinueButton(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
        });

        ignoreCallButton.addEventListener('click', () => {
            buttonContainer.removeChild(answerCallButton);
            buttonContainer.removeChild(ignoreCallButton); // Remove the answer button
            updateGameOutput("You ignore the call and continue your adventure.");
            addContinueButton(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
        });
    } 
    
    // If the outcome is the knock at your window
    else if (outcome3.effect === 'gold') {
        const buttonContainer = document.getElementById('button-container');

        // Create buttons for checking the window or ignoring
        const checkWindowButton = document.createElement('button');
        checkWindowButton.textContent = "Check the window";
        buttonContainer.appendChild(checkWindowButton);

        const ignoreWindowButton = document.createElement('button');
        ignoreWindowButton.textContent = "Ignore the knock and continue your adventure";
        buttonContainer.appendChild(ignoreWindowButton);

        checkWindowButton.addEventListener('click', () => {
            buttonContainer.removeChild(checkWindowButton);
            buttonContainer.removeChild(ignoreWindowButton); // Remove the ignore button

            // 50/50 chance to increase or decrease gold
            const goldChange = Math.random() < 0.5 ? 1 : -1; // 50% chance
            gold = Math.min(Math.max(gold + goldChange, 0), maxGold); // Ensure gold stays within bounds
            
            const goldChangeMessage = goldChange > 0 
                ? `You find 1 gold! Current Gold: ${gold}/${maxGold}` 
                : `You lose 1 gold! Current Gold: ${gold}/${maxGold}`;
            
            updateGameOutput(goldChangeMessage);
            addContinueButton(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
        });

        ignoreWindowButton.addEventListener('click', () => {
            buttonContainer.removeChild(checkWindowButton);
            buttonContainer.removeChild(ignoreWindowButton); // Remove the check button
            updateGameOutput("You ignore the knock and continue your adventure.");
            addContinueButton(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
        });
    } 
    
    // If the outcome is to fight your ex
    else if (outcome3.effect === 'fight') {
        const exImage = `
            <div>
                <img src="${outcome3.image}" alt="${outcome3.enemyName}" style="width: 200px; height: auto;"/>
            </div>
        `;
        gameOutput.innerHTML += exImage; // Add the image to the game output
        enemy = enemies.find(e => e.name === outcome3.enemyName);
        presentAttackOptions(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold, enemy);
    }
    break;
        case 'take a walk':
    // Define possible outcomes
    const outcomes4 = [
        {
            message: "You enter the graveyard!",
            effect: 'health' // Indicates that this will affect health
        },
        {
            message: "You hang out at the gas station!",
            effect: 'gold' // Indicates that this will affect gold
        },
        {
            message: "You encounter the Toxic Neighbor!",
            effect: 'fight', // Indicates that this will trigger a fight
            enemyName: 'Toxic Neighbor',
            image: 'https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2-of-2/images/ToxicNeighbor.jpg?raw=true'
        }
    ];

    // Generate a random index
    const randomIndex4 = Math.floor(Math.random() * outcomes4.length);
    const outcome4 = outcomes4[randomIndex4];

    // Update game output with the selected outcome
    updateGameOutput(outcome4.message);

    // If the outcome is entering the graveyard
    if (outcome4.effect === 'health') {
        const buttonContainer = document.getElementById('button-container');

        // Create buttons for exploring or ignoring
        const exploreGraveyardButton = document.createElement('button');
        exploreGraveyardButton.textContent = "Explore the graveyard";
        buttonContainer.appendChild(exploreGraveyardButton);

        const ignoreGraveyardButton = document.createElement('button');
        ignoreGraveyardButton.textContent = "Ignore and continue your walk";
        buttonContainer.appendChild(ignoreGraveyardButton);

        exploreGraveyardButton.addEventListener('click', () => {
            buttonContainer.removeChild(exploreGraveyardButton);
            buttonContainer.removeChild(ignoreGraveyardButton); // Remove the ignore button

            // 50/50 chance to increase or decrease health
            const healthChange = Math.random() < 0.5 ? 1 : -1; // 50% chance
            hitpoints = Math.max(hitpoints + healthChange, 0); // Ensure health stays above 0
            
            const healthChangeMessage = healthChange > 0 
                ? `You gain 1 health point! Current Health: ${hitpoints}/${maxHitpoints}` 
                : `You lose 1 health point! Current Health: ${hitpoints}/${maxHitpoints}`;
            
            updateGameOutput(healthChangeMessage);
            addContinueButton(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
        });

        ignoreGraveyardButton.addEventListener('click', () => {
            buttonContainer.removeChild(exploreGraveyardButton);
            buttonContainer.removeChild(ignoreGraveyardButton); // Remove the explore button
            updateGameOutput("You ignore the graveyard and continue your walk.");
            addContinueButton(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
        });
    } 
    
    // If the outcome is hanging out at the gas station
    else if (outcome4.effect === 'gold') {
        const buttonContainer = document.getElementById('button-container');

        // Create buttons for checking the gas station or ignoring
        const checkGasStationButton = document.createElement('button');
        checkGasStationButton.textContent = "Check the gas station";
        buttonContainer.appendChild(checkGasStationButton);

        const ignoreGasStationButton = document.createElement('button');
        ignoreGasStationButton.textContent = "Ignore and continue your walk";
        buttonContainer.appendChild(ignoreGasStationButton);

        checkGasStationButton.addEventListener('click', () => {
            buttonContainer.removeChild(checkGasStationButton);
            buttonContainer.removeChild(ignoreGasStationButton); // Remove the ignore button

            // 50/50 chance to increase or decrease gold
            const goldChange = Math.random() < 0.5 ? 1 : -1; // 50% chance
            gold = Math.min(Math.max(gold + goldChange, 0), maxGold); // Ensure gold stays within bounds
            
            const goldChangeMessage = goldChange > 0 
                ? `You find 1 gold! Current Gold: ${gold}/${maxGold}` 
                : `You lose 1 gold! Current Gold: ${gold}/${maxGold}`;
            
            updateGameOutput(goldChangeMessage);
            addContinueButton(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
        });

        ignoreGasStationButton.addEventListener('click', () => {
            buttonContainer.removeChild(checkGasStationButton);
            buttonContainer.removeChild(ignoreGasStationButton); // Remove the check button
            updateGameOutput("You ignore the gas station and continue your walk.");
            addContinueButton(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
        });
    } 
    
    // If the outcome is to fight the Toxic Neighbor
    else if (outcome4.effect === 'fight') {
        const neighborImage = `
            <div>
                <img src="${outcome4.image}" alt="${outcome4.enemyName}" style="width: 200px; height: auto;"/>
            </div>
        `;
        gameOutput.innerHTML += neighborImage; // Add the image to the game output
        enemy = enemies.find(e => e.name === outcome4.enemyName);
        presentAttackOptions(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold, enemy);
    }
    break;
        case 'influencer video':
    // Define possible outcomes
    const outcomes5 = [
        {
            message: "You enable advertisements for your video!",
            effect: 'gold' // Indicates that this will affect gold
        },
        {
            message: "Your computer glitches!",
            effect: 'hitpoints' // Indicates that this will affect hitpoints
        },
        {
            message: "You encounter a Hater in the comments!",
            effect: 'fight', // Indicates that this will trigger a fight
            enemyName: 'Hater',
            image: 'https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2-of-2/images/Hater.jpg?raw=true'
        }
    ];

    // Generate a random index
    const randomIndex5 = Math.floor(Math.random() * outcomes5.length);
    const outcome5 = outcomes5[randomIndex5];

    // Update game output with the selected outcome
    updateGameOutput(outcome5.message);

    // If the outcome is enabling advertisements
    if (outcome5.effect === 'gold') {
        const buttonContainer = document.getElementById('button-container');

        // Create buttons for enabling or ignoring
        const enableAdsButton = document.createElement('button');
        enableAdsButton.textContent = "Enable advertisements for your video";
        buttonContainer.appendChild(enableAdsButton);

        const ignoreAdsButton = document.createElement('button');
        ignoreAdsButton.textContent = "Ignore and continue your day";
        buttonContainer.appendChild(ignoreAdsButton);

        enableAdsButton.addEventListener('click', () => {
            buttonContainer.removeChild(enableAdsButton);
            buttonContainer.removeChild(ignoreAdsButton); // Remove the ignore button

            // 50/50 chance to increase or decrease gold
            const goldChange = Math.random() < 0.5 ? 1 : -1; // 50% chance
            gold = Math.min(Math.max(gold + goldChange, 0), maxGold); // Ensure gold stays within bounds
            
            const goldChangeMessage = goldChange > 0 
                ? `You earn 1 gold from advertisements! Current Gold: ${gold}/${maxGold}` 
                : `You lose 1 gold from ad costs! Current Gold: ${gold}/${maxGold}`;
            
            updateGameOutput(goldChangeMessage);
            addContinueButton(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
        });

        ignoreAdsButton.addEventListener('click', () => {
            buttonContainer.removeChild(enableAdsButton);
            buttonContainer.removeChild(ignoreAdsButton); // Remove the enable button
            updateGameOutput("You ignore advertisements and continue your day.");
            addContinueButton(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
        });
    } 
    
    // If the outcome is a computer glitch
    else if (outcome5.effect === 'hitpoints') {
        const buttonContainer = document.getElementById('button-container');

        // Create buttons for troubleshooting or ignoring
        const troubleshootButton = document.createElement('button');
        troubleshootButton.textContent = "Troubleshoot your computer";
        buttonContainer.appendChild(troubleshootButton);

        const ignoreGlitchButton = document.createElement('button');
        ignoreGlitchButton.textContent = "Ignore the glitch and continue your day";
        buttonContainer.appendChild(ignoreGlitchButton);

        troubleshootButton.addEventListener('click', () => {
            buttonContainer.removeChild(troubleshootButton);
            buttonContainer.removeChild(ignoreGlitchButton); // Remove the ignore button

            // 50/50 chance to increase or decrease hitpoints
            const hitpointsChange = Math.random() < 0.5 ? 1 : -1; // 50% chance
            hitpoints = Math.max(hitpoints + hitpointsChange, 0); // Ensure hitpoints stay above 0
            
            const hitpointsChangeMessage = hitpointsChange > 0 
                ? `You regain 1 hitpoint after troubleshooting! Current Hitpoints: ${hitpoints}/${maxHitpoints}` 
                : `You lose 1 hitpoint due to the glitch! Current Hitpoints: ${hitpoints}/${maxHitpoints}`;
            
            updateGameOutput(hitpointsChangeMessage);
            addContinueButton(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
        });

        ignoreGlitchButton.addEventListener('click', () => {
            buttonContainer.removeChild(troubleshootButton);
            buttonContainer.removeChild(ignoreGlitchButton); // Remove the troubleshoot button
            updateGameOutput("You ignore the glitch and continue your day.");
            addContinueButton(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
        });
    } 
    
    // If the outcome is to fight the Hater
    else if (outcome5.effect === 'fight') {
        const haterImage = `
            <div>
                <img src="${outcome5.image}" alt="${outcome5.enemyName}" style="width: 200px; height: auto;"/>
            </div>
        `;
        gameOutput.innerHTML += haterImage; // Add the image to the game output
        enemy = enemies.find(e => e.name === outcome5.enemyName);
        presentAttackOptions(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold, enemy);
    }
    break;
        case 'go to the park':
    // Define possible outcomes
    const outcomes6 = [
        {
            message: "You drink from the public drinking fountain!",
            effect: 'hitpoints' // Indicates that this will affect hitpoints
        },
        {
            message: "You play a round of disc golf!",
            effect: 'mana' // Indicates that this will affect mana
        },
        {
            message: "You encounter Animal Control!",
            effect: 'fight', // Indicates that this will trigger a fight
            enemyName: 'Animal Control',
            image: 'https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2-of-2/images/AnimalControl.jpg?raw=true'
        }
    ];

    // Generate a random index
    const randomIndex6 = Math.floor(Math.random() * outcomes6.length);
    const outcome6 = outcomes6[randomIndex6];

    // Update game output with the selected outcome
    updateGameOutput(outcome6.message);

    // If the outcome is drinking from the fountain
    if (outcome6.effect === 'hitpoints') {
        const buttonContainer = document.getElementById('button-container');

        // Create buttons for drinking or ignoring
        const drinkFountainButton = document.createElement('button');
        drinkFountainButton.textContent = "Drink from the public drinking fountain";
        buttonContainer.appendChild(drinkFountainButton);

        const ignoreFountainButton = document.createElement('button');
        ignoreFountainButton.textContent = "Ignore and continue your park visit";
        buttonContainer.appendChild(ignoreFountainButton);

        drinkFountainButton.addEventListener('click', () => {
            buttonContainer.removeChild(drinkFountainButton);
            buttonContainer.removeChild(ignoreFountainButton); // Remove the ignore button

            // 50/50 chance to increase or decrease hitpoints
            const hitpointsChange = Math.random() < 0.5 ? 1 : -1; // 50% chance
            hitpoints = Math.max(hitpoints + hitpointsChange, 0); // Ensure hitpoints stay above 0
            
            const hitpointsChangeMessage = hitpointsChange > 0 
                ? `You gain 1 hitpoint from the fountain! Current Hitpoints: ${hitpoints}/${maxHitpoints}` 
                : `You lose 1 hitpoint from the fountain's questionable water! Current Hitpoints: ${hitpoints}/${maxHitpoints}`;
            
            updateGameOutput(hitpointsChangeMessage);
            addContinueButton(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
        });

        ignoreFountainButton.addEventListener('click', () => {
            buttonContainer.removeChild(drinkFountainButton);
            buttonContainer.removeChild(ignoreFountainButton); // Remove the drink button
            updateGameOutput("You ignore the fountain and continue your park visit.");
            addContinueButton(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
        });
    } 
    
    // If the outcome is playing disc golf
    else if (outcome6.effect === 'mana') {
        const buttonContainer = document.getElementById('button-container');

        // Create buttons for playing or ignoring
        const playDiscGolfButton = document.createElement('button');
        playDiscGolfButton.textContent = "Play a round of disc golf";
        buttonContainer.appendChild(playDiscGolfButton);

        const ignoreDiscGolfButton = document.createElement('button');
        ignoreDiscGolfButton.textContent = "Ignore and continue your park visit";
        buttonContainer.appendChild(ignoreDiscGolfButton);

        playDiscGolfButton.addEventListener('click', () => {
            buttonContainer.removeChild(playDiscGolfButton);
            buttonContainer.removeChild(ignoreDiscGolfButton); // Remove the ignore button

            // 50/50 chance to increase or decrease mana
            const manaChange = Math.random() < 0.5 ? 1 : -1; // 50% chance
            mana = Math.min(Math.max(mana + manaChange, 0), maxMana); // Ensure mana stays within bounds
            
            const manaChangeMessage = manaChange > 0 
                ? `You gain 1 mana from playing disc golf! Current Mana: ${mana}/${maxMana}` 
                : `You lose 1 mana from a bad throw! Current Mana: ${mana}/${maxMana}`;
            
            updateGameOutput(manaChangeMessage);
            addContinueButton(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
        });

        ignoreDiscGolfButton.addEventListener('click', () => {
            buttonContainer.removeChild(playDiscGolfButton);
            buttonContainer.removeChild(ignoreDiscGolfButton); // Remove the play button
            updateGameOutput("You ignore disc golf and continue your park visit.");
            addContinueButton(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
        });
    } 
    
    // If the outcome is to fight Animal Control
    else if (outcome6.effect === 'fight') {
        const animalControlImage = `
            <div>
                <img src="${outcome6.image}" alt="${outcome6.enemyName}" style="width: 200px; height: auto;"/>
            </div>
        `;
        gameOutput.innerHTML += animalControlImage; // Add the image to the game output
        enemy = enemies.find(e => e.name === outcome6.enemyName);
        presentAttackOptions(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold, enemy);
    }
    break;
         case 'quit your job':
            updateGameOutput('You quit your job but a tax collector shows up at your door!');
           //Add Hater Image
            const TaxCollectorImage = `
                <div>
                    <img src="https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2-of-2/images/TaxCollector.jpg?raw=true" alt="FUDer" style="width: 200px; height: auto;"/>
                </div>
            `;
            gameOutput.innerHTML += TaxCollectorImage; // Add the image to the game output
            enemy = enemies.find(e => e.name === "Tax Collector");
            presentAttackOptions(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold, enemy);
            break;
         case 'play video games':
            updateGameOutput('You start playing video games but your Dad comes down stairs pissed!');
           //Add Hater Image
            const MadDadImage = `
                <div>
                    <img src="https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2-of-2/images/MadDad.jpg?raw=true" alt="FUDer" style="width: 200px; height: auto;"/>
                </div>
            `;
            gameOutput.innerHTML += MadDadImage; // Add the image to the game output
            enemy = enemies.find(e => e.name === "Mad Dad");
            presentAttackOptions(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold, enemy);
            break;
        case 'fight bosses':
            updateGameOutput('It is time to fight Zombie Elon Musk!!!');
           //Add Zombie Elon Image
            const ZombieElonImage = `
                <div>
                    <img src="https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2-of-2/images/ZombieElon.jpg?raw=true" alt="FUDer" style="width: 200px; height: auto;"/>
                </div>
            `;
            gameOutput.innerHTML += ZombieElonImage; // Add the image to the game output
            enemy = enemies.find(e => e.name === "Zombie Elon");
            presentAttackOptions(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold, enemy);
            break;
        case 'fight final boss':    
             updateGameOutput('It is time to fight Gary Gensler!!!');
           //Add Gary Gensler Image
            const GaryGenslerImage = `
                <div>
                    <img src="https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2-of-2/images/GaryGensler.jpg?raw=true" alt="FUDer" style="width: 200px; height: auto;"/>
                </div>
            `;
            gameOutput.innerHTML += GaryGenslerImage; // Add the image to the game output
            enemy = enemies.find(e => e.name === "Gary Gensler");
            presentAttackOptions(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold, enemy);
            break;   
        default:
            updateGameOutput('Nothing happened.');
            break;
    }
    
}


function presentAttackOptions(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold, enemy) {
    const gameOutput = document.getElementById('game-output');
    let attackOptions = `<div><p>Choose your attack method against ${enemy.name}:</p>`;
   // Level-based attack options
    if (level >= 1) {
        attackOptions += `<button onclick="handleAttackChoice('bite', ${level}, ${hasLobo}, ${mana}, ${maxMana}, ${hitpoints}, ${maxHitpoints},${gold}, ${maxGold}, '${enemy.name}')">Bite (0 mana)</button>`;
    }
    if (level >= 3) {
        attackOptions += `<button onclick="handleAttackChoice('scratch', ${level}, ${hasLobo}, ${mana}, ${maxMana}, ${hitpoints}, ${maxHitpoints},${gold}, ${maxGold}, '${enemy.name}')">Scratch (1 mana)</button>`;
    }
    if (level >= 5) {
        attackOptions += `<button onclick="handleAttackChoice('pee on them', ${level}, ${hasLobo}, ${mana}, ${maxMana}, ${hitpoints}, ${maxHitpoints},${gold}, ${maxGold}, '${enemy.name}')">Pee on them (2 mana)</button>`;
    }
    if (level >= 8) {
        attackOptions += `<button onclick="handleAttackChoice('psyop', ${level}, ${hasLobo}, ${mana}, ${maxMana}, ${hitpoints}, ${maxHitpoints},${gold}, ${maxGold}, '${enemy.name}')">Psyop (3 mana)</button>`;
    }
    if (level === 10) {
        attackOptions += `<button onclick="handleAttackChoice('laser eyes', ${level}, ${hasLobo}, ${mana}, ${maxMana}, ${hitpoints}, ${maxHitpoints},${gold}, ${maxGold}, '${enemy.name}')">Laser Eyes (4 mana)</button>`;
    }

    attackOptions += `</div>`;
    gameOutput.innerHTML += attackOptions;
}


window.handleAttackChoice = function(attackType, level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold, enemyName) {
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
    simulateFight(level, attackModifier, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold, enemy);
};

function simulateFight(level, attackModifier, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold, enemy) {
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

        // Generate a random number between 0 and 1
        const randomChance = Math.random();
        const randomChance2 = Math.random();

        // Refill mana with a 70% chance
        if (randomChance < 0.7) {
            mana = Math.min(mana + 1, maxMana);
            updateGameOutput(`You regain 1 mana! Current Mana: ${mana}/${maxMana}`);
            }

        // Add gold with a 70% chance
        if (randomChance2 < 0.7) {
            gold = Math.min(gold + 1, maxGold);
            updateGameOutput(`You earn 1 gold! Current Gold: ${gold}/${maxGold}`);
            }

        //check to see if defeated enemy is Zombie Elon        
        if (enemy.name === 'Zombie Elon') {
            updateGameOutput("You defeated Zombie Elon!"); // Show defeat message
            const buttonContainer = document.getElementById('button-container');

            // Create and show the fight button
            const fightButton = document.createElement('button');
            fightButton.textContent = "Fight Final Boss";
            buttonContainer.appendChild(fightButton);
                    
            fightButton.addEventListener('click', () => {
            buttonContainer.removeChild(fightButton); // Remove the button
            updateGameOutput("Prepare yourself! A new challenge awaits as you face Gary Gensler!");
            handleNewChoice('fight final boss', level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
            });
             return; // Exit the current function
            }

        // Check if the defeated enemy is Gary Gensler
        if (enemy.name === 'Gary Gensler') {
            winGame();
            return; // Exit the current function
        }
        
        // Add continue button
        addContinueButton(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
        } else {
        updateGameOutput(`You lose the fight against ${enemy.name}...`);

        //Display the dead dog image (player lost)
        const deadDogImage = `
            <div>
                <img src="https://github.com/88Csharp88/dog-text-adventure/blob/main/images/Dead%20Dog.png?raw=true" alt="Dead Dog" style="width: 200px; height: auto;"/>
            </div>
        `;
        const gameOutput = document.getElementById('game-output');
        gameOutput.innerHTML += deadDogImage;

       if (!hasLobo) {
            hitpoints = Math.max(hitpoints - 3, 0);
            updateGameOutput(`You lose 3 hitpoints! Current Hitpoints: ${hitpoints}/${maxHitpoints}`);

            if (hitpoints === 0) {
                endGame();
                return;
            }
        }
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
                const gameOutput = document.getElementById('game-output');
                gameOutput.innerHTML += deadEnemyImage2;

               // Generate a random number between 0 and 1
                const randomChance = Math.random();
                const randomChance2 = Math.random();

                // Refill mana with a 70% chance
                if (randomChance < 0.7) {
                    mana = Math.min(mana + 1, maxMana);
                    updateGameOutput(`You regain 1 mana! Current Mana: ${mana}/${maxMana}`);
                    }

                // Add gold with a 70% chance
                if (randomChance2 < 0.7) {
                    gold = Math.min(gold + 1, maxGold);
                    updateGameOutput(`You earn 1 gold! Current Gold: ${gold}/${maxGold}`);
                    }

                // Check if the defeated enemy is Zombie Elon
                if (enemy.name === 'Zombie Elon') {
                    updateGameOutput("You defeated Zombie Elon!"); // Show defeat message
                    const buttonContainer = document.getElementById('button-container');

                    // Create and show the fight button
                    const fightButton = document.createElement('button');
                    fightButton.textContent = "Fight Final Boss";
                    buttonContainer.appendChild(fightButton);
                    
                   fightButton.addEventListener('click', () => {
                    buttonContainer.removeChild(fightButton); // Remove the button
                    updateGameOutput("Prepare yourself! A new challenge awaits as you face Gary Gensler!");
                    handleNewChoice('fight final boss', level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
                    });
                    return; // Exit the current function
                    }

                // Check if the defeated enemy is Gary Gensler
                if (enemy.name === 'Gary Gensler') {
                    winGame();
                    return; // Exit the current function
                    }
                
               // Add continue button
                addContinueButton(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
                } else {
                updateGameOutput(`Even with LOBO’s interference, you still lose the fight against ${enemy.name}...`);

                hitpoints = Math.max(hitpoints - 3, 0); // Deduct 3 HP, ensuring it doesn't go below 0
                updateGameOutput(`You lose 3 hitpoints! Current Hitpoints: ${hitpoints}/${maxHitpoints}`);

                // Check if hitpoints have reached 0
            if (hitpoints === 0) {
                endGame();
                return; // Exit the function to prevent further actions
                }
                // Add continue button
                addContinueButton(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
                        
            }     
               
            }
      
        }
    }
    function addContinueButton(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold) {
        const buttonContainer = document.getElementById('button-container');
        const continueButton = document.createElement('button');
        continueButton.textContent = "Continue your adventure?";
        buttonContainer.appendChild(continueButton);
    
        // Add event listener to the button
        continueButton.addEventListener('click', () => {
        buttonContainer.removeChild(continueButton); // Remove the button
        presentSecondOptions(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
    });
            
    }

    function endGame() {
        const gameOutput = document.getElementById('game-output');
        updateGameOutput(`Game Over! You have lost all your hitpoints...`);
        // You could add any additional game-over logic here, like showing a restart button.
    }

    function winGame() {
        const gameOutput = document.getElementById('game-output');
        updateGameOutput(`You win! You have defeated the final boss!`);
        // You could add any additional game-over logic here, like showing a restart button.
    }

