import { Global, Module } from '@nestjs/common'
import { ProductModule } from './ProductModule/product.module'
import { CategoryModule } from './CategoryModule/category.module'


@Global()
@Module({
    imports: [
        ProductModule,
        CategoryModule,
    ],
    controllers: [

    ],
    providers: [

    ],
    exports: [
        ProductModule,
        CategoryModule,
    ],

})
export class EshopModule {
}
