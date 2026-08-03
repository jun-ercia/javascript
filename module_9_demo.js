const students = [];

let editingStudentId = null;
let selectedStudentId = null;

const studentForm =
    document.getElementById("studentForm");

const studentIdInput =
    document.getElementById("studentId");

const studentNameInput =
    document.getElementById("studentName");

const courseInput =
    document.getElementById("course");

const yearLevelInput =
    document.getElementById("yearLevel");

const gpaInput =
    document.getElementById("gpa");

const emailInput =
    document.getElementById("email");

const studentTableBody =
    document.getElementById("studentTableBody");

const emptyMessage =
    document.getElementById("emptyMessage");

const message =
    document.getElementById("message");

const saveButton =
    document.getElementById("saveButton");

const clearFormButton =
    document.getElementById("clearFormButton");

const clearAllButton =
    document.getElementById("clearAllButton");

const showObjectButton =
    document.getElementById("showObjectButton");

const exportJsonButton =
    document.getElementById("exportJsonButton");

const objectOutput =
    document.getElementById("objectOutput");


/*
    Creates and returns a student object.

    The object contains properties and methods.
*/
function createStudent(
    id,
    name,
    course,
    yearLevel,
    gpa,
    email
) {
    return {
        id: id,
        name: name,
        course: course,
        yearLevel: yearLevel,
        gpa: gpa,
        email: email,

        getAcademicStatus() {
            if (this.gpa <= 3.00) {
                return "Passed";
            }

            return "At Risk";
        },

        getFullDescription() {
            return (
                `${this.id} - ${this.name}, ` +
                `${this.course}, Year ${this.yearLevel}`
            );
        }
    };
}


/*
    Validates the values entered in the form.
*/
function validateInput(
    id,
    name,
    course,
    yearLevel,
    gpa,
    email
) {
    if (id === "") {
        return "Please enter the student ID.";
    }

    if (name === "") {
        return "Please enter the student name.";
    }

    if (course === "") {
        return "Please select a course.";
    }

    if (yearLevel === "") {
        return "Please select a year level.";
    }

    if (
        gpaInput.value === "" ||
        Number.isNaN(gpa) ||
        gpa < 1 ||
        gpa > 5
    ) {
        return "GPA must be from 1.00 to 5.00.";
    }

    if (email === "") {
        return "Please enter the email address.";
    }

    const existingStudent =
        students.find(
            student =>
                student.id.toLowerCase() ===
                    id.toLowerCase() &&
                student.id !== editingStudentId
        );

    if (existingStudent) {
        return "The student ID already exists.";
    }

    return "";
}


/*
    Creates a table row using object destructuring.
*/
function createStudentRow(
    student,
    index
) {
    const {
        id,
        name,
        course,
        yearLevel,
        gpa,
        email
    } = student;

    const row =
        document.createElement("tr");

    if (id === selectedStudentId) {
        row.className = "selected-row";
    }

    const status =
        student.getAcademicStatus();

    row.innerHTML = `
        <td>${index + 1}</td>
        <td>${id}</td>
        <td>${name}</td>
        <td>${course}</td>
        <td>${yearLevel}</td>
        <td>${gpa.toFixed(2)}</td>
        <td class="${
            status === "Passed"
                ? "passed"
                : "at-risk"
        }">
            ${status}
        </td>
        <td>${email}</td>
        <td>
            <button
                type="button"
                class="select-button"
                data-action="select"
                data-id="${id}"
            >
                Select
            </button>

            <button
                type="button"
                class="edit-button"
                data-action="edit"
                data-id="${id}"
            >
                Edit
            </button>

            <button
                type="button"
                class="delete-button"
                data-action="delete"
                data-id="${id}"
            >
                Delete
            </button>
        </td>
    `;

    return row;
}


/*
    Displays all student objects in the table.
*/
function displayStudents() {
    studentTableBody.innerHTML = "";

    if (students.length === 0) {
        emptyMessage.style.display = "block";
        return;
    }

    emptyMessage.style.display = "none";

    for (
        let index = 0;
        index < students.length;
        index++
    ) {
        const row =
            createStudentRow(
                students[index],
                index
            );

        studentTableBody.appendChild(row);
    }
}


