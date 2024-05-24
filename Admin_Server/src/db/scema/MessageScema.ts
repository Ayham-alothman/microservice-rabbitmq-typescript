import { Schema, model, connect } from 'mongoose';
//mongodb://localhost:27017

interface Message {
  idmessage:string;
  idownmessage:string;
  idrecivermessage:string; 
    content: string;
    date?:Date;
  }

  const msgSchema = new Schema<Message>({
    idmessage: { type: String, required: true },
    idownmessage: { type: String, required: true },
    idrecivermessage: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, },
    
  });
  
  export const Message = model<Message>('Message', msgSchema);
