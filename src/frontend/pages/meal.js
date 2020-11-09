function showSingleMeal(meals){
  console.log(meals);
    
    return meals.map((meal) => {
      return`
      <img class = "meal-image"src="/images/${meal.title}.jpg" alt="Book Reservation" />
       <h4  >${meal.title}</h4><br>
       <p >${meal.description}<br>Price: ${meal.price}</p>
       <form action = "../../api/reservations" method="post">
       <div class="form-group">
         <label>Meal_id</label>
         <input id = "mealid" class="form-control" type="number" name="meal_id" value = "${meal.id}" />
              </div>  `
     });
    }
    // Add reservation 

    function addreservation(event) {
      event.preventDefault();
      const mealid = document.getElementById('mealid').value;
      const name = document.getElementById('contactname').value;
      const number = document.getElementById('number').value;
      const phone = document.getElementById('phone').value;
      const email = document.getElementById('email').value;
    
      const inputdata = {
        number_of_guests: number,
        Meal_id: mealid,
        created_date: new Date().toISOString().slice(0, 10), //'2020-08-17',
        contact_phonenumber: phone,
        contact_name: name,
        contact_email: email,
      };
      fetch('/api/reservations', {
        method: 'POST',
        body: JSON.stringify(inputdata),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => clearform());
    }

  window.handleMealRequest = async (params) => {
    const oneMealResponse = await fetch(`/api/meals/${params.id}`);
    const oneMeal = await oneMealResponse.json();
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
            <div class="content-wrapper">
            ${showSingleMeal(oneMeal)}
            
                <div class="form-group">
                  <label>Name</label>
                  <input id = "name" class="form-control" type="text" name="name" placeholder="Enter name" /><br>
                  <label>Email</label>
                  <input  id = "email" class="form-control" type="email" name="Email" placeholder="example@gmail.com" /><br>
                    <label>Phone</label>
                  <input id = "phone" class="form-control" type="tel" name="Phone" placeholder="0045-12345678" /><br>
                    <label>number_of_guests</label>
                    <input id = "number" class="form-control" type="number" name="number_of_guests" min="1" max="20" placeholder="Choose a number from list" /><br>
                    <label>created_date</label>
                    <input class="form-control" type="text" name="created_date" placeholder="yyyy-mm-dd"/><br>
                    <button onClick = addreservation() >Submit</button>
                </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  
    <!-- page footer -->
    <!-- Footer -->
  <footer class="w3-center w3-light-grey w3-padding-32">
    <p>Powered by Kiran</p>
  </footer>
  
  </div>`
  
   
  }
  
    
  
  