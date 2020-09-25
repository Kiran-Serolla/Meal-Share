const { request, response } = require("express");
const express = require("express");
const router = express.Router();
const knex = require("../database");
// GET all reservations
router.get("/", async(request,response)=>{
    try{
        const reservations = await knex("reservation").select("*");
        response.json(reservations);
    } catch (error){
        throw error;

    }
    
})
// POST - add a new reservation

const addReservation = async({body}) => {
    const {
        id,
        number_of_guests,
        created_date,
        contact_phonenumber,
        contact_name,
        contact_email,
        Meal_id,
    } = body;
    return await knex("reservation").insert({
        id : id,
        number_of_guests : number_of_guests,
        created_date : created_date,
        contact_phonenumber : contact_phonenumber,
        contact_name : contact_name,
        contact_email : contact_email,
        Meal_id : Meal_id
    })
}
router.post("/", async (request,response) =>{
    addReservation({
        body: request.body,
    })
    .then((result)=> response.json(result))
    .catch((error)=>{
        response.status(400).send("Bad request").end()
        console.log(error)
    })
})

// GET reservation by id
router.get("/:id", async(request,response)=>{
    try{
        const reservationWithId = await knex("reservation")
        .select("*").where({
            id: parseInt(request.params.id)
        })
        response.json(reservationWithId)
    } catch(error){
        throw error;
    }
})

// implementing PUT -- update reservation


const updateReservation = async({body, id}) => {
    const {
        number_of_guests,
        created_date,
        contact_phonenumber,
        contact_name,
        contact_email,
        Meal_id,
    } = body;

const reservation = await knex.from("reservation")
.select("*").where({ id:id,});

if(reservation.length ===0){
    throw new HttpError("Bad request")
}
 const qureyDto = {
    id,
    number_of_guests,
    created_date,
    contact_phonenumber,
    contact_name,
    contact_email,
    Meal_id,
 }

 if(Object.keys(qureyDto).length !== 0){
     return await knex("reservation")
     .where({
         id : id,
     }).update(qureyDto);
 }else return  "Nothing Updated!"
}
router.put("/:id", async(request,response)=>{
    updateReservation({
        body:request.body,
        id: request.params.id,
    })
    .then((result)=> response.json(result))
    .catch((error)=>{
        response.status(400).send("Bad request")
        console.log(error)
    })
})
// implementing DELETE

const deleteReservation = async({id})=>{
    const reservation = await knex.from("reservation")
    .select("*").where({id : id});
    if (reservation.length ===0){
        throw new HttpError("Bad request")
    }
    if(Object.keys(reservation).length !== 0){
        return await knex ("reservation")
        .where({id : id}).delete(reservation)
    }else return "Nothing deleted"
}
 router.delete("/:id", async(request,response)=>{
     deleteReservation({
         id: request.params.id,
     }).then((result)=> response.json(result))
     .catch((error)=>{
         response.status(400).send("Bad request..").end()
         console.log(error)
     })
 })

module.exports = router;