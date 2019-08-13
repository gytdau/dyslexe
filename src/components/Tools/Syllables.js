const syllableRegex = /[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?/gi
import cx from '../styles'
import $ from 'jquery'

const HYPHEN = '•'
const STARTWORD = 'Չ'
const ENDWORD = 'Ո'
const markerMapping = {
  [HYPHEN]: '<span class="' + cx('sep') + '">•</span>',
  [STARTWORD]: '<span class="' + cx('word') + '">',
  [ENDWORD]: '</span>'
}

function hyphenateText(text) {
  let words = text.match(/\S+/g) || [text]
  let newWords = words.map(word => {
    let syllables = word.match(syllableRegex)
    if (syllables) {
      return STARTWORD + syllables.join(HYPHEN) + ENDWORD
    } else {
      return word
    }
  })
  return newWords.join(' ')
}

function walkTheDOM(node, func) {
  func(node)
  node = node.firstChild
  while (node) {
    walkTheDOM(node, func)
    node = node.nextSibling
  }
}

export default function hyphenateNode(newContent) {
  walkTheDOM(newContent, function(node) {
    if (node.nodeType === 3) {
      // Is it a Text node?
      var text = node.data.trim()
      if (text.length > 0) {
        // Does it have non white-space text content?
        node.data = hyphenateText(node.data)
      }
    }
  })
  newContent = $(newContent).html()
  for (let marker in markerMapping) {
    newContent = newContent.replace(
      new RegExp(marker, 'g'),
      markerMapping[marker]
    )
  }
  return newContent
}
