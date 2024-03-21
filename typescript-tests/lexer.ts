const input = "add 2 and 2"

// ye wo words h, jinhe me operator manta hoon
enum OPERATOR {
    ADD = 'add',
    SUBTRACT = 'sub'
};

const operators = {
  'add': OPERATOR.ADD,
  'sub': OPERATOR.SUBTRACT,
}

const operator_conversion_map = {
  OPERATOR.ADD: "+",
  OPERATOR.SUBTRACT: "-"
}

const SPACE = " "
// ye wo words h, jinhe mujhe ignore karna h
enum IGNORED  {
  AND = 'and'
}

enum TOKEN_TYPES  {
  OPERATOR = "OPERATOR",
  OPRAND = "OPRAND"
}

// ye regex number detect karega
const number_regex = /[0-9]+/

const tokens = []

// ["add", "2", "and", "2"]
const words = input.split(SPACE)

words.forEach(word => {
 // if it is a keyword/operator
 if(operators[word]){
    tokens.push({
      type: TOKEN_TYPES.OPERATOR,
      value: operator_conversion_map[word]
    })
  }

  // detect if it's a number 
  if(number_regex.test(word)){
    tokens.push({
      type: TOKEN_TYPES.OPRAND,
      value: parseInt(word)
    })
  }
})


console.log(tokens)

