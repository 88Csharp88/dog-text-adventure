async function checkDOGBalance() {
    const address = document.getElementById('walletAddress').value;
    const outputElement = document.getElementById('output');
    
    // Clear previous output
    outputElement.innerText = 'Fetching transactions...';
    
    try {
        const response = await fetch(`https://blockstream.info/api/address/${address}/txs`);
        const transactions = await response.json();
        
        let dogBalance = 0;

        // Parse transactions to find $DOG Rune transfers
        transactions.forEach(tx => {
            tx.vout.forEach(output => {
                if (output.scriptpubkey_type === 'op_return') {
                    // Log the OP_RETURN scriptpubkey to debug the output
                    console.log('OP_RETURN scriptpubkey:', output.scriptpubkey);

                    // Attempt to parse Rune-related data
                    const runeData = parseRuneData(output.scriptpubkey);
                    if (runeData.token === '$DOG') {
                        dogBalance += runeData.amount;  // Accumulate $DOG amount
                    }
                }
            });
        });

        // Display the calculated balance
        outputElement.innerText = `$DOG Balance: ${dogBalance}`;
    } catch (error) {
        console.error('Error fetching transactions:', error);
        outputElement.innerText = 'Failed to fetch transactions. Please try again.';
    }
}

// Placeholder function for parsing Rune data from OP_RETURN script
function parseRuneData(scriptpubkey) {
    // Convert hex-encoded scriptpubkey to ASCII to inspect the content
    const decodedData = hexToAscii(scriptpubkey);

    // Debug: Output the decoded data
    console.log('Decoded OP_RETURN data:', decodedData);

    // Replace this logic based on how $DOG tokens are encoded
    if (decodedData.includes('DOG_IDENTIFIER')) { // Replace with actual identifier
        // Extract amount based on known encoding (customize this)
        const amount = extractAmount(decodedData);
        return {
            token: '$DOG',
            amount: amount
        };
    }

    return {
        token: '',
        amount: 0
    };
}

// Example helper function to convert hex to ASCII
function hexToAscii(hex) {
    let str = '';
    for (let i = 0; i < hex.length; i += 2) {
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return str;
}

// Hypothetical function to extract amount based on data structure
function extractAmount(data) {
    // Adjust this logic to correctly parse amount based on encoding standard
    const amountMatch = data.match(/amount:(\d+)/); 
    return amountMatch ? parseInt(amountMatch[1], 10) : 0;
}
