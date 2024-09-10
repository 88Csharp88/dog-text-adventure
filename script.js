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
                    // Example: Check for Rune-related data in OP_RETURN (requires deeper parsing)
                    // Here you would parse `output.scriptpubkey` or other relevant fields
                    // to identify $DOG tokens, and calculate the balance.
                    
                    // Placeholder example logic:
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
    // This function should be customized to extract $DOG data from the OP_RETURN script
    // based on the Rune encoding standard used in your $DOG token.

    // Example of how this might be structured:
    return {
        token: '$DOG',
        amount: 10  // Placeholder value, replace with actual parsing logic
    };
}
