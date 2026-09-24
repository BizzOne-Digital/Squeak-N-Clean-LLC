// Service names and descriptions are taken from the PRD.
export type Service = { name: string; description: string }

export const residentialServices: Service[] = [
  { name: 'Residential House Washing', description: 'Exterior house washing designed to remove accumulated dirt and buildup and improve the appearance of residential properties.' },
  { name: 'Driveway and Sidewalk Cleaning', description: 'Cleaning services for concrete driveways, walkways, sidewalks, and similar exterior surfaces.' },
  { name: 'Roof Soft Washing', description: 'A soft-washing service intended for appropriate roof surfaces where traditional high-pressure cleaning may not be suitable.' },
  { name: 'Fence and Deck Restoration', description: 'Exterior cleaning and restoration services for fences and decks.' },
  { name: 'Gutter Brightening', description: 'Exterior gutter cleaning and brightening designed to improve the appearance of gutters and remove visible staining and buildup.' },
  { name: 'Patio Cleaning', description: 'Cleaning for patios and outdoor living areas.' },
]

export const commercialServices: Service[] = [
  { name: 'Commercial Building Washing', description: 'Exterior cleaning for commercial properties and buildings.' },
  { name: 'Storefront Cleaning', description: 'Cleaning services intended to keep storefront exteriors presentable and customer-ready.' },
  { name: 'Parking Lot Cleaning', description: 'Exterior cleaning for parking areas and associated surfaces.' },
  { name: 'Fleet and Heavy Equipment Washing', description: 'Cleaning services for commercial fleets, vehicles, machinery, and heavy equipment.' },
  { name: 'Dumpster Pad Cleaning', description: 'Cleaning and maintenance of dumpster pad areas.' },
  { name: 'HOA and Apartment Community Maintenance', description: 'Exterior cleaning and ongoing maintenance support for HOAs, apartment communities, and similar managed properties.' },
]

export const audiences = [
  'Homeowners',
  'Property management companies',
  'Apartment complexes',
  'Restaurants',
  'Retail centers',
  'Office buildings',
  'Churches',
  'Schools',
  'Government facilities',
  'Construction companies',
  'Real estate agents',
  'HOAs',
]
