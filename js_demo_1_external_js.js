function displayInformation() {
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let course = document.getElementById("course").value;
    let yearLevel = document.getElementById("yearLevel").value;
    let section = document.getElementById("section").value;
    let school = document.getElementById("school").value;

    if (
        name === "" ||
        age === "" ||
        course === "" ||
        yearLevel === "" ||
        section === "" ||
        school === ""
    ) {
        document.getElementById("output").innerHTML =
            "Please complete all required information.";

        return;
    }

    document.getElementById("output").innerHTML =
        "<p>Hello, " + name + ".</p>" +
        "<p>You are " + age + " years old.</p>" +
        "<p>You are taking " + course + ".</p>" +
        "<p>You are in " + yearLevel +
        ", section " + section + ".</p>" +
        "<p>You study at " + school + ".</p>";
}
