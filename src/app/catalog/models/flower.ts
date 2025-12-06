export interface Flower {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  images: string[];
  size: string;
  colors: string[];
  occasion: string;
  careInstructions?: string;
}
