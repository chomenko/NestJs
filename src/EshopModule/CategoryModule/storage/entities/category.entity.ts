import { Column, Entity } from 'typeorm'
import { CreatedUpdatedAt } from '../../../../Utils/entities/created.updated.at'


@Entity('categories')
export class CategoryEntity extends CreatedUpdatedAt {

    @Column({ nullable: false })
    name: string

}
