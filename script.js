

const convertButton = document.querySelector(".convert-button")
const currencyselect = document.querySelector(".currency-select")

function convertvalues() {
    const inputCurrency = document.querySelector(".input-currency").value
    const currencyValueToConvert = document.querySelector(".currency-value-to-convert")
    const currencyValue = document.querySelector(".currency-value")

    const dolartoday = 5.2
    const eurotoday = 5.5

    const inputNumber = parseFloat(inputCurrency.replace(",", "."))

    currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(inputNumber)

    if (currencyselect.value === "dolar") {
        const convertedValue = inputNumber / dolartoday

        currencyValue.innerHTML = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(convertedValue)
    }

    if (currencyselect.value === "euro") {
        const convertedValue = inputNumber / eurotoday

        currencyValue.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR"
        }).format(convertedValue)
    }
}

function changeCurrency() {
    const currencyName = document.querySelector(".currency-name")
    const currencyImg = document.querySelector(".currency-img")

    if (currencyselect.value === "dolar") {
        currencyName.innerHTML = "Dólar"
        currencyImg.src = "./assets/estados-unidos (1) 1.png"
    }

    if (currencyselect.value === "euro") {
        currencyName.innerHTML = "Euro"
        currencyImg.src = "./assets/euro.png"
    }
}

currencyselect.addEventListener("change", changeCurrency)
convertButton.addEventListener("click", convertvalues)