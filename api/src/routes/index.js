const { Router } = require('express');
const { Razas, Temperamentos } = require('../db.js');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
    YOUR_API_KEY
} = process.env;

const fetch = require("node-fetch")

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


//------------------------------------------------------------
let idRaza = 300
router.post('/dogs', async function (req, res) {
    const { name, height, weight, years, nameT, sexo} = req.body;
    console.log(req.body)
    try {
        let newRaza = await Razas.create({
            id: idRaza++,
            name,
            height,
            weight,
            years,
            sexo

        })
        console.log(newRaza)
        

        await newRaza.setTemperamentos(nameT)

    } catch (error) {
        res.status(500).send(error)
    }
})

///////////////////////////////////////////////////////////////////////////////

router.get('/dogs', async function (req, res) {
    // query: despues del ?
    var { name } = req.query;
    if(name) {
        fetch(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)
        .then(data => data.json())
        .then(async json => {
            let raza = await Razas.findAll({
                include: [
                    {
                        model: Temperamentos,
                        required: true
                    }
                ]
            });
        
                raza.forEach(dato => {
                    if(dato.dataValues.name.includes(name)) {
                    let temperament = dato.dataValues.temperamentos.map(temp => {
                        return temp.dataValues.nameT;
                    })
                    dato.dataValues.temperamentos = temperament[0];
                        json.push(dato.dataValues) }
                    }
                );

            if(json.length > 0) {

                let razaEnc = [];

                for (let i = 0; i < json.length; i++) {
                    let raza1 = {
                        id: json[i].id,
                        name: json[i].name,
                        img: `https://cdn2.thedogapi.com/images/${json[i].reference_image_id}.jpg` || "https://us.123rf.com/450wm/bestpetphotos/bestpetphotos1712/bestpetphotos171200177/91448764-perrito-dogloval-triste-lindo-del-perro-del-perro-de-aguas-de-rey-charles-en-fondo-blanco-aislado-de.jpg?ver=6",
                        temperament: json[i].temperament || json[i].temperamentos
                    }
                    razaEnc.push(raza1);
                }                   
                res.json(razaEnc)
            }

        }) 


    } else {

        fetch(`https://api.thedogapi.com/v1/breeds/?api_key=${YOUR_API_KEY}`)
        .then(data => data.json())
        .then(async json => {
    
            let razasCr = await Razas.findAll({
                include: Temperamentos
            });
           

            razasCr.forEach(dato => {
                let temperament = dato.dataValues.temperamentos.map(temp => {
                    return temp.dataValues.nameT;
                })
                dato.dataValues.temperamentos = temperament[0];
                    json.push(dato.dataValues)
                }
            );

                let raza2 = json.map(dato => {
                    return {
                        id: dato.id,
                        img: dato.image && dato.image.url || "https://us.123rf.com/450wm/bestpetphotos/bestpetphotos1712/bestpetphotos171200177/91448764-perrito-dogloval-triste-lindo-del-perro-del-perro-de-aguas-de-rey-charles-en-fondo-blanco-aislado-de.jpg?ver=6",
                        name: dato.name,
                        temperament: dato.temperament || dato.temperamentos
                    }
                });

                raza2.sort((a,b) => (a.name>b.name)? 1 : -1)
                
                res.json(raza2)
            })
    }
})
///////////////////////////////////////////////////////////////////////////////

router.get('/dogs/:idRaza', async function (req, res) {
    
    var { idRaza } = req.params;
        fetch(`https://api.thedogapi.com/v1/breeds/?api_key=${YOUR_API_KEY}`)
        .then(data => data.json())
        .then(async json => {
            
            let raza = json.find(dato => dato.id === parseInt(idRaza));
            if (raza) {
                return res.json({
                    img: raza.image && raza.image.url || "https://us.123rf.com/450wm/bestpetphotos/bestpetphotos1712/bestpetphotos171200177/91448764-perrito-dogloval-triste-lindo-del-perro-del-perro-de-aguas-de-rey-charles-en-fondo-blanco-aislado-de.jpg?ver=6",
                    name: raza.name || 'No Encontrado',
                    temperament: raza.temperament || raza.temperamentos || 'No Encontrado',
                    weight: raza.weight.metric || 'No Encontrado',
                    height: raza.height.metric || 'No Encontrado',
                    life_span: raza.life_span || 'No Encontrado',
                })
            } else { 
            let razaC = await Razas.findAll({
                include: [{
                        model: Temperamentos,
                        required: true
                    }]
            });
        
            // console.log(userBreeds)
            let creadaR = razaC.find(dato => dato.dataValues.id === parseInt(idRaza));
            if (creadaR) {
                return res.json({
                    img: creadaR.dataValues.img || "https://us.123rf.com/450wm/bestpetphotos/bestpetphotos1712/bestpetphotos171200177/91448764-perrito-dogloval-triste-lindo-del-perro-del-perro-de-aguas-de-rey-charles-en-fondo-blanco-aislado-de.jpg?ver=6",
                    name: creadaR.dataValues.name || 'No Encontrado',
                    temperament: creadaR.dataValues.temperamentos[0].nameT || 'No Encontrado',
                    weight: creadaR.dataValues.weight || 'No Encontrado',
                    height: creadaR.dataValues.height || 'No Encontrado',
                    life_span: creadaR.dataValues.life_span || 'No Encontrado',
                })
            };
            return res.status(404).json({message: "No Encontrado"})
            } 
        } 
        )
        .catch(err => { 
            console.error(err)
            return
        });
    });

///////////////////////////////////////////////////////////////////////////////

let temp = [];
fetch(`https://api.thedogapi.com/v1/breeds/?api_key=${YOUR_API_KEY}`)
    .then(response => response.json())
    .then(json => {
        json?.forEach(b => {
            let temps = b.temperament?.split(', '); 
            temps?.forEach(t => {
                if (!temp.find(tp => tp.name === t)) {
                    temp.push({ name: t });
                    console.log(temp)
                }
            });
        })
    })
    .then(() => {
        temp.forEach(t => {
            Temperamentos.findOrCreate({
                where: {
                    nameT: t.name
                }
            })
        })
    })
    .catch(err => console.error(err));


router.get('/temperament', async function(req, res){
    
    await Temperamentos.findAll()
            .then(result => res.json(result))
})
///////////////////////////////////////////////////////////////////////////////



module.exports = router;

// https://api.thedogapi.com/v1/breeds/?api_key=${YOUR_API_KEY}
// 'https://api.thedogapi.com/v1/breeds'