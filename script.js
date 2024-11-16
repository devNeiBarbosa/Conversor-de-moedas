const convertButton = document.querySelector(".button-convert")
const selectCurrencyFrom = document.querySelector("#select-converter-de") // converter de
const selectCurrencyTo = document.querySelector("#select-converter-para") // converter para



async function convertValues() {
    const inputValor = document.querySelector("#input-valor").value // apenas o valor (value)
    const valorParaConverter = document.querySelector(".valor-para-converter") //valor digitado
    const valorConvertido = document.querySelector(".valor-convertido")

    const data = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL").then( response => response.json()) // api cotação de moedas

    console.log(selectCurrencyFrom.value) // converter de

    valorParaConverter.innerHTML = new Intl.NumberFormat("pt-BR", { //formatação da moeda
        style: "currency", //currency=moeda
        currency: "BRL"
    }).format(inputValor)

    console.log(selectCurrencyTo.value) // converter para

    const dolarToday = data.USDBRL.high
    const euroToday = data.EURBRL.high
    const bitcoinToday = data.BTCBRL.high

    if (selectCurrencyTo.value == "dolar") {
        valorConvertido.innerHTML = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(inputValor / dolarToday)
    }

    if (selectCurrencyTo.value == "euro") {
        valorConvertido.innerHTML = new Intl.NumberFormat("ed-ED", {
            style: "currency",
            currency: "EUR"
        }).format(inputValor / euroToday)
    }

    if (selectCurrencyTo.value == "bitcoin") {
        valorConvertido.innerHTML = new Intl.NumberFormat("btc", {
            style: "currency",
            currency: "BTC",
            minimumFractionDigits: 8, // mínimo de 8 casas decimais
            maximumFractionDigits: 8  // máximo de 8 casas decimais
        }).format(inputValor / bitcoinToday)
    }
}



function changeCurrency() { //função para alterar <img> e <p></p> da section "convertido-para"
    const nomeMoedaConvertido = document.getElementById("nome-moeda-convertido")
    const imgMoedaConvertida = document.querySelector(".img-moeda-convertida")

    if (selectCurrencyTo.value == "dolar") {
        nomeMoedaConvertido.innerHTML = "Dólar Americano"
        imgMoedaConvertida.src = "/assets/img/estados-unidos (1) 1.png"
    }

    if (selectCurrencyTo.value == "euro") {
        nomeMoedaConvertido.innerHTML = "Euro"
        imgMoedaConvertida.src = "/assets/img/eur.png"
    }

    if (selectCurrencyTo.value == "bitcoin") {
        nomeMoedaConvertido.innerHTML = "Bitcoin"
        imgMoedaConvertida.src = "/assets/img/bitcoin 1.png"
    }

    convertValues() //chamando função
}

selectCurrencyTo.addEventListener("change", changeCurrency) // evento de "escutar" seleção de change
convertButton.addEventListener("click", convertValues) // evento de "escutar" o click do botão


