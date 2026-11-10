
const formulario = document.getElementById("formCadastro");
const mensagem = document.getElementById("mensagem");

const cpf = document.getElementById("cpf");
const telefone = document.getElementById("telefone");

// Formatação do CPF
cpf.addEventListener("input", function() {
    let numero = cpf.value.replace(/\D/g, "").slice(0, 11);

    numero = numero.replace(/(\d{3})(\d)/, "$1.$2");
    numero = numero.replace(/(\d{3})(\d)/, "$1.$2");
    numero = numero.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    cpf.value = numero;
});

// Formatação do telefone
telefone.addEventListener("input", function() {
    let numero = telefone.value.replace(/\D/g, "").slice(0, 11);

    if (numero.length > 10) {
        numero = numero.replace(/^(\d{2})(\d{5})(\d{1,4})$/, "($1) $2-$3");
    } else if (numero.length > 6) {
        numero = numero.replace(/^(\d{2})(\d{4})(\d{1,4})$/, "($1) $2-$3");
    } else if (numero.length > 2) {
        numero = numero.replace(/^(\d{2})(\d+)$/, "($1) $2");
    }

    telefone.value = numero;
});

// Cadastro e validação
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const numerosCPF = cpf.value.replace(/\D/g, "");
    const numerosTelefone = telefone.value.replace(/\D/g, "");
    const salario = Number(document.getElementById("salario").value);

    mensagem.style.display = "block";
    mensagem.style.color = "red";

    if (!formulario.checkValidity()) {
        mensagem.textContent = "Preencha todos os campos corretamente!";
        formulario.reportValidity();
        return;
    }

    if (numerosCPF.length !== 11) {
        mensagem.textContent = "O CPF deve ter 11 números!";
        return;
    }

    if (numerosTelefone.length !== 10 && numerosTelefone.length !== 11) {
        mensagem.textContent = "Digite um telefone válido com DDD!";
        return;
    }

    if (salario <= 0) {
        mensagem.textContent = "Digite um salário maior que zero!";
        return;
    }

    mensagem.style.color = "green";
    mensagem.textContent = "Funcionário " + nome + " cadastrado com sucesso!";

    formulario.reset();
});

formulario.addEventListener("reset", function() {
    mensagem.textContent = "";
});
