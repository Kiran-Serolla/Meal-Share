//render function
function renderReservation(reservation) {
    const div = document.createElement("div");
    const ul = document.createElement("ul");
    const li = document.createElement("li");
    li.innerHTML = `Name : ${Object.values(reservation.contact_name).join("")} <br> 
    Email : ${Object.values(reservation.contact_email).join("")} <br>
  Phone Number : ${reservation.contact_phone_number} <br>
   Number of people : ${reservation.number_of_guests}`;
    ul.appendChild(li);
    div.appendChild(ul);
    document.body.appendChild(div);
}
//reservation route handler
window.handleReservationRequest = (params) => {
    document.body.innerHTML = `
  <header>
  <h1>Meal Sharing</h1>
  <ul>
  <li><a href="/"> Home</a></li>
  <li><a href="meals"> Meals </a></li>
  <li><a href="reservations"> Reservations</a></li>
  <li><a href="reviews"> Reviews </a></li>
  <ul>
  </header>
  <h1> Reservations with id ${params.id}</h1>`;
    fetch(`/api/reservations/${params.id}`)
        .then((response) => response.json())
        .then(renderReservation);
};
