import mongoose from "mongoose"

const ticketSchema = new mongoose.Schema(
    {
     email:{
        type:'string',
        required:true,
     } ,
     subject:{
        type:'string',
        required:true,
     } ,
     message:{
        type:'string',
        required:true,
     } ,
     isActive:{
        type:'boolean',
        required:true,
     } ,
     ticketId :{
        type:'string',
        required:true,
     } ,
    }
    );
    ticketSchema.set("timestamps", true);

const Ticket = new mongoose.model("ticket",ticketSchema);



const chatSchema = new mongoose.Schema(
    {
        ticketId:{
            type:'string',
            required:true,
         } ,
         message:{
            type:["object"],
            required:true,
         }
        

    }
)
chatSchema.set("timestamps", true);
const Chat = new mongoose.model("chat",chatSchema);


export {Ticket,ticketSchema,Chat,chatSchema}