// implement your API here
const express = require('express');
const cors = require('cors');
const database = require('./data/db.js');

const server = express();

server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    res.send({note: 'its working'})
})

server.get('/api/users',(req, res) => {
    database.find()
        .then(users => {
            console.log(users);
            res.status(200).json(users);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({errorMessage: 'The users information could not be retrieved.'});
        })
})

server.post('/api/users', (req, res) => {
    (req.body.name === undefined || req.body.bio === undefined)
    ? res.status(400).json({errorMessage: 'Please provide name and bio for the user.'})
    : database.insert(req.body)
        .then(reply => {
            console.log(reply);
            res.status(201).json(reply);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({errorMessage: 'There was an error while saving the user to the database'});
        })
    
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;

    database.findById(id)
        .then(user => {
            (user === undefined)
            ? res.status(404).json({ message: "The user with the specified ID does not exist." })
            : res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json({errorMessage: 'The user information could not be retrieved.'});
        })
})

server.delete('/api/users/:id', (req, res) => {
    database.findById(req.params.id)
        .then(user => {
            if (user === undefined){
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            } else{
                database.remove(req.params.id)
                    .then(count => {
                        res.status(200).json(count);
                    })
                    .catch(err => {
                        res.status(500).json({ errorMessage: "The user could not be removed" })
                    })
            }
        })
        .catch(err =>{
            res.status(500).json({ errorMessage: "The user could not be removed" })
        })
})

server.put('/api/users/:id', (req, res) => {
    database.findById(req.params.id)
        .then(user => {
            console.log(user);
            (user === undefined)
                ? res.status(404).json({ message: "The user with the specified ID does not exist." })
                : (req.body.name === undefined || req.body.bio === undefined)
                    ? res.status(400).json({errorMessage: 'Please provide name and bio for the user.'})
                    : database.update(req.params.id, req.body)
                        .then(() => {
                            res.status(200).end();
                        })
                        .catch(err => {
                            res.status(500).json({errorMessage: 'The user information could not be modified.'});
                        })
        })
        .catch(err => {
            res.status(500).json({errorMessage: 'The user information could not be modified.'});
        })
})

const port = 8001;
server.listen(port, () => console.log(`\n listening on port ${port}`))