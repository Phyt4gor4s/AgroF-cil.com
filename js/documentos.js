/**
 * Agro Fácil - Tipos de Documentos
 * Tela para seleção de tipo de documento e campos necessários.
 */

(function () {
  'use strict';

  // Campos que o sistema já sabe (perfil) x campos que ainda precisam ser preenchidos
  // Só mostramos cards para o que falta, como você pediu.
  var tipos = {
    loa: {
      titulo: 'Licença de Operação Ambiental',
      descricao: 'Autorização emitida pelo órgão ambiental para o funcionamento regular da atividade agropecuária.',
      orgao: 'Órgão emissor: IAT / Órgão ambiental estadual',
      validade: 'Validade típica: 2 a 4 anos (varia por estado)',
      auto: [
        'Razão social da cooperativa (perfil cooperativa)',
        'CNPJ da cooperativa',
        'Endereço da sede (rua, número, bairro, município, CEP)',
        'Nome da unidade / propriedade (perfil unidade)',
        'Endereço da unidade',
        'Atividade principal da unidade'
      ],
      campos: [
        {
          id: 'coords',
          nome: 'Coordenadas geográficas da unidade',
          responsavel: 'Cooperado / Técnico',
          tipo: 'text',
          placeholder: 'Ex.: -24.955000, -53.455000',
          detalhe: 'Latitude e longitude aproximadas da área onde a atividade é realizada.'
        },
        {
          id: 'capacidade',
          nome: 'Capacidade de produção / rebanho',
          responsavel: 'Cooperado',
          tipo: 'text',
          placeholder: 'Ex.: 250 matrizes suínas, 300 ha soja/ano',
          detalhe: 'Informe a capacidade instalada ou produção média anual.'
        },
        {
          id: 'processo',
          nome: 'Descrição do processo produtivo',
          responsavel: 'Cooperado / Técnico',
          tipo: 'textarea',
          placeholder: 'Resuma as etapas principais do processo produtivo…',
          detalhe: 'Fluxo básico da atividade, principais insumos utilizados e forma de armazenamento.'
        },
        {
          id: 'croqui',
          nome: 'Croqui / planta da unidade',
          responsavel: 'Cooperado / Eng. responsável',
          tipo: 'text',
          placeholder: 'Link ou local do arquivo dentro do sistema da cooperativa',
          detalhe: 'Indique onde está armazenado o croqui ou planta (anexo digital ou referência interna).'
        },
        {
          id: 'laudos',
          nome: 'Laudos / estudos ambientais',
          responsavel: 'Técnico responsável',
          tipo: 'textarea',
          placeholder: 'Liste EIA/RIMA, PGRS, outorgas ou outros estudos exigidos…',
          detalhe: 'Só preencha se esse tipo de laudo for exigido para a atividade.'
        }
      ],
      checklist: [
        'Conferir se todos os campos obrigatórios do formulário do órgão ambiental estão preenchidos.',
        'Validar dados de CNPJ, endereço da cooperativa e da unidade (vindos do perfil).',
        'Anexar croqui/planta e laudos ambientais, quando exigidos.',
        'Verificar prazos e taxas do processo de licenciamento.',
        'Salvar ou protocolar o envio no sistema do órgão ambiental.'
      ]
    },
    cnd: {
      titulo: 'Certidão Negativa de Débitos',
      descricao: 'Comprova a inexistência de débitos perante um órgão (Receita Federal, INSS, município, etc.).',
      orgao: 'Órgão emissor: Receita Federal / INSS / Órgão municipal',
      validade: 'Validade típica: 30 a 180 dias, dependendo do órgão.',
      auto: [
        'CPF ou CNPJ (perfil cooperado/cooperativa)',
        'Nome completo / Razão social'
      ],
      campos: [
        {
          id: 'orgao_cnd',
          nome: 'Órgão para o qual a CND será emitida',
          responsavel: 'Cooperativa',
          tipo: 'text',
          placeholder: 'Ex.: Receita Federal, INSS, Prefeitura de Cascavel',
          detalhe: 'Ajuda a escolher o portal correto de emissão da certidão.'
        },
        {
          id: 'email_cnd',
          nome: 'E-mail para envio da certidão',
          responsavel: 'Cooperado / Cooperativa',
          tipo: 'email',
          placeholder: 'exemplo@cooperativa.com.br',
          detalhe: 'E-mail onde a certidão ou os avisos de emissão serão recebidos.'
        },
        {
          id: 'obs_cnd',
          nome: 'Observações adicionais',
          responsavel: 'Cooperativa',
          tipo: 'textarea',
          placeholder: 'Anote aqui qualquer regra interna ou observação sobre esse pedido…',
          detalhe: 'Campo opcional para observações internas.'
        }
      ],
      checklist: [
        'Verificar se não há pendências cadastrais ou fiscais antes de solicitar a CND.',
        'Conferir se CPF/CNPJ e nome estão iguais ao cadastro do órgão.',
        'Salvar o PDF da CND emitida no sistema interno da cooperativa.'
      ]
    },
    alv: {
      titulo: 'Alvará Sanitário',
      descricao: 'Autorização sanitária para estabelecimentos que manipulam, armazenam ou comercializam produtos agropecuários.',
      orgao: 'Órgão emissor: Vigilância Sanitária Municipal / Estadual',
      validade: 'Validade típica: 1 ano (renovação anual).',
      auto: [
        'Razão social e nome fantasia da cooperativa',
        'CNPJ da unidade',
        'Endereço completo da unidade'
      ],
      campos: [
        {
          id: 'responsavel_tecnico',
          nome: 'Responsável técnico',
          responsavel: 'Cooperativa / Técnico',
          tipo: 'text',
          placeholder: 'Nome completo e registro profissional (CRMV, CREA, etc.)',
          detalhe: 'Dados do profissional responsável perante a Vigilância Sanitária, quando exigido.'
        },
        {
          id: 'atividades_sanitarias',
          nome: 'Descrição das atividades sanitárias',
          responsavel: 'Cooperativa',
          tipo: 'textarea',
          placeholder: 'Ex.: recebimento e armazenamento de insumos, manipulação de produtos de origem animal…',
          detalhe: 'Descreva as atividades com impacto sanitário que serão licenciadas.'
        },
        {
          id: 'produtos_principais',
          nome: 'Principais produtos',
          responsavel: 'Cooperativa',
          tipo: 'text',
          placeholder: 'Ex.: rações, medicamentos veterinários, produtos lácteos…',
          detalhe: 'Lista resumida dos produtos sob controle da vigilância sanitária.'
        }
      ],
      checklist: [
        'Confirmar exigências específicas do município (planta baixa, ART, etc.).',
        'Garantir que as condições sanitárias atendem às normas antes da vistoria.',
        'Arquivar o alvará emitido e controlar o prazo de renovação no sistema.'
      ]
    }
  };

  function render(docKey) {
    var doc = tipos[docKey] || tipos.loa;
    var tituloEl = document.getElementById('doc-titulo');
    var descEl = document.getElementById('doc-descricao');
    var orgaoEl = document.getElementById('doc-orgao');
    var validadeEl = document.getElementById('doc-validade');
    var camposEl = document.getElementById('doc-campos');
    var autoEl = document.getElementById('doc-auto');
    var checklistEl = document.getElementById('doc-checklist');

    if (!tituloEl || !descEl || !orgaoEl || !validadeEl || !camposEl || !checklistEl || !autoEl) return;

    tituloEl.textContent = doc.titulo;
    descEl.textContent = doc.descricao;
    orgaoEl.textContent = doc.orgao;
    validadeEl.textContent = doc.validade;

    // chips de campos automáticos
    autoEl.innerHTML = (doc.auto || []).map(function (txt) {
      return '<span class=\"doc-auto-chip\">' + txt + '</span>';
    }).join('');

    // cards de campos a preencher
    camposEl.innerHTML = (doc.campos || []).map(function (campo) {
      var inputHtml;
      if (campo.tipo === 'textarea') {
        inputHtml = '<textarea class=\"doc-input\" rows=\"3\" placeholder=\"' + (campo.placeholder || '') + '\"></textarea>';
      } else {
        var tipoHtml = campo.tipo === 'email' ? 'email' : 'text';
        inputHtml = '<input class=\"doc-input\" type=\"' + tipoHtml + '\" placeholder=\"' + (campo.placeholder || '') + '\">';
      }

      return (
        '<article class=\"doc-campo-card\">' +
          '<header class=\"doc-campo-header\">' +
            '<span class=\"doc-campo-nome\">' + campo.nome + '</span>' +
            '<span class=\"doc-campo-tag\">Responsável: ' + campo.responsavel + '</span>' +
          '</header>' +
          '<p class=\"doc-campo-detalhe\">' + (campo.detalhe || '') + '</p>' +
          inputHtml +
        '</article>'
      );
    }).join('');

    checklistEl.innerHTML = doc.checklist.map(function (item) {
      return '<li>' + item + '</li>';
    }).join('');
  }

  function init() {
    var buttons = document.querySelectorAll('.doc-type-btn');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');
        var key = this.getAttribute('data-doc');
        render(key);
      });
    });

    // Render padrão
    render('loa');

    // Botão Gerar documento (simulação)
    var gerarBtn = document.querySelector('.doc-gerar-btn');
    if (gerarBtn) {
      gerarBtn.addEventListener('click', function () {
        // Aqui, na integração real, chamaria a API para gerar o documento
        alert('Documento gerado com os dados preenchidos (simulação).');
      });
    }
  }

  if (document.querySelector('.documentos-layout')) {
    init();
  }
})();

