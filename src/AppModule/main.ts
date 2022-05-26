import { NestExpressApplication } from '@nestjs/platform-express'
import { Bootstrap } from './bootstrap'


const application: {
    nest: Promise<NestExpressApplication>,
} = {
    nest: undefined,
}


const bootstrap = new Bootstrap()

switch (process.argv[2]) {
    case 'prepare-tests':
        bootstrap.executeBuildPrepareTests()
        break
    default:
        application.nest = bootstrap.execute()
}

