import { createTransport, Transporter } from "nodemailer";

import config from "../configs/config";

class EmailService {
  public transporter: Transporter;
  constructor() {
    this.transporter = createTransport({
      service: "gmail",
      auth: {
        user: config.smtpEmail,
        pass: config.smtpPassword,
      },
    });
  }

  public async sendEmail(email: string): Promise<void> {
    const options = {
      from: "Max Dobrovolskyi",
      to: email,
      subject: "Message",
      text: "Test",
    };
    await this.transporter.sendMail(options);
  }
}

export const emailService = new EmailService();
