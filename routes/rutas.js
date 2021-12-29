var express = require('express');
const upload = require('../helpers/storage')
var router = express.Router();
const proyectCtrl = require('../controller/proyectCtrl')

//PRUEBA
// router.get(`/prueba`, upload.single('imagen'), proyectCtrl.prueba)

//Session
router.post('/auth/:tabla', proyectCtrl.Auth)
//CRUD
//read all
router.get(`/:tabla`, proyectCtrl.GETAll)
//read id
router.get(`/:tabla/:id`, proyectCtrl.GETId)
//create
router.post('/:tabla', upload.single("imagen"), proyectCtrl.New)
//update
router.post(`/:tabla/:id`, upload.single("imagen"), proyectCtrl.Edit)
//delete
router.delete(`/:tabla/:id`, proyectCtrl.Delete)



module.exports = router