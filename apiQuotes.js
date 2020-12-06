const express = require('express');
const app = express();

const apiQuotes = express.Router();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

apiQuotes.get('/random',(req,res,next)=>{
    res.send({
        quote:getRandomElement(quotes),});
});

apiQuotes.get('/',(req,res,next)=>{
    if(req.query.person !== undefined){
        const quotesbypersom = quotes.filter(quote => quote.person === req.query.person);
        res.send({quotes:quotesbypersom});
    }
    else
        res.send({quotes:quotes});
});

apiQuotes.delete('/',(req,res,next)=>{
    if(req.query.person !== undefined){
        var personFound = false;
         for(var index = 0; index < quotes.length; index++) {
             var foundQuote = quotes[index];
             if(foundQuote.person == req.query.person) {
                 console.log('Removed Quote: ',  foundQuote.quote); 
                 
                 quotes.splice(index, 1);
                 personFound = true;
                 break;
             }
         }
         if(!personFound)
            res.send({
            deletedPerson: "Author doesn't Exist"
             });
         else
             res.send({
             deletedPerson : req.query.person
         });
    }
    else    
        res.status(404).send();
})
apiQuotes.post('/',(req,res,next)=>{
    if(req.query.person!== undefined && req.query.quote !==undefined){
        quotes.push({
            quote : req.query.quote,
            person :req.query.person
        });
        res.send({
            quote:{
                quote : req.query.quote,
                person :req.query.person
            }
        })
    }
    else
        res.status(400).send();
});

module.exports = apiQuotes;