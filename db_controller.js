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



    

}