/*
    Calculates and displays the class summary.
*/
function updateSummary() {
    let totalGpa = 0;
    let bestGpa = 0;
    let topStudentName = "None";
    let passingCount = 0;
    let atRiskCount = 0;

    for (const student of students) {
        totalGpa += student.gpa;

        /*
            In the 1.00-to-5.00 grading system,
            the lower GPA is the better grade.
        */
        if (
            bestGpa === 0 ||
            student.gpa < bestGpa
        ) {
            bestGpa = student.gpa;
            topStudentName = student.name;
        }

        if (
            student.getAcademicStatus() ===
            "Passed"
        ) {
            passingCount++;
        } else {
            atRiskCount++;
        }
    }

    let averageGpa = 0;

    if (students.length > 0) {
        averageGpa =
            totalGpa / students.length;
    }

    document.getElementById(
        "totalStudents"
    ).textContent =
        students.length;

    document.getElementById(
        "averageGpa"
    ).textContent =
        averageGpa.toFixed(2);

    document.getElementById(
        "highestGpa"
    ).textContent =
        students.length > 0
            ? bestGpa.toFixed(2)
            : "0.00";

    document.getElementById(
        "topStudent"
    ).textContent =
        topStudentName;

    document.getElementById(
        "passingStudents"
    ).textContent =
        passingCount;

    document.getElementById(
        "studentsAtRisk"
    ).textContent =
        atRiskCount;
}


/*
    Displays a success or error message.
*/
function showMessage(
    text,
    type
) {
    message.textContent = text;
    message.className =
        `message ${type}`;
}


/*
    Clears the form and resets edit mode.
*/
function resetForm() {
    studentForm.reset();

    editingStudentId = null;

    saveButton.textContent =
        "Add Student";

    studentIdInput.disabled =
        false;

    message.textContent = "";
    message.className = "message";

    studentIdInput.focus();
}


/*
    Creates and adds a student object.
*/
function addStudent(
    id,
    name,
    course,
    yearLevel,
    gpa,
    email
) {
    const student =
        createStudent(
            id,
            name,
            course,
            yearLevel,
            gpa,
            email
        );

    students.push(student);
}


/*
    Updates an existing student using
    the object spread operator.
*/
function updateStudent(
    id,
    name,
    course,
    yearLevel,
    gpa,
    email
) {
    const index =
        students.findIndex(
            student =>
                student.id === id
        );

    if (index === -1) {
        return;
    }

    const existingStudent =
        students[index];

    const updatedStudent = {
        ...existingStudent,
        name: name,
        course: course,
        yearLevel: yearLevel,
        gpa: gpa,
        email: email
    };

    /*
        Object spread copies the properties,
        but the methods are explicitly retained
        for classroom demonstration.
    */
    updatedStudent.getAcademicStatus =
        existingStudent.getAcademicStatus;

    updatedStudent.getFullDescription =
        existingStudent.getFullDescription;

    students[index] = updatedStudent;
}


