function showAllReviews(reviews){
  
    return reviews.map((review) => {
      return`
  
      <li><img src="/images/${review.title}.jpg" alt="review title">
      <h5>${review.title}</h5>
      <p>${review.description}<br> Stars: ${review.stars}
      <a class="btn link-button" href="/meal/${review.id}" data-navigo>Book Seat</a>
      </li>`
     });
    }
  window.handleReviewsRequest = async () => {
    // fetching data from backend 
    const reviewsResponse = await fetch("/api/reviews");
    const getReviews = await reviewsResponse.json();
    
    document.body.innerHTML = `<body>
    <div class="page-section">
      <!-- page header -->
      <header>
        <div class="container">
          <div class="header-group">
            <div class="logo">
              <a><span>Indo</span> Meal</span></a>
            </div>
            <nav class="navbar navbar-expand-md">
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler"
                aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                &#9776;
              </button>
              <div class="collapse navbar-collapse" id="navbarToggler">
                <ul>
                  <li>
                    <a href="/" data-navigo>Home</a>
                  </li>
                  <li>
                    <a href="meals" data-navigo>Meals</a>
                  </li>
                  <li>
                    <a href="reservations" data-navigo>Reservations</a>
                  </li>
                  <li>
                    <a href="reviews" data-navigo>Reviews</a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </header>
  
      <!-- page banner-->
      <div class="page-banner">
      <div class="background" style="background-image: url(images/home-banner3.jpg);"></div>
      <div class="container">
        <div class="banner-content">
          <h1>Flavors of Indian Food</h1>
          <p>Indian food is different from rest of the world not only in taste but also in cooking methods. It reflects a perfect blend of various cultures and ages. Just like Indian culture, food in India has also been influenced by various civilizations, which have contributed their share in its overall development and the present form.</p>
          <div class="botton-actions">
            <a href="reviewForm"><button class="btn btn-primary" data-navigo>Write review here</button></a>
          </div>
        </div>
      </div>
    </div>
  
      <!-- page contetnt -->
      <div class="page-content">
        <div class="container">
          <!-- Our meals -->
          <section class="featured-meals">
            <!--<h2>Meals</h2>-->
            <ul class="products">
            ${showAllReviews(getReviews)}
            </ul>
          </section>
        </div>
      </div>
  
      <!-- page footer -->
      <footer>
        <div class="container">
          <p>&copy; 2020 Indo Meal@Aswini Gundreddy.</p>
        </div>
      </footer>
  
    </div>`
  };
  
  
    