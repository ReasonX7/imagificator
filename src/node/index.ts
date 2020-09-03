import { Page } from 'puppeteer'
import { Cluster } from 'puppeteer-cluster'
import { indexHtml } from 'index-html'

import { setInnerTextByIds, toHtml } from './html'


type Options = {
  theme: string
}

const getBuffer = async (html, page: Page) => {
  await page.setContent(html)
  await page.waitForNavigation('networkidle0')

  const bufferPromise = new Promise((resolve) => {
    page.on('response', (response) => {
      console.log(`response.url()`, response.url())
      resolve(response.buffer())
    })
  })

  const clickPromise = page.click('#btn-submit')

  return Promise
    .all([bufferPromise, clickPromise])
    .then(([buffer]) => buffer)
}

export const renderPng = async (markdown: string, { theme }: Options) => {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 2,
    puppeteerOptions: {
      args: ['--no-sandbox']
    }
  })

  const content = toHtml(markdown)
  const html = setInnerTextByIds(indexHtml, { theme, content })

  await cluster.task(({ page, data }) => getBuffer(data, page))

  const pngBuffer = await cluster.execute(html)

  await cluster.idle();
  await cluster.close();

  // const browser = await launch();
  // const page = await browser.newPage();
  //
  // const content = toHtml(markdown)
  // const pngBuffer = await getBuffer(indexHtml, { theme, content })
  //
  // await browser.close();

  return pngBuffer
}
