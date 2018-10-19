import express from 'express';
import path from 'path';
import db from './db/db';
import yamlConfigs from './db/yaml-configs';

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/step-builder'));

app.get('/', function(req,res) {

res.sendFile(path.join(__dirname+'/dist/step-builder/index.html'));
});

app.get('/api/v1/templates', (req, res) => {
    res.status(200).send(db)
});

app.get('/api/v1/templates/:id', (req, res) => {
    const id = req.params.id;
    const config = yamlConfigs[id];
    res.status(200).send({
      yamlConfig: config
    })
});

const PORT = 5000;

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 5000);

