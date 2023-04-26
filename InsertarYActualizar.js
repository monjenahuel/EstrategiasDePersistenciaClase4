const Sequelize = require("sequelize");

const sequelize = new Sequelize("estr_persis_clase4", "root", "", {
    host: "localhost",
    dialect: "mysql",
});

sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });


const Model = Sequelize.Model;
class Materia extends Model {}
Materia.init(
    {
        nombre: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        horasSemanales: {
            type: Sequelize.INTEGER,
        },
        nroExamenes: {
            type: Sequelize.INTEGER,
        },
    },
    {
        sequelize,
        modelName: "materias",
    }
);

// Insercion de registro

sequelize
    .sync()
    .then(() =>
        Materia.create({
            nombre: "Matematica I",
            horasSemanales: 6,
            nroExamenes: 2,
        })
    )
    .then((data) => {
        console.log(data.toJSON());
    });

// Actualizacion de registro
sequelize
    .sync()
    .then(() =>
        Materia.update(
            { nroExamenes: 3 },
            {
                where: {
                    id: 1,
                },
            }
        ).then(() => {
            console.log("Registro Actualizado");
        })
    );
