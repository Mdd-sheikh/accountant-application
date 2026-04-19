import fs from 'fs'
// utils/generateHTML.js

export const generateHTML = (invoice) => {
  let template = fs.readFileSync("templates/invoice.html", "utf-8");

  const itemsHTML = invoice.items.map((item, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>${item.price}</td>
      <td>${item.gstRate || 0}%</td>
      <td>${item.total}</td>
    </tr>
  `).join("");

  return template
    .replace("{{companyName}}", invoice.company.name)
    .replace("{{companyGST}}", invoice.company.gst)
    .replace("{{companyAddress}}", invoice.company.address)
    .replace("{{invoiceNumber}}", invoice.invoiceNumber)
    .replace("{{date}}", new Date(invoice.createdAt).toLocaleDateString())
    .replace("{{customerName}}", invoice.customer.name)
    .replace("{{customerAddress}}", invoice.customer.address)
    .replace("{{customerPhone}}", invoice.customer.phone)
    .replace("{{items}}", itemsHTML)
    .replace("{{subTotal}}", invoice.subTotal)
    .replace("{{cgst}}", invoice.cgst)
    .replace("{{sgst}}", invoice.sgst)
    .replace("{{total}}", invoice.totalAmount)
    .replace("{{signature}}", invoice.signature?.imageUrl || "");
};