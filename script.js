const tamanhoInput = document.getElementById('tamanho');
const tamanhoValor = document.getElementById('tamanho-valor');
const incluirMaiusculas = document.getElementById('incluir-maiusculas');
const incluirMinusculas = document.getElementById('incluir-minusculas');
const incluirNumeros = document.getElementById('incluir-numeros');
const incluirSimbolos = document.getElementById('incluir-simbolos');
const gerarSenhaBtn = document.getElementById('gerar-senha');
const senhaGeradaInput = document.getElementById('senha-gerada');
const copiarSenhaBtn = document.getElementById('copiar-senha');
const indicadorForca = document.getElementById('indicador-forca');

const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
const numeros = '0123456789';
const simbolos = '!@#$%^&*()_+=-{}[]|:;<>,.?/';

tamanhoInput.addEventListener('input', () => {
    tamanhoValor.textContent = tamanhoInput.value;
});

gerarSenhaBtn.addEventListener('click', () => {
    const tamanho = tamanhoInput.value;
    const incluiMaiusculas = incluirMaiusculas.checked;
    const incluiMinusculas = incluirMinusculas.checked;
    const incluiNumeros = incluirNumeros.checked;
    const incluiSimbolos = incluirSimbolos.checked;

    const senha = gerarSenha(tamanho, incluiMaiusculas, incluiMinusculas, incluiNumeros, incluiSimbolos);
    senhaGeradaInput.value = senha;
    avaliarForca(senha);
});

copiarSenhaBtn.addEventListener('click', () => {
    senhaGeradaInput.select();
    document.execCommand('copy');
    alert('Senha copiada para a área de transferência!');
});

function gerarSenha(tamanho, maiusculas, minusculas, numeros, simbolos) {
    let caracteresDisponiveis = '';
    if (maiusculas) caracteresDisponiveis += letrasMaiusculas;
    if (minusculas) caracteresDisponiveis += letrasMinusculas;
    if (numeros) caracteresDisponiveis += numeros;
    if (simbolos) caracteresDisponiveis += simbolos;

    let senha = '';
    for (let i = 0; i < tamanho; i++) {
        const caractereAleatorio = caracteresDisponiveis[Math.floor(Math.random() * caracteresDisponiveis.length)];
        senha += caractereAleatorio;
    }

    return senha;
}

function avaliarForca(senha) {
    let forca = 0;
    const regexMaiuscula = /[A-Z]/;
    const regexMinuscula = /[a-z]/;
    const regexNumero = /\d/;
    const regexSimbolo = /[!@#$%^&*()_+=\-\[\]{};':"\\|,.<>\/?]+/;

    if (regexMaiuscula.test(senha)) forca += 1;
    if (regexMinuscula.test(senha)) forca += 1;
    if (regexNumero.test(senha)) forca += 1;
    if (regexSimbolo.test(senha)) forca += 1;
    if (senha.length >= 12) forca += 1;

    switch (forca) {
        case 1:
            indicadorForca.style.backgroundColor = 'red';
            indicadorForca.style.width = '20%';
            break;
        case 2:
            indicadorForca.style.backgroundColor = 'orange';
            indicadorForca.style.width = '40%';
            break;
        case 3:
            indicadorForca.style.backgroundColor = 'yellow';
            indicadorForca.style.width = '60%';
            break;
        case 4:
            indicadorForca.style.backgroundColor = 'lightgreen';
            indicadorForca.style.width = '80%';
            break;
        case 5:
            indicadorForca.style.backgroundColor = 'green';
            indicadorForca.style.width = '100%';
            break;
        default:
            indicadorForca.style.backgroundColor = '#bdc3c7';
            indicadorForca.style.width = '0';
    }
}
