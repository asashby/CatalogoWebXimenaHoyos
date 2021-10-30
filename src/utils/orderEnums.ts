type PaymentMethodsOptions = {
    code: string;
    name: string;
}

export const CreditCard: PaymentMethodsOptions = {
    code: 'CDC',
    name: 'Tarjeta de crédito',
}

export const ReciveAndPay: PaymentMethodsOptions = {
    code: 'PPR',
    name: 'Pago al recibir',
}

export const DepositPay: PaymentMethodsOptions = {
    code: 'IBD',
    name: 'Banca por Internet o deposito',
}

export const PaymentMethodsOptions: PaymentMethodsOptions[] = [
    CreditCard,
    DepositPay,
    ReciveAndPay,
];

type FlagPickupElement = {
    code: string;
    name: string;
    value: number;
}

interface FlagPickUpOptions {
    home: FlagPickupElement;
    store: FlagPickupElement;
}

export const FlagPickUpOptions: FlagPickUpOptions = {
    home: {
        code: 'EAD',
        value: 1,
        name: 'Envío a domicilio',
    },
    store: {
        code: 'RCT',
        value: 2,
        name: 'Recojo en tienda',
    }
}