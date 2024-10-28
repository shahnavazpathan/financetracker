import nodemailer from "nodemailer";
import express from "express";

const route = express.Router();

const mailRoute = async (req, res) => {
  try {
    let { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(500).json({ message: "All fields are required!" });
    }
    name = name.trim();
    email = email.trim();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(email)) {
      return res
        .status(400)
        .json({ message: "Please enter valid email address!" });
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASS,
      },
      port: 465,
    });

    const mailOptionsToGetMail = {
      from: process.env.EMAIL_ADDRESS,
      to: process.env.PERSONAL_MAIL_ADDRESS,
      subject: "mail from visitor of finance tracker",
      text: message,
    };

    await transporter.sendMail(mailOptionsToGetMail);

    

    const mailOptionsToSendMail = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: "Thank You for Reaching Out to FinanceTracker!",
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank You for Contacting Us!</title>
          <style>
              body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
              .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
              .header { background-color: #4CAF50; color: white; padding: 10px; border-radius: 8px 8px 0 0; text-align: center; }
              .content { padding: 20px; color: #333; line-height: 1.6; }
              .content p { margin: 0 0 15px; }
              .footer { text-align: center; font-size: 12px; color: #777; margin-top: 20px; }
              .btn { display: inline-block; background-color: #4CAF50; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; margin-top: 10px; }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h2>Thank You for Reaching Out to FinanceTracker!</h2>
              </div>
              <div class="content">
                  <p>Hi ${name},</p>
                  <p>Thank you for getting in touch through FinanceTracker! We’ve received your message and are glad to hear from you.</p>
                  <p>We’re committed to making financial tracking easy and efficient. If you have any questions or need assistance, feel free to reach out anytime.</p>
                  <p>If you’re interested in building a similar website or have any other project ideas, I’d be happy to help bring your vision to life.</p>
                  <a href="mailto:${process.env.PERSONAL_MAIL_ADDRESS}" class="btn">Contact Me</a>
              </div>
              <div class="footer">
                  <p>FinanceTracker Team &copy; 2024. All rights reserved.</p>
              </div>
          </div>
      </body>
      </html>`
      
    }
    await transporter.sendMail(mailOptionsToSendMail);
    return res.status(200).json({ message: "Message received successfully!" });

  } catch (error) {
    console.log(error);
    
    return res.status(500).json({ message: "Internal server error" });
  }
}

route.post("/sendmessage",mailRoute);
export default route;
