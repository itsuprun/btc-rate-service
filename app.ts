import express from "express";
import bodyParser from "body-parser";

import * as btcRateService from "./btc_rate_service";

export const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/rate", async (req: any, res: any) => {
    const rate = await btcRateService.getCurrentBtcRate()
    res.setHeader('content-type', 'application/json');
    res.status(200)
    res.send(rate)
});


app.post("/subscribe", async (req: any, res: any) => {
    const emailToAdd: string = req.body.email;
    const result = await tryAddEmail(emailToAdd)
    res.setHeader('content-type', 'application/json');

    if (!result.success) {
        res.status(409)
        res.send(JSON.stringify(result));
        return;
    }

    res.status(200);
    res.send(JSON.stringify(result));
});


app.post("/sendEmails", (req: any, res: any) => {
    btcRateService.sendBtcRateEmails();
    res.setHeader('content-type', 'application/json');
    res.status(200)
    res.send({"success": true})
});


app.listen(3000, async () => {
    console.log(`Example app listening on port ${3000}`)
    await btcRateService.initLoadEmailForBtcRate();
})


async function tryAddEmail(email: string) {
    try {
        await btcRateService.subscribeBtcRate(email);
        return {"success": true, "email": email, "message": "Successfully added"};
    } catch (error: any) {
        return {"success": false, "message": error.message};
    }
}
