import axios, { AxiosHeaders } from "axios";
import { ResponseCustom } from "../axios/model/model";


const validateStatus: ((status: number) => boolean) = (status: number) => {
    return status < 500;
}

export class HttpClient {

    public static async post<T,X>(url: string, body: any, headers?: AxiosHeaders): Promise<ResponseCustom<T,X> | undefined> {
        try {
            const { data, status } = await axios.post(url, body, { headers: headers, validateStatus: validateStatus });
            return new ResponseCustom<T,X>(status, data, null)
        } catch (error) {
            if (axios.isAxiosError(error)) {                
                return new ResponseCustom<T,X>(error.status, null, error.response)
            } else {
                throw new Error("Internal Server error: " + String(error));                
            }
        }
    }

    public static async get<T,X>(url: string, headers?: AxiosHeaders): Promise<ResponseCustom<T,X> | undefined> {
        try {
            const { data, status } = await axios.get(url, { headers: headers, validateStatus: validateStatus });
            return new ResponseCustom<T,X>(status, data, null)
        } catch (error) {
            if (axios.isAxiosError(error)) {                
                return new ResponseCustom<T,X>(error.status, null, error.response)
            } else {
                throw new Error("Internal Server error: " + String(error));                
            }
        }
    }

}