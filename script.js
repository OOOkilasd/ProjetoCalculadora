let runningTotal = 0;  // Armazena o total acumulado da operação
let buffer = "0";  // Armazena o número que está sendo exibido na tela
let previousOperator;  // Armazena o operador anterior (como +, −, ×, ÷)
let previousValue = ""; // Armazena o valor e operador anterior para exibição

const screen = document.querySelector('.screen');  // Seleciona a tela onde os números são exibidos

// Função que é chamada quando um botão é pressionado
function buttonClick(value){
    if(isNaN(value)){  // Se o valor não for um número
        handleSymbol(value);  // Chama a função para tratar símbolos (operadores)
    }else{
        handleNumber(value);  // Chama a função para tratar números
    }
    updateScreen();  // Atualiza a tela com o valor atual e a operação anterior
}

// Função que lida com os símbolos (operadores e outros)
function handleSymbol(symbol){
    switch(symbol){
        case 'C':  // Se o botão pressionado for 'C' (limpar)
            buffer = '0';  // Reseta o buffer para '0'
            runningTotal = 0;  // Reseta o total acumulado
            previousValue = "";  // Reseta a operação anterior
            break;
        case '=':  // Se o botão pressionado for '=' (igual)
            if(previousOperator === null){  // Se não houver operador anterior
                return;  // Não faz nada
            }
            flushOperation(parseInt(buffer));  // Executa a operação com o número atual do buffer
            previousOperator = null;  // Reseta o operador anterior
            buffer = runningTotal.toString();  // Exibe o total final
            runningTotal = 0;  // Reseta o total acumulado
            previousValue = "";  // Reseta a operação anterior
            break;
        case '←':  // Se o botão pressionado for '←' (backspace)
            if(buffer.length === 1){  // Se o buffer tiver apenas um dígito
                buffer = '0';  // Reseta o buffer para '0'
            }else{
                buffer = buffer.substring(0, buffer.length - 1);  // Remove o último dígito do buffer
            }
            break;
        case '+':  // Caso o operador seja '+'
        case '−':  // Caso o operador seja '−'
        case '×':  // Caso o operador seja '×'
        case '÷':  // Caso o operador seja '÷'
            handleMath(symbol);  // Chama a função para realizar a operação matemática
            break;
    }
}

// Função que lida com os operadores matemáticos
function handleMath(symbol){
    if(buffer === '0'){  // Se o buffer estiver vazio (com '0')
        return;  // Não faz nada
    }

    const intBuffer = parseInt(buffer);  // Converte o buffer para número inteiro

    if(runningTotal === 0){  // Se o total acumulado for 0 (primeira operação)
        runningTotal = intBuffer;  // Inicializa o total com o valor do buffer
    }else{
        flushOperation(intBuffer);  // Executa a operação com o número atual
    }

    previousOperator = symbol;  // Armazena o operador atual
    previousValue = runningTotal + " " + previousOperator;  // Armazena o valor e operador anterior
    buffer = '0';  // Reseta o buffer para '0' para o próximo número
}

// Função que executa a operação matemática
function flushOperation(intBuffer){
    // Executa a operação com base no operador armazenado
    if(previousOperator === '+'){
        runningTotal += intBuffer;  // Adiciona o valor
    }else if(previousOperator === '−'){
        runningTotal -= intBuffer;  // Subtrai o valor
    }else if(previousOperator === '×'){
        runningTotal *= intBuffer;  // Multiplica o valor
    }else if(previousOperator === '÷'){
        if (intBuffer === 0) {  // Se tentar dividir por zero
            alert("Erro: divisão por zero!");  // Exibe um alerta
            return;  // Não faz a operação
        }
        runningTotal /= intBuffer;  // Divide o valor
    }
}

// Função que lida com os números pressionados
function handleNumber(numberString){
    if(buffer === "0"){  // Se o buffer for '0', substitui pelo número pressionado
        buffer = numberString;
    }else{
        buffer += numberString;  // Caso contrário, concatena o número no buffer
    }
}

// Função para atualizar a tela da calculadora
function updateScreen() {
    // Atualiza a parte de operação anterior
    const previousOperationElement = document.querySelector('.previous-operation');
    const currentOperationElement = document.querySelector('.current-operation');

    previousOperationElement.innerText = previousValue;  // Exibe a operação anterior
    currentOperationElement.innerText = buffer;  // Exibe o número atual no buffer
}

// Função de inicialização que adiciona o ouvinte de eventos nos botões
function init(){
    document.querySelector('.calc-buttons').  // Seleciona os botões da calculadora
    addEventListener('click', function(event){  // Adiciona um ouvinte de evento para clique
        buttonClick(event.target.innerText);  // Chama a função buttonClick com o valor do botão pressionado
    });
}

init();  // Chama a função de inicialização
