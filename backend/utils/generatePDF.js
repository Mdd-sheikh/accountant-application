import puppeteer from "puppeteer";
import { generateHTML } from "./generateHTML.js";

export const generatePDF = async (invoice, res) => {
    try {
        const html = generateHTML(invoice);

        const browser = await puppeteer.launch({
            headless: "new",
            args: ["--no-sandbox", "--disable-setuid-sandbox"]
        });

        const page = await browser.newPage();

        await page.setContent(html, { waitUntil: "networkidle0" });

        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true
        });

        await browser.close();

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `inline; filename=invoice-${invoice.invoiceNumber || "file"}.pdf`,
        });

        res.send(pdfBuffer);

    } catch (error) {
        console.error("PDF GENERATE ERROR 👉", error);

        res.status(500).json({
            message: "PDF generation failed",
            error: error.message
        });
    }
};