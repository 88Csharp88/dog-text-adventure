async function checkDOGBalance() {
    const address = document.getElementById('walletAddress').value;
    const outputElement = document.getElementById('output');

    // Clear previous output
    outputElement.innerText = 'Fetching $DOG balance...';

    try {
        // Update the request URL to include runeid
        const runeid = '840000:3'; // Example rune ID for $DOG; replace this if it's different
        const response = await fetch(`https://open-api.unisat.io/v1/indexer/address/${address}/runes/${runeid}/balance`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': '27d72bfbe4aadbfe692a706949e97c88fb14607ebfccccb5e70945acdfa89b24' // Replace 'YOUR_API_KEY' with your actual API key
            }
        });

        if (!response.ok) {
            console.error('Failed to fetch balance:', response.status, response.statusText);
            outputElement.innerText = 'Failed to fetch balance. Please check the wallet address and try again.';
            return;
        }

        const data = await response.json();
        console.log('Fetched balance data:', data);

        // Assuming that the balance amount is directly available in the response data
        let dogBalance = parseInt(data.data.amount, 10) || 0; // Ensure parsing to integer

        // Display the balance
        outputElement.innerText = `$DOG Balance: ${dogBalance}`;
        console.log('$DOG Balance calculated:', dogBalance);
    } catch (error) {
        console.error('Error fetching balance:', error);
        outputElement.innerText = 'Failed to fetch balance. Please try again.';
    }
}
