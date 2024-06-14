class ErrorDetail {
    type!: string
    message!: string
}

export class ErrorResponse {
    code!: string
    status!: number
    title!: string
    message!: string
    instance!: string
    details!: ErrorDetail[]
}

export enum ECurrency {
    ARS = "ARS",
    USD = "USD"
}

export enum EOrderBy {
    PRESENTATION_DATE = "PRESENTATION_DATE",
    MOVEMENT_DATE = "MOVEMENT_DATE"
}

export enum EFilterDate {
    PRESENTATION_DATE = "PRESENTATION_DATE",
    MOVEMENT_DATE = "MOVEMENT_DATE"
}

export enum ETypeOrder {
    ASC = "ASC",
    DESC = "DESC"
}

export class GetSearchCouponsMovUsuRequest {
    cardNumber!: string;
    accountNumber!: number;
    authorizationCode!: string;
    merchantName!: string;
    arn!: string;
    amount!: number;
    currency!: ECurrency;
    dateFrom!: string;
    dateTo!: string;
    orderBy!: EOrderBy;
    typeOrder!: ETypeOrder;
    filterDate!: EFilterDate
}


export class MovUsuCoupon{
    
    admin_bank_code!: number;
	
    bank_code!: number;
   
    branch_code!: number;
   
    transaction_code!: string;

     card_number!: number;
   
     account_number!: number;
   
    processing_date!: Date;
   
    origin_date!: Date;
   
    transaction_receipt!: string;
   
    currency!: string;
   
    amount!: number;
   
    origin_currency!: string;
   
    origin_amount!: number;

    arp_amount!: number;
   
    usd_amount!: number;
   
    leftover_amount!: number;
   
    settlement_model!: string;
   
    visa_merchant_category_code!: string;
   
    mileage_code!: string;
   
    text_message!: string;
   
    merchant_admin_bank_code!: number;
   
    merchant_bank_code!: number;

    merchant_branch_code!: number;
   
    bill_cycle!: number;
   
    international_mark!: string;
   
    campaing_type!: number;
   
    interest_date!: Date;

    affinity_group!: string;
   
    visa_account_type!: string;
   
    user_region!: string;
   
    merchant_region!: string;
   
    mark_instalments!: string;

    merchant_country!: string;

    merchant_city!: string;
   
    merchant_province!: string;
   
    merchant_number!: string;

    application_order!: number;
   
    settlement_order!: number;
   
    moto_eci!: string;
   
    terminal_type!: string;
   
    manual_pos!: string;
   
    promotion_indicator!: string;
   
    promotion_id!: string;
   
    merchant_discount_percentage!: number;
   
    acquirer_bin!: number;

    issuing_fee!: number;
   
    present_card_indicator!: string;
   
    automatic_debit_indicator!: string;
   
    atm_indicator!: string;
   
    total_instalments!: number;
   
    link_advance_indicator!: string;

    card_type!: string;
   
    card_product!: string;
   
    user_discount_percentage!: number;
   
    product_card_type!: string;
   
    accounting_total_indicator!: string;
   
    clean_sumary_indicator!: string;
   
    plan_id!: string;
   
    fechacarga!: Date;
}

export interface GetSearchCouponsMovUsuResponse{
    coupons: [MovUsuCoupon];
}

export interface GridColDef{
    field: string;
}