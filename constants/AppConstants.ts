export const districts = ['I', 'II', 'III', 'IV', 'V']

export function years() {
	const tempYear: Array<number> = []
	for (let year = 2019; year <= 2100; year++) {
		tempYear.push(year)
	}
	return tempYear
}

export const LocationChoices = ['Province', 'Municpality', 'Barangay']

export function stringifyLocation(location: any) {
	if (location.barangay !== null && location.municpality !== null) {
		return `${location.barangay || ''} ${location.municpality || ''}, Iloilo Philippines`
	}
	if (location.municpality === null && location.barangay === null) {
		return 'Iloilo Philippines'
	}
	if (location.barangay === null && location.municpality !== null) {
		return `${location.municpality || ''}, Iloilo Philippines`
	}
	return 'Iloilo'
}

export function paramifyLocation(location: any) {
	return `barangay=${location.barangay}&municpality=${location.municpality}&year=${location.year}`
}
