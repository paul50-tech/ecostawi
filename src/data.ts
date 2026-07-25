import { Programme, NewsStory, Project, CareerPost } from './types';

// Import custom generated high-fidelity photos representing real EcoStawi activities
import forestRestorationImg from './assets/images/hero_forest_kenya_1784624447889.jpg';
import mangroveRestorationImg from './assets/images/mangrove_restoration_kenya_1784624465676.jpg';
import communityLivelihoodImg from './assets/images/beekeeping_livelihood_kenya_1784624482358.jpg';
import climateSmartAgricultureImg from './assets/images/climatesmart_agriculture_kenya_1784624498922.jpg';
import carbonFinanceImg from './assets/images/carbon_finance_drone_1784624517946.jpg';
import greenSchoolsImg from './assets/images/green_schools_planting_1784624533774.jpg';
import aiTelemetryGisImg from './assets/images/ai_telemetry_gis_1784624552221.jpg';

export const programmesData: Programme[] = [
  {
    id: 'forest-restoration',
    title: 'Forest Restoration',
    description: 'Restoring degraded forests and indigenous canopies using science-based, community-led approaches.',
    category: 'Ecosystem Restoration',
    image: forestRestorationImg,
    metrics: [
      { label: 'Pilot Seedling Nurseries', value: '8 Active' },
      { label: 'Target Native Saplings', value: '25,000' },
      { label: 'Pilot Restoration Plot', value: '150 Ha' }
    ],
    details: [
      'Establishment of community-run tree nurseries cultivating indigenous and water-friendly species.',
      'Active enrichment planting and assisted natural regeneration in key national water towers (Mau Complex, Aberdares).',
      'Training Community Forest Associations (CFAs) in co-management and modern forest surveillance.',
      'Integration of drone technology for precise aerial seed dispersal in hard-to-reach forest patches.'
    ]
  },
  {
    id: 'mangrove-restoration',
    title: 'Mangrove Restoration',
    description: 'Protecting coastal blue forests to secure marine biodiversity, buffer coastlines, and sequester blue carbon.',
    category: 'Blue Economy',
    image: mangroveRestorationImg,
    metrics: [
      { label: 'Community Coastal Posts', value: '4 Active' },
      { label: 'Mangrove Saplings Potted', value: '15,000' },
      { label: 'BMU Pilot Partners', value: '5 Units' }
    ],
    details: [
      'Partnering with local Beach Management Units (BMUs) along the coast (Kilifi, Kwale, Lamu) to raise and plant mangrove seedlings.',
      'Creating alternative, non-destructive coastal livelihoods such as sustainable mangrove crab farming and coastal ecotourism.',
      'Conducting marine sediment analysis to measure the blue carbon sequestration potential of restored mudflats.',
      'Educating local schools on the vital role of mangroves in protecting communities from sea-level rise and storm surges.'
    ]
  },
  {
    id: 'community-livelihood',
    title: 'Community Livelihood',
    description: 'Unlocking eco-friendly economic opportunities to ensure conservation drives human prosperity.',
    category: 'Community Empowerment',
    image: communityLivelihoodImg,
    metrics: [
      { label: 'Pioneer Households', value: '120 Enrolled' },
      { label: 'Beehives Deployed', value: '85 Hives' },
      { label: 'Women Enterprise Groups', value: '6 Groups' }
    ],
    details: [
      'Supporting commercial apiculture (beekeeping) on forest edges, creating honey production enterprises that guard boundaries.',
      'Setting up micro-finance and seed capital for community-led eco-enterprises such as native craft-making and solar dryers.',
      'Establishing dryland agroforestry systems producing high-value non-timber forest products like Shea, Moringa, and Macadamia.',
      'Coordinating local trade associations to guarantee fair-market access and organic certifications for community outputs.'
    ]
  },
  {
    id: 'climate-smart-agriculture',
    title: 'Climate Smart Agriculture',
    description: 'Transforming farming practices to build climate resilience, secure food, and improve soil organic health.',
    category: 'Climate Action',
    image: climateSmartAgricultureImg,
    metrics: [
      { label: 'Demonstration Farms', value: '25 Plots' },
      { label: 'Pilot Farmers Enrolled', value: '180 Farmers' },
      { label: 'Agroforestry Seed Kits', value: '500 Distributed' }
    ],
    details: [
      'Introducing conservation tillage, crop rotation, and multi-species cover-cropping to rebuild depleted farm soils.',
      'Providing solar-powered micro-irrigation kits to overcome erratic rainfall and dry season disruptions.',
      'Distributing drought-resilient, climate-adapted seed varieties alongside organic pest control education.',
      'Installing rainwater harvesting reservoirs and farm-level climate weather data units.'
    ]
  },
  {
    id: 'carbon-finance',
    title: 'Carbon & Climate Finance',
    description: 'Linking community conservation to international carbon markets, directing direct financing back to local hands.',
    category: 'Carbon Markets',
    image: carbonFinanceImg,
    metrics: [
      { label: 'Feasibility Assessment', value: 'Underway' },
      { label: 'GIS Baseline Mapped', value: '450 Ha' },
      { label: 'Standards Framework', value: 'Verra Compliant' }
    ],
    details: [
      'Developing rigorous, community-centered carbon offset projects verified under leading international standards (VCS/Verra, Gold Standard).',
      'Implementing transparent, blockchain-grounded benefit-sharing mechanisms to ensure direct payouts reach household-level actors.',
      'Using satellite biomass imagery and automated GIS telemetry to prove the permanence and additionality of protected plots.',
      'Advocating for fair carbon pricing that values social co-benefits (education, health, clean water) alongside carbon metrics.'
    ]
  },
  {
    id: 'green-schools',
    title: 'Green Schools Initiative',
    description: 'Educating and engaging the next generation through environmental clubs, school woodlots, and climate-smart learning.',
    category: 'Community Empowerment',
    image: greenSchoolsImg,
    metrics: [
      { label: 'Pilot School Clubs', value: '12 Schools' },
      { label: 'School Woodlots Started', value: '8 Nurseries' },
      { label: 'Students Engaged', value: '850 Youth' }
    ],
    details: [
      'Supporting active "EcoStawi Environment Clubs" with curriculum materials on regional biodiversity and waste management.',
      'Planting school woodlots consisting of fruit trees and fodder species, generating food security and practical agricultural lessons.',
      'Hosting regional "Green Hackathons" for school-aged kids to invent localized water-filtration and sorting models.',
      'Facilitating field trips into national reserves and restored wetlands to nurture a lifelong conservation mindset.'
    ]
  }
];

