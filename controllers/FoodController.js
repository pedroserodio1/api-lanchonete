const db = require('../models');
const { Op } = require('sequelize');

class FoodController{

    static async defaultRoute(req, res){
        res.status(200).json({Nome: "Api Lanchonete", Autor: "Pedro Serôdio", Descrição: "Api desenvolvida para meios de aprendizado", Repositorio: "https://github.com/pedroserodio1/api-lanchonete.git", "Redes Sociais":{Twitter: "twitter.com/pedroserodio", Facebook: "facebook.com/pedrohenrique.serodio30", Instagram: "instagram.com/pedroserodio", Discord: "serodinho#7052", Linkedin: "linkedin.com/in/pedroserodio1"}});
    }

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

    static async searchFoodByName(req, res){
        const { name } = req.params;

        try{
            
            const foods = await db.Food.findAll({
                where:{
                    name: name
                }
            });

            foods.forEach((food) => {
                res.status(200).json({Nome: food.name, Igredientes: food.ingredients, Valor: food.value, Tipo: food.type, Tem: food.avaliable ? "Sim":"Nao"})
            });

            

        }catch(error){
            res.status(500).json(error.message);
        }
    }

    static async searchFoodByType(req, res){
        const { type } = req.params;
        let AllFood = [];
        let i = 0;

        try{
            
            const foods = await db.Food.findAll({
                where:{
                    type: type
                }
            });

            foods.forEach((food) => {
                AllFood[i] = {
                    Nome: food.name, 
                    Igredientes: food.ingredients, 
                    Valor: food.value, 
                    Tipo: food.type, 
                    Tem: food.avaliable ? "Sim":"Nao"
                } 
                i++;
            }); 


             res.status(200).json(AllFood);

        }catch(error){
            res.status(500).json(error.message);
        }
    }

    static async priceFilter(req, res){
        const { BiggerOrSmaller, price} = req.params;
        let AllFood = [];
        let i = 0;

        
        try{

            if(BiggerOrSmaller.toLowerCase() == "menor"){
                const foods = await db.Food.findAll({
                    where:{
                      value:{
                          [Op.lte] : price
                      }
                    }
                });

                if(foods.length == 0){
                    return res.status(400).json({Status: `Não foi encontrado nenhum produto ${BiggerOrSmaller} que ${price}`})
                }

                foods.forEach((food) => {
                    AllFood[i] = {
                        Nome: food.name, 
                        Igredientes: food.ingredients,  
                        Valor: food.value, 
                        Tipo: food.type, 
                        Tem: food.avaliable ? "Sim":"Nao"
                    } 
                    i++;
                }); 

            }else{
                if(BiggerOrSmaller.toLowerCase() == "maior"){
                    const foods = await db.Food.findAll({
                        where:{
                          value:{
                              [Op.gte] : price
                          }
                        }
                    });

                    if(foods.length == 0){
                        return res.status(400).json({Status: `Não foi encontrado nenhum produto ${BiggerOrSmaller} que ${price}`})
                    }
    
                    foods.forEach((food) => {
                        AllFood[i] = {
                            Nome: food.name, 
                            Igredientes: food.ingredients, 
                            Valor: food.value, 
                            Tipo: food.type, 
                            Tem: food.avaliable ? "Sim":"Nao"
                        } 
                        i++;
                    }); 
                }else{
                    res.status(400).json({status: `O parametro ${BiggerOrSmaller} é invalido`, "Paremetro Valido": "Maior ou Menor"});
                }
            }
            

            
            
             res.status(200).json(AllFood);

        }catch(error){
            res.status(500).json(error.message);
        }
        
    }

}

module.exports = FoodController;
