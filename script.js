let next = 1;
let selectedPlan = "month";
let priceElement;
let selectedElement;
let condition = false;
let selectedCard;
let selectedCardvalue;
let selectedPlanValue;
let selectedPlanValue2;
let selectedPlanValue3;
let switchPlan = false;
let planName;
// let yearlyVal1 = 0;
// let yearlyVal2 = 0;


function validateForm(event) {
    event.preventDefault()

    if (next == 1) {
        let error = formCheck();
        if (!error) {
            return false;
        }
        else {
            console.log('Form submitted successfully!');
            document.getElementById('step2').classList.remove('d-none')
            document.getElementById('step1').classList.add('d-none')
            document.getElementById('sideStep1').classList.remove('active')
            document.getElementById('sideStep2').classList.add('active')
            document.getElementById('prev-button').classList.remove('d-none')
        }
        next = 2;
    }
    else if (next == 2) {
        newFlag()
    }
    else if (next == 3) {
        summary()
        getCheckBoxValues()
    }
    else if (next == 4) {
        lastStep()
    }
}

function formCheck() {
    let userNameInput = document.getElementById('userName')
    let userEmailInput = document.getElementById('userEmail')
    let mobileInput = document.getElementById('mobile');

    let userName = document.getElementById('userName').value;
    let userEmail = document.getElementById('userEmail').value;
    let mobile = document.getElementById('mobile').value;



    let errorOccur = false;

    let nameRegex = /^[a-zA-Z ]{3,}$/;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let mobileRegex = /^[0-9]{3}$/

    if (!nameRegex.test(userName)) {
        document.getElementById('userNameError').innerText = "This field is required";
        userNameInput.style.border = '1px solid #b8818a';
        errorOccur = true;
    }
    else {
        userNameError.innerText = "";
        userNameInput.style.border = '2px solid #8d87b9';
    }

    if (!emailRegex.test(userEmail)) {
        document.getElementById('emailError').innerText = 'This field is required';
        userEmailInput.style.border = '1px solid #b8818a';
        errorOccur = true;
    }
    else {
        emailError.innerText = "";
        userEmailInput.style.border = '2px solid #8d87b9';
    }

    if (!mobileRegex.test(mobile)) {
        document.getElementById('mobileError').innerText = 'This field is required';
        mobileInput.style.border = '1px solid #b8818a';
        errorOccur = true;
    }
    else {
        mobileError.innerText = "";
        mobileInput.style.border = '2px solid #8d87b9';
    }


    if (errorOccur) {
        return false;
    }
    else {
        return true
    }
}

function newFlag() {
    let item_1 = document.getElementById('price_item1');
    let item_2 = document.getElementById('price_item2');
    let item_3 = document.getElementById('price_item3');
    if (selectedPlan === "month") {
        item_1.innerText = "+$1/mo";
        item_2.innerText = "+$2/mo";
        item_3.innerText = "+$2/mo";

    } else {
        item_1.innerText = "+$10/yr";
        item_2.innerText = "+$20/yr";
        item_3.innerText = "+$20/yr";
    }
    if (condition) {
        document.getElementById('step3').classList.remove('d-none')
        document.getElementById('step2').classList.add('d-none')
        document.getElementById('sideStep2').classList.remove('active')
        document.getElementById('sideStep3').classList.add('active')
        document.getElementById('prev-button').classList.remove('d-none')
        next = 3;

    }
}

// step 2
function selectPlan(cardId, mo) {
    console.log(cardId,mo.getAttribute("value"),mo);
    document.getElementById('card1').classList.remove('selected');
    document.getElementById('card2').classList.remove('selected');
    document.getElementById('card3').classList.remove('selected');
    selectedCardvalue = mo.getAttribute("value");

    selectedCard = document.getElementById(cardId);
    selectedCard.classList.add('selected');
    condition = true;

}

// step 3
function changePriceColor(itemId) {
    priceElement = document.getElementById('price_' + itemId);
    let checkbox = document.querySelector('#' + itemId + ' input[type="checkbox"]');
    let card = document.getElementById(itemId)

    if (checkbox.checked) {
        card.style.border = '2px solid #c1bcda';
        card.style.backgroundColor = '#f8f9fe';

    } else {
        card.style.border = '';
        card.style.backgroundColor = '';
    }
}

function summary() {
    // alert("summary")
    selectedElement = document.querySelector('.step2Cards.selected');
    planName = selectedElement.querySelector('b.planName').innerHTML;


    if (condition) {
        document.getElementById('step4').classList.remove('d-none');
        document.getElementById('step3').classList.add('d-none');
        document.getElementById('sideStep3').classList.remove('active');
        document.getElementById('sideStep4').classList.add('active');
        document.getElementById('next-btn').innerHTML = 'Confirm';
        document.getElementById('next-btn').style.backgroundColor = '#2034e6'
        document.getElementById('next-btn').classList.remove('nextBtn');
        document.getElementById('next-btn').classList.add('confirm');
        document.getElementById('prev-button').classList.remove('d-none');
        next = 4
    }
}