export const newsStoriesData: NewsStory[] = [
  {
    id: 'story-1',
    title: 'Growing Together: How Beekeeping is Saving the Mau Forest Fringe',
    category: 'Field Stories',
    date: 'July 15, 2026',
    author: 'Wanjiku Mwangi, Lead Field Coordinator',
    summary: 'Discover how forest-edge communities in Nakuru are utilizing modern apiculture to protect native canopies while generating high-value honey income.',
    content: [
      'In the lush, misty borders of the Mau Forest, a quiet revolution is taking place, buzzed into existence by millions of tiny, winged conservationists. Historically, communities living on the forest fringe faced severe economic pressure, occasionally prompting charcoal burning or illegal logging as desperate survival strategies.',
      'Today, through EcoStawi Foundation\'s inaugural Community Livelihood pilot cohort, over 40 pioneer households have transitioned into forest guardians. By installing modern, high-yield hives along the forest boundary, farmers are earning a steady, sustainable income from "EcoStawi Forest Honey" while establishing a highly effective biological shield against encroachment.',
      '"You do not cut down a forest that is feeding your family," explains local farmer Josphat Kiprono. "A single healthy tree can support three hives, which produce honey worth far more than a pile of charcoal. The trees are now our partners, not our resource." This win-win is the essence of EcoStawi—proving that when communities thrive, nature stands tall.'
    ],
    image: communityLivelihoodImg,
    reads: 420,
    tags: ['Apiculture', 'Livelihoods', 'MauForest', 'CommunityGuardians'],
    readTime: '3 min read'
  },
  {
    id: 'story-2',
    title: 'Integrating Artificial Intelligence in Forest Telemetry and Monitoring',
    category: 'Research',
    date: 'June 28, 2026',
    author: 'Dr. Vin Okeyo, Chief Tech & Innovation Officer',
    summary: 'A deep dive into how EcoStawi uses multispectral satellite imagery, GIS pipelines, and deep learning algorithms to track canopy regeneration in real-time.',
    content: [
      'Conventional forest monitoring relies heavily on sporadic, manual ground surveys—a method that is costly, labor-intensive, and slow to catch illegal logging or disease outbreaks. EcoStawi Digital has bridged this gap by combining machine learning with high-resolution satellite imagery.',
      'Our pilot AI models analyze raw multispectral data from Sentinel-2 satellites weekly. By tracking subtle shifts in the Normalized Difference Vegetation Index (NDVI) and soil moisture levels, our systems can detect early-stage canopy degradation, predict drought stress spots, and map natural tree regeneration with over 94% accuracy.',
      'Furthermore, we deploy autonomous conservation drones to capture ultra-high-resolution thermal feeds beneath the upper canopy, helping us count saplings, track wildlife populations, and verify the precise carbon sequestration metrics required by our international climate finance partners. EcoStawi Digital is proving that smart conservation is indeed high-impact conservation.'
    ],
    image: aiTelemetryGisImg,
    reads: 310,
    tags: ['AI', 'GIS', 'RemoteSensing', 'CanopyTelemetry'],
    readTime: '4 min read'
  },
  {
    id: 'story-3',
    title: 'Blue Carbon: The Coastline Guardians of Kilifi County',
    category: 'Success Stories',
    date: 'May 14, 2026',
    author: 'Ali Omar, Blue Economy Lead',
    summary: 'From sand dunes to dense blue forests—the coastal community of Kilifi celebrates the launch of 4 mangrove nursery posts across degraded coastal lagoons.',
    content: [
      'Mangroves are the unsung heroes of climate mitigation. Sequestering up to ten times more carbon per hectare than terrestrial tropical rainforests, these aquatic forests also serve as vital nurseries for 75% of commercial fish species and protect fragile coastlines from destructive ocean storms.',
      'As part of our early field launch, EcoStawi Foundation has partnered with local Beach Management Units (BMUs) in Kilifi to rehabilitate degraded mudflats. Through a dedicated community nursery network run primarily by local women\'s groups, we have successfully potted over 15,000 native mangrove saplings in our inaugural season.',
      'The ecological recovery is already visible. Local fishermen are seeing early returns in crab and snapper nursery grounds, boosting household food security. Additionally, the baseline GIS mapping generated from these pilot plots will prepare the community for future blue carbon verification.'
    ],
    image: mangroveRestorationImg,
    reads: 520,
    tags: ['BlueCarbon', 'Mangroves', 'Kilifi', 'CoastalResilience'],
    readTime: '3 min read'
  },
  {
    id: 'story-4',
    title: 'Climate-Smart Cashew Farms Beat the Coastal Drought',
    category: 'Climate Insights',
    date: 'April 02, 2026',
    author: 'Grace Mutua, Agronomist',
    summary: 'How shifting to multi-layered dryland agroforestry and organic mulch systems is insulating local farmers against intensifying weather extremes.',
    content: [
      'As dry seasons grow longer and temperatures rise, traditional single-crop farming along Kenya\'s coastline is becoming increasingly vulnerable. To counter this, EcoStawi is piloting advanced dryland agroforestry modules with smallholder farmers.',
      'The system utilizes a multi-story cropping pattern: tall cashew trees provide a partial sun filter; medium-height pigeon peas fix critical nitrogen into the soil; while low-growing sweet potatoes act as a living, moisture-retaining soil cover. Coupled with organic mulching and solar drip systems, these farms require 60% less water while yielding three distinct food and cash sources.',
      'By diversifying their plots, farmers are no longer dependent on a single harvest. If a dry spell stunts one crop, the deep-rooted cashew trees and resilient pigeon peas still deliver, ensuring stable nutrition and continuous household income.'
    ],
    image: climateSmartAgricultureImg,
    reads: 280,
    tags: ['Agroforestry', 'ClimateResilience', 'SoilHealth', 'Cashews'],
    readTime: '3 min read'
  },
  {
    id: 'story-5',
    title: 'Verifying Carbon Offsets: Building Transparent Ecosystem Integrity',
    category: 'Partner Stories',
    date: 'March 18, 2026',
    author: 'Samuel Kiptoo, Environmental Auditor',
    summary: 'How EcoStawi collaborates with international climate registries to convert drone telemetry and ground-truth data into verified carbon metrics.',
    content: [
      'In the global carbon markets, transparency and credibility are paramount. Investors and philanthropic partners require absolute certainty that carbon offsets represent real, measurable, and permanent biomass growth.',
      'Through our Carbon Accounting Framework, EcoStawi Foundation integrates automated GIS ground telemetry with high-frequency LiDAR scans. Every restored hectare is assigned a digital cryptographically verifiable twin that logs tree height, trunk DBH (Diameter at Breast Height), and soil organic carbon.',
      'This open-access protocol ensures that local communities receive 80% of revenue generated from verified ecosystem services, setting a new benchmark for ethical and high-integrity climate finance in East Africa.'
    ],
    image: carbonFinanceImg,
    reads: 395,
    tags: ['CarbonFinance', 'Audit', 'Telemetry', 'Transparency'],
    readTime: '4 min read'
  },
  {
    id: 'story-6',
    title: 'Green Schools Pilot: Nurturing Young Environmental Stewards',
    category: 'Field Stories',
    date: 'February 10, 2026',
    author: 'Faith Chebet, Youth Education Officer',
    summary: 'Empowering 850 primary school students across Nakuru with hands-on tree nursery care, biodiversity clubs, and school woodlot cultivation.',
    content: [
      'True long-term conservation begins in the classroom. EcoStawi\'s Green Schools Programme has established 12 active environmental clubs across rural primary schools in Nakuru County.',
      'Students manage their own micro-nurseries, learning seed stratification, soil composting, and grafting techniques. Each student adopts two indigenous trees, caring for them throughout their academic journey.',
      'By pairing ecological literacy with practical agriculture, we are inspiring a new generation of climate leaders who view environmental stewardship as an essential part of community pride.'
    ],
    image: greenSchoolsImg,
    reads: 460,
    tags: ['YouthLeadership', 'GreenSchools', 'TreeNurseries', 'Education'],
    readTime: '2 min read'
  }
];

