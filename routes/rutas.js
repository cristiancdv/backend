var express = require('express');
const upload = require('../helpers/storage')
var router = express.Router();
const proyectCtrl = require('../controller/proyectCtrl')

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

router.get(`/prueba`, proyectCtrl.prueba)

module.exports = router