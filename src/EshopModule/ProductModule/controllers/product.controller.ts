import {
    Controller, Get, Param, Post, Version, Body,
} from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { ProductInputModel } from '../dto/inputs/product.input.model'
import { ProductOutputModel } from '../dto/outputs/product.output.model'
import { ProductRepository } from '../storage/repositories/product.repository'
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception'
import { Convertor } from '../../../Utils/convertor'
import { ProductEntity } from '../storage/entities/product.entity'
import { CategoryRepository } from '../../CategoryModule/storage/repositories/category.repository'
import { ProductCategoryEntity } from '../storage/entities/product.category.entity'
import { ProductCategoryRepository } from '../storage/repositories/product.category.repository'


@ApiTags('Product')
@Controller('api/product')
export class ProductController {

    constructor (
        readonly productRepository: ProductRepository,
        readonly categoryRepository: CategoryRepository,
        readonly productCategoryRepository: ProductCategoryRepository,
    ) {}

    @Get(':id')
    @ApiResponse({ type: () => ProductOutputModel })
    async getProduct (
        @Param('id') productId: number,
    ): Promise<ProductOutputModel> {
        const product = await this.productRepository.findOne(productId)
        if (!product) {
            throw new NotFoundException(`Product ${productId} not found.`)
        }
        return Convertor.response(ProductOutputModel, product)
    }

    @Get(':id')
    @Version('2')
    @ApiResponse({ type: () => String })
    async getProductV2 (
        @Param('id') productId: number,
    ): Promise<String> {
        console.log(productId)
        return Promise.resolve('.....')
    }

    @Post()
    @ApiResponse({ type: () => ProductOutputModel })
    async createProduct (
        @Body() product: ProductInputModel,
    ): Promise<ProductOutputModel> {
        const entity = await Convertor.convert(ProductEntity, product)
        const categories = await this.categoryRepository.findByIds(product.categories)

        for (const categoryId of product.categories) {
            const category = categories.find(c => c.id === categoryId)
            if (!category) {
                throw new NotFoundException(`Category ${categoryId} not found`)
            }
        }

        await this.productRepository.save(entity)

        const promises = product.categories.map(async id => {
            const productCategory = new ProductCategoryEntity()
            productCategory.categoryId = id
            productCategory.product = entity
            return this.productCategoryRepository.save(productCategory)
        })

        await Promise.all(promises)

        return Convertor.response(ProductOutputModel, entity)
    }

}
