const payrollForm = document.getElementById("payrollForm");

const employeeIdInput = document.getElementById("employeeId");
const employeeNameInput = document.getElementById("employeeName");
const departmentInput = document.getElementById("department");
const hoursWorkedInput = document.getElementById("hoursWorked");
const hourlyRateInput = document.getElementById("hourlyRate");
const clearButton = document.getElementById("clearButton");
const message = document.getElementById("message");

function validateInput(
    employeeId,
    employeeName,
    department,
    hoursWorked,
    hourlyRate
) {
    if (employeeId === "") {
        return "Please enter the employee ID.";
    }

    if (employeeName === "") {
        return "Please enter the employee name.";
    }

    if (department === "") {
        return "Please enter the department.";
    }

    if (
        hoursWorkedInput.value === "" ||
        Number.isNaN(hoursWorked) ||
        hoursWorked <= 0 ||
        hoursWorked > 80
    ) {
        return "Hours worked must be from 1 to 80.";
    }

    if (
        hourlyRateInput.value === "" ||
        Number.isNaN(hourlyRate) ||
        hourlyRate <= 0
    ) {
        return "Please enter a valid hourly rate.";
    }

    return "";
}

function getRegularHours(hoursWorked) {
    if (hoursWorked > 40) {
        return 40;
    }

    return hoursWorked;
}

function getOvertimeHours(hoursWorked) {
    if (hoursWorked > 40) {
        return hoursWorked - 40;
    }

    return 0;
}

function calculateRegularPay(
    regularHours,
    hourlyRate
) {
    return regularHours * hourlyRate;
}

function calculateOvertimePay(
    overtimeHours,
    hourlyRate
) {
    const overtimeRate = hourlyRate * 1.5;

    return overtimeHours * overtimeRate;
}

function calculateGrossPay(
    regularPay,
    overtimePay
) {
    return regularPay + overtimePay;
}

function getTaxRate(grossPay) {
    if (grossPay >= 2000) {
        return 0.20;
    } else if (grossPay >= 1500) {
        return 0.15;
    } else if (grossPay >= 1000) {
        return 0.10;
    } else if (grossPay >= 500) {
        return 0.05;
    }

    return 0;
}

function calculateTax(
    grossPay,
    taxRate
) {
    return grossPay * taxRate;
}

function calculateSocialSecurity(grossPay) {
    return grossPay * 0.05;
}

function calculateHealthInsurance(grossPay) {
    return grossPay * 0.03;
}

function calculateTotalDeductions(
    taxAmount,
    socialSecurity,
    healthInsurance
) {
    return (
        taxAmount +
        socialSecurity +
        healthInsurance
    );
}

function calculateNetPay(
    grossPay,
    totalDeductions
) {
    return grossPay - totalDeductions;
}

function formatCurrency(amount) {
    return amount.toLocaleString(
        "en-US",
        {
            style: "currency",
            currency: "USD"
        }
    );
}

function formatPercentage(rate) {
    return `${(rate * 100).toFixed(0)}%`;
}

function displayResults(payroll) {
    document.getElementById("resultEmployeeId").textContent =
        payroll.employeeId;

    document.getElementById("resultEmployeeName").textContent =
        payroll.employeeName;

    document.getElementById("resultDepartment").textContent =
        payroll.department;

    document.getElementById("resultHoursWorked").textContent =
        payroll.hoursWorked.toFixed(2);

    document.getElementById("resultHourlyRate").textContent =
        formatCurrency(payroll.hourlyRate);

    document.getElementById("resultRegularHours").textContent =
        payroll.regularHours.toFixed(2);

    document.getElementById("resultOvertimeHours").textContent =
        payroll.overtimeHours.toFixed(2);

    document.getElementById("resultRegularPay").textContent =
        formatCurrency(payroll.regularPay);

    document.getElementById("resultOvertimePay").textContent =
        formatCurrency(payroll.overtimePay);

    document.getElementById("resultGrossPay").textContent =
        formatCurrency(payroll.grossPay);

    document.getElementById("resultTaxRate").textContent =
        formatPercentage(payroll.taxRate);

    document.getElementById("resultTaxAmount").textContent =
        formatCurrency(payroll.taxAmount);

    document.getElementById("resultSocialSecurity").textContent =
        formatCurrency(payroll.socialSecurity);

    document.getElementById("resultHealthInsurance").textContent =
        formatCurrency(payroll.healthInsurance);

    document.getElementById("resultTotalDeductions").textContent =
        formatCurrency(payroll.totalDeductions);

    document.getElementById("resultNetPay").textContent =
        formatCurrency(payroll.netPay);
}

