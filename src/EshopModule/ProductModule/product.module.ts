import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductService } from './services/product.service'
import { ProductResolver } from './resolvers/product.resolver'
import { ProductRepository } from './storage/repositories/product.repository'
import { ProductEntity } from './storage/entities/product.entity'
import { ProductController } from './controllers/product.controller'
import { ProductCategoryEntity } from './storage/entities/product.category.entity'
import { ProductCategoryRepository } from './storage/repositories/product.category.repository'


@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProductEntity,
            ProductRepository,

            ProductCategoryEntity,
            ProductCategoryRepository,
        ]),
    ],
    controllers: [
        ProductController,
    ],
    providers: [
        ProductService,
        ProductResolver,
    ],
    exports: [
        ProductService,
        TypeOrmModule,
    ],

})
export class ProductModule {
}
