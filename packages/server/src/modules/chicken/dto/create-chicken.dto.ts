import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateChickenDto {
    @ApiProperty({
        type: String,
        description: "The chicken's name",
        default: '',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        type: Date,
        description: "The chicken's birthday date",
        default: new Date(Date.now()),
        required: false,
    })
    @IsDateString()
    birthday: Date;

    @ApiProperty({
        type: Number,
        description: "The chicken's weight in kilograms",
        default: 1,
        required: true,
    })
    @IsNotEmpty()
    @IsNumber()
    weight: number;

    @ApiProperty({
        type: Number,
        description: "The number of steps taken by the chicken in its miserable, coop-bound life",
        default: 0,
        required: false,
    })
    @IsNumber()
    @IsOptional()
    steps?: number;

    @ApiProperty({
        type: Boolean,
        description: "Whether the chicken is running for its life or not",
        default: false,
        required: false,
    })
    @IsBoolean()
    @IsOptional()
    isRunning?: boolean

    @ApiProperty({
        type: Number,
        description: "The chicken's coop's ID.",
        default: -1,
        required: false,
    })
    @IsNumber()
    @IsOptional()
    coopId?: number
}
