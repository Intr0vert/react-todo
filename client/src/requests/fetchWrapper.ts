import { CommonThunkDispatch } from "../types/thunk";
import { DataError } from "../ducs/todos";

interface RequestTypes {
    method?: string;
    body?: any | undefined;
    headers?: Headers | string[][] | Record<string, string> | undefined;
}

function fetchWrapper<TResult> (
        dispatch: CommonThunkDispatch,
        url: string,
        reqBody: RequestTypes = {}
    ): Promise<TResult> {
        return new Promise(async (resolve, reject) => {
            try {
                const response: Response = await fetch(url, reqBody);

                if (!response.ok) {
                    reject(response.statusText);
                }

                resolve(await response.json());
            } catch (err) {
                dispatch(DataError(err.toString()));
                reject(err.toString());
            }
    });
}

export default fetchWrapper;