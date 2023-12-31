let isDarkMode = true; // Add this line at the top of your script

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('taskForm').addEventListener('submit', function(event) {
        event.preventDefault();
        addTaskToChart();
    });

    document.getElementById('modeToggle').addEventListener('click', toggleDarkMode);
    updateGanttChart();
});

function toggleDarkMode() {
    console.log('Toggling dark mode...');
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode');
    console.log(document.body.classList); // Log the classList of the body element
    updateGanttChart();
};

function updateGanttChart() {
    theme = !isDarkMode ? 'dark' : 'default';
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

    // Initialize Mermaid with custom CSS and the specified theme
    mermaid.initialize({ 
        startOnLoad: true,
        theme: theme
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
    
        // Check if required fields are filled
        if (!section || !taskName || !duration) {
            alert('Please fill in all required fields: section, task name, and duration.');
            return;
        }
    
        // Format the new task line
        var newTaskLine = `\n${section}\n    ${taskName}`;
        if (dependency) {
            newTaskLine += ` :after ${dependency}`;
        } else if (startDate) {
            newTaskLine += ` : ${startDate}`;
        }
        newTaskLine += `, ${duration}`;
    
        // Append the new task line to the existing Gantt chart data
        var ganttInput = document.getElementById('ganttInput');
        ganttInput.value += newTaskLine;
    
        // Update the Gantt chart
        updateGanttChart();
    }
    function addTaskToChart() {
        var section = document.getElementById('sectionName').value.trim();
        var taskName = document.getElementById('taskName').value.trim();
        var duration = document.getElementById('duration').value.trim();
        var startDate = document.getElementById('startDate').value.trim();
        var dependency = document.getElementById('dependency').value.trim();
    
        // Check if required fields are filled
        if (!section || !taskName || !duration) {
            alert('Please fill in all required fields: section, task name, and duration.');
            return;
        }
    
        // Format the new task line
        var newTaskLine = `    ${taskName}`;
        if (dependency) {
            newTaskLine += ` :after ${dependency}`;
        } else if (startDate) {
            newTaskLine += ` : ${startDate}`;
        }
        newTaskLine += `, ${duration}`;
    
        // Get the existing Gantt chart data
        var ganttInput = document.getElementById('ganttInput');
        var ganttData = ganttInput.value;
    
        // Check if the section exists
        var sectionIndex = ganttData.indexOf(`section ${section}`);
        if (sectionIndex === -1) {
            // If the section doesn't exist, add it
            ganttData += `\nsection ${section}\n${newTaskLine}`;
        } else {
            // If the section exists, add the task to it
            var nextSectionIndex = ganttData.indexOf('\nsection', sectionIndex + 1);
            if (nextSectionIndex === -1) {
                // If this is the last section, just append the task
                ganttData += `\n${newTaskLine}`;
            } else {
                // If this is not the last section, insert the task before the next section
                ganttData = ganttData.slice(0, nextSectionIndex) + '\n' + newTaskLine + ganttData.slice(nextSectionIndex);
            }
        }
    
        // Update the Gantt chart data
        ganttInput.value = ganttData;
    
        // Update the Gantt chart
        updateGanttChart();
    }