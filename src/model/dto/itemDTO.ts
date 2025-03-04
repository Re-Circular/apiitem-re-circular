import { Category, StatusConservation } from "@prisma/client"; //os enums do schema.prisma
export default class ItemDTO {
  name: string;
  description: string;
  category: Category;
  statusConservation: StatusConservation;
  availability: boolean;
  size?: string; 

  constructor(
    name: string,
    description: string,
    category: Category,
    statusConservation: StatusConservation,
    availability: boolean,
    size?: string
  ) {
    this.name = name;
    this.description = description;
    this.category = category;
    this.statusConservation = statusConservation;
    this.availability = availability;
    this.size = size;
  }
}
