/**
 * Agro Fácil - Documentos dos Cooperados
 * Tela para listar e baixar documentos por cooperado.
 */

(function () {
  'use strict';

  function getCooperados() {
    return [
      { id: '1', nome: 'Maria Oliveira', cpfCnpj: '123.456.789-00' },
      { id: '2', nome: 'Ana Costa', cpfCnpj: '987.654.321-00' },
      { id: '3', nome: 'Lucia Mendes', cpfCnpj: '11.222.333/0001-44' },
      { id: '4', nome: 'Pedro Henrique', cpfCnpj: '555.666.777-88' },
      { id: '5', nome: 'Roberto Souza', cpfCnpj: '111.222.333-44' },
      { id: '6', nome: 'Carla Santos', cpfCnpj: '22.333.444/0001-55' }
    ];
  }

  function getDocumentosCooperado(cooperadoId) {
    var mockDocs = {
      '1': [
        { id: 'd1', tipo: 'Contrato social', nome: 'Contrato social', itv: 'ITV-2024-001', dataVencimento: '2025-01-15', status: 'vencido', urlDownload: '#' },
        { id: 'd2', tipo: 'Certidão negativa', nome: 'CND Receita Federal', itv: 'ITV-2024-002', dataVencimento: '2025-06-10', status: 'no_prazo', urlDownload: '#' }
      ],
      '2': [
        { id: 'd3', tipo: 'Certidão negativa', nome: 'CND INSS', itv: 'ITV-2024-004', dataVencimento: '2025-02-03', status: 'vencido', urlDownload: '#' },
        { id: 'd4', tipo: 'Licença ambiental', nome: 'Licença de operação', itv: 'ITV-2024-005', dataVencimento: '2025-08-20', status: 'no_prazo', urlDownload: '#' }
      ],
      '3': [
        { id: 'd5', tipo: 'Alvará', nome: 'Alvará sanitário', itv: 'ITV-2024-006', dataVencimento: '2025-02-18', status: 'vencido', urlDownload: '#' }
      ],
      '4': [
        { id: 'd6', tipo: 'Licença ambiental', nome: 'Licença de operação', itv: 'ITV-2024-007', dataVencimento: '2025-03-05', status: 'a_vencer', urlDownload: '#' }
      ],
      '5': [
        { id: 'd7', tipo: 'Contrato social', nome: 'Contrato social', itv: 'ITV-2024-009', dataVencimento: '2025-03-12', status: 'a_vencer', urlDownload: '#' }
      ],
      '6': [
        { id: 'd8', tipo: 'Certidão negativa', nome: 'CND municipal', itv: 'ITV-2024-010', dataVencimento: '2025-03-20', status: 'a_vencer', urlDownload: '#' },
        { id: 'd9', tipo: 'Alvará', nome: 'Alvará sanitário', itv: 'ITV-2024-011', dataVencimento: '2025-09-15', status: 'no_prazo', urlDownload: '#' }
      ]
    };
    return mockDocs[cooperadoId] || [];
  }

  function formatarData(str) {
    if (!str) return '-';
    var d = new Date(str + 'T12:00:00');
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  function statusLabel(s) {
    return s === 'vencido' ? 'Vencido' : s === 'a_vencer' ? 'A vencer' : 'No prazo';
  }

  function statusClass(s) {
    return s === 'vencido' ? 'status-vencido' : s === 'a_vencer' ? 'status-perto' : 'status-em-dia';
  }

  function montarListaDocs() {
    var cooperados = getCooperados();
    var lista = [];

    cooperados.forEach(function (c) {
      getDocumentosCooperado(c.id).forEach(function (doc) {
        lista.push({
          cooperadoId: c.id,
          cooperado: c.nome,
          cpfCnpj: c.cpfCnpj,
          tipo: doc.tipo,
          nome: doc.nome,
          itv: doc.itv,
          dataVencimento: doc.dataVencimento,
          status: doc.status,
          urlDownload: doc.urlDownload
        });
      });
    });

    return lista;
  }

  function aplicarFiltros(docs) {
    var tipoSel = document.getElementById('filtro-doc-tipo');
    var statusSel = document.getElementById('filtro-doc-status');
    var tipo = tipoSel ? tipoSel.value : '';
    var status = statusSel ? statusSel.value : '';

    return docs.filter(function (d) {
      var okTipo = !tipo || d.tipo === tipo;
      var okStatus = !status || d.status === status;
      return okTipo && okStatus;
    });
  }

  function renderTabela(docs) {
    var tbody = document.getElementById('tbody-docs-cooperados');
    if (!tbody) return;

    if (!docs.length) {
      tbody.innerHTML = '<tr><td colspan="7">Nenhum documento encontrado para os filtros selecionados.</td></tr>';
      return;
    }

    tbody.innerHTML = docs.map(function (d) {
      return (
        '<tr>' +
          '<td>' + d.cooperado + '</td>' +
          '<td>' + d.cpfCnpj + '</td>' +
          '<td>' + d.tipo + '</td>' +
          '<td><code>' + d.itv + '</code></td>' +
          '<td>' + formatarData(d.dataVencimento) + '</td>' +
          '<td><span class=\"status-badge ' + statusClass(d.status) + '\">' + statusLabel(d.status) + '</span></td>' +
          '<td><a href=\"' + d.urlDownload + '\" class=\"btn-download\" download target=\"_blank\" rel=\"noopener\">Baixar</a></td>' +
        '</tr>'
      );
    }).join('');
  }

  function init() {
    var todosDocs = montarListaDocs();

    function atualizar() {
      renderTabela(aplicarFiltros(todosDocs));
    }

    document.getElementById('filtro-doc-tipo') &&
      document.getElementById('filtro-doc-tipo').addEventListener('change', atualizar);
    document.getElementById('filtro-doc-status') &&
      document.getElementById('filtro-doc-status').addEventListener('change', atualizar);

    atualizar();
  }

  if (document.getElementById('tbody-docs-cooperados')) {
    init();
  }
})();

