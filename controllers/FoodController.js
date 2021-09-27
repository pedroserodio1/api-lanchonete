const db = require('../models');

class FoodController{

    static async listFoods(req, res){

        try{
            const foods = await db.Food.findAll();
            return res.status(200).json(foods);
        }catch(error){
            res.status(500).json(error.message);
        }

    }

    static async createFood(req, res){
        const data = req.body;

        try{
            const createdFood = await db.Food.create(data);
            return res.status(201).json(createdFood);   
        }catch(error){
            res.status(500).json(error.message);
        }
    }

    static async deleteFood(req, res){
        const { id } = req.params;

        try{
            await db.Food.destroy({
                where:{
                    id: Number(id)
                }
            });

            return res.status(200).json({status: `Comida com id: ${id} deletada`});
        }catch(error){
            res.status(500).json(error.message);
        }
    }

    static async editFood(req, res){
        const { id } = req.params;
        const newData = req.body;

        try{
            await db.Food.update(newData, {
                where:{
                    id: Number(id)
                }
            });

            const newFood = await db.Food.findOne({
                where:{
                    id: Number(id)
                }
            });

            return res.status(200).json(newFood);
        }catch(error){
            res.status(500).json(error.message);
        }

    }

    static async searchFood(req, res){
        const { name } = req.params;

        try{
            const food = await db.Food.findOne({
                where:{
                    name: name
                }
            });

            res.status(200).json({Valor: food.value, Sabor: food.ingrediets, Disponivel: food.avaliable ? "Sim" : "Nao"});

        }catch(error){
            res.status(500).json(error.message);
        }
    }
}

module.exports = FoodController;