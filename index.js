const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

function reverseString(str) {

    let newString = "";

    for (let i = str.length - 1; i >= 0; i--) {
        newString += str[i];
    }

    return newString;
}


function decode(expr) {
    
    let translateString = '';                                                   //строка с переведёнными символами
    let morseString = '';                                                       //строка без перевода (имеет в своей кодировке либо один символ, либо сколько угодно символов идущих подряд)
    let str = '';                                                               //строка без перевода (имеет в своей кодировке только один символ в иттерации)

    let temporary = 0;                                                          //длина строки morseString (задаётся каждую иттерацию заново)
    let j = 0;                                                                  //счётчик длины символов, которые требуется перевернуть

    for( let i = 0 ; i <= expr.length ; i++ ) {

        if ( expr[i] === '*' ) {                                                //условие для определения пробела

            for (let key in MORSE_TABLE) {                                      //цикл перебора каждого key в MORSE_TABLE
                if (morseString === key) {                                      //условие
                    translateString += MORSE_TABLE[key];                        //добавляем в строку с переводом значение, чей ключ равен morseString
                    morseString = '';                                           //чистим значение morseString
                }
            }

            translateString += ' ';                                             //добавляем пробел в перевод
            i += 10;                                                            //прибавляем 10, тк в пробеле содержится 10 знаков "*"
        } 
        
        if ( expr[i] > 0 ) {                                                   //проверка есть ли единица

            let decoder = '';                                                  //создаём на каждой иттерации новую  переменную,

            decoder += expr[i] + expr[i+1] ;                                   //добавляем в переменную 2 последовательных значения

            if ( decoder === '10' ) {                                          //условие для точки
                morseString += '.' ;
                i += 1 ;
            }

            if ( decoder === '11' ) {                                          //условие для тире
                morseString += '-' ;
                i += 1 ;
            }
        }

        else {

            temporary = morseString.length;                                    //во временную переменную добавляем длину не переведённой строки

            while (temporary > 0) {                                            //цикл while подошёл лучше, чем for

                if (temporary > 5 ) {

                    str = morseString.substr( temporary - 5 ,5);  //возвращает каждый раз 5 символов от temporary - 5

                    for (let key in MORSE_TABLE) {                             //цикл перебора каждого key в MORSE_TABLE

                        if (str === key) {                                     //условие

                            translateString += MORSE_TABLE[key];               //добавляем в строку с переводом значение, чей ключ равен morseString
                            temporary = temporary - 5;                         //отнимаем от временной переменной длину максимального символа (5), для последующей иттерации
                            j += 1;                                            //прибавляем в счётчик значение (кол-во букв идущих подряд)
                            break                                              //остановка цикла for
                        }
                    }
                }

                else {
                    str = morseString.slice( 0 , temporary );                  //возвращает каждый раз количество символов = temporary , от значения 0

                    for (let key in MORSE_TABLE) {                             //цикл перебора каждого key в MORSE_TABLE
                        if (str === key) {
                            translateString += MORSE_TABLE[key];
                            temporary = temporary - str.length;                //отнимаем от временной переменной оставшуюся длину
                            morseString = '';                                  //чистим значение morseString
                            j += 1;                                            //прибавляем в счётчик значение (кол-во букв идущих подряд)

                            if ( j > 1 ) {
                                translateString = translateString.slice(0, translateString.length - j) + reverseString(translateString.slice(translateString.length-j));
                            }                                                   //если символов больше 1 выполняется условие:
                                                                                //строка перевода = все символы строки перевода от 0 до (длина - счётчик символов идущих подряд)
                                                                                // к ним прибавляются все символы которые идут после, но предварительно перевёрнутые в функции

                            j = 0;                                              //обнуляем счётчик
                            break                                               //остановка цикла for
                        }
                    }
                }
            }
        }
    }
    return(translateString);                                                    //возвращаем переведённую строку
}

module.exports = {
    decode
};