function showMessage(text, type) {
    message.textContent = text;
    message.className = `message ${type}`;
}

function resetResults() {
    document.getElementById("resultEmployeeId").textContent = "—";
    document.getElementById("resultEmployeeName").textContent = "—";
    document.getElementById("resultDepartment").textContent = "—";
    document.getElementById("resultHoursWorked").textContent = "0.00";
    document.getElementById("resultHourlyRate").textContent = "$0.00";
    document.getElementById("resultRegularHours").textContent = "0.00";
    document.getElementById("resultOvertimeHours").textContent = "0.00";
    document.getElementById("resultRegularPay").textContent = "$0.00";
    document.getElementById("resultOvertimePay").textContent = "$0.00";
    document.getElementById("resultGrossPay").textContent = "$0.00";
    document.getElementById("resultTaxRate").textContent = "0%";
    document.getElementById("resultTaxAmount").textContent = "$0.00";
    document.getElementById("resultSocialSecurity").textContent = "$0.00";
    document.getElementById("resultHealthInsurance").textContent = "$0.00";
    document.getElementById("resultTotalDeductions").textContent = "$0.00";
    document.getElementById("resultNetPay").textContent = "$0.00";
}

payrollForm.addEventListener(
    "submit",
    function (event) {
        event.preventDefault();

        const employeeId =
            employeeIdInput.value.trim();

        const employeeName =
            employeeNameInput.value.trim();

        const department =
            departmentInput.value.trim();

        const hoursWorked =
            Number(hoursWorkedInput.value);

        const hourlyRate =
            Number(hourlyRateInput.value);

        const validationMessage =
            validateInput(
                employeeId,
                employeeName,
                department,
                hoursWorked,
                hourlyRate
            );

        if (validationMessage !== "") {
            showMessage(
                validationMessage,
                "error"
            );

            return;
        }

        const regularHours =
            getRegularHours(hoursWorked);

        const overtimeHours =
            getOvertimeHours(hoursWorked);

        const regularPay =
            calculateRegularPay(
                regularHours,
                hourlyRate
            );

        const overtimePay =
            calculateOvertimePay(
                overtimeHours,
                hourlyRate
            );

        const grossPay =
            calculateGrossPay(
                regularPay,
                overtimePay
            );

        const taxRate =
            getTaxRate(grossPay);

        const taxAmount =
            calculateTax(
                grossPay,
                taxRate
            );

        const socialSecurity =
            calculateSocialSecurity(grossPay);

        const healthInsurance =
            calculateHealthInsurance(grossPay);

        const totalDeductions =
            calculateTotalDeductions(
                taxAmount,
                socialSecurity,
                healthInsurance
            );

        const netPay =
            calculateNetPay(
                grossPay,
                totalDeductions
            );

        const payroll = {
            employeeId: employeeId,
            employeeName: employeeName,
            department: department,
            hoursWorked: hoursWorked,
            hourlyRate: hourlyRate,
            regularHours: regularHours,
            overtimeHours: overtimeHours,
            regularPay: regularPay,
            overtimePay: overtimePay,
            grossPay: grossPay,
            taxRate: taxRate,
            taxAmount: taxAmount,
            socialSecurity: socialSecurity,
            healthInsurance: healthInsurance,
            totalDeductions: totalDeductions,
            netPay: netPay
        };

        displayResults(payroll);

        showMessage(
            "Payroll calculated successfully.",
            "success"
        );
    }
);

clearButton.addEventListener(
    "click",
    function () {
        payrollForm.reset();
        resetResults();

        message.textContent = "";
        message.className = "message";

        employeeIdInput.focus();
    }
);

resetResults();
