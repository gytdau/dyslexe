import htmlVoidElements from 'html-void-elements'
import React from 'react'
import cx from '../styles'
import WordDefinition from './WordDefinition'

const syllableRegex = /[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?/gi
let id = 0
function tokenify(text, highlightCallback, isHighlighted) {
  text = text.trim().split(/\s+/)
  text = text.map(token => {
    id += 1
    if (isHighlighted(id)) {
      return (
        <WordDefinition
          id={id}
          onClick={e => {
            highlightCallback(e.target.id)
          }}
          onClickOutside={() => {
            highlightCallback()
          }}
          text={token}
        >
          {hyphenateText(token)}
        </WordDefinition>
      )
    }
    return React.createElement(
      'span',
      {
        className: isHighlighted(id) ? cx('word', 'highlighted') : cx('word'),
        id,
        onClick: e => {
          highlightCallback(e.target.id)
        }
      },
      hyphenateText(token)
    )
  })
  text = intersperse(
    text,
    React.createElement('span', { className: cx('space') }, ' ')
  )
  return text
}

function hyphenateText(text) {
  let words = text.match(/\S+/g) || [text]
  let newWords = words.map(word => {
    let syllables = word.match(syllableRegex)
    if (syllables) {
      syllables = syllables.map(syllable =>
        React.createElement('span', { className: cx('part') }, syllable)
      )
      syllables = intersperse(
        syllables,
        React.createElement('span', { className: cx('sep', 'part') }, '•')
      )
      return syllables
    } else {
      return React.createElement('span', null, word)
    }
  })
  return newWords
}
function intersperse(arr, val) {
  arr = arr.reduce(
    (acc, next) => {
      acc.push(next)
      acc.push(val)
      return acc
    },
    [val]
  )
  arr.shift()
  arr.pop()
  return arr
}
function recursivelyBuildArticleText(
  element,
  key,
  shouldTokenify,
  highlightCallback,
  isHighlighted
) {
  if (element.nodeType == 3) {
    if (shouldTokenify) {
      return tokenify(element.nodeValue, highlightCallback, isHighlighted)
    }
    return element.nodeValue + ' '
  }
  if (shouldTokenify) {
    shouldTokenify = !(element.tagName == 'A')
  }
  let children = Array.from(element.childNodes).map(el => {
    id += 1
    return recursivelyBuildArticleText(
      el,
      key,
      shouldTokenify,
      highlightCallback,
      isHighlighted
    )
  })

  let convertedAttributes = {}
  let attributes = element.attributes
  if (attributes) {
    for (var i = 0; i < attributes.length; i++) {
      convertedAttributes[attributes[i].nodeName] = attributes[i].nodeValue
    }
  }
  if (!element.tagName) {
    return null
  }
  if (htmlVoidElements.includes(element.tagName.toLowerCase())) {
    return null
  }

  return React.createElement(
    element.tagName.toLowerCase(),
    convertedAttributes,
    children
  )
}
export default function buildArticleText(
  element,
  key,
  shouldTokenify,
  highlightCallback,
  isHighlighted
) {
  id = 0
  return recursivelyBuildArticleText(
    element,
    key,
    shouldTokenify,
    highlightCallback,
    isHighlighted
  )
}
