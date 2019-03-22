export class Category {
    alias: string;
    title: string;
    parent_aliases: string[];
}

export interface Categories {
  categories: Category[];
}

