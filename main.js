const fs = require('fs');

function lexer (code) {
    return code.split(/\s+/)
        .filter(function (t) { return t.length > 0 })
        .map(function (t) {
            return isNaN(t)
                    ? {type: 'word', value: t}
                    : {type: 'number', value: t}
        })
}

let Types = {
    int: {
        type: 'int',
        cdef: 'int'
    },
    string: {
        type: 'string',
        cdef: 'char*'
    }

}

function getType(typeName) {
    return Types[typeName];
}


function parser (tokens) {
    let parsed = [];
    while (tokens.length > 0) {

        let currentToken = tokens.shift();

        if (currentToken.type == 'word' && getType(currentToken.value) != null && currentToken.value.charAt(currentToken.value.length - 1) != '"') {
            // É uma variavel
            let expression = {
                type: 'variable',
                object: currentToken.value
            };
            let name = tokens.shift();
            let value = tokens.shift();
            switch (expression.object) {
                
                case 'int':
                    if (name.type != 'word') {
                        throw 'É esperado uma palavra para nome de váriavel.';
                    }
                    if (value.type != 'number') {
                        throw 'É esperado um número inteiro para o tipo (int). ';
                    }
                    expression.value = value.value;
                    break;
                case 'string':
                    let stringToken = value;
                    let values = [stringToken];
                    while (stringToken.value.charAt(stringToken.value.length - 1) != '"') {
                        stringToken = tokens.shift();
                        values.push(stringToken);
                    }

                    let stringValue = "";
                    values.forEach(element => {
                        stringValue += element.value + " ";
                    });
                    stringValue = stringValue.substring(0, stringValue.lastIndexOf(" "));
                    
                    if (value.type != 'word') {
                        throw 'É esperado um texto para o tipo (string).';
                    }
                    if (value.value.charAt(0) != '\"') {
                        throw 'O tipo de objeto (string) precisa estar entre aspas duplas.';
                    }
                    expression.value = stringValue;
                    break;
                    
            }
            VariableNameCheck(name);
            expression.name = name.value;
            
            parsed.push(expression);
        } else if (currentToken.type == 'word' && getType(currentToken.value) == null) {
            
            throw 'Tipo de objeto desconhecido. (' + currentToken.value + ")";
        }
    }
    return parsed;
}

function VariableNameCheck(variable) {
    if (!isNaN(variable.value.charAt(0))) {
        throw 'Nomes de váriaveis não podem iniciar com números.';
    }
}

function generator(parsed) {
    let generated = "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n ";

    parsed.forEach((entry) => {
        if (entry.type == 'variable') {
            generated += "\n" + getType(entry.object).cdef + " " + entry.name + " = " + entry.value + ";";
        }
    });

    return generated + "\n\nreturn 0; \n\n}";
}

let contents = fs.readFileSync('input.esc', 'utf8');

let compiled = parser(lexer(contents));

fs.writeFile('output.c', generator(compiled), (err) => {  
    if (err) throw err;
    console.log('Generated >> output.c');
});