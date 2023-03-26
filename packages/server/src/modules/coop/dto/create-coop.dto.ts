import { IsNotEmpty } from "class-validator";

export class CreateCoopDto {
    @IsNotEmpty()
    name: string
}
