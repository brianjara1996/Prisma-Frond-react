import { useState } from "react";
import { searchCoupons } from "../../services/couponService/CouponService";
import Hr from "../Hr/Hr";
import './searchCoupons.css'
import { GetSearchCouponsMovUsuRequest } from "../../services/couponService/model/model";
import { Button, Datepicker, Provider, Select, TextInput } from '@orbita-ui/core';
import { CSSReset } from '../../config/CSSReset';
import { Table } from '@orbita-ui/core';

const SearchPresentedCoupons = () => {
    const [enableView, setEnableView] = useState(false);
    const [rows, setRows] = useState<[any]>([{ id: 1 }]);

    const [accountNumber, setAccountNumber] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('');
    const [orderBy, setOrderBy] = useState('');
    const [typeOrder, setTypeOrder] = useState('');
    const [filterDate, setFilterDate] = useState('PRESENTATION_DATE');
    const [dateFrom, setDateFrom] = useState<any>();
    const [dateTo, setDateTo] = useState<any>();
    const [inSearch, setInSearch] = useState(false);

    const [view, setView] = useState('');

    function filterValue(value: any) {
        if (value != '')
            return value
        else
            return null
    }


    async function find(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();
        setInSearch(true);

        let request = new GetSearchCouponsMovUsuRequest();
        request.accountNumber = filterValue(accountNumber);
        request.cardNumber = filterValue(cardNumber);
        request.amount = filterValue(amount);
        request.currency = filterValue(currency); 
        request.orderBy = filterValue(orderBy);
        request.typeOrder = filterValue(typeOrder);
        request.filterDate = filterValue(filterDate);
        request.dateFrom = filterValue(dateFrom);
        request.dateTo = filterValue(dateTo);

        searchCoupons(request).then((r) => {
            console.log(r?.response.coupons)
            if (r?.status == 200) {
                if (r.response.coupons != null && r.response.coupons.length > 0) {
                    setRows(r.response.coupons);
                    setEnableView(true)
                }
                else{
                    alert("No Hay Cupones Encontrados con el Filtro indicado!")
                }
            }
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setInSearch(false);
        })
    }

    return (<Provider variant="theme-prisma">
        <CSSReset />
        {
            <div className="container">
                <div className="row form-row text-form">
                    <div className="form-group col-md-3">
                        <TextInput
                            data-testid="accountNumberInput"                         
                            id="accountNumberInput"
                            fullWidth={true}
                            label="Cuenta"
                            placeholder=""
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                        />
                    </div>
                    <div className="form-group col-md-3">
                        <TextInput
                            id="cardNumberInput"
                            fullWidth={true}
                            label="Tarjeta"
                            placeholder=""
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                        />
                    </div>
                </div>
                <div className="row form-row text-form">
                    <div className="form-group col-md-3">
                        <TextInput
                            id="amountInput"
                            fullWidth={true}
                            label="Importe"
                            placeholder=""
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                    <div className="form-group col-md-2 vertical-align">
                        <Select
                            label="Moneda"
                            onBlur={function noRefCheck() { }}
                            fullWidth={true}
                            options={[
                                {
                                    label: 'Todas',
                                    value: ''
                                },
                                {
                                    label: 'USD',
                                    value: 'USD'
                                },
                                {
                                    label: 'ARS',
                                    value: 'ARS'
                                }

                            ]}
                            defaultValue={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            placeholder=""
                        />
                    </div>
                </div>
                <div className="row form-row text-form">
                    <div className="form-group col-md-2 vertical-align">
                        <Select
                            label="Ordenar por:"
                            onBlur={function noRefCheck() { }}
                            fullWidth={true}
                            options={[
                                {
                                    label: 'Ninguno',
                                    value: ''
                                },
                                {
                                    label: 'Fecha de presentacion',
                                    value: 'PRESENTATION_DATE'
                                },
                                {
                                    label: 'Fecha de movimiento',
                                    value: 'MOVEMENT_DATE'
                                }

                            ]}
                            defaultValue={orderBy}
                            onChange={(e) => setOrderBy(e.target.value)}
                            placeholder=""
                        />
                    </div>
                    <div className="form-group col-md-2 vertical-align">
                        <Select
                            label="Orden:"
                            onBlur={function noRefCheck() { }}
                            fullWidth={true}
                            options={[
                                {
                                    label: 'Ninguno',
                                    value: ''
                                },
                                {
                                    label: 'Ascendente',
                                    value: 'ASC'
                                },
                                {
                                    label: 'Descendente',
                                    value: 'DESC'
                                }

                            ]}
                            defaultValue={typeOrder}
                            onChange={(e) => setTypeOrder(e.target.value)}
                            placeholder=""
                        />
                    </div>

                    <div className="form-group col-md-2 vertical-align">
                        <Select
                            label="Fecha:"
                            onBlur={function noRefCheck() { }}
                            fullWidth={true}
                            options={[
                                {
                                    label: 'Fecha de presentacion',
                                    value: 'PRESENTATION_DATE'
                                },
                                {
                                    label: 'Fecha de movimiento',
                                    value: 'MOVEMENT_DATE'
                                }

                            ]}
                            defaultValue={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                            placeholder=""
                        />
                    </div>

                    <div className="form-group col-md-3">
                        <Datepicker
                            disabledDates={new Date("2024-03-01T18:08:42.413Z")}
                            label="Desde:"
                            mode="single"
                            onBlur={function noRefCheck() { }}
                            onChange={(d) => {
                                if (d instanceof Date) {
                                    setDateFrom(d.toISOString().split('T')[0]);
                                } else {
                                    setDateFrom(null);
                                }
                            }}                              
                            placeholder="DD/MM/AAAA"
                            value={dateFrom}
                            editable                            
                        />
                    </div>
                    <div className="form-group col-md-3">
                        <Datepicker
                            disabledDates={new Date("2024-03-01T18:08:42.413Z")}
                            label="Hasta:"
                            mode="single"
                            onBlur={function noRefCheck() { }}
                            onChange={(d) => {
                                if (d instanceof Date) {
                                    setDateTo(d.toISOString().split('T')[0]);
                                } else {
                                    setDateTo(null);
                                }
                            }}                            
                            placeholder="DD/MM/AAAA"
                            value={dateTo}
                            editable
                        />
                    </div>
                </div>
                <div className="row form-row text-form">
                    <div className="form-group col-md-10">
                        <Select
                            label="Vista:"
                            onBlur={function noRefCheck() { }}                            
                            fullWidth={false}
                            options={[
                                {
                                    label: 'Inicial',
                                    value: '0'
                                },
                                {
                                    label: 'Vista 1',
                                    value: '1'
                                },
                                {
                                    label: 'Vista 2',
                                    value: '2'
                                }

                            ]}
                            defaultValue={view}
                            onChange={(e) => setView(e.target.value)}
                            placeholder=""
                        />
                    </div>


                    <div className="form-group col-md-2 vertical-align">
                        <Button onClick={(e) => { find(e) }} disabled={inSearch} className="vertical-align">
                            <div hidden={inSearch} style={{ background: "none", border: "none" }}> Buscar</div>
                            <div className="loader" hidden={!inSearch}>

                            </div>
                        </Button>
                    </div>
                </div>
                <Hr />
                {enableView &&
                    <Table
                        columns={[
                            {
                                accessorKey: 'arn',
                                header: 'Codigo Cupon',
                                id: 'arn'
                            },
                            {
                                accessorKey: 'account_number',
                                header: 'Numero de cuenta',
                                id: 'account_number'
                            },
                            {
                                accessorKey: 'purchase_date',
                                header: 'Fecha de compra',
                                id: 'purchase_date'
                            },
                            {
                                accessorKey: 'currency',
                                header: 'Moneda',
                                id: 'currency'
                            },
                            {
                                accessorKey: 'amount',
                                header: 'Monto',
                                id: 'amount'
                            },
                            {
                                accessorKey: 'merchant_name',
                                header: 'Nombre de comercio',
                                id: 'merchant_name'
                            },
                            {
                                accessorKey: 'transaction_code',
                                header: 'Codigo de transacción',
                                id: 'transaction_code'
                            }
                        ]}
                        data={rows}
                        onRowClick={(row) => { console.log(row) }}
                        withRowClick
                        onPaginationChange={(pagination) => console.log(pagination)}
                        pageCount={10}
                        pageIndex={0}
                        pageSize={10}
                        totalElements={rows != undefined && rows != null ? rows.length : 0}
                        withPagination
                    />}
            </div>}
    </Provider>
    );
}

export default SearchPresentedCoupons;