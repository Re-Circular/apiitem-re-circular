

import { StatusConservation } from "@prisma/client";
import { ImageItem } from "../IImage";

export default class ItemDTO {
  name: string;
  description: string;
  category: string;
  statusConservation: StatusConservation;
  availability: boolean;
  latitude: number;
  longitude: number;
  images: ImageItem[];  
  size: string;
  constructor(
    name: string,
    description: string,
    category:string,
    statusConservation: StatusConservation,
    availability: boolean,
    size: string,
    latitude: number,
    longitude: number,
    images: ImageItem[] = []  
  ) {
    this.name = name;
    this.description = description;
    this.category = category;
    this.statusConservation = statusConservation;
    this.availability = availability;
    this.size = size;
    this.latitude= latitude;
    this.longitude=longitude;
    this.images = images;
  }
}
