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

    // Select the first 2 options
    const selectedOptions = allOptions.slice(0, 2);

    let options = `<div><p>You painfully open your eyes. Your neck and back are aching. You slowly realize you fell asleep in your computer chair and have drooled all over your keyboard. You are surrounded by empty cans and empty take out boxes. You rub your eyes and prepare to begin your day. What would you like to do next?:</p>`;
    selectedOptions.forEach(option => {
        options += `<button onclick="handleNewChoice('${option.action}', ${level}, ${hasLobo}, ${mana}, ${maxMana}, ${hitpoints}, ${maxHitpoints}, ${gold}, ${maxGold})">${option.text}</button>`;
    });

    options += `</div>`;
    gameOutput.innerHTML += options;
}

function presentSecondOptions(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold) {
    const gameOutput = document.getElementById('game-output');
    gameOutput.innerHTML = ''; // Clear previous output

    // Random events
    const randomEventChance = Math.random();
    if (randomEventChance < 0.05) {
        displayRandomEvent("call", level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
    } else if (randomEventChance < 0.10) {
        displayRandomEvent("knock", level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
    } else if (randomEventChance < 0.15) {
        displayRandomEvent("text", level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
    } else if (randomEventChance < 0.20) {
        displayRandomEvent("barking", level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
    } else {
        // No random event, show normal options
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

        // Select the first 2 options
        const selectedOptions = allOptions.slice(0, 2);

        // Check if the player has enough gold and if Leonidas appears
        if (gold >= 20 && Math.random() < 0.33) {
            selectedOptions.push({
                text: 'Fight the bosses with Leonidas\'s help',
                action: 'fight bosses'
            });
        }

        let options = `<div><p>What would you like to do next?:</p>`;
        selectedOptions.forEach(option => {
            options += `<button onclick="handleNewChoice('${option.action}', ${level}, ${hasLobo}, ${mana}, ${maxMana}, ${hitpoints}, ${maxHitpoints}, ${gold}, ${maxGold})">${option.text}</button>`;
        });

        options += `</div>`;
        gameOutput.innerHTML += options;
    }
}

// Helper function to display random event
function displayRandomEvent(eventType, level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold) {
    const gameOutput = document.getElementById('game-output');
    let message = '';

    switch (eventType) {
        case 'call':
            message = "Your ring tone blasts in your ear which startles you. You check your phone and realize it is from a random number. Do you want to answer?";
            break;
        case 'knock':
            message = "You hear a pounding on the back door. You are startled and annoyed. Do you want to answer the back door?";
            break;
        case 'text':
            message = "Your cell phone chimes loudly which upsets you. You received a text message from a random number. Do you care to read it?";
            break;
        case 'barking':
            message = "You hear barking outside. Those barking dogs just won't quit. You are getting annoyed. Do you want to go check it out?";
            break;
    }

    gameOutput.innerHTML = `<p>${message}</p>
                            <button onclick="handleRandomEvent('${eventType}', ${level}, ${hasLobo}, ${mana}, ${maxMana}, ${hitpoints}, ${maxHitpoints}, ${gold}, ${maxGold})">Yes</button>
                            <button onclick="presentSecondOptions(${level}, ${hasLobo}, ${mana}, ${maxMana}, ${hitpoints}, ${maxHitpoints}, ${gold}, ${maxGold})">No</button>`;
}

function handleRandomEvent(eventType, level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold) {
    const gameOutput = document.getElementById('game-output');
    gameOutput.innerHTML = ''; // Clear the output

    let outcomeMessage = '';
    let gain = 0; // To store the amount gained or lost

    // Define messages for gains and losses
    const messages = {
        call: {
            gain: [
                "You accept the call and it is your scum bag friend. Lucky for you she decideds today is the day she will pay you back some gold she owes you.",
                "You answer the call. Its some guy that lives down the road. He saw your post about selling your old computer parts. You unload old parts on him for some gold."
            ],
            lose: [
                "Crap! Its your credit card company. They tell you that you need to pony up now or they're going to destroy your life.",
                "Damn... its your old friend. He needs some money and convinces you to give him some gold. At least you're a good friend."
            ]
        },
        knock: {
            gain: [
                "Its your mad dad. He was locked out of the house. He was thankful that you helped him and gave you some stale bread.",
                "Its a frantic pizza delivery lady. She explains she's been trying to deliver this pizza but no one is answering. She says its paid for. You take the pizza and run."
            ],
            lose: [
                "Its one of your ex girlfriends. She starts yelling but you zone out. She smacks you across the head and gets in her boyfriends car and speeds away.",
                "Its the jerk-off coach for the junior tackle football team. He's pissed that you burned him on social media. He kicks you in the shin and walks away to his trashy house."
            ]
        },
        text: {
            gain: [
                "Its your old companion. She reminds you that you are wonderful no matter what people have to say about you. You feel inspired.",
                "Its a debt collector but you convince them you will pay them back next week. You feel less stressed out."
            ],
            lose: [
                "You open the text and it shorts your phone out. You spend a long time trying to get your phone to turn back on and become exhausted.",
                "You open the text and see an unwanted image of someone's body parts. You feel sick!"
            ]
        },
        barking: {
            gain: [
                "You walk outside and see two dogs fighting. You break up the fight and chase a stray dog away. The owner of the remaining dog is thankful and gives you a candy bar.",
                "You walk outside and see two dogs that have a young kid pinned up against a brick wall. You chase the dogs away. The kid gives you his energy drink."
            ],
            lose: [
                "As soon as you walk outside a dog bites you in the leg and runs away. WTF was that?!",
                "You walk outside and see two dogs fighting. They stop fighting and chase you around the block. You jump a fence and land in a thorn bush."
            ]
        }
    };

    // Determine the outcome based on the event type
    const diceRoll = Math.floor(Math.random() * 6) + 1; // Roll a dice (1-6)

    switch (eventType) {
        case 'call':
            gain = (diceRoll === 6) ? 2 : -1;
            gold += gain; // Adjust gold
            outcomeMessage = gain > 0 ? messages.call.gain[Math.floor(Math.random() * messages.call.gain.length)] :
                                         messages.call.lose[Math.floor(Math.random() * messages.call.lose.length)];
                        outcomeMessage += ` You ${gain > 0 ? 'gain' : 'lose'} ${Math.abs(gain)} gold. You now have ${gold} gold.`;
            break;
        case 'knock':
            gain = (diceRoll === 6) ? 2 : -1;
            hitpoints += gain; // Adjust hitpoints
            outcomeMessage = gain > 0 ? messages.knock.gain[Math.floor(Math.random() * messages.knock.gain.length)] :
                                         messages.knock.lose[Math.floor(Math.random() * messages.knock.lose.length)];
                        outcomeMessage += ` You ${gain > 0 ? 'gain' : 'lose'} ${Math.abs(gain)} hitpoint${Math.abs(gain) !== 1 ? 's' : ''}. You now have ${hitpoints} hitpoints.`;
            break;
        case 'text':
            gain = (diceRoll === 6) ? 1 : -1;
            mana += gain; // Adjust mana
            outcomeMessage = gain > 0 ? messages.text.gain[Math.floor(Math.random() * messages.text.gain.length)] :
                                         messages.text.lose[Math.floor(Math.random() * messages.text.lose.length)];
                        outcomeMessage += ` You ${gain > 0 ? 'gain' : 'lose'} ${Math.abs(gain)} mana. You now have ${mana} mana.`;
            break;
        case 'barking':
            gain = (diceRoll === 6) ? 1 : -1;
            hitpoints += gain; // Adjust hitpoints
            outcomeMessage = gain > 0 ? messages.barking.gain[Math.floor(Math.random() * messages.barking.gain.length)] :
                                         messages.barking.lose[Math.floor(Math.random() * messages.barking.lose.length)];
                        outcomeMessage += ` You ${gain > 0 ? 'gain' : 'lose'} ${Math.abs(gain)} hitpoint${Math.abs(gain) !== 1 ? 's' : ''}. You now have ${hitpoints} hitpoints.`;
            break;
    }

    gameOutput.innerHTML += `<p>${outcomeMessage}</p>`;
    
    // Display the continue button
    gameOutput.innerHTML += `<button onclick="presentSecondOptions(${level}, ${hasLobo}, ${mana}, ${maxMana}, ${hitpoints}, ${maxHitpoints}, ${gold}, ${maxGold})">Continue your adventure</button>`;
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

    //updateGameOutput(`You chose to ${choice}.`);

    let enemy;

    switch (choice) {
        
    case 'log onto socials':
        // Define possible outcomes
        const outcomes = [
            {
                message: 'You log onto socials. You begin shilling $DOG but come across a strange poster. You read their content and want to puke. You comment against their post to try to talk some sense into them. Oh crap! You just started a fight with a FUDer!!!',
                enemyName: 'FUDer',
                image: 'https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2-of-2/images/FUDer.jpg?raw=true'
            },
            {
                message: 'You start shilling $DOG and hear your DMs chime. Would you like to answer the DM?',
                enemyName: null,
                image: null
            },
            {
                message: 'You come across a post by another $DOG influencer. Would you like to read the post?',
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
        if (outcome.message.includes('hear your DMs chime')) {
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
                    ? `You open up the DM and its just a chum telling you that you are doing a great job. You gain a follower which increases your mana. Current Mana: ${mana}/${maxMana}` 
                    : `You open the DM and someone starts asking about your portfolio. Before you know it they are trying to get you to join their private shill group. You've wasted your time and lost mana. Current Mana: ${mana}/${maxMana}`;
                
                updateGameOutput(manaChangeMessage);
                addContinueButton(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
            });

            ignoreDMButton.addEventListener('click', () => {
                buttonContainer.removeChild(openDMButton);
                buttonContainer.removeChild(ignoreDMButton); // Remove the open button
                updateGameOutput("You ignore the DM and continue your adventure. You hope you made the right decision.");
                addContinueButton(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
            });
        } 
        
        // If it's reading a post by the influencer
        else if (outcome.message.includes('by another $DOG influencer')) {
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
                    ? `You read a fantasic post from a popular influence. It inspires you to create a meme in the replies. The influencer loves it and sends you some crypto. You gain some gold. Current Gold: ${gold}/${maxGold}` 
                    : `You read a post from the popular influencer. It inspires you to invest into a new project. Suddenly the project rugs and you realize it was an impersonator. You lose some gold. Current Gold: ${gold}/${maxGold}`;
                
                updateGameOutput(goldChangeMessage);
                addContinueButton(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
            });

            ignorePostButton.addEventListener('click', () => {
                buttonContainer.removeChild(readPostButton);
                buttonContainer.removeChild(ignorePostButton); // Remove the read button
                updateGameOutput("You ignore the post and continue your adventure. Perhaps it was the right decision.");
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
            message: 'You code yourself into exhaustion but your application is not finished yet. What would you like to do?',
            effect: 'mana' // Indicates that this will affect mana
        },
        {
            message: 'You finally finish the beta version of your application but feel uncertain about it. Do you want to try to compile your code?',
            effect: 'hitpoints' // Indicates that this will affect hitpoints
        },
        {
            message: 'You get deep into coding. You are slamming drinks and mowing through fast food. Your room is hazy and begins to stink. Suddenly your cursor begins to move on its own... someone takes control of your computer remotely! You encounter a hacker!!!',
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
                ? `You power through 2 more hours of coding. It was so worth it. Your application is splendid. You feel accomplished and regain some mana. Current Mana: ${mana}/${maxMana}` 
                : `You power through 2 more hours of coding. Your eyes hurt and the screen gets blurry. The lines of code start making no sense but you don't stop. Crap! You scramble to code so bad you have to delete everything. You rage quit and lose some mana. Current Mana: ${mana}/${maxMana}`;
            
            updateGameOutput(manaChangeMessage);
            addContinueButton(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
        });

        ignoreCodingButton.addEventListener('click', () => {
            buttonContainer.removeChild(continueCodingButton);
            buttonContainer.removeChild(ignoreCodingButton); // Remove the continue button
            updateGameOutput("You ignore the coding and continue your adventure. Perhaps a good choice... Perhaps not.");
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
                ? `You pray your application will work and begin the compilation. Thankfully it works! You immediately find a buyer and sell the code. You buy more fast food and gain some hit points. Current Hitpoints: ${hitpoints}/${maxHitpoints}` 
                : `You hope for the best and begin the compilation. You smell something funny. You hear a grinding noise. Your desktop is overheating! You rip off the cover and sparks fly out of your machine. You are injured and lose some hitpoints. Current Hitpoints: ${hitpoints}/${maxHitpoints}`;
            
            updateGameOutput(hitpointsChangeMessage);
            addContinueButton(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
        });

        ignoreCompileButton.addEventListener('click', () => {
            buttonContainer.removeChild(compileButton);
            buttonContainer.removeChild(ignoreCompileButton); // Remove the compile button
            updateGameOutput("You ignore the compilation and continue your adventure. Sometimes it is best to just walk away...");
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
            message: "Your ex's mom calls you! Uuuhhhhghghgg... Do you want to deal with your ex-future mother-in-law?",
            effect: 'mana' // Indicates that this will affect mana
        },
        {
            message: "*tap* *tap* *tap* What is that noise? *tap* *tap* *tap* Someone is at your window? Do you wish to check it out?",
            effect: 'gold' // Indicates that this will affect gold
        },
        {
            message: "You block your ex and begin to feel relaxed. *sniff* *sniff* What is that smell? You know that smell a mile away. Its her disgusting dollar store perfume... You puke in your mouth as your heart drops. Your ex broke into your house!!!",
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
                ? `You ex's mom begins talking to you. She is surprisingly understanding. She tells you your ex has checked into the mental hospital and her mom apologizes for everything she has put you through. You feel recharged and gain some mana. Current Mana: ${mana}/${maxMana}` 
                : `Your ex's mom begins screeching into the phone; matching the tone of her unmanageable daughter. She gives you a headache faster than you can hang up the phone. You lose some mana as you feel sorry for her poor husband. Current Mana: ${mana}/${maxMana}`;
            
            updateGameOutput(manaChangeMessage);
            addContinueButton(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
        });

        ignoreCallButton.addEventListener('click', () => {
            buttonContainer.removeChild(answerCallButton);
            buttonContainer.removeChild(ignoreCallButton); // Remove the answer button
            updateGameOutput("You ignore the call and continue your adventure. Hopefully it was a good move, anon.");
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
                ? `You pull back the blinds and see your crazy ex. You call the police as she scatters into the dark ally next door. As she runs away you notice she drops some money. You walk outside cautiously and grab her cash. You gain some gold. Current Gold: ${gold}/${maxGold}` 
                : `You pull back the curtains and you see your crazy ex with her face pressed up against the window. You realize that you can either take her out for pizza or she will try to kill you. You suffer through a dinner with her. You lose some gold. Current Gold: ${gold}/${maxGold}`;
            
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
            message: "You walk until it become dark out and find yourself outside of the graveyard. Something inside of you wants to walk in. Something inside of you wants to stay away. What will you do?",
            effect: 'health' // Indicates that this will affect health
        },
        {
            message: "You walk down to the local gas station. You sort of feel like hanging out on the corner but you feel kind of blah. What do you decide?",
            effect: 'gold' // Indicates that this will affect gold
        },
        {
            message: "You take a walk and begin to feel relaxed.... maybe too relaxed. Suddenly you have to empty your bladder. You are not going to make it home before you have to piss. You begin urinating on a garage just as the home owner walks around the corner. They are NOT happy and approach you with a weapon!",
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
                ? `You enter the grave yard and start kicking some rocks around. You read a few grave stones. You decide to sit in the grass. You look to your right... what is that? Some expired beef jerky still in the wrapper. You indulge and regain some health. Current Health: ${hitpoints}/${maxHitpoints}` 
                : `You enter the grave yard and begin reading grave stones. You look up at the moon. Wow! Its so beautiful. Ow! Its so painful! What was that?! I rabid racoon has sliced at your leg before scuttling off into the woods. You lose some hitpoints. Current Health: ${hitpoints}/${maxHitpoints}`;
            
            updateGameOutput(healthChangeMessage);
            addContinueButton(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
        });

        ignoreGraveyardButton.addEventListener('click', () => {
            buttonContainer.removeChild(exploreGraveyardButton);
            buttonContainer.removeChild(ignoreGraveyardButton); // Remove the explore button
            updateGameOutput("You ignore the graveyard and continue your walk. An eery haze falls on the hills.");
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
                ? `You decide to hang on the corner for a minute. You take a peak into the dumpster and see a pizza box. You retreive it and begin to exam it. Just then some guy approaches you and asks if you are selling the pizza. You sell him the dumpster pizza and gain some gold. Current Gold: ${gold}/${maxGold}` 
                : `You hang out for a while and get really bored. You walk into the gas station and try to fill a slushie container. The slushie comes out funky as hell but the loser owner still charges you. You walk out of the gas station and throw the full slushie at a gas pump. You lose some gold. Current Gold: ${gold}/${maxGold}`;
            
            updateGameOutput(goldChangeMessage);
            addContinueButton(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
        });

        ignoreGasStationButton.addEventListener('click', () => {
            buttonContainer.removeChild(checkGasStationButton);
            buttonContainer.removeChild(ignoreGasStationButton); // Remove the check button
            updateGameOutput("You ignore the gas station and continue your walk. Hopefully you made the correct decision.");
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
            message: "You debate on the pros and cons of incorporating advertisement for your video. What is your choice?",
            effect: 'gold' // Indicates that this will affect gold
        },
        {
            message: "You prepare to post your influencer video but your screen starts getting really screwy. Son of a gun. Your computer is glitching out.",
            effect: 'hitpoints' // Indicates that this will affect hitpoints
        },
        {
            message: "You post your video and immediately get a reaction... ughgh.. but its a troll. The troll starts getting engagement. You furiously post back at the hater. Damn! They roped you in! You realize you're in a battle with a hater!!!",
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
                ? `You decide to enable advertising for your video. Lucky for you it pays off. You get some engagement and a little bit of cash. Good job, anon. You gain some gold. Current Gold: ${gold}/${maxGold}` 
                : `You decide to enable advertising which does not sit well with your viewers. You refresh your page and realize you lost some subscribers and potential income. You lost some gold. Current Gold: ${gold}/${maxGold}`;
            
            updateGameOutput(goldChangeMessage);
            addContinueButton(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
        });

        ignoreAdsButton.addEventListener('click', () => {
            buttonContainer.removeChild(enableAdsButton);
            buttonContainer.removeChild(ignoreAdsButton); // Remove the enable button
            updateGameOutput("You ignore advertisements and continue your day. You feel indifferent from this decision.");
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
                ? `You get on your hands and knees and start wiggling chords around. Thankfully it was a simple fix. You press your connections further into your monitor and your screen is working perfectly... and what's this? Half of a burrito. Its only a few days old. You eat it and gain some hitpoints. Current Hitpoints: ${hitpoints}/${maxHitpoints}` 
                : `You mess with your wires, your hardware and your software. You are getting no where. A rage starts to build inside of you! A flash of light crosses your mind and the next thing you know your bloody fist has gone through the dry wall again. You are injured and lose some hitpoints. Current Hitpoints: ${hitpoints}/${maxHitpoints}`;
            
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
            message: "You decide to walk to the park. This makes you thirsty. You notice a public water founting covered in used chewing gum and rust... but you are thirsty. Do you take a drink?",
            effect: 'hitpoints' // Indicates that this will affect hitpoints
        },
        {
            message: "You decided to bring your disc with you. Do you fancy a round of disc golf?",
            effect: 'mana' // Indicates that this will affect mana
        },
        {
            message: "You hear clattering of chains and dogs barking. You look over your shoulder to see a worker from animal control aggressively attempting to capture a poor dog. You can not stand for this kind of abuse! A rage comes over you and you approach the dog snatcher with ill intent!!!",
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
                ? `You decide to drink from the fountain. You are surprised by the crystal clear water as it quenches your thirst. You feel great and gain a hitpoint. Current Hitpoints: ${hitpoints}/${maxHitpoints}` 
                : `You prepare for a refreshing drink but you are met with an off-color sludge that finds its way into your mouth. You vomit in the grass and lose a hitpoint. Current Hitpoints: ${hitpoints}/${maxHitpoints}`;
            
            updateGameOutput(hitpointsChangeMessage);
            addContinueButton(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
        });

        ignoreFountainButton.addEventListener('click', () => {
            buttonContainer.removeChild(drinkFountainButton);
            buttonContainer.removeChild(ignoreFountainButton); // Remove the drink button
            updateGameOutput("You ignore the fountain and continue your park visit. You decide to let the next civilian try their luck.");
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
                ? `You stretch your arms out and throw your disc. Hole-in-one! You are feeling fantastic about your throw and gain some mana. Current Mana: ${mana}/${maxMana}` 
                : `You get to hole three and can not stand yourself. You are throwing like garbage. You are playing like garbage. You feel frustrated and lose some mana. Current Mana: ${mana}/${maxMana}`;
            
            updateGameOutput(manaChangeMessage);
            addContinueButton(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
        });

        ignoreDiscGolfButton.addEventListener('click', () => {
            buttonContainer.removeChild(playDiscGolfButton);
            buttonContainer.removeChild(ignoreDiscGolfButton); // Remove the play button
            updateGameOutput("You ignore disc golf and continue your park visit. Maybe next time, anon.");
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
    // Define possible outcomes
    const outcomes7 = [
        {
            message: "You hate the trenches but you will need burritos and slushies to survive. Do you want to apply for a new job?",
            effect: 'gold' // Indicates that this will affect gold
        },
        {
            message: "You log onto the dex screener and find something that might 100x over night. Do you decide to invest?",
            effect: 'gold' // Indicates that this will also affect gold
        },
        {
            message: "You hear a scratching at your front door. Your curiosity gets the best of you. You open the front door and are greeted with a slimey, yellow smile. Its the tax man! He wants your house. You don't have the money... There is only one way out!",
            effect: 'fight', // Indicates that this will trigger a fight
            enemyName: 'Tax Collector',
            image: 'https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2-of-2/images/TaxCollector.jpg?raw=true'
        }
    ];

    // Generate a random index
    const randomIndex7 = Math.floor(Math.random() * outcomes7.length);
    const outcome7 = outcomes7[randomIndex7];

    // Update game output with the selected outcome
    updateGameOutput(outcome7.message);

    // If the outcome is applying for a new job
    if (outcome7.effect === 'gold' && outcome7.message.includes("apply for a new job")) {
        const buttonContainer = document.getElementById('button-container');

        // Create buttons for applying or ignoring
        const applyJobButton = document.createElement('button');
        applyJobButton.textContent = "Apply for a new job";
        buttonContainer.appendChild(applyJobButton);

        const ignoreJobButton = document.createElement('button');
        ignoreJobButton.textContent = "Ignore and relax";
        buttonContainer.appendChild(ignoreJobButton);

        applyJobButton.addEventListener('click', () => {
            buttonContainer.removeChild(applyJobButton);
            buttonContainer.removeChild(ignoreJobButton); // Remove the ignore button

            // 50/50 chance to increase or decrease gold
            const goldChange = Math.random() < 0.5 ? 1 : -1; // 50% chance
            gold = Math.min(Math.max(gold + goldChange, 0), maxGold); // Ensure gold stays within bounds
            
            const goldChangeMessage = goldChange > 0 
                ? `You find a quick cash paying job cutting grass for an old witch. You drink her nasty leomade after you clean up her yard. You gain some gold. Current Gold: ${gold}/${maxGold}` 
                : `You end up signing up for some scam trying to fill out surveys on-line. You feel like an idiot loser as you lose some gold. Current Gold: ${gold}/${maxGold}`;
            
            updateGameOutput(goldChangeMessage);
            addContinueButton(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
        });

        ignoreJobButton.addEventListener('click', () => {
            buttonContainer.removeChild(applyJobButton);
            buttonContainer.removeChild(ignoreJobButton); // Remove the apply button
            updateGameOutput("You ignore job applications and just relax. Damn The Man.");
            addContinueButton(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
        });
    }

    // If the outcome is investing in memecoins
    else if (outcome7.effect === 'gold' && outcome7.message.includes("100x")) {
        const buttonContainer = document.getElementById('button-container');

        // Create buttons for investing or ignoring
        const investMemecoinsButton = document.createElement('button');
        investMemecoinsButton.textContent = "Invest in memecoins";
        buttonContainer.appendChild(investMemecoinsButton);

        const ignoreMemecoinsButton = document.createElement('button');
        ignoreMemecoinsButton.textContent = "Ignore and relax";
        buttonContainer.appendChild(ignoreMemecoinsButton);

        investMemecoinsButton.addEventListener('click', () => {
            buttonContainer.removeChild(investMemecoinsButton);
            buttonContainer.removeChild(ignoreMemecoinsButton); // Remove the ignore button

            // 50/50 chance to increase or decrease gold
            const goldChange = Math.random() < 0.5 ? 1 : -1; // 50% chance
            gold = Math.min(Math.max(gold + goldChange, 0), maxGold); // Ensure gold stays within bounds
            
            const goldChangeMessage = goldChange > 0 
                ? `You ape the rest of your crypto into a memecoin. You paperhand at the first green candle just before it rugs. Well played, anon. You gain some gold. Current Gold: ${gold}/${maxGold}` 
                : `You chip some crypto into this memecoin... just as it rugs. The dev deletes their social account. Its over. You lose some gold. Current Gold: ${gold}/${maxGold}`;
            
            updateGameOutput(goldChangeMessage);
            addContinueButton(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
        });

        ignoreMemecoinsButton.addEventListener('click', () => {
            buttonContainer.removeChild(investMemecoinsButton);
            buttonContainer.removeChild(ignoreMemecoinsButton); // Remove the invest button
            updateGameOutput("You ignore investing and just relax. There is always next time.");
            addContinueButton(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
        });
    }

    // If the outcome is to fight the Tax Collector
    else if (outcome7.effect === 'fight') {
        const taxCollectorImage = `
            <div>
                <img src="${outcome7.image}" alt="${outcome7.enemyName}" style="width: 200px; height: auto;"/>
            </div>
        `;
        gameOutput.innerHTML += taxCollectorImage; // Add the image to the game output
        enemy = enemies.find(e => e.name === outcome7.enemyName);
        presentAttackOptions(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold, enemy);
    }
    break;
         case 'play video games':
    // Define possible outcomes
    const outcomes8 = [
        {
            message: "You are indifferent on what you would like to play. Would you like to play games on the internet?",
            effect: 'gold' // Indicates that this will affect gold
        },
        {
            message: "You look at your old gaming consoles and get a tingling feeling in your stomach as you remember all the good times you had. Do you wish to play a retro game?",
            effect: 'mana' // Indicates that this will affect mana
        },
        {
            message: "You sink into your chair and you are nearing your high-score. This is it! You're going to do it... but what is that stomping noise? Oh no! Your Dad stumbles downstairs pissed that you are wasting your life! He raises his hand at you... here we go again D:",
            effect: 'fight', // Indicates that this will trigger a fight
            enemyName: 'Mad Dad',
            image: 'https://github.com/88Csharp88/dog-text-adventure/blob/testing-game2-of-2/images/MadDad.jpg?raw=true'
        }
    ];

    // Generate a random index
    const randomIndex8 = Math.floor(Math.random() * outcomes8.length);
    const outcome8 = outcomes8[randomIndex8];

    // Update game output with the selected outcome
    updateGameOutput(outcome8.message);

    // If the outcome is playing video games online
    if (outcome8.effect === 'gold' && outcome8.message.includes("play games on the internet")) {
        const buttonContainer = document.getElementById('button-container');

        // Create buttons for playing online or ignoring
        const playOnlineButton = document.createElement('button');
        playOnlineButton.textContent = "Play video games online";
        buttonContainer.appendChild(playOnlineButton);

        const ignoreOnlineButton = document.createElement('button');
        ignoreOnlineButton.textContent = "Ignore and do something else";
        buttonContainer.appendChild(ignoreOnlineButton);

        playOnlineButton.addEventListener('click', () => {
            buttonContainer.removeChild(playOnlineButton);
            buttonContainer.removeChild(ignoreOnlineButton); // Remove the ignore button

            // 50/50 chance to increase or decrease gold
            const goldChange = Math.random() < 0.5 ? 1 : -1; // 50% chance
            gold = Math.min(Math.max(gold + goldChange, 0), maxGold); // Ensure gold stays within bounds
            
            const goldChangeMessage = goldChange > 0 
                ? `You play some games on-line and decide to go live on a streaming platform. You impress some rando with your skills and they donate a little cash. You earn some gold. Current Gold: ${gold}/${maxGold}` 
                : `You play some games on-line with your friends but they are whooping your ass. You convince yourself to visit the in-game store to buy upgrades. You lose some gold. Current Gold: ${gold}/${maxGold}`;
            
            updateGameOutput(goldChangeMessage);
            addContinueButton(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
        });

        ignoreOnlineButton.addEventListener('click', () => {
            buttonContainer.removeChild(playOnlineButton);
            buttonContainer.removeChild(ignoreOnlineButton); // Remove the play button
            updateGameOutput("You ignore online games and find something else to do.");
            addContinueButton(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
        });
    }

    // If the outcome is plugging in the retro console
    else if (outcome8.effect === 'mana' && outcome8.message.includes("retro game")) {
        const buttonContainer = document.getElementById('button-container');

        // Create buttons for plugging in or ignoring
        const plugInButton = document.createElement('button');
        plugInButton.textContent = "plug in the retro console";
        buttonContainer.appendChild(plugInButton);

        const ignoreRetroButton = document.createElement('button');
        ignoreRetroButton.textContent = "Ignore and do something else";
        buttonContainer.appendChild(ignoreRetroButton);

        plugInButton.addEventListener('click', () => {
            buttonContainer.removeChild(plugInButton);
            buttonContainer.removeChild(ignoreRetroButton); // Remove the ignore button

            // 50/50 chance to increase or decrease mana
            const manaChange = Math.random() < 0.5 ? 1 : -1; // 50% chance
            mana = Math.min(Math.max(mana + manaChange, 0), maxMana); // Ensure mana stays within bounds
            
            const manaChangeMessage = manaChange > 0 
                ? `You have so much fun re-living your youth! You realize that others would like this and check the value of the cartridge. You decide to keep the cartridge but you are thrilled with the price. You gain some mana. Current Mana: ${mana}/${maxMana}` 
                : `You plug in your gaming console but it begins to smell like burning plastic. Nothing happens when you try to power it on. It gets hot. It smokes. Crap...you lose your console and feel defeated. You lose some mana. Current Mana: ${mana}/${maxMana}`;
            
            updateGameOutput(manaChangeMessage);
            addContinueButton(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
        });

        ignoreRetroButton.addEventListener('click', () => {
            buttonContainer.removeChild(plugInButton);
            buttonContainer.removeChild(ignoreRetroButton); // Remove the plug-in button
            updateGameOutput("You ignore the retro console and find something else to do. Probably no time for that anyway at this age.");
            addContinueButton(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold);
        });
    }

    // If the outcome is to fight Mad Dad
    else if (outcome8.effect === 'fight') {
        const madDadImage = `
            <div>
                <img src="${outcome8.image}" alt="${outcome8.enemyName}" style="width: 200px; height: auto;"/>
            </div>
        `;
        gameOutput.innerHTML += madDadImage; // Add the image to the game output
        enemy = enemies.find(e => e.name === outcome8.enemyName);
        presentAttackOptions(level, hasLobo, mana, maxMana, hitpoints, maxHitpoints, gold, maxGold, enemy);
    }
    break;
        case 'fight bosses':
            updateGameOutput('Suddenly Leonidas appears in front of you. Leonidas speaks:"You are the chosen one. I have been watching you. I have been waiting for a soldier to collect 20 gold. There is a great evil that has set up their base on our moon. Will you exchange this 20 gold for rocket fuel to get to the moon and fight this source of pure evil? IT IS YOUR DESTINY!" You travel with Leonidas to the moon and exit the rocket ship. You hear a low moaning behind you. You turn around to see Zombie Elon shuffeling your way. Leonidas turns to you and says, "This is your time. This is your destiny. Fight my soldier."');
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
             updateGameOutput('Leonidas looks at your as proud as can be. "There is one final great evil on this rock," he states. Leonidas points your to a dark cave. "Go in there and face your destiny soldier. You are the one." You walk cautiously into the cave and find yourself face to face with the greatest evil in this univers. You find yoursel face to face with Gary Gensler! Prepare yourself!');
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

        // Add gold with a 80% chance
        if (randomChance2 < 0.8) {
            gold = Math.min(gold + 3, maxGold);
            updateGameOutput(`You earn 3 gold! Current Gold: ${gold}/${maxGold}`);
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

                // Add gold with a 80% chance
                if (randomChance2 < 0.8) {
                    gold = Math.min(gold + 3, maxGold);
                    updateGameOutput(`You earn 3 gold! Current Gold: ${gold}/${maxGold}`);
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
        updateGameOutput(`You win! You have defeated the great evil in this universe. You travel back to Earth in Leonidas' rocket ship. On the way home he exchanges a galactic high-five. "The moon was your destiny soldier," he praises. "You have made the $DOG army proud!"`);
        // You could add any additional game-over logic here, like showing a restart button.
    }

