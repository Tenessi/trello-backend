import { IsOptional, IsString } from "class-validator";

export class TaskDto {
    @IsString()
    @IsOptional()
    title: string

    @IsString()
    @IsOptional()
    description?: string

    @IsString()
    @IsOptional()
    createdAt?: string
}
