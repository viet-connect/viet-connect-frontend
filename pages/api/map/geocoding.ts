class GeoCoding {
    private url = 'https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode'

    private header = {
        'Content-Type': 'application/json',
        'X-NCP-APIGW-API-KEY-ID': process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
        'X-NCP-APIGW-API-KEY': process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET,
    }

    async getGeoLocation(address) {
        try {
            const url = `${this.url}?query=${address}`;
            const data = await fetch(url, { headers: this.header });
            return data.json();
        } catch (e) {
            throw new Error(e.message);
        }
    }
}

export const geoCoding = new GeoCoding();
