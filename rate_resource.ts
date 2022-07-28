import axios from "axios";

export async function requestCurrentRate(target: string) {
    const resourceLink = 'https://api.coinstats.app/public/v1/coins/bitcoin?currency=' + target;
    const config = {
        method: 'get',
        url: resourceLink
    };

    const resultResponse = await axios.get(config.url, config)
    return resultResponse.data.coin.price.toString()
}

