/**
 * Created by chzellot on 20.02.17.
 */
import {RECORDING} from "../constants";

/**
 * simple tokenstore holder for sessions
 */
export  default class TokenStore {
    constructor() {
        this.token = [];
    }

    get() {
        return this.token[this.token.length - 1];
    }

    new(token = "") {
        if (token != null && token === "") {
            this.token.push(this._generateUUID())
        } else {
            this.token.push(token)
        }
    }

    _generateUUID() {
        let d = new Date().getTime();
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }
}
/**
 *
 * @param tokenStore - TokenStore object
 * @returns {function(*): function(*): function(*)}
 */
export function tokenStoreMiddleware(tokenStore) {

    return store => next => action => {
        if (action.type == RECORDING.START) {
            tokenStore.new();
        }
        return next;
    }
}