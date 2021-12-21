const { appConfig } = require('../config/config')
const fs = require("fs")
const db = require('../db');
const bcrypt = require('bcrypt')

// listar elementos GET 
const GETAll = (req, res) => {
    let tabla = req.params.tabla

    let sql = `SELECT * FROM ${tabla}`
    db.query(sql, (err, data) => {
        // console.log(data);
        if (err != null) {
            res.status(500).send(err)
        } else
            if (data == '') {
                res.status(204).send("no hay contenido para mostrar")
            } else {
                res.status(200).send(data)
            }

        // res.render('lista')


    })



}
//leer elemento segun id
const GETId = (req, res) => {
    let id = req.params.id
    let tabla = req.params.tabla
    let sql = `SELECT * FROM ${tabla} WHERE id=?`
    db.query(sql, id, (err, data) => {
        // console.log(data);
        if (err != null) {
            res.status(500).send(err)
        } else
            if (data == '') {
                res.status(204).send("no hay contenido para mostrar")
            } else {
                res.status(200).send(data)
            }

        // res.render('lista')


    })

}

//crear elementos POST

const New = (req, res) => {
    let tabla = req.params.tabla
    let sql = `INSERT INTO ${tabla} SET ?`
    if (req.file) {
        const baseUrl = `${appConfig.host}:${appConfig.port}/public`
        const endImg = req.file.filename
        let imagen = { imagen: `${baseUrl}/${endImg}` } //colocar direccion aqui
        let producto = Object.assign(req.body, imagen)
        // console.log(producto);
        db.query(sql, producto, (err, data) => {
            if (err != null) {
                res.status(500).send(err)
            } else {
                res.status(201).send("Producto creado correctamente")
            }
        })


    }
}

//editar elementos POST
const Edit = (req, res) => {

    let tabla = req.params.tabla
    let id = req.params.id
    let sql = `UPDATE ${tabla} SET ? WHERE id = ?`


    if (id) {
        //ejecuta la subida de la nueva imagen
        if (req.file) {
            db.query(sql, [producto, id], (err, data) => {
                if (err != null) {
                    res.status(500).send(err)
                } else {
                    res.status(201).send("Producto Actualizado correctamente")

                    const baseUrl = `${appConfig.host}:${appConfig.port}/public`
                    const endImg = req.file.filename
                    let imagen = { imagen: `${baseUrl}/${endImg}` } //colocar direccion aqui
                    var producto = Object.assign(req.body, imagen)

                    let sqlConsulta = `SELECT * from ${tabla} WHERE id=?`
                    //  elimina la imgen anterior anterior de la carpeta
                    db.query(sqlConsulta, id, (err, data) => {
                        const path = data[0].imagen.replace(/^.*[\\\/]/, '')
                        fs.existsSync('./storage/image/' + path) && fs.unlinkSync('./storage/image/' + path)
                    })
                }
            })
        } else {
            var producto = req.body
            db.query(sql, [producto, id], (err, data) => {
                if (err != null) {
                    res.status(500).send(err)
                } else {
                    res.status(201).send("Producto Actualizado correctamente")
                }
            })
        }



    }
}

//Borrar elementos DELETE
const Delete = (req, res) => {
    let tabla = req.params.tabla
    id = req.params.id
    let sql = `DELETE FROM ${tabla}  WHERE id = ?`
    let sqlConsulta = `SELECT * from ${tabla} WHERE id=?`

    //  elimina la imgen anterior anterior de la carpeta

    db.query(sql, id, (err, data) => {
        if (err != null) {
            res.status(500).send(err)
        } else {
            db.query(sqlConsulta, id, (err, data) => {
                const path = data[0].imagen.replace(/^.*[\\\/]/, '')
                fs.existsSync('./storage/image/' + path) && fs.unlinkSync('./storage/image/' + path)
            })
            res.status(202).send("Producto eliminado correctamente")
        }
    })
}
/* USUARIOS*/

//crea o autentica usuario
const Auth = (req, res) => {
    const tabla = req.params.tabla
    // console.log(tabla);
    //autehnticacion de usuario
    if (tabla === 'auth') {
        const sql = `SELECT * FROM usuarios WHERE usuario=?`
        let usuario = req.body.usuario
        let pass = req.body.password
        // console.log('desde auth', req.body, sql);

        // console.log(sql);
        db.query(sql, usuario, (err, data) => {
            const query = data[0]
            if (err != null) {

                res.status(500).send(err)

            } else if (query && query.usuario === usuario) {
                bcrypt.compare(pass, query.password, function (err, result) {
                    if (result === true) {
                        res.status(200).send([query, 'autenticado'])
                    } else {
                        //password invalido
                        res.status(401).send('usuario o contraseña invalida')
                    }

                })

            } else {
                //usuario invalido
                res.status(401).send('usuario o contraseña invalida')
            }

        })
    }
    //crea usuario
    else if (tabla === 'new') {
        // console.log(req.body);
        bcrypt.hash(req.body.password, 12, function (err, hash) {
            if (hash) {
                req.body.password = hash

                let sql = `INSERT INTO usuarios SET ?`
                db.query(sql, req.body, (err, data) => {
                    if (err != null) {
                        res.status(500).send(err)
                    } else {
                        res.status(200).send('usuario creado correctamente')
                    }
                })

            } else {
                req.status(501).send('problema de encriptado de password')
            }


        });

    }
}

module.exports = { GETAll, GETId, New, Edit, Delete, Auth }

