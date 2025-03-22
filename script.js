const form = document.querySelector('.login-form');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email_input').value;
    const password = document.getElementById('password_input').value;

    if (!passedValidations(email, password)) {
        return;
    };

    try {
        const user = await userAuthentication(email, password);

        if (user) {
            window.location.href = "logado.html";
        }
    } catch (error) {
        modalBuilder("Erro", "Em manutenção, tente novamente mais tarde.");
        console.error("Erro ao autenticar " + error);
    }
});

async function userAuthentication(email, password) {
    const response = await fetch("http://localhost:3000/usuarios");
    const responseJson = await response.json();

    if (!response.ok) {
        throw new Error(`Erro ao buscar usuários (API): ${response.status}`);
    }

    return responseJson.find(user => user.email === email && user.password === password);
}

function passedValidations(email, password) {
    if (email.trim() === '' || password.trim() === '') {
        modalBuilder("Email e/ou Senha inválidos", "Preencha todos os campos");
        return false;
    }

    if (!email.includes('@') || !email.includes('.')) {
        modalBuilder("Email inválido", "O email deve conter '@' e '.'");
        return false;
    }

    if (password.length < 6 && password.length > 20) {
        modalBuilder("Email e/ou Senha inválidos", "A senha deve ter no mínimo 12 caracteres");
        return false;
    }

    const hasUpperCase = /[A-Z]/.test(password);

    if (!hasUpperCase) {
        modalBuilder("Email e/ou Senha inválidos", "A senha deve conter pelo menos uma letra maiúscula");
        return false;
    }

    const hasNumber = /[0-9]/.test(password);

    if (!hasNumber) {
        modalBuilder("Email e/ou Senha inválidos", "A senha deve conter pelo menos um número");
        return false;
    }

    return true;
}

function modalBuilder(title, description) {
    const containerModal = document.createElement('div');
    containerModal.classList.add('container-modal');

    const contentModal = document.createElement('div');
    contentModal.classList.add('content-modal');

    const imgModal = document.createElement('img');
    imgModal.src = 'assets/icon-warning.svg';
    imgModal.alt = 'Ícone de alerta';

    const titleModal = document.createElement('h2');
    titleModal.innerText = title;

    const descriptionModal = document.createElement('p');
    descriptionModal.innerText = description;

    const buttonModal = document.createElement('button');
    buttonModal.innerText = 'Fechar';

    contentModal.appendChild(imgModal);
    contentModal.appendChild(titleModal);
    contentModal.appendChild(descriptionModal);
    contentModal.appendChild(buttonModal);
    containerModal.appendChild(contentModal);
    document.body.appendChild(containerModal);

    buttonModal.addEventListener('click', () => {
        containerModal.remove();
    });
}