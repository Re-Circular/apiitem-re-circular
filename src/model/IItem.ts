export enum StatusConservation {
  Novo = "Novo",
  Usado = "Usado",
}

export enum Category {
  Eletronicos = "Eletronicos",
  Vestuario = "Vestuário",
  Papelaria = "Papelaria",
}

export default interface Item {
  id: string;
  name: string;
  description: string;
  category: Category;
  statusConservation: StatusConservation;
  availability: boolean;
  size?: string;
  createdAt: Date;
  updatedAt: Date;
}
