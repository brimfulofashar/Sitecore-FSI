/**
 * Mock search catalog for Valvoline Global Operations.
 * Data only - UI lives in SearchResults.tsx.
 */

export type DemoUserTaxonomy =
  | 'Commercial Fleet Managers'
  | 'Automotive Service Professionals'
  | 'Industrial & Heavy Duty Operations';

export type SearchContentType = 'product' | 'blog' | 'service' | 'content';

/** Left-rail facet: Valvoline area of need */
export type SearchCategory =
  | 'buildingMaterials'
  | 'windowsDoorsMillwork'
  | 'manufacturedComponents'
  | 'digitalTools'
  | 'builderServices'
  | 'resources';

/** Brand / solution family facet */
export type SearchBrand = 'buildersFirstSource' | 'mybldr' | 'readyFrame' | 'designUltra';

/** Keyword buckets for curated searches */
export type SearchBucket =
  | 'products'
  | 'services'
  | 'mybldr'
  | 'windows'
  | 'readyFrame'
  | 'advancedManufacturing';

export type SearchResultItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  contentType: SearchContentType;
  categories: SearchCategory[];
  brands: SearchBrand[];
  searchBuckets: SearchBucket[];
  dateLabel?: string;
  breadcrumb?: string[];
  matchTerms?: string[];
  imageSrc?: string;
  isNew?: boolean;
  demoUserTaxonomy?: DemoUserTaxonomy;
  visibleForDemoUsers?: DemoUserTaxonomy[];
  sku?: string;
  priceLabel?: string;
};

export type AiSearchInsight = {
  id: string;
  headline: string;
  body: string;
  bullets: string[];
  learnMoreHref: string;
  learnMoreLabel?: string;
};

export const BLDR_BASE = 'https://www.valvolineglobal.com/';

export const RESULTS_PAGE_SIZE = 9;

export const searchFacetLabels = {
  contentType: {
    product: 'Products',
    blog: 'News & stories',
    service: 'Services',
    content: 'Content',
  },
  category: {
    buildingMaterials: 'Motor oil & engine lubricants',
    windowsDoorsMillwork: 'Automotive fluids & additives',
    manufacturedComponents: 'Heavy duty & commercial',
    digitalTools: 'Product finder & digital tools',
    builderServices: 'Technical services & support',
    resources: 'News & resources',
  },
  brand: {
    buildersFirstSource: 'Valvoline',
    mybldr: 'Valvoline Premium Blue',
    readyFrame: 'Restore & Protect',
    designUltra: 'SynPower',
  },
} as const;

export const popularSearches = [
  'Restore & Protect',
  'Premium Blue',
  'Product Finder',
  'Heavy Duty Diesel',
  'Data Center Cooling',
];

export const QUERY_BUCKET_SYNONYMS: Record<SearchBucket, readonly string[]> = {
  products: [
    'product',
    'products',
    'motor oil',
    'engine oil',
    'lubricant',
    'lubricants',
    'coolant',
    'grease',
    'transmission',
    'brake fluid',
    'oil',
    'fluids',
  ],
  services: [
    'service',
    'services',
    'support',
    'training',
    'warranty',
    'specification',
    'technical',
    'distributor',
    'spec',
  ],
  mybldr: [
    'product finder',
    'finder',
    'my vehicle',
    'vehicle',
    'lookup',
    'selector',
    'recommendation',
    'personal',
  ],
  windows: [
    'fleet',
    'commercial',
    'diesel',
    'heavy duty',
    'tri-fuel',
    'truck',
    'on-highway',
    'off-highway',
  ],
  readyFrame: [
    'restore',
    'protect',
    'restore & protect',
    'deposit',
    'deposits',
    'piston',
    'engine protection',
    'engine failure',
  ],
  advancedManufacturing: [
    'industrial',
    'data center',
    'hydraulic',
    'manufacturing',
    'cooling',
    'liquid cooling',
    'operations',
    'uptime',
  ],
};

const QUERY_STOP_WORDS = new Set(['and', 'or', 'the', 'for', 'with', 'from', 'your', 'our', 'are', 'you']);

/** Verified Unsplash photo IDs (invalid IDs return 404 from images.unsplash.com). */
const AUTOMOTIVE_PHOTO_IDS: readonly string[] = [
  '1492144534655-ae79c964c9d7',
  '1502877338535-766e1452684a',
  '1503387762-592deb58ef4e',
  '1504307651254-35680f356dfd',
  '1542362567-b07e54358753',
  '1558618666-fcd25c85cd64',
  '1565043666747-69f6646db940',
  '1570129477492-45c003edd2be',
  '1581091226825-a6a2a5aee158',
  '1581092162384-8987c1d64718',
  '1581094794329-c8112a89af12',
  '1582719478250-c89cae4dc85b',
  '1486406146926-c627a92ad1ab',
  '1600585154340-be6161a56a0c',
];

function buildCatalogImageUrl(id: string, width = 1200): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;
}

export const SEARCH_CARD_IMAGE_URLS: readonly string[] = AUTOMOTIVE_PHOTO_IDS.map((id) =>
  buildCatalogImageUrl(id, 900)
);

function catalogDemoImage(slot: number): string {
  const len = AUTOMOTIVE_PHOTO_IDS.length;
  const id = AUTOMOTIVE_PHOTO_IDS[((slot % len) + len) % len]!;
  return buildCatalogImageUrl(id);
}

