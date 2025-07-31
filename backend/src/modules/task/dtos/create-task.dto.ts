import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    @Length(3, 100)
    name: string;

    @IsString()
    @IsNotEmpty()
    @Length(3, 255)
    description: string;
}
