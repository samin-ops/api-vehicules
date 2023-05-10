const express = require('express');
const cors = require('cors');
require('./db/connect');

const routeVehicules = require('./routes/vehiculeRoute');
const routeUsers = require('./routes/userRoute');

const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(cors());

app.use('/api/v1', routeUsers);
app.use('/api/v1', routeVehicules);




app.get('/', (_req, res)=>{
    res.send("L' api d'essais a bien demarre ! ");
})


app.listen(port,()=>{
    console.log(`Server listerning into port:${port}`);
} )