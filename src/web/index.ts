import { toPng } from 'html-to-image'
import { curry } from 'ramda'

type Config = {
  theme: string,
  content: string,
  filename: string,
}

const download = curry((filename: string, data: any) => {
  const link = document.createElement('a')
  link.download = filename
  link.href = data
  link.click()
})

const getFormValues = (formElement: HTMLFormElement) => {
  const formData = new FormData(formElement)
  const values = {}
  for (const [key, value] of formData.entries()) {
    values[key] = value
  }
  return values
}

const handleSubmit = (e: Event) => {
  e.preventDefault();

  const { theme, content } = getFormValues(e.target as HTMLFormElement) as Config

  document.querySelector('body').append()
  document.getElementById('theme').innerHTML = theme
  document.getElementById('content').innerHTML = content

  toPng(document.getElementById('content'), { quality: 1 }).then(download(''))
};

document.getElementById('form-config').addEventListener('submit', handleSubmit)
