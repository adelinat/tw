var express = require("express");
//var bodyParser = require("body-parser");
var Sequelize = require("sequelize")

var sequelize = new Sequelize('proiect', 'root', '', {
    dialect:'mysql',
    host:'localhost'
})

sequelize.authenticate().then(function(){
    console.log('Success')
})

var Job=sequelize.define('job',{
    Denumire:Sequelize.STRING,
    Angajator:Sequelize.STRING,
    idJob:Sequelize.INTEGER
})

var Aplicare=sequelize.define('aplicare',{
    idAplicare: Sequelize.INTEGER,
    Nume: Sequelize.STRING,
    Prenume:Sequelize.STRING,
    idJob:Sequelize.INTEGER
})


var app = express();
//app.use(bodyParser.json());


var nodeadmin = require('nodeadmin');
app.use(nodeadmin(app));

app.use(express.static('public'))
app.use('/nodeadmin', express.static('admin'))

app.use(express.json());       
app.use(express.urlencoded()); 





/*app.get('/prj', function(req,res){
    res.status(200).send([]);
});*/

/*Tabela Job */
app.get('/proiect/Job/1', function(request, response) {
   	Job.findAll().then(
            function(job) {
                response.status(200).send(job)
            }
        )
})
app.get('/proiect/Job/1/:idJob', function(request, response) {
    Job.findOne({where: {idJob:request.params.idJob}}).then(function(job) {
        if(job) {
            response.status(200).send(job)
        } else {
            response.status(404).send()
        }
    })
})

app.post('/proiect/Job/1', function(request, response) {
    Job.create(request.body).then(function(job) {
        response.status(201).send(job)
    })
})

app.put('/proiect/Job/1/:idJob', function(request, response) {
    Job.findById(request.params.idJob).then(function(job) {
        if(job) {
            job.update(request.body).then(function(job){
                response.status(201).send(job)
            }).catch(function(error) {
                response.status(200).send(error)
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.delete('/proiect/Job/1/:idJob', function(request, response) {
    Job.findById(request.params.idJob).then(function(job) {
        if(job) {
            job.destroy().then(function(){
                response.status(204).send()
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})


/* Tabela Aplicare */

app.get('/proiect/Aplicare/1', function(request, response) {
   	Aplicare.findAll().then(
            function(aplicare) {
                response.status(200).send(aplicare)
            }
        )
})

app.get('/proiect/Aplicare/1/:idAplicare', function(request, response) {
    Aplicare.findOne({where: {idAplicare:request.params.idAplicare}}).then(function(aplicare) {
        if(aplicare) {
            response.status(200).send(aplicare)
        } else {
            response.status(404).send()
        }
    })
})

app.post('/proiect/Aplicare/1', function(request, response) {
    Aplicare.create(request.body).then(function(aplicare) {
        response.status(201).send(aplicare)
    })
})

app.put('/proiect/Aplicare/1/:idAplicare', function(request, response) {
    Aplicare.findById(request.params.idJob).then(function(aplicare) {
        if(aplicare) {
            aplicare.update(request.body).then(function(aplicare){
                response.status(201).send(aplicare)
            }).catch(function(error) {
                response.status(200).send(error)
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.delete('/proiect/Aplicare/1/:idAplicare', function(request, response) {
    Aplicare.findById(request.params.idAplicare).then(function(aplicare) {
        if(aplicare) {
            aplicare.destroy().then(function(){
                response.status(204).send()
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.listen(process.env.PORT);