function updateSubscriptionValues(check) {
    // alert(check)
    condition = false;
    document.getElementById('card1').classList.remove('selected');
    document.getElementById('card2').classList.remove('selected');
    document.getElementById('card3').classList.remove('selected');
    
    switchPlan = check;
    let month = document.querySelectorAll('.monthly')
    let yearly = document.querySelectorAll('.yearly')
    const monthlyLabel = document.getElementById('monthlyLabel');
    const yearlyLabel = document.getElementById('yearlyLabel');
    if (check) {

        month.forEach((elem) => {
            elem.classList.add('d-none')
        })
        yearly.forEach((elem) => {
            elem.classList.remove('d-none')
        })
        monthlyLabel.style.color = '#b9b9c4';
        yearlyLabel.style.color = '#374b61';
        selectedPlan = "year";

        let value = document.getElementById('card1');
        value.setAttribute('value',"90")
        value = document.getElementById('card2');
        value.setAttribute('value',"120")
        value = document.getElementById('card3');
        value.setAttribute('value',"150")
    }
    else {
        yearly.forEach((elem) => {
            elem.classList.add('d-none')
        })
        month.forEach((elem) => {
            elem.classList.remove('d-none')
        })
        selectedPlan = "month"
        monthlyLabel.style.color = '#374b61';
        yearlyLabel.style.color = '#b9b9c4';

        // document.getElementById('card1').value = 9;

        let value = document.getElementById('card1');
        value.setAttribute('value',"9")
        value = document.getElementById('card2');
        value.setAttribute('value',"12")
        value = document.getElementById('card3');
        value.setAttribute('value',"15")


    }
}


function getCheckBoxValues() {
    // alert('m kb chala')



    selectedCardvalue = parseFloat(selectedCardvalue)

    let isChecked1 = document.getElementById('inlineCheckbox1').checked;
    selectedPlanValue = document.getElementById('price_item1').textContent;

    let isChecked2 = document.getElementById('inlineCheckbox2').checked;
    selectedPlanValue2 = document.getElementById('price_item2').textContent;

    let isChecked3 = document.getElementById('inlineCheckbox3').checked;
    selectedPlanValue3 = document.getElementById('price_item2').textContent;

    let service = document.getElementById('service')
    let storage = document.getElementById('storage')
    let customProfile = document.getElementById('custom-profile')

    let updateText = document.getElementById("update-text")
    updateText.innerHTML = `${planName} (Monthly)`;

    let update = document.getElementById('plan-val')
    update.innerHTML = `$${selectedCardvalue}/mo`;


    let selectedCardvalueTotal = selectedCardvalue;



    if (switchPlan == false) {
        if (isChecked1) {
            service.classList.remove('d-none');
            selectedCardvalueTotal += 1
        }
        else {
            service.classList.add('d-none');
        }

        if (isChecked2) {
            storage.classList.remove('d-none');
            selectedCardvalueTotal += 2
        }
        else {
            storage.classList.add('d-none');
        }

        if (isChecked3) {
            customProfile.classList.remove('d-none');
            selectedCardvalueTotal += 2
        }
        else {
            customProfile.classList.add('d-none');
        }

        let total = document.getElementById('changeText');
        total.innerHTML = 'Total (per month)'
        document.getElementById('total').innerHTML = `$${selectedCardvalueTotal}/mo`;
    }

    else {
    
        // let updateValue = selectedCardvalueTotal;
        // console.log(updateValue)
        update.innerHTML = `$${selectedCardvalueTotal}/yr`;

        let updateYearlyText = document.getElementById("update-text")
        updateYearlyText.innerHTML = `${planName} (Yearly)`;

        let serviceSpan = document.getElementById('service-span');
        // Get the text content of the span
        let serviceValueWithSymbols = serviceSpan.textContent;
        // Remove "$" and "/mo" from the text
        let numericValue = serviceValueWithSymbols.replace('$', '').replace('/mo', '');
        // Convert the string to a numeric value (assuming it represents a number)
        let numericValueAsNumber = parseFloat(numericValue);
        // console.log(numericValueAsNumber)
        let yearlyVal1 = numericValueAsNumber ;
        if(selectedPlan=='year'){
             yearlyVal1 = 10;
        }
        console.log(yearlyVal1)
        document.getElementById('service-span').innerHTML = `$${yearlyVal1}/yr`;


        let serviceSpan2 = document.getElementById('storage-span');
        // Get the text content of the span
        let serviceValueWithSymbols2 = serviceSpan2.textContent;

        // Remove "$" and "/mo" from the text
        let numericValue2 = serviceValueWithSymbols2.replace('$', '').replace('/mo', '');

        // Convert the string to a numeric value (assuming it represents a number)
        let numericValueAsNumber2 = parseFloat(numericValue2);
        // console.log('Numeric Value:', numericValueAsNumber2);
        // let yearlyVal2 = 0;

        let yearlyVal2 = numericValueAsNumber2 ;
        if(selectedPlan=='year'){
            yearlyVal2 = 20;
       }
        // let yearlyVal2 = numericValueAsNumber2 * 10;
        console.log(yearlyVal2)
        document.getElementById('storage-span').innerHTML = `$${yearlyVal2}/yr`;


        let serviceSpan3 = document.getElementById('custom-span');
        // Get the text content of the span
        let serviceValueWithSymbols3 = serviceSpan3.textContent;

        // Remove "$" and "/mo" from the text
        let numericValue3 = serviceValueWithSymbols3.replace('$', '').replace('/mo', '');

        // Convert the string to a numeric value (assuming it represents a number)
        let numericValueAsNumber3 = parseFloat(numericValue3);

        let yearlyVal3 = numericValueAsNumber3 ;
        if(selectedPlan=='year'){
            yearlyVal3 = 20;
       }
        // let yearlyVal3 = numericValueAsNumber3 * 10;
        // console.log(yearlyVal3)
        document.getElementById('custom-span').innerHTML = `$${yearlyVal3}/yr`;

        let updateText = document.getElementById("update-text")
        // console.log(updateText)
        updateText.innerHTML = `${planName} (Yearly)`;

        if (isChecked1) {
            service.classList.remove('d-none');
            selectedCardvalueTotal += yearlyVal1;
        }
        else {
            service.classList.add('d-none')
        }

        if (isChecked2) {
            storage.classList.remove('d-none');
            selectedCardvalueTotal += yearlyVal2;
        }
        else {
            storage.classList.add('d-none');

        }

        if (isChecked3) {
            customProfile.classList.remove('d-none');
            selectedCardvalueTotal += yearlyVal3
        }
        else {
            customProfile.classList.add('d-none');

        }
        let total = document.getElementById('changeText');
        total.innerHTML = 'Total (per year)'
        document.getElementById('total').innerHTML = `$${selectedCardvalueTotal}/yr`;
    }
}

