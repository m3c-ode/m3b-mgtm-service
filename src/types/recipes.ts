import { BeerData } from "./beers";

export type RecipesTableProps = {
    data?: RecipeData[];
    isLoading: boolean;
    title?: () => JSX.Element;
};

export type RecipeData = {
    _id: string;
    beer: BeerData;
    domain?: string;
    grains: any;
    hops: any;
};