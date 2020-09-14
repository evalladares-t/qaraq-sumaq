
const fs = require('fs');
const path = require("path");
const nodemailer = require('nodemailer');
const { OK,CREATED } = require('http-status-codes');

class Controller{


    async message(req,res){
        const {mail,name,message} = req.body;

        let contenthtml=`
            <h1>User Information</h1>
            <ul>
                <li>Nombre: ${name}</li>
                <li>Email: ${mail}</li>
            </ul>
            <p>${message}</p>
        `

        let transporter = nodemailer.createTransport({
            host: process.env.host,
            port: 465,
            secure: true,
            transportMethod: 'SMTP',
            auth: {
                user: process.env.usermail,
                pass: process.env.passmail
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        let info = await transporter.sendMail({
            from: '"QARAC SUMAQ" <'+ process.env.usermail+'>', // sender address,
            to:  process.env.usermail_int,
            subject: 'Contactanos de la Pagina QARAC SUMAQ',
            // text: 'Hello World'
            html: contenthtml            
        })

        console.log('Message sent: %s', info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        return res.status(OK).json({
            'success': true,
            'message':'Se envió el registro con éxito'
        })
    }

}


module.exports = Controller;