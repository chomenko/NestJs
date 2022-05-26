import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategoryService } from './services/category.service'
import { CategoryEntity } from './storage/entities/category.entity'
import { CategoryRepository } from './storage/repositories/category.repository'
import { CategoryController } from './controllers/category.controller'


@Module({
    imports: [
        TypeOrmModule.forFeature([
            CategoryEntity,
            CategoryRepository,
        ]),
    ],
    controllers: [
        CategoryController,
    ],
    providers: [
        CategoryService,
    ],
    exports: [
        CategoryService,
        TypeOrmModule,
    ],

})
export class CategoryModule {
}
