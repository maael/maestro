const logUpdate = require('log-update')
const inquirer = require('inquirer')
const { getTableWithNote, options } = require('./noteCreator')

function askNote () {
  const table = getTableWithNote()
  inquirer.prompt([
    { type: 'list',
      name: 'question',
      message: table.table,
      paginated: true,
      choices: options
    }
  ]).then((answers) => {
    const correct = answers.question === `${table.note} ${table.type === 'normal' ? '' : table.type}`.trim()
    console.log(correct ? 'Correct!' : `Incorrect. It was ${table.note} ${table.type === 'normal' ? '' : table.type}`, '\n')
    inquirer.prompt([
      { type: 'confirm',
        name: 'question',
        message: 'Do you want to continue?'
      }
    ]).then((answers) => {
      if (answers.question) {
        askNote()
      } else {
        correct ? process.exit(0) : process.exit(1)
      }
    })

  })
}

askNote()
