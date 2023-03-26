import { IsBoolean, IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateChickenDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsDateString()
    birthday: Date;

    @IsNotEmpty()
    @IsNumber()
    weight: number;

    @IsNumber()
    @IsOptional()
    steps?: number;

    @IsBoolean()
    @IsOptional()
    isRunning?: boolean

    @IsNumber()
    @IsOptional()
    coopId?: number
}
