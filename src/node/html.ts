import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

const highlight = (str, lang) => {
  if (lang && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(lang, str, true).value
    } catch (ex) {
      console.warn(ex.message)
    }
  }

  return ''
}

export const toHtml = (markdown: string) => {
  const md = new MarkdownIt({
    linkify: false,
    breaks: true,
    highlight
  })

  return md.render(markdown)
}

export const setInnerTextById = (html: string, id: string, innerText: string) => {
  const reg = new RegExp(`<[^>]*\\s+id="${id}"[^>]*>`)
  return html.replace(reg, match => match + innerText)
}

export const setInnerTextByIds = (html: string, values: { [key: string]: string }) => {
  return Object.entries(values).reduce((result, [id, innerText]) => setInnerTextById(result, id, innerText), html)
}
