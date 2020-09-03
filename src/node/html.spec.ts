import { setInnerTextById, setInnerTextByIds } from './html';

describe('html', () => {
  describe('#toHtml', () => {
    it('inserts inner text into specified ID tag', () => {
      expect(
        setInnerTextById('<div><p id="content"></p></div>', 'content', '<span>Loerm Ipsum</span>')
      ).toBe('<div><p id="content"><span>Loerm Ipsum</span></p></div>')
    })

    it('inserts inner text into specified ID tag', () => {
      expect(
        setInnerTextByIds('<div><h2 id="header"></h2><p id="content"></p></div>', {
          content: '<span>Loerm Ipsum</span>',
          header: 'Heading'
        })
      ).toBe('<div><h2 id="header">Heading</h2><p id="content"><span>Loerm Ipsum</span></p></div>')
    })
  })
})
