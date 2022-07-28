import * as subscribeService from "./subscribe_service";
import * as emailService from "./email_service";
import {requestCurrentRate} from "./rate_resource";

const CURRENCY_CODE = "BTC";

export async function getCurrentBtcRate() {
    return await requestCurrentRate("UAH");
}


export function subscribeBtcRate(email: string) {
    subscribeService.addEmail(CURRENCY_CODE, email);
}


export function initLoadEmailForBtcRate() {
    subscribeService.initLoadEmails(CURRENCY_CODE);
}


export function sendBtcRateEmails() {
    const mailSubject = CURRENCY_CODE + " rate";
    const actualEmails: Set<string> | undefined = subscribeService.getActualEmails(CURRENCY_CODE);
    if (actualEmails === undefined) {
        return;
    }
    prepareBtcRateMessage().then(rate => {
        actualEmails.forEach(email  => {
            emailService.sendEmail(mailSubject, rate, email);
        });
    })
}


async function prepareBtcRateMessage() {
    const rate = await getCurrentBtcRate()
    return "BTC rate for today is " + rate;
}
