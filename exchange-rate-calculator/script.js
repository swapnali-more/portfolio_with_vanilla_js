const elements = {
    countryFrom: document.getElementById("country-from"),
    countryTo: document.getElementById("country-to"),
    currencyFrom: document.getElementById("currency-from"),
    currencyTo: document.getElementById("currency-to"),
    rate: document.getElementById("rate"),
    swap: document.getElementById("swap"),
};

const apiKey = "rcL5UqNS2RYzKipZewZMMN78pRbfRBnK";
const baseURL = "https://api.apilayer.com/exchangerates_data";
const requestOptions = {
    headers: new Headers({
        apikey: apiKey,
    }),
    redirect: "follow",
};

async function fetchData() {
    try {
        const response = await fetch(`${baseURL}/symbols`, requestOptions);
        const result = await response.json();
        const symbols = result?.symbols;
        if (symbols) {
            const options = Object.entries(symbols)
                .map(([code, description]) => `<option value="${code}">${description}</option>`)
                .join("");
            elements.countryFrom.innerHTML = options;
            elements.countryTo.innerHTML = options;
        }
    } catch (error) {
        console.log("Error fetching symbols:", error);
    }
}

async function calculate() {
    const currency_one = elements.countryFrom.value;
    const currency_two = elements.countryTo.value;

    try {
        const response = await fetch(`${baseURL}/convert?from=${currency_one}&to=${currency_two}&amount=1&apikey=${apiKey}`, requestOptions);
        const result = await response.json();
        if (result.success) {
            const rate = result.result;
            elements.rate.innerHTML = `1 ${currency_one} = ${rate} ${currency_two}`;
            elements.currencyTo.value = (elements.currencyFrom.value * rate).toFixed(2);
        } else {
            throw new Error(result.error.info);
        }
    } catch (error) {
        console.log("Error fetching rate:", error);
    }
}

function swapCurrencies() {
    const temp = elements.countryFrom.value;
    elements.countryFrom.value = elements.countryTo.value;
    elements.countryTo.value = temp;
}

fetchData();
calculate();

elements.countryFrom.addEventListener("change", calculate);
elements.countryTo.addEventListener("change", calculate);
elements.currencyFrom.addEventListener("input", calculate);
elements.currencyTo.addEventListener("input", calculate);
elements.swap.addEventListener("click", () => {
    swapCurrencies();
    calculate();
});
