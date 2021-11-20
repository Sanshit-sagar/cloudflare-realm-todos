const toJSON = (data: unknown, status = 200) => {
    
}


const toError = (error: string | unknown, status = 400) => {
    return toJSON({error}, status); 
}