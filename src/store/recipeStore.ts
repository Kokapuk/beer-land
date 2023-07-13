import { create } from 'zustand';

export interface Method {
  temp: {
    value: number;
    unit: string;
  };
  duration?: number;
}

export interface Magnitude {
  value: number;
  unit: string;
}

export interface Ingredient {
  name: string;
  amount: Magnitude;
  add?: string;
  attribute?: string;
}

export interface Recipe {
  id: number;
  name: string;
  tagline: string;
  first_brewed: string;
  description: string;
  image_url: string;
  abv: number;
  srm: number;
  ph: number;
  attenuation_level: number;
  volume: Magnitude;
  boil_volume: Magnitude;
  method: {
    mash_temp: Method[];
    fermentation: Method;
    twist: string | null;
  };
  ingredients: {
    malt: Ingredient[];
    hops: Ingredient[];
    yeast: string;
  };
  food_pairing: string[];
  brewers_tips: string;
  contributed_by: string;
}

interface RecipeState {
  recipes: Recipe[];
  add: (recipes: Recipe[]) => void;
  remove: (ids: number[]) => void;
}

export const useRecipeStore = create<RecipeState>()((set) => ({
  recipes: [],
  add: (recipes) => set((state) => ({ recipes: [...state.recipes, ...recipes] })),
  remove: (ids) => set((state) => ({ recipes: state.recipes.filter((recipe) => !ids.includes(recipe.id)) })),
}));
