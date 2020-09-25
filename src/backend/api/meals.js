const { request, response } = require("express");
const express = require("express");
const router = express.Router();
const knex = require("../database");

// implementing GET

router.get("/", async (request, response) => {
  try {
        let meals;
    if (request.query.maxPrice) {// get meals cheaper than max price
      console.log('maxprice check' + Number(request.query.maxPrice));
      meals = await knex('meal')
        .select('*')
        .where('price', '<', Number(request.query.maxPrice));
    } else if (request.query.title) {// get meals matching title
          meals = await knex('meal')
        .select('*')
        .where('title', 'like', '%' + request.query.title + '%');
    } else if (request.query.createdAfter) { // get meals created after given date
            meals = await knex('meal')
        .select('*')
        .where('created_date', '>', request.query.createdAfter.toString());
    } else if (request.query.limit) { // limit meals
          meals = await knex('meal')
        .select('*')
        .orderBy('id')
        .limit(Number(request.query.limit));
    } else if (request.query.availableReservations === 'true') { // get meals that still have reservations available
      meals = await knex('meal')
        .select('meal.*')
        .count('reservation.id')
        .from('meal')
        .leftJoin('reservation', 'meal.id', '=', 'reservation.id')
        .groupBy('meal.id')
        .having('meal.max_reservations', '>', '.count(reservation.id)');
    } else {
           meals = await knex('meal').select('*'); // get all meals
    }
    response.json(meals);
  } catch (error) {
    throw error;
  }
});

// return meal by id  GET

router.get("/:id", async (request, response) => {
  try {
    const mealWithGivenId = await knex("meal")
    .select("*") 
    .where({
      id : parseInt(request.params.id),
    });
    response.json(mealWithGivenId);
  }
  catch (error){
    throw error;
  }

});

// implementing POST
const addMeal = async ({ body }) => {
  const {
    id,
    title,
    description,
    location,
    when,
    max_reservations,
    price,
    created_date,
  } = body;
  return await knex('meal').insert({
    id: id,
    title: title,
    description: description,
    location: location,
    when: when,
    max_reservations: max_reservations,
    price: price,
    created_date: created_date,
  });
};
router.post('/', async (request, response) => {
  addMeal({
    body: request.body,
  })
    .then((result) => response.json(result))
    .catch((error) => {
      response.status(400).send('Bad request').end();
      console.log(error);
    });
});

// implementing PUT -- updating a meal

const updateMeal = async ({body, id}) =>{
  const {
    title,
    description,
    location,
    when,
    max_reservations,
    price,
    created_date,
  } = body;
const meal = await knex.from("meal")
.select("*")
.where ({id: id,});
if(meal.length === 0){
  throw new HttpError("Bad request",404);

}
const queryDto = {
  id,
  title,
  description,
  location,
  when,
  max_reservations,
  price,
  created_date,
};
if(Object.keys(queryDto).length !== 0){
  return await knex("meal").where({
    id : id
  })
  .update(queryDto)
} else return "Nothing updated!"

}
router.put('/:id', async (req, res) => {
  updateMeal({
    body: req.body,
    id: req.params.id,
  })
    .then((result) => res.json(result))
    .catch((error) => {
      res.status(400).send('Bad request').end();
      console.log(error);
    });
});

// implementing DELETE -- deleting a meal

const deleteMeal = async({id}) =>{

  const meal = await knex.from ("meal")
  .select("*").where({id : id,})
if (meal.length === 0){
  throw new HttpError("Bad request" , 404)
} 
if (Object.keys(meal).length !==0){
  return await knex("meal")
  .where({id :id,}).delete(meal);
}else return "Nothing deleted"
}

router.delete("/:id", async(request,response)=>{
  deleteMeal({
    id: request.params.id,
  }).then((result) => response.json(result))
  .catch((error)=> {
    response.status(400).send("Bad request").end()
    console.log(error)
  });
})
module.exports = router;
