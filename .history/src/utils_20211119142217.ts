const toJSON = (data: unknown, )


const toError = (error: string | unknown, status = 400) => {
    return toJSON({error}, status); 
}