export function getDefaultCardImage(): string {
  return catalogDemoImage(0);
}

export function parseDemoUserTaxonomy(raw: string | undefined | null): DemoUserTaxonomy | null {
  const t = raw?.trim();
  if (
    t === 'Commercial Fleet Managers' ||
    t === 'Automotive Service Professionals' ||
    t === 'Industrial & Heavy Duty Operations'
  ) {
    return t;
  }
  return null;
}

export function normalizeQuery(q: string): string {
  return q.toLowerCase().trim().replace(/\s+/g, ' ');
}

export function detectSearchBuckets(q: string): SearchBucket[] {
  const n = normalizeQuery(q);
  if (!n) return [];
  const words = n.split(/\s+/).filter(Boolean);
  const hits = new Set<SearchBucket>();
  for (const [bucket, synonyms] of Object.entries(QUERY_BUCKET_SYNONYMS) as [SearchBucket, readonly string[]][]) {
    for (const syn of synonyms) {
      if (n.includes(syn) || words.some((w) => w.length > 2 && syn.startsWith(w))) {
        hits.add(bucket);
        break;
      }
    }
  }
  return [...hits];
}

export function itemVisibleForDemoUser(item: SearchResultItem, user: DemoUserTaxonomy | null): boolean {
  if (!item.visibleForDemoUsers?.length) return true;
  if (!user) return false;
  return item.visibleForDemoUsers.includes(user);
}

function itemMatchesBuckets(item: SearchResultItem, buckets: SearchBucket[]): boolean {
  if (!buckets.length) return true;
  return buckets.some((b) => item.searchBuckets.includes(b));
}

function significantQueryWords(n: string): string[] {
  return n
    .split(' ')
    .map((w) => w.trim())
    .filter((w) => w.length > 2 && !QUERY_STOP_WORDS.has(w));
}

export function itemMatchesQuery(item: SearchResultItem, q: string): boolean {
  const n = normalizeQuery(q);
  if (!n) return true;
  const buckets = detectSearchBuckets(n);
  if (buckets.length && !itemMatchesBuckets(item, buckets)) return false;
  const hay = [
    item.title,
    item.description,
    ...(item.breadcrumb ?? []),
    ...(item.matchTerms ?? []),
    ...(item.sku ? [item.sku] : []),
  ]
    .join(' ')
    .toLowerCase();
  const words = significantQueryWords(n);
  if (!words.length) return true;
  if (buckets.length) return words.some((w) => hay.includes(w));
  return words.every((w) => hay.includes(w));
}

export function relevanceScore(
  item: SearchResultItem,
  q: string,
  activeDemoUserTaxonomy: DemoUserTaxonomy | null
): number {
  const n = normalizeQuery(q);
  if (!n) return 0;
  const words = significantQueryWords(n);
  const title = item.title.toLowerCase();
  const desc = item.description.toLowerCase();
  const crumbs = (item.breadcrumb ?? []).join(' ').toLowerCase();
  const extra = (item.matchTerms ?? []).join(' ').toLowerCase();
  let score = 0;
  for (const w of words) {
    if (title.includes(w)) score += 5;
    if (desc.includes(w)) score += 2;
    if (crumbs.includes(w)) score += 1;
    if (extra.includes(w)) score += 3;
  }
  if (activeDemoUserTaxonomy && item.demoUserTaxonomy === activeDemoUserTaxonomy) score += 25;
  for (const b of detectSearchBuckets(n)) {
    if (item.searchBuckets.includes(b)) score += 8;
  }
  return score;
}

