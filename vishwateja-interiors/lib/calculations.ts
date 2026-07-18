export type InvoiceItem = {
  id: string;
  description: string;
  qty: number;
  rate: number;
};

export const GST_RATE = 0.18;

export function rowTotal(item: InvoiceItem) {
  return item.qty * item.rate;
}

export function calcSubtotal(items: InvoiceItem[]) {
  return items.reduce((sum, i) => sum + rowTotal(i), 0);
}

export function calcGST(subtotal: number) {
  return subtotal * GST_RATE;
}

export function calcGrandTotal(subtotal: number) {
  return subtotal + calcGST(subtotal);
}

export function generateInvoiceNumber(lastNumber: number) {
  const next = String(lastNumber + 1).padStart(3, "0");
  return `VTI-2026-${next}`;
}