import { Category } from './category';

export class Restaurant {
    alias: string;
    name: string;
    image_url: string;
    url: string;
    categories: Category[];
    rating: number;
    transactions: string[];
    price: string;
    distance: number;
}

export class Restaurants {
  businesses: Restaurant[];
}
