const createMeal = () => {
  document.querySelector('.error').textContent = ''
  const title = document.getElementById('title').value
  const description = document.getElementById('description').value
  const location = document.getElementById('location').value
  const when = document.getElementById('when').value
  const max_reservations = document.getElementById('max_reservations').value
  const price = document.getElementById('price').value
  const created_date = document.getElementById('created_date').value
  if (title == '' || description == ''|| location == '' || when == ''|| max_reservations == '' || price == '' || created_date == '') {
      document.querySelector('.error').textContent = 'Please enter all fields'
  } else {
      fetch(`/api/meals`, {
              headers: {
                  'Content-Type': 'application/json',
              },
              method: 'POST',
              body: JSON.stringify({
                  'title': title,
                  'description': description,
                  'location': location,
                  'when': when,
                  'max_reservations': max_reservations,
                  'price': price,
                  'created_date': created_date
              })
          })
          .then(response => {
              console.log(response);
              if (response.status == '200') {
                  alert('Meal created successfully')
              } else {
                  console.log('Error creating meal');
              }
          })
  }
}
window.handleMealsRequest = () => {
  function renderMeals() {
      fetch("/api/meals")
          .then(response => response.json())
          .then(meals => {
              document.head.innerHTML = `
              <link rel="stylesheet" href="meals.css" />
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
            </style>`;
        document.body.innerHTML = `
       
     <body>
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
    <h1 class ="headding">Our Specials</h1>
      <div class="meals">
        
         <ul></ul>
         </div>
         <br><br>
          <section>
                 <div class="totalbox border">
                    <h2>Create/Add a Meal</h2>
                    <form method="POST" class="loginForm">
                       <label for="title">Title:</label><br>
                       <input type="text" id="title" name="title" value=""><br>
                       <label for="description">Description:</label><br>
                       <input type="text" id="description" name="description" value=""><br><br>
                       <label for="location">Location:</label><br>
                       <input type="text" id="location" name="location" value=""><br><br>
                       <label for="when">When:</label><br>
                       <input type="text" placeholder="yyyy-mm-dd" id="when" name="when" value=""><br><br>
                       <label for="max_reservations">Maximum reservations:</label><br>
                       <input type="text" id="max_reservations" name="max_reservations" value=""><br><br>
                       <label for="price">Price:</label><br>
                       <input type="text" id="price" name="price" value=""><br><br>
                       <label for="created_date">Created date:</label><br>
                       <input type="text" placeholder="yyyy-mm-dd" id="created_date" name="created_date" value=""><br><br>
                    </form>
                    <div class='error'></div>
                    <button class="loginbtn" onclick="createMeal()">Create meal</button>
                 </div>
              </section>
              </header>
           </body>
`;
              let mealsDiv = document.querySelector('.meals ul')
              mealsDiv.innerHTML = meals.map(meal => {
                  return `<li>
                          <img class="logo" src="/images/${meal.title}.jpg" alt="Meal title">
                          <h3>${meal.title}</h3><br>
                          <h4><i class="fa fa-eur" style="font-size:24px;"></i>  ${meal.price} DKK</h4>
                          <! -- <a class="btn link-button" href="/meal/${meal.id}" data-navigo></a> 
                          
                      </li>`
              }).join('')
              const search = document.querySelector('.search');
              search.addEventListener('input', () => {
                  let searchedValue = search.value
                  mealsDiv.innerHTML = meals.map(meal => {
                      if (meal.title.toUpperCase().includes(searchedValue.toUpperCase())) {
                          return `<li>
                       <img class="logo" src="https://source.unsplash.com/user/erondu/600x300?${meal.title}" alt="picture of meal title">
                        <h3>${meal.title}</h3><br>
                         <h4><i class="fa fa-eur" style="font-size:24px;"></i>  ${meal.price}</h4>
                          <a href='meal/${meal.price}'><strong>book now<strong></a><br><br>
                              </li>`
                      }
                  }).join('')
              })
          })
  }
  renderMeals()
} 