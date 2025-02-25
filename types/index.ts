import {z} from 'zod';

const ZoneSchema = z.object({
    id_parqueadero: z.string(),
    x: z.number(),
    y: z.number()
});

export type Zone = z.infer<typeof ZoneSchema>;
export type Zones = Zone[];

const ParkingSchema = z.object({
    id_zona: z.number(),
    id_parqueadero: z.number(),
    numero: z.number(),
    estado: z.number()
});

export type Parking = z.infer<typeof ParkingSchema>;

export const DataResponseSchema = z.object({
    text: z.string(),
    data: z.array(ParkingSchema)
});

