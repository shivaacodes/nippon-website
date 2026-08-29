import type { VehicleFilter, VehicleSummary } from './vehicleTypes';

function priceInLakhs(value: string) {
  const match = value.replace(/,/g, '').match(/([0-9]+(?:\.[0-9]+)?)/);
  if (!match) return Number.POSITIVE_INFINITY;
  const number = Number(match[1]);
  return value.toLowerCase().includes('crore') ? number * 100 : number;
}

export function filterVehicles(vehicles: VehicleSummary[], filter: VehicleFilter) {
  const query = filter.query.trim().toLowerCase();

  return vehicles.filter((vehicle) => {
    const matchesQuery = !query || `${vehicle.name} ${vehicle.fullName} ${vehicle.category.join(' ')}`.toLowerCase().includes(query);
    const matchesCategory = filter.categories.length === 0 || filter.categories.some((category) => vehicle.category.includes(category));
    const fuels = vehicle.variants.map((variant) => variant.fuel.toLowerCase());
    const matchesFuel = filter.fuelTypes.length === 0 || filter.fuelTypes.some((fuel) => fuels.some((value) => value.includes(fuel.toLowerCase())));
    const matchesPrice = !filter.maxPriceLakhs || priceInLakhs(vehicle.basePrice) <= filter.maxPriceLakhs;
    const matchesSeats = !filter.seating || vehicle.specs.some((spec) => spec.label.toLowerCase() === 'seating' && spec.value.includes(String(filter.seating)));
    return matchesQuery && matchesCategory && matchesFuel && matchesPrice && matchesSeats;
  });
}

export function compareVehicles(vehicles: VehicleSummary[], slugs: string[]) {
  return slugs.slice(0, 3).map((slug) => vehicles.find((vehicle) => vehicle.slug === slug)).filter((vehicle): vehicle is VehicleSummary => Boolean(vehicle));
}

