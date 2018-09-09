# EasyC
A custom .esc transpiler to c language made in JS

## Lexical Analysis

--

## Parser

--

## Generator

--

## Types

* int
* string

## Examples

### Include and Define

~ input.esc
```
include stdio
include stdlib

define MAX 50
define MIN 5
```

~ output.c
```c
#include <stdio.h>
#include <stdlib.h>
#define MAX 50
#define MIN 5
```

### Create Variables

#### Integer

~ input.esc
```
int max 50
int min 5
```

~ output.c
```c
int max = 50;
int min = 5;
```

#### Strings

~ input.esc
```
string Hello "Hello"
string HelloWorld "Hello World"
```

~ output.c
```c
char* Hello = "Hello";
char* HelloWorld = "Hello World";
```

## Future Plans

* Generate binary code from GCC
* Assign value of variable "a" to variable "b" of same types

## Author

* Matheus Pedroni
