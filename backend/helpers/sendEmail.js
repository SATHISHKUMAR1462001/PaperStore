import nodemailer from 'nodemailer';

export default  async (options) => {
    const transporter = nodemailer.createTransport({
       
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    }); 
    const mailOptions = {
        from: process.env.SMTP_USER,
        to: options.email,
        subject: options.subject,
        text: options.message,
        icon: process.env.SMTP_ICON,
        address: options.address,
        html: options.htmlMeessage,
       
       

    };  
    await transporter.sendMail(mailOptions);
};  
