import { Product } from "../generated/graphql-types";

export interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  imgUrl: string;
  price: number;
}
export type EditProductModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (arg: boolean) => void;
  product: ProductCardProps;
};

export type EditProductRowProps = {
  product: ProductCardProps;
};

export type ArticleProps = {
  id: string;
  availability: boolean;
};

export interface EditProductFormProps {
  product: Product;
  setIsModalOpen: (arg: boolean) => void;
}

export interface EditProductFormValues {
  name: string;
  imgUrl: string;
  price: string;
  description: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface NewArticleFormValues {
  availability: string;
  productId: string;
}

export interface NewProductFormValues {
  name: string;
  imgUrl: string;
  price: string;
  description: string;
}
