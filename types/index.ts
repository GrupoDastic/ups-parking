import {z} from 'zod';

export const DataResponseSchema = z.object({
    text: z.string(),
});

export type DataResponse = z.infer<typeof DataResponseSchema>;

export const ZONE_PRIORITY = ["B", "D", "C", "H", "E", "G"] as const;
export type ZoneIdentifier = typeof ZONE_PRIORITY[number];

export const ZoneSchema = z.object({
    zone_id: z.string(),
    zone_identifier: z.enum(ZONE_PRIORITY),
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
    zone_id: z.string(),
    strip_name: z.string(),
    strip_identifier: z.number(),
    free_spaces: z.string(),
});

export const StripsSchema = z.object({
    strips: z.array(
        StripSchema
    )
});

export type Strip = z.infer<typeof StripSchema>;
export type Strips = z.infer<typeof StripsSchema>;

export const ParkingSpaceSchema = z.object({
    id: z.string(),
    identifier: z.string(),
    type: z.string(),
    status: z.string(),
    number: z.number(),
    last_updated: z.string(),
    position_x: z.number(),
    position_y: z.number(),
    orientation: z.string(),
    rotation: z.number().nullable(),
    coordinates: z.string().nullable(),
});

export const ParkingsSpacesSchema = z.object({
    zone_id: z.string(),
    strip_identifier: z.string(),
    parking_spaces: z.array(
        ParkingSpaceSchema
    ),
    free_spaces: z.string()
});

export type ParkingSpace = z.infer<typeof ParkingSpaceSchema>;
export type ParkingsSpaces = z.infer<typeof ParkingsSpacesSchema>;

export const MapSchema = z.object({
    map: z.array(
        z.object({
            zone_id: z.string(),
            strip_identifier: z.number(),
            svg_content: z.string(),
            width: z.number(),
            height: z.number(),
            viewbox: z.string()
        })
    )
})
