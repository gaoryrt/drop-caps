/* eslint no-undef: "error" */
/* eslint-env browser */
const { g } = require('gelerator')

const $ = (s, parent) => (parent ? parent : document).querySelector(s)
const $$ = (s, parent) =>
  Array.prototype.slice.call(
    (parent ? parent : document).querySelectorAll(s)
  )
const isEl = obj => obj instanceof HTMLElement
const isStr = obj => Object.prototype.toString.call(obj) === '[object String]'
const isArr = obj => Object.prototype.toString.call(obj) === '[object Array]'

const dropcaps = (any, optObj = {}) => {
  const fontSize = optObj.fontSize || '5em'
  const offsetTop = optObj.top || '-0.05em'
  const offsetBtm = optObj.btm || '-0.2em'
  const dc = el => {
    if (el.childNodes.length === 0) return console.warn(el, 'should have at least one word')
    const firstTextSec = el.childNodes[0]
    if (firstTextSec.nodeType !== 3) return console.warn('dropcap only work for <p>s which start of plain text,', el, 'is not text-started.')
    const firstWord = firstTextSec.data.match(/[^\s]+/)
    if (!firstWord) return console.warn(el, 'should have at least one word')
    const replaceEl = g({
      'aria-labelledby': 'word--first',
      role: 'text'
    }, 'span')(
      g({ 'aria-hidden': 'true' }, 'span')(
        g('dropcap', 'span')(firstWord[0].slice(0, 1)),
        firstWord[0].slice(1)
      ),
      g({ id: 'word--first', style: { display: 'none' }}, 'span')(firstWord[0])
    )
    firstTextSec.data = firstTextSec.data.replace(firstWord[0], '')
    el.insertBefore(replaceEl, el.firstChild)
    const css = document.createElement('style')
    css.type = 'text/css'
    css.innerText = `.dropcap{font-family:"Playfair Display",serif;font-size:${fontSize};float:left;line-height:1;margin-right:0.1em}.dropcap:before,.dropcap:after{content:"";display:block}.dropcap:before{margin-bottom:${offsetTop}}.dropcap:after{margin-top:${offsetBtm}}`
    document.head.append(css)
  }

  const handleSimpleEl = el => {
    if (isEl(el)) dc(el)
    else if (isStr(el)) dc($(el))
  }

  if (isArr(any)) any.forEach(handleSimpleEl)
  else if (any === undefined) $$('p').forEach(dc)
  else handleSimpleEl(any)
}

module.exports = dropcaps
