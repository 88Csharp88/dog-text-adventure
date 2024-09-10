async function checkDOGBalance() {
    // Fetch the wallet address from the input field
    const address = document.getElementById('walletAddress').value;
    const outputElement = document.getElementById('output');

    // Log to confirm the function is being called
    console.log('Function checkDOGBalance called');
    console.log('Wallet address entered:', address);

    // Clear previous output and indicate that transactions are being fetched
    outputElement.innerText = 'Fetching transactions...';

    try {
        // Make the API call to fetch transactions for the specified address
        console.log(`Fetching transactions from: https://blockstream.info/api/address/${address}/txs`);
        const response = await fetch(`https://blockstream.info/api/address/${address}/txs`);

        // Check if the response is OK (status code 200)
        if (!response.ok) {
            console.error('Failed to fetch transactions:', response.status, response.statusText);
            outputElement.innerText = 'Failed to fetch transactions. Please check the wallet address.';
            return;
        }

        // Parse the response as JSON
        const transactions = await response.json();
        console.log('Fetched transactions:', transactions);

        let dogBalance = 0;

        // Loop through transactions to find $DOG Rune transfers
        transactions.forEach(tx => {
            tx.vout.forEach(output => {
                if (output.scriptpubkey_type === 'op_return') {
                    // Log the OP_RETURN scriptpubkey to understand the data format
                    console.log('OP_RETURN scriptpubkey:', output.scriptpubkey);

                    // Attempt to parse Rune-related data
                    const runeData = parseRuneData(output.scriptpubkey);
                    console.log('Parsed Rune Data:', runeData);

                    // Check if the parsed data matches $DOG tokens and accumulate the balance
                    if (runeData.token === '$DOG') {
                        dogBalance += runeData.amount;
                    }
                }
            });
        });

        // Display the calculated $DOG balance
        console.log('$DOG Balance calculated:', dogBalance);
        outputElement.innerText = `$DOG Balance: ${dogBalance}`;
    } catch (error) {
        // Log any errors encountered during the fetch or processing
        console.error('Error fetching transactions:', error);
        outputElement.innerText = 'Failed to fetch transactions. Please try again.';
    }
}

// Placeholder function for parsing Rune data from OP_RETURN script
function parseRuneData(scriptpubkey) {
    // Convert hex-encoded scriptpubkey to ASCII to inspect the content
    const decodedData = hexToAscii(scriptpubkey);

    // Log the decoded data for debugging purposes
    console.log('Decoded OP_RETURN data:', decodedData);

    // Replace this logic with the correct parsing for your $DOG Rune encoding
    if (decodedData.includes('DOG_IDENTIFIER')) { // Replace with the actual identifier for $DOG tokens
        // Extract amount based on known encoding (customize this as needed)
        const amount = extractAmount(decodedData);
        console.log('Extracted amount:', amount);
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

// Helper function to convert hex to ASCII
function hexToAscii(hex) {
    let str = '';
    for (let i = 0; i < hex.length; i += 2) {
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return str;
}

// Hypothetical function to extract amount from the decoded data
function extractAmount(data) {
    // Adjust the logic to correctly parse the amount based on the encoding standard
    const amountMatch = data.match(/amount:(\d+)/); // Modify regex based on actual format
    return amountMatch ? parseInt(amountMatch[1], 10) : 0;
}
