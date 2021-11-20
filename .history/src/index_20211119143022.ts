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
        const todoID = url.searchParams.get('id') || '';

        if(path !== '/api/todos') {
            return utils.toError(`Unknown "${path}" URL; try "api/todos" instead`, 404); 
        }

        const token = req.headers.get('authorization');

        if(!token) {
            return utils.toError(
                `Missing the "authorization" header. Try again after including "authorization: REALM_API_KEY`, 
                401
            );
        }

        try {
            const credentials =  Realm.Credentials.apiKey(token); 
            var user = await App.logIn(credentials); 
            var client = user.mongoClient('mongodb-atlast');
        } catch (err) {
            return utils.toError(`Authentication Error`, 500); 
        }

        const collection = client.db('cloudflare').collection<Todo>('todos'); 

        try {
            if(method === 'GET') {
                if(todoID) {
                    return utils.reply(
                        await collection.findOne({
                            _id: new ObjectId(todoID)
                        })
                    );
                }
                return utils.reply(
                    await collection.find()
                ); 
            } 
            if(method === 'POST') {
                const { todo } = await req.json();

                return utils.reply(
                    await collection.insertOne({
                        owner: user.id,
                        done: false,
                        todo: todo
                    })
                );
            } 

            if(method === 'PATCH') {
                
            } 
            if(method === 'DELETE') {
                
            }
            return utils.toError(`Method not allowed`, 405); 
        } catch (err) {

        }

    }
}

