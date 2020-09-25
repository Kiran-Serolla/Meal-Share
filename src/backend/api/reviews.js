const { request, response } = require("express");
const express = require("express");
const router = express.Router();
const knex = require("../database");

// GET all reviews
router.get("/", async(request,response)=>{
    try{
        const reviews = await knex("review").select("*");
        response.json(reviews);
    } catch (error){
        throw error;

    }
    
})

// POST - add a new review

const addReview = async({body}) => {
    const {
        id,
        title,
        description,
        stars,
        created_date,
        Meal_id,
    } = body;
    return await knex("review").insert({
        id : id,
        title : title,
        description : description,
        stars: stars,
        created_date : created_date,
        Meal_id : Meal_id
    })
}
router.post("/", async (request,response) =>{
    addReview({
        body: request.body,
    })
    .then((result)=> response.json(result))
    .catch((error)=>{
        response.status(400).send("Bad request").end()
        console.log(error)
    })
})

// GET review by id
router.get("/:id", async(request,response)=>{
    try{
        const reviewWithId = await knex("reservation")
        .select("*").where({
            id: parseInt(request.params.id)
        })
        response.json(reviewWithId)
    } catch(error){
        throw error;
    }
})
// implementing PUT -- update reservation
const updateReview = async({body, id}) => {
    const {
        title,
        description,
        stars,
        created_date,
        Meal_id,
    } = body;

const review = await knex.from("review")
.select("*").where({ id:id,});

if(review.length === 0){
    throw new HttpError("Bad request!!")
}
 const qureyDto = {
        id,
        title,
        description,
        stars,
        created_date,
        Meal_id,
 };

 if (Object.keys(qureyDto).length !== 0){
     return await knex("review")
     .where({
         id: id,
     })
     .update(qureyDto);
 }else return "Nothing was updated!"
 }
 router.put("/:id", async(request,response)=>{
    updateReview({
         body: request.body,
         id : request.params.id,
     }).then ((result)=>response.json(result))
     .catch((error)=>{
         response.status(400).send("BAD REQUEST!").end()
         console.log(error)
     })
 })
module.exports = router;