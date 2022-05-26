import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { CategoryInputModel } from '../inputs/category.input.model'


export class CategoryOutputModel extends CategoryInputModel {

    @ApiProperty({
        default: 1,
    })
    @Expose()
    id: number

}
