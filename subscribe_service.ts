import fs from "fs/promises";

const emailsForCurrency: Map<string, Set<string>> = new Map<string, Set<string>>();

export async function initLoadEmails(currencyCode: string) {
    const filePath = getFilePathByCurrencyCode(currencyCode);
    const fileContents: string = await fs.readFile(filePath, "utf-8");
    const emailsString: Array<string> = fileContents.split("\n")

    const emails: Array<string> = emailsString
        .filter(email => email !== "");

    emailsForCurrency.set(currencyCode, new Set<string>(emails));
}


export async function addEmail(currencyCode: string, email: string) {
    const emails: any = emailsForCurrency.get(currencyCode)

    if (emails === undefined) {
        emailsForCurrency.set(currencyCode, new Set());
    }

    if (emails.has(email)) {
        throw new Error("Email is already exists");
    } else if (email === undefined) {
        throw new Error("Email is not specified");
    }

    emails.add(email);
    const dataToAppend: string = email + "\n";
    const currencyFilePath = getFilePathByCurrencyCode(currencyCode);
    await fs.appendFile(currencyFilePath, dataToAppend);
}


export function getActualEmails(currencyCode: string): Set<string> | undefined {
    return emailsForCurrency.get(currencyCode);
}


function getFilePathByCurrencyCode(currencyCode: string) {
    return "./emails/" + currencyCode + "_emails.txt";
}
