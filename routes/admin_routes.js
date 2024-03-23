import express from 'express';
import {createAdmin, getOne} from '../controller/admin_controller.js';

const route = express.Router();

route.post('/create',createAdmin);
route.post('/login', getOne);
// route.get('/getall',getAll);
// route.get('/getone/:id',getOne);
// route.put('/update/:id',update);
// route.delete('/delete/:id',deleteUser);

export default route;