import {HttpClient} from '../lib/axios/HttpClient'
import {ResponseCustom} from '../lib/axios/model/model'
import {GetSearchCouponsMovUsuRequest,ErrorResponse,GetSearchCouponsMovUsuResponse} from '../couponService/model/model'
import { COUPONS_MOVUSU_URL } from "../../config/DefaultValues";

export async function searchCoupons(params:GetSearchCouponsMovUsuRequest): Promise<ResponseCustom<GetSearchCouponsMovUsuResponse, ErrorResponse> | undefined> {
    let paramsQuery: string[] = [];
    Object.entries(params).forEach(([key, value]) => {
        if (value != null && value != undefined)
            paramsQuery.push(key + "=" + value)
    });

    try {
        const response = await HttpClient.get<GetSearchCouponsMovUsuResponse, ErrorResponse>(COUPONS_MOVUSU_URL + '/movusu?' + paramsQuery.join("&"), undefined);
        return response;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}