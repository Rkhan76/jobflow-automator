import { startScrapingCron } from './cron/scraping.cron.js'


export const initScrapingModule = () => {
  startScrapingCron()
}