function lastStep() {
    document.getElementById('thank-you').classList.remove('d-none');
    document.getElementById('step4').classList.add('d-none');
    document.getElementById('next-btn').classList.add('d-none');
    document.getElementById('button-container').classList.add('d-none')
}

function changePlanBtn() {
    next = 2;
 
    
    document.getElementById('step2').classList.remove('d-none');
    document.getElementById('step1').classList.add('d-none');
    document.getElementById('step3').classList.add('d-none');
    document.getElementById('step4').classList.add('d-none');
    document.getElementById('sideStep1').classList.remove('active');
    document.getElementById('sideStep2').classList.add('active');
    document.getElementById('sideStep3').classList.remove('active');
    document.getElementById('sideStep4').classList.remove('active');
    document.getElementById('next-btn').innerHTML = 'Next Step';
    document.getElementById('next-btn').style.background = 'hsl(213, 96%, 18%)';
    document.getElementById('prev-button').classList.remove('d-none');
    document.getElementById('next-btn').classList.remove('confirm');
    document.getElementById('next-btn').classList.add('nextBtn');
}

function goBack() {
    if (next == 2) {
        // alert('curenr step 2')
        next = 1;
        document.getElementById('step2').classList.add('d-none');
        // document.getElementById('step3').classList.add('d-none');
        document.getElementById('step1').classList.remove('d-none');
        document.getElementById('sideStep1').classList.add('active');
        document.getElementById('sideStep2').classList.remove('active');
        document.getElementById('prev-button').classList.add('d-none');
    } else if (next == 3) {
        // alert('curenr step 3')

        next = 2;
        // document.getElementById('step1').classList.add('active');
        document.getElementById('step3').classList.add('d-none');
        document.getElementById('step2').classList.remove('d-none');
        document.getElementById('sideStep2').classList.add('active');
        document.getElementById('sideStep3').classList.remove('active');
    } else if (next == 4) {
        // alert('curenr step 4')
        next = 3;
        document.getElementById('step4').classList.add('d-none');
        document.getElementById('step3').classList.remove('d-none');
        document.getElementById('sideStep3').classList.add('active');
        document.getElementById('sideStep4').classList.remove('active');
        document.getElementById('next-btn').innerHTML = 'Next';
        document.getElementById('prev-button').classList.remove('d-none');
        document.getElementById('next-btn').classList.remove('confirm');
        document.getElementById('next-btn').classList.add('nextBtn');
    }
}