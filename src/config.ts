import { TypeOrmModuleOptions } from '@nestjs/typeorm'


export const config: {
    orm: TypeOrmModuleOptions,
    rabbit: {
        user: string,
        pass: string,
        host: string,
        port: string,
    },
} = {
    orm: {
        type: 'mariadb',
        host: process.env.MYSQL_HOST_FOR_APP,
        port: Number(process.env.MYSQL_LOCAL_PORT),
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_ROOT_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        dateStrings: true,
        logging: false,
        synchronize: true,
        migrationsRun: true,
        entities: [__dirname],
        autoLoadEntities: true,
        migrations: ['migration/*{.ts,.js}'],
    },
    rabbit: {
        user: process.env.RABBITMQ_USER,
        pass: process.env.RABBITMQ_PASS,
        host: process.env.RABBITMQ_HOST,
        port: process.env.RABBITMQ_PORT,
    },
}
