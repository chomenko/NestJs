import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'


@Entity()
export abstract class CreatedUpdatedAt {

    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    createdAt: Date = new Date()

    @UpdateDateColumn()
    updatedAt: Date

}
