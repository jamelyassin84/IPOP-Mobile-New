export const MenuNavs: menuNavigation[] = [
	{
		title: 'Population',
		children: [
			{
				route: 'PopulationData',
				name: 'Population Data',
				icon: 'users',
				color: '#1B7FE9',
			},
		],
	},
	{
		title: 'Demographics',
		children: [
			{
				route: 'Births',
				name: 'Births',
				icon: 'user-plus',
				color: '#52CABA',
			},
			{
				route: 'Deaths',
				name: 'Deaths',
				icon: 'user-times',
				color: '#AF2B1E',
			},
			{
				route: 'Migrations',
				name: 'Migrations',
				icon: 'plane',
				color: '#23BEDD',
			},
			{
				route: 'Marriages',
				name: 'Marriages',
				icon: 'heart',
				color: 'red',
			},
		],
	},
	{
		title: 'Responsible Parenthood  Family Planning',
		children: [
			{
				route: 'PMOC',
				name: 'Pre-Marraige Orrientation & Counseling',
				icon: 'fire',
				color: '#FE6017',
			},
			{
				route: 'MPFCFDC',
				name: 'Multi-Purpose Counseling and Family Development Center',
				icon: 'comment',
				color: '#031D4F',
			},
		],
	},
	{
		title: 'Adolscent Health & Youth Development',
		children: [
			{
				route: 'TeenCenter',
				name: 'Teen Centers',
				icon: 'microphone',
				color: 'orange',
			},
			{
				route: 'IssuesAndConcerns',
				name: 'Issues and Concern',
				icon: 'facebook-square',
				color: '#0D6EFD',
			},
		],
	},
	{
		title: 'Others',
		children: [
			{
				route: 'KeyFiles',
				name: 'Key Files',
				icon: 'folder-open',
				color: '#FFCF10',
			},
		],
	},
]

export type menuNavigation = {
	title: string
	children: Children[]
}

export type Children = {
	route?: any
	name?: string
	icon?: any
	color?: string
}
