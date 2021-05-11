/*
# Autenticação
	Cadastro de usuário
	Login

# Bando de dados

# Organização de Tarefas
# Integração com Telegram

	Nome da Tarefa
	Data Conclusão
	Status
	Descrição
	Enviar MSG ao Telegram ao Enviar e Concluir

============

# Cadastro de usuário
	ID_Usuario
	Nome
	Email
	Senha
	ID_Telegram

# Cadastrar a tarefa
	ID_Usuario
	ID_Tarefa
	Nome da tarefa
	Data conclusão
	Status
	Descrição

============

# Regras de negócio
	
	Usuário:
		Criar uma conta
		Fazer login
	
	Server:
		Criar conta:
			Garantir que todos os campos foram digitados
			Se a senha tem pelo menos 6 digitos
			Senhas sao iguais
			Verifica se já existe usuários cadastrados
			Cadastra usuário:
				Criptografar senha do user
		Efetuar login:


	Tarefa:
		Cadastrar Tarefa:
			ID_Tarefa
			Notificar Telegram
		Editar Tarefa:
			Verificar se o usuario é dono da tarefa
			ID_Tarefa
			Novos_dados
		Excluir Tarefa:
			Verificar se o usuario é dono da tarefa
			ID_Tarefa
		Listar Tarefa
			Todas
			Concluídas
			Não concluídas



=============

Rotas

	GET, POST, PUT, DELETE

	Usuário:
		POST > /create-account

	Tarefa:
		POST > /create-task, Body
		PUT > /edit-task, Parametro {ID}, Body
		GET > /get-task, Parametro {ID?, STATUS?}
		DELETE > /delete-task, Parametro {ID}



