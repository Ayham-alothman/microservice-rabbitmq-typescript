import express,{Application,Request,Response} from 'express';
import bodyParser from 'body-parser';
import {createServer} from 'http'
import amqplib from 'amqplib';
import {Server} from 'socket.io';


import { Vaditonmsg } from './Rabbitmq/CommunicationMsg.js';
import {Recmessage} from './Rabbitmq/ReciveMessaage.js'


Recmessage(amqplib);


 const app:Application=express();
 app.use(bodyParser.json())


const server=createServer(app);
export const Io= new Server(server);

import { Message } from './interfaces/message.inter.js';
app.post('/api/chat',async(req:Request,res:Response)=>{
     const msg:Message={idMessage:req.body.idm,contentMessage:req.body.contentmessage
        ,idOwnMessage:req.body.ownMessage,idReciverMessage:req.body.idReciverMessage}
      
    let Val:boolean=await Vaditonmsg(msg);
        
    if(Val){res.status(200).end()}
    else if(!Val){res.status(400).end()}
});

const Port:Number=3000;

server.listen(Port,()=>{console.log(`listening on port number ${Port}`)})
