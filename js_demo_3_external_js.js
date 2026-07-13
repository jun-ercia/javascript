const PASSING_GRADE = 75;
const MINIMUM_AGE = 16;

const evaluateButton = document.getElementById("evaluateButton");

evaluateButton.addEventListener("click", evaluateStudent);

function evaluateStudent() {
    const studentName =
        document.getElementById("studentName").value.trim();

    const age = Number(
        document.getElementById("age").value
    );

    const grade = Number(
        document.getElementById("grade").value
    );

    const program =
        document.getElementById("program").value;

    const hasCompleteRequirements =
        document.getElementById("requirements").checked;

    const output = document.getElementById("output");

    /*
        Logical OR operator
        Checks whether one or more inputs are invalid.
    */
    if (
        studentName === "" ||
        age <= 0 ||
        grade < 0 ||
        grade > 100 ||
        program === ""
    ) {
        output.innerHTML = `
            <p class="error">
                Please enter complete and valid information.
            </p>
        `;

        return;
    }

    /*
        if...else statement
        Determines whether the student passed or failed.
    */
    let academicStatus;

    if (grade >= PASSING_GRADE) {
        academicStatus = "Passed";
    } else {
        academicStatus = "Failed";
    }

    /*
        else if statement
        Classifies the student's grade.
    */
    let gradeDescription;

    if (grade >= 90) {
        gradeDescription = "Excellent";
    } else if (grade >= 80) {
        gradeDescription = "Very Good";
    } else if (grade >= 75) {
        gradeDescription = "Passed";
    } else {
        gradeDescription = "Failed";
    }

    /*
        Nested if statement
        Checks age first, then admission requirements.
    */
    let enrollmentStatus;

    if (age >= MINIMUM_AGE) {
        if (hasCompleteRequirements) {
            enrollmentStatus = "Eligible for enrollment";
        } else {
            enrollmentStatus =
                "Not eligible because the requirements are incomplete";
        }
    } else {
        enrollmentStatus =
            "Not eligible because the minimum age is 16";
    }

    /*
        Logical AND operator
        Both conditions must be true.
    */
    let recognitionMessage = "No academic recognition";

    if (
        grade >= 90 &&
        academicStatus === "Passed"
    ) {
        recognitionMessage =
            "Qualified for academic recognition";
    }

    /*
        Logical NOT operator
        Reverses the Boolean value.
    */
    let requirementStatus;

    if (!hasCompleteRequirements) {
        requirementStatus = "Incomplete";
    } else {
        requirementStatus = "Complete";
    }

    /*
        switch statement
        Matches the selected program with an exact value.
    */
    let programDescription;

    switch (program) {
        case "BSIT":
            programDescription =
                "Focuses on software, web development, networking, and information systems";
            break;

        case "BSCS":
            programDescription =
                "Focuses on algorithms, programming, computing theory, and software development";
            break;

        case "BSCPE":
            programDescription =
                "Focuses on computer hardware, electronics, embedded systems, and programming";
            break;

        default:
            programDescription = "Program information is unavailable";
    }

    output.innerHTML = `
        <h2>Student Evaluation Result</h2>

        <p>
            <strong>Student Name:</strong>
            ${studentName}
        </p>

        <p>
            <strong>Age:</strong>
            ${age}
        </p>

        <p>
            <strong>Grade:</strong>
            ${grade}
        </p>

        <p>
            <strong>Academic Status:</strong>
            ${academicStatus}
        </p>

        <p>
            <strong>Grade Description:</strong>
            ${gradeDescription}
        </p>

        <p>
            <strong>Admission Requirements:</strong>
            ${requirementStatus}
        </p>

        <p>
            <strong>Enrollment Status:</strong>
            ${enrollmentStatus}
        </p>

        <p>
            <strong>Recognition:</strong>
            ${recognitionMessage}
        </p>

        <p>
            <strong>Selected Program:</strong>
            ${program}
        </p>

        <p>
            <strong>Program Description:</strong>
            ${programDescription}
        </p>
    `;
}
