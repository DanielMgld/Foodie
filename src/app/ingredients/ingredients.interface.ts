export interface Option {
    q: string;
    price: string;
  }
  
  export interface Ingredient {
    id: string;
    name: string;
    img?: string;
    options: Option[];
  }
  
  export interface Recipe{
      name: string;
      img: string;
      ingredients: {id: string; q: string}[];
  }