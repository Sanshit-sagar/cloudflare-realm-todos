export const toJSON = (data: unknown, status = 200): Response => {
    let body = JSON.stringify(data, null, 2);

    return new Response(body, {
        headers: {
            'content-type': 'application/json'};
        status
    }); 
}

export const toError = (error: string | unknown, status = 400): Response => {
    return toJSON({error}, status); 
}

export const toReply = (output: any): Response => {
    if(output !== null) {
        return toJSON(output, 200); 
    }
    return toError("Error with query", 500); 
}   