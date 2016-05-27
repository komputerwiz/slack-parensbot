var Lexer = require('lex');


class DelimStack {
  constructor() {
    this.stack = [];
  }

  expect(rdelim) {
    this.stack.push(rdelim);
  }

  close(rdelim) {
    let ix = this.stack.lastIndexOf(rdelim);
    if (ix >= 0) {
      this.stack.splice(ix, 1);
    }
  }
}

var delimStack;



module.exports = (input) => {
  var delimStack = new DelimStack();

  var lexer = new Lexer();
  lexer
    .addRule(/\(/, () => delimStack.expect(')'))
    .addRule(/\[/, () => delimStack.expect(']'))
    .addRule(/\{/, () => delimStack.expect('}'))
    .addRule(/[)}\]]/, (lexeme) => delimStack.close(lexeme))
    .addRule(/./, () => {});

  lexer.setInput(input);
  while (lexer.lex());
  return delimStack.stack;
}
