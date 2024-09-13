document.getElementById('address-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const address = document.getElementById('unisat-address').value.trim();
    const resultDiv = document.getElementById('result');
   
    // Display the address captured from the input
    console.log(`Address entered: ${address}`);
    console.log(address.length);
    resultDiv.innerHTML = `Loading data for address: ${address}...`; // Display entered address on the page

    
    try {
        // Log the address being used in the request
        console.log(`Fetching rune balance for address: ${address}`);

        const apiKey = '27d72bfbe4aadbfe692a706949e97c88fb14607ebfccccb5e70945acdfa89b24';
         
        const generatedUrl = `https://open-api.unisat.io/v1/indexer/address/${address}/runes/balance-list`;
        console.log(`Generated URL: ${generatedUrl}`);
        
        const response = await fetch(generatedUrl, {
        method: 'GET',
        headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${apiKey}` 
        },
        });
        
        // Log the response status
        console.log(`Response status: ${response.status}`);

        // Parse the response data
        const data = await response.json();

        // Check if the response was successful
        if (response.ok) {
            console.log('Data received:', data);
            resultDiv.innerHTML = `Rune Balance: ${JSON.stringify(data)}`;
        } else {
            console.error('Error response:', data);
            resultDiv.innerHTML = `Error: ${data.message || 'Unable to fetch rune balance'}`;
        }
    } catch (error) {
        // Log any errors that occur during the fetch process
        console.error('Fetch error:', error);
        resultDiv.innerHTML = `Error: ${error.message}`;
    }
});
