import { Io } from "../app";    
 interface MessageReplay{
    idM:string,
    contentM:string
 }
 
 function ReplayMessage(msg:MessageReplay){
    Io.to(msg.idM).emit('ee',msg.contentM);
    console.log('send to client')
 }

export {ReplayMessage}