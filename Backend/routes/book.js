import express from 'express';
import {getBook} from '../controllers/book.js';


const router = express.Router();


router.get("/", getBook);

export default router;

