const employees = [];

const employeeForm = document.getElementById("employeeForm");
const employeeNameInput = document.getElementById("employeeName");
const departmentInput = document.getElementById("department");
const monthlySalesInput = document.getElementById("monthlySales");
const salesTargetInput = document.getElementById("salesTarget");
const employeeTableBody = document.getElementById("employeeTableBody");
const emptyMessage = document.getElementById("emptyMessage");
const message = document.getElementById("message");
const resetButton = document.getElementById("resetButton");
const clearAllButton = document.getElementById("clearAllButton");

function validateInput(name, department, monthlySales, salesTarget) {
    if (name === "") return "Please enter the employee name.";
    if (department === "") return "Please enter the department.";
    if (monthlySalesInput.value === "" || Number.isNaN(monthlySales)) return "Please enter a valid monthly sales amount.";
    if (monthlySales < 0) return "Monthly sales cannot be less than zero.";
    if (salesTargetInput.value === "" || Number.isNaN(salesTarget)) return "Please enter a valid sales target.";
    if (salesTarget <= 0) return "Sales target must be greater than zero.";
    return "";
}

function calculateAchievement(monthlySales, salesTarget) {
    return (monthlySales / salesTarget) * 100;
}

function determinePerformance(achievement) {
    if (achievement >= 120) return "Outstanding";
    if (achievement >= 100) return "Excellent";
    if (achievement >= 90) return "Very Good";
    if (achievement >= 75) return "Satisfactory";
    return "Needs Improvement";
}

function determineCommissionRate(achievement) {
    if (achievement >= 120) return 0.10;
    if (achievement >= 100) return 0.07;
    if (achievement >= 90) return 0.05;
    if (achievement >= 75) return 0.02;
    return 0;
}

function calculateCommission(monthlySales, commissionRate) {
    return monthlySales * commissionRate;
}

function determineTargetStatus(monthlySales, salesTarget) {
    return monthlySales >= salesTarget ? "Met Target" : "Below Target";
}

function formatCurrency(amount) {
    return amount.toLocaleString("en-PH", { style: "currency", currency: "PHP" });
}

function getPerformanceClass(performance) {
    if (performance === "Outstanding") return "outstanding";
    if (performance === "Excellent") return "excellent";
    if (performance === "Very Good") return "very-good";
    if (performance === "Satisfactory") return "satisfactory";
    return "needs-improvement";
}

function showMessage(text, type) {
    message.textContent = text;
    message.className = `message ${type}`;
}

function displayEmployees() {
    employeeTableBody.innerHTML = "";
    emptyMessage.style.display = employees.length === 0 ? "block" : "none";

    for (let index = 0; index < employees.length; index++) {
        const employee = employees[index];
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${employee.name}</td>
            <td>${employee.department}</td>
            <td class="money">${formatCurrency(employee.monthlySales)}</td>
            <td class="money">${formatCurrency(employee.salesTarget)}</td>
            <td>${employee.achievement.toFixed(2)}%</td>
            <td class="${getPerformanceClass(employee.performance)}">${employee.performance}</td>
            <td>${(employee.commissionRate * 100).toFixed(0)}%</td>
            <td class="money">${formatCurrency(employee.commission)}</td>
            <td>${employee.targetStatus}</td>
            <td><button type="button" class="delete-button" data-index="${index}">Delete</button></td>
        `;

        employeeTableBody.appendChild(row);
    }

    const deleteButtons = document.querySelectorAll(".delete-button");
    for (const button of deleteButtons) {
        button.addEventListener("click", function () {
            deleteEmployee(Number(this.dataset.index));
        });
    }
}

function updateSummary() {
    let totalMonthlySales = 0;
    let totalSalesTarget = 0;
    let totalCommission = 0;
    let metTargetCount = 0;
    let belowTargetCount = 0;
    let highestMonthlySales = 0;
    let highestSalesEmployee = "None";

    for (const employee of employees) {
        totalMonthlySales += employee.monthlySales;
        totalSalesTarget += employee.salesTarget;
        totalCommission += employee.commission;

        if (employee.monthlySales >= employee.salesTarget) metTargetCount++;
        else belowTargetCount++;

        if (employee.monthlySales > highestMonthlySales) {
            highestMonthlySales = employee.monthlySales;
            highestSalesEmployee = employee.name;
        }
    }

    const overallAchievement = totalSalesTarget > 0
        ? (totalMonthlySales / totalSalesTarget) * 100
        : 0;

    document.getElementById("totalEmployees").textContent = employees.length;
    document.getElementById("totalMonthlySales").textContent = formatCurrency(totalMonthlySales);
    document.getElementById("totalSalesTarget").textContent = formatCurrency(totalSalesTarget);
    document.getElementById("overallAchievement").textContent = `${overallAchievement.toFixed(2)}%`;
    document.getElementById("totalCommission").textContent = formatCurrency(totalCommission);
    document.getElementById("metTargetCount").textContent = metTargetCount;
    document.getElementById("belowTargetCount").textContent = belowTargetCount;
    document.getElementById("highestSalesEmployee").textContent = highestSalesEmployee;
    document.getElementById("highestMonthlySales").textContent = formatCurrency(highestMonthlySales);
}

function deleteEmployee(index) {
    const confirmed = confirm(`Delete the record of ${employees[index].name}?`);
    if (!confirmed) return;

    employees.splice(index, 1);
    displayEmployees();
    updateSummary();
    showMessage("Employee record deleted successfully.", "success");
}

employeeForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = employeeNameInput.value.trim();
    const department = departmentInput.value.trim();
    const monthlySales = Number(monthlySalesInput.value);
    const salesTarget = Number(salesTargetInput.value);

    const validationMessage = validateInput(name, department, monthlySales, salesTarget);
    if (validationMessage !== "") {
        showMessage(validationMessage, "error");
        return;
    }

    const achievement = calculateAchievement(monthlySales, salesTarget);
    const commissionRate = determineCommissionRate(achievement);

    employees.push({
        name,
        department,
        monthlySales,
        salesTarget,
        achievement,
        performance: determinePerformance(achievement),
        commissionRate,
        commission: calculateCommission(monthlySales, commissionRate),
        targetStatus: determineTargetStatus(monthlySales, salesTarget)
    });

    displayEmployees();
    updateSummary();
    showMessage("Employee record added successfully.", "success");
    employeeForm.reset();
    employeeNameInput.focus();
});

resetButton.addEventListener("click", function () {
    employeeForm.reset();
    message.textContent = "";
    message.className = "message";
    employeeNameInput.focus();
});

clearAllButton.addEventListener("click", function () {
    if (employees.length === 0) {
        showMessage("There are no employee records to clear.", "error");
        return;
    }

    if (!confirm("Are you sure you want to delete all employee records?")) return;

    while (employees.length > 0) employees.pop();
    displayEmployees();
    updateSummary();
    showMessage("All employee records were cleared.", "success");
});

displayEmployees();
updateSummary();
