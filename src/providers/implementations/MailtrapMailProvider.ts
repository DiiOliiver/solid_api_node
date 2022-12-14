import { IMailProvider, IMessage } from '../IMailProvider'
import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer';
import { MailOptions } from 'nodemailer/lib/json-transport';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export class MailtrapMailProvider implements IMailProvider {
    private transporter: Mail;
    constructor() {
        const transport: SMTPTransport.Options = {
            host: process.env.MAIL_HOST,
            port: Number(process.env.MAIL_PORT),
            auth: {
                user: process.env.MAIL_AUTH_USER,
                pass: process.env.MAIL_AUTH_PASSWORD
            }
        }
        this.transporter = nodemailer.createTransport(transport)
    }

    async sendMail(message: IMessage): Promise<void> {
        const sendMessage: MailOptions = {
            to: {
                name: message.to.name,
                address: message.to.email
            },
            from: {
                name: message.from.name,
                address: message.from.email
            },
            subject: message.subject,
            html: message.body
        }

        this.transporter.sendMail(sendMessage)
    }
}
