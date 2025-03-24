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

        const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    font-family: 'Arial', sans-serif;
                    background-color: #0F0F0F;
                    color: #FFFFFF;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }
                .header {
                    background-color: #0F0F0F;
                    padding: 20px;
                    text-align: center;
                    border-bottom: 2px solid #333333;
                }
                .logo {
                    font-size: 28px;
                    font-weight: bold;
                    color: #FFFFFF;
                }
                .content {
                    background-color: #181818;
                    padding: 30px;
                    border-radius: 8px;
                    margin-top: 20px;
                }
                .footer {
                    text-align: center;
                    padding: 20px;
                    color: #999999;
                    font-size: 12px;
                }
                .otp-container {
                    margin: 25px 0;
                    text-align: center;
                }
                .otp-code {
                    font-size: 32px;
                    letter-spacing: 5px;
                    font-weight: bold;
                    color: #32CD32;
                    padding: 15px;
                    background-color: #232323;
                    border-radius: 8px;
                    display: inline-block;
                }
                .message {
                    line-height: 1.6;
                    margin-bottom: 20px;
                }
                .note {
                    color: #999999;
                    font-size: 12px;
                    margin-top: 20px;
                }
                .button {
                    display: inline-block;
                    background-color: #32CD32;
                    color: #FFFFFF;
                    text-decoration: none;
                    padding: 12px 30px;
                    border-radius: 4px;
                    font-weight: bold;
                    margin-top: 15px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <div class="logo">IFSS</div>
                </div>
                <div class="content">
                    <h2>Verification Code</h2>
                    <div class="message">
                        Hello,<br><br>
                        Thanks for using IFSS. Use the following verification code to complete your action:
                    </div>
                    <div class="otp-container">
                        <div class="otp-code">${otp}</div>
                    </div>
                    <div class="message">
                        This code will expire in 10 minutes. If you didn't request this code, please ignore this email.
                    </div>
                    <div class="note">
                        For security reasons, please do not share this code with anyone.
                    </div>
                </div>
                <div class="footer">
                    <p>&copy; ${new Date().getFullYear()} IFSS. All rights reserved.</p>
                    <p>This is an automated message, please do not reply.</p>
                </div>
            </div>
        </body>
        </html>
        `;

        const mailOptions = {
            from: `"IFSS" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'IFSS Verification Code',
            text: `Your verification code is: ${otp}`,
            html: htmlContent
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully:", info);

        return { success: true, messageId: info.messageId };
    } catch (error: any) {
        console.error("❌ Error sending email:", error);
        return { success: false, error: error.message };
    }
}

export async function sendCAEmail(email: string, caId: string, password: string) {
    try {
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 587,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS,
            },
        });

        const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    font-family: 'Arial', sans-serif;
                    background-color: #0F0F0F;
                    color: #FFFFFF;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }
                .header {
                    background-color: #0F0F0F;
                    padding: 20px;
                    text-align: center;
                    border-bottom: 2px solid #333333;
                }
                .logo {
                    font-size: 28px;
                    font-weight: bold;
                    color: #FFFFFF;
                }
                .content {
                    background-color: #181818;
                    padding: 30px;
                    border-radius: 8px;
                    margin-top: 20px;
                }
                .footer {
                    text-align: center;
                    padding: 20px;
                    color: #999999;
                    font-size: 12px;
                }
                .credentials-container {
                    margin: 25px 0;
                    background-color: #232323;
                    padding: 20px;
                    border-radius: 8px;
                    border-left: 4px solid #32CD32;
                }
                .credential-item {
                    margin: 10px 0;
                }
                .credential-label {
                    font-size: 12px;
                    color: #999999;
                    display: block;
                    margin-bottom: 5px;
                }
                .credential-value {
                    font-size: 16px;
                    font-weight: bold;
                    color: #FFFFFF;
                    padding: 8px;
                    background-color: #2A2A2A;
                    border-radius: 4px;
                }
                .message {
                    line-height: 1.6;
                    margin-bottom: 20px;
                }
                .highlight {
                    color: #32CD32;
                    font-weight: bold;
                }
                .button {
                    display: inline-block;
                    background-color: #32CD32;
                    color: #FFFFFF;
                    text-decoration: none;
                    padding: 12px 30px;
                    border-radius: 4px;
                    font-weight: bold;
                    margin-top: 15px;
                    text-align: center;
                }
                .note {
                    color: #999999;
                    font-size: 12px;
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <div class="logo">IFSS</div>
                </div>
                <div class="content">
                    <h2>Welcome to <span class="highlight">IFSS</span></h2>
                    <div class="message">
                        Congratulations! Your CA account has been successfully created. Here are your login credentials:
                    </div>
                    <div class="credentials-container">
                        <div class="credential-item">
                            <span class="credential-label">CA ID</span>
                            <div class="credential-value">${caId}</div>
                        </div>
                        <div class="credential-item">
                            <span class="credential-label">Password</span>
                            <div class="credential-value">${password}</div>
                        </div>
                    </div>
                    <div class="message">
                        Please use these credentials to log in to your CA portal. For security reasons, we recommend changing your password after your first login.
                    </div>
                    <a href="${process.env.WEBSITE_URL || '#'}" class="button">Login to Your Account</a>
                    <div class="note">
                        If you have any questions or need assistance, please contact our support team.
                    </div>
                </div>
                <div class="footer">
                    <p>&copy; ${new Date().getFullYear()} IFSS. All rights reserved.</p>
                    <p>This email contains confidential information, please do not forward it.</p>
                </div>
            </div>
        </body>
        </html>
        `;

        const mailOptions = {
            from: `"IFSS" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Congratulations! Your CA account has been created',
            text: `Your CA ID is: ${caId}\nYour password is: ${password}`,
            html: htmlContent
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully:", info);

        return { success: true, messageId: info.messageId };
    } catch (error: any) {
        console.error("❌ Error sending email:", error);
        return { success: false, error: error.message };
    }
}