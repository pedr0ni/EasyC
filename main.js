function lexer (code) {
    return code.split(/\s+/)
        .filter(function (t) { return t.length > 0 })
        .map(function (t) {
            return isNaN(t)
                    ? {type: 'word', value: t}
                    : {type: 'number', value: t}
        })
}

const Types = [
    'int',
    'string'
];

function parser (tokens) {
    let parsed = [];
    while (tokens.length > 0) {

        let currentToken = tokens.shift();
        if (currentToken.type == 'word' && Types.indexOf(currentToken.value) != -1) {
            // É uma variavel
            let expression = {
                type: 'variable',
                object: currentToken.value
            };

            switch (expression.object) {
                case 'int':
                    let name = tokens.shift();
                    let value = tokens.shift();
                    if (name.type != 'word') {
                        throw 'É esperado uma palavra para nome de váriavel.';
                    } else if (!isNaN(name.value.charAt(0))) {
                        throw 'Nomes de váriaveis não podem iniciar com números.';
                    }
                    if (value.type != 'number') {
                        throw 'É esperado um número inteiro para o tipo (int). ';
                    }
                    expression.name = name.value;
                    expression.value = value.value;
                    break;
            }
            parsed.push(expression);
        } else if (currentToken.type == 'word' && Types.indexOf(currentToken.value) == -1) {
            throw 'Tipo de objeto desconhecido.';
        }
    }
    return parsed;
}

console.log(parser(lexer("int a 10 int b 20")));