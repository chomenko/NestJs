import { Query, Resolver } from '@nestjs/graphql'
import { CategoryService } from '../../CategoryModule/services/category.service'


@Resolver()
export class ProductResolver {

    constructor (
        private readonly categoryService: CategoryService,
    ) {
    }

    @Query(() => String)
    async productsList (
    ): Promise<String> {
        console.log(this.categoryService)
        return Promise.resolve('.....')
    }
}
