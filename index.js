const app=require('./app');
const port=7000;
app.listen(port,function(){
    console.log("Server create on port: ",port);
})