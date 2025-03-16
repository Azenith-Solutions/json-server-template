const form = document.querySelector('.login-form');
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email_input').value;
    const password = document.getElementById('password_input').value;

    if (!fieldValidations(email, password)) {
        alert();
        return;
    };

    // try {

    //     const user = await userAuthentication(email, password);

    //     if (user) {
    //         window.location.href = "logado.html";
    //     }
    // } catch (error) {
    //     console.error("Erro ao autenticar" + error);
    // }
});

async function userAuthentication(email, password) {
    const response = await fetch("http://localhost:3000/usuarios");
    const responseJson = await response.json();

    if (!response.ok) {
        throw new Error(`Erro ao buscar usuários (API): ${response.status}`);
    }

    return responseJson.find(user => user.email === email && user.password === password);
}

function fieldValidations(email, password) {
    let passed;
    let errorMessage;
    
    if (email.trim() === '' || password.trim() === '') {
        return alert("Preencha os campos email e/ou senha devidamente");
    }

    if (!email.includes('@') || !email.includes('.')) {
        return alert(`Inclua "@" e "." no campo email`);
    }

    !password.length && (errorMessage = "A senha deve ter no mínimo 12 caracteres", passed = false);

    const hasUpperCase = /[A-Z]/.test(password);
    !hasUpperCase && alert("Inclua pelo menos uma letra maiúscula na senha");
}