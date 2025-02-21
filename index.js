import express from 'express'

const app = express()
const port = 3100
app.use(express.json())
let teaData = []
let nextId = 1

//save the tea in manu
app.post('/teas',(req,res)=>{
    const {name , price } = req.body
    const newTea ={id:nextId++,name,price}
    teaData.push(newTea)
    res.status(201).send(teaData)
    
})
//get all tea
app.get('/teas',(req,res)=>{
    res.send(teaData)
})
//get the with id 
app.get('/teas/:id',(req ,res)=>{
    const tea = teaData.find(t=>t.id === parseInt(req.params.id))
    if(!tea){
        res.status(404)
    }  
    res.status(200).send(tea)
})
//update tea
app.put('/teas/:id',(req,res)=>{
    const tea = teaData.find(t=>t.id === parseInt(req.params.id))
    if(!tea){
        res.status(404).send('tea not found')
    }
    const {name , price}= req.body
        tea.name = name 
        tea.price = price
    res.status(200).send(tea)

})

//delete tea
app.delete('/teas/:id', (req, res) => {
    //(!teaIndex || teaIndex === -1)In JavaScript, the ! operator is used to negate a value. When applied to a number, it converts the number to a boolean and then negates it. The number 0 is considered falsy, meaning it is converted to false when used in a boolean context. Therefore, !0 is true.
    // The [0] in (teaIndex, 1)[0] is used to access the first element of the array returned by the splice method. The splice method returns an array containing the deleted elements. In this case, it deletes one element at the index teaIndex and returns an array with that single element. The [0] is used to get that element from the array.
    const teaIndex = teaData.findIndex(t => t.id === parseInt(req.params.id));
    if (teaIndex === -1) {
        return res.status(404).send('Tea not found');
    }
    const deletedTea = teaData.splice(teaIndex, 1)[0];
    res.status(200).send(`Deleted tea: ${JSON.stringify(deletedTea)}`);
});



//genarel route 
app.get('/',(req,res)=>{
    console.log('hello form suman');
    res.send('hello form suman')
    
})
//testing another route 
app.get('/ice-tea',(req,res)=>{
    console.log('ice tea is good');
    res.send('ice tea is good');
    
})


//starting server
app.listen(port ,()=>{
    console.log(`server running on ${port}`)
})