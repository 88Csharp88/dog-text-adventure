async function checkDOGBalance() {
    const address = document.getElementById('walletAddress').value;
    const outputElement = document.getElementById('output');

    // Clear previous output
    outputElement.innerText = 'Fetching $DOG balance...';

    try {
        // Fetch balance data from UniSat API
        const response = await fetch(`https://open-api.unisat.io/v1/indexer/address/${address}/runes/balance-list`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': '27d72bfbe4aadbfe692a706949e97c88fb14607ebfccccb5e70945acdfa89b24' // Replace 'YOUR_API_KEY' with your actual API key
          
            },
        });

        if (!response.ok) {
            console.error('Failed to fetch balance:', response.status, response.statusText);
            outputElement.innerText = 'Failed to fetch balance. Please check the wallet address.';
            return;
        }

        const data = await response.json();
        console.log('Fetched balance data:', data);

        // Initialize $DOG balance
        let dogBalance = 0;

        // Check if data.detail exists and is an array
        if (data.data && Array.isArray(data.data.detail)) {
            // Loop through each token detail to find the specific rune
            data.data.detail.forEach(token => {
                // Match using runeid or spacedRune or any identifier unique to the $DOG rune
                if (token.runeid === '840000:3' || token.spacedRune === 'DOG•GO•TO•THE•MOON') {
                    dogBalance += parseInt(token.amount, 10); // Convert amount to an integer
                }
            });
        }

        // Display the balance
        outputElement.innerText = `$DOG Balance: ${dogBalance}`;
        console.log('$DOG Balance calculated:', dogBalance);
    } catch (error) {
        console.error('Error fetching balance:', error);
        outputElement.innerText = 'Failed to fetch balance. Please try again.';
    }
}
