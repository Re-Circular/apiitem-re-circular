

import { Category, StatusConservation } from "@prisma/client";
import { ImageItem } from "../IImage";

export default class ItemDTO {
  name: string;
  description: string;
  category: Category;
  statusConservation: StatusConservation;
  availability: boolean;
  size?: string;
  images: ImageItem[];  

  constructor(
    name: string,
    description: string,
    category: Category,
    statusConservation: StatusConservation,
    availability: boolean,
    size?: string,
    images: ImageItem[] = []  
  ) {
    this.name = name;
    this.description = description;
    this.category = category;
    this.statusConservation = statusConservation;
    this.availability = availability;
    this.size = size;
    this.images = images;
  }
}
