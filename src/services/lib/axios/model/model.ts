export class ResponseCustom<T, X>{
    status!: Number;
    response!: T;
    error!: X;

    constructor(status: number = 500, response: any, error: any) {
        this.status = status;
        this.response = response;
        this.error = error;
    }
}