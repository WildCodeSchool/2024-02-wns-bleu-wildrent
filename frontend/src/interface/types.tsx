export interface Product {
  id: string;
  name: string;
  description: string;
  imgUrl: string;
  price?: number;
}

export interface ProductCard {
  id?: string;
  name: string;
  description?: string;
  imgUrl?: string;
  price?: number;
}

export type EditProductModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (arg: boolean) => void;
  product: Product;
};

export type EditProductRowProps = {
  product: Product;
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

export type Article = {
  id: string;
  product?: ProductCard;
  reservations?: Reservation[] | null;
};

export type Reservation = {
  id: string;
  startDate: string;
  endDate: string;
  articles: Article[];
  status: string;
  createdAt?: string;
};

export type ReservationData = {
  reservation: Reservation;
  totalPrice?: number;
};

export enum Role {
  Admin = "Admin",
  User = "User",
}
