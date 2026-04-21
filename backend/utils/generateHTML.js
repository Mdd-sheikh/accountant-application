import fs from "fs";

export const generateHTML = (invoice) => {
  let template = fs.readFileSync("template/invoice.html", "utf-8");

  // ─────────────────────────────────────────────────────────────
  // DATA STRUCTURE:
  //   invoice.items[0..n-2]  → actual product rows
  //   invoice.items[n-1]     → summary object (subTotal, cgst, sgst, igst, totalAmount, Receipt, Remark, date)
  // ─────────────────────────────────────────────────────────────

  const allItems   = invoice.items || [];
  const summary    = allItems[allItems.length - 1] || {};   // last element = summary
  const productRows = allItems.slice(0, allItems.length - 1); // all except last = real items

  // ── FORMAT DATE ──────────────────────────────────────────────
  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit", month: "short", year: "numeric"
    }) : "-";

  // ── GST TOTAL ─────────────────────────────────────────────────
  const gstTotal = (summary.cgst || 0) + (summary.sgst || 0) + (summary.igst || 0);

  // ── AMOUNT IN WORDS ───────────────────────────────────────────
  const amountInWords = numberToWords(summary.totalAmount || 0);

  // ── TOTAL ITEMS / QTY ─────────────────────────────────────────
  const totalQty = productRows.reduce((acc, item) => acc + (item.quantity || 0), 0);
  const totalItemsQty = `${productRows.length} / ${totalQty}`;

  // ── ITEMS TABLE HTML ──────────────────────────────────────────
  const itemsHTML = productRows.map((item, index) => {
    const taxable     = (item.price || 0) * (item.quantity || 1);
    const gstAmount   = ((item.gstRate || 0) / 100) * taxable;
    const itemTotal   = item.total || (taxable + gstAmount);

    return `
      <tr>
        <td>${index + 1}</td>
        <td>
          <strong>${item.name || "-"}</strong>
          ${item.hsnCode ? `<br><small style="color:#888">HSN: ${item.hsnCode}</small>` : ""}
        </td>
        <td>${item.hsnCode || "-"}</td>
        <td>₹${(item.price || 0).toFixed(2)}</td>
        <td>${item.quantity || 1}</td>
        <td>₹${taxable.toFixed(2)}</td>
        <td>${item.gstRate || 0}%${gstAmount > 0 ? ` (₹${gstAmount.toFixed(2)})` : ""}</td>
        <td>₹${Number(itemTotal).toFixed(2)}</td>
      </tr>
    `;
  }).join("");

  // ── REPLACE HELPER ────────────────────────────────────────────
  const replaceAll = (str, key, value) =>
    str.replace(new RegExp(key.replace(/[{}]/g, "\\$&"), "g"), value ?? "-");

  // ── COMPANY ───────────────────────────────────────────────────
  template = replaceAll(template, "{{companyName}}",    invoice.company?.name);
  template = replaceAll(template, "{{companyGST}}",     invoice.company?.gst);
  template = replaceAll(template, "{{companyAddress}}", invoice.company?.address);
  template = replaceAll(template, "{{companyPhone}}",   invoice.company?.companyMobileNo);
  template = replaceAll(template, "{{companyEmail}}",   invoice.company?.companyEmail);
  template = replaceAll(template, "{{companyLogo}}",    invoice.company?.companyLogo || "");

  // ── INVOICE META ──────────────────────────────────────────────
  template = replaceAll(template, "{{invoiceNumber}}", invoice.invoiceNumber);
  template = replaceAll(template, "{{invoiceDate}}",   formatDate(summary.date || invoice.createdAt));
  template = replaceAll(template, "{{dueDate}}",       formatDate(summary.date || invoice.createdAt));

  // ── CUSTOMER ──────────────────────────────────────────────────
  template = replaceAll(template, "{{customerName}}",    invoice.customer?.name);
  template = replaceAll(template, "{{customerCompany}}", invoice.customer?.company || "-");
  template = replaceAll(template, "{{customerGST}}",     invoice.customer?.customerGst);
  template = replaceAll(template, "{{customerPhone}}",   invoice.customer?.phone);
  template = replaceAll(template, "{{customerEmail}}",   invoice.customer?.customerEmail);
  template = replaceAll(template, "{{billingAddress}}",  invoice.customer?.address);
  template = replaceAll(template, "{{shippingAddress}}", invoice.customer?.address);

  // ── SUPPLY & ITEMS ────────────────────────────────────────────
  template = replaceAll(template, "{{placeOfSupply}}",  invoice.placeOfSupply);
  template = replaceAll(template, "{{items}}",          itemsHTML);
  template = replaceAll(template, "{{totalItemsQty}}",  totalItemsQty);

  // ── TOTALS ────────────────────────────────────────────────────
  template = replaceAll(template, "{{subTotal}}",       Number(summary.subTotal   || 0).toFixed(2));
  template = replaceAll(template, "{{gstTotal}}",       Number(gstTotal).toFixed(2));
  template = replaceAll(template, "{{billAmount}}",     Number(summary.totalAmount || 0).toFixed(2));
  template = replaceAll(template, "{{amountInWords}}",  amountInWords);

  // ── BANK ──────────────────────────────────────────────────────
  template = replaceAll(template, "{{bankName}}",      invoice.company?.bankName);
  template = replaceAll(template, "{{accountNumber}}", invoice.company?.accountNumber);
  template = replaceAll(template, "{{ifsc}}",          invoice.company?.ifsc);
  template = replaceAll(template, "{{branch}}",        invoice.company?.branch);

  // ── SIGNATURE ─────────────────────────────────────────────────
  template = replaceAll(template, "{{signatureUrl}}", invoice.signature?.imageUrl || "");

  return template;
};

// ════════════════════════════════════════════════════════════════
// AMOUNT IN WORDS  (handles up to crores)
// ════════════════════════════════════════════════════════════════
function numberToWords(amount) {
  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven",
    "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen",
    "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty",
    "Sixty", "Seventy", "Eighty", "Ninety"];

  const toWords = (n) => {
    if (n === 0) return "";
    if (n < 20)  return ones[n] + " ";
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "") + " ";
    if (n < 1000) return ones[Math.floor(n / 100)] + " Hundred " + toWords(n % 100);
    if (n < 100000)  return toWords(Math.floor(n / 1000))  + "Thousand " + toWords(n % 1000);
    if (n < 10000000) return toWords(Math.floor(n / 100000)) + "Lakh " + toWords(n % 100000);
    return toWords(Math.floor(n / 10000000)) + "Crore " + toWords(n % 10000000);
  };

  const rupees = Math.floor(amount);
  const paise  = Math.round((amount - rupees) * 100);

  let result = "INR " + (toWords(rupees).trim() || "Zero") + " Rupees";
  if (paise > 0) result += " and " + toWords(paise).trim() + " Paise";
  result += " Only";

  return result;
}