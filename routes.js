const { Router } = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const router = Router();
const apiRoute = Router();
const Controller = require('./controller');
const controller = new Controller();
apiRoute.use(cors()).use(bodyParser.urlencoded({extended: true})).use(bodyParser.json()).use(compression());

    apiRoute.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Access-Token,X-Key");
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');        
        next();
    });

    
    apiRoute.post('/mail', controller.message.bind(controller));


    apiRoute.use('/*', (req, res) => {
        res.json({ 'message': 'Recurso no encotrado' })
    });
    

    router.use('/api/v1.0', apiRoute);


module.exports = router;
