export const FREE_DELIVERY_THRESHOLD = 1_999;
export const ORDER_DISCOUNT_THRESHOLD = 5_000;
export const STANDARD_DELIVERY_FEE = 199;

export function calculateOrder(subtotal: number) {
  const discount = subtotal > ORDER_DISCOUNT_THRESHOLD ? Math.round(subtotal * 0.05) : 0;
  const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : STANDARD_DELIVERY_FEE;
  return {
    subtotal,
    discount,
    delivery,
    total: Math.max(0, subtotal - discount + delivery),
    amountUntilFreeDelivery: Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal),
  };
}
