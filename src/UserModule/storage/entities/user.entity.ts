import { Column, Entity } from 'typeorm'
import { CreatedUpdatedAt } from '../../../Utils/entities/created.updated.at'


@Entity('users')
export class UserEntity extends CreatedUpdatedAt {

    @Column({ nullable: false, unique: true })
    name: string

    @Column({ nullable: false })
    password: string

    @Column({ nullable: false })
    isAdmin: boolean
}
