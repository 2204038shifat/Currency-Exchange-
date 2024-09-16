let base_url = 'https://v6.exchangerate-api.com/v6/b31f1d2c7b7c7d537319f467/latest';

var dropdown = document.querySelectorAll(".select-container select");
console.log(dropdown);
var btn = document.querySelector(".submit");
var fromCurr = document.querySelector(".from select");
var toCurr = document.querySelector(".To select");
var msg = document.querySelector(".description");
var icon = document.querySelector("i");


for (var select of dropdown) {
    for (currencyCode in countryList) {
        // let optionTag=`<option value ${currencyCode}>${currencyCode}</option>`;
        // // dropdown[i].insertAdjacentHTML("beforeend",optionTag);
        // if(i==0)
        // {
        // selected=currencyCode=="USD"?"selected":"";
        // }
        // else if(i==1)
        // {
        // selected=currencyCode=="BDT"?"selected":"";
        // }

        let newOption = document.createElement("option");
        newOption.value = currencyCode;
        newOption.innerText = currencyCode;
        if (select.name === "from" && currencyCode === "USD") {
            newOption.selected = "selected";
        }
        else if (select.name === "To" && currencyCode === "BDT") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (event) => {
        // console.log(event.target);
        updateFlag(event.target);
    })

}
window.addEventListener("load", () => {
    msg.innerText = "please wait";
    getExchange();
})
 

const updateFlag = (element) => {
    let selectCountry = element.value;
    let countryCode = countryList[selectCountry];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector
("img");
    img.src = newSrc;
}

const getAmount = async (AmountValue) => {
    let url = `https://v6.exchangerate-api.com/v6/b31f1d2c7b7c7d537319f467/latest/${fromCurr.value}`;
    let response = await fetch(url);
    let getData = await response.json();
    let exchangerate = getData.conversion_rates[toCurr.value];

    let totalExchangeRate = (AmountValue * exchangerate);
    msg.innerText = `${AmountValue} ${fromCurr.value} = ${totalExchangeRate} ${toCurr.value}`;

}

function getExchange() {
    let inputAmount = document.querySelector(".inputAmount");
    let AmountValue = inputAmount.value;
    if (AmountValue == "" || AmountValue <= 0) {
        inputAmount.value = "1";
        AmountValue = 1;
    }
    getAmount(AmountValue);
}
btn.addEventListener("click", (e) => {
    e.preventDefault();
    msg.innerText="Please wait";
    getExchange();
})

