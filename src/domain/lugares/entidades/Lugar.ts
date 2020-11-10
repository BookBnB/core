import {IsLatitude, IsLongitude, IsNotEmpty, ValidateNested} from "class-validator";
import {Column} from "typeorm";
import {ValueTransformer} from "typeorm/decorator/options/ValueTransformer";
import {Point} from "geojson";
import {Type} from "class-transformer";

class CoordenadasTransformer implements ValueTransformer {
    to(coordenadas: Coordenadas): Point {
        return {
            type: "Point",
            coordinates: [coordenadas.latitud, coordenadas.longitud]
        }
    }

    from(value: Point): Coordenadas {
        return new Coordenadas(value.coordinates[0], value.coordinates[1])
    }
}

export class Coordenadas {
    @IsLatitude() public latitud!: number
    @IsLongitude() public longitud!: number

    constructor(latitud: number, longitud: number) {
        this.latitud = latitud
        this.longitud = longitud
    }
}

export interface LugarConstructor {
    pais: string
    provincia: string
    coordenadas: {
        latitud: number,
        longitud: number
    }
}

export default class Lugar {

    @IsNotEmpty() @Column()
    private pais!: string

    @IsNotEmpty() @Column()
    private provincia!: string

    @ValidateNested() @Type(() => Coordenadas)
    @Column("geometry", {
        spatialFeatureType: "Point", srid: 4326,
        transformer: new CoordenadasTransformer()
    })
    private coordenadas!: Coordenadas

    constructor(args: LugarConstructor) {
        Object.assign(this, args)
    }
}
