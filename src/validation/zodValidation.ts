import { z } from 'zod';

// Esquema para validação ao criar um item
const itemSchema = z.object({
  name: z.string().min(3, "Nome é obrigatório"),
  description: z.string().min(10, "Descrição é obrigatória"),
  category: z.string().min(5, "Categoria é obrigatória"),
  statusConservation: z.string().min(4, "Status de conservação é obrigatório"),
  size: z.string().min(1, "Tamanho é obrigatório"),
  longitude: z
    .string()
    .regex(/^[-+]?\d*\.?\d+$/, "Longitude deve ser um número válido")
    .transform((val) => parseFloat(val)), 
  latitude: z
    .string()
    .regex(/^[-+]?\d*\.?\d+$/, "Latitude deve ser um número válido") 
    .transform((val) => parseFloat(val)), 
});

// Esquema para validação de atualização de disponibilidade
const updateAvailabilitySchema = z.object({
  availability: z.boolean(),
});

const getByNameSchema = z.object({
    name: z.string().min(3, "Nome é obrigatório"),
  });


  const getBySizeSchema = z.object({
    size: z.string().min(1, "Informe um tamanho válido"),
  });


  enum StatusConservation {
    novo = "novo",
    seminovo = "seminovo",
    usado = "usado",
  }
  
  const getByConservationSchema = z.object({
    statusConservation: z.enum([StatusConservation.novo, StatusConservation.seminovo, StatusConservation.usado]),
  })
export { itemSchema, updateAvailabilitySchema, getByNameSchema , getBySizeSchema, getByConservationSchema};
