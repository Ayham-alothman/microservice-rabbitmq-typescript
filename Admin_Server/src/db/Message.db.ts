import { connect } from 'mongoose';

import {Message} from './scema/MessageScema.js';

async function SaveUser(idmessage:string,idownmessage:string,idrecivermessage:string,content:string) {
    try{
        await connect('mongodb://localhost:27017/messages');
       const Msg= new Message( {
        idmessage:idmessage,
        idownmessage:idownmessage,
        idrecivermessage:idrecivermessage,
        content:content,
        date:new Date().getDay().toString()
        } )
        await Msg.save();
        return true;
    }
    catch(e){throw e;}
    
}



export {SaveUser}