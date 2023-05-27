import { fetchGet } from '@/utils/helpers/xFetch.js';

export class BaconIpsum {
    static async getBaconIpsumText () {
        try {
            const response = await fetchGet('https://baconipsum.com/api/?type=all-meat&sentences=1&start-with-lorem=1', {});
            return response[0];
        } catch (e) {
            console.error(e.message);
        }
    }
}
