import { AppDataSource } from '../data-source'

async function run() {
  await AppDataSource.initialize()
  await AppDataSource.runMigrations()
  await AppDataSource.destroy()
}

run()
  .then(() => {
    console.log('Migrations successfully completed!')
    process.exit(0)
  })
  .catch(err => {
    console.error('Error: ', err)
    process.exit(1)
  })
