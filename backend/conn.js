const mongoose=require('mongoose');


const url='mongodb://localhost:27017/fullStack'

mongoose.connect(url).then(()=>{
  console.log('connect successfully')
}).catch((error)=>{
  console.log('connection failed')
})

