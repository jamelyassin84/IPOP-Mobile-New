export const AboutNavs: AboutNavType[] = [
	{
		title: 'Mandate',
		route: 'Mandate',
		icon: 'hand-right',
		color: '#F1CCB0',
	},
	{
		title: 'Mission/Vision',
		route: 'MissionVIsion',
		icon: 'clock-check',
		color: '#02ADA3',
	},
	{
		title: 'Core Values',
		route: 'CoreValues',
		icon: 'shield-lock',
		color: '#1049A2',
	},
	{
		title: 'Goals',
		route: 'Goals',
		icon: 'handball',
		color: '#3AC48C',
	},
	{
		title: 'Org-Structure',
		route: 'OrgStructure',
		icon: 'account-network',
		color: '#FE6017',
	},
	{
		title: 'Directory',
		route: 'Directory',
		icon: 'account-group-outline',
		color: '#23BEDD',
	},
	{
		title: 'Services',
		route: 'Services',
		icon: 'room-service',
		color: '#AF2B1E',
	},
	{
		title: 'Awards',
		route: 'Awards',
		icon: 'trophy-award',
		color: '#FFCF10',
	},
	{
		title: 'Contact Us',
		route: 'ContactUs',
		icon: 'cellphone-iphone',
		color: 'gray',
	},
]

export type AboutNavType = {
	title: string
	route: string
	icon: any
	color: string
}
