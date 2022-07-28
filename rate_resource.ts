import axios from "axios";

// @ts-ignore
export async function requestCurrentRate(origin: string, target: string) {
    const resourceLink = "/v1/exchangerate/" + origin + "/" + target;
    const config = {
        method: 'get',
        url: 'https://api.coinstats.app/public/v1/coins/bitcoin?currency=' + target
    };

    const resultResponse = await axios.get(config.url, config)
    return resultResponse.data.coin.price.toString()
}