export function supplementalResultsForDemoUserTaxonomy(persona: DemoUserTaxonomy): SearchResultItem[] {
  const code =
    persona === 'Commercial Fleet Managers'
      ? 'cfm'
      : persona === 'Automotive Service Professionals'
        ? 'asp'
        : 'ihd';

  const rows: Omit<SearchResultItem, 'id' | 'demoUserTaxonomy'>[] =
    persona === 'Commercial Fleet Managers'
      ? [
          {
            title: 'Fleet quick path: oil drain intervals, uptime, and tri-fuel compatibility',
            description:
              'A fleet-focused view of Valvoline Premium Blue One Solution Gen 2, extended drain programs, and distributor support for mixed diesel and natural-gas fleets.',
            href: BLDR_BASE,
            contentType: 'service',
            categories: ['builderServices', 'manufacturedComponents'],
            brands: ['mybldr', 'buildersFirstSource'],
            searchBuckets: ['services', 'windows'],
            dateLabel: 'Personalized service',
            breadcrumb: ['Commercial', 'Fleet support'],
            matchTerms: ['fleet', 'uptime', 'drain interval', 'tri-fuel', 'diesel'],
            imageSrc: catalogDemoImage(0),
            isNew: true,
          },
          {
            title: 'Commercial lubricants: diesel engine oil, grease, and coolant programs',
            description:
              'Product pathways for fleet managers sourcing OEM-approved heavy duty lubricants with predictable procurement and specification support.',
            href: BLDR_BASE,
            contentType: 'product',
            categories: ['manufacturedComponents'],
            brands: ['buildersFirstSource', 'mybldr'],
            searchBuckets: ['products', 'windows'],
            priceLabel: 'Contact distributor',
            dateLabel: 'Product guide',
            breadcrumb: ['Products', 'Commercial fleet'],
            matchTerms: ['fleet', 'diesel', 'grease', 'coolant', 'commercial'],
            imageSrc: catalogDemoImage(1),
          },
        ]
      : persona === 'Automotive Service Professionals'
        ? [
            {
              title: 'Valvoline Product Finder for service bays',
              description:
                'Match the right motor oil, transmission fluid, and additives to year, make, model, and engine — built for quick recommendations at the counter or in the bay.',
              href: BLDR_BASE,
              contentType: 'content',
              categories: ['digitalTools'],
              brands: ['buildersFirstSource'],
              searchBuckets: ['mybldr', 'products'],
              dateLabel: 'Personalized tool',
              breadcrumb: ['Digital tools', 'Product Finder'],
              matchTerms: ['technician', 'service bay', 'vehicle lookup', 'recommendation', 'oil change'],
              imageSrc: catalogDemoImage(2),
              isNew: true,
            },
            {
              title: 'Restore & Protect for customer-facing engine protection stories',
              description:
              'Help shop owners explain how Valvoline Restore & Protect frees stuck piston rings and removes up to 100% of deposits — a differentiated upsell for high-mileage vehicles.',
              href: BLDR_BASE,
              contentType: 'product',
              categories: ['buildingMaterials', 'builderServices'],
              brands: ['readyFrame', 'buildersFirstSource'],
              searchBuckets: ['readyFrame', 'products'],
              priceLabel: 'Shop program',
              dateLabel: 'Personalized product',
              breadcrumb: ['Products', 'Restore & Protect'],
              matchTerms: ['technician', 'shop', 'deposits', 'piston rings', 'engine protection'],
              imageSrc: catalogDemoImage(3),
            },
          ]
        : [
            {
              title: 'Industrial operations: hydraulic fluids, gear oils, and plant reliability',
              description:
                'Specification support for manufacturing and heavy-duty operations coordinating lubrication programs across compressors, hydraulics, and production assets.',
              href: BLDR_BASE,
              contentType: 'service',
              categories: ['manufacturedComponents', 'builderServices'],
              brands: ['buildersFirstSource'],
              searchBuckets: ['advancedManufacturing', 'services'],
              dateLabel: 'Personalized enterprise',
              breadcrumb: ['Industrial', 'Operations support'],
              matchTerms: ['industrial', 'hydraulic', 'gear oil', 'plant', 'reliability'],
              imageSrc: catalogDemoImage(4),
              isNew: true,
            },
            {
              title: 'Data center liquid cooling: whitepaper and thermal management solutions',
              description:
                'Resources for operations teams preparing facilities for liquid cooling — including Valvoline Global and Gray expertise on next-phase data center growth.',
              href: BLDR_BASE,
              contentType: 'content',
              categories: ['resources', 'manufacturedComponents'],
              brands: ['buildersFirstSource'],
              searchBuckets: ['advancedManufacturing', 'services'],
              dateLabel: 'Personalized resource',
              breadcrumb: ['Industrial', 'Data centers'],
              matchTerms: ['data center', 'liquid cooling', 'thermal', 'industrial', 'operations'],
              imageSrc: catalogDemoImage(5),
            },
          ];

  return rows.map((row, i) => ({
    ...row,
    id: `demo-sup-${code}-${i + 1}`,
    demoUserTaxonomy: persona,
  }));
}

function result(partial: Omit<SearchResultItem, 'href'> & { href?: string }): SearchResultItem {
  return {
    href: partial.href ?? BLDR_BASE,
    imageSrc: partial.imageSrc ?? catalogDemoImage(6),
    ...partial,
  };
}

