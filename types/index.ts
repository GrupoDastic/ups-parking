export type Zone = {
    id_parqueadero: string,
    x: number,
    y: number
}

export type Zones = Zone[];

export type Parking = {
    id_zona: number;
    id_parqueadero: number;
    estado: number;
}
