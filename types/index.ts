import {z} from 'zod';

export const ZoneSchema = z.object({
    zone_id: z.string(),
    zone_identifier: z.string(),
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
