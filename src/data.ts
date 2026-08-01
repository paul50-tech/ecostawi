import { Programme, NewsStory, Project, CareerPost } from './types';

// Import custom generated high-fidelity photos representing real EcoStawi activities
import forestRestorationImg from './assets/images/hero_forest_kenya_1784624447889.jpg';
import mangroveRestorationImg from './assets/images/coastal_ecosystem_aerial_1785395836373.jpg';
import communityLivelihoodImg from './assets/images/beekeeping_livelihood_kenya_1784624482358.jpg';
import climateSmartAgricultureImg from './assets/images/climatesmart_agriculture_kenya_1784624498922.jpg';
import carbonFinanceImg from './assets/images/carbon_finance_drone_1784624517946.jpg';
import greenSchoolsImg from './assets/images/green_schools_planting_1784624533774.jpg';
import aiTelemetryGisImg from './assets/images/ai_telemetry_gis_1784624552221.jpg';

export const programmesData: Programme[] = [
  {
    id: 'forest-restoration',
    title: 'Forest Restoration',
    description: 'Healthy forests are the foundation of thriving ecosystems, resilient communities, and a stable climate. We work to restore degraded forest landscapes through science-based, community-led, and technology-enabled approaches that enhance biodiversity, protect critical water catchments, and strengthen climate resilience. Our Forest Restoration Programme promotes long-term ecosystem recovery by combining ecological restoration, sustainable forest management, community stewardship, and innovative technologies to ensure forests continue providing environmental, social, and economic benefits for generations to come.',
    category: 'Ecosystem Restoration',
    image: forestRestorationImg,
    metrics: [
      { label: 'Target Seedling Nurseries', value: '8 Nurseries' },
      { label: 'Target Native Saplings', value: '25,000 Saplings' },
      { label: 'Target Restoration Area', value: '150 Ha' }
    ],
    details: [
      'Community-Led Forest Restoration: Empower local communities and Community Forest Associations (CFAs) to lead restoration efforts through participatory planning, sustainable forest management, and environmental stewardship.',
      'Indigenous Tree Propagation: Establish and strengthen community-managed nurseries producing indigenous, climate-resilient, and ecologically appropriate tree species to support landscape restoration and biodiversity conservation.',
      'Forest Landscape Restoration (FLR): Restore degraded forests through enrichment planting, assisted natural regeneration, ecological rehabilitation, and sustainable land management practices tailored to local ecosystems.',
      'Water Tower Conservation: Support the restoration and protection of Kenya\'s critical water towers, riparian ecosystems, and forested catchments that sustain biodiversity, water security, agriculture, and livelihoods.',
      'Innovation for Restoration: Apply modern conservation technologies, including drone-assisted restoration, geospatial mapping, digital monitoring, and environmental data systems, to improve restoration planning, implementation, and long-term monitoring.',
      'Biodiversity Protection: Promote the recovery of native flora and fauna by restoring habitats, strengthening ecosystem connectivity, and reducing pressures on threatened forest ecosystems.',
      'Environmental Education & Stewardship: Inspire communities, schools, and young people to become active custodians of forests through awareness programmes, conservation education, and volunteer restoration initiatives.'
    ]
  },
  {
    id: 'coastal-ecosystem-restoration',
    title: 'Coastal Ecosystem Restoration',
    description: 'Healthy coastal ecosystems are essential for thriving marine biodiversity, climate resilience, sustainable livelihoods, and resilient coastal communities. We work alongside local communities to restore, protect, and sustainably manage coastal ecosystems through science-based, community-led, and technology-enabled solutions that safeguard nature while improving lives. Our programme promotes integrated coastal management by restoring critical habitats, strengthening ecosystem resilience, supporting sustainable livelihoods, and advancing innovative conservation approaches that contribute to a healthier and more sustainable Blue Economy.',
    category: 'Blue Economy',
    image: mangroveRestorationImg,
    metrics: [
      { label: 'Target Coastal Posts', value: '4 Posts' },
      { label: 'Sapling Propagation Goal', value: '15,000 Saplings' },
      { label: 'Target BMU Partners', value: '5 Units' }
    ],
    details: [
      'Coastal Habitat Restoration: Restore and protect mangroves, coastal forests, wetlands, estuaries, seagrass meadows, and other critical coastal ecosystems through ecological restoration and sustainable management practices.',
      'Community-Led Conservation: Empower Beach Management Units (BMUs), Community Forest Associations (CFAs), local conservation groups, women, and youth to actively participate in protecting and restoring coastal ecosystems.',
      'Sustainable Blue Economy: Promote environmentally sustainable livelihood opportunities, including climate-smart fisheries, ecotourism, sustainable aquaculture, beekeeping, and other nature-based enterprises that enhance household incomes while reducing pressure on coastal ecosystems.',
      'Marine Biodiversity Conservation: Protect and restore habitats that support fisheries, marine wildlife, and coastal biodiversity while promoting sustainable use of marine and coastal natural resources.',
      'Blue Carbon & Climate Resilience: Advance nature-based climate solutions through coastal ecosystem restoration, blue carbon initiatives, and ecosystem-based adaptation that strengthens resilience to sea-level rise, coastal erosion, flooding, and extreme weather events.',
      'Innovation for Coastal Conservation: Leverage technology, geospatial intelligence, environmental monitoring, and data-driven decision-making to improve restoration planning, ecosystem management, and long-term conservation outcomes.',
      'Environmental Education & Stewardship: Promote environmental awareness, community stewardship, and conservation leadership through education, capacity building, citizen science, and youth engagement programmes.'
    ]
  },
  {
    id: 'community-livelihoods',
    title: 'Community Livelihoods & Green Enterprise Development',
    description: 'At EcoStawi Foundation, we believe that lasting environmental conservation can only be achieved when communities have sustainable economic opportunities. Our programme empowers communities to build resilient livelihoods that protect natural ecosystems while improving household incomes, food security, and long-term well-being. Through innovation, skills development, enterprise support, and market-driven solutions, we help transform conservation into an engine for inclusive economic growth, ensuring that both people and nature thrive together.',
    category: 'Community Empowerment',
    image: communityLivelihoodImg,
    metrics: [
      { label: 'Target Households', value: '120 Households' },
      { label: 'Target Beehives', value: '85 Hives' },
      { label: 'Target Women Groups', value: '6 Co-ops' }
    ],
    details: [
      'Sustainable Green Enterprises: Support the establishment and growth of environmentally sustainable enterprises, including beekeeping, agroforestry, eco-tourism, nature-based products, and other green businesses that create income while conserving natural resources.',
      'Climate-Smart Agriculture & Agroforestry: Promote sustainable farming systems that integrate indigenous trees, fruit trees, high-value crops, and regenerative agricultural practices to improve food security, restore landscapes, and enhance climate resilience.',
      'Value Addition & Market Access: Strengthen community enterprises through value addition, product development, quality assurance, branding, certification, and improved access to local, regional, and international markets.',
      'Green Skills & Entrepreneurship: Equip women, youth, farmers, and community groups with practical skills in entrepreneurship, financial literacy, business development, digital innovation, and sustainable natural resource management.',
      'Nature-Based Enterprises: Promote sustainable income-generating opportunities built around ecosystem conservation, including non-timber forest products, sustainable aquaculture, ecotourism, environmental restoration services, and circular economy initiatives.',
      'Inclusive Community Finance: Support community savings groups, cooperatives, revolving funds, and other innovative financing mechanisms that strengthen locally led green enterprises and improve financial inclusion.',
      'Community Partnerships: Work alongside community organizations, cooperatives, producer groups, Community Forest Associations (CFAs), Beach Management Units (BMUs), and other local institutions to build resilient local economies rooted in environmental stewardship.'
    ]
  },
  {
    id: 'climate-smart-agriculture',
    title: 'Climate-Smart Agriculture',
    description: 'Agriculture is at the heart of healthy communities, thriving ecosystems, and climate resilience. We promote climate-smart agricultural practices that improve food security, restore soil health, enhance biodiversity, and strengthen farmers\' resilience to the impacts of climate change. Our programme supports sustainable farming systems that increase productivity while conserving natural resources, protecting ecosystems, and creating resilient livelihoods for farming communities.',
    category: 'Climate Action',
    image: climateSmartAgricultureImg,
    metrics: [
      { label: 'Target Demo Farms', value: '25 Plots' },
      { label: 'Target Farmers', value: '180 Farmers' },
      { label: 'Seed Kit Distribution Goal', value: '500 Kits' }
    ],
    details: [
      'Climate-Resilient Farming Systems: Promote climate-smart agricultural practices, including conservation agriculture, agroforestry, regenerative farming, crop diversification, integrated farming systems, and sustainable land management.',
      'Soil & Landscape Restoration: Restore soil fertility and improve ecosystem health through conservation tillage, organic soil management, cover cropping, composting, erosion control, and integrated watershed management.',
      'Water Security & Climate Adaptation: Strengthen climate resilience through rainwater harvesting, efficient irrigation technologies, water conservation, and climate-adaptive farming practices that reduce vulnerability to droughts and changing rainfall patterns.',
      'Sustainable Crop & Livestock Production: Support the adoption of climate-resilient crop varieties, sustainable livestock management, integrated pest management, and environmentally responsible farming practices that improve productivity while protecting biodiversity.',
      'Farmer Capacity Building: Empower farmers through training, demonstration farms, farmer field schools, extension services, digital advisory platforms, and knowledge-sharing initiatives that promote sustainable agriculture and innovation.',
      'Agricultural Value Chains & Market Access: Strengthen agricultural enterprises through value addition, post-harvest management, market linkages, climate information services, and business development support that improves incomes and reduces food loss.',
      'Research & Agricultural Innovation: Promote research, innovation, and technology-driven solutions that enhance climate resilience, improve farm productivity, and support evidence-based decision-making for sustainable agriculture.'
    ]
  },
  {
    id: 'carbon-finance',
    title: 'Carbon & Climate Finance',
    description: 'Climate finance has the power to transform environmental conservation into sustainable economic opportunities for communities. We work to connect ecosystem restoration, climate action, and community development by promoting equitable access to climate finance and nature-based investment opportunities. Our programme supports the development of high-integrity climate solutions that reward environmental stewardship, strengthen community resilience, and generate lasting environmental, social, and economic benefits.',
    category: 'Carbon Markets',
    image: carbonFinanceImg,
    metrics: [
      { label: 'Feasibility Assessment', value: 'Underway' },
      { label: 'Target GIS Mapping', value: '450 Ha' },
      { label: 'Standards Framework', value: 'Verra Aligned' }
    ],
    details: [
      'Nature-Based Climate Solutions: Design and support community-centred initiatives that restore forests, wetlands, mangroves, and other natural ecosystems while contributing to climate change mitigation and adaptation.',
      'Carbon Project Development: Support the development of transparent, scientifically credible, and community-driven carbon initiatives that create long-term environmental value while improving local livelihoods.',
      'Climate Finance Access: Facilitate access to climate finance, green investment opportunities, and innovative funding mechanisms that strengthen ecosystem restoration and sustainable community development.',
      'Community Benefit Sharing: Promote fair, transparent, and inclusive benefit-sharing models that ensure communities actively participating in conservation receive meaningful social and economic returns.',
      'Environmental Monitoring & Verification: Leverage innovative technologies, scientific research, and environmental monitoring systems to support accurate measurement, reporting, transparency, and long-term ecosystem stewardship.',
      'Capacity Building & Awareness: Build the capacity of communities, institutions, and local organizations to understand carbon markets, climate finance opportunities, ecosystem services, and sustainable natural resource management.',
      'Policy & Strategic Partnerships: Collaborate with governments, research institutions, development partners, financial institutions, and the private sector to strengthen climate finance frameworks and accelerate investment in nature-based solutions.'
    ]
  },
  {
    id: 'green-schools',
    title: 'Green Schools Initiative',
    description: 'Young people are at the heart of a sustainable future. We empower learners, educators, and schools with the knowledge, skills, and opportunities to become champions of environmental conservation, climate action, and sustainable development. Our Green Schools Initiative integrates environmental education with practical, hands-on learning experiences that inspire innovation, leadership, and responsible stewardship of natural resources while fostering a culture of sustainability within schools and surrounding communities.',
    category: 'Community Empowerment',
    image: greenSchoolsImg,
    metrics: [
      { label: 'Target School Clubs', value: '12 Schools' },
      { label: 'Target School Nurseries', value: '8 Nurseries' },
      { label: 'Youth Outreach Goal', value: '850+ Students' }
    ],
    details: [
      'EcoStawi Environment Clubs: Establish and support vibrant school-based environmental clubs that promote conservation, climate action, biodiversity protection, waste management, and environmental leadership through interactive learning and community engagement.',
      'School Greening Programmes: Develop school woodlots, indigenous tree gardens, fruit orchards, pollinator gardens, kitchen gardens, and green spaces that enhance biodiversity, improve food security, and provide practical environmental learning opportunities.',
      'Environmental Education: Deliver engaging environmental education programmes, climate literacy, and sustainability awareness that empower learners to understand and respond to today\'s environmental challenges.',
      'Innovation & Green Skills: Promote creativity, problem-solving, and environmental innovation through green challenges, science fairs, hackathons, and student-led projects that develop practical solutions for local environmental issues.',
      'Outdoor Learning & Nature Experiences: Provide experiential learning through environmental field visits, ecosystem restoration activities, biodiversity monitoring, citizen science, and conservation camps that strengthen learners\' connection with nature.',
      'Sustainable Schools: Support schools in adopting environmentally sustainable practices, including waste reduction, recycling, water conservation, energy efficiency, climate-smart food production, and responsible resource management.',
      'Teacher Capacity Building: Equip teachers and school leaders with practical knowledge, educational resources, and training to integrate environmental conservation and sustainability into teaching and school activities.'
    ]
  }
];

