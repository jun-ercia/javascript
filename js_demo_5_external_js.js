const purchaseForm =
    document.getElementById("purchaseForm");

const customerNameInput =
    document.getElementById("customerName");

const productNameInput =
    document.getElementById("productName");

const unitPriceInput =
    document.getElementById("unitPrice");

const quantityInput =
    document.getElementById("quantity");

const clearButton =
    document.getElementById("clearButton");

const message =
    document.getElementById("message");


/*
    Function 1:
    Validates the information entered by the user.
*/
function validateInput(
    customerName,
    productName,
    unitPrice,
    quantity
) {
    if (customerName === "") {
        return "Please enter the customer's name.";
    }

    if (productName === "") {
        return "Please enter the product name.";
    }

    if (
        unitPriceInput.value === "" ||
        Number.isNaN(unitPrice) ||
        unitPrice <= 0
    ) {
        return "Please enter a valid unit price greater than zero.";
    }

    if (
        quantityInput.value === "" ||
        Number.isNaN(quantity) ||
        quantity <= 0 ||
        !Number.isInteger(quantity)
    ) {
        return "Please enter a valid positive whole number for quantity.";
    }

    return "";
}


/*
    Function 2:
    Calculates the subtotal.
*/
function calculateSubtotal(unitPrice, quantity) {
    return unitPrice * quantity;
}


/*
    Function 3:
    Determines the discount rate based on the subtotal.
*/
function getDiscountRate(subtotal) {
    if (subtotal >= 1000) {
        return 0.15;
    } else if (subtotal >= 500) {
        return 0.10;
    } else if (subtotal >= 200) {
        return 0.05;
    } else {
        return 0;
    }
}


/*
    Function 4:
    Calculates the discount amount.
*/
function calculateDiscount(subtotal, discountRate) {
    return subtotal * discountRate;
}


/*
    Function 5:
    Calculates the sales tax.

    The sales tax rate used in this example is 8%.
*/
function calculateTax(discountedAmount) {
    const taxRate = 0.08;

    return discountedAmount * taxRate;
}


/*
    Function 6:
    Calculates the final amount.
*/
function calculateFinalTotal(
    subtotal,
    discountAmount,
    taxAmount
) {
    return subtotal - discountAmount + taxAmount;
}


/*
    Function 7:
    Formats a number as US currency.
*/
function formatCurrency(amount) {
    return amount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    });
}


/*
    Function 8:
    Formats a decimal value as a percentage.
*/
function formatPercentage(rate) {
    return `${(rate * 100).toFixed(0)}%`;
}


/*
    Function 9:
    Displays the purchase information in the table.
*/
function displayResults(purchase) {
    document.getElementById(
        "resultCustomer"
    ).textContent = purchase.customerName;

    document.getElementById(
        "resultProduct"
    ).textContent = purchase.productName;

    document.getElementById(
        "resultPrice"
    ).textContent = formatCurrency(
        purchase.unitPrice
    );

    document.getElementById(
        "resultQuantity"
    ).textContent = purchase.quantity;

    document.getElementById(
        "resultSubtotal"
    ).textContent = formatCurrency(
        purchase.subtotal
    );

    document.getElementById(
        "resultDiscountRate"
    ).textContent = formatPercentage(
        purchase.discountRate
    );

    document.getElementById(
        "resultDiscount"
    ).textContent = formatCurrency(
        purchase.discountAmount
    );

    document.getElementById(
        "resultTax"
    ).textContent = formatCurrency(
        purchase.taxAmount
    );

    document.getElementById(
        "resultTotal"
    ).textContent = formatCurrency(
        purchase.finalTotal
    );
}


/*
    Function 10:
    Displays a success or error message.
*/
function showMessage(text, type) {
    message.textContent = text;
    message.className = `message ${type}`;
}


/*
    Function 11:
    Resets the result table.
*/
function resetResults() {
    document.getElementById(
        "resultCustomer"
    ).textContent = "—";

    document.getElementById(
        "resultProduct"
    ).textContent = "—";

    document.getElementById(
        "resultPrice"
    ).textContent = "$0.00";

    document.getElementById(
        "resultQuantity"
    ).textContent = "0";

    document.getElementById(
        "resultSubtotal"
    ).textContent = "$0.00";

    document.getElementById(
        "resultDiscountRate"
    ).textContent = "0%";

    document.getElementById(
        "resultDiscount"
    ).textContent = "$0.00";

    document.getElementById(
        "resultTax"
    ).textContent = "$0.00";

    document.getElementById(
        "resultTotal"
    ).textContent = "$0.00";
}


/*
    Main form event.
*/
purchaseForm.addEventListener(
    "submit",
    function (event) {
        event.preventDefault();

        const customerName =
            customerNameInput.value.trim();

        const productName =
            productNameInput.value.trim();

        const unitPrice =
            Number(unitPriceInput.value);

        const quantity =
            Number(quantityInput.value);

        const validationMessage =
            validateInput(
                customerName,
                productName,
                unitPrice,
                quantity
            );

        if (validationMessage !== "") {
            showMessage(
                validationMessage,
                "error"
            );

            return;
        }

        const subtotal =
            calculateSubtotal(
                unitPrice,
                quantity
            );

        const discountRate =
            getDiscountRate(subtotal);

        const discountAmount =
            calculateDiscount(
                subtotal,
                discountRate
            );

        const discountedAmount =
            subtotal - discountAmount;

        const taxAmount =
            calculateTax(discountedAmount);

        const finalTotal =
            calculateFinalTotal(
                subtotal,
                discountAmount,
                taxAmount
            );

        const purchase = {
            customerName: customerName,
            productName: productName,
            unitPrice: unitPrice,
            quantity: quantity,
            subtotal: subtotal,
            discountRate: discountRate,
            discountAmount: discountAmount,
            taxAmount: taxAmount,
            finalTotal: finalTotal
        };

        displayResults(purchase);

        showMessage(
            "Purchase calculated successfully.",
            "success"
        );
    }
);


/*
    Clear button event.
*/
clearButton.addEventListener(
    "click",
    function () {
        purchaseForm.reset();

        resetResults();

        message.textContent = "";
        message.className = "message";

        customerNameInput.focus();
    }
);
