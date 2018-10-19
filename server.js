import express from 'express';
import path from 'path';
import templates from './db/templates';
import yamlConfigs from './db/yaml-configs';
import * as _ from 'lodash';

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/step-builder'));

app.get('/', function(req,res) {

res.sendFile(path.join(__dirname+'/dist/step-builder/index.html'));
});

app.get('/api/v1/templates', (req, res) => {
    res.status(200).send(templates)
});

app.get('/api/v1/templates/random', (req, res) => {
  const randomId = _.random(0, templates.length - 1);
  res.status(200).send(templates[randomId])
});

app.get('/api/v1/templates/:id/config', (req, res) => {
    const id = req.params.id;
    const config = yamlConfigs[id];
    res.status(200).send({
      yamlConfig: config
    })
});

const PORT = 5000;

app.listen(process.env.PORT || PORT);

