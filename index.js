const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

// const allowCrossDomain = (req,res,next)=>{
//       res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE')
//       next()
// }

// app.use(allowCrossDomain())

mongoose.connect('mongodb+srv://angular:zaq1zaq1@cluster0.sinhd.mongodb.net/cruddb?retryWrites=true&w=majority')
        .then(()=>{
            //  console.log('connected successfully')
        })
        .catch(error=>{
              console.log(error)
        })

//Create Schema

const BookSchema = new mongoose.Schema({
      coursename:{
          type: String,
          required:true

      },
      courseprice: {
           type: Number,
           required:true
      }
})

// Create Model
const BookModel = mongoose.model('books',BookSchema)

app.get('/api/books',async (req,res)=>{
      const results = await BookModel.find()
      res.send(results)
})

app.get('/api/books/:id',async (req,res)=>{
    const results = await BookModel.findById({_id:req.params.id})
    res.send(results)
})

app.post('/api/books',async(req,res)=>{
     const newbook = new BookModel({
           coursename: req.body.coursename,
           courseprice:req.body.courseprice
     })

    const results =  await newbook.save()
    res.send(results)

})

// http://localhost:9000/api/books/652d38add32e2cbb0f4ad1d2
app.put('/api/books/:id',async(req,res)=>{
    const foundBook = await BookModel.findById({_id:req.params.id})
     
     foundBook.coursename=req.body.coursename
     foundBook.courseprice=req.body.courseprice

     const results = await foundBook.save()
     res.send(results)
})

app.delete('/api/books/:id',async(req,res)=>{
            
       const deleteBook = await BookModel.deleteOne({_id:req.params.id})
       res.send(deleteBook)
})




app.listen(process.env.PORT || 9000,()=>console.log(`Listening on port 9000`))