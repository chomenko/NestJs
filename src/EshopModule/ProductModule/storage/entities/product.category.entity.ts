import { Column, Entity, ManyToOne } from 'typeorm'
import { CreatedUpdatedAt } from '../../../../Utils/entities/created.updated.at'
import { ProductEntity } from './product.entity'
import { CategoryEntity } from '../../../CategoryModule/storage/entities/category.entity'


@Entity('product_categories')
export class ProductCategoryEntity extends CreatedUpdatedAt {

    @Column()
    productId: number

    @ManyToOne(() => ProductEntity, {
        lazy: true,
        onDelete: 'CASCADE',
    })
    product: ProductEntity | Promise<ProductEntity>

    @Column()
    categoryId: number

    @ManyToOne(() => CategoryEntity, {
        lazy: true,
        onDelete: 'CASCADE',
    })
    category: CategoryEntity | Promise<CategoryEntity>

}
