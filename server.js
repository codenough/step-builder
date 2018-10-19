import express from 'express';
import db from './db/db';
import yamlConfigs from './db/yaml-configs';
import bodyParser from 'body-parser';

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
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

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});