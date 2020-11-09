window.handleReservationsRequest = () => {
  document.body.innerHTML = `
  <!DOCTYPE html>
  <html>
  <title>MealShare</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
  <style>
  body {font-family: "Times New Roman", Georgia, Serif;}
  h1, h2, h3, h4, h5, h6 {
    font-family: "Playfair Display";
    letter-spacing: 5px;
  }
  </style>
  <!-- Navbar (sit on top) -->
  <div class="w3-top">
    <div class="w3-bar w3-white w3-padding w3-card" style="letter-spacing:4px;">
      <a href="#home" class="w3-bar-item w3-button">Share Meals Share Joy</a>
      <!-- Right-sided navbar links. Hide them on small screens -->
      <div class="w3-right w3-hide-small">
      <a href="/" class="w3-bar-item w3-button">Home</a>
        <a href="meals" class="w3-bar-item w3-button">Meals</a>
        <a href="reservations" class="w3-bar-item w3-button">Reservations</a>
        <a href="review" class="w3-bar-item w3-button">Review</a>
      </div>
    </div>
  </div>

 
  
  <ul class="all-meals">
  </ul> 
  
  <hr>
   
  <!-- Footer -->
  <footer class="w3-center w3-light-grey w3-padding-32">
    <p>Powered by Kiran</p>
  </footer>
  </div>
     `;

  fetch('/api/reservations')
    .then((response) => response.json())
    .then((reservations) => {
      console.log(reservations)
      const ul = document.querySelector('.all-meals');
      for (let i = 0; i < reservations.length; i++) {
        let li = document.createElement('li');
        li.innerHTML = `Meal ID: ${reservations[i].Meal_id}<br>
        Name: ${reservations[i].contact_name}<br>
        Number of guests: ${reservations[i].number_of_guests}<br><br>`;
        ul.appendChild(li);
      }
    });
};