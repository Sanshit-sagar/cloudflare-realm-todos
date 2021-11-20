const toJSON = (data: unknown, status = 200): Response => {
    let body = JSON.stringify(data, null, 2);
    let headers = {'content-type': 'application/json'};
    return new Response(body, { headers, status }); 
}

const toError = (error: string | unknown, status = 400): Response => {
    return toJSON({error}, status); 
}

const toReply = (output: any): Response => {
    if(output !== null) return toJSON(output, 200); 
    return toError()
}   