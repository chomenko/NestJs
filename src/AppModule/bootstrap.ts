import * as bodyParser from 'body-parser'
import {NestFactory, Reflector} from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import {ClassSerializerInterceptor, INestApplication, VersioningType} from '@nestjs/common'
import { NestApplicationOptions } from '@nestjs/common/interfaces/nest-application-options.interface'
import { GraphQLSchemaHost } from '@nestjs/graphql'
import fs from 'fs'
import { printSchema } from 'graphql'
import { SystemLoggerService } from './services/system.logger.service'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { EshopModule } from '../EshopModule/eshop.module'
import {TransformPipe} from "./pipes/transform.pipe";


export class Bootstrap {

    async execute (): Promise<NestExpressApplication> {
        const app = await this.createApp()
        await this.configureApp(app)
        await this.listenApp(app)
        return app
    }

    async executeBuildPrepareTests (): Promise<void> {
        SystemLoggerService.log('Execute Prepare tests')
        return await this.executePrepareTests(this)
    }

    async createApp (options?: NestApplicationOptions): Promise<NestExpressApplication> {
        return await NestFactory.create<NestExpressApplication>(AppModule, options)
    }

    async configureApp (app: INestApplication): Promise<INestApplication> {

        app.use((req, res, next) => {
            req.headers.origin = req.headers.origin || req.headers.host
            next()
        })

        app.enableVersioning({
            type: VersioningType.URI,
        })
        app.useGlobalPipes(new TransformPipe())
        // app.useGlobalInterceptors(new ClassSerializerInterceptor(new Reflector()))

        const config = new DocumentBuilder()
            .setTitle('Nestjs Swagger')
            .setDescription('API description')
            .build()
        const document = SwaggerModule.createDocument(app, config)
        SwaggerModule.setup('api', app, document)

        app.enableCors({
            origin (origin, callback) {
                callback(null, true)
                return true
            },
            credentials: true,
        })

        app.use(bodyParser.urlencoded({
            limit: '50mb',
            extended: true,
        }))
        return Promise.resolve(app)
    }

    async listenApp (app: INestApplication, port = 3000): Promise<any> {
        return await app.listen(port)
    }

    private async executePrepareTests (bootstrap: Bootstrap): Promise<void> {
        const app = await bootstrap.createApp({
            logger: ['error'],
        })
        await bootstrap.configureApp(app)

        await app.init()

        console.log('---> Generate schema.gql.')

        const { schema } = app.get(GraphQLSchemaHost)
        fs.writeFileSync(`${process.cwd()}/schema.gql`, printSchema(schema))

        await app.close()
    }

}
