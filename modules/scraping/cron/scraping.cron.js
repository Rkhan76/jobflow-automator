import cron from 'node-cron'
import { fetchAndSaveRemotiveJobs } from '../services/fetchJobs.service.js'

export const startScrapingCron = () => {
  // Every 12 hours
  cron.schedule('0 */12 * * *', async () => {
    console.log('⏰ Scraping cron started')
    await fetchAndSaveRemotiveJobs()
    console.log('✅ Scraping cron finished')
  })
}
