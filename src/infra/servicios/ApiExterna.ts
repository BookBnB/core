import axios, { AxiosResponse } from "axios";
import { HttpError } from "routing-controllers";

export default class ApiExterna {
    async post(ruta: string, params: any = {}) {
        return ApiExterna.ejecutar(() => {
            return axios.post(ruta, params)
        })
    }

    async put(ruta: string, params: any) {
        return ApiExterna.ejecutar(() => {
            return axios.put(ruta, params)
        })
    }

    private static async ejecutar(callback: () => Promise<AxiosResponse>) {
        try {
            return await callback()
        } catch (e) {
            throw new HttpError(e.response.status, e.response?.data.message)
        }
    }
}
