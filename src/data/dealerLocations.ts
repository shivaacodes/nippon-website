export type DealerLocation = {
  id: string;
  city: string;
  name: string;
  type: 'showroom' | 'service' | 'body-paint' | 'u-trust';
  address: string;
  phone: string;
  email: string;
  salesHours: string;
  serviceHours: string;
  mapQuery: string;
};

export const dealerLocations: DealerLocation[] = [
  {
    id: 'cochin-kalamassery',
    city: 'Cochin',
    name: 'Kalamassery Showroom & Service Center',
    type: 'showroom',
    address: 'XIX/9C, Nippon Towers, NH 544, HMT Junction, Kalamassery, Cochin - 683104',
    phone: '+91 48471 70000',
    email: 'salesinfo@nippontoyota.com',
    salesHours: '09:00 AM - 07:00 PM, all days',
    serviceHours: '09:00 AM - 06:00 PM, Sunday holiday',
    mapQuery: 'Nippon Toyota Kalamassery Cochin',
  },
  {
    id: 'cochin-nettoor',
    city: 'Cochin',
    name: 'Nettoor Showroom & Service Center',
    type: 'showroom',
    address: 'Nippon Toyota, Nettoor P.O., Cochin, Kerala',
    phone: '+91 97447 12345',
    email: 'salesinfo@nippontoyota.com',
    salesHours: '09:00 AM - 07:00 PM, all days',
    serviceHours: '09:00 AM - 06:00 PM, Sunday holiday',
    mapQuery: 'Nippon Toyota Nettoor Cochin',
  },
  {
    id: 'trivandrum-showroom',
    city: 'Trivandrum',
    name: 'Trivandrum Showroom & Service Center',
    type: 'showroom',
    address: 'NH Bypass, Attinkuzhi, Kazhakuttom P.O., Trivandrum - 695582',
    phone: '+91 97447 12345',
    email: 'salesinfo@nippontoyota.com',
    salesHours: '09:00 AM - 07:00 PM, all days',
    serviceHours: '09:00 AM - 06:00 PM, Sunday holiday',
    mapQuery: 'Nippon Toyota Kazhakuttom Trivandrum',
  },
  {
    id: 'thrissur',
    city: 'Thrissur',
    name: 'Thrissur Showroom & Service Center',
    type: 'showroom',
    address: 'NH Bypass Road, Nettor P.O., Thrissur, Kerala',
    phone: '+91 97447 12345',
    email: 'salesinfo@nippontoyota.com',
    salesHours: '09:00 AM - 07:00 PM, all days',
    serviceHours: '09:00 AM - 06:00 PM, Sunday holiday',
    mapQuery: 'Nippon Toyota Thrissur',
  },
  {
    id: 'kottayam',
    city: 'Kottayam',
    name: 'Kottayam Showroom & Service Center',
    type: 'showroom',
    address: 'MC Road, Nattakom, Kottayam, Kerala',
    phone: '+91 97447 12345',
    email: 'salesinfo@nippontoyota.com',
    salesHours: '09:00 AM - 07:00 PM, all days',
    serviceHours: '09:00 AM - 06:00 PM, Sunday holiday',
    mapQuery: 'Nippon Toyota Kottayam',
  },
  {
    id: 'kollam',
    city: 'Kollam',
    name: 'Kollam Showroom & Service Center',
    type: 'showroom',
    address: 'Parakkulam Junction, Kottiyam, NH Road, Kollam - 691571',
    phone: '+91 97447 12345',
    email: 'salesinfo@nippontoyota.com',
    salesHours: '09:00 AM - 07:00 PM, all days',
    serviceHours: '09:00 AM - 06:00 PM, Sunday holiday',
    mapQuery: 'Nippon Toyota Kollam',
  },
  {
    id: 'service-ernakulam',
    city: 'Ernakulam',
    name: 'Ernakulam Service Center',
    type: 'service',
    address: 'Nippon Toyota Service Center, Ernakulam, Kochi, Kerala',
    phone: '+91 48471 70000',
    email: 'service@nippontoyota.com',
    salesHours: 'Not applicable',
    serviceHours: '09:00 AM - 06:00 PM, Sunday holiday',
    mapQuery: 'Nippon Toyota Service Center Ernakulam',
  },
  {
    id: 'trivandrum-body-paint',
    city: 'Trivandrum',
    name: 'Service & Body Paint',
    type: 'body-paint',
    address: 'Nippon Toyota Body & Paint, Trivandrum, Kerala',
    phone: '+91 97447 12345',
    email: 'service@nippontoyota.com',
    salesHours: 'Not applicable',
    serviceHours: '09:00 AM - 06:00 PM, Sunday holiday',
    mapQuery: 'Nippon Toyota body paint Trivandrum',
  },
  {
    id: 'u-trust-cochin',
    city: 'Cochin',
    name: 'Nippon U-Trust',
    type: 'u-trust',
    address: 'Nippon U-Trust, Kalamassery, Cochin, Kerala',
    phone: '+91 97447 12345',
    email: 'salesinfo@nippontoyota.com',
    salesHours: '09:00 AM - 07:00 PM, all days',
    serviceHours: 'Not applicable',
    mapQuery: 'Nippon U Trust Cochin',
  },
];
