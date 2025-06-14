import express from "express";
import cors from  "cors";

const app= express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let tasks=[];

app.post("/tasks",(req,res)=>{
    const {taskName,taskDescription}=req.body;
    const newTask={id:Date.now().toString(),taskName,taskDescription};
    tasks.push(newTask);
    res.status(201).json(newTask);

});

app.get("/tasks",(req,res)=>{
     res.json(tasks);

});

app.put("/tasks/:id",(req,res)=>{
    const {id} = req.params;
    const{taskName,taskDescription}=req.body;
    const task = tasks.find(t => t.id === id);
    if(!task) return res.status(404).json({message:"Task not found"});
    task.taskName=taskName;
    task.taskDescription=taskDescription;
    res.json(task);
});


app.delete("/tasks/:id",(req,res)=>{
    const {id}= req.params;
    tasks = tasks.filter(t => t.id !== id);
    res.status(204).send();
})


app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);

})