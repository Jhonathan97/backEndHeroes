const fetch = require("node-fetch");
var HEROES=[];

/**
 * Función que permite obtener las auditorías relacionadas con el usuario ya sea lider auditor o miembro de alguna
 * auditoría.
 * @param {*} req recibe la solicitud GET en donde se puede acceder al _id del usuario después de verificar que el usuario
 * esta autenticado.
 * @param {*} res me permite responder, statusCode: 200 y un arrayJSON con la auditorías, si encuentra por lo menos una
 * auditoría asociada.
 * @param {*} next si ocurre un error, este parametro me permite enviarlo al manejador de errores de la app express
 * para que el error pueda ser visualizado
 */

exports.getHeroes =  (req,res,next) => {
    const dataHeroes =  new Promise( (resolve, reject) => {
        if (HEROES.length>0){
            console.log('no consulto');
            resolve(HEROES);
        }
        else{
            console.log('consulto');
            var datos=[];
            for (let index = 1; index <=10; index++) {
                let url = "https://www.superheroapi.com/api.php/3329612697092040/"+index+"";
                fetch(url)
                .then((req) => req.json())
                .then(function(data) {
                   datos.push(data);
                })
                .catch((err) => res.send(err.message));
            }
            HEROES=datos;
            console.log(datos);
            resolve(datos);   
        }
    });
    dataHeroes
    .then(datos =>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(datos);
    })
    .catch((err) => res.send(err.message));
};