import puppeteer from "puppeteer";
import { generateHTML } from "./generateHTML.js";

export const generatePDF = async (invoice, res) => {
    const html = generateHTML(invoice);

    const browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox", "--disable-setuid-sandbox"] // important for deployment
    });

    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: "domcontentloaded" });

    const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true
    });

    await browser.close();

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename=invoice-${invoice.invoiceNumber}.pdf`,
    });

    res.send(pdfBuffer);
};