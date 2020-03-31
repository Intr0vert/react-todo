import { CommonThunkDispatch } from "../types/thunk";
import { DataError } from "../ducs/todos";
import { rejects } from "assert";

interface RequestTypes {
    method?: string;
    body?: any | undefined;
    headers?: Headers | string[][] | Record<string, string> | undefined;
}

const fetchWrapper = (dispatch: CommonThunkDispatch, url: string, reqBody: RequestTypes = {}) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(url, reqBody);
            
            if (!response.ok) {
                reject(response.statusText);
            }

            resolve(response);
        } catch (err) {
            dispatch(DataError(err.toString()));
            reject(err.toString());
        }
    });
}

export default fetchWrapper;