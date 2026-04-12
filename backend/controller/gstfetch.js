import axios from "axios";
import dotenv from 'dotenv'

dotenv.config()

export const fetchGST = async (req, res) => {
  try {
    const { gstin } = req.params;

    // STEP 1: Get Token
    const tokenRes = await axios.post(
      "https://api-sandbox.cleartax.com/integration/v1/authz/token",
      {},
      {
        headers: {
          "X-Clear-Client-Secret": process.env.CLEARTAX_SECRET
        }
      }
    );

    const token = tokenRes.data.access_token;

    // STEP 2: Fetch GST Details
    const gstRes = await axios.get(
      `https://api-sandbox.cleartax.com/integration/gst/v1/taxpayers/${gstin}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Clear-Client-Secret": process.env.CLEARTAX_SECRET
        }
      }
    );

    res.json(gstRes.data);

  } catch (error) {
    console.error("GST ERROR:", error.response?.data || error.message);
    res.status(500).json({ message: "GST fetch failed" });
  }
};

export default fetchGST;