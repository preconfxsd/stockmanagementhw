module.exports = {
    create_lab_table:   "CREATE TABLE IF NOT EXISTS lab  (\
                            id INT AUTO_INCREMENT,\
                            code VARCHAR(32) NOT NULL UNIQUE,\
                            PRIMARY KEY(id))",

    create_chemical_table:  "CREATE TABLE IF NOT EXISTS chemical (\
                                id INT AUTO_INCREMENT,\
                                name VARCHAR(64) NOT NULL,\
                                formula VARCHAR(32) NOT NULL,\
                                unit VARCHAR(32) NOT NULL,\
                                min_quant INT NOT NULL,\
                                PRIMARY KEY(id))",
                                
    create_experiment_table:    "CREATE TABLE IF NOT EXISTS experiment (\
                                    id INT AUTO_INCREMENT,\
                                    code VARCHAR(16) NOT NULL UNIQUE,\
                                    image VARCHAR(64) NOT NULL,\
                                    description VARCHAR(2048),\
                                    PRIMARY KEY(id))",

    create_user_table:      "CREATE TABLE IF NOT EXISTS users (\
                                id INT AUTO_INCREMENT,\
                                username VARCHAR(16) NOT NULL UNIQUE,\
                                password VARCHAR(16) NOT NULL,\
                                email VARCHAR(24),\
                                PRIMARY KEY(id))",

    create_inventory_of_lab_table: "CREATE TABLE IF NOT EXISTS inventory_of_lab(\
                                        lab_id INT,\
                                        chem_id INT,\
                                        total_quant INT DEFAULT 0,\
                                        expire_date VARCHAR(32),\
                                        quantity INT NOT NULL,\
                                        FOREIGN KEY(lab_id) REFERENCES lab(id),\
                                        FOREIGN KEY(chem_id) REFERENCES chemical(id))",

    create_experiment_of_lab_table: "CREATE TABLE IF NOT EXISTS experiment_of_lab(\
                                        lab_id INT,\
                                        exp_id INT,\
                                        creator_id INT,\
                                        created_at TIMESTAMP DEFAULT NOW(),\
                                        information VARCHAR(1024),\
                                        FOREIGN KEY(lab_id) REFERENCES lab(id),\
                                        FOREIGN KEY(exp_id) REFERENCES experiment(id),\
                                        FOREIGN KEY(creator_id) REFERENCES users(id)), \
                                        PRIMARY KEY(lab_id, exp_id, creator_id)",

    create_inventory_of_experiment_table:  "CREATE TABLE IF NOT EXISTS inventory_of_exp(\
                                        exp_id INT,\
                                        chem_id INT,\
                                        quantity INT NOT NULL,\
                                        FOREIGN KEY(exp_id) REFERENCES experiment(id),\
                                        FOREIGN KEY(chem_id) REFERENCES chemical(id), \
                                        PRIMARY KEY(exp_id, chem_id))",

    create_occured_experiments_table:   "CREATE TABLE IF NOT EXISTS occured_experiments(\
                                            id INT AUTO_INCREMENT,\
                                            lab_id INT,\
                                            exp_id INT,\
                                            creator_id INT,\
                                            information VARCHAR(2048),\
                                            created_at TIMESTAMP DEFAULT NOW(),\
                                            PRIMARY KEY(id),\
                                            FOREIGN KEY(lab_id) REFERENCES lab(id),\
                                            FOREIGN KEY(exp_id) REFERENCES experiment(id),\
                                            FOREIGN KEY(creator_id) REFERENCES users(id))"
}