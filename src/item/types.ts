export interface Item {
  id: number;
  text: string;
  category: string;
  marked: boolean;
}

export interface Category {
  value: number;
  label: string;
}
