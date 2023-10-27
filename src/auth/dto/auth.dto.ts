import { IsEmail, IsNotEmpty } from 'class-validator';
export class UserDto{
        id: string;
    
        @IsNotEmpty()
        public name : string;

        @IsEmail()
        public email : string;

        @IsNotEmpty()
        password: string;

    }