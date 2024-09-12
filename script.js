document.getElementById('address-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const address = document.getElementById('unisat-address').value;
    const resultDiv = document.getElementById('result');

    try {
        // Replace the URL with the appropriate endpoint from the Unisat API documentation
        const response = await fetch(`https://unisat.io/api/address/${address}/runes`);
        const data = await response.json();

        if (response.ok) {
            resultDiv.innerHTML = `Rune Balance: ${JSON.stringify(data)}`;
        } else {
            resultDiv.innerHTML = `Error: ${data.message}`;
        }
    } catch (error) {
        resultDiv.innerHTML = `Error: ${error.message}`;
    }
});
