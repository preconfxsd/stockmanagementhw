const db = require("./db").getPool;
const db_queries = require("./db_queries");

module.exports = {
    createLabTable: function(cb) {
        db.getConnection((err, connection)=>{
            if (err) return cb(err);

            let sql_query = db_queries.create_lab_table;
            connection.query(sql_query, (err, rows)=>{
                if(err) {
                    connection.release();
                    return cb(err);
                }

                return cb(null, {msg: "lab table created"});
            });
        });
    },
    createChemicalTable: function(cb) {
        db.getConnection((err, connection)=>{
            if (err) return cb(err);

            let sql_query = db_queries.create_chemical_table;
            connection.query(sql_query, (err, rows)=>{
                if(err) {
                    connection.release();
                    return cb(err);
                }

                return cb(null, {msg: "chemical table created"});
            });
        });
    },
    createExperimentTable: function(cb) {
        db.getConnection((err, connection)=>{
            if (err) return cb(err);

            let sql_query = db_queries.create_experiment_table;
            connection.query(sql_query, (err, rows)=>{
                if(err) {
                    connection.release();
                    return cb(err);
                }

                return cb(null, {msg: "experiment table created"});
            });
        });
    },
    createUserTable: function(cb) {
        db.getConnection((err, connection)=>{
            if (err) return cb(err);

            let sql_query = db_queries.create_user_table;
            connection.query(sql_query, (err, rows)=>{
                if(err) {
                    connection.release();
                    return cb(err);
                }

                return cb(null, {msg: "user table created"});
            });
        });
    },
    createInventoryOfLabTable: function(cb) {
        db.getConnection((err, connection)=>{
            if (err) return cb(err);

            let sql_query = db_queries.create_inventory_of_lab_table;
            connection.query(sql_query, (err, rows)=>{
                if(err) {
                    connection.release();
                    return cb(err);
                }

                return cb(null, {msg: "inventory_of_lab table created"});
            });
        });
    },
    createExperimentOfLabTable: function(cb) {
        db.getConnection((err, connection)=>{
            if (err) return cb(err);

            let sql_query = db_queries.create_experiment_of_lab_table;
            connection.query(sql_query, (err, rows)=>{
                if(err) {
                    connection.release();
                    return cb(err);
                }

                return cb(null, {msg: "experiment_of_lab table created"});
            });
        });
    },
    createInventoryOfExperimentTable: function(cb) {
        db.getConnection((err, connection)=>{
            if (err) return cb(err);

            let sql_query = db_queries.create_inventory_of_experiment_table;
            connection.query(sql_query, (err, rows)=>{
                if(err) {
                    connection.release();
                    return cb(err);
                }

                return cb(null, {msg: "inventory_of_experiment table created"});
            });
        });
    },

    getOccuredExperiments: function(cb) {
        db.getConnection((err, connection)=>{
            if(err) return cb(err);

            let sql_query = "select \
                                oe.information as information, \
                                l.code as lab_code, \
                                e.code as exp_code \
                            from \
                                occured_experiments as oe, \
                                lab as l, experiment as e \
                            where \
                                oe.exp_id = e.id \
                                and oe.lab_id = l.id";
            connection.query(sql_query, (err, rows)=>{
                if(err) {
                    connection.release();
                    return cb(err);
                }

                connection.release();

                return cb(null, {data: rows});
                
            });
        })
    },

    createOccuredExperimentsTable: function(cb) {
        db.getConnection((err, connection)=>{
            if (err) return cb(err);

            let sql_query = db_queries.create_occured_experiments_table;
            connection.query(sql_query, (err, rows)=>{
                if(err) {
                    connection.release();
                    return cb(err);
                }

                return cb(null, {msg: "occured experiments table created"});
            });
        });
    },
    createAllTables: function() {
        this.createUserTable((err, result)=>{
            if(err) return console.log(err);
            return console.log(result);
        });

        this.createLabTable((err, result)=>{
            if(err) return console.log(err);
            return console.log(result);
        });

        this.createChemicalTable((err, result)=>{
            if(err) return console.log(err);
            return console.log(result);
        });

        this.createExperimentTable((err, result)=>{
            if(err) return console.log(err);
            return console.log(result);
        });

        this.createInventoryOfLabTable((err, result)=>{
            if(err) return console.log(err);
            return console.log(result);
        });

        this.createInventoryOfExperimentTable((err, result)=>{
            if(err) return console.log(err);
            return console.log(result);
        });

        this.createExperimentOfLabTable((err, result)=>{
            if(err) return console.log(err);
            return console.log(result);
        });

        this.createOccuredExperimentsTable((err, result)=>{
            if(err) return console.log(err);
            return console.log(result);
        });
    },


    //lab table methods
    addLab: function(lab, cb) {
        db.getConnection((err, connection)=>{
            if(err) return cb(err);

            sql_query = "INSERT INTO lab (code) VALUES (?)";
            connection.query(sql_query, lab.code, (err, rows)=>{
                if(err) {
                    connection.release();
                    return cb(err);
                }
                connection.release();
                return cb(null, {msg: "lab inserted", data: rows});
            });
        });
    },

    getLab: function(id, cb) {
        db.getConnection((err, connection)=>{
            if(err) return cb(err);

            if(id) {
                sql_query = "SELECT * FROM lab WHERE id=?";
            } else {
                sql_query = "SELECT * FROM lab";
            }

            connection.query(sql_query, [id], (err, rows)=>{
                if(err) {
                    connection.release();
                    return cb(err);
                }
                connection.release();
                return cb(null, {data: rows});
            });
            
        });
    },

    deleteLab: function(id, cb) {
        db.getConnection((err, connection)=>{
            if(err) return cb(err);

            sql_query = "DELETE FROM lab WHERE id=?";

            connection.query(sql_query, [id], (err, rows)=>{
                if(err) {
                    connection.release();
                    return cb(err);
                }

                return cb(null, {data: rows});
            });
            
        });
    },


    addToInventory: function(item, cb) {
        db.getConnection((err, connection)=>{
            if(err) return cb(err);

            let sql_query = "INSERT INTO inventory_of_lab (lab_id, chem_id, expire_date, quantity)\
                            VALUES (?, ?, ?, ?)";
                            
            connection.query(sql_query, [item.lab_id, item.chem_id, item.expire_date, item.quantity], (err, rows)=>{
                if (err) {
                    
                    connection.release();
                    return cb(err);
                }

                let sql_query = "UPDATE \
                                    inventory_of_lab as iol1 \
                                SET iol1.total_quant = ( \
                                    SELECT \
                                        SUM(iol.quantity) \
                                    FROM \
                                        inventory_of_lab as iol \
                                    WHERE \
                                        iol.lab_id = ? \
                                    GROUP BY \
                                        iol.chem_id )";
                                        

                connection.release();
                return cb(null, {data: rows});
            });
        });
    },

    getInventoryItems: function(cb) {
        db.getConnection((err, connection)=>{
            if(err) return cb(err);
            
            let sql_query = "SELECT \
                                c.name as name,\
                                c.min_quant as min_quant, \
                                c.formula as formula, \
                                c.unit as unit, \
                                inventory.quantity as quantity\
                            FROM \
                                chemical as c, \
                                (SELECT \
                                    SUM(iol.quantity) as quantity, \
                                    c.id as chem_id \
                                FROM \
                                    inventory_of_lab as iol, \
                                    chemical as c \
                                WHERE \
                                    c.id = iol.chem_id \
                                GROUP BY chem_id) as inventory \
                            WHERE c.id = inventory.chem_id"
            connection.query(sql_query, (err, rows)=>{
                if(err) {
                    connection.release();
                    return cb(err);
                }

                connection.release();

                return cb(null, {data: rows});
            })


        });
    },



    //chemical methods
    defineChemical: function(chemical, cb) {
        db.getConnection((err, connection)=>{
            if(err) return cb(err);

            let sql_query = "INSERT INTO chemical (name, formula, min_quant, unit) VALUES (?, ?, ?, ?)";
            connection.query(sql_query, [chemical.name,  chemical.formula, chemical.min_quant, chemical.unit], (err, rows)=>{
                if(err) {
                    connection.release();
                    return cb(err);
                }
                connection.release();
                return cb(null, {msg: "chemical inserted", data: rows});
            });
        });
    },

    getChemical: function(id, cb) {
        db.getConnection((err, connection)=>{
            if(err) return cb(err);
            
            sql_query = "SELECT * FROM chemical";

            connection.query(sql_query, (err, rows)=>{
                if(err) {
                    connection.release();
                    return cb(err);
                }
                connection.release();
                return cb(null, {msg: "chemicals", data: rows});
            });

        });
    },


    //experiment methods
    addExperiment: function(experiment, cb) {
        db.getConnection((err, connection)=>{
            if(err) return cb(err);

            sql_query = "INSERT INTO experiment (code, image, description) VALUES (?, ?, ?)";
            connection.query(sql_query, [experiment.code, experiment.image, experiment.description], (err, rows)=>{
                if(err) {
                    connection.release();
                    return cb(err);
                }
                connection.release();
                return cb(null, {msg: "experiment inserted", data: rows});
            });
        });
    },

    getExperiment: function(id, cb) {
        db.getConnection((err, connection)=>{
            if(err) return cb(err);

            if(id) {
                sql_query = "SELECT * FROM experiment WHERE id=?";
            } else {
                sql_query = "SELECT * FROM experiment";
            }

            connection.query(sql_query, [id], (err, rows)=>{
                if(err) {
                    connection.release();
                    return cb(err);
                }
                connection.release();
                return cb(null, {data: rows});
            });
            
        });
    },



    //inventory of experiment

    addChemicalIntoExperiment: function(data, cb) {
        db.getConnection((err, connection)=>{
            if(err) return cb(err);

            let sql_query = "INSERT INTO inventory_of_exp (exp_id, chem_id, quantity) values (?, ?, ?)";

            connection.query(sql_query, [data.exp_id, data.chem_id, data.quantity], (err, rows)=>{
                if(err) {
                    connection.release();
                    return cb(err);
                }
                connection.release();
                return cb(null, {data: rows});
            });
        });
    },


    getChemicalsOfExperiment: function(exp_id, cb) {
        db.getConnection((err, connection)=>{
            if(err) return cb(err);
            let sql_query = "select * from \
                            chemical as c, \
                            experiment as e, \
                            inventory_of_exp as inv \
                        where \
                            inv.exp_id = e.id \
                            and inv.chem_id = c.id\
                            and inv.exp_id = ?";
            connection.query(sql_query, exp_id, (err, rows)=>{
                if(err) {
                    connection.release();
                    return cb(err);
                }
                connection.release();
                return cb(null, {data: rows});
            })

        });
        
        
    },

    //experiments of lab

    addExperimentToLab: function(data, cb) {
        db.getConnection((err, connection)=>{
            if(err) return cb(err);

            let sql_query = "INSERT INTO experiment_of_lab (lab_id, exp_id, creator_id, information)\
                            VALUES (?, ?, ?, ?)";
            connection.query(sql_query, [data.lab_id, data.exp_id, data.creator_id, data.information], (err, rows)=>{
                if(err) {
                    connection.release();
                    return cb(err);
                }

                return cb(null, {data: rows});
            })
        })
    },

    getExperimentsOfLab: function(lab_id, cb) {
        db.getConnection((err, connection)=>{
            if(err) return cb(err);
            let sql_query = "select \
                            e.id as exp_id,\
                            e.code as exp_code,\
                            l.code as lab_code\
                            from \
                                lab as l, \
                                experiment as e, \
                                users as u, \
                                experiment_of_lab as eol \
                            where \
                                eol.lab_id = l.id and \
                                eol.exp_id = e.id and \
                                eol.creator_id = u.id and\
                                l.id = ?";
            connection.query(sql_query, lab_id, (err, rows)=>{
                if(err) {
                    connection.release();
                    return cb(err);
                }
                connection.release();
                return cb(null, {data: rows});
            });
        })
    },


    //inventory of lab

    addChemicalToLab: function(data, cb) {
        db.getConnection((err, connection)=>{
            if(err) return cb(err);

            let sql_query = "INSERT INTO inventory_of_lab (lab_id, chem_id, quantity)\
                            VALUES (?, ?, ?)";

            connection.query(sql_query, [
                data.lab_id,
                data.chem_id,
                data.quantity,
            ], (err, rows)=>{
                if(err) {
                    connection.release();
                    return cb(err);
                }
                connection.release();
                return cb(null, {data: rows});
            })
        })
    },

    getChemicalsOfAllLabs: function(cb) {
        db.getConnection((err, connection)=>{
            if(err) return cb(err);

            let sql_query = "select \
                                c.name as name, \
                                l.code as lab_code, \
                                iol.quantity as quantity \
                            from \
                                lab as l, \
                                chemical as c, \
                                inventory_of_lab as iol  \
                            where \
                                iol.lab_id = l.id and \
                                iol.chem_id = c.id";
            connection.query(sql_query, (err, rows)=>{
                if(err) {
                    connection.release();
                    return cb(err);
                }

                connection.release();

                return cb(null, {data: rows});
            });
        })
    },

    getChemicalsOfLab: function(lab_id, cb) {
        db.getConnection((err, connection)=>{
            if(err) return cb(err);

            let sql_query = "select \
                                c.name as name, \
                                l.code as lab_code, \
                                iol.quantity as quantity \
                            from \
                                lab as l, \
                                chemical as c, \
                                inventory_of_lab as iol  \
                            where \
                                iol.lab_id = l.id and \
                                iol.chem_id = c.id and\
                                lab_id = ?";
            connection.query(sql_query, lab_id, (err, rows)=>{
                if(err) {
                    connection.release();
                    return cb(err);
                }

                connection.release();

                return cb(null, {data: rows});
            });
        })
    },

    getInventoryItemsByLab: function(lab_id, cb) {
        db.getConnection((err, connection)=>{
            if(err) return cb(err);
            
            let sql_query = "SELECT \
                                iol.quantity as quantity, \
                                c.name as name,\
                                c.formula as formula,\
                                c.min_quant as min_quant,\
                                iol.expire_date as expire_date,\
                                c.unit as unit \
                            FROM \
                                inventory_of_lab as iol, \
                                chemical as c \
                            WHERE \
                                c.id = iol.chem_id \
                                and iol.lab_id = ?";

            connection.query(sql_query, lab_id, (err, rows)=>{
                if(err) {
                    connection.release();
                    return cb(err);
                }

                connection.release();

                return cb(null, {data: rows});
            })


        });
    },



    //submit experiment

    submitExperiment: function(data, cb) {
        db.getConnection((err, connection)=>{
            if(err) return cb(err);

            let sql_query = "select \
                                COUNT(*) as available \
                            FROM \
                                inventory_of_lab as iol, \
                                inventory_of_exp as ioe \
                            WHERE \
                                iol.chem_id = ioe.chem_id \
                                and ioe.exp_id = ? \
                                and iol.lab_id = ? \
                                and iol.quantity < ioe.quantity";
            connection.query(sql_query, [data.exp_id, data.lab_id], (err, rows) => {
                if(err) {
                    connection.release();
                    return cb(err);
                }

                console.log(rows[0])
                if(rows[0].available != 0) {
                    return cb(new Error("Stock not available"));
                }

                let get_items_of_exp_query = "select * from inventory_of_exp where exp_id = ?";

                connection.query(get_items_of_exp_query, data.exp_id, (err, rows)=>{
                    if(err) {
                        connection.release();
                        return cb(err);
                    }

                    let itemsOfExp = rows;

                    let update_lab_query = "update inventory_of_lab as lab set quantity = quantity - ? where lab.lab_id = ? and chem_id = ? limit 1;";

                    itemsOfExp.forEach(item => {
                        connection.query(update_lab_query, [item.quantity, data.lab_id, item.chem_id], (err, rows)=>{
                            if(err) {
                                connection.release();
                                return cb(err);
                            }
                        });
                    });


                    let sql_query = "INSERT INTO occured_experiments (lab_id, exp_id, creator_id, information)\
                    VALUES (?, ?, ?, ?)";

                    setTimeout(()=>{

                        connection.query(sql_query, [data.lab_id, data.exp_id, 1, data.information], (err, rows)=>{
                            if(err) {
                                connection.release();
                                return cb(err);
                            }

                            connection.release();

                            return cb(null, rows);

                        });
                    }, 500);
                })

               
            });
        })
    }


    

}