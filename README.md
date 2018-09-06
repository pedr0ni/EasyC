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

## Example

Input: 
```
//input.esc
int a 10
int b 20
int c 30
string helloworld = "Hello World!"
```
```c
// output.c
#include <stdio.h>
#include <stdlib.h>

int main() {
 
int a = 10;
int b = 20;
int c = 30;
char* helloworld = "Hello World!"

return 0; 

}
```

## Future Plans

* Generate binary code from GCC
* Assign value of variable "a" to variable "b" of same types

## Author

* Matheus Pedroni
