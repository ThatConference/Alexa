const
    express = require('express'),
    bodyParser = require('body-parser'),
    verifier = require('alexa-verifier-middleware'),
    dfApp = require('./handlers/dialogflow-handler'),
    alexaHandler = require('./handlers/alexa-handler'),
    port = process.env.PORT || 2323,
    app = express();

app.use('/.well-known', express.static('.well-known'));

const alexaRouter = express.Router();
app.use('/webhook/alexa', alexaRouter);
alexaRouter.use(verifier);
alexaRouter.use(bodyParser.json());
alexaRouter.post('/', alexaHandler);

app.use("/webhook/dialogflow", bodyParser.json(), dfApp());

app.listen(port);
console.log(`API started on port ${port}`);