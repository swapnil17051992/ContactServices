const express =require('express')
const ConnectDB=require('./config/db')

const app=express();

//connect mongo db
ConnectDB();

//init middleware
app.use(express.json({extended:false}));


app.get('/', (req, res) => {
     //res.send('Wel come stating API');
      res.json({msg:'Wel Come to API'});
});

const usercontroller=require('./routes/users')
const contactController=require('./routes/contacts')
app.use('/api/users',usercontroller);
app.use('/api/contacts',contactController);
app.use('/api/auth',require('./routes/auth'));



const port=process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});