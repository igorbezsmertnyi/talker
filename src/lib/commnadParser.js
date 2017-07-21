import equals from './equals'

const commandContain = (commands, string, act) => {
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
    return { text: tmp, action: act }
  } else {
    return false
  }
}

export default commandContain
