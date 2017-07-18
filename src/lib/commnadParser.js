import equals from './equals'

const commandContain = (commands, string) => {
  const stringArr = string.toLowerCase().split(' ')
  const commandArr = commands.split(' ')
  let tmp = []

  stringArr.forEach(val => {
    commandArr.forEach(command => {
      if (command === val) {
        tmp.push(val)
        if (tmp.equals(commandArr)) tmp = stringArr.slice(tmp.length, stringArr.length).join(' ')
      }
    })
  })

  if (typeof tmp === 'string') {
    return tmp
  } else {
    return []
  }
}

export default commandContain