export const searchCatalog: SearchResultItem[] = [
  result({
    id: 'content-home-original-motor-oil',
    title: 'The Original Motor Oil — America\'s first motor oil brand',
    description:
      'Valvoline Global Operations carries forward 150+ years of innovation in engine protection, from personal vehicles to commercial fleets and industrial applications.',
    contentType: 'content',
    categories: ['resources', 'builderServices'],
    brands: ['buildersFirstSource'],
    searchBuckets: ['products', 'services'],
    dateLabel: 'Company overview',
    breadcrumb: ['Home', 'Valvoline Global'],
    matchTerms: ['original motor oil', 'heritage', 'innovation', 'engine protection', 'global operations'],
    imageSrc: catalogDemoImage(7),
  }),
  result({
    id: 'content-product-finder',
    title: 'Valvoline Product Finder — for personal vehicles',
    description:
      'Find the right Valvoline products for your vehicle with the Product Finder. Enter year, make, model, and engine to see motor oil and fluid recommendations.',
    href: BLDR_BASE,
    contentType: 'content',
    categories: ['digitalTools'],
    brands: ['buildersFirstSource'],
    searchBuckets: ['mybldr', 'products'],
    dateLabel: 'Digital tool',
    breadcrumb: ['Digital tools', 'Product Finder'],
    matchTerms: ['product finder', 'my vehicle', 'personal vehicles', 'recommendation', 'lookup'],
    imageSrc: catalogDemoImage(8),
    isNew: true,
  }),
  result({
    id: 'content-product-finder-results',
    title: 'Product Finder results: matched oils, fluids, and filters',
    description:
      'View recommended Valvoline motor oils, transmission fluids, and related products based on your vehicle profile — ready to purchase or specify for service.',
    href: BLDR_BASE,
    contentType: 'content',
    categories: ['digitalTools'],
    brands: ['buildersFirstSource'],
    searchBuckets: ['mybldr'],
    dateLabel: 'Tool feature',
    breadcrumb: ['Product Finder', 'Results'],
    matchTerms: ['results', 'matched products', 'motor oil', 'transmission fluid', 'vehicle profile'],
    imageSrc: catalogDemoImage(9),
  }),
  result({
    id: 'content-my-vehicle',
    title: 'My Vehicle: save profiles for faster product recommendations',
    description:
      'Store vehicle details for quick access to Valvoline product recommendations across oil changes, top-offs, and seasonal maintenance.',
    href: BLDR_BASE,
    contentType: 'content',
    categories: ['digitalTools', 'buildingMaterials'],
    brands: ['buildersFirstSource'],
    searchBuckets: ['mybldr', 'products'],
    dateLabel: 'Tool feature',
    breadcrumb: ['Product Finder', 'My Vehicle'],
    matchTerms: ['my vehicle', 'saved profile', 'maintenance', 'recommendations', 'oil change'],
    imageSrc: catalogDemoImage(10),
  }),
  result({
    id: 'content-distributor-locator',
    title: 'Find Valvoline products near you',
    description:
      'Locate distributors and retailers carrying Valvoline motor oils, fluids, and commercial lubricants for personal, fleet, and industrial needs.',
    href: BLDR_BASE,
    contentType: 'content',
    categories: ['digitalTools', 'resources'],
    brands: ['buildersFirstSource'],
    searchBuckets: ['mybldr', 'services'],
    dateLabel: 'Digital feature',
    breadcrumb: ['Support', 'Where to buy'],
    matchTerms: ['distributor', 'retailer', 'locator', 'near me', 'where to buy'],
    imageSrc: catalogDemoImage(11),
  }),

  result({
    id: 'product-restore-protect',
    title: 'Valvoline Restore & Protect™ motor oil',
    description:
      'The first motor oil proven to reverse one of the most common causes of engine failure by freeing stuck piston rings and removing up to 100% of deposits.',
    href: BLDR_BASE,
    contentType: 'product',
    categories: ['buildingMaterials'],
    brands: ['readyFrame', 'buildersFirstSource'],
    searchBuckets: ['products', 'readyFrame'],
    priceLabel: 'Retail & shop',
    dateLabel: 'Featured product',
    breadcrumb: ['Products', 'Restore & Protect'],
    matchTerms: ['restore & protect', 'deposits', 'piston rings', 'engine failure', 'high mileage'],
    imageSrc: catalogDemoImage(0),
    isNew: true,
  }),
  result({
    id: 'product-synpower',
    title: 'Valvoline SynPower™ full synthetic motor oil',
    description:
      'Advanced full synthetic protection for modern engines — helps extend engine life with superior wear protection and high-temperature stability.',
    href: BLDR_BASE,
    contentType: 'product',
    categories: ['buildingMaterials'],
    brands: ['designUltra', 'buildersFirstSource'],
    searchBuckets: ['products'],
    priceLabel: 'Retail availability',
    dateLabel: 'Product line',
    breadcrumb: ['Products', 'SynPower'],
    matchTerms: ['synpower', 'full synthetic', 'motor oil', 'wear protection', 'modern engines'],
    imageSrc: catalogDemoImage(1),
  }),
  result({
    id: 'product-maxlife',
    title: 'Valvoline MaxLife™ high-mileage motor oil',
    description:
      'Formulated for vehicles with 75,000+ miles — helps reduce leaks, deposits, and sludge while conditioning seals for aging engines.',
    href: BLDR_BASE,
    contentType: 'product',
    categories: ['buildingMaterials'],
    brands: ['buildersFirstSource'],
    searchBuckets: ['products', 'readyFrame'],
    priceLabel: 'Retail availability',
    dateLabel: 'Product line',
    breadcrumb: ['Products', 'MaxLife'],
    matchTerms: ['maxlife', 'high mileage', 'seals', 'deposits', 'sludge'],
    imageSrc: catalogDemoImage(2),
  }),
  result({
    id: 'product-conventional',
    title: 'Valvoline conventional motor oil',
    description:
      'Trusted everyday engine protection for standard oil-change intervals — part of the portfolio that made Valvoline America\'s first motor oil brand.',
    href: BLDR_BASE,
    contentType: 'product',
    categories: ['buildingMaterials'],
    brands: ['buildersFirstSource'],
    searchBuckets: ['products'],
    priceLabel: 'Retail availability',
    dateLabel: 'Product line',
    breadcrumb: ['Products', 'Conventional motor oil'],
    matchTerms: ['conventional', 'motor oil', 'oil change', 'everyday protection'],
    imageSrc: catalogDemoImage(3),
  }),
  result({
    id: 'product-premium-blue-gen2',
    title: 'Valvoline Premium Blue One Solution Gen 2',
    description:
      'First OEM-approved, tri-fuel engine oil engineered for up to a 25,000-mile oil drain interval extension — built for uptime and operational efficiency.',
    href: BLDR_BASE,
    contentType: 'product',
    categories: ['manufacturedComponents'],
    brands: ['mybldr', 'buildersFirstSource'],
    searchBuckets: ['products', 'windows', 'advancedManufacturing'],
    priceLabel: 'Commercial program',
    dateLabel: 'Featured product',
    breadcrumb: ['Products', 'Premium Blue One Solution Gen 2'],
    matchTerms: ['premium blue', 'tri-fuel', 'drain interval', 'OEM-approved', 'diesel'],
    imageSrc: catalogDemoImage(4),
    isNew: true,
  }),
  result({
    id: 'product-heavy-duty-diesel',
    title: 'Valvoline heavy duty diesel engine oils',
    description:
      'Commercial-grade diesel lubricants for on-highway and off-highway fleets — specification support for mixed fleets and extended service intervals.',
    href: BLDR_BASE,
    contentType: 'product',
    categories: ['manufacturedComponents'],
    brands: ['buildersFirstSource', 'mybldr'],
    searchBuckets: ['products', 'windows'],
    priceLabel: 'Contact distributor',
    dateLabel: 'Product category',
    breadcrumb: ['Products', 'Heavy duty diesel'],
    matchTerms: ['heavy duty', 'diesel', 'fleet', 'commercial', 'on-highway'],
    imageSrc: catalogDemoImage(5),
  }),
  result({
    id: 'product-transmission-fluid',
    title: 'Valvoline transmission fluids',
    description:
      'Automatic and manual transmission fluids formulated for smooth shifting, wear protection, and compatibility with modern transmission designs.',
    href: BLDR_BASE,
    contentType: 'product',
    categories: ['windowsDoorsMillwork'],
    brands: ['buildersFirstSource'],
    searchBuckets: ['products'],
    priceLabel: 'Retail availability',
    dateLabel: 'Product category',
    breadcrumb: ['Products', 'Transmission fluids'],
    matchTerms: ['transmission fluid', 'ATF', 'manual transmission', 'shifting', 'wear protection'],
    imageSrc: catalogDemoImage(6),
  }),
  result({
    id: 'product-coolant',
    title: 'Valvoline antifreeze and engine coolant',
    description:
      'Coolants for passenger vehicles and heavy duty applications — corrosion protection and temperature control for year-round engine reliability.',
    href: BLDR_BASE,
    contentType: 'product',
    categories: ['windowsDoorsMillwork', 'manufacturedComponents'],
    brands: ['buildersFirstSource'],
    searchBuckets: ['products'],
    priceLabel: 'Retail & commercial',
    dateLabel: 'Product category',
    breadcrumb: ['Products', 'Coolants'],
    matchTerms: ['coolant', 'antifreeze', 'corrosion', 'temperature', 'engine cooling'],
    imageSrc: catalogDemoImage(7),
  }),
  result({
    id: 'product-brake-fluid',
    title: 'Valvoline brake fluid',
    description:
      'Brake fluids meeting DOT specifications for responsive braking performance and moisture resistance in daily driving and service environments.',
    href: BLDR_BASE,
    contentType: 'product',
    categories: ['windowsDoorsMillwork'],
    brands: ['buildersFirstSource'],
    searchBuckets: ['products'],
    priceLabel: 'Retail availability',
    dateLabel: 'Product category',
    breadcrumb: ['Products', 'Brake fluid'],
    matchTerms: ['brake fluid', 'DOT', 'braking', 'moisture resistance'],
    imageSrc: catalogDemoImage(8),
  }),

  result({
    id: 'service-fleet-programs',
    title: 'Commercial fleet lubrication programs',
    description:
      'Valvoline supports fleet operators with specification guidance, drain interval optimization, and products engineered for uptime across mixed fuel types.',
    href: BLDR_BASE,
    contentType: 'service',
    categories: ['builderServices', 'manufacturedComponents'],
    brands: ['mybldr', 'buildersFirstSource'],
    searchBuckets: ['services', 'windows'],
    dateLabel: 'Service',
    breadcrumb: ['Services', 'Fleet programs'],
    matchTerms: ['fleet program', 'commercial', 'drain interval', 'uptime', 'specification'],
    imageSrc: catalogDemoImage(9),
  }),
  result({
    id: 'service-technical-support',
    title: 'Technical support and lubricant specification',
    description:
      'Expert assistance for matching Valvoline products to OEM requirements, operating conditions, and maintenance schedules across automotive and industrial use.',
    href: BLDR_BASE,
    contentType: 'service',
    categories: ['builderServices'],
    brands: ['buildersFirstSource'],
    searchBuckets: ['services'],
    dateLabel: 'Service',
    breadcrumb: ['Services', 'Technical support'],
    matchTerms: ['technical support', 'specification', 'OEM', 'lubricant engineer', 'recommendation'],
    imageSrc: catalogDemoImage(10),
  }),
  result({
    id: 'service-distributor-network',
    title: 'Distributor and channel partner network',
    description:
      'Connect with Valvoline distributors and retail partners for product availability, bulk programs, and commercial account support.',
    href: BLDR_BASE,
    contentType: 'service',
    categories: ['builderServices', 'digitalTools'],
    brands: ['buildersFirstSource'],
    searchBuckets: ['services', 'mybldr'],
    dateLabel: 'Service',
    breadcrumb: ['Services', 'Distributor network'],
    matchTerms: ['distributor', 'channel partner', 'bulk', 'commercial account', 'availability'],
    imageSrc: catalogDemoImage(11),
  }),
  result({
    id: 'service-shop-training',
    title: 'Shop and technician training resources',
    description:
      'Educational content for service professionals covering product selection, change intervals, customer communication, and upsell opportunities.',
    href: BLDR_BASE,
    contentType: 'service',
    categories: ['builderServices', 'resources'],
    brands: ['buildersFirstSource'],
    searchBuckets: ['services'],
    dateLabel: 'Service',
    breadcrumb: ['Services', 'Training'],
    matchTerms: ['training', 'technician', 'shop', 'education', 'service professional'],
    imageSrc: catalogDemoImage(0),
  }),
  result({
    id: 'service-industrial-consulting',
    title: 'Industrial lubrication consulting',
    description:
      'Support for plant reliability teams evaluating hydraulic fluids, gear oils, compressors, and specialty lubricants for manufacturing operations.',
    href: BLDR_BASE,
    contentType: 'service',
    categories: ['builderServices', 'manufacturedComponents'],
    brands: ['buildersFirstSource'],
    searchBuckets: ['services', 'advancedManufacturing'],
    dateLabel: 'Service',
    breadcrumb: ['Services', 'Industrial consulting'],
    matchTerms: ['industrial', 'consulting', 'hydraulic', 'gear oil', 'plant reliability'],
    imageSrc: catalogDemoImage(1),
    isNew: true,
  }),
  result({
    id: 'service-warranty-programs',
    title: 'Engine protection and warranty-aligned programs',
    description:
      'Program guidance for shops and fleets aligning lubricant choices with OEM warranty requirements and documented maintenance records.',
    href: BLDR_BASE,
    contentType: 'service',
    categories: ['builderServices'],
    brands: ['buildersFirstSource'],
    searchBuckets: ['services', 'products'],
    dateLabel: 'Service',
    breadcrumb: ['Services', 'Warranty programs'],
    matchTerms: ['warranty', 'OEM', 'maintenance records', 'engine protection', 'program'],
    imageSrc: catalogDemoImage(2),
  }),
  result({
    id: 'service-data-center',
    title: 'Data center thermal management partnerships',
    description:
      'Collaborative solutions for liquid cooling and thermal management as data centers scale — including expertise shared with partners like Gray.',
    href: BLDR_BASE,
    contentType: 'service',
    categories: ['builderServices', 'manufacturedComponents'],
    brands: ['buildersFirstSource'],
    searchBuckets: ['services', 'advancedManufacturing'],
    dateLabel: 'Service',
    breadcrumb: ['Services', 'Data center solutions'],
    matchTerms: ['data center', 'liquid cooling', 'thermal management', 'partnership', 'Gray'],
    imageSrc: catalogDemoImage(3),
  }),
  result({
    id: 'service-sustainability',
    title: 'Sustainability and responsible operations',
    description:
      'Valvoline Global Operations initiatives around responsible manufacturing, product stewardship, and supporting the technicians who keep the world moving.',
    href: BLDR_BASE,
    contentType: 'service',
    categories: ['builderServices', 'resources'],
    brands: ['buildersFirstSource'],
    searchBuckets: ['services'],
    dateLabel: 'Service',
    breadcrumb: ['Services', 'Sustainability'],
    matchTerms: ['sustainability', 'stewardship', 'responsible', 'technicians', 'operations'],
    imageSrc: catalogDemoImage(4),
  }),

  result({
    id: 'blog-restore-protect-breakthrough',
    title: 'Valvoline Restore & Protect: industry-first engine recovery innovation',
    description:
      'Valvoline Global Operations builds on its legacy with a breakthrough motor oil proven to free stuck piston rings and maximize engine life.',
    href: BLDR_BASE,
    contentType: 'blog',
    categories: ['buildingMaterials', 'resources'],
    brands: ['readyFrame', 'buildersFirstSource'],
    searchBuckets: ['readyFrame', 'products'],
    dateLabel: 'Newsroom',
    breadcrumb: ['Newsroom', 'Restore & Protect'],
    matchTerms: ['restore & protect', 'breakthrough', 'piston rings', 'engine failure', 'innovation'],
    imageSrc: catalogDemoImage(5),
  }),
  result({
    id: 'blog-premium-blue-gen2',
    title: 'Premium Blue One Solution Gen 2 sets new benchmark for engine protection',
    description:
      'First OEM-approved, tri-fuel engine oil delivers up to a 25,000-mile oil drain interval extension for improved uptime and operational efficiency.',
    href: BLDR_BASE,
    contentType: 'blog',
    categories: ['manufacturedComponents', 'resources'],
    brands: ['mybldr', 'buildersFirstSource'],
    searchBuckets: ['windows', 'advancedManufacturing'],
    dateLabel: 'Newsroom',
    breadcrumb: ['Newsroom', 'Premium Blue Gen 2'],
    matchTerms: ['premium blue', 'tri-fuel', 'drain interval', 'uptime', 'operational efficiency'],
    imageSrc: catalogDemoImage(6),
  }),
  result({
    id: 'blog-fifa-world-cup',
    title: 'Valvoline celebrates every fan\'s road to FIFA World Cup 2026™',
    description:
      'The Original Motor Oil brand powers the fans driven to be part of the world\'s biggest stage — and the mechanics who make every mile possible.',
    href: BLDR_BASE,
    contentType: 'blog',
    categories: ['resources'],
    brands: ['buildersFirstSource'],
    searchBuckets: ['services'],
    dateLabel: 'Campaign',
    breadcrumb: ['Newsroom', 'FIFA World Cup 2026'],
    matchTerms: ['FIFA', 'world cup', 'campaign', 'fans', 'mechanics'],
    imageSrc: catalogDemoImage(7),
  }),
  result({
    id: 'blog-female-mechanics',
    title: 'Empowering the female mechanics of tomorrow',
    description:
      'Addressing the projected worldwide shortage of 4.3 million skilled technicians by 2030 — supporting the professionals who keep vehicles moving.',
    href: BLDR_BASE,
    contentType: 'blog',
    categories: ['resources', 'builderServices'],
    brands: ['buildersFirstSource'],
    searchBuckets: ['services'],
    dateLabel: 'Newsroom',
    breadcrumb: ['Newsroom', 'Technician workforce'],
    matchTerms: ['female mechanics', 'technician shortage', 'workforce', 'skilled technicians', '2030'],
    imageSrc: catalogDemoImage(8),
  }),
  result({
    id: 'blog-data-center-whitepaper',
    title: 'Designing data centers for the shift to liquid cooling',
    description:
      'Whitepaper detailing how Valvoline Global and Gray combine expertise to prepare data centers for the next phase of growth and thermal demand.',
    href: BLDR_BASE,
    contentType: 'blog',
    categories: ['manufacturedComponents', 'resources'],
    brands: ['buildersFirstSource'],
    searchBuckets: ['advancedManufacturing'],
    dateLabel: 'Whitepaper',
    breadcrumb: ['Resources', 'Data center cooling'],
    matchTerms: ['data center', 'liquid cooling', 'whitepaper', 'Gray', 'thermal'],
    imageSrc: catalogDemoImage(9),
  }),
  result({
    id: 'blog-synthetic-vs-conventional',
    title: 'Synthetic vs conventional motor oil: choosing for your vehicle',
    description:
      'Guidance for drivers and service professionals on when full synthetic, synthetic blend, or conventional oils best match driving conditions and OEM recommendations.',
    href: BLDR_BASE,
    contentType: 'blog',
    categories: ['buildingMaterials', 'resources'],
    brands: ['buildersFirstSource', 'designUltra'],
    searchBuckets: ['products'],
    dateLabel: 'Related article',
    breadcrumb: ['Resources', 'Motor oil guides'],
    matchTerms: ['synthetic', 'conventional', 'motor oil guide', 'OEM', 'driving conditions'],
    imageSrc: catalogDemoImage(10),
  }),
  result({
    id: 'blog-extended-drain',
    title: 'Extended drain intervals: what fleet managers should evaluate',
    description:
      'Factors for commercial fleets considering longer oil drain programs — fuel type, duty cycle, OEM approvals, and total cost of ownership.',
    href: BLDR_BASE,
    contentType: 'blog',
    categories: ['manufacturedComponents', 'resources'],
    brands: ['mybldr', 'buildersFirstSource'],
    searchBuckets: ['windows', 'services'],
    dateLabel: 'Related article',
    breadcrumb: ['Resources', 'Fleet management'],
    matchTerms: ['extended drain', 'fleet manager', 'duty cycle', 'total cost of ownership', 'OEM approval'],
    imageSrc: catalogDemoImage(11),
  }),
  result({
    id: 'content-driven-to-protect',
    title: 'Driven to protect every engine, every mile',
    description:
      'From personal vehicles to global fleets and industrial operations, Valvoline delivers lubrication solutions backed by innovation and proven performance.',
    href: BLDR_BASE,
    contentType: 'content',
    categories: ['resources', 'builderServices'],
    brands: ['buildersFirstSource'],
    searchBuckets: ['services', 'products'],
    dateLabel: 'Homepage content',
    breadcrumb: ['Home', 'Solutions overview'],
    matchTerms: ['every engine', 'every mile', 'lubrication solutions', 'innovation', 'performance'],
    imageSrc: catalogDemoImage(0),
  }),
  result({
    id: 'content-products-overview',
    title: 'Our products: motor oils, fluids, and commercial lubricants',
    description:
      'Valvoline offers a full portfolio from Restore & Protect and SynPower to Premium Blue and industrial fluids — find the right product for every application.',
    href: BLDR_BASE,
    contentType: 'content',
    categories: ['buildingMaterials'],
    brands: ['buildersFirstSource'],
    searchBuckets: ['products'],
    dateLabel: 'Product overview',
    breadcrumb: ['Products', 'Overview'],
    matchTerms: ['motor oil portfolio', 'fluids', 'commercial lubricants', 'applications', 'product lines'],
    imageSrc: catalogDemoImage(1),
  }),
  result({
    id: 'content-services-overview',
    title: 'Our services: support you can count on',
    description:
      'Valvoline technical services, fleet programs, distributor support, and training help customers specify, procure, and maintain the right lubrication programs.',
    href: BLDR_BASE,
    contentType: 'content',
    categories: ['builderServices'],
    brands: ['buildersFirstSource'],
    searchBuckets: ['services'],
    dateLabel: 'Service overview',
    breadcrumb: ['Services', 'Overview'],
    matchTerms: ['technical services', 'fleet programs', 'distributor support', 'training', 'lubrication programs'],
    imageSrc: catalogDemoImage(2),
  }),
];

