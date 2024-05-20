const asyncHandler = (fn) => (request,response,next) =>{

    Promise 
        .resolve(fn(request,response,next))
        .catch(error =>{
            response.status(500).json({message: error.message})
    })

}
export default asyncHandler;