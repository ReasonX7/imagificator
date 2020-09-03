import { renderPng } from './index';

describe('node', () => {
  describe('#renderPng', () => {
    it('renders markdown as png', async () => {
      const markdown = `
        \`\`\`
        console.log('hello')
        \`\`\`
      `
      const image = await renderPng(markdown, { theme: 'theme' })

      expect(image).toMatchSnapshot()
    })
  })
})
