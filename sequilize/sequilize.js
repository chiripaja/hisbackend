const { Sequelize } = require('sequelize');
require('dotenv').config();
const SIGHBD = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
 host: process.env.HOST,
  dialect:  'mssql',
  dialectOptions: {
    options: {
      encrypt: false, 
    },
  },
  logging: console.log 
});





module.exports={SIGHBD}