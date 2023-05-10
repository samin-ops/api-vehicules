
const express = require('express');
const router = express.Router();
const auth = require('../auth/verifyToken');

const { 
    ajouterVehicule, 
    afficherVehicules, 
    afficherUnVehicule, 
    modifierUnVehicule ,
    supprimerUnVehicule,
    afficherParNomVehicules
} = require('../controllers/vehiculeController');


router.route('/vehicules').post(auth, ajouterVehicule);
router.route('/vehicules').get(auth, afficherVehicules);
router.route('/vehicules/:id').get(auth, afficherUnVehicule);
router.route('/vehicules/:id').put(auth, modifierUnVehicule);
router.route('/vehicules/:id').delete(auth, supprimerUnVehicule);
router.route('/vehicules/:kw').delete(auth, afficherParNomVehicules);

module.exports = router;