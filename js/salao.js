function cadastrarAgendamento() {

    let nome = document.getElementById("nome").value;

    let profissional = document.getElementById("profissional").value;

    let sexo = document.querySelector('input[name="sexo"]:checked').value;

    let data = document.getElementById("data").value;

    let horario = document.getElementById("horario").value;

    let erroHorario = document.getElementById("erroHorario");

    // Impede confirmar o agendamento se o horário escolhido estiver fora do expediente do profissional
    if (!horarioDentroDoExpediente(profissional, horario)) {

        erroHorario.innerText = "Este Profissional não atua neste horário!";
        return;

    }

    erroHorario.innerText = "";

    let servicos = document.querySelectorAll (".serv:checked");

    let listaServicos = [];

    servicos.forEach(function(servico) {

        listaServicos.push(servico.value);

    });

    localStorage.setItem ("nomeCliente", nome);

    localStorage.setItem ("profissional", profissional);

    localStorage.setItem ("sexoCliente", sexo);

    localStorage.setItem ("listaServicos", listaServicos.join(", "));

    localStorage.setItem ("data", data);
    
    localStorage.setItem ("horario", horario);

    window.location.href = "comprovante.html";


}

// Horário de trabalho de cada profissional (início e fim, em minutos facilita comparar)
const horariosProfissionais = {
    "Carlos (Cabelereiro)": { inicio: "08:00", fim: "17:00" },
    "Mariana (Cabelereira)": { inicio: "09:00", fim: "18:00" },
    "Roberto (Barbeiro)": { inicio: "10:00", fim: "19:00" },
    "Ana (Esteticista)": { inicio: "08:00", fim: "16:00" },
    "Indiferente": null
};

// Converte "HH:MM" em minutos, para dar pra comparar horários facilmente
function converterParaMinutos(horario) {

    let partes = horario.split(":");
    return (parseInt(partes[0], 10) * 60) + parseInt(partes[1], 10);

}

// Confere se o horário escolhido está dentro do expediente do profissional.
// "Indiferente" não tem expediente fixo, então qualquer horário é aceito.
function horarioDentroDoExpediente(profissional, horario) {

    let expediente = horariosProfissionais[profissional];

    if (!expediente || !horario) {
        return true;
    }

    let minutosEscolhidos = converterParaMinutos(horario);
    let minutosInicio = converterParaMinutos(expediente.inicio);
    let minutosFim = converterParaMinutos(expediente.fim);

    return minutosEscolhidos >= minutosInicio && minutosEscolhidos <= minutosFim;

}

// Mostra abaixo do select o horário de trabalho do profissional escolhido,
// para o cliente não marcar um horário fora do expediente por engano
function atualizarHorarioProfissional() {

    let profissional = document.getElementById("profissional").value;

    let aviso = document.getElementById("avisoHorarioProfissional");

    let expediente = horariosProfissionais[profissional];

    let texto = expediente ? (expediente.inicio + " às " + expediente.fim) : "Conforme disponibilidade";

    aviso.innerText = "⏰ Horário de trabalho: " + texto;

    // Limpa qualquer erro de horário mostrado anteriormente ao trocar de profissional
    document.getElementById("erroHorario").innerText = "";

}