export const projectsData: Project[] = [
  {
    id: 'proj-1',
    name: 'Mau Canopy Regeneration Initiative',
    location: 'Mau Forest Complex, Nakuru County',
    county: 'Nakuru',
    coordinates: { lat: -0.5234, lng: 35.9123 },
    status: 'Active',
    type: 'Forest Restoration',
    sizeHectares: 150,
    treesPlanted: 12500,
    carbonOffsetTons: 350,
    communityPartners: 85,
    dronePath: [
      { lat: -0.520, lng: 35.910 },
      { lat: -0.525, lng: 35.911 },
      { lat: -0.528, lng: 35.915 },
      { lat: -0.522, lng: 35.917 },
      { lat: -0.520, lng: 35.910 }
    ]
  },
  {
    id: 'proj-2',
    name: 'Arabuko Blue Carbon Mangrove Project',
    location: 'Arabuko Sokoke Coastal Lagoon, Kilifi County',
    county: 'Kilifi',
    coordinates: { lat: -3.3142, lng: 39.9928 },
    status: 'Active',
    type: 'Mangrove Restoration',
    sizeHectares: 80,
    treesPlanted: 8500,
    carbonOffsetTons: 220,
    communityPartners: 60,
    dronePath: [
      { lat: -3.310, lng: 39.990 },
      { lat: -3.313, lng: 39.992 },
      { lat: -3.316, lng: 39.995 },
      { lat: -3.311, lng: 39.996 },
      { lat: -3.310, lng: 39.990 }
    ]
  },
  {
    id: 'proj-3',
    name: 'Lake Victoria Resilient Riparian Buffer',
    location: 'Winam Gulf Coastline, Kisumu County',
    county: 'Kisumu',
    coordinates: { lat: -0.1022, lng: 34.7617 },
    status: 'Completed',
    type: 'Blue Economy',
    sizeHectares: 40,
    treesPlanted: 3200,
    carbonOffsetTons: 85,
    communityPartners: 35,
    dronePath: [
      { lat: -0.100, lng: 34.760 },
      { lat: -0.104, lng: 34.761 },
      { lat: -0.105, lng: 34.764 },
      { lat: -0.101, lng: 34.763 },
      { lat: -0.100, lng: 34.760 }
    ]
  },
  {
    id: 'proj-4',
    name: 'Kwale Climate-Smart Dryland Cashew Hub',
    location: 'Matuga Sub-County, Kwale County',
    county: 'Kwale',
    coordinates: { lat: -4.1744, lng: 39.4623 },
    status: 'Active',
    type: 'Climate Smart Agriculture',
    sizeHectares: 60,
    treesPlanted: 4200,
    carbonOffsetTons: 120,
    communityPartners: 50,
    dronePath: [
      { lat: -4.170, lng: 39.460 },
      { lat: -4.175, lng: 39.461 },
      { lat: -4.178, lng: 39.465 },
      { lat: -4.172, lng: 39.466 },
      { lat: -4.170, lng: 39.460 }
    ]
  },
  {
    id: 'proj-5',
    name: 'Aberdares Community Carbon Forest',
    location: 'Aberdare Forest Reserve Edge, Nyeri County',
    county: 'Nyeri',
    coordinates: { lat: -0.4234, lng: 36.9534 },
    status: 'Planning',
    type: 'Carbon Project',
    sizeHectares: 100,
    treesPlanted: 0,
    carbonOffsetTons: 0,
    communityPartners: 40,
    dronePath: []
  }
];

