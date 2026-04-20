import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import { generateHTML } from "./generateHTML.js";

export const generatePDF = async (invoice, res) => {
  try {
    const html = generateHTML(invoice);

    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(), // 🔥 KEY FIX
      headless: chromium.headless,
    });

    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=invoice-${invoice.invoiceNumber || "file"}.pdf`,
    });

    res.end(pdfBuffer);

  } catch (error) {
    console.error("PDF ERROR 👉", error);

    res.status(500).json({
      message: "PDF generation failed",
      error: error.message,
    });
  }
};