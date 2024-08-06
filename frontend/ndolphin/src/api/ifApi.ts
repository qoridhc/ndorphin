import { request } from "./axiosConfig";

const ifApi = {
  create: (formData: FormData) => {
    request.post(
      `/api/v1/boards`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default ifApi;