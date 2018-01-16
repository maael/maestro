const notes = {
  'normal': '♩',
  'flat': '♭',
  'sharp': '♯'
}
const exceptions = {
  'sharp': [ 'B', 'E' ],
  'flat': [ 'C', 'F' ]
}
const lineWidth = 20

const rows = 'gfedcbagfed'.toUpperCase().split('')

function renderTable () {
  const fillerLine = '.'.repeat(lineWidth)
  const barLine = '-'.repeat(lineWidth)
  return `${fillerLine}
${barLine}
${fillerLine}
${barLine}
${fillerLine}
${barLine}
${fillerLine}
${barLine}
${fillerLine}
${barLine}
${fillerLine}`
}

function makeListOptions () {
  return rows.reduce((notes, note) => {
    let candidates = [ note ]
    if (!exceptions.sharp.includes(note)) candidates = [ `${note} sharp` ].concat(candidates)
    if (!exceptions.flat.includes(note)) candidates = candidates.concat([ `${note} flat` ])
    return notes.concat(candidates)
  }, [])
}

const possibleNotes = makeListOptions()

function replaceAt (str, index, replacement) {
    return str.substr(0, index) + replacement + str.substr(index + replacement.length);
}

function getFullNote (note) {
  const possibilitiesForNote = possibleNotes.filter((possible) => possible.startsWith(note))
  const selectedIndex = Math.floor(Math.random() * possibilitiesForNote.length)
  const selectedNote = possibilitiesForNote[selectedIndex]
  return { key: selectedNote.substr(0, 1), type: selectedNote.substr(2) || 'normal' }
}

function getTableWithNote () {
  const table = renderTable()
  const y = Math.floor(Math.random() * rows.length)
  const lineWidth = 21
  const index = (y * lineWidth) + (Math.floor((lineWidth - 1) / 2) - 1)
  const note = getFullNote(rows[y])
  const furnishedTable = replaceAt(table, index, notes[note.type])
  return { table: furnishedTable.replace(/\./g, ' '), note: note.key, type: note.type }
}

module.exports = {
  getTableWithNote, options: possibleNotes
}
