// Retrieve the progress log from localStorage, or initialize an empty array if it doesn't exist
const progressLog = JSON.parse(localStorage.getItem('progressLog')) || [];

function addProgressEntry(date, startTime, workProgress, endTime) {
    // Create a log entry object
    const entry = {
        date: date,
        startTime: startTime,
        workProgress: workProgress,
        endTime: endTime
    };

    // Push the new entry to the logbook
    progressLog.push(entry);

    // Save the updated logbook to localStorage
    localStorage.setItem('progressLog', JSON.stringify(progressLog));

    // Update the displayed logbook
    displayLogbook();
}

function displayLogbook() {
    const tableBody = document.querySelector("#logbook-table tbody");
    tableBody.innerHTML = ""; // Clear previous entries

    if (progressLog.length === 0) {
        tableBody.innerHTML = "<tr class='empty-message'><td colspan='4'>Logbook is empty.</td></tr>";
        return;
    }

    // Loop through the log entries and display them
    progressLog.forEach(entry => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${entry.date}</td>
            <td>${entry.startTime}</td>
            <td>${entry.workProgress}</td>
            <td>${entry.endTime}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Handle form submission
document.getElementById("progress-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const date = document.getElementById("date").value;
    const startTime = document.getElementById("start-time").value;
    const workProgress = document.getElementById("work-progress").value;
    const endTime = document.getElementById("end-time").value;

    addProgressEntry(date, startTime, workProgress, endTime);

    // Reset form
    document.getElementById("progress-form").reset();
});

// Display the logbook when the page loads
window.onload = function() {
    displayLogbook();
};
