import {Message} from 'amqplib';
import {ReplayMessage} from '../Sockitio/Sendmessage';



async function Recmessage(amqplib:any){
    const queue:string='recmessage';
    const conn = await amqplib.connect('amqp://localhost:5672');

    try{
        console.log('set to re')
        const ch1 = await conn.createChannel();
        await ch1.assertQueue(queue,{durable:false});
        
        ch1.consume(queue,(msg:Message)=>{
            console.log('here recive message from server admin');
            const aa:string|any=msg?.content.toString();
            const OrginalObjectMessage=JSON.parse(aa);
            const Massagepassing={idM:OrginalObjectMessage.idOwnMessage,contentM:OrginalObjectMessage.contentMessage}
            ReplayMessage(Massagepassing)
            ch1.ack(msg);
        })

    }
    catch(e){console.log(e);return false;}
}

export {Recmessage}