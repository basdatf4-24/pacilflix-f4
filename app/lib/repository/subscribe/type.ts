export enum PaymentMethod {
  BANK_TRANSFER = "BANK_TRANSFER",
  CREDIT_CARD = "CREDIT_CARD",
  E_WALLET = "E_WALLET",
}

export function validatePaymentMethod(paymentMethod: string): boolean {
  return Object.values(PaymentMethod).includes(paymentMethod as PaymentMethod);
}
