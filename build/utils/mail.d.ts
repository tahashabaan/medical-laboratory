import { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
export interface Imail {
    to: string | string[];
    subject: string;
    html: string;
}
declare class MailTransporter {
    transporter: Transporter<SMTPTransport.SentMessageInfo>;
    constructor();
    verifyTransporter(): void;
    sendMail(options: Imail): Promise<void>;
}
export declare const mailTransporter: MailTransporter;
export {};
