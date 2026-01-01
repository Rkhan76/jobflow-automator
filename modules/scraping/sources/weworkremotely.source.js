import axios from 'axios'
import { XMLParser } from 'fast-xml-parser'

const WWR_RSS_URL = 'https://weworkremotely.com/remote-jobs.rss'

export const fetchWeWorkRemotelyJobs = async () => {
  try {
    const res = await axios.get(WWR_RSS_URL, {
      headers: {
        'User-Agent': 'JobFlow-Aggregator',
      },
    })

    const parser = new XMLParser({
      ignoreAttributes: false,
    })

    const parsed = parser.parse(res.data)

    const items = parsed?.rss?.channel?.item || []

    return Array.isArray(items) ? items : [items]
  } catch (error) {
    console.error('WeWorkRemotely fetch failed:', error.message)
    return []
  }
}
