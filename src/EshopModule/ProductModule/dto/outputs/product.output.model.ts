import { ApiProperty, OmitType } from '@nestjs/swagger'
import { ProductInputModel } from '../inputs/product.input.model'
import { Expose } from 'class-transformer'


export class ProductOutputModel extends OmitType(ProductInputModel, ['categories'] as const) {

    @ApiProperty({
        default: 1,
    })
    @Expose()
    id: number

}
