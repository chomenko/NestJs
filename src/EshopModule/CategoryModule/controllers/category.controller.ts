import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { Convertor } from '../../../Utils/convertor'
import { CategoryOutputModel } from '../dto/outputs/category.output.model'
import { CategoryRepository } from '../storage/repositories/category.repository'
import { CategoryInputModel } from '../dto/inputs/category.input.model'
import { CategoryEntity } from '../storage/entities/category.entity'
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception'


@ApiTags('Category')
@Controller('api/category')
export class CategoryController {

    constructor (
        readonly categoryRepository: CategoryRepository
    ) {}

    @Get(':id')
    async getCategory (
        @Param('id') categoryId: number,
    ): Promise<CategoryOutputModel> {
        const category = await this.categoryRepository.findOne(categoryId)
        if (!category) {
            throw new NotFoundException(`Category ${categoryId} not found.`)
        }
        return Convertor.response(CategoryOutputModel, category)
    }

    @Post()
    @ApiResponse({ type: () => CategoryOutputModel })
    async createCategory (
        @Body() category: CategoryInputModel,
    ): Promise<CategoryOutputModel> {
        const entity = await Convertor.convert(CategoryEntity, category)
        await this.categoryRepository.save(entity)
        return Convertor.response(CategoryOutputModel, entity)
    }

}
