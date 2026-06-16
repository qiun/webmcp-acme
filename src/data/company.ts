export interface Product {
  name: string;
  description: string;
  priceFrom: number;
  currency: 'PLN';
}

export interface Company {
  name: string;
  tagline: string;
  about: string;
  mission: string;
  location: string;
  contact: {
    phone: string;
    email: string;
    address: string;
    hours: string;
  };
  products: Product[];
}

export const company: Company = {
  name: 'ACME Inc.',
  tagline: 'We design solutions that simply work.',
  about:
    'ACME designs and sells tools and components for businesses — from automation to workshop accessories. We combine solid engineering with effortless usability.',
  mission:
    'Our mission is to deliver reliable products that save our customers time and money.',
  location: 'Krakow, Poland',
  contact: {
    phone: '+48 12 345 67 89',
    email: 'contact@acme.example',
    address: '1 Example Street, 30-001 Krakow',
    hours: 'Mon–Fri 9:00–17:00',
  },
  products: [
    {
      name: 'ACME Bolt 200',
      description: 'Universal mounting set for industrial applications.',
      priceFrom: 199,
      currency: 'PLN',
    },
    {
      name: 'ACME Drive X',
      description: 'Stepper motor controller with easy configuration.',
      priceFrom: 749,
      currency: 'PLN',
    },
    {
      name: 'ACME Sensor Kit',
      description: 'Sensor bundle (temperature, humidity, motion).',
      priceFrom: 329,
      currency: 'PLN',
    },
    {
      name: 'ACME Hub Mini',
      description: 'Compact I/O hub for home automation.',
      priceFrom: 459,
      currency: 'PLN',
    },
    {
      name: 'ACME Power 60',
      description: '60 W bench power supply with adjustable voltage.',
      priceFrom: 599,
      currency: 'PLN',
    },
    {
      name: 'ACME Toolbox Pro',
      description: 'Workshop case with modular inserts.',
      priceFrom: 279,
      currency: 'PLN',
    },
    {
      name: 'ACME Cable Set',
      description: 'Complete set of test leads in a carrying case.',
      priceFrom: 89,
      currency: 'PLN',
    },
    {
      name: 'ACME Support Plus',
      description: 'Annual technical support and service package.',
      priceFrom: 1200,
      currency: 'PLN',
    },
  ],
};
