let isDarkMode = true; // Add this line at the top of your script

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('taskForm').addEventListener('submit', function(event) {
        event.preventDefault();
        addTaskToChart();
    });

    document.getElementById('modeToggle').addEventListener('click', toggleDarkMode);
    updateGanttChart();
});

function getCustomMermaidStyle() {
    console.log(isDarkMode); // Use the isDarkMode variable here
    if (isDarkMode) {
        return `
            .taskText, .titleText { fill: #ffffff; }
            .grid .tick text { fill: #e0e0e0; } /* Style for tick marks */
            .sectionTitle { fill: #a0a0a0; } /* Style for section labels */
            /* Additional dark mode styles */
        `;
    } else {
        return `
            .taskText, .titleText { fill: #000000; }
            .grid .tick text { fill: #000000; } /* Style for tick marks */
            .sectionTitle { fill: #333333; } /* Style for section labels */
            /* Additional light mode styles */
        `;
    }
}

function toggleDarkMode() {
    console.log('Toggling dark mode...');
    isDarkMode = !isDarkMode; // Toggle the isDarkMode variable here
    document.body.classList.toggle('dark-mode');
    updateGanttChart();
};

function updateGanttChart() {
    console.log('Updating Gantt chart...');
    var input = document.getElementById('ganttInput').value;
    var ganttContainer = document.getElementById('ganttContainer');

    // Clear existing content
    ganttContainer.innerHTML = '';

    // Create a new div for Mermaid content
    var newGanttDiv = document.createElement('div');
    newGanttDiv.className = 'mermaid';
    newGanttDiv.innerHTML = input;

    // Append new div to the container
    ganttContainer.appendChild(newGanttDiv);

    // Initialize Mermaid with custom CSS
    mermaid.initialize({ 
        startOnLoad: true,
        themeCSS: getCustomMermaidStyle()
    });

    mermaid.init(undefined, document.querySelectorAll('.mermaid'));
};
document.addEventListener("keydown", function (e) {
    if (e.code === "Enter") { //checks whether the pressed key is "Enter"
    updateGanttChart();
    }
    });
function addTaskToChart() {
    var section = document.getElementById('sectionName').value.trim();
    var taskName = document.getElementById('taskName').value.trim();
    var duration = document.getElementById('duration').value.trim();
    var startDate = document.getElementById('startDate').value.trim();
    var dependency = document.getElementById('dependency').value.trim();

    var newTaskLine = `\n    ${section}`;
    newTaskLine += `\n    ${taskName}`;
    if (dependency) {
        newTaskLine += ` :after ${dependency}`;
    } else if (startDate) {
        newTaskLine += `, ${startDate}`;
    }
    newTaskLine += `, ${duration}`;

    var currentData = document.getElementById('ganttInput').value;
    document.getElementById('ganttInput').value = currentData + newTaskLine;
    updateGanttChart();
}
