import CrudOperations from "../crudOpertions/moongodbCrud.js";
import {Ticket,Chat}from "../model/schema.js";
class TicketController{
     createTicket(req,res){
        const ticketData = req.body;
        ticketData.isActive=true;
      new CrudOperations(Ticket).getAllDocuments({},{},{pageNo:0,limit:1}).then(async (lastTicket)=>{
        console.log(lastTicket)
        if(lastTicket[0]?.ticketId){
            const ticketNo=lastTicket[0]?.ticketId?.replace(/\D/g,'');
              ticketData.ticketId="ticket"+(parseInt(ticketNo)+1);
          }else{
              ticketData.ticketId="ticket1";
          }
            
        const ticket = new Ticket(req.body);
        new CrudOperations(Ticket)
        .save(ticket)
        .then((result) => 
        {
            res.status(201).send(
                result
            );
         })
        .catch((error) =>
         {  res.status(400).send(
            error
        );});
      })
       
       
      

    }
    async getTicket(req,res){
     const query=req.query??{};
    new CrudOperations(Ticket).getAllDocuments(query,{},{pageNo:0,limit:0}).then( (result)=>{
        res.status(201).send(
            result
        );
    }).catch((error) =>
    {  res.status(400).send(
       error
   );})
    }
    async custReplay(req,res){
        const ticketId =req.params.id;
        console.log(ticketId)
       const ticket= await new CrudOperations(Ticket).getDocument({"ticketId":ticketId},{})
       if(ticket.isActive){
        const ticketChat =await new CrudOperations(Chat).getDocument({"ticketId":ticketId},{})
        if(ticketChat){
            ticketChat.message.push({
                "title":"user",
                "msg":req.body.message
            })

          const updatedChat = await  new CrudOperations(Chat).updateDocument({"ticketId":ticketId},ticketChat)
          res.status(201).send(
            updatedChat
        );
        }
        else{
            const chat = new Chat({
                "ticketId":ticketId,
                "message":[{
                    "title":"user",
                    "msg":req.body.message
                }]
            })
            new CrudOperations(Chat).save(chat).then((result) => 
            {
                res.status(201).send(
                    result
                );
             })
            .catch((error) =>
             {  res.status(400).send(
                error
            );})


            


        }
       }
       else{
        res.status(400).send(
            {"msg" : `${ticketId} is already closed`}
             );
    }
       


    }
    async adminReplay(req,res){
        const ticketId =req.params.id;
        console.log(ticketId)
       const ticket= await new CrudOperations(Ticket).getDocument({"ticketId":ticketId},{})
       if(ticket.isActive){
        const ticketChat =await new CrudOperations(Chat).getDocument({"ticketId":ticketId},{})
        if(ticketChat){
            ticketChat.message.push({
                "title":"admin",
                "msg":req.body.message
            })

          const updatedChat = await  new CrudOperations(Chat).updateDocument({"ticketId":ticketId},ticketChat)
          res.status(201).send(
            updatedChat
        );
        }
        else{
            const chat = new Chat({
                "ticketId":ticketId,
                "message":[{
                    "title":"admin",
                    "msg":req.body.message
                }]
            })
            new CrudOperations(Chat).save(chat).then((result) => 
            {
                res.status(201).send(
                    result
                );
             })
            .catch((error) =>
             {  res.status(400).send(
                error
            );})


            


        }
       }
       else{
        res.status(400).send(
            {"msg" : `${ticketId} is already closed`}
             );
    }
    }
    async closeTicket(req,res){
        const ticketId =req.params.id;
        const ticket= await new CrudOperations(Ticket).getDocument({"ticketId":ticketId},{})
          if(ticket.isActive){
            ticket.isActive =false;
            const updatedChat = await  new CrudOperations(Ticket).updateDocument({"ticketId":ticketId},ticket)
          res.status(200).send(
           {"msg" : `${ticketId}  closed`}
            );
        }
        else{
            res.status(400).send(
                {"msg" : `${ticketId} is already closed`}
                 );
        }



    }
    
    
}
export const ticketController = new TicketController();