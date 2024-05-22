import { isValidObjectId } from "mongoose";

function checkId(request,response,next){
    if(!isValidObjectId(request.params.id)){
        response.status(404)
        throw new Error(`Oggetto non valido per: ${request.params.id}`)
    }
    next()
}

export {checkId};




