class Cliente {
    constructor(){ // É chamado toda vez que a classe é instanciada
        // Recupera os clientes armazenados no localStorage ou inicializa como um array vazio
        this.clientes = JSON.parse(localStorage.getItem('tbClientes')) || [];       
    }

    // Define os campos estáticos que representam as propriedades de um cliente
    static fields = ['nome', 'sobrenome', 'data', 'email', 'locacao', 'sexo', 'checkbox'];

    // Método para salvar um cliente
    salva(cliente){
        // Adiciona o cliente ao array de clientes
        this.clientes.push(cliente);
        // Atualiza o localStorage com a lista atualizada de clientes
        localStorage.setItem('tbClientes', JSON.stringify(this.clientes));
        // Exibe um alerta informando que o cliente foi salvo com sucesso
        alert('Cliente salvo com sucesso ✔');
        // Atualiza a listagem de clientes na página
        this.lista();
        // Limpa os campos do formulário
        document.getElementById('nome').value = '';
        document.getElementById('sobrenome').value = '';
        document.getElementById('data').value = '';
        document.getElementById('email').value = '';
        document.getElementById('locacao').value = '';   
    }

    // Método para listar os clientes na tabela HTML
    lista(){
        const tbody = document.getElementById('listaClientes');        
        // Cria as linhas da tabela com os dados de cada cliente
        const linhas = this.clientes.map(cliente => {
            return `
            <tr>
               <td>${cliente.nome}</td>
               <td>${cliente.sobrenome}</td>
               <td>${new Date(cliente.data).toLocaleDateString()}</td>
               <td>${cliente.email}</td>
               <td>${cliente.locacao}</td>
               <td>${cliente.sexo}</td>
               <td>${cliente.checkbox}</td>
            </tr>`;        
        });
        // Atualiza o conteúdo do corpo da tabela com as novas linhas
        tbody.innerHTML = linhas.join('');
    }
}

// Criando uma instância da classe Cliente
const cliente = new Cliente();

// Event listener para o botão "Salvar"
document.getElementById('salvar').addEventListener('click', (event) => {
    event.preventDefault(); // Evita que a página seja recarregada

    // Verifica o sexo selecionado
    let valorSexo = document.getElementById('masculino').checked ? 'Masculino' : 'Feminino';

    // Verifica a confirmação selecionada
    let valorcheck = document.getElementById('sim').checked ? 'Sim' : 'Não';

    // Obtém o valor do email do campo de entrada
    const email = document.getElementById('email').value;

    // Cria um objeto com os dados do cliente
    const registro = {
        nome: document.getElementById('nome').value,
        sobrenome: document.getElementById('sobrenome').value,
        data: document.getElementById('data').value,
        email: email, // Adicionando o campo email ao objeto registro
        locacao: document.getElementById('locacao').value,
        sexo: valorSexo,
        checkbox: valorcheck
    };

    // Salva os dados do cliente
    cliente.salva(registro);
});

// Carrega a listagem de clientes quando a página é carregada
window.onload = function(){
    cliente.lista();
};