/*
    Loads a selected student object
    into the input form.
*/
function editStudent(id) {
    const student =
        students.find(
            student =>
                student.id === id
        );

    if (!student) {
        return;
    }

    const {
        name,
        course,
        yearLevel,
        gpa,
        email
    } = student;

    studentIdInput.value =
        student.id;

    studentNameInput.value =
        name;

    courseInput.value =
        course;

    yearLevelInput.value =
        yearLevel;

    gpaInput.value =
        gpa;

    emailInput.value =
        email;

    editingStudentId =
        student.id;

    studentIdInput.disabled =
        true;

    saveButton.textContent =
        "Update Student";

    showMessage(
        "Edit the selected student record.",
        "success"
    );

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/*
    Deletes one student object.
*/
function deleteStudent(id) {
    const student =
        students.find(
            student =>
                student.id === id
        );

    if (!student) {
        return;
    }

    const confirmed =
        confirm(
            `Delete the record of ${student.name}?`
        );

    if (!confirmed) {
        return;
    }

    const index =
        students.findIndex(
            student =>
                student.id === id
        );

    students.splice(index, 1);

    if (
        selectedStudentId === id
    ) {
        selectedStudentId = null;

        objectOutput.textContent =
            "No student is currently selected.";
    }

    if (
        editingStudentId === id
    ) {
        resetForm();
    }

    displayStudents();
    updateSummary();

    showMessage(
        "Student record deleted successfully.",
        "success"
    );
}


/*
    Selects a student for object inspection.
*/
function selectStudent(id) {
    selectedStudentId = id;

    displayStudents();

    const student =
        students.find(
            student =>
                student.id === id
        );

    if (student) {
        objectOutput.textContent =
            `Selected: ${student.getFullDescription()}`;
    }
}


/*
    Demonstrates Object.keys(),
    Object.values(), Object.entries(),
    and JSON.stringify().
*/
function showObjectDetails() {
    if (!selectedStudentId) {
        showMessage(
            "Please select a student record first.",
            "error"
        );

        return;
    }

    const student =
        students.find(
            student =>
                student.id ===
                selectedStudentId
        );

    if (!student) {
        return;
    }

    const objectCopy = {
        id: student.id,
        name: student.name,
        course: student.course,
        yearLevel: student.yearLevel,
        gpa: student.gpa,
        email: student.email,
        academicStatus:
            student.getAcademicStatus()
    };

    const keys =
        Object.keys(objectCopy);

    const values =
        Object.values(objectCopy);

    const entries =
        Object.entries(objectCopy);

    const json =
        JSON.stringify(
            objectCopy,
            null,
            2
        );

    objectOutput.textContent =
`OBJECT DESCRIPTION
${student.getFullDescription()}

OBJECT KEYS
${JSON.stringify(keys, null, 2)}

OBJECT VALUES
${JSON.stringify(values, null, 2)}

OBJECT ENTRIES
${JSON.stringify(entries, null, 2)}

JSON OUTPUT
${json}`;

    showMessage(
        "Object details displayed successfully.",
        "success"
    );
}


/*
    Converts the array of student objects
    into JSON text.
*/
function exportAsJson() {
    if (students.length === 0) {
        showMessage(
            "There are no records to export.",
            "error"
        );

        return;
    }

    const exportData =
        students.map(
            student => ({
                id: student.id,
                name: student.name,
                course: student.course,
                yearLevel:
                    student.yearLevel,
                gpa: student.gpa,
                email: student.email,
                academicStatus:
                    student.getAcademicStatus()
            })
        );

    const json =
        JSON.stringify(
            exportData,
            null,
            2
        );

    objectOutput.textContent =
`STUDENT RECORDS IN JSON FORMAT

${json}`;

    showMessage(
        "Student records converted to JSON.",
        "success"
    );
}


/*
    Handles adding and updating records.
*/
studentForm.addEventListener(
    "submit",
    function (event) {
        event.preventDefault();

        const id =
            studentIdInput.value.trim();

        const name =
            studentNameInput.value.trim();

        const course =
            courseInput.value;

        const yearLevel =
            yearLevelInput.value;

        const gpa =
            Number(gpaInput.value);

        const email =
            emailInput.value.trim();

        const validationMessage =
            validateInput(
                id,
                name,
                course,
                yearLevel,
                gpa,
                email
            );

        if (
            validationMessage !== ""
        ) {
            showMessage(
                validationMessage,
                "error"
            );

            return;
        }

        if (
            editingStudentId === null
        ) {
            addStudent(
                id,
                name,
                course,
                yearLevel,
                gpa,
                email
            );

            showMessage(
                "Student record added successfully.",
                "success"
            );
        } else {
            updateStudent(
                editingStudentId,
                name,
                course,
                yearLevel,
                gpa,
                email
            );

            showMessage(
                "Student record updated successfully.",
                "success"
            );
        }

        displayStudents();
        updateSummary();

        studentForm.reset();

        editingStudentId = null;

        saveButton.textContent =
            "Add Student";

        studentIdInput.disabled =
            false;

        studentIdInput.focus();
    }
);


/*
    Uses event delegation to handle
    the table action buttons.
*/
studentTableBody.addEventListener(
    "click",
    function (event) {
        const button =
            event.target.closest(
                "button"
            );

        if (!button) {
            return;
        }

        const action =
            button.dataset.action;

        const id =
            button.dataset.id;

        if (action === "select") {
            selectStudent(id);
        } else if (action === "edit") {
            editStudent(id);
        } else if (action === "delete") {
            deleteStudent(id);
        }
    }
);


clearFormButton.addEventListener(
    "click",
    function () {
        resetForm();
    }
);


clearAllButton.addEventListener(
    "click",
    function () {
        if (students.length === 0) {
            showMessage(
                "There are no records to clear.",
                "error"
            );

            return;
        }

        const confirmed =
            confirm(
                "Are you sure you want to delete all student records?"
            );

        if (!confirmed) {
            return;
        }

        while (
            students.length > 0
        ) {
            students.pop();
        }

        selectedStudentId = null;

        objectOutput.textContent =
            "All student records have been cleared.";

        displayStudents();
        updateSummary();
        resetForm();

        showMessage(
            "All student records were cleared.",
            "success"
        );
    }
);


showObjectButton.addEventListener(
    "click",
    function () {
        showObjectDetails();
    }
);


exportJsonButton.addEventListener(
    "click",
    function () {
        exportAsJson();
    }
);


displayStudents();
updateSummary();