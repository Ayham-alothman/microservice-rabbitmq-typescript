import amqplib from 'amqplib';
import { Message } from '../interfaces/message.inter';


const queue:string="valditionmessage"
async function Vaditonmsg(msg:Message) {
    const conn = await amqplib.connect('amqp://localhost:5672');
    
    try{
        
        const ch1 = await conn.createChannel();
        await ch1.assertQueue(queue,{durable:false});
        ch1.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
        
        return true;


    }
    catch(e){console.log(e);return false;}
    
    

}

export {Vaditonmsg}