import fs from "fs";

export const generateHTML = (invoice) => {
  let template = fs.readFileSync("template/invoice.html", "utf-8");

  // 🔥 SAFE ACCESS (because your totals are inside items[0])
  const summary = invoice.items?.[0] || {};

  // ✅ ITEMS TABLE (based on your schema)
  const itemsHTML = invoice.items.map((item, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${item.name || "-"}</td>
      <td>${item.hsn || "-"}</td>
      <td>${item.rate || 0}</td>
      <td>${item.quantity || 1}</td>
      <td>${item.subTotal || 0}</td>
      <td>${(item.cgst || 0) + (item.sgst || 0)}</td>
      <td>${item.totalAmount || 0}</td>
    </tr>
  `).join("");

  // ✅ FORMAT DATE
  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("en-IN") : "-";

  // ✅ GST TOTAL
  const gstTotal = (summary.cgst || 0) + (summary.sgst || 0) + (summary.igst || 0);

  // ✅ SIMPLE AMOUNT IN WORDS (basic)
  const amountInWords = `${summary.totalAmount || 0} Rupees Only`;

  // 🔥 REPLACE ALL (global replace)
  const replaceAll = (str, key, value) =>
    str.replace(new RegExp(key, "g"), value || "-");

  template = replaceAll(template, "{{companyName}}", invoice.company?.name);
  template = replaceAll(template, "{{companyGST}}", invoice.company?.gst);
  template = replaceAll(template, "{{companyAddress}}", invoice.company?.address);
  template = replaceAll(template, "{{companyPhone}}", invoice.company?.phone);
  template = replaceAll(template, "{{companyEmail}}", invoice.company?.email);
  template = replaceAll(template, "{{companyLogo}}", invoice.company?.
imageUrl);

  template = replaceAll(template, "{{invoiceNumber}}", invoice.invoiceNumber);
  template = replaceAll(template, "{{invoiceDate}}", formatDate(invoice.date));
  template = replaceAll(template, "{{dueDate}}", formatDate(invoice.date));

  template = replaceAll(template, "{{customerName}}", invoice.customer?.name);
  template = replaceAll(template, "{{customerCompany}}", invoice.customer?.company);
  template = replaceAll(template, "{{customerGST}}", invoice.customer?.gst);
  template = replaceAll(template, "{{customerPhone}}", invoice.customer?.phone);

  template = replaceAll(template, "{{billingAddress}}", invoice.customer?.address);
  template = replaceAll(template, "{{shippingAddress}}", invoice.customer?.address);

  template = replaceAll(template, "{{placeOfSupply}}", invoice.placeOfSupply);

  template = replaceAll(template, "{{items}}", itemsHTML);

  template = replaceAll(template, "{{subTotal}}", invoice.subTotal);
  template = replaceAll(template, "{{gstTotal}}", invoice.cgst);
  template = replaceAll(template, "{{billAmount}}", invoice.totalAmount);
  template = replaceAll(template, "{{amountInWords}}", amountInWords);

  template = replaceAll(template, "{{bankName}}", invoice.company?.bankName);
  template = replaceAll(template, "{{accountNumber}}", invoice.company?.accountNumber);
  template = replaceAll(template, "{{ifsc}}", invoice.company?.ifsc);
  template = replaceAll(template, "{{branch}}", invoice.company?.branch);

  return template;
};