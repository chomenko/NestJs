import * as glob from 'glob'
import Mocha from 'mocha'
import { Connection } from 'typeorm/connection/Connection'
import { createConnection, MigrationExecutor } from 'typeorm'
import { UtilsEnv } from '../Utils/utils.env'


const connect = async (): Promise<Connection> => {
    return await createConnection({
        type: 'mariadb',
        host: process.env.MYSQL_HOST_FOR_APP,
        port: Number(process.env.MYSQL_LOCAL_PORT),
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_ROOT_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    })
}

const startMigrations = async (connection: Connection): Promise<void> => {
    const executor = new MigrationExecutor(connection, connection.createQueryRunner('master'))
    executor.transaction = 'each'

    const migrations = await executor.getAllMigrations()
    const executed = await executor.getExecutedMigrations()
    let exCount = 0

    for (const migration of migrations) {
        let isset = false
        for (const ex of executed) {
            if (ex.name === migration.name && ex.timestamp === migration.timestamp) {
                isset = true
            }
        }
        if (!isset) {
            exCount++
        }
    }
    if (exCount > 0) {
        await executor.executePendingMigrations()
        console.log(`--> Executed (${exCount}) migrations complete.`)
        return
    }
    console.log('--> No migrations executed.')
}


const dropTables = async (connection: Connection): Promise<void> => {
    const tables = await connection.query('show tables;')
    let i = 0
    await connection.query('SET FOREIGN_KEY_CHECKS = 0;')
    for (const tableRow of tables) {
        i++
        const key = Object.keys(tableRow)[0]
        const tableName = tableRow[key]
        await connection.query(`DROP TABLE IF EXISTS ${tableName};`)
    }
    await connection.query('SET FOREIGN_KEY_CHECKS = 1;')
    if (i > 0) {
        console.log(`--> Drop (${i}) tables.`)
        return
    }
    console.log('--> No drop tables.')
}

(async function run (): Promise<void> {
    const prefix = `${process.cwd()}/dist/`
    const files = glob.sync(prefix + '/**/*.mocha.js')
    const modulesFile: Record<string, string[]> = {}
    for (const file of files) {
        const name = file.replace(prefix, '').split('/')[0]
        if (!modulesFile[name]) {
            modulesFile[name] = []
        }
        modulesFile[name].push(file)
    }

    async function renTest (files: string[]): Promise<any> {
        return await new Promise((resolve, reject) => {
            const mocha = new Mocha()
            for (const file of files) {
                mocha.addFile(file)
            }

            mocha.timeout(0)
            mocha.suite.addListener('pre-require', () => {
                UtilsEnv.setMocha()
            })
            mocha.parallelMode(false)
            mocha.rootHooks({
                beforeAll: async () => {
                    const conn = await connect()
                    await dropTables(conn)
                    await startMigrations(conn)
                    return await conn.close()
                },
            })
            mocha.run((failures) => {
                if (failures) {
                    console.log('Mocha test failure')
                    reject(new Error('Mocha test failure'))
                    process.exit(1)
                }
                resolve('ok')
            })
        })
    }

    const modulesRaw = process.argv[2]
    let onlyModule = []
    let runTest = false
    if (modulesRaw) {
        onlyModule = modulesRaw.split(',')
    }

    for (const name in modulesFile) {
        if (onlyModule.length > 0 && !onlyModule.includes(name)) {
            continue
        }
        const files = modulesFile[name]
        console.log(`  ↯ Test "${name}" module`)
        console.log(`  ↓ Mocha test files: ${files.length}`)
        await renTest(files)
        runTest = true
    }

    if (!runTest && onlyModule.length > 0) {
        console.log(` ✗ No test for modules: ${onlyModule.join(', ')}`)
    }

})().then(() => {
    process.exit(0)
})
