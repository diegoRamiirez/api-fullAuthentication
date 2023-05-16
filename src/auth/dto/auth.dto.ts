import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

 

 export class AuthDto {
     @IsEmail()
     public email:string;

     @IsNotEmpty()
     @IsString()
     @Length(3,20, { message: ' password has to be at between 3 and 20 chars '})
     public password: string;
 }