export const careersData: CareerPost[] = [
  {
    id: 'car-1',
    title: 'Lead Forestry & Restoration Officer',
    department: 'Programs & Science',
    location: 'Nakuru Field Station, Kenya (With travel to Mau Complex)',
    type: 'Full-time',
    description: 'We are seeking an experienced Forestry scientist to lead our terrestrial indigenous tree-growing initiatives, design restoration protocols, and coordinate local Community Forest Associations (CFAs).',
    requirements: [
      'M.Sc. or B.Sc. in Forestry, Agroforestry, Ecology, or environmental conservation sciences.',
      'Minimum of 5 years of hands-on experience in coordinating large-scale forest or landscape restoration initiatives.',
      'Deep knowledge of native Kenyan highland flora and ecosystem recovery pathways.',
      'Exceptional leadership skills with a proven ability to lead and coordinate community-led field projects.'
    ]
  },
  {
    id: 'car-2',
    title: 'GIS and Remote Sensing Analyst',
    department: 'EcoStawi Digital & Tech',
    location: 'Nairobi Office / Hybrid (With occasional field visits)',
    type: 'Full-time',
    description: 'Join our EcoStawi Digital team to oversee high-resolution satellite canopy tracking, create GIS mapping layouts, manage drone thermal imagery pipelines, and generate precise data models for our carbon offset validation.',
    requirements: [
      'B.Sc. in Geoinformatics, GIS, Remote Sensing, Environmental Science, or related fields.',
      'Proficiency in ArcGIS, QGIS, Google Earth Engine, and Python/R spatial analysis libraries.',
      'Experience in processing multispectral satellite data (Sentinel, Landsat) for NDVI and biomass metrics.',
      'Familiarity with photogrammetry software for processing drone mapping captures.'
    ]
  },
  {
    id: 'car-3',
    title: 'Community Engagement Coordinator',
    department: 'Community Empowerment',
    location: 'Kilifi Coastal Station, Kenya',
    type: 'Full-time',
    description: 'We are looking for a dynamic, Swahili-fluent communicator to strengthen our relations with Beach Management Units (BMUs), women\'s groups, and youth co-ops in mangrove and marine restoration sites.',
    requirements: [
      'Degree in Community Development, Sociology, Environmental Education, or related social sciences.',
      'Superb Swahili and English verbal and written communication skills.',
      'At least 3 years working closely with coastal communities or marine fisheries structures in Kenya.',
      'Demonstrated skill in co-designing community training programs and alternative livelihoods.'
    ]
  }
];
