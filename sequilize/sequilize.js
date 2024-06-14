const { Sequelize } = require('sequelize');

const SIGHBD = new Sequelize('SIGH', 'SA', 'Heves.2016', {
 host: '192.168.210.70',
 //host: '192.168.210.74',
  dialect:  'mssql',
  dialectOptions: {
    options: {
      encrypt: false, 
    },
  },
  logging: console.log 
});





module.exports={SIGHBD}