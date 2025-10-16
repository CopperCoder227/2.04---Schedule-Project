async function start(name) {
   const jsonData = await (await fetch(name)).json()
   // Get table elements
   const tableHeader = document.getElementById('tableHeader');
   const tableBody = document.getElementById('tableBody');

   // Generate table headers dynamically
   const headers = Object.keys(jsonData[0]);
   headers.forEach(header => {
      const th = document.createElement('th');
      th.textContent = header;
      tableHeader.appendChild(th);
   });

   // Generate table rows dynamically
   jsonData.forEach(row => {
      const tr = document.createElement('tr');
      headers.forEach(header => {
         const td = document.createElement('td');
         td.textContent = row[header];
         tr.appendChild(td);
      });
      tableBody.appendChild(tr);
   });
}

start(
   async function start(name) {
      const tableHeader = document.getElementById('tableHeader');
      const tableBody = document.getElementById('tableBody');

      // Clear current table
      tableHeader.innerHTML = '';
      tableBody.innerHTML = '';

      try {
         const response = await fetch(name);

         if (!response.ok) {
            throw new Error(`Could not find schedule: ${name}`);
         }

         const jsonData = await response.json();

         const headers = Object.keys(jsonData[0]);
         headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            tableHeader.appendChild(th);
         });

         jsonData.forEach(row => {
            const tr = document.createElement('tr');
            headers.forEach(header => {
               const td = document.createElement('td');
               td.textContent = row[header];
               tr.appendChild(td);
            });
            tableBody.appendChild(tr);
         });

      } catch (error) {
         const row = document.createElement('tr');
         const td = document.createElement('td');
         td.setAttribute('colspan', '10');
         td.classList.add('text-danger');
         td.textContent = error.message;
         row.appendChild(td);
         tableBody.appendChild(row);
      }
   }

)

//make a way to type a name in and have it pull up someone 
function loadScheduleFromSearch() {
   const nameInput = document.getElementById("searchName").value.trim();
   if (nameInput) {
      const fileName = `${nameInput}Schedule.json`; // e.g., CooperSchedule.json
      start(fileName);
   } else {
      alert("Please enter a student name.");
   }
}

