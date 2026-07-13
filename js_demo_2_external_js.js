// Constant values
const SCHOOL = "Laguna College of Business and Arts";
const PASSING_GRADE = 75;
const PRELIM_PERCENTAGE = 0.30;
const MIDTERM_PERCENTAGE = 0.30;
const FINAL_PERCENTAGE = 0.40;

// Select the button
const calculateButton = document.getElementById("calculateButton");

// Run the function when the button is clicked
calculateButton.addEventListener("click", calculateGrade);

function calculateGrade() {
    // Get input values
    const studentName = document.getElementById("studentName").value.trim();

    // Explicit type conversion using Number()
    const age = Number(document.getElementById("age").value);
    const prelim = Number(document.getElementById("prelim").value);
    const midterm = Number(document.getElementById("midterm").value);
    const finalGrade = Number(
        document.getElementById("finalGrade").value
    );

    const output = document.getElementById("output");

    // Logical OR operator
    if (
        studentName === "" ||
        age <= 0 ||
        prelim < 0 ||
        midterm < 0 ||
        finalGrade < 0
    ) {
        output.innerHTML = "Please enter valid student information.";
        return;
    }

    // Arithmetic expressions
    const prelimResult = prelim * PRELIM_PERCENTAGE;
    const midtermResult = midterm * MIDTERM_PERCENTAGE;
    const finalResult = finalGrade * FINAL_PERCENTAGE;

    const average =
        prelimResult +
        midtermResult +
        finalResult;

    // Comparison operator
    const passed = average >= PASSING_GRADE;

    // Conditional or ternary operator
    const status = passed ? "Passed" : "Failed";

    // Logical AND operator
    const qualifiedForRecognition =
        average >= 90 && finalGrade >= 90;

    const recognitionMessage = qualifiedForRecognition
        ? "Qualified for academic recognition"
        : "Not qualified for academic recognition";

    // Template literals
    output.innerHTML = `
        <h2>Grade Result</h2>

        <p>
            <strong>Student:</strong>
            ${studentName}
        </p>

        <p>
            <strong>Age:</strong>
            ${age}
        </p>

        <p>
            <strong>School:</strong>
            ${SCHOOL}
        </p>

        <p>
            <strong>Prelim Grade:</strong>
            ${prelim}
        </p>

        <p>
            <strong>Midterm Grade:</strong>
            ${midterm}
        </p>

        <p>
            <strong>Final Grade:</strong>
            ${finalGrade}
        </p>

        <p>
            <strong>Computed Average:</strong>
            ${average.toFixed(2)}
        </p>

        <p>
            <strong>Status:</strong>
            ${status}
        </p>

        <p>
            <strong>Recognition:</strong>
            ${recognitionMessage}
        </p>

        <hr>

        <h3>Data Types</h3>

        <p>
            studentName:
            ${typeof studentName}
        </p>

        <p>
            age:
            ${typeof age}
        </p>

        <p>
            average:
            ${typeof average}
        </p>

        <p>
            passed:
            ${typeof passed}
        </p>
    `;
}
