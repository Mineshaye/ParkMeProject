async function fetchAndPopulateDropDown() {
  try {
    // Fetch list of parking spaces from the API
    const response = await fetch("http://localhost:3000/api/parking");
    const parkingSpaces = await response.json();

    // Populate the dropdown with parking spaces
    const placeDropdown = document.getElementById("place");
    parkingSpaces.details.forEach((space) => {
      const option = document.createElement("option");
      option.value = space.name;
      placeDropdown.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  fetchAndPopulateDropDown();
  const parkingForm = document.getElementById("parkingForm");
  parkingForm.addEventListener("submit", parkingFormSubmitHandler);
});

function parkingFormSubmitHandler(event) {
  event.preventDefault();
  const selectedSpaceId = document.getElementById("location").value;
  window.location.href = `/parking.html?spacename=${selectedSpaceId}`;
}
