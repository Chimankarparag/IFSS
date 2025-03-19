import nodemailer from 'nodemailer';

export function generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendEmail(email: string, otp: string) {
    try {
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 587,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS,
            },
        });

        const mailOptions = {
            from: `"Your App Name" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Your Verification Code',
            text: `Your verification code is: ${otp}`,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully:", info);

        return { success: true, messageId: info.messageId };
    } catch (error: any) {
        console.error("❌ Error sending email:", error);
        return { success: false, error: error.message };
    }
}

