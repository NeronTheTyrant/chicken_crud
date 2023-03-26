import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateChickenDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsDate()
    birthday: Date;

    @IsNotEmpty()
    @IsString()
    weight: number;

    @IsNumber()
    @IsOptional()
    steps: number;

    @IsBoolean()
    @IsOptional()
    isRunning: boolean

    @IsString()
    @IsOptional()
    coopName: string
}
