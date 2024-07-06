import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";

export class updateColumnOrderDto {
    @ApiProperty()
    @IsArray()
    @IsString({each: true})
    ids: string[]
}