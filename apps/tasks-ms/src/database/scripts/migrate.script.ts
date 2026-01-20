import { AppDataSource } from '../data-source'

async function run() {
  try {
    await AppDataSource.initialize()
    console.log('> Connection initialized.')

    await AppDataSource.runMigrations()
    console.log('> Migrations runned.')
  }
  catch (err) {
    console.error('> Error:', err)
  }
  finally {
    await AppDataSource.destroy()
    console.log('> Connection destroyed.')
  }
}
run()
