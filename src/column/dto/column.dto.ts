import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class ColumnDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    title: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    createdAt?: string
}