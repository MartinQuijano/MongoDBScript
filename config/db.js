var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/peliculas";

module.exports = async () => {
    let clienteMongo = await MongoClient.connect(url)
    var database_peliculas = clienteMongo.db("peliculas")

    console.log("Base de datos peliculas creada!");

    let crearColeccion = await database_peliculas.createCollection("peliculas")

    var catalogo_peliculas = [
        { nombre: 'One Flew Over the Cuckoos Nest', actor: 'Jack Nicholson', estreno: '1976' },
        { nombre: 'The Shawshank Redemption', actor: 'Morgan Freeman', estreno: '1995' },
        { nombre: 'The Green Mile', actor: 'Tom Hanks', estreno: '1999' },
        { nombre: 'The Shining', actor: 'Jack Nicholson', estreno: '1980' },
        { nombre: '3 idiots', actor: 'Aamir Khan', estreno: '2009' }
    ];

    let insertarPeliculas = await database_peliculas.collection("peliculas").insertMany(catalogo_peliculas)
    console.log("Peliculas agregadas: " + dos.insertedCount);

    let actualizarConCampoBoxOffice = await database_peliculas.collection("peliculas").updateMany({}, { $set: { "boxoffice": "0" } })
    console.log("Agregado el campo boxoffice con valor 0 a todas las peliculas");

    let reemplazarUnaPelicula = await database_peliculas.collection("peliculas").replaceOne({ "nombre": '3 idiots' }, { "nombre": "The Godfather", "actor": "Marlon Brando", "estreno": "1972", "boxoffice": "0" })
    console.log("Se reemplazo '3 idiots' por 'The Godfather");

    console.log("Se muestran peliculas previas a 1980");
    let peliculas = await database_peliculas.collection("peliculas").find({ estreno: { $lt: "1980" } }).toArray() 
    console.log(JSON.stringify(peliculas, null, 2));

    let actualizarSacandoBoxOffice = await database_peliculas.collection("peliculas").updateOne({ "nombre": "The Shawshank Redemption" }, { $unset: { "boxoffice": 1 } }, false, true);
    console.log("Se elimino campo boxoffice de The Shawshank Redemption");

    console.log("Se muestran todas las peliculas");
    peliculas = await database_peliculas.collection("peliculas").find().toArray() 
    console.log(JSON.stringify(peliculas, null, 2));

    clienteMongo.close();
}