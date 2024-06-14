const { response } = require('express');
const Empleados = require('../model/Empleados');

const jwt = require('jsonwebtoken')
const AuthEmpleado = async (req, res = response) => {
    try {
      const user = await Empleados.findOne(
            {
                where:
                {
                    Usuario: req.body.usuario,
                    ClaveVWeb: req.body.password
                }
            }
        )
        if (!user) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });           
        } 

        const token=jwt.sign({ id: user.IdEmpleado, usuario: user.Nombres+' '+user.ApellidoPaterno }, '@ndrecitoTuT3rr0r', { expiresIn: '12h' })
       
        res.status(200).json(token)
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });        
    }
}

module.exports = {
    AuthEmpleado
}