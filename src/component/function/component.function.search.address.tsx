export async function componentFunctionSearchAddress(address: string) {
    const res = await fetch(
        `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(address)}`,
        {
            headers: {
                Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
            },
        }
    );

    if (!res.ok) {
        const err = await res.text();
        console.error('Kakao API error:', err);
        throw new Error(`Kakao API error: ${res.status}`);
    }

    const data = await res.json();

    if (data.documents && data.documents.length > 0) {
        const { x, y } = data.documents[0];
        return {
            lat: parseFloat(y),
            lng: parseFloat(x),
        };
    }

    return null;
}
