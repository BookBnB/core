import {IsInt, IsOptional, IsPositive, Max, Min} from "class-validator";

export class ConsultaConPaginacion {
    @IsOptional()
    @IsInt()
    @IsPositive()
    @Max(200)
    public limit: number = 25

    @IsOptional()
    @IsInt()
    @Min(0)
    public offset: number = 0;
}
