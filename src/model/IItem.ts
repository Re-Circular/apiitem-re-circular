export enum StatusConservation {
  novo = "Novo",
  seminovo= "seminovo",
  usado = "Usado",
}


export default interface Item {
  id: string;
  name: string;
  description: string;
  category: String;
  statusConservation: StatusConservation;
  availability: boolean;
  size?: string;
  latitude: string;
  longitude:string;
  createdAt: Date;
  updatedAt: Date;
}
