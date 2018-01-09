'use strict';
var mongoose = require('mongoose'),
    Task = mongoose.model('Tasks')

exports.list_all_tasks = function(req, res) {

    Task.find().select('status name created_date').exec().then(function(result){
        console.log(result);
        res.status(200).json({
            status: 'Successful',
            result
        })
    }
    ).catch(function(err){
        res.status(404).json({
            status: 'failed'
        })
    })
};

exports.create_a_task = function(req, res) {
    var new_task = new Task(req.body)
    console.log(req.body);
    const taskBody = req.body;
    console.log(typeof taskBody);
    new_task.save(function(err, task) {
        if (err)
            res.send(err)
        res.json(task)
    });
};

exports.read_a_task = function(req, res) {
    Task.findById(req.params.id, function(err, task) {
        if (err)
            res.send(err)
        res.json(task)
    });
};

exports.update_a_task = function(req, res) {
    Task.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, task) {
        if (err)
            res.send(err)
        res.json(task)
    });
};

exports.delete_a_task = function(req, res) {
    Task.count({_id: req.params.id}, function(err, count) {
        if (count > 0) {
            Task.remove({_id: req.params.id}, function(err, task) {
            console.log(req.params.id)
            if (err)
                res.send(err)
            res.json({message: 'Task successfully deleted'})
            });
        }else if (count == 0) {
            res.json({message: 'Already deleted that task'})
        }
    }); 
};