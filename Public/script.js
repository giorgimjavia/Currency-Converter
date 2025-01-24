const input = document.getElementById('input');
const select = document.querySelector('.gelCurrency');
const button = document.querySelector('.button');
const resultDisplay = document.querySelector('.resultDisplay');


const conversionRates = {
    usd: 0.35,
    euro: 0.34,
    gbp: 0.29
};


function calc() {
    const inputValue = Number(input.value);
    const selectedCurrency = select.value;

  
    if (isNaN(inputValue) || inputValue <= 0) {
        resultDisplay.textContent = 'Please enter a valid GEL amount';
        return;
    }

    let convertedValue;

 
    if (conversionRates[selectedCurrency]) {
        convertedValue = inputValue * conversionRates[selectedCurrency];
    } else {
        resultDisplay.textContent = 'Please select a currency to convert to.';
        return;
    }

   
    resultDisplay.textContent = `${convertedValue.toFixed(2)} ${selectedCurrency.toUpperCase()}`;


    fetch('http://localhost:5000/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            GELAmount: inputValue,
            USD: selectedCurrency === 'usd' ? convertedValue : 0,
            EURO: selectedCurrency === 'euro' ? convertedValue : 0,
            GBP: selectedCurrency === 'gbp' ? convertedValue : 0,
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Data saved:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

    input.value = '';
}


button.addEventListener('click', calc);
