import express,{Application} from 'express';
const app:Application=express();

import amqp, { Message,ConsumeMessage } from 'amqplib/callback_api'


const queue:string="valditionmessage";

import {SaveUser} from './db/Message.db'

 amqp.connect('amqp://localhost:5672',(err,con)=>{
  if(err){throw err};
  con.createChannel((err,cha)=>{
    if(err){throw err}
    cha.assertQueue(queue,{durable:false})
    cha.consume(queue,async (msg)=>{ 
      const aa:string|any=msg?.content.toString();
      const OrginalObjectMessage=JSON.parse(aa);
      if(OrginalObjectMessage.contentMessage!='fake'&&OrginalObjectMessage.contentMessage!='shit'){
          console.log('set condition do not foun fake or shit')
          
         const Save:Boolean=await SaveUser(OrginalObjectMessage.idMessage,OrginalObjectMessage.idOwnMessage,OrginalObjectMessage.idReciverMessage,OrginalObjectMessage.contentMessage);
         if(Save){
             console.log('set condition save in database  ')
             cha.ack(msg);
             cha.sendToQueue('recmessage',Buffer.from(JSON.stringify(OrginalObjectMessage)))
         }

                
      }
      
    },{noAck:false})
  })


  
})



const Port:Number=5001;

app.listen(Port,()=>{console.log(`listening on port number ${Port}`)})
