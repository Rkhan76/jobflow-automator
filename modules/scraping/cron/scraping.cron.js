import cron from 'node-cron'
import { fetchAndSaveAllJobs } from '../services/fetchJobs.service.js'

export const startScrapingCron = () => {
  cron.schedule('0 */12 * * *', async () => {
    console.log('⏰ Scraping cron started')

    await fetchAndSaveAllJobs()

    console.log('✅ Scraping cron finished')
  })
}

