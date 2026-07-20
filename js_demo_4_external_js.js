const students = [];

const studentForm =
    document.getElementById("studentForm");

const studentNameInput =
    document.getElementById("studentName");

const studentGradeInput =
    document.getElementById("studentGrade");

const studentTableBody =
    document.getElementById("studentTableBody");

const message =
    document.getElementById("message");

const emptyMessage =
    document.getElementById("emptyMessage");

const clearButton =
    document.getElementById("clearButton");

studentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const studentName =
        studentNameInput.value.trim();

    const studentGrade =
        Number(studentGradeInput.value);

    if (studentName === "") {
        showMessage(
            "Please enter the student's name.",
            "error"
        );

        return;
    }

    if (
        studentGradeInput.value === "" ||
        Number.isNaN(studentGrade) ||
        studentGrade < 0 ||
        studentGrade > 100
    ) {
        showMessage(
            "Please enter a valid grade from 0 to 100.",
            "error"
        );

        return;
    }

    let remark;

    if (studentGrade >= 75) {
        remark = "Passed";
    } else {
        remark = "Failed";
    }

    let performance;

    if (studentGrade >= 90) {
        performance = "Excellent";
    } else if (studentGrade >= 85) {
        performance = "Very Good";
    } else if (studentGrade >= 80) {
        performance = "Good";
    } else if (studentGrade >= 75) {
        performance = "Satisfactory";
    } else {
        performance = "Needs Improvement";
    }

    const student = {
        name: studentName,
        grade: studentGrade,
        remark: remark,
        performance: performance
    };

    students.push(student);

    displayStudents();
    updateSummary();

    showMessage(
        "Student record added successfully.",
        "success"
    );

    studentForm.reset();
    studentNameInput.focus();
});

function displayStudents() {
    studentTableBody.innerHTML = "";

    if (students.length === 0) {
        emptyMessage.style.display = "block";
        return;
    }

    emptyMessage.style.display = "none";

    for (let i = 0; i < students.length; i++) {
        const student = students[i];

        const row = document.createElement("tr");

        const numberCell =
            document.createElement("td");

        const nameCell =
            document.createElement("td");

        const gradeCell =
            document.createElement("td");

        const remarkCell =
            document.createElement("td");

        const performanceCell =
            document.createElement("td");

        const actionCell =
            document.createElement("td");

        const deleteButton =
            document.createElement("button");

        numberCell.textContent = i + 1;
        nameCell.textContent = student.name;
        gradeCell.textContent =
            student.grade.toFixed(2);

        remarkCell.textContent =
            student.remark;

        performanceCell.textContent =
            student.performance;

        if (student.remark === "Passed") {
            remarkCell.className = "passed";
        } else {
            remarkCell.className = "failed";
        }

        deleteButton.type = "button";
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";

        deleteButton.addEventListener(
            "click",
            function () {
                deleteStudent(i);
            }
        );

        actionCell.appendChild(deleteButton);

        row.appendChild(numberCell);
        row.appendChild(nameCell);
        row.appendChild(gradeCell);
        row.appendChild(remarkCell);
        row.appendChild(performanceCell);
        row.appendChild(actionCell);

        studentTableBody.appendChild(row);
    }
}

function updateSummary() {
    let passedCount = 0;
    let failedCount = 0;
    let totalGrade = 0;

    let highestGrade = -1;
    let topStudentName = "None";

    for (let i = 0; i < students.length; i++) {
        const student = students[i];

        totalGrade += student.grade;

        if (student.grade >= 75) {
            passedCount++;
        } else {
            failedCount++;
        }

        if (student.grade > highestGrade) {
            highestGrade = student.grade;
            topStudentName = student.name;
        }
    }

    let classAverage = 0;

    if (students.length > 0) {
        classAverage =
            totalGrade / students.length;
    }

    document.getElementById(
        "totalStudents"
    ).textContent = students.length;

    document.getElementById(
        "passedStudents"
    ).textContent = passedCount;

    document.getElementById(
        "failedStudents"
    ).textContent = failedCount;

    document.getElementById(
        "classAverage"
    ).textContent = classAverage.toFixed(2);

    if (students.length > 0) {
        document.getElementById(
            "topStudent"
        ).textContent =
            `${topStudentName} (${highestGrade.toFixed(2)})`;
    } else {
        document.getElementById(
            "topStudent"
        ).textContent = "None";
    }
}

function deleteStudent(index) {
    students.splice(index, 1);

    displayStudents();
    updateSummary();

    showMessage(
        "Student record deleted.",
        "success"
    );
}

clearButton.addEventListener("click", function () {
    if (students.length === 0) {
        showMessage(
            "There are no records to clear.",
            "error"
        );

        return;
    }

    const confirmed = confirm(
        "Are you sure you want to delete all student records?"
    );

    if (confirmed) {
        while (students.length > 0) {
            students.pop();
        }

        displayStudents();
        updateSummary();

        showMessage(
            "All student records were cleared.",
            "success"
        );
    }
});

function showMessage(text, type) {
    message.textContent = text;
    message.className = `message ${type}`;
}

displayStudents();
updateSummary();
