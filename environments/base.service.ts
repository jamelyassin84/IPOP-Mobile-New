import { environment } from './environtment'
import axios from 'axios'

export class BaseService<T> {
	protected url: string

	constructor(url: string) {
		this.url = url
	}

	async fetch(params?: string) {
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
