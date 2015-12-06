import { jsdom } from 'jsdom'

export default function(markup) {
  if (typeof document !== 'undefined') return
  global.document  = jsdom(markup || '')
  global.window    = document.defaultView
  global.navigator = { userAgent: 'node.js' }
}
