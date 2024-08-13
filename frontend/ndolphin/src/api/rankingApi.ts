import { request } from "./axiosConfig";

const rankingApi = {
  relaylist: (period: string) => {
    return request.get(`/api/v1/main/relay?relayPeriod=${period}`);
  },

  iflist: (period: string) => {
    return request.get(`/api/v1/main/if?ifPeriod=${period}`);
  },

  nlist: () => {
    return request.get(`/api/v1/main/bestN`);
  },

  balancelist: (period: string) => {
    return request.get(`/api/v1/main/balance?balancePeriod=${period}`);
  },
}

export default rankingApi;