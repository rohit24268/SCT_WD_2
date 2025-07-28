// Get references to DOM elements
const timeDisplay = document.getElementById('time-display');
const startPauseButton = document.getElementById('start-pause-button');
const lapButton = document.getElementById('lap-button');
const resetButton = document.getElementById('reset-button');
const lapList = document.getElementById('lap-list');

let startTime; // Stores the timestamp when the stopwatch was started or resumed
let elapsedTime = 0; // Stores the total elapsed time in milliseconds
let timerInterval; // Stores the interval ID for the timer
let isRunning = false; // Flag to track if the stopwatch is running
let lapCounter = 0; // Counter for lap numbers

/**
 * Formats a given time in milliseconds into HH:MM:SS.ms format.
 * @param {number} ms - The time in milliseconds.
 * @returns {string} The formatted time string.
 */
function formatTime(ms) {
    const date = new Date(ms);
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

/**
 * Updates the time display every 10 milliseconds.
 */
function updateTime() {
    // Calculate the current elapsed time
    elapsedTime = Date.now() - startTime;
    // Update the display with the formatted time
    timeDisplay.textContent = formatTime(elapsedTime);
}

/**
 * Starts the stopwatch.
 */
function startStopwatch() {
    // Set the start time to the current time minus any previously elapsed time
    startTime = Date.now() - elapsedTime;
    // Start the interval to update the time display
    timerInterval = setInterval(updateTime, 10); // Update every 10ms for millisecond precision
    isRunning = true; // Set running flag to true
    // Update button text and state
    startPauseButton.textContent = 'Pause';
    startPauseButton.classList.remove('start-button');
    startPauseButton.classList.add('pause-button');
    lapButton.disabled = false;
    resetButton.disabled = false;
}

/**
 * Pauses the stopwatch.
 */
function pauseStopwatch() {
    clearInterval(timerInterval); // Stop the interval
    isRunning = false; // Set running flag to false
    // Update button text and state
    startPauseButton.textContent = 'Start';
    startPauseButton.classList.remove('pause-button');
    startPauseButton.classList.add('start-button');
    lapButton.disabled = true; // Disable lap button when paused
}

/**
 * Resets the stopwatch to its initial state.
 */
function resetStopwatch() {
    clearInterval(timerInterval); // Stop the interval
    isRunning = false; // Set running flag to false
    elapsedTime = 0; // Reset elapsed time
    lapCounter = 0; // Reset lap counter
    timeDisplay.textContent = '00:00:00.000'; // Reset display
    lapList.innerHTML = ''; // Clear lap times
    // Reset button text and state
    startPauseButton.textContent = 'Start';
    startPauseButton.classList.remove('pause-button');
    startPauseButton.classList.add('start-button');
    lapButton.disabled = true;
    resetButton.disabled = true;
}

/**
 * Records and displays a lap time.
 */
function recordLap() {
    if (isRunning) { // Only record lap if stopwatch is running
        lapCounter++; // Increment lap counter
        const lapTime = formatTime(elapsedTime); // Get current elapsed time for the lap
        // Create a new list item for the lap
        const listItem = document.createElement('li');
        listItem.classList.add('lap-item');
        listItem.innerHTML = `<span>Lap ${lapCounter}:</span> <span>${lapTime}</span>`;
        // Add the new lap to the beginning of the list
        lapList.prepend(listItem);
    }
}

// Event Listeners
startPauseButton.addEventListener('click', () => {
    if (isRunning) {
        pauseStopwatch();
    } else {
        startStopwatch();
    }
});

lapButton.addEventListener('click', recordLap);
resetButton.addEventListener('click', resetStopwatch);

// Initialize the stopwatch state on load
resetStopwatch();
