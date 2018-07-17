// Will use the shortest indention as an axis
export const freeText = (text) => {
  const lines = text
    .split('\n')
    .filter(line => line.trim())

  const minIndent = lines.reduce((minIndent, line) => {
    const currIndent = line.match(/^ */)[0].length

    return currIndent < minIndent ? currIndent : minIndent
  }, Infinity)

  const indentFixedText = lines
    .map(line => line.slice(minIndent))
    .join('\n')

  // This will allow inline text generation with external functions, same as ctrl+shift+c
  // As long as we surround the inline text with -->text<--
  return indentFixedText.replace(/( *)-->((?:.|\n)*)<--/g, (match, baseIndent, content) => {
    return content
      .split('\n')
      .map(line => `${baseIndent}${line}`)
      .join('\n')
  })
}

// upper -> Upper
export const upperFirst = (str) => {
  return str.substr(0, 1).toUpperCase() + str.substr(1)
}

// foo_barBaz -> ['foo', 'bar', 'Baz']
export const splitWords = (str) => {
  return str
    .replace(/[A-Z]/, ' $&')
    .split(/[^a-zA-Z0-9]+/)
}