export const newsStoriesData: NewsStory[] = [];

export const projectsData: Project[] = [
  {
    id: 'proj-1',
    name: 'Nairobi Urban Canopy & Youth Nurseries',
    location: 'Karura Edge & Urban Corridors, Nairobi County',
    county: 'Nairobi',
    coordinates: { lat: -1.286389, lng: 36.817223 },
    status: 'Active',
    type: 'Forest Restoration',
    sizeHectares: 100,
    treesPlanted: 0,
    carbonOffsetTons: 0,
    communityPartners: 12,
    dronePath: [
      { lat: -1.285, lng: 36.815 },
      { lat: -1.288, lng: 36.816 },
      { lat: -1.290, lng: 36.820 },
      { lat: -1.286, lng: 36.822 },
      { lat: -1.285, lng: 36.815 }
    ]
  },
  {
    id: 'proj-2',
    name: 'Mombasa Coastal Marine & Lagoon Concession',
    location: 'Tudor & Mtwapa Creeks, Mombasa County',
    county: 'Mombasa',
    coordinates: { lat: -4.043477, lng: 39.668206 },
    status: 'Planning',
    type: 'Coastal Ecosystem Restoration',
    sizeHectares: 80,
    treesPlanted: 0,
    carbonOffsetTons: 0,
    communityPartners: 5,
    dronePath: [
      { lat: -4.040, lng: 39.665 },
      { lat: -4.044, lng: 39.667 },
      { lat: -4.046, lng: 39.670 },
      { lat: -4.041, lng: 39.672 },
      { lat: -4.040, lng: 39.665 }
    ]
  },
  {
    id: 'proj-3',
    name: 'Kwale Dryland Agroforestry & Cashew Hub',
    location: 'Matuga & Lunga Lunga Sector, Kwale County',
    county: 'Kwale',
    coordinates: { lat: -4.1744, lng: 39.4623 },
    status: 'Active',
    type: 'Climate-Smart Agriculture',
    sizeHectares: 120,
    treesPlanted: 0,
    carbonOffsetTons: 0,
    communityPartners: 25,
    dronePath: [
      { lat: -4.170, lng: 39.460 },
      { lat: -4.175, lng: 39.461 },
      { lat: -4.178, lng: 39.465 },
      { lat: -4.172, lng: 39.466 },
      { lat: -4.170, lng: 39.460 }
    ]
  },
  {
    id: 'proj-4',
    name: 'Kilifi Community Mangrove Project',
    location: 'Arabuko Border & Mnarani Lagoon, Kilifi County',
    county: 'Kilifi',
    coordinates: { lat: -3.630491, lng: 39.849926 },
    status: 'Active',
    type: 'Coastal Ecosystem Restoration',
    sizeHectares: 90,
    treesPlanted: 0,
    carbonOffsetTons: 0,
    communityPartners: 15,
    dronePath: [
      { lat: -3.628, lng: 39.845 },
      { lat: -3.632, lng: 39.848 },
      { lat: -3.635, lng: 39.852 },
      { lat: -3.630, lng: 39.854 },
      { lat: -3.628, lng: 39.845 }
    ]
  },
  {
    id: 'proj-5',
    name: 'Tana River Riparian Catchment Project',
    location: 'Lower Tana River Basin, Tana River County',
    county: 'Tana River',
    coordinates: { lat: -1.500000, lng: 40.033333 },
    status: 'Planning',
    type: 'Forest Restoration',
    sizeHectares: 150,
    treesPlanted: 0,
    carbonOffsetTons: 0,
    communityPartners: 10,
    dronePath: []
  }
];

export const careersData: CareerPost[] = [];
