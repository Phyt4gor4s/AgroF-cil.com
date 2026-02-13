/**
 * Agro Fácil - Painel de Cooperados
 * Planilha profissional com cooperados em atenção.
 * Integração backend: substituir getCooperados() por chamadas à API.
 */

(function () {
  'use strict';

  // --- Dados (em produção virão do backend) ---
  function getCooperados() {
    // GET /api/cooperados ou similar
    return [
      { id: '1', nome: 'Maria Oliveira', cpfCnpj: '123.456.789-00', statusDocumento: 'vencido', dataVencimento: '2025-01-15', atividade: 'Soja e milho', telefone: '(45) 99912-3456', endereco: 'Rua das Flores, 123 – Cascavel, PR', email: 'maria.oliveira@email.com', whatsapp: '(45) 99912-3456' },
      { id: '2', nome: 'Ana Costa', cpfCnpj: '987.654.321-00', statusDocumento: 'vencido', dataVencimento: '2025-02-03', atividade: 'Pecuária de corte', telefone: '(45) 99823-4567', endereco: 'Av. Brasil, 456 – Cascavel, PR', email: 'ana.costa@email.com', whatsapp: '(45) 99823-4567' },
      { id: '3', nome: 'Lucia Mendes', cpfCnpj: '11.222.333/0001-44', statusDocumento: 'vencido', dataVencimento: '2025-02-18', atividade: 'Avicultura', telefone: '(45) 99734-5678', endereco: 'Rod. BR-277, Km 10 – Cascavel, PR', email: 'lucia.mendes@email.com', whatsapp: '(45) 99734-5678' },
      { id: '4', nome: 'Pedro Henrique', cpfCnpj: '555.666.777-88', statusDocumento: 'perto_vencer', dataVencimento: '2025-03-05', atividade: 'Suinocultura', telefone: '(45) 99645-6789', endereco: 'Estr. Rural, 78 – Cascavel, PR', email: 'pedro.henrique@email.com', whatsapp: '(45) 99645-6789' },
      { id: '5', nome: 'Roberto Souza', cpfCnpj: '111.222.333-44', statusDocumento: 'perto_vencer', dataVencimento: '2025-03-12', atividade: 'Soja', telefone: '(45) 99556-7890', endereco: 'Rua do Comércio, 90 – Cascavel, PR', email: 'roberto.souza@email.com', whatsapp: '(45) 99556-7890' },
      { id: '6', nome: 'Carla Santos', cpfCnpj: '22.333.444/0001-55', statusDocumento: 'perto_vencer', dataVencimento: '2025-03-20', atividade: 'Milho e feijão', telefone: '(45) 99467-8901', endereco: 'Av. Caxambu, 234 – Cascavel, PR', email: 'carla.santos@email.com', whatsapp: '(45) 99467-8901' }
    ];
  }

  var cooperados = getCooperados();
  var irregulares = cooperados.filter(function (c) {
    return c.statusDocumento === 'vencido' || c.statusDocumento === 'perto_vencer';
  });

  function formatarData(str) {
    if (!str) return '-';
    var d = new Date(str + 'T12:00:00');
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  function totalVencidos() {
    return cooperados.filter(function (c) { return c.statusDocumento === 'vencido'; }).length;
  }

  function atualizarResumo() {
    var v = totalVencidos();
    var el = document.getElementById('total-vencidos');
    if (el) el.textContent = v;
  }

  function atualizarNotificacao() {
    var total = irregulares.length;
    var box = document.getElementById('notificacao-alerta');
    var texto = document.getElementById('notificacao-texto');
    if (!box || !texto) return;
    if (total > 0) {
      box.style.display = 'flex';
      texto.textContent = 'Atenção! Existem ' + total + ' cooperado(s) em atenção (vencidos ou próximos do vencimento).';
    } else {
      box.style.display = 'none';
    }
  }

  function ordenarPorData(a, b) {
    return new Date(a.dataVencimento) - new Date(b.dataVencimento);
  }

  function escapeHtml(s) {
    var div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  function statusLabel(s) {
    return s === 'vencido' ? 'Vencido' : s === 'perto_vencer' ? 'A vencer' : 'No prazo';
  }

  function statusClass(s) {
    return s === 'vencido' ? 'status-vencido' : s === 'perto_vencer' ? 'status-perto' : 'status-em-dia';
  }

  function abrirModalContato(cooperado) {
    var modal = document.getElementById('modal-cooperado');
    var nomeEl = document.getElementById('modal-nome');
    var contatoEl = document.getElementById('modal-contato');
    if (!modal || !nomeEl || !contatoEl) return;

    nomeEl.textContent = cooperado.nome;
    var html = '';
    if (cooperado.telefone) html += '<p><strong>Telefone:</strong> <a href="tel:' + cooperado.telefone.replace(/\D/g, '') + '">' + escapeHtml(cooperado.telefone) + '</a></p>';
    if (cooperado.whatsapp) html += '<p><strong>WhatsApp:</strong> <a href="https://wa.me/55' + cooperado.whatsapp.replace(/\D/g, '') + '" target="_blank" rel="noopener">' + escapeHtml(cooperado.whatsapp) + '</a></p>';
    if (cooperado.email) html += '<p><strong>E-mail:</strong> <a href="mailto:' + escapeHtml(cooperado.email) + '">' + escapeHtml(cooperado.email) + '</a></p>';
    if (cooperado.endereco) html += '<p><strong>Endereço:</strong> ' + escapeHtml(cooperado.endereco) + '</p>';

    contatoEl.innerHTML = html || '<p>Nenhum dado de contato cadastrado.</p>';
    modal.classList.add('ativo');
  }

  function fecharModalContato() {
    var modal = document.getElementById('modal-cooperado');
    if (modal) modal.classList.remove('ativo');
  }

  function renderizarTabela() {
    var tbody = document.getElementById('tbody-cooperados');
    if (!tbody) return;
    var ordenados = irregulares.slice().sort(ordenarPorData);

    tbody.innerHTML = ordenados.map(function (c, i) {
      var status = statusLabel(c.statusDocumento);
      var classe = statusClass(c.statusDocumento);
      return (
        '<tr class="linha-cooperado" data-index="' + i + '">' +
          '<td class="td-nome">' + escapeHtml(c.nome) + '</td>' +
          '<td class="td-cpf">' + escapeHtml(c.cpfCnpj || '-') + '</td>' +
          '<td class="td-tel">' + escapeHtml(c.telefone || '-') + '</td>' +
          '<td class="td-status"><span class="status-badge ' + classe + '">' + escapeHtml(status) + '</span></td>' +
        '</tr>'
      );
    }).join('');

    tbody.querySelectorAll('.linha-cooperado').forEach(function (tr) {
      var idx = parseInt(tr.getAttribute('data-index'), 10);
      var cooperado = ordenados[idx];
      if (!cooperado) return;

      tr.addEventListener('click', function (e) {
        abrirModalContato(cooperado);
      });
    });

  }

  function init() {
    atualizarResumo();
    atualizarNotificacao();
    renderizarTabela();

    document.getElementById('modal-fechar') && document.getElementById('modal-fechar').addEventListener('click', fecharModalContato);
    document.getElementById('modal-cooperado') && document.getElementById('modal-cooperado').addEventListener('click', function (e) { if (e.target === this) fecharModalContato(); });
  }

  if (document.getElementById('tbody-cooperados')) init();
})();
