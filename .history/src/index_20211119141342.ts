import * as Realm from 'realm-web'
import * as utils from './utils'


interface Bindings {
    REALM_APPID: string; 
}; 

type Document = globalThis.Realm.Services.MongoDB.Document;

interface Todo extends Document {
    owner: string;
    done: boolean; 
    todo: string;
};

let App: Realm.App;
const ObjectId = Realm.BSON.ObjectID; 

const worker: ExportedHandler<Todo> = {

    async fetch(req, env) {
        const url = new URL(req.url);
        App = App || new Realm.App(env.REALM_APPID);

        const method = req.method; 
        const path = url.pathname.replace(/[/]$/, '');
        const todoId = url.searchParams.get('id') || '';

        if(path !== '/api/todos') {
            return utils.toError(`Unknown "${path}" URL; try "api/todos" instead`, 404); 
        }

        const token = req.headers.get('authorization');

        if(!token) {
            return utils.toError(`Missing the "authorization" header. Try again `)
        }


        try {

        } catch (err) {

        }
    }
}

