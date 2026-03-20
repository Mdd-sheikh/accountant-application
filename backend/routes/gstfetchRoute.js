import express from 'express';
import fetchGST from '../controller/gstfetch.js';

const Gstrouter = express.Router();

Gstrouter.get("/fetch/:gstin", fetchGST); 

export default Gstrouter;