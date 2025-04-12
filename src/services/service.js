const nodemailer = require('nodemailer');

const sendMail = async (name, email, message) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp-relay.brevo.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.USER_ID,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOption = {
        from: email,
        to: process.env.EMAIL_ADDRESS,
        subject: `Nouveau message de ${name}`,
        text: message
    }

    try {
        await transporter.sendMail(mailOption);
        return true;
    } catch (error) {
        console.log('Error on sending email: ', error);
        return false;
    }
}

module.exports = { sendMail };