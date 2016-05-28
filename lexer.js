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

  unclosed() {
    return this.stack.slice().reverse();
  }
}

module.exports = (input) => {
  let delimStack = new DelimStack();

  let lexer = new Lexer();
  lexer
    .addRule(/\(/, () => delimStack.expect(')'))
    .addRule(/\[/, () => delimStack.expect(']'))
    .addRule(/\{/, () => delimStack.expect('}'))
    .addRule(/[)}\]]/, (lexeme) => delimStack.close(lexeme))
    .addRule(/./, () => {})
    .addRule(/\r?\n/, () => {});

  lexer.setInput(input);
  while (lexer.lex());
  return delimStack.unclosed();
}
