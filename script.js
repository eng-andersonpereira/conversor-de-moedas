const convertButton = document.querySelector(".convert-button")
const currencyFrom = document.querySelector(".currency-from")
const currencyTo = document.querySelector(".currency-to")

async function buscarTaxas() {
    const url = "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,GBP-BRL,BTC-BRL"
    const resposta = await fetch(url)
    const dados = await resposta.json()

    return {
        real: 1,
        dolar: Number(dados.USDBRL.bid),
        euro: Number(dados.EURBRL.bid),
        libra: Number(dados.GBPBRL.bid),
        bitcoin: Number(dados.BTCBRL.bid)
    }
}

async function convertvalues() {
    const inputCurrency = document.querySelector(".input-currency").value
    const currencyValueToConvert = document.querySelector(".currency-value-to-convert")
    const currencyValue = document.querySelector(".currency-value")

    if (!inputCurrency) {
        alert("Digite um valor")
        return
    }

    const inputNumber = parseFloat(inputCurrency)

    if (isNaN(inputNumber)) {
        alert("Valor inválido")
        return
    }

    let rates
    try {
        rates = await buscarTaxas()
    } catch (erro) {
        alert("Não foi possível buscar a cotação. Verifique sua internet e tente de novo.")
        return
    }

    const from = currencyFrom.value
    const to = currencyTo.value

    const convertedValue = inputNumber * (rates[from] / rates[to])

    const currencyMap = {
        real: { locale: "pt-BR", code: "BRL" },
        dolar: { locale: "en-US", code: "USD" },
        euro: { locale: "de-DE", code: "EUR" },
        libra: { locale: "en-GB", code: "GBP" },
        bitcoin: { locale: "en-US", code: "BTC" }
    }

    // ORIGEM formatada
    const selectedFrom = currencyMap[from]

    currencyValueToConvert.innerHTML = new Intl.NumberFormat(selectedFrom.locale, {
        style: "currency",
        currency: selectedFrom.code
    }).format(inputNumber)

    // DESTINO formatado
    const selected = currencyMap[to]

    currencyValue.innerHTML = new Intl.NumberFormat(selected.locale, {
        style: "currency",
        currency: selected.code
    }).format(convertedValue)
}

// Atualiza nome + imagem
function updateCurrencyUI() {
    const fromName = document.querySelector(".currency-from-name")
    const fromImg = document.querySelector(".currency-from-img")

    const toName = document.querySelector(".currency-name")
    const toImg = document.querySelector(".currency-img")

    const currencyData = {
        real: { name: "Real", img: "./assets/brasil 2.png" },
        dolar: { name: "Dólar", img: "./assets/estados-unidos (1) 1.png" },
        euro: { name: "Euro", img: "./assets/euro.png" },
        libra: { name: "Libra", img: "./assets/libra.png" },
        bitcoin: { name: "Bitcoin", img: "./assets/bitcoin.png" }
    }

    const from = currencyData[currencyFrom.value]
    const to = currencyData[currencyTo.value]

    fromName.innerHTML = from.name
    fromImg.src = from.img

    toName.innerHTML = to.name
    toImg.src = to.img
}

// Eventos
convertButton.addEventListener("click", convertvalues)
currencyFrom.addEventListener("change", updateCurrencyUI)
currencyTo.addEventListener("change", updateCurrencyUI)

// inicializa já correto
updateCurrencyUI()