import { Type } from "class-transformer";
import { IsDate, IsOptional } from "class-validator";
import { JSONSchema } from "class-validator-jsonschema";

export class ParametrosReporte {
    @IsDate() @Type(() => Date) @JSONSchema({example: "2020-11-19"}) @IsOptional()
    public fechaInicio!: Date;

    @IsDate() @Type(() => Date) @JSONSchema({example: "2020-11-21"}) @IsOptional()
    public fechaFin!: Date;
}
