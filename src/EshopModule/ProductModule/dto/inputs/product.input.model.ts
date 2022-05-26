import { IsNumber, IsNotEmpty, IsArray, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'


export class ProductInputModel {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        default: 'Product name',
    })
    @Expose()
    name: string

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        default: 156.3,
        description: 'Product price description',
    })
    @Expose()
    price: number

    @IsArray()
    @ApiProperty({
        default: [1],
        description: 'Categories ids',
    })
    @Expose()
    categories: number[] = []

}
