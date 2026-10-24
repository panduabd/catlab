export interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
  variant?: string;
}

export interface InvoiceData {
  orderNumber: string;
  date: string;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  shippingAddress: string;
  paymentStatus: string;
  orderStatus?: string;
  courier?: string;
  trackingNumber?: string;
  items: InvoiceItem[];
  subtotal: number;
  shipping: number;
  discount?: number;
  total: number;
  currencySymbol?: string;
}

export const generateInvoiceHtml = (data: InvoiceData): string => {
  const currency = data.currencySymbol || 'NT$ ';
  const isPaid = data.paymentStatus.toLowerCase().includes('paid');
  const normalizedStatus = (data.orderStatus || '').trim().toLowerCase();
  const isShipped =
    normalizedStatus === 'shipped' ||
    (normalizedStatus.includes('shipped') &&
      !normalizedStatus.includes('not shipped') &&
      !normalizedStatus.includes('unshipped') &&
      !normalizedStatus.includes('awaiting'));

  const itemsRows = data.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px 14px; border-bottom: 1px solid #f3f4f6;">
          <div style="font-weight: 600; color: #111827; font-size: 13px;">${item.name}</div>
          ${item.variant ? `<div style="font-size: 11px; color: #6b7280; margin-top: 2px;">Variant: ${item.variant}</div>` : ''}
        </td>
        <td style="padding: 12px 14px; text-align: center; border-bottom: 1px solid #f3f4f6; color: #374151; font-size: 13px;">
          ${item.quantity}
        </td>
        <td style="padding: 12px 14px; text-align: right; border-bottom: 1px solid #f3f4f6; color: #374151; font-size: 13px; font-variant-numeric: tabular-nums;">
          ${currency}${item.price.toLocaleString()}
        </td>
        <td style="padding: 12px 14px; text-align: right; border-bottom: 1px solid #f3f4f6; font-weight: 700; color: #111827; font-size: 13px; font-variant-numeric: tabular-nums;">
          ${currency}${(item.quantity * item.price).toLocaleString()}
        </td>
      </tr>
    `
    )
    .join('');

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>Invoice - ${data.orderNumber} - CAT LAB+</title>
        <style>
          @page {
            size: A4;
            margin: 16mm 14mm;
          }
          * {
            box-sizing: border-box;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            color: #1f2937;
            background: #ffffff;
            margin: 0;
            padding: 24px;
            font-size: 12px;
            line-height: 1.5;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .invoice-card {
            max-width: 760px;
            margin: 0 auto;
          }
          .badge {
            display: inline-block;
            padding: 3px 10px;
            border-radius: 9999px;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.025em;
            text-transform: uppercase;
          }
          .badge-paid {
            background-color: #ecfdf5;
            color: #065f46;
            border: 1px solid #a7f3d0;
          }
          .badge-pending {
            background-color: #fffbeb;
            color: #92400e;
            border: 1px solid #fde68a;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th {
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #6b7280;
            background-color: #f9fafb;
            padding: 10px 14px;
            border-top: 1px solid #e5e7eb;
            border-bottom: 1px solid #e5e7eb;
          }
        </style>
      </head>
      <body>
        <div class="invoice-card">
          <!-- Header with CAT LAB+ Logo & Company Address (Refers to Landing Page Footer) -->
          <div style="display: flex; justify-content: space-between; align-items: flex-start; padding-bottom: 24px; border-bottom: 2px solid #111827;">
            <div>
              <img
                src="/images/logo-nav.webp"
                alt="CAT LAB+"
                style="height: 36px; width: auto; display: block; margin-bottom: 8px;"
              />
              <div style="font-size: 11px; color: #4b5563; line-height: 1.45; max-width: 360px;">
                <p style="margin: 0; font-weight: 600; color: #111827;">CL Infinite Technology Co., Ltd.</p>
                <p style="margin: 2px 0 0 0;">No. 3, Lane 598, Section 1, Zhonghang Rd., Shalu Dist., Taichung City, Taiwan</p>
                <p style="margin: 2px 0 0 0; color: #6b7280;">chloe.chang@clitech.com.tw • +886-4-2615-2878</p>
              </div>
            </div>

            <div style="text-align: right;">
              <h1 style="margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.5px; color: #111827;">
                INVOICE
              </h1>
              <div style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 13px; font-weight: 700; color: #374151; margin-top: 4px;">
                ${data.orderNumber}
              </div>
              <div style="margin-top: 6px;">
                <span class="badge ${isPaid ? 'badge-paid' : 'badge-pending'}">
                  ${data.paymentStatus}
                </span>
              </div>
            </div>
          </div>

          <!-- Order Summary Meta Grid -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; padding: 20px 0; border-bottom: 1px solid #e5e7eb;">
            <div>
              <div style="font-size: 10px; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;">
                Billed & Shipped To
              </div>
              <div style="font-size: 14px; font-weight: 700; color: #111827;">
                ${data.customerName}
              </div>
              <div style="font-size: 12px; color: #4b5563; margin-top: 3px; line-height: 1.5;">
                ${data.shippingAddress}
              </div>
              ${data.customerEmail ? `<div style="font-size: 11px; color: #6b7280; margin-top: 4px;">Email: ${data.customerEmail}</div>` : ''}
              ${data.customerPhone ? `<div style="font-size: 11px; color: #6b7280; margin-top: 1px;">Phone: ${data.customerPhone}</div>` : ''}
            </div>

            <div style="text-align: right;">
              <div style="font-size: 10px; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;">
                Order Information
              </div>
              <div style="font-size: 12px; color: #374151;">
                <strong>Order Date:</strong> ${data.date}
              </div>
              ${data.orderStatus ? `<div style="font-size: 12px; color: #374151; margin-top: 3px;"><strong>Fulfillment:</strong> ${data.orderStatus}</div>` : ''}
              ${
                isShipped && data.courier
                  ? `<div style="font-size: 12px; color: #374151; margin-top: 3px;"><strong>Courier:</strong> ${data.courier}</div>`
                  : ''
              }
              ${
                isShipped && data.trackingNumber
                  ? `<div style="font-size: 12px; color: #374151; margin-top: 3px; font-family: monospace;"><strong>Tracking:</strong> ${data.trackingNumber}</div>`
                  : ''
              }
            </div>
          </div>

          <!-- Items Table -->
          <div style="margin-top: 20px;">
            <table>
              <thead>
                <tr>
                  <th style="text-align: left;">Item Description</th>
                  <th style="text-align: center; width: 70px;">Qty</th>
                  <th style="text-align: right; width: 120px;">Unit Price</th>
                  <th style="text-align: right; width: 120px;">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${itemsRows}
              </tbody>
            </table>
          </div>

          <!-- Cost Breakdown Totals -->
          <div style="display: flex; justify-content: flex-end; margin-top: 20px;">
            <div style="width: 280px; font-size: 12px;">
              <div style="display: flex; justify-content: space-between; padding: 5px 0; color: #4b5563;">
                <span>Subtotal</span>
                <span style="font-weight: 600; color: #111827; font-variant-numeric: tabular-nums;">
                  ${currency}${data.subtotal.toLocaleString()}
                </span>
              </div>

              <div style="display: flex; justify-content: space-between; padding: 5px 0; color: #4b5563;">
                <span>Shipping Fee</span>
                <span style="font-weight: 600; color: #111827;">
                  ${data.shipping === 0 ? 'FREE' : `${currency}${data.shipping.toLocaleString()}`}
                </span>
              </div>

              ${
                data.discount && data.discount > 0
                  ? `
                <div style="display: flex; justify-content: space-between; padding: 5px 0; color: #059669;">
                  <span>Discount</span>
                  <span style="font-weight: 600;">-${currency}${data.discount.toLocaleString()}</span>
                </div>
              `
                  : ''
              }

              <div style="display: flex; justify-content: space-between; padding: 10px 0; margin-top: 6px; border-top: 2px solid #111827; font-size: 15px; font-weight: 800; color: #111827;">
                <span>Total Amount</span>
                <span style="font-variant-numeric: tabular-nums;">
                  ${currency}${data.total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};

export const printInvoice = (data: InvoiceData) => {
  // Use a dedicated hidden printable iframe to prevent popup blockers and guarantee isolation
  let printFrame = document.getElementById('invoice-print-frame') as HTMLIFrameElement | null;
  if (!printFrame) {
    printFrame = document.createElement('iframe');
    printFrame.id = 'invoice-print-frame';
    printFrame.style.position = 'fixed';
    printFrame.style.right = '0';
    printFrame.style.bottom = '0';
    printFrame.style.width = '0';
    printFrame.style.height = '0';
    printFrame.style.border = 'none';
    printFrame.style.visibility = 'hidden';
    document.body.appendChild(printFrame);
  }

  const frameDoc = printFrame.contentWindow?.document;
  if (!frameDoc) return;

  frameDoc.open();
  frameDoc.write(generateInvoiceHtml(data));
  frameDoc.close();

  // Allow styles and logo image to load then trigger native print/PDF preview
  setTimeout(() => {
    printFrame?.contentWindow?.focus();
    printFrame?.contentWindow?.print();
  }, 200);
};
