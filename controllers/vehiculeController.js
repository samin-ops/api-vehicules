const {ObjectId }= require('mongodb');
const Model  = require('../models/vehiculesModel');



const ajouterVehicule = async (req, res)=>{
    try {
        const vehicule = new Model({
            nom:req.body.nom,
            marque:req.body.marque,
            ddte:req.body.ddte
        });
        let result = await vehicule.save();
        res.status(200).json({msg:`Le vehicule a ete bien enregistre \n ${result}`}); 
    } catch (error) {
        console.log(error); 
        res.status(501).json(error); 
    }
}
const afficherVehicules = async (req, res)=>{
    try {
        const {page=1, limit=10} = req.query;
        let cursor = Model.find().limit(limit*1).skip((page -1)*limit);
        let result = Promise.resolve(cursor);
        let resultat= await result;
        if(resultat.length > 0){
            res.status(200).json({total: resultat.length, resultat});
        }else{
            res.status(201).json({msg: "Aucun resultat trouve."})
    }   
    } catch (error) {
        console.log(error);
        res.status(501).json(error);   
    }
    
}

const afficherUnVehicule = async (req, res)=>{
    try {
        let id = new ObjectId(req.params.id);
        let cursor = Model.find({_id:id});
        let result = Promise.resolve(cursor);
        let resultat = await result;
        if(resultat.length>0){
            res.status(200).json(resultat[0]);
        }else{
            res.status(201).json({meg: "Aucun resultat pour cette recherche."})
    }   
    } catch (error) {
        console.log(error);
        res.status(501).json(error);   
    }
    
}

const modifierUnVehicule = async(req, res)=> {
    try {
        let id = new ObjectId(req.params.id);
        let newrecord = {
            nom:req.body.nom,
            marque:req.body.marque,
            ddte:req.body.ddte,
        }
        let result = Promise.resolve(Model.updateOne({_id:id}, {$set:newrecord}, {new: true}));
        let resultat= await result;
        if(resultat.matchedCount==1){
            res.status(200).json("Vehicule modifie avec success."); 
        }else{
            res.status(404).json({msg: "Ce Vehicule n'existe pas !"});
        }
        
    } catch (error) {
        console.log(error); 
        res.status(501).json(error); 
    }
}   

const supprimerUnVehicule = async(req, res)=> {
    try {
        let id = new ObjectId(req.params.id);
        let result = Promise.resolve( Model.deleteOne({_id:id}));
        let resultat = await result;
        if(resultat.deletedCount == 1){
            res.status(200).json("Vehicule a ete supprime avec success."); 
        }else{
            res.status(404).json({msg: "Ce Vehicule n'existe pas !"});
        }
        
    } catch (error) {
        console.log(error); 
        res.status(501).json(error); 
    }
}
// Faire des recherches par nom de voitures
const afficherParNomVehicules = async (req, res)=>{
    try {
        const {page=1, limit=10} = req.query;
        const kw = req.query || "";
        if(kw.length<2){
            const msg = "Le terme de recherche doit avoir au moins 2 caracteres."
            res.status(500).json(msg);
        }
    let cursor = Model.find({nom:{$regex:".*(?i)"+kw+".*"}}).limit(limit*1).skip((page-1)*limit);// a revoir 
    let result = Promise.resolve(cursor);
    let resultat= await result;
    if(resultat.length > 0){
        res.status(200).json({total: resultat.length, resultat});
    }else{
        res.status(201).json({msg: "Aucun resultat trouve."})
    }   
    } catch (error) {
        console.log(error);
        res.status(501).json(error);   
    }
    
}

module.exports = {
    ajouterVehicule, 
    afficherVehicules, 
    afficherUnVehicule, 
    modifierUnVehicule,
    supprimerUnVehicule,
    afficherParNomVehicules
};