export const contentTypes = Object.keys(searchFacetLabels.contentType) as SearchContentType[];
export const categories = Object.keys(searchFacetLabels.category) as SearchCategory[];
export const brands = Object.keys(searchFacetLabels.brand) as SearchBrand[];

function insightKey(buckets: SearchBucket[], user: DemoUserTaxonomy | null): string {
  const b = [...buckets].sort().join('|') || 'browse';
  const u = user ?? 'any';
  return `${b}::${u}`;
}

export function selectAiSearchInsight(query: string, user: DemoUserTaxonomy | null): AiSearchInsight | null {
  const n = normalizeQuery(query);
  if (n.length < 2) return null;
  const buckets = detectSearchBuckets(n);
  const key = insightKey(buckets, user);

  const personaHint =
    user === 'Commercial Fleet Managers'
      ? 'Prioritize Premium Blue, drain interval programs, and commercial specification support.'
      : user === 'Automotive Service Professionals'
        ? 'Use the Product Finder and Restore & Protect content to support bay recommendations and customer conversations.'
        : user === 'Industrial & Heavy Duty Operations'
          ? 'Look for hydraulic fluids, data center cooling resources, and industrial consulting services.'
          : 'Use facets to compare products, services, news, and content by application.';

  if (buckets.includes('mybldr')) {
    return {
      id: `ai-finder-${key}`,
      headline: 'AI suggestion — start with the Valvoline Product Finder',
      body:
        'The Product Finder helps match motor oils and fluids to year, make, model, and engine — ideal for personal vehicle owners and service professionals.',
      bullets: [
        personaHint,
        'Open Product Finder results for matched oils, transmission fluids, and related products',
        'Save vehicles in My Vehicle for faster repeat recommendations',
      ],
      learnMoreHref: BLDR_BASE,
      learnMoreLabel: 'Open Product Finder',
    };
  }

  if (buckets.includes('readyFrame') || buckets.includes('advancedManufacturing')) {
    return {
      id: `ai-innovation-${key}`,
      headline: 'AI suggestion — explore breakthrough protection and industrial solutions',
      body:
        'Restore & Protect and industrial content are strong matches when the goal is engine recovery, deposit removal, or operations-scale lubrication.',
      bullets: [
        personaHint,
        'Filter to Motor oil & engine lubricants for Restore & Protect and SynPower lines',
        'Pair product results with Data center cooling or Industrial consulting services when applicable',
      ],
      learnMoreHref: BLDR_BASE,
      learnMoreLabel: 'View innovation content',
    };
  }

  if (buckets.includes('windows')) {
    return {
      id: `ai-fleet-${key}`,
      headline: 'AI suggestion — combine commercial products with fleet programs',
      body:
        'Fleet and heavy duty searches should include Premium Blue, diesel engine oils, and fleet lubrication program services.',
      bullets: [
        personaHint,
        'Use Heavy duty & commercial for Premium Blue and diesel product categories',
        'Add Commercial fleet lubrication programs or Extended drain interval articles for program planning',
      ],
      learnMoreHref: BLDR_BASE,
      learnMoreLabel: 'Browse commercial products',
    };
  }

  if (buckets.includes('services')) {
    return {
      id: `ai-services-${key}`,
      headline: 'AI suggestion — map the service to your operating context',
      body:
        'Valvoline services span technical support, fleet programs, distributor networks, training, industrial consulting, and data center partnerships.',
      bullets: [
        personaHint,
        'Use Technical services & support for specification and program needs',
        'Use Product finder & digital tools when the need includes vehicle lookup or product recommendations',
      ],
      learnMoreHref: BLDR_BASE,
      learnMoreLabel: 'View services',
    };
  }

  if (buckets.includes('products')) {
    return {
      id: `ai-products-${key}`,
      headline: 'AI suggestion — confirm the right product line early',
      body:
        'Valvoline product selection depends on vehicle type, mileage, fuel, and operating conditions — use the Product Finder or technical support to validate.',
      bullets: [
        personaHint,
        'Filter by Motor oil & engine lubricants for Restore & Protect, SynPower, MaxLife, and conventional oils',
        'Filter by Heavy duty & commercial for Premium Blue and diesel lubricants',
      ],
      learnMoreHref: BLDR_BASE,
      learnMoreLabel: 'View products',
    };
  }

  return {
    id: `ai-gen-${key}`,
    headline: 'AI suggestion — refine by products, services, news, or content',
    body:
      'This Valvoline Global mock catalog combines motor oils, fluids, commercial lubricants, Product Finder tools, newsroom stories, and technical services.',
    bullets: [
      'Try popular searches such as Restore & Protect, Premium Blue, Product Finder, or Data Center Cooling',
      'Switch the demo persona to personalize result ordering and supplemental rows',
    ],
    learnMoreHref: BLDR_BASE,
    learnMoreLabel: 'Visit valvolineglobal.com',
  };
}

export function itemMetadataLine(item: SearchResultItem): string {
  const type = searchFacetLabels.contentType[item.contentType];
  const when = item.dateLabel ?? (item.contentType === 'product' ? 'Product line' : 'Resource');
  const trail = item.breadcrumb?.length ? item.breadcrumb.join(' · ') : '';
  const sku = item.sku ? `SKU ${item.sku}` : '';
  const bits = [type, when, sku, trail].filter(Boolean);
  return bits.join(' · ');
}
