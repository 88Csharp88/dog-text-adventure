document.getElementById('address-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const address = document.getElementById('unisat-address').value;
    const resultDiv = document.getElementById('result');

    // Clear previous result
    resultDiv.innerHTML = "Loading...";
    console.log("Loading...");
    console.log('${address}');
    
    try {
        // Log the address being used in the request
        console.log(`Fetching rune balance for address: ${address}`);
        
        // Replace the URL with the correct Unisat API endpoint as per the documentation
        //const response = await fetch(`https://unisat.io/api/address/${address}/runes`);
        const response = await fetch('https://open-api.unisat.io/v1/indexer/address/{address}/runes/balance-list', {
        method: 'GET',
        headers: {},
        });
const data = await response.json();
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
