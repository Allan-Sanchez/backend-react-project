const Project = require('../models/Project');
const {validationResult}  = require('express-validator');

exports.createProject = async (req,res) =>{
      //checking errors
      const errors = validationResult(req);
      if(!errors.isEmpty()){
          return res.status(400).json({errors:errors.array()});
      }
  
    try {
        // create project
        const project = new Project(req.body);
        project.owner = req.user.userId;
        project.save();

        res.status(401).json({msg:'project successfully created'})


    } catch (error) {
        console.log(error);
        res.status(500).send('There was a mistake')
    }
};

exports.getProject = async (req,res) =>{

    try {
        const project = await Project.find({owner:req.user.userId}).sort({created_at :-1});
        res.json(project)      
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"There was a mistake"})
    }
};

exports.updateProject = async (req,res) =>{
      //checking errors
      const errors = validationResult(req);
      if(!errors.isEmpty()){
          return res.status(400).json({errors:errors.array()});
      }

      const {name} = req.body;
      const  newProject = {};

      if (name) {
          newProject.name = name;
      }

      try {
        // checking id
        let project = await Project.findById(req.params.id)

        // project exist or not
        if (!project) {
            return res.status(404).json({msg:'Project not found'});
        }
        // verify owner project is equal userId
        if (project.owner.toString() !== req.user.userId) {
            return res.status(401).json({msg:'Unauthorized'});
        }
        // update
        project = await Project.findByIdAndUpdate({_id:req.params.id},{$set : newProject},{new : true});
        res.json({project})
          
      } catch (error) {
          console.log(error);
          res.status(500).json({msg:"There was a mistake"})
      }

};

exports.deleteProject = async (req,res) =>{

    try {
        // checking id
        let project = await Project.findById(req.params.id)

        // project exist or not
        if (!project) {
            return res.status(404).json({msg:'Project not found'});
        }
        // verify owner project is equal userId
        if (project.owner.toString() !== req.user.userId) {
            return res.status(401).json({msg:'Unauthorized'});
        }
        await Project.findOneAndRemove({_id:req.params.id});
        res.json({msg:'proyect successfully deleted'})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'There was a mistake'})
    }
};