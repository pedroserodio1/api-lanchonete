const { Router } = require('express');
const FoodController = require("../controllers/FoodController");
const router = Router();

router.get("/listFoods", FoodController.listFoods);

router.post("/createFood", FoodController.createFood);

router.delete("/deleteFood/:id", FoodController.deleteFood);

router.put("/editFood/:id", FoodController.editFood);

router.get("/searchFood/:name", FoodController.searchFood);

module.exports = router;