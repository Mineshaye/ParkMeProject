async function fetchAndUpdateDOM() {
  try {
    const spaceName = fetchParkingSPaceName();
    const noLotsNotification = document.getElementById("noLotsNotification");
    const response = await fetch(
      `http://localhost:3000/api/parking/view/${spaceName}`
    );

    const data = await response.json();
    if (data.length === 0) {
      // If no lots are available, display the no-lots-notification
      noLotsNotification.style.display = "block";
      return;
    }

    const totalSlots = data[0].space.lotCount;

    const parkingSlotsElement = document.getElementById("parkingpsace");
    parkingSlotsElement.innerHTML = "";
    let currentRow = document.createElement("div");
    currentRow.className = "parkingslots-holder";

    for (let i = 0; i <= totalSlots; i++) {
      const slotElement = document.createElement("div");
      slotElement.className = "parking-slot";

      if (data.length > i) {
        slotElement.id = `slot-${data[i].lotNumber}`;
      }

      slotElement.innerHTML = `${i + 1}`;
      slotElement.addEventListener("click", () => reserveLot(i + 1));

      if (i % 5 === 0) {
        const line = document.createElement("div");
        line.classList.add("line");
        parkingSlotsElement.appendChild(line);

        const line2 = document.createElement("div");
        line2.classList.add("line-entryway");
        parkingSlotsElement.appendChild(line2);

        parkingSlotsElement.appendChild(currentRow);
        currentRow = document.createElement("div");
        currentRow.className = "parkingslots-holder";
      }

      currentRow.appendChild(slotElement);
    }

    // Append the last row if it's not already appended
    if (totalSlots % 5 !== 0) {
      parkingSlotsElement.appendChild(currentRow);
    }

    data.forEach((element, idx) => {
      let i = idx + 1;
      const slotElement = document.getElementById(`slot-${element.lotNumber}`);
      console.log(element.lotNumber);
      // Check if the slot is unavailable and update the DOM accordingly
      if (!element.available && i === element.lotNumber) {
        slotElement.innerHTML = `${element.lotNumber}<img src="car.png" alt="car" class="car" width="70px" height="120px">`;
        slotElement.removeEventListener("click", () =>
          reserveLot(element.lotNumber)
        );
      }
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
document.addEventListener("DOMContentLoaded", async function () {
  fetchAndUpdateDOM();
});

async function reserveLot(lotNumber) {
  const spaceName = fetchParkingSPaceName();
  if (confirm("Are you sure you want to reserve this lot?")) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/parking/reserve/${spaceName}/${lotNumber}`,
        { method: "POST" }
      );
      alert("Successfully reserved lot!");
      fetchAndUpdateDOM();
    } catch (error) {
      console.error("Error occured: ", error);
      alert("Error reserving lot!");
    }
  }
}

function fetchParkingSPaceName() {
  const spiltedHref = window.location.href.split("?")[1];
  if (!spiltedHref) {
    window.location.href = "/index.html";
    return;
  }
  const spaceName = spiltedHref.split("=")[1];
  return spaceName;
}
