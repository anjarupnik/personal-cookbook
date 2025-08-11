export interface Recipe {
  name: string;
  photo: string;
  link: string;
  timeToPrepare: string;
  servings: number;
  slug: string;
  shortDescription: string;
  tags: string[];
  ingredients: string[];
  instructions: string[];
}
