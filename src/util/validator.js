/* eslint-disable no-useless-escape */
/* eslint-disable eqeqeq */
// check if email is valid
export const isEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

// uppercase && lowercase and 8 min
export const isPasswordSecure = (password) => {
  const patt = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
  return patt.test(password)
}

export const isNameComplete = (name) => {
  const patt = /[a-z]* [a-z]*/
  return patt.test(name)
}

export const validateCpf = (cpf) => {
  cpf = cpf.replaceAll('.', '').replaceAll('-', '').replaceAll('/', '').trim()

  if (!cpf ||
    cpf.length != 11 ||
    cpf == '00000000000' ||
    cpf == '11111111111' ||
    cpf == '22222222222' ||
    cpf == '33333333333' ||
    cpf == '44444444444' ||
    cpf == '55555555555' ||
    cpf == '66666666666' ||
    cpf == '77777777777' ||
    cpf == '88888888888' ||
    cpf == '99999999999'
  ) return false
  let soma = 0
  let resto
  for (let c = 1; c <= 9; c++) soma = soma + parseInt(cpf.substring(c - 1, c)) * (11 - c)
  resto = (soma * 10) % 11
  if (resto == 10 || resto == 11) resto = 0
  if (resto != parseInt(cpf.substring(9, 10))) return false
  soma = 0
  for (let i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i)
  resto = (soma * 10) % 11
  if (resto == 10 || resto == 11) resto = 0
  if (resto != parseInt(cpf.substring(10, 11))) return false
  return true
}

export const validateCnpj = (cnpj) => {
  cnpj = cnpj.replaceAll('.', '').replaceAll('-', '').replaceAll('/', '').trim()

  if (!cnpj ||
    cnpj.length != 14 ||
    cnpj == '00000000000000' ||
    cnpj == '11111111111111' ||
    cnpj == '22222222222222' ||
    cnpj == '33333333333333' ||
    cnpj == '44444444444444' ||
    cnpj == '55555555555555' ||
    cnpj == '66666666666666' ||
    cnpj == '77777777777777' ||
    cnpj == '88888888888888' ||
    cnpj == '99999999999999'
  ) return false
  let tamanho = cnpj.length - 2
  let numeros = cnpj.substring(0, tamanho)
  const digitos = cnpj.substring(tamanho)
  let soma = 0
  let pos = tamanho - 7
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--
    if (pos < 2) pos = 9
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)
  if (resultado != digitos.charAt(0)) return false
  tamanho = tamanho + 1
  numeros = cnpj.substring(0, tamanho)
  soma = 0
  pos = tamanho - 7
  for (let x = tamanho; x >= 1; x--) {
    soma += numeros.charAt(tamanho - x) * pos--
    if (pos < 2) pos = 9
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)
  if (resultado != digitos.charAt(1)) return false
  return true
}

/**
 * Chek if vatiable is empty
 * @prop String thing
 * @returns Boolean
 */

export const isEmpty = (thing) => {
  let empty = false

  switch (typeof thing) {
    case 'undefined':
      empty = true
      break
    case 'string':
      if (thing.trim().length === 0) {
        empty = true
      }
      break
    case 'object':
      if (thing === null) {
        empty = true
      } else if (Object.keys(thing).length === 0) {
        empty = true
      }
      break
    default:
      empty = true
  }
  return empty
}

/**
 * Check length of the string greater than
 * @prop String|Integer str
 * @prop boolean|options.trim Trim input before validating
 * @prop number|options.lt Check if length less than lt
 * @prop number|options.lte Check if length is less than or equals to lte
 * @prop number|options.gt Check if length is greater than gt
 * @prop number|options.gte Check if length is greater than or equals to gte
 * @returns Boolean
 */
export const isLength = (str, options) => {
  if (isEmpty(options)) {
    throw new Error('Who will provide the options you?')
  }

  let isValid = true

  if (['string', 'number'].indexOf(typeof str) === -1) {
    isValid = false
  } else {
    // Convert to string incase it's number
    let len = 0

    if (options.trim) {
      len = str.toString().trim().length
    } else {
      len = str.toString().length
    }

    if (typeof options.lt === 'number' && len >= options.lt) {
      isValid = false
    } else if (typeof options.lte === 'number' && len > options.lte) {
      isValid = false
    } else if (typeof options.gt === 'number' && len <= options.gt) {
      isValid = false
    } else if (typeof options.gte === 'number' && len < options.gte) {
      isValid = false
    }
  }

  return isValid
}

/**
 * Check if string contains whitespaces
 * @prop String str
 * @returns Boolean
 */
export const isContainWhiteSpace = (str) => {
  if (typeof str === 'string' || typeof str === 'number') {
    return (
      str
        .toString()
        .trim()
        .indexOf(' ') !== -1
    )
  } else {
    return false
  }
}

export const isCelularPhoneValid = (cel) => {
  // eslint-disable-next-line eqeqeq
  if (cel == '') {
    return false
  }
  return cel.match(/\d+/g).join([]).length == 11
}

export const isPhoneValid = (tel) => {
  // eslint-disable-next-line eqeqeq
  if (tel == '') {
    return false
  }
  return tel.match(/\d+/g).join([]).length == 11 || 10
}
