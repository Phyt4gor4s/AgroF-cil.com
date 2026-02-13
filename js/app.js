/**
 * Agro Fácil - Aplicação principal
 * Autenticação e navegação
 */

(function () {
  'use strict';

  const STORAGE_USER = 'agroFacil_user';
  const STORAGE_COOPERATIVA = 'agroFacil_cooperativa';

  /**
   * Verifica se o usuário está logado (para páginas que exigem autenticação)
   */
  function getUsuarioLogado() {
    try {
      const data = sessionStorage.getItem(STORAGE_USER);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  /**
   * Salva sessão após login
   */
  function salvarSessao(usuario, cooperativa) {
    sessionStorage.setItem(STORAGE_USER, JSON.stringify(usuario));
    sessionStorage.setItem(STORAGE_COOPERATIVA, cooperativa || 'coopavel');
  }

  /**
   * Remove sessão (logout)
   */
  function limparSessao() {
    sessionStorage.removeItem(STORAGE_USER);
    sessionStorage.removeItem(STORAGE_COOPERATIVA);
  }

  /**
   * Autenticação simples (em produção usar backend)
   * Aceita qualquer usuário/senha para demonstração; pode restringir depois
   */
  function fazerLogin(usuario, senha) {
    if (!usuario || !senha) return { ok: false, msg: 'Preencha usuário e senha.' };
    // Demo: aceita qualquer login. Em produção, chamar API.
    salvarSessao({ nome: usuario, login: usuario }, 'coopavel');
    return { ok: true };
  }

  // ===== Página de Login =====
  const formLogin = document.getElementById('form-login');
  if (formLogin) {
    formLogin.addEventListener('submit', function (e) {
      e.preventDefault();
      const usuario = document.getElementById('usuario').value.trim();
      const senha = document.getElementById('senha').value;
      const msgErro = document.getElementById('msg-erro');
      const btnLogin = document.getElementById('btn-login');

      msgErro.style.display = 'none';
      btnLogin.disabled = true;
      btnLogin.textContent = 'Entrando...';

      const resultado = fazerLogin(usuario, senha);

      if (resultado.ok) {
        window.location.href = 'painel.html';
        return;
      }

      msgErro.textContent = resultado.msg || 'Usuário ou senha inválidos.';
      msgErro.style.display = 'block';
      btnLogin.disabled = false;
      btnLogin.textContent = 'Entrar';
    });
  }

  // ===== Painel: exibir usuário e botão Sair =====
  const userInfo = document.getElementById('user-info');
  if (userInfo) {
    const usuario = getUsuarioLogado();
    if (usuario) {
      userInfo.textContent = 'Olá, ' + (usuario.nome || usuario.login || 'Usuário');
    } else {
      // Não logado: redirecionar para login
      window.location.replace('login.html?cooperativa=coopavel');
    }
  }

  const btnSair = document.getElementById('btn-sair');
  if (btnSair) {
    btnSair.addEventListener('click', function (e) {
      e.preventDefault();
      limparSessao();
      window.location.href = 'index.html';
    });
  }

  // Expor para uso em painel.js
  window.AgroFacil = {
    getUsuarioLogado: getUsuarioLogado,
    getCooperativa: function () {
      return sessionStorage.getItem(STORAGE_COOPERATIVA) || 'coopavel';
    },
    limparSessao: limparSessao
  };
})();
