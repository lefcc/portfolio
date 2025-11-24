// Selecionar a Seção About
const about = document.querySelector('#about');

// Selecionar formulário
const formulario = document.querySelector('#formulario');

// Expressão Regular pra validação de e-mail (verifica se segue padrão de email, encontro esse padrão no google)
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/


// Função para buscar os dados no GitHub
async function getApiGithub() {

    try {

        // PASSO 01: Fazer uma Requisição GET para a API do GitHub
        const dadosPerfil = await fetch('https://api.github.com/users/lefcc');

        // PASSO 02: Converter a Resposta da API para JSON
        const perfilJson = await dadosPerfil.json();


        // PASSO 03: Criar o HTML/CSS com os dados do Perfil
        let conteudo = `
        
           <!-- FOTO DO PERFIL -->
            <figure class="about_image">
                <img 
                src="${perfilJson.avatar_url}" 
                alt="Foto do perfil do GitHub - ${perfilJson.name}."
                    class="ilustracao float-animation"
                >
            </figure>

            <article class="about_content">
                <h2>Sobre Mim</h2>
                <p>Sou Letícia Campos, desenvolvedora Full-Stack, apaixonada por aprender e por conciliar requisitos de
                    negócio com o desenvolvimento de código limpo e eficiente. Minha experiência de 6 anos otimizando
                    operações em startups de tecnologia me proporcionou uma visão única para entender as necessidades do
                    negócio, competência que agora aplico para colaborar em equipe e construir soluções de software
                    robustas. </p>
                <p>Atualmente, estou aprofundando minhas habilidades no ecossistema Java através do bootcamp da
                    Generation e do curso técnico na UNICAMP.</p>
                <p>Vamos construir algo incrível juntos!</p>

                <div class="about_stats">
                    <a href="${perfilJson.html_url}" target="_blank" class="botao git">Ver GitHub</a>

                    <div class="stats-container">
                        <div class="stat-item">
                            <p class="stat-number">${perfilJson.followers}</p>
                            <p class="stat-label">Seguidores</p>
                        </div>
                        <div class="stat-item">
                            <p class="stat-number">${perfilJson.public_repos}</p>
                            <p class="stat-label">Repositório</p>
                        </div>
                    </div>

                </div>
            </article>
        `

        //PASSO 04: Adicionar o HTML dentro da Seção About
        about.innerHTML += conteudo;

    } catch (error) {
        console.error(error);
    }
}


// Função de envio e validação do formulário
formulario.addEventListener('submit', function (event) {

    // Impedir o envio automático do formulário
    event.preventDefault();

    // Validação do campo nome
    const campoNome = document.querySelector('#nome');
    const txtNome = document.querySelector('#txtNome');

    // Nome precisa ter no minimo 3 caracteres
    if (campoNome.value.length < 3) {
        txtNome.innerHTML = 'O Nome deve ter no mínimo 3 caracteres.';
        campoNome.focus();
        return;
    } else {
        txtNome.innerHTML = '';
    }

    // Validação do campo e-mail
    const campoEmail = document.querySelector('#email');
    const txtEmail = document.querySelector('#txtEmail');

    // Verifica se o e-mail é válido
    if (!campoEmail.value.match(emailRegex)) {
        txtEmail.innerHTML = 'Digite um e-mail válido.';
        campoEmail.focus();
        return;
    } else {
        txtEmail.innerHTML = '';
    }

    // Validação do campo assunto
    const campoAssunto = document.querySelector('#assunto');
    const txtAssunto = document.querySelector('#txtAssunto');

    // Assunto precisa ter no minimo 5 caracteres
    if (campoAssunto.value.length < 5) {
        txtAssunto.innerHTML = 'O Assunto deve ter no mínimo 5 caracteres.';
        campoAssunto.focus();
        return;
    } else {
        txtAssunto.innerHTML = '';
    }

    // Se passou por todas as validações, envia o formulário
    formulario.submit();
})


// Chamar a função getAPIGithub()
getApiGithub();