const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const pug = require('pug')
const session = require('express-session');
var { flash } = require('express-flash-message');

require('dotenv').config();

const dbController = require("./db_controller");

const app = express();

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }));
app.use(flash({ sessionKeyName: 'flashMessage' })); // if you don't provide sessionKeyName, then it will use 'flash' to store in your sessison.


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'pug')
app.set("views", path.join(__dirname, "views"));


//db tests
dbController.createAllTables();

/*
dbController.deleteLab(2, (err, result)=>{
    if(err) return console.log(err);
    return console.log(result);
});
*/


app.get('/', (req, res)=>{
    dbController.getLab(null, (err, result)=>{
        if(err) return res.send(err);

        let labs = result.data;

        dbController.getExperiment(null, async(err, result)=>{
            if(err) return res.send(err);

            let experiments = result.data;
            let flash = await req.consumeFlash('info');

            dbController.getOccuredExperiments((err, result)=>{
                if(err) return res.send(err);

                let occuredExperiments = result.data;

                console.log(occuredExperiments)
                
                return res.render('home', {labs, experiments, flash, occuredExperiments });
            });
        });
    });
});

app.route('/exp_occured')
    .post((req, res)=>{
        if(req.body.lab_id && req.body.exp_id) {
            dbController.submitExperiment({
                lab_id: req.body.lab_id,
                exp_id: req.body.exp_id,
                information: req.body.information
            }, (err, result)=>{
                if(err) {
                    return res.send(err.message);
                }

                return res.redirect('/');
            });
        }
    })

app.route('/chemical')
    .post((req, res)=>{
        if(req.body.name && req.body.min_quant && req.body.unit && req.body.formula) {
            dbController.defineChemical({name: req.body.name, unit: req.body.unit, min_quant: req.body.min_quant, formula: req.body.formula}, (err, result)=>{
                if(err) return res.send(err);

                return res.redirect('/inventory');
            })
        } else {
            return res.redirect('/inventory');
        }
    })

app.route('/inventory')
    .get((req, res)=>{

        dbController.getLab(null, (err, result)=>{
            if(err) return res.send(err);
    
            let labs = result.data;
    
            dbController.getExperiment(null, (err, result)=>{
                if(err) return res.send(err);
    
                let experiments = result.data;

                dbController.getInventoryItems((err, result)=>{
                    if(err) return res.send(err);

                    let inventory = result.data;
    
                    dbController.getChemical(null, (err, result)=>{
                        if(err) return res.send(err);
                        let chemicals = result.data;
    
                        res.render('inventory', {chemicals, labs, experiments, inventory});
                    })
                });

                
            });
        });

       
    })
    .post((req, res)=>{
        if(req.body.chem_id && req.body.expire_date && req.body.quantity && req.body.lab_id) {
            dbController.addToInventory({
                chem_id:parseInt(req.body.chem_id), 
                expire_date: req.body.expire_date,
                quantity: parseInt(req.body.quantity),
                lab_id: parseInt(req.body.lab_id)
            }, (err, msg)=>{
                if(err) req.flash('info', err);
                else req.flash('info', 'inventory item added.')

                return res.redirect('/inventory');
            });
        } else {
            req.flash('info', 'data is not valid')

            console.log("data is not valid");

            return res.redirect('/inventory');
        }
    });


app.route('/lab')
    .get((req, res)=>{
        dbController.getLab(null, (err, result)=>{
            if(err) return res.send(err);
            console.log(result.data)
            res.render('laboratories', {labs: result.data});
        })
    })
    .post((req, res)=>{
        if(req.body.code) {
            dbController.addLab({code:req.body.code}, (err, msg)=>{
                if(err) req.flash('info', err);
                else req.flash('info', 'lab added.')

                return res.redirect('/lab');
            });
        } else {
            req.flash('info', 'data is not valid')
            return res.redirect('/laboratory');
        }
    });

app.route('/lab/:id')
    .get((req, res)=>{
        let lab_id = req.params.id;
        dbController.getLab(lab_id, (err, result)=>{
            if(err) return res.send(err);
            let lab_code = result.data[0].code;

            dbController.getExperimentsOfLab(lab_id, (err, result)=>{
                if(err) return res.send(err);
    
                let experimentsOfLab = result.data;
    
                dbController.getExperiment(null, (err, result)=> {
                    if(err) return res.send(err);
    
                    let allExperiments = result.data;
    
                    dbController.getInventoryItemsByLab(lab_id, (err, result)=>{
                        if(err) return res.send(err);
    
                        let chemicalsOfLab = result.data;
    
                        dbController.getChemical(null, (err, result)=>{
                            if(err) return res.send(err);
    
                            let allChemicals = result.data;
    
                            res.render("laboratory", {
                                chemicalsOfLab,
                                allChemicals,
                                experimentsOfLab, 
                                allExperiments,
                                lab_code, 
                                lab_id
                            });
                        });
                    });
                });
    
                
            });
        })
    });

app.route('/lab/:id/add_exp')
    .post((req, res)=>{
        let lab_id = req.params.id;
        let data = {
            lab_id: lab_id,
            exp_id: req.body.exp_id,
            creator_id: 1,
            information: req.body.information || " "
        }

        dbController.addExperimentToLab(data, (err, result)=>{
            if(err) return res.send(err);

            return res.redirect("/lab/" + lab_id);
        });
    });


    

app.route('/lab/:id/add_chem')
    .post((req, res)=>{
        if(req.body.chem_id && req.body.quantity) {
            let lab_id = req.params.id;
            let data = {
                lab_id: lab_id,
                chem_id: req.body.chem_id,
                quantity: parseInt(req.body.quantity)
            }

            dbController.addChemicalToLab(data, (err, result)=>{
                if(err) return res.send(err);

                return res.redirect("/lab/" + lab_id);
            });
        }
    });

app.route('/exp')
    .get((req, res)=>{
        dbController.getExperiment(null, (err, result)=>{
            if(err) return res.send(err);

            res.render('experiments', {experiments: result.data});
        });
    })
    .post((req, res)=>{
        if(req.body.code && req.body.image) {
            dbController.addExperiment({
                code: req.body.code,
                image: req.body.image,
                description: req.body.description || ""
            }, (err, result)=>{
                if(err) return res.send(err);

                res.redirect('/exp');
            });
        }
    });

app.route('/exp/:id')
    .get((req, res)=>{
        let exp_id = req.params.id;
        dbController.getExperiment(exp_id, (err, result)=>{
            if(err) return res.send(err);
            let experiment = result.data[0];

            dbController.getChemical(null, (err, result)=>{
                if(err) return res.send(err);

                let chemicals = result.data;

                dbController.getChemicalsOfExperiment(exp_id, (err, result)=>{
                    if(err) return res.send(err);

                    let inventoryOfExperiment = result.data;

                    res.render('experiment', {experiment: experiment, chemicals: chemicals, inventory: inventoryOfExperiment});
                })
                
                

            })
        });
    });

app.route('/exp/:id/add')
    .post((req, res)=>{
        if(req.body.chem_id && req.body.quantity) {
            let exp_id = req.params.id;
            let data = {
                exp_id: exp_id, 
                chem_id: req.body.chem_id, 
                quantity: parseInt(req.body.quantity)
            };
            dbController.addChemicalIntoExperiment(data, (err, result)=>{
                if(err) return res.send(err);

                return res.redirect('/exp/' + exp_id);
            });
        }
    });


app.listen(3000, (e)=>{
    console.log("port 3000")
})

