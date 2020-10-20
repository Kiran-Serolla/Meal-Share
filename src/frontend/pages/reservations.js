
function showAllReservations(reservations){
  
  return reservations.map((reservation) => {
    return` 
    <li><img src="/images/${meal.title}.jpg" alt="review title">
    <h5>Meal ID :${reservation.Meal_id}</h5>
    <p>  Reservation ID ${reservation.id}<br>
    Contact e-mail : ${reservation.contact_email}<br> 
    Created date: ${reservation.created_date} <br>
    Number of Guests: ${reservation.number_of_guests}</p>
    </li>  `
   });
  }
window.handleReservationsRequest = async () => {
  //we are fetching the data from backend here
  const reservationsResponse = await fetch("/api/reservations");
  const getReservations = await reservationsResponse.json();
  console.log (getReservations)
  
  document.body.innerHTML = `
  <link rel="stylesheet" href="index.css" />
     <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <link href="images/Group.png" rel="icon">
    <title>Meals</title> 
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
             <a href="/meals" class="w3-bar-item w3-button">Meals</a>
             <a href="/reservations" class="w3-bar-item w3-button">Reservations</a>
             <a href="/review" class="w3-bar-item w3-button">Review</a>
           </div>
           </div>
        </div>
         
            </div>
  <body>
 
                 <h2>All Reservations</h2>
          <ul class="products">
          ${showAllReservations(getReservations)}
          </ul>
        </section>
      </div>
    </div>
    

    <!-- page footer -->
    <!-- Footer -->
  <footer class="w3-center w3-light-grey w3-padding-32">
    <p>Powered by Kiran</p>
  </footer>

  </div>`
};