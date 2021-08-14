import { environment } from './environtment'
import axios from 'axios'

export class BaseService<T> {
	protected url: string

	constructor(url: string) {
		this.url = url
	}

	async fetch(params?: string) {
		const { data } = await axios.get<T[]>(`${environment.api}${this.url}`)
		return data
	}

	async fetchOne(id: number, params?: string) {
		const { data } = await axios.get<T[]>(`${environment.api}${this.url}/${id}${params !== undefined ? '?' + params : ''}`)
		return data
	}

	async fetchWithParams(params: string) {
		const { data } = await axios.get<T[]>(this.resolveURL(params))
		return data
	}

	protected resolveURL(params?: string) {
		return `${environment.api}${this.url}?${params}`
	}
}

export type FreeObject = {
	[key: string]: any
}
