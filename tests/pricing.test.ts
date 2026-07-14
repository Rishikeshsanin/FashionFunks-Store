import { describe, expect, it } from "vitest";
import { calculateOrder, FREE_DELIVERY_THRESHOLD, ORDER_DISCOUNT_THRESHOLD, STANDARD_DELIVERY_FEE } from "@/lib/pricing";

describe("calculateOrder", () => {
  it("charges delivery below the free-delivery threshold", () => {
    expect(calculateOrder(FREE_DELIVERY_THRESHOLD - 1)).toEqual({
      subtotal: 1_998,
      discount: 0,
      delivery: STANDARD_DELIVERY_FEE,
      total: 2_197,
      amountUntilFreeDelivery: 1,
    });
  });

  it("makes delivery free at the threshold", () => {
    expect(calculateOrder(FREE_DELIVERY_THRESHOLD).delivery).toBe(0);
  });

  it("applies five percent only above the order threshold", () => {
    expect(calculateOrder(ORDER_DISCOUNT_THRESHOLD).discount).toBe(0);
    expect(calculateOrder(6_000)).toMatchObject({ discount: 300, delivery: 0, total: 5_700 });
  });
});
