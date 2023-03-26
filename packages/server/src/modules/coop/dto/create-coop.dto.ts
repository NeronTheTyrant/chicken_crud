import { IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateCoopDto {
    @ApiProperty({
        type: String,
        description: "The coop's name",
        default: '',
        required: true,
    })
    @IsNotEmpty()
    name: string
}


