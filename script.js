async function checkDOGBalance() {
    const address = document.getElementById('walletAddress').value;
    const outputElement = document.getElementById('output');

    console.log('Function checkDOGBalance called');
    console.log('Wallet address entered:', address);

    outputElement.innerText = 'Fetching transactions...';

    try {
        console.log(`Fetching transactions from: https://blockstream.info/api/address/${address}/txs`);
        const response = await fetch(`https://blockstream.info/api/address/${address}/txs`);

        if (!response.ok) {
            console.error('Failed to fetch transactions:', response.status, response.statusText);
            outputElement.innerText = 'Failed to fetch transactions. Please check the wallet address.';
            return;
        }

        const transactions = await response.json();
        console.log('Fetched transactions:', transactions);

        let dogBalance = 0;

        transactions.forEach(tx => {
            tx.vout.forEach(output => {
                if (output.scriptpubkey_type === 'op_return') {
                    console.log('OP_RETURN scriptpubkey:', output.scriptpubkey);

                    const runeData = parseRuneData(output.scriptpubkey);
                    console.log('Parsed Rune Data:', runeData);

                    if (runeData.token === 'DOG•GO•TO•THE•MOON') {
                        dogBalance += runeData.amount;
                    }
                }
            });
        });

        console.log('$DOG Balance calculated:', dogBalance);
        outputElement.innerText = `$DOG Balance: ${dogBalance}`;
    } catch (error) {
        console.error('Error fetching transactions:', error);
        outputElement.innerText = 'Failed to fetch transactions. Please try again.';
    }
}

// Function to parse Rune data and look specifically for DOG•GO•TO•THE•MOON
function parseRuneData(scriptpubkey) {
    const decodedData = hexToAscii(scriptpubkey);
    console.log('Decoded OP_RETURN data:', decodedData);

    // Look for the specific Rune name
    if (decodedData.includes('DOG•GO•TO•THE•MOON')) {
        const amount = extractAmount(decodedData);
        console.log('Extracted amount:', amount);
        return {
            token: 'DOG•GO•TO•THE•MOON',
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
    // Adjust based on the encoding format of the Rune; here we use a simple pattern match
    const amountMatch = data.match(/amount:(\d+)/); // Replace with the actual pattern if needed
    return amountMatch ? parseInt(amountMatch[1], 10) : 0;
}
