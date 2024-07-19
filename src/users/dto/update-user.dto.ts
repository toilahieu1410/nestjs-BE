import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto extends OmitType(CreateUserDto, ['password'] as const) { // ko cho cập nhật password 
    @IsNotEmpty({message: '_id không được để trống'})
    _id: string
} 
