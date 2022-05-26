import { NestFactory } from '@nestjs/core'
import { CommandModule, CommandService } from 'nestjs-command'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'


global['logger'] = new Logger();

(async () => {
    const app = await NestFactory.createApplicationContext(AppModule)
    try {
        await app.init()
        await app.select(CommandModule).get(CommandService).exec()
        await app.close()
    } catch (error) {
        global.logger.error(error)
        await app.close()
        process.exit(1)
    }
})()
