export default function toDate(dateString: any) {
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	]
	const date = new Date(new Date(dateString).getTime())
	return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}
