function respond() {
    const input = document.getElementById('input').value.toLowerCase();
    const responseElement = document.getElementById('response');
    
    if (input === 'good morning') {
        responseElement.textContent = 'GM';
    } else {
        responseElement.textContent = 'Try typing "good morning"';
    }
}
