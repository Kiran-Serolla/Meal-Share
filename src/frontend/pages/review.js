//render function
function renderReview(review) {
    const div = document.createElement("div");
    div.setAttribute("class", "review-div");
    const ul = document.createElement("ul");
    const li = document.createElement("li");
    li.innerHTML = `Name : ${Object.values(review.name).join("")} <br>
    Title : ${Object.values(review.title).join("")} <br> 
    Description : ${Object.values(review.description).join("")}`;
    div.appendChild(ul);
    ul.appendChild(li);
    document.body.appendChild(div);
}
//review route handler
window.handleReviewRequest = (params) => {
    document.head.innerHTML = `
                    <link rel="stylesheet" href="review.css" />
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                    <link href="images/Group.png" rel="icon">
                    <title>Review</title>
                    `;
    document.body.innerHTML = ` 
    <body>
    <!-- Navigation Bar -->
    <div class="navbar">
       <a href="/">Home</a>
       <a href="meals">Meals</a>
       <a href="reservations">Reservations</a>
       <a href="reviews">Review</a>
    </div>
      
                <section id="gallery">
                <h1>All Foods Review</h1>
                <p>You can find our food based on our foods review.</p>
                  <div class="thumbnail">
                  <p>Review : 0.4</p>
                      <div class="img-container"><a href=""><img src="images/3.jpg" alt="..." />
                      <div class="img-caption table"><span class="table-cell"><button class="btn btn-p btn-trans" role="button"></button></span></div></a></div>
                      
                  </div>
                  <div class="thumbnail ">
                  <p>Review : 0.3</p>
                      <div class="img-container"><img src="images/04.jpg" alt="..." />
                      <div class="img-caption table"><span class="table-cell"><button class="btn btn-p btn-trans" role="button">more</button></span></div></div>
                  </div>
                  <div class="thumbnail ">
                  <p>Review : 0.5</p>
                      <div class="img-container"><img src="images/02.jpg" alt="..." />
                      <div class="img-caption table"><span class="table-cell"><button class="btn btn-p btn-trans" role="button">more</button></span></div></div>
                  </div>
                  
                  <div class="thumbnail ">
                  <p>Review : 0.3</p>
                      <div class="img-container"><img src="images/2.jpg" alt="..." />
                      <div class="img-caption table"><span class="table-cell"><button class="btn btn-p btn-trans" role="button">more</button></span></div></div>
                  </div>
                  <div class="thumbnail ">
                  <p>Review : 0.4</p>
                      <div class="img-container"><img src="images/1.jpg" alt="..." />
                      <p>You can find our food based on our foods review.</p>
                      <div class="img-caption table"><span class="table-cell"><button class="btn btn-p btn-trans" role="button">more</button></span></div></div>
                  </div>
                  <div class="thumbnail ">
                  <p>Review : 0.2</p>
                      <div class="img-container"><img src="images/01.jpg" alt="..." />
                      <div class="img-caption table"><span class="table-cell"><button class="btn btn-p btn-trans" role="button">more</button></span></div></div>
                  </div>
  
</div>    
</section>
      
      
      `;
    fetch(`/api/review/${params.id}`)
        .then((response) => response.json())
        .then(renderReview);
};
