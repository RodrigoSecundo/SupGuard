from flask import Blueprint, request, jsonify
from models import db, Usuario
from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint('api', __name__)

@api.route('/register', methods=['POST'])
def register():
    data = request.json
    nome = data.get('nome')
    telefone = data.get('telefone')
    email = data.get('email')
    senha = data.get('senha')
    confirmar_senha = data.get('confirmarSenha')

    if not nome or not telefone or not email or not senha or not confirmar_senha:
        return jsonify({'error': 'Todos os campos são obrigatórios'}), 400

    if senha != confirmar_senha:
        return jsonify({'error': 'As senhas não coincidem'}), 400

    if Usuario.query.filter_by(email=email).first():
        return jsonify({'error': 'Email já está em uso'}), 400

    novo_usuario = Usuario(
        nome=nome,
        telefone=telefone,
        email=email,
        senha=generate_password_hash(senha)
    )
    db.session.add(novo_usuario)
    db.session.commit()

    return jsonify({'message': 'Usuário registrado com sucesso'}), 201

@api.route('/login', methods=['POST'])
def login():
    data = request.json
    email_ou_telefone = data.get('email_ou_telefone')
    senha = data.get('senha')

    user = Usuario.query.filter_by(email_ou_telefone=email_ou_telefone).first()
    if user and check_password_hash(user.senha, senha):
        return jsonify({'message': 'Login bem-sucedido', 'user_id': user.id})
    else:
        return jsonify({'error': 'Credenciais inválidas'}), 401
