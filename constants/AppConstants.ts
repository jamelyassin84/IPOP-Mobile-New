export const districts = ['I', 'II', 'III', 'IV', 'V']

export function years() {
	const tempYear: Array<number> = []
	for (let year = 2019; year <= 2100; year++) {
		tempYear.push(year)
	}
	return tempYear
}

export const LocationChoices = ['Province', 'Municipality', 'Barangay']

export function stringifyLocation(location: any) {
	if (location.barangay !== null && location.municipality !== null) {
		return `${location.barangay || ''} ${location.municipality || ''}, Iloilo Philippines`
	}
	if (location.municipality === null && location.barangay === null) {
		return 'Iloilo Philippines'
	}
	if (location.barangay === null && location.municipality !== null) {
		return `${location.municipality || ''}, Iloilo Philippines`
	}
	return 'Iloilo'
}

export function paramifyLocation(location: any) {
	return `barangay=${location.barangay}&municipality=${location.municipality}&year=${location.year}`
}
