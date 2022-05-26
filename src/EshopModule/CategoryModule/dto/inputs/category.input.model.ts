import { IsNumber, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'


export class CategoryInputModel {

    @IsNotEmpty()
    @ApiProperty({
        default: 'Category name',
    })
    @Expose()
    name: string

}
