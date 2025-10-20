// Main async function to load and display schedule data
async function start(fileName) {
   const tableHeader = document.getElementById('tableHeader');
   const tableBody = document.getElementById('tableBody');

   // Clear old table data
   tableHeader.innerHTML = '';
   tableBody.innerHTML = '';

   try {
      const response = await fetch(fileName);

      if (!response.ok) {
         alert(`No schedule found for "${fileName.replace('Schedule.json', '')}". Please check the name and try again.`);
         return;
      }

      const jsonData = await response.json();

      // Build table headers dynamically
      const headers = Object.keys(jsonData[0]);
      headers.forEach(header => {
         const th = document.createElement('th');
         th.textContent = header;
         tableHeader.appendChild(th);
      });

      // Build table rows dynamically
      jsonData.forEach(row => {
         const tr = document.createElement('tr');
         headers.forEach(header => {
            const td = document.createElement('td');
            td.textContent = row[header];

            // Apply color class only to the className column
            if (header === 'className') {
               const colorClass = getColorClassForClassName(row[header]);
               td.classList.add(colorClass);
            }

            tr.appendChild(td);

         });
         tableBody.appendChild(tr);
      });

   } catch (error) {
      alert(`Error loading schedule: ${error.message}`);
   }
}

// Load schedule based on the search input
function loadScheduleFromSearch() {
   const nameInput = document.getElementById("searchName").value.trim();

   if (!nameInput) {
      alert("Please enter a student name.");
      return;
   }

   // Capitalize first letter to match file naming convention
   const formattedName = nameInput.charAt(0).toUpperCase() + nameInput.slice(1);
   const fileName = `${formattedName}Schedule.json`;

   start(fileName);
}

// Initialize default schedule and set up event listeners on page load
document.addEventListener("DOMContentLoaded", () => {
   // Load default schedule
   start("CooperSchedule.json");

   // Setup event listener for Enter key in search input
   const searchInput = document.getElementById("searchName");
   searchInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
         event.preventDefault(); // Prevent form submission or default behavior
         loadScheduleFromSearch();
      }
   });
});

// Color mapping based on className - Ai was used to help, i didnt know ow else to add for js
const classColorMap = {};
let colorIndex = 0;

// Total available color classes defined in CSS
const totalColors = 8;

function getColorClassForClassName(className) {
   if (!classColorMap[className]) {
      classColorMap[className] = `class-color-${colorIndex % totalColors}`;
      colorIndex++;
   }
   return classColorMap[className];
}
