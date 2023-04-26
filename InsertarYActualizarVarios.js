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

function crearListaDeMaterias(listaDeMaterias) {
    listaDeMaterias.forEach((materia) => {
        Materia.create(materia).then((data) => {
            console.log(data.toJSON());
        });
    });
}

const subjectList = [
    {
        nombre: "Matematica II",
        horasSemanales: 4,
        nroExamenes: 2,
    },
    {
        nombre: "Matematica III",
        horasSemanales: 2,
        nroExamenes: 2,
    },
    {
        nombre: "Arquitectura de Computadoras",
        horasSemanales: 6,
        nroExamenes: 2,
    },
    {
        nombre: "Computadoras de Arquitectura",
        horasSemanales: 6,
        nroExamenes: 2,
    },
    {
        nombre: "Matematica de Arquitecturas II",
        horasSemanales: 6,
        nroExamenes: 2,
    },
];

sequelize
    .sync()
    .then(() => 
        crearListaDeMaterias(subjectList)
    )
    .then(() =>
        Materia.update({ nroExamenes: 3 },
        {
            where: {
                horasSemanales: 6,
            },
        }
    ))

