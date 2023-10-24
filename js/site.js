function getValues() {
    let loanAmount = document.getElementById('loanAmount').value;
    let months = document.getElementById('months').value;
    let interestRate = document.getElementById('interestRate').value;    

    loanAmount = parseInt(loanAmount);
    months = parseInt(months);
    interestRate = parseInt(interestRate);

    if (loanAmount <= 0 && months <= 0 && interestRate <= 0) {
        return Swal.fire({
            icon: 'error',
            backdrop: false,
            title: 'Attention',
            text: "Every entrie can't be 0 or less"
        });
    } else if (loanAmount <= 0 && months > 0 && interestRate > 0){
        return Swal.fire({
            icon: 'error',
            backdrop: false,
            title: 'Attention',
            text: 'Please check the Loan Amount and enter an amount that is more than $0'
        });
    } else if (months <= 0 && loanAmount > 0 && interestRate > 0) {
        return Swal.fire({
            icon: 'error',
            backdrop: false,
            title: 'Attention',
            text: 'Please check the Term and enter an a time period that is more than 0'
        });
    } else if (interestRate <= 0 && months > 0 && loanAmount > 0) {
        return Swal.fire({
            icon: 'error',
            backdrop: false,
            title: 'Attention',
            text: 'Please check the Interest Rate and enter an a Rate that is more than 0'
        });
    }

    //Total Principle
    document.querySelector('#card-principal').textContent = `$ ${loanAmount.toFixed(2)}`;
    let input = {
        loanAmount: loanAmount,
        term: months,
        rate: interestRate
    }

    let results = loanCalculate(input);
    displayResults(results);

}

function loanCalculate(input) {
    let loan = input.loanAmount;
    let months = input.term;
    let rate = input.rate;

    let tableData = document.getElementById('tableBody');
    tableData.innerHTML = '';
    let monthlyPayment = 0;
    let remainingBalance = loan;
    let addingInterest = 0;
    let totalCost = 0;   


    for (i = 0; i < months; i++) {

         monthlyPayment = (loan * (rate / 1200) / (1 - Math.pow((1 + rate / 1200), (- months))));
        let interestPayment = (remainingBalance * rate / 1200);        
        let principalPayment = (monthlyPayment - interestPayment);

        if (remainingBalance == loan || addingInterest < interestPayment || totalCost < monthlyPayment) {
            remainingBalance = (loan - principalPayment);
            addingInterest = interestPayment;
            totalCost = monthlyPayment    ;        
        } else {
            (remainingBalance - principalPayment);
            addingInterest += interestPayment;
            totalCost += monthlyPayment;
        }
        


        let tableRow = document.createElement('tr');

        let month = document.createElement('td');
        month.innerText = months - i;
        tableRow.appendChild(month);

        let payment = document.createElement('td');
        payment.innerText = monthlyPayment.toFixed(2);
        tableRow.appendChild(payment);

        let principal = document.createElement('td');
        principal.innerText = principalPayment.toFixed(2);
        tableRow.appendChild(principal);

        let interest = document.createElement('td');
        interest.innerText = interestPayment.toFixed(2);
        tableRow.appendChild(interest);

        let totalInterest = document.createElement('td');
        totalInterest.innerText = addingInterest.toFixed(2);
        tableRow.appendChild(totalInterest);

        let balance = document.createElement('td');
        balance.innerText = (remainingBalance -= principalPayment).toFixed(2);
        tableRow.appendChild(balance);

        tableData.appendChild(tableRow);

    }
    let results = {
        addingInterest, monthlyPayment, totalCost
    }

    return results;

}

function displayResults(input) {
    let monthlyPayment = input.monthlyPayment.toFixed(2);
    let totalInterest = input.addingInterest.toFixed(2);
    let totalCost = input.totalCost.toFixed(2);
    document.querySelector('#card-monthlyPayment').textContent = `$ ${monthlyPayment}`;
    document.querySelector('#card-totalInterest').textContent = `$ ${totalInterest}`;
    document.querySelector('#card-total').textContent = `$ ${totalCost}`;
}