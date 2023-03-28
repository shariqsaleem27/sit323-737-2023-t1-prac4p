const { json } = require('express');
const express = require('express'); 

const app = express(); 

const add = (n1,n2) => {
    return n1+n2;
}

const sub = (n1,n2) => {
    return n1-n2;
}

const div = (n1,n2) => {
    return n1/n2;
}

const mul = (n1,n2) => {
    return n1*n2;
}


app.get("/add",(req,res)=>{
    try{
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        if(isNaN(n1)){
            throw new Error("n1 icorrectly defined");
        }
        if(isNaN(n2)){
            throw new Error("n2 icorrectly defined");
        }
        if(n1 == NaN || n2 == NaN){
            console.log()
            throw new Error("Parsing Error")
        }
        const result = add(n1,n2);
        res.status(200).json({statuscocde:200,data : result});
        logger.log({
            level:'info',
            message:`provided numbers have been added, the result of addition of ${n1} ans ${n2} is ${result}`
        });
    
    }
    catch(error) {
        console.log(error)
        res.status(500).json({statuscocde:500, msg: error.toString()})
        logger.log({
            level:'error',
            message:`error while adding`
        });
    }
});


app.get("/sub",(req,res)=>{
    try{
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        if(isNaN(n1)){
            throw new Error("n1 icorrectly defined");
        }
        if(isNaN(n2)){
            throw new Error("n2 icorrectly defined");
        }
        if(n1 == NaN || n2 == NaN){
            console.log()
            throw new Error("Parsing Error")
        }
        const result = sub(n1,n2);
        res.status(200).json({statuscocde:200,data : result});
        logger.log({
            level:'info',
            message:`provided numbers have been subtracted, the result of subtraction of ${n1} ans ${n2} is ${result}`
        });

    } catch(error) {
        console.log(error)
        res.status(500).json({statuscocde:500, msg: error.toString()})
        logger.log({
            level:'error',
            message:`error while subtracting`
        });
    }
});


app.get("/mul",(req,res)=>{
    try{
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        if(isNaN(n1)){
            throw new Error("n1 icorrectly defined");
        }
        if(isNaN(n2)){
            throw new Error("n2 icorrectly defined");
        }
        if(n1 == NaN || n2 == NaN){
            console.log()
            throw new Error("Parsing Error")
        }
        const result = mul(n1,n2);
        res.status(200).json({statuscocde:200,data : result});
        logger.log({
            level:'info',
            message:`provided numbers have been multiplied, the result of multiplication of ${n1} ans ${n2} is ${result}`
        });
    } catch(error) {
        console.log(error)
        res.status(500).json({statuscocde:500, msg: error.toString()})
    }
});


app.get("/div",(req,res)=>{
    try{
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        if(isNaN(n1)){
            throw new Error("n1 icorrectly defined");
        }
        if(isNaN(n2)){
            throw new Error("n2 icorrectly defined");
        }
        if(n1 == NaN || n2 == NaN){
            console.log()
            throw new Error("Parsing Error")
        }
        const result = div(n1,n2);
        res.status(200).json({statuscocde:200,data : result});
        logger.log({
            level:'info',
            message:`provided numbers have been divided, the result of division of ${n1} ans ${n2} is ${result}`
        });
    } catch(error) {
        console.log(error)
        res.status(500).json({statuscocde:500, msg: error.toString()})
    }
});

const port = 3040;
app.listen(port,()=>{
    console.log("hello i'm listening to port"+port);
})

const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
            winston.format.json(),
            winston.format.timestamp()
),
    defaultMeta: {service: 'user-service' },
    transports: [
        new winston.transports.File({filename: 'error.log', level: 'error'}),
        new winston.transports.File({filename: 'combined.log'}),
    ]
});

if(process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        ),
    }));
}