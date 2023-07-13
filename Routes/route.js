const express=require('express')

const router=express.Router();
const Model=require('../modules/module')

router.post('/post',async(req,res)=>{
    const data=new Model({
        name:req.body.name,
        age:req.body.age
    })
    try{
        const datatosave=await data.save()
        res.status(200).json(datatosave)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
})
router.get('/getAll',async(req,res)=>{
    try{
        const data= await Model.find()
        res.status(200).json(data)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }

})
router.delete('/delete/:id',async(req,res)=>{
    const id=req.params.id
    try{
        const data= await Model.findByIdAndDelete(id)
        res.status(200).json(data)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
    
})
router.patch('/Update/:id',async(req,res)=>{
    const id=req.params.id
    const updatedData = req.body;
    const options = { new: true };

    
    try{
        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )
        res.status(200).json(data)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
})
router.get('/Update/:id',async(req,res)=>{
    const id=req.params.id
    try{
        const data= await Model.findById(id)
        res.status(200).json(data)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }

})

router.get('/',(req,res)=>{
res.send({message:" world"})
})

module.exports=router