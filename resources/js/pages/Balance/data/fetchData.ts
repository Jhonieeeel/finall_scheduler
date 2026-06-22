import axios from 'axios';

export async function fetchBalances(
    month: string,
    year: string,
    user_id: number,
) {
    const res = await axios.get(`/balances/user/${user_id}/data`, {
        params: { month, year },
    });
    return res.data;
}
