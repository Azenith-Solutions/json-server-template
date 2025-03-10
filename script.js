const form = document.querySelector('.login-form');
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
        const email = document.getElementById('email_input').value;
        const password = document.getElementById('password_input').value;

        const user = await userAuthentication(email, password);
        
        if (user) {
            window.location.href = "logado.html";
        }
    } catch (error) {
        console.error("Erro ao autenticar" + error);
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