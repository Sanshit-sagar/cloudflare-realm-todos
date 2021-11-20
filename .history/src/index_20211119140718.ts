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

}

