import { Column, Entity, OneToMany } from 'typeorm'
import { CreatedUpdatedAt } from '../../../../Utils/entities/created.updated.at'
import { ProductCategoryEntity } from './product.category.entity'


@Entity('products')
export class ProductEntity extends CreatedUpdatedAt {

    @Column({ nullable: false })
    name: string

    @Column({ nullable: false, type: 'float' })
    price: number

    @OneToMany(() => ProductCategoryEntity, category => category.category, {
        eager: true,
        persistence: true,
    })
    categories: ProductCategoryEntity[]

}
