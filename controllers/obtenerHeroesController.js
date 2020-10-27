const fetch = require("node-fetch");
var HEROES = [];


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
exports.getHeroes = (req, res, next) => {
  const url = "https://www.superheroapi.com/api.php/3329612697092040/";
  var datos = HEROES;
  var longitudActual = HEROES.length;
  return new Promise(async (resolve, reject) => {
    if (longitudActual > 0) {
      return resolve(res.json(HEROES));
    } else {
      for (let index = 1; index <= 50; index++) {
        try {
          await fetchGenerico(url, index, datos);
        } catch (err) {
          return reject(res.send("error aqui" + err.message));
        }
      }
      HEROES = datos;
      return resolve(res.json(HEROES));
    }
  });
};

function fetchGenerico(url, index, datos) {
  return new Promise((resolve, reject) => {
    fetch(url + index)
      .then(response => response.json())
      .then(data => {
        let obj = {};
        obj[index] = data;
        resolve(datos.push(data));
      });
  });
}

exports.getHeroesAlignment = (req, res, next) => {
  var listGood, listBad = selecctionHeroe();
  if (req.params.alignment === 'good') {
    let data = {
      0: listGood
    };
    res.json(data);
  } else if (req.params.alignment === 'bad') {
    let data = {
      0: listBad
    };
    res.json(data);
  } else {
    let data = {
      0: listGood,
      1: listBad
    };
    res.json(data);
  }

};

function selecctionHeroe() {
  var listHeroesBuenos = [];
  var listHeroesMalos = [];
  if (HEROES.length > 0) {
    console.log("hay heroes");
    for (let index = 0; index < HEROES.length; index++) {
      if (HEROES[index].biography.alignment === 'good') {
        listHeroesBuenos.push(HEROES[index]);
      } else {
        listHeroesMalos.push(HEROES[index]);
      }

    }
    return listHeroesBuenos, listHeroesMalos;
  } else {
    //correcion en caso de no estar cargados en el backend
  }
}