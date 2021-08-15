export enum Home_API {
	Articles = 'articles',
	QuickLinks = 'quick-links',
	Slider = 'sliders',
}

export enum ArticleFilter_API {
	Today = 'articles/today',
	Week = 'quick-links/week',
	Month = 'sliders/month',
}

export enum About_API {
	Awards = 'awards',
	OrganizationalChart = 'charts',
	PersonnelDirectory = 'personnel-directory',
}

export enum AHYD_API {
	AhydTeam = 'sbmptcs-teams',
	FocalPersons = 'sbmptcs-focal-persons',
	PersonnelInchargeOfTeenCenter = 'sbmptc-personnel',
	TeenCenter = 'sbmptcs',
}

export enum Demographic_API {
	Birth = 'birth-statistics',
	Death = 'death-statistics',
	Marriages = 'marriage-statistics',
	Migration = 'migration-statistics',
	Incidence = 'incidences',
	MonthChart = 'month-charts',
}

export enum ByMuniipality_API {
	Birth = 'birth-statistics-by-municipality',
	Death = 'death-statistics-by-municipality',
	Marriages = 'marriage-statistics-by-municipality',
	Migration = 'migration-statistics-by-municipality',
}

export enum Summary_API {
	Birth = 'birth-statistics/summary',
	Death = 'death-statistics/summary',
	Marriages = 'marriage-statistics/summary',
	Migration = 'migration-statistics/summary',
}

export enum Officials_API {
	Barangay = 'officials/barangays',
	Municipal = 'officials/municipalities',
	Provincial = 'provincial-officials',
	SPMember = 'sb-members',
}

export enum Others_API {
	Uploads = 'uploads',
	TechnicalNotes = 'technical-notes',
}

export enum Population_API {
	AgeDistributionAndAgeDependecyRatio = 'adaadr',
	PopulationProfile = 'statistic-profiles',
	PopulationPyramid = 'population-pyramid',
	TopPopulated = 'top-populations',
	ByMunicipalities = 'adaadr/by-municipality',
}

export enum ProgramAreas_API {
	Activity = 'activities',
	ProgramAreas = 'program-areas',
}

export enum MPCFDC_API {
	MpcFdcData = 'mpcfdcs',
	MpcFdcPersonnelIncharge = 'pmc-personel',
	MpcFdcTeam = 'mpcfdc-teams',
}

export enum PMOC_API {
	AgeGroup = 'mpcfdcs',
	AverageMonthlyIncome = 'pmc-amis',
	CivilStatus = 'pmc-ccs',
	EmploymentStatus = 'pmc-ess',
	KnowledgeOnFp = 'pmc-kfp',
	NumberOfCouples = 'month-charts',
	PmocData = 'pmoccs',
	PmocTeams = 'pmocc-teams',
}

export enum Services_API {
	Services = 'services',
	Offered = 'services-offers',
}

export enum Location_API {
	Municipalities = 'location/municipalities?province_code=0630',
	Baranangay = 'location/barangays',
}
