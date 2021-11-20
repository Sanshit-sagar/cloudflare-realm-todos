const toJSON = ()


const toError = (error: string | unknown, status = 400) => {
    return toJSON({error}, status); 
}