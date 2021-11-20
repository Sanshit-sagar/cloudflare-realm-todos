const toJSON = (data: unknown, status = 200) => {
    let body = JSON.stringify(data, null, 2);
    let headers = {'content-type': 'application/json'};

    return new Response(body, { headers, status }); 
}

const toError = (error: string | unknown, status = 400) => {
    return toJSON({error}, status); 
}