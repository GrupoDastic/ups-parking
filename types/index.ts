import {z} from 'zod';

export const ZoneSchema = z.object({
    zone_id: z.string(),
    zone_name: z.string(),
    available_spaces: z.string(),
});

export const ZonesSchema = z.object({
    zones: z.array(
        ZoneSchema
    )
})

export type Zone = z.infer<typeof ZoneSchema>;
export type Zones = z.infer<typeof ZonesSchema>;

export const StripSchema = z.object({
    strip_id: z.string(),
    strip_name: z.string(),
    free_spaces: z.string(),
});

export const StripsSchema = z.object({
    zone_id: z.string(),
    strips: z.array(
        StripSchema
    )
});

export type Strip = z.infer<typeof StripSchema>;
export type Strips = z.infer<typeof StripsSchema>;

export const ParkingSpaceSchema = z.object({
    id: z.string(),
    strip_id: z.string(),
    identifier: z.string(),
    type: z.string(),
    status: z.string(),
    number: z.number(),
    plate: z.null(),
    last_updated: z.string()
});

export const ParkingsSpacesSchema = z.object({
    zone_id: z.string(),
    strip_id: z.string(),
    parking_spaces: z.array(
        ParkingSpaceSchema
    ),
    free_spaces: z.string()
});

export type ParkingSpace = z.infer<typeof ParkingSpaceSchema>;
export type ParkingsSpaces = z.infer<typeof ParkingsSpacesSchema>;

