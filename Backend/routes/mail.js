import express from "express";

const router = express.Router();
import { sendMail } from "../controllers/mailService.js";

router.post("/send-email", async (req, res) => {
  const { email } = req.body;

  const welcomeMessage = `
Welcome to Our Bookstore!

Dear Book Lover,

Thank you for signing up and joining our community of avid readers! We are thrilled to have you on board, and we can’t wait to embark on this exciting literary journey with you. Whether you are an occasional reader or a passionate bibliophile, our bookstore is the perfect place to discover and enjoy great reads!

We believe that reading is not just a hobby, but an adventure that opens doors to new worlds, ideas, and perspectives. Our mission is to make that adventure accessible to you with just a few clicks!

If you have any questions, feel free to contact us at any time. Stay tuned for more exciting updates, events, and promotions that will make your reading experience even more rewarding!

Warm regards,
The BookStore Team

P.S. Don't forget to check out our latest collection of books!
`;

  try {
    await sendMail(email, "Welcome to Our Bookstore!", welcomeMessage);
    res.status(200).json({ message: "Email sent successfully", status: true });
  } catch (error) {
    console.error("Failed to send email", error);
    res.status(500).json({ message: "Failed to send email", status: false });
  }
});

export default router;
