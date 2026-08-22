

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryProps {
  category: Category;
}