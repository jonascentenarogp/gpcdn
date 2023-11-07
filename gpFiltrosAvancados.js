let keyGpFiltrosAvancados = '';
let paramGetDataSecoes = null;
let paramGetDataGrupos = null;
let paramSecoesCampoCodigo = 'codigo';
let paramSecoesCampoDescricao = 'descricao';
let paramGruposCampoCodigo = 'codigo';
let paramGruposCampoDescricao = 'descricao';
let urlSecoes = "";
let methodSecoes = "POST"
let urlGrupos = "";
let methodGrupos = "POST"
let targetSwal = 'body';
let tipoClassificacaoVeiculos = ['CARROS', 'MOTOS', 'CAMINHOES'];
let carrosAtivo = tipoClassificacaoVeiculos.indexOf('CARROS') >= 0;
let motosAtivo = tipoClassificacaoVeiculos.indexOf('MOTOS') >= 0;
let caminhoesAtivo = tipoClassificacaoVeiculos.indexOf('CAMINHOES') >= 0;
let todosAtivo = carrosAtivo && motosAtivo && caminhoesAtivo;
let exfiaTipoVeiculos = ['carros', 'motos', 'caminhões'];
let exfiaCombustivel = true;
let exfiaMotorizacao  = true;
let exfiaTracao = true;
let exfiaSecao = false;
let exfiaGrupo = false;
let exfiaDescricao = true;
let slim = false;
let fontSize = null;
let heightCampos = null;
let marginBottomCampos = null;
let ajusteMarginItemLista = null;
let ajusteWidthRowAreaAccordionfiltrosavancados = null;
let webparts = false;
let contemFontAwesome = false;
let idUtilizador = '';
let iniciarAberto = false;
let visualEstatico = false;
let tudoUpperCase = false;
let versaoVeiculoObrigatoria = false;
let aplicarFiltrosInterno = () => { };
let setFiltrosInterno = (filtros, aplicarFiltros = true) => { };
let setFocusPlacaInterno = () => { };
let atributosVeiculoExibir = {
    modelo: true,
    montadora: true,
    placa: true,
    cidade: true,
    estado: true,
    ano: true,
    cor: true,
    chassi: true,
    status: true,
    //dados adicionais que podem ou não virem
    cap_maxima_tracao_cmt: true,
    carroceria: true,
    cilindradas_cc: true,
    cod_autorizacao_terceiro_eixo: true,
    cod_caixa_cambio: true,
    cod_carroceria: true,
    cod_diferencial_eixo_traseiro: true,
    cod_motor: true,
    combustivel: true,
    doc_importacao: true,
    eixos: true,
    especie_veiculo: true,
    nacionalidade: true,
    peso_bruto_total: true,
    qtd_passageiros: true,
    segmento_veiculo: true,
    sub_segmento: true,
    tipo_veiculo: true,
};
let imagensSlider = [];

let codigoCliente = "1234567890";
let chavetipsel = 'cli-' + codigoCliente; 


var gplistCollapse = [];

let mdTextPlaca = null;
let mdBotaoMontadora = null;
let mdBotaoModelo = null;
let mdBotaoVersao = null;
let mdBotaoAno = null;
let mdBotaoCombustivel = null;
let mdBotaoMotorizacao = null;
let mdBotaoTracao = null;

let mdBotaoSecao = null;
let mdBotaoGrupo = null;

let mdBotaoAplicar = null;
let primeiroRenderItemAutoC = true;


let mdTextProduto = null;

let ultimoSearchValue = '';
let ultimoSearchValueVeiculo = '';

//subistitui ou cria funções essenciais
String.prototype.replaceAll = function (search, replacement, usarEscape = false) {
    var target = this;
    if (usarEscape) {
        search = escapeRegExp(search);
    }
    return target.replace(new RegExp(search, 'g'), replacement);
};

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}




let sTipoClassVeiUs = localStorage.getItem(chavetipsel);
if (sTipoClassVeiUs !== null) {
    tipoClassificacaoVeiculos = JSON.parse(sTipoClassVeiUs);
    //se os 3 estiverem configurados disponiveis soh pode ser 1 ou os 3(todos)
    if (exfiaTipoVeiculos.length === 3 && tipoClassificacaoVeiculos.length === 2) {
        tipoClassificacaoVeiculos = [];
    }
    for (var x = 0; x < tipoClassificacaoVeiculos.length; x++) {
        switch (tipoClassificacaoVeiculos[x]) {
            case 'CARROS':
                if (exfiaTipoVeiculos.indexOf('carros') === -1) {
                    tipoClassificacaoVeiculos.splice(x, 1);
                }
                break;
            case 'MOTOS':
                if (exfiaTipoVeiculos.indexOf('motos') === -1) {
                    tipoClassificacaoVeiculos.splice(x, 1);
                }
                break;
            case 'CAMINHOES':
                if (exfiaTipoVeiculos.indexOf('caminhões') === -1) {
                    tipoClassificacaoVeiculos.splice(x, 1);
                }
                break;
        }
    }
    if (tipoClassificacaoVeiculos.length === 0) {
        if (exfiaTipoVeiculos.indexOf('carros') >= 0) {
            tipoClassificacaoVeiculos.push('CARROS');
        }
        if (exfiaTipoVeiculos.indexOf('motos') >= 0) {
            tipoClassificacaoVeiculos.push('MOTOS');
        }
        if (exfiaTipoVeiculos.indexOf('caminhões') >= 0) {
            tipoClassificacaoVeiculos.push('CAMINHOES');
        }
    }
}

let listaVeiculos = [];

let carregouDadosVeiculos = false;
let listaMontadoras = [];
let listaMontadorasSelecionadas = [];
let listaModelos = [];
let listaModelosSelecionadas = [];
let listaModelosFiltradas = [];
let listaVersoes = [];
let listaVersoesSelecionadas = [];
let listaVersoesSelecionadasTemp = [];
let mantemVersoesTemp = false;
let listaVersoesFiltradas = [];
let listaAnos = [];
let listaAnosSelecionados = [];
let listaAnosSelecionadosTemp = [];
let mantemAnosTemp = false;
let listaCombustiveis = [];
let listaCombustiveisSelecionadas = [];
let listaCombustiveisSelecionadasTemp = [];
let mantemCombustiveisTemp = false;
let listaMotorizacoes = [];
let listaMotorizacoesSelecionadas = [];
let listaMotorizacoesSelecionadasTemp = [];
let mantemMotorizacoesTemp = false;
let listaTracoes = [];
let listaTracoesSelecionadas = [];
let listaTracoesSelecionadasTemp = [];
let mantemTracoesTemp = false;

let listaSecoes = [];
let listaSecoesSelecionadas = [];
let listaSecoesSelecionadasTemp = [];
let mantemSecoesTemp = false;

let listaGrupos = [];
let listaGruposSelecionadas = [];
let listaGruposSelecionadasTemp = [];
let mantemGruposTemp = false;


let ultimoTermoPesquisadoMontadora = '';
let ultimoTermoPesquisadoModelo = '';
let ultimoTermoPesquisadoVersao = '';
let ultimoTermoPesquisadoAno = '';
let ultimoTermoPesquisadoCombustivel = '';
let ultimoTermoPesquisadoMotorizacao = '';
let ultimoTermoPesquisadoTracao = '';

let ultimoTermoPesquisadoSecao = '';
let ultimoTermoPesquisadoGrupo = '';

let temSlider = false;
let sliderInicializado = false;
let temVeiculoRemovido = false;

let clicouBotaoPesqPlaca = false;

let ultimoTargetClicado;

function inicializarSliderFiltrosAvancados() {
    if (temSlider && !sliderInicializado) {
        $('.slider-filtros-avancados').slick({
            autoplay: true,
            autoplaySpeed: 5000,
            arrows: true,
            dots: true
        });
        $('.slider-filtros-avancados .slick-track').css({
            width: '100%'
        });
        $('.slider-filtros-avancados .slick-track .area-banner-filtro').css({
            width: '100%'
        });
        sliderInicializado = true;
    }
}

function validateVinChassi(vinChassi) {
    var re = new RegExp("^[A-HJ-NPR-Z\\d]{8}[\\dX][A-HJ-NPR-Z\\d]{2}\\d{6}$");
    return vinChassi.match(re);
}

function tratarPesquisaBasicaHashtag(valPesquisa, idxHashTag) {
    //verifica se é placa
    let valPesquisaHashtag = valPesquisa.substring(idxHashTag + 1);
    valPesquisaHashtag = valPesquisaHashtag.trim();
    let valehChassis = valPesquisaHashtag.indexOf('*') === 0;
    if (valehChassis) {
        valPesquisaHashtag = valPesquisaHashtag.substring(1);
    }
    let valehPlaca = !valehChassis && ehPlaca(valPesquisaHashtag);

    if (valehPlaca || valehChassis) {
        procurarPlacaChassis(valPesquisaHashtag, valehPlaca, function (montadora, modelo, restanteModeloVersao, ano, ano_modelo, termoPesquisa) {
            //primeiro filtra por igualdade
            let listaEncontradas = listaMontadoras.filter(function (item, index, array) { return item === montadora; });
            if (listaEncontradas.length === 0) {
                let patt = new RegExp('^(' + $.ui.autocomplete.escapeRegex(montadora) + ')[ ]', "i");
                listaEncontradas = listaMontadoras.filter(function (item, index, array) { return patt.test(item); });
            }
            if (listaEncontradas.length === 0) {
                //quebra o texto por espaços e busca por cada palavra ordenada pelas maiores
                let pmontadoras = montadora.split(/ |\//);
                pmontadoras = _.sortBy(pmontadoras, function (pmontadora) {
                    return pmontadora.length * -1;
                });
                let tmontadora = pmontadoras[0];
                listaEncontradas = listaMontadoras.filter(function (item, index, array) { return item === tmontadora; });
                if (listaEncontradas.length === 0) {
                    let patt = new RegExp('^(' + $.ui.autocomplete.escapeRegex(tmontadora) + ')[ ]', "i");
                    listaEncontradas = listaMontadoras.filter(function (item, index, array) { return patt.test(item); });
                }
                if (listaEncontradas.length === 0) {
                    let patt = new RegExp('(' + $.ui.autocomplete.escapeRegex(tmontadora) + ')', "i");
                    listaEncontradas = listaMontadoras.filter(function (item, index, array) { return patt.test(item); });
                }
            }
            if (listaEncontradas.length > 0) {
                montadora = listaEncontradas[0];
            }
            //sempre que começar uma nova pesquisa limpa a anterior, para esse caso
            ultimoXhrPesquisaFipe = null;
            //widgetPesquisaMantemSelecionadosDT["pesqveiculo"]([], []); //mantem os ultimos veiculos selecionados
            ultimoSearchValueVeiculo = montadora + ' ' + modelo + ' ' + restanteModeloVersao.trim() + ' ' + ano + '/' + ano_modelo;
            f_pesquisar["pesqveiculo"](ultimoSearchValueVeiculo);
        });

    } else {
        //sempre que começar uma nova pesquisa limpa a anterior, para esse caso
        ultimoXhrPesquisaFipe = null;
        //widgetPesquisaMantemSelecionadosDT["pesqveiculo"]([], []); //mantem os ultimos veiculos selecionados
        ultimoSearchValueVeiculo = valPesquisaHashtag;
        f_pesquisar["pesqveiculo"](valPesquisaHashtag);
    }
}

function exibirAtributoVeiculo(atributo) {
    return typeof atributo !== 'undefined' && atributo !== null && atributo !== '' && atributo != '0';
}
function procurarPlacaChassis(valPesquisaHashtag, valehPlaca, callbackConfirmarResultadoProcPlaca, callbackFail) {
    //se tiver '-' remove e mantem maiuscula
    valPesquisaHashtag = valPesquisaHashtag.replace('-', '').toUpperCase();

    let dados = {
        valor: valPesquisaHashtag,
        tipo: valehPlaca ? 'placa' : 'chassi'
    };
    //Cahamada AJAX
    exibirLoaderFA(null, "/Produto/ProcurarPlacaChassis");
    $.ajax({
        //URL da página com o WebMethod 
        //"https://localhost:44363/Produto/ProcurarPlacaChassis?key=" + keyGpFiltrosAvancados,
        url: webparts ? "/Produto/ProcurarPlacaChassis" : "https://webparts.gestaoparts.com.br/Produto/ProcurarPlacaChassis?key=" + keyGpFiltrosAvancados,
        data: JSON.stringify(dados),
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (parsedJson) {
            if (!parsedJson.status) {
                swal({
                    title: "",
                    html: parsedJson.message,
                    confirmButtonText: "Ok",
                    allowOutsideClick: true,
                    target: targetSwal,
                    onClose: () => {

                    }
                    //timer: 7000
                });
                ocultarLoaderFA(null, "/Produto/ProcurarPlacaChassis");
                callbackFail();
                return;
            }

            //monta os dados parsedJson.Dados.marca + ano + / + ano_modelo e requisita para consulta de modelos 
            let termoPesquisa = '';
            let montadora = '';
            let modelo = '';
            let restanteAtributoMarca = '';
            let htmlDadosCompleto = '';
            let fontSizeLabelsSwal = ' style="' +
                (fontSize !== null && fontSize > 8 ? 'font-size: ' + fontSize + 'px;' : '') + '"';

            if (parsedJson.dados.aadata_info === 'COMPLETO') {
                montadora = parsedJson.dados.aamarca_montadora;
                modelo = parsedJson.dados.aamodelo_base;

                let indexModelo = parsedJson.dados.marca.indexOf(parsedJson.dados.aamodelo_base);
                restanteAtributoMarca = parsedJson.dados.marca;
                if (indexModelo >= 0) {
                    restanteAtributoMarca = restanteAtributoMarca.substr(indexModelo + parsedJson.dados.aamodelo_base.length);
                }

                if (exibirAtributoVeiculo(parsedJson.dados.aacilindradas_cc)) {
                    if (parsedJson.dados.aacilindradas_cc.indexOf('.') >= 0) {
                        restanteAtributoMarca += ' ' + parsedJson.dados.aacilindradas_cc;
                    } else {
                        if (parsedJson.dados.aacilindradas_cc.length === 4) {
                            restanteAtributoMarca += ' ' + parsedJson.dados.aacilindradas_cc.substr(0, 1) + '.' + parsedJson.dados.aacilindradas_cc.substr(1, 1);
                        } else {
                            restanteAtributoMarca += ' ' + parsedJson.dados.aacilindradas_cc;
                        }
                    }
                }

                termoPesquisa = montadora + ' ' + modelo + restanteAtributoMarca;

                //Dados Completo
                if (exibirAtributoVeiculo(parsedJson.dados.aacap_maxima_tracao_cmt) && atributosVeiculoExibir.cap_maxima_tracao_cmt) {
                    htmlDadosCompleto += '<div class="row text-left" ' + fontSizeLabelsSwal + '><div class="col-5 col-md-5 text-right">Capacidade Máxima de Tração</div><div class="col-7 col-md-7">' + parsedJson.dados.aacap_maxima_tracao_cmt + '</div></div>';
                }
                if (exibirAtributoVeiculo(parsedJson.dados.aacarroceria) && atributosVeiculoExibir.carroceria) {
                    htmlDadosCompleto += '<div class="row text-left" ' + fontSizeLabelsSwal + '><div class="col-5 col-md-5 text-right">Carroceria</div><div class="col-7 col-md-7">' + parsedJson.dados.aacarroceria + '</div></div>';
                }
                if (exibirAtributoVeiculo(parsedJson.dados.aacilindradas_cc) && atributosVeiculoExibir.cilindradas_cc) {
                    htmlDadosCompleto += '<div class="row text-left" ' + fontSizeLabelsSwal + '><div class="col-5 col-md-5 text-right">Cilindradas</div><div class="col-7 col-md-7">' + parsedJson.dados.aacilindradas_cc + '</div></div>';
                }
                if (exibirAtributoVeiculo(parsedJson.dados.aacod_autorizacao_terceiro_eixo) && atributosVeiculoExibir.cod_autorizacao_terceiro_eixo) {
                    htmlDadosCompleto += '<div class="row text-left" ' + fontSizeLabelsSwal + '><div class="col-5 col-md-5 text-right">Cód. Autorização 3º Eixo</div><div class="col-7 col-md-7">' + parsedJson.dados.aacod_autorizacao_terceiro_eixo + '</div></div>';
                }
                if (exibirAtributoVeiculo(parsedJson.dados.aacod_caixa_cambio) && atributosVeiculoExibir.cod_caixa_cambio) {
                    htmlDadosCompleto += '<div class="row text-left" ' + fontSizeLabelsSwal + '><div class="col-5 col-md-5 text-right">Cód. Caixa Câmbio</div><div class="col-7 col-md-7">' + parsedJson.dados.aacod_caixa_cambio + '</div></div>';
                }
                if (exibirAtributoVeiculo(parsedJson.dados.aacod_carroceria) && atributosVeiculoExibir.cod_carroceria) {
                    htmlDadosCompleto += '<div class="row text-left" ' + fontSizeLabelsSwal + '><div class="col-5 col-md-5 text-right">Cód. Carroceria</div><div class="col-7 col-md-7">' + parsedJson.dados.aacod_carroceria + '</div></div>';
                }
                if (exibirAtributoVeiculo(parsedJson.dados.aacod_diferencial_eixo_traseiro) && atributosVeiculoExibir.cod_diferencial_eixo_traseiro) {
                    htmlDadosCompleto += '<div class="row text-left" ' + fontSizeLabelsSwal + '><div class="col-5 col-md-5 text-right">Cód. Diferencial Eixo Traseiro</div><div class="col-7 col-md-7">' + parsedJson.dados.aacod_diferencial_eixo_traseiro + '</div></div>';
                }
                if (exibirAtributoVeiculo(parsedJson.dados.aacod_motor) && atributosVeiculoExibir.cod_motor) {
                    htmlDadosCompleto += '<div class="row text-left" ' + fontSizeLabelsSwal + '><div class="col-5 col-md-5 text-right">Cód. Motor</div><div class="col-7 col-md-7">' + parsedJson.dados.aacod_motor + '</div></div>';
                }
                if (exibirAtributoVeiculo(parsedJson.dados.aacombustivel) && atributosVeiculoExibir.combustivel) {
                    htmlDadosCompleto += '<div class="row text-left" ' + fontSizeLabelsSwal + '><div class="col-5 col-md-5 text-right">Combustível</div><div class="col-7 col-md-7">' + parsedJson.dados.aacombustivel + '</div></div>';
                }
                if (exibirAtributoVeiculo(parsedJson.dados.aadoc_importacao) && atributosVeiculoExibir.doc_importacao) {
                    htmlDadosCompleto += '<div class="row text-left" ' + fontSizeLabelsSwal + '><div class="col-5 col-md-5 text-right">Doc. Importação</div><div class="col-7 col-md-7">' + parsedJson.dados.aadoc_importacao + '</div></div>';
                }
                if (exibirAtributoVeiculo(parsedJson.dados.aaeixos) && atributosVeiculoExibir.eixos) {
                    htmlDadosCompleto += '<div class="row text-left" ' + fontSizeLabelsSwal + '><div class="col-5 col-md-5 text-right">Eixos</div><div class="col-7 col-md-7">' + parsedJson.dados.aaeixos + '</div></div>';
                }
                if (exibirAtributoVeiculo(parsedJson.dados.aaespecie_veiculo) && atributosVeiculoExibir.especie_veiculo) {
                    htmlDadosCompleto += '<div class="row text-left" ' + fontSizeLabelsSwal + '><div class="col-5 col-md-5 text-right">Espécie Veículo</div><div class="col-7 col-md-7">' + parsedJson.dados.aaespecie_veiculo + '</div></div>';
                }
                if (exibirAtributoVeiculo(parsedJson.dados.aanacionalidade) && atributosVeiculoExibir.nacionalidade) {
                    htmlDadosCompleto += '<div class="row text-left" ' + fontSizeLabelsSwal + '><div class="col-5 col-md-5 text-right">Nacionalidade</div><div class="col-7 col-md-7">' + parsedJson.dados.aanacionalidade + '</div></div>';
                }
                if (exibirAtributoVeiculo(parsedJson.dados.aapeso_bruto_total) && atributosVeiculoExibir.peso_bruto_total) {
                    htmlDadosCompleto += '<div class="row text-left" ' + fontSizeLabelsSwal + '><div class="col-5 col-md-5 text-right">Peso Bruto Total</div><div class="col-7 col-md-7">' + parsedJson.dados.aapeso_bruto_total + '</div></div>';
                }
                if (exibirAtributoVeiculo(parsedJson.dados.aaqtd_passageiros) && atributosVeiculoExibir.qtd_passageiros) {
                    htmlDadosCompleto += '<div class="row text-left" ' + fontSizeLabelsSwal + '><div class="col-5 col-md-5 text-right">Qtd. Passageiros</div><div class="col-7 col-md-7">' + parsedJson.dados.aaqtd_passageiros + '</div></div>';
                }
                if (exibirAtributoVeiculo(parsedJson.dados.aasegmento_veiculo) && atributosVeiculoExibir.segmento_veiculo) {
                    htmlDadosCompleto += '<div class="row text-left" ' + fontSizeLabelsSwal + '><div class="col-5 col-md-5 text-right">Segmento Veículo</div><div class="col-7 col-md-7">' + parsedJson.dados.aasegmento_veiculo + '</div></div>';
                }
                if (exibirAtributoVeiculo(parsedJson.dados.aasub_segmento) && atributosVeiculoExibir.sub_segmento) {
                    htmlDadosCompleto += '<div class="row text-left" ' + fontSizeLabelsSwal + '><div class="col-5 col-md-5 text-right">Sub Segmento</div><div class="col-7 col-md-7">' + parsedJson.dados.aasub_segmento + '</div></div>';
                }
                if (exibirAtributoVeiculo(parsedJson.dados.aatipo_veiculo) && atributosVeiculoExibir.tipo_veiculo) {
                    htmlDadosCompleto += '<div class="row text-left" ' + fontSizeLabelsSwal + '><div class="col-5 col-md-5 text-right">Tipo Veículo</div><div class="col-7 col-md-7">' + parsedJson.dados.aatipo_veiculo + '</div></div>';
                }
                //aacap_maxima_tracao_cmt: "0"
                //aacarroceria: ""
                //aacilindradas_cc: "2200"
                //aacod_autorizacao_terceiro_eixo: ""
                //aacod_caixa_cambio: "00252268SQ"
                //aacod_carroceria: ""
                //aacod_diferencial_eixo_traseiro: ""
                //aacod_motor: "JM0008955"
                //aacombustivel: "GASOLINA"
                //aadata_info: "COMPLETO" //desnecessario
                //aadata_status: "CACHE 01" //desnecessario
                //aadoc_importacao: "0"
                //aaeixos: "0"
                //aaespecie_veiculo: "PASSAGEIRO"
                //aamarca_montadora: "GM" //**
                //aamodelo_base: "VECTRA" //**
                //aanacionalidade: "NACIONAL"
                //aapeso_bruto_total: "0"
                //aaqtd_passageiros: "5"
                //aasegmento_veiculo: "AUTO"
                //aasub_segmento: "AU - SEDAN MEDIO"
                //aatipo_veiculo: "AUTOMOVEL"
                //ano: "2000" //**
                //ano_modelo: "2001" //**
                //cidade: "BARRACAO" //**
                //classis: "9BGJK19H01B132261" //**
                //cor: "AZUL" //**
                //dataconsulta: "15/03/2021 às 11:16:23" //desnecessario
                //estado: "PR" //**
                //marca: "VECTRA GLS"//**
                //placa: "AJM8531"//**
                //service: "Veículo encontrado" //desnecessario
                //status: "Sem Restrição" //desnecessario
                //zpreco: "R$ 0,99" //ver posteriormente

            } else {
                termoPesquisa = parsedJson.dados.marca + ' ' + parsedJson.dados.ano + '/' + parsedJson.dados.ano_modelo;

                if (parsedJson.dados.marca.indexOf('I/') === 0) {
                    parsedJson.dados.marca = parsedJson.dados.marca.substring(2);
                }
                if (parsedJson.dados.marca.indexOf('I ') === 0) {
                    parsedJson.dados.marca = parsedJson.dados.marca.substring(2);
                }

                let separador = '/';
                if (parsedJson.dados.marca.indexOf('/') <= 1) {
                    separador = ' ';
                }
                let dadosMarca = parsedJson.dados.marca.split(separador);
                montadora = dadosMarca[0];

                if (dadosMarca.length > 1) {
                    let dadosMarcaForaPrimeiro = _.filter(dadosMarca, function (item, index, array) {
                        return index > 0;
                    });
                    modelo = dadosMarcaForaPrimeiro.join(' ');
                } else {
                    modelo = dadosMarca[0];
                }
            }

            swal({
                title: "Veículo",
                html: (atributosVeiculoExibir.modelo ? '<div class="row text-left" ' + fontSizeLabelsSwal + '><div class="col-5 col-md-5 text-right">Veículo</div><div class="col-7 col-md-7">' + modelo + '</div></div>' : '') +
                    (atributosVeiculoExibir.montadora ? '<div class="row text-left" ' + fontSizeLabelsSwal + '><div class="col-5 col-md-5 text-right">Marca</div><div class="col-7 col-md-7">' + montadora + '</div></div>' : '') +
                    (atributosVeiculoExibir.placa ? '<div class="row text-left" ' + fontSizeLabelsSwal + '><div class="col-5 col-md-5 text-right">Placa</div><div class="col-7 col-md-7">' + parsedJson.dados.placa.substring(0, 3) + '-' + parsedJson.dados.placa.substring(3) + '</div></div> ' : '') +
                    (atributosVeiculoExibir.cidade ? '<div class="row text-left" ' + fontSizeLabelsSwal + '><div class="col-5 col-md-5 text-right">Cidade</div><div class="col-7 col-md-7">' + parsedJson.dados.cidade + '</div></div>' : '') +
                    (atributosVeiculoExibir.estado ? '<div class="row text-left" ' + fontSizeLabelsSwal + '><div class="col-5 col-md-5 text-right">Estado</div><div class="col-7 col-md-7">' + parsedJson.dados.estado + '</div></div>' : '') +
                    (atributosVeiculoExibir.ano ? '<div class="row text-left" ' + fontSizeLabelsSwal + '><div class="col-5 col-md-5 text-right">Ano</div><div class="col-7 col-md-7">' + parsedJson.dados.ano + '/' + parsedJson.dados.ano_modelo + '</div></div>' : '') +
                    (atributosVeiculoExibir.cor ? '<div class="row text-left" ' + fontSizeLabelsSwal + '><div class="col-5 col-md-5 text-right">Cor</div><div class="col-7 col-md-7">' + parsedJson.dados.cor + '</div></div>' : '') +
                    (atributosVeiculoExibir.chassi ? '<div class="row text-left" ' + fontSizeLabelsSwal + '><div class="col-5 col-md-5 text-right">Chassi</div><div class="col-7 col-md-7">' + parsedJson.dados.classis + '</div></div>' : '') +
                    (atributosVeiculoExibir.status ? '<div class="row text-left" ' + fontSizeLabelsSwal + '><div class="col-5 col-md-5 text-right">Status</div><div class="col-7 col-md-7">' + parsedJson.dados.status + '</div></div>' : '') +
                    htmlDadosCompleto,
                confirmButtonText: "Consultar Modelo",
                customClass: 'swal-filtrosavancadosss',
                allowOutsideClick: true,
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                target: targetSwal,
                onClose: () => {

                },
                onOpen: () => {
                    if (fontSize !== null && fontSize > 8) {
                        $('.swal-filtrosavancadosss').css('font-size', fontSize + 'px');
                    } 
                }
                //timer: 7000
            }).then((result) => {
                if (result.value) {
                    callbackConfirmarResultadoProcPlaca(montadora, modelo, restanteAtributoMarca, parsedJson.dados.ano, parsedJson.dados.ano_modelo, termoPesquisa);
                }
            });
            ocultarLoaderFA(null, "/Produto/ProcurarPlacaChassis");
        },
        error: function (req, status, error) {
            ocultarLoaderFA(null, "/Produto/ProcurarPlacaChassis");
            console.log('erro: ', error);

            swal({
                title: "",
                type: 'error',
                html: error !== '' ? error : "Não foi possível realizar a busca. Tente novamente, se o problema persistir contate o suporte",
                confirmButtonText: "Ok",
                allowOutsideClick: true,
                target: targetSwal,
                onClose: () => {

                }
            });

            if (webparts) {
                let errortext = errorText(req, status, error);
                console.log(errortext);
                if (errortext === "Sessão expirada") {
                    window.location = '/Home/Login';
                }
            }

            callbackFail();
        }
    });
}

function carregarDadosVeiculos(callback) {
    if (sessionStorage.getItem('carregouveiculos') === 'true') {
        //console.log('carregou dados de veiculos da session');
        listaVeiculos = JSON.parse(sessionStorage.getItem('veiculos'));
        //filtra de acordo com tipo selecionado
        listaVeiculos = _.filter(listaVeiculos, function (item, index, array) {
            return tipoClassificacaoVeiculos.indexOf(item.classificacao_veiculo) >= 0;
        });

        listaMontadoras = _.map(_.uniq(listaVeiculos, true, veiculo => veiculo.fabricante), function (veiculo) { return veiculo.fabricante; });
        listaMontadoras = _.sortBy(listaMontadoras, montadora => montadora);

        listaModelos = _.map(_.uniq(listaVeiculos, true, veiculo => veiculo.modelo_base), function (veiculo) {
            return {
                codigo: veiculo.codigo,
                fabricante: veiculo.fabricante,
                modelo_base: veiculo.modelo_base
            };
        });
        listaModelos = _.sortBy(listaModelos, veiculo => veiculo.modelo_base);

        listaVersoes = _.map(_.uniq(listaVeiculos, true, veiculo => veiculo.modelo_versao), function (veiculo) {
            return {
                codigo: veiculo.codigo,
                fabricante: veiculo.fabricante,
                modelo_base: veiculo.modelo_base,
                modelo_versao: veiculo.modelo_versao,
                modelo_ano: veiculo.modelo_ano,
                combustivel: veiculo.combustivel,
                motorizacao: veiculo.motorizacao,
                tracao: veiculo.tracao
            };
        });
        listaAnos = _.map(_.uniq(listaVeiculos, true, veiculo => veiculo.modelo_ano), function (veiculo) {
            return {
                fabricante: veiculo.fabricante,
                modelo_base: veiculo.modelo_base,
                modelo_versao: veiculo.modelo_versao,
                modelo_ano: veiculo.modelo_ano,
                combustivel: veiculo.combustivel,
                motorizacao: veiculo.motorizacao,
                tracao: veiculo.tracao
            };
        });

        carregouDadosVeiculos = true;
        setTimeout(function () {
            if (mdTextPlaca !== null) {
                mdTextPlaca.disabled = false;
                if ($(mdTextPlaca.input_).is(":visible")) {
                    mdTextPlaca.focus();
                }
            }
        }, 1000);
        
        filtrarModelos();
        if (typeof callback === 'function') {
            callback();
        }
    } else {
        //console.log('buscar dados de veiculos');

        var Dados = {
        };

        //Cahamada AJAX
        $.ajax({
            //URL da página com o WebMethod 
            //url: "https://webparts.gestaoparts.com.br/Produto/GetDadosVeiculosModelos",
            //"https://localhost:44363/Produto/GetDadosVeiculosModelos?key=" + keyGpFiltrosAvancados,
            url: webparts ? "/Produto/GetDadosVeiculosModelos" : "https://webparts.gestaoparts.com.br/Produto/GetDadosVeiculosModelos?key=" + keyGpFiltrosAvancados,
            data: JSON.stringify(Dados),
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (parsedJson) {
                if (!parsedJson.status) {

                    return;
                }
                retorno = parsedJson.dados;

                listaVeiculos = retorno;
                sessionStorage.setItem('carregouveiculos', 'true');
                sessionStorage.setItem('veiculos', JSON.stringify(retorno));

                //filtra de acordo com tipo selecionado
                listaVeiculos = _.filter(listaVeiculos, function (item, index, array) {
                    return tipoClassificacaoVeiculos.indexOf(item.classificacao_veiculo) >= 0;
                });

           
                listaMontadoras = _.map(_.uniq(listaVeiculos, true, veiculo => veiculo.fabricante), function (veiculo) { return veiculo.fabricante; });
                listaMontadoras = _.sortBy(listaMontadoras, montadora => montadora);

                listaModelos = _.map(_.uniq(listaVeiculos, true, veiculo => veiculo.modelo_base), function (veiculo) {
                    return {
                        codigo: veiculo.codigo,
                        fabricante: veiculo.fabricante,
                        modelo_base: veiculo.modelo_base
                    };
                });
                listaModelos = _.sortBy(listaModelos, veiculo => veiculo.modelo_base);

                listaVersoes = _.map(_.uniq(listaVeiculos, true, veiculo => veiculo.modelo_versao), function (veiculo) {
                    return {
                        codigo: veiculo.codigo,
                        fabricante: veiculo.fabricante,
                        modelo_base: veiculo.modelo_base,
                        modelo_versao: veiculo.modelo_versao,
                        modelo_ano: veiculo.modelo_ano,
                        combustivel: veiculo.combustivel,
                        motorizacao: veiculo.motorizacao,
                        tracao: veiculo.tracao
                    };
                });
                listaAnos = _.map(_.uniq(listaVeiculos, true, veiculo => veiculo.modelo_ano), function (veiculo) {
                    return {
                        fabricante: veiculo.fabricante,
                        modelo_base: veiculo.modelo_base,
                        modelo_versao: veiculo.modelo_versao,
                        modelo_ano: veiculo.modelo_ano,
                        combustivel: veiculo.combustivel,
                        motorizacao: veiculo.motorizacao,
                        tracao: veiculo.tracao
                    };
                });
                carregouDadosVeiculos = true;
                setTimeout(function () {
                    if (mdTextPlaca !== null) {
                        mdTextPlaca.disabled = false;
                        if ($(mdTextPlaca.input_).is(":visible")) {
                            mdTextPlaca.focus();
                        }
                    }
                }, 1000);
                filtrarModelos();
                if (typeof callback === 'function') {
                    callback();
                }
            },
            error: function (req, status, error) {
                console.log('erro: ', error);
            }
        });
    }
}

function recuperarDadosPropagandasFiltrosAvancados() {
    if (!slim) {
        if (imagensSlider.length === 0) {
            var Dados = {};

            //Cahamada AJAX
            $.ajax({
                //URL da página com o WebMethod 
                //"https://localhost:44363/Produto/GetDadosPropagandasFiltrosAvancados?key=" + keyGpFiltrosAvancados,
                url: (webparts ? "/Produto/GetDadosPropagandasFiltrosAvancados" : "https://webparts.gestaoparts.com.br/Produto/GetDadosPropagandasFiltrosAvancados?key=" + keyGpFiltrosAvancados),
                data: JSON.stringify(Dados),
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (parsedJson) {
                    if (parsedJson.dados.length > 0) {
                        carregarDadosImagensParaSlider(true, parsedJson.dados);
                    }
                },
                error: function (req, status, error) {
                    console.log('erro: ', error);
                }
            });
        } else {
            carregarDadosImagensParaSlider(false, imagensSlider);
        }
    }
}

function carregarDadosImagensParaSlider(dadosExternos, dados) {
    temSlider = true;
    setTimeout(() => {
        $("#txt-av-versao", gpDivMaster).uiautocomplete("instance").options.position = { my: "left top", at: "left bottom", collision: "none" };
    }, 1000);
    

    $('.area-geral-filtros-avancados', gpDivMaster).addClass('row comslider');
    $('.area-somente-filtros', gpDivMaster).addClass('col-lg-3');
    $('.area-destinada-placa', gpDivMaster).addClass('col-md-12').removeClass('col-md-3');
    $('.area-para-campo-placa', gpDivMaster).addClass('col-md-12').removeClass('col-md-3');
    $('.area-para-label-result-placa', gpDivMaster).addClass('col-md-12').removeClass('col-md-6');
    $('.md-campo-av-placa', gpDivMaster).removeClass('mb-3');
    $('.area-para-combo-tipoclassificacao', gpDivMaster).addClass('col-xl-12').removeClass('col-xl-3');
    $('.area-para-campo-autocomplete', gpDivMaster).addClass('col-md-12').removeClass('col-md-3');
    $('.area-para-campo-peca', gpDivMaster).addClass('col-md-12').removeClass('col-md-3');
    $('.area-para-banner-filtros-avancados', gpDivMaster).addClass('col-lg-9');

    let htmlBannerFiltros = '<div class="slider-filtros-avancados" style="max-height: 448px; overflow: hidden;">';
    for (var x = 0; x < dados.length; x++) {
        htmlBannerFiltros += '<div class="area-banner-filtro" style="background-image: url(\'' +
            (dadosExternos ? dados[x] : dados[x].url) +
            '\'); height: 448px; ' +
            //background-size: 100% 100%; '+
            'background-size: cover;' + 
            'background-repeat: no-repeat;' + 
            'background-position: center;' +
        '"></div>';
    }
    htmlBannerFiltros += '</div>';
    

    $('.area-para-banner-filtros-avancados', gpDivMaster).html(htmlBannerFiltros);


    //Verifica se o collapse esta expandido e carrega o slider se ainda não foi carregado
    setTimeout(() => {
        if ($('#collapsefiltrosavancadosprodutos', gpDivMaster).hasClass('show')) {
            inicializarSliderFiltrosAvancados();
        }
    }, 200);
    
}

function mostrarAvMontadorasSelecionadas() {
    let lMontadoras = '';
    if (listaMontadorasSelecionadas.length > 0) {
        for (var x = 0; x < listaMontadorasSelecionadas.length; x++) {
            lMontadoras += lMontadoras !== '' ? (', ' + listaMontadorasSelecionadas[x]) : listaMontadorasSelecionadas[x];
        }
    }

    mdBotaoMontadora.value = lMontadoras;
    mdc.autoInit();
}

function mostrarAvModelosSelecionadas() {
    let lModelos = '';
    if (listaModelosSelecionadas.length > 0) {
        for (var x = 0; x < listaModelosSelecionadas.length; x++) {
            lModelos += lModelos !== '' ? (', ' + listaModelosSelecionadas[x].modelo_base) : listaModelosSelecionadas[x].modelo_base;
        }
    }

    mdBotaoModelo.value = lModelos;
    mdc.autoInit();
}

function mostrarAvVersaosSelecionadas() {
    let lVersaos = '';
    if (listaVersoesSelecionadas.length > 0) {
        for (var x = 0; x < listaVersoesSelecionadas.length; x++) {
            lVersaos += lVersaos !== '' ? (', ' + listaVersoesSelecionadas[x].modelo_versao) : listaVersoesSelecionadas[x].modelo_versao;
        }
    }

    mdBotaoVersao.value = lVersaos;
    mdc.autoInit();
}

function mostrarAvAnosSelecionadas() {
    let lAnos = '';
    if (listaAnosSelecionados.length > 0) {
        for (var x = 0; x < listaAnosSelecionados.length; x++) {
            lAnos += lAnos !== '' ? (', ' + listaAnosSelecionados[x]) : listaAnosSelecionados[x];
        }
    }

    mdBotaoAno.value = lAnos;
    mdc.autoInit();
}

function mostrarAvCombustivelsSelecionadas() {
    let lCombustiveis = '';
    if (listaCombustiveisSelecionadas.length > 0) {
        for (var x = 0; x < listaCombustiveisSelecionadas.length; x++) {
            lCombustiveis += lCombustiveis !== '' ? (', ' + listaCombustiveisSelecionadas[x]) : listaCombustiveisSelecionadas[x];
        }
    }

    mdBotaoCombustivel.value = lCombustiveis;
    mdc.autoInit();
}

function mostrarAvMotorizacoesSelecionadas() {
    let lMotorizacoes = '';
    if (listaMotorizacoesSelecionadas.length > 0) {
        for (var x = 0; x < listaMotorizacoesSelecionadas.length; x++) {
            lMotorizacoes += lMotorizacoes !== '' ? (', ' + listaMotorizacoesSelecionadas[x]) : listaMotorizacoesSelecionadas[x];
        }
    }

    mdBotaoMotorizacao.value = lMotorizacoes;
    mdc.autoInit();
}

function mostrarAvTracoesSelecionadas() {
    let lTracoes = '';
    if (listaTracoesSelecionadas.length > 0) {
        for (var x = 0; x < listaTracoesSelecionadas.length; x++) {
            lTracoes += lTracoes !== '' ? (', ' + listaTracoesSelecionadas[x]) : listaTracoesSelecionadas[x];
        }
    }

    mdBotaoTracao.value = lTracoes;
    mdc.autoInit();
}

function mostrarAvSecoesSelecionadas() {
    let lSecoes = '';
    if (listaSecoesSelecionadas.length > 0) {
        for (var x = 0; x < listaSecoesSelecionadas.length; x++) {
            lSecoes += lSecoes !== '' ? (', ' + listaSecoesSelecionadas[x].descricao.trim()) : listaSecoesSelecionadas[x].descricao.trim();
        }
    }

    mdBotaoSecao.value = lSecoes;
    mdc.autoInit();
}

function mostrarAvGruposSelecionadas() {
    let lGrupos = '';
    if (listaGruposSelecionadas.length > 0) {
        for (var x = 0; x < listaGruposSelecionadas.length; x++) {
            lGrupos += lGrupos !== '' ? (', ' + listaGruposSelecionadas[x].descricao.trim()) : listaGruposSelecionadas[x].descricao.trim();
        }
    }

    mdBotaoGrupo.value = lGrupos;
    mdc.autoInit();
}



function filtrarModelos() {
    if (listaMontadorasSelecionadas.length === 0) {
        listaModelosFiltradas = listaModelos;
    } else {
        listaModelosFiltradas = _.filter(listaModelos, function (item, index, array) {
            return listaMontadorasSelecionadas.indexOf(item.fabricante) >= 0;
        });
    }
}
function filtrarVersoes() {
    let listaModelosBaseSelecionadas = _.map(_.uniq(listaModelosSelecionadas, true, veiculo => veiculo.modelo_base), function (veiculo) {
        return veiculo.modelo_base;
    });

    listaVersoesFiltradas = _.filter(listaVersoes, function (item, index, array) {
        return listaModelosBaseSelecionadas.indexOf(item.modelo_base) >= 0 &&
            (listaAnosSelecionados.length === 0 || _.some(listaAnosSelecionados, function (itemAno) {
                return item.modelo_ano.indexOf(itemAno) > -1;
            })
            ) &&
            (listaCombustiveisSelecionadas.length === 0 || _.some(listaCombustiveisSelecionadas, function (itemCombustivel) {
                return item.combustivel.indexOf(itemCombustivel) > -1;
            })
            ) &&
            (listaMotorizacoesSelecionadas.length === 0 || _.some(listaMotorizacoesSelecionadas, function (itemMotorizacao) {
                return item.motorizacao.indexOf(itemMotorizacao) > -1;
            })
            ) &&
            (listaTracoesSelecionadas.length === 0 || _.some(listaTracoesSelecionadas, function (itemTracao) {
                return item.tracao.indexOf(itemTracao) > -1;
            })
            );
    });
}
function filtrarSecoes(callback) {
    let estadoAnterior = mdBotaoSecao.disabled;
    mdBotaoSecao.disabled = true;
    $('.area-loading-autocomplete-secao').show();

    if (paramGetDataSecoes !== null){
        if (typeof paramGetDataSecoes === 'function') {
            let dadosSecoesPersonalizados = paramGetDataSecoes();
            listaSecoes = _.map(dadosSecoesPersonalizados, function (obj) {
                return { codigo: obj[paramSecoesCampoCodigo], descricao: obj[paramSecoesCampoDescricao] };
            });
            mdBotaoSecao.disabled = false;
            $('.area-loading-autocomplete-secao').hide();
            if (typeof callback !== 'undefined') {
                callback();
            }
        } else if(typeof paramGetDataSecoes === 'string' && paramGetDataSecoes === 'API_GESTAOPARTS') {
            $.ajax({
                //URL da página com o WebMethod 
                url: "https://api.gestaoparts.com.br:9093/erpssplus/peca/secao/status", //"https://localhost:44363/Produto/GetDadosSecoesPorVeiculos?key=" + keyGpFiltrosAvancados,
                //data: {"codigo" : ""},
                type: "POST", //"POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({"codigo" : ""}),
                //processData: false,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + keyGpFiltrosAvancados);
                },
                success: function (parsedJson) {
                    listaSecoes = _.map(parsedJson, function (obj) {
                        return { codigo: obj['codigo'], descricao: obj['nome'] };
                    });
                    mdBotaoSecao.disabled = false;
                    $('.area-loading-autocomplete-secao').hide();
                    if (typeof callback !== 'undefined') {
                        callback();
                    }
                },
                error: function (req, status, error) {
                    console.log('erro: ', error);
                }
            });
        }
    } else {
        let listaVeiculoCodigosSelecionadas = _.map(_.uniq(listaVersoesSelecionadas, true, veiculo => veiculo.codigo), function (veiculo) {
            return veiculo.codigo;
        });

        if (listaVeiculoCodigosSelecionadas.length > 0) {
            var Dados = {
                codigos: listaVeiculoCodigosSelecionadas
            };

            //Cahamada AJAX
            $.ajax({
                //URL da página com o WebMethod 
                url: urlSecoes, //"https://localhost:44363/Produto/GetDadosSecoesPorVeiculos?key=" + keyGpFiltrosAvancados,
                data: JSON.stringify(Dados),
                type: methodSecoes, //"POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (parsedJson) {
                    if (!parsedJson.status) {
                        swal({
                            title: "",
                            html: parsedJson.message,
                            confirmButtonText: "Ok",
                            allowOutsideClick: true,
                            target: targetSwal,
                            onClose: () => {

                            }
                            //timer: 7000
                        });
                        mdBotaoSecao.disabled = estadoAnterior;
                        $('.area-loading-autocomplete-secao').hide();
                        return;
                    }
                    listaSecoes = parsedJson.dados;
                    mdBotaoSecao.disabled = false;
                    $('.area-loading-autocomplete-secao').hide();
                    if (typeof callback !== 'undefined') {
                        callback();
                    }
                },
                error: function (req, status, error) {
                    console.log('erro: ', error);
                }
            });
        } else {
            listaSecoes = [];
            mdBotaoSecao.disabled = true;
            $('.area-loading-autocomplete-secao').hide();
            if (typeof callback !== 'undefined') {
                callback();
            }
        }
    }
} 

function filtrarGrupos(callback) {
    let estadoAnterior = mdBotaoGrupo.disabled;
    mdBotaoGrupo.disabled = true;
    $('.area-loading-autocomplete-grupo').show();

    let listaVeiculoCodigosSelecionadas = _.map(_.uniq(listaVersoesSelecionadas, true, veiculo => veiculo.codigo), function (veiculo) {
        return veiculo.codigo;
    });

    let listaSecoesCodigosSelecionadas = _.map(_.uniq(listaSecoesSelecionadas, true, secao => secao.codigo), function (secao) {
        return secao.codigo;
    });

    if (paramGetDataGrupos !== null){
        if (typeof paramGetDataGrupos === 'function') {
            let dadosGruposPersonalizados = paramGetDataGrupos();
            listaGrupos = _.map(dadosGruposPersonalizados, function (obj) {
                return { codigo: obj[paramGruposCampoCodigo], descricao: obj[paramGruposCampoDescricao] };
            });
            mdBotaoGrupo.disabled = false;
            $('.area-loading-autocomplete-grupo').hide();
            callback();
        } else if(typeof paramGetDataGrupos === 'string' && paramGetDataGrupos === 'API_GESTAOPARTS') {
            $.ajax({
                //URL da página com o WebMethod 
                url: "https://api.gestaoparts.com.br:9093/erpssplus/peca/secaogrupo/status", //"https://localhost:44363/Produto/GetDadosSecoesPorVeiculos?key=" + keyGpFiltrosAvancados,
                //data: {"codigo" : ""},
                type: "POST", //"POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({"codigo" : ""}),
                //processData: false,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + keyGpFiltrosAvancados);
                },
                success: function (parsedJson) {
                    listaGrupos = _.map(parsedJson, function (obj) {
                        return { codigo: obj['codigo'], descricao: obj['nome'] };
                    });
                    mdBotaoGrupo.disabled = false;
                    $('.area-loading-autocomplete-grupo').hide();
                    callback();
                },
                error: function (req, status, error) {
                    console.log('erro: ', error);
                }
            });
        }
    } else {
        if (listaVeiculoCodigosSelecionadas.length > 0 && listaSecoesCodigosSelecionadas.length > 0) {
            var Dados = {
                veiculoscodigos: listaVeiculoCodigosSelecionadas,
                secoescodigos: listaSecoesCodigosSelecionadas
            };

            //Cahamada AJAX
            $.ajax({
                //URL da página com o WebMethod 
                url: urlGrupos, //"https://localhost:44363/Produto/GetDadosGruposPorVeiculoseSecoes",
                data: JSON.stringify(Dados),
                type: methodGrupos, //"POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (parsedJson) {
                    if (!parsedJson.status) {
                        swal({
                            title: "",
                            html: parsedJson.message,
                            confirmButtonText: "Ok",
                            allowOutsideClick: true,
                            target: targetSwal,
                            onClose: () => {

                            }
                            //timer: 7000
                        });
                        mdBotaoGrupo.disabled = estadoAnterior;
                        $('.area-loading-autocomplete-grupo').hide();
                        return;
                    }
                    listaGrupos = parsedJson.dados;
                    mdBotaoGrupo.disabled = false;
                    $('.area-loading-autocomplete-grupo').hide();
                    callback();
                },
                error: function (req, status, error) {
                    console.log('erro: ', error);
                }
            });
        } else {
            listaGrupos = [];
            mdBotaoGrupo.disabled = true;
            $('.area-loading-autocomplete-grupo').hide();
            callback();
        }
    }
}

function filtrarAnos() {
    let listaModelosBaseSelecionadas = _.map(_.uniq(listaModelosSelecionadas, true, veiculo => veiculo.modelo_base), function (veiculo) {
        return veiculo.modelo_base;
    });

    let listaVersoesFiltradasParaAnos = _.filter(listaVersoes, function (item, index, array) {
        return listaModelosBaseSelecionadas.indexOf(item.modelo_base) >= 0;
    });

    let listaAnosTodos = [];
    _.map(_.uniq(listaVersoesFiltradasParaAnos, true, veiculo => veiculo.modelo_ano), function (veiculo) {
        listaAnosTodos = listaAnosTodos.concat(veiculo.modelo_ano.split(" "));
    });
    listaAnos = _.sortBy(_.uniq(listaAnosTodos, true, ano => ano), ano => ano).reverse();
}
function filtrarCombustiveis() {
    let listaModelosBaseSelecionadas = _.map(_.uniq(listaModelosSelecionadas, true, veiculo => veiculo.modelo_base), function (veiculo) {
        return veiculo.modelo_base;
    });

    let listaVersoesFiltradasParaCombustiveis = _.filter(listaVersoes, function (item, index, array) {
        return listaModelosBaseSelecionadas.indexOf(item.modelo_base) >= 0 &&
            (listaAnosSelecionados.length === 0 || _.some(listaAnosSelecionados, function (itemAno) {
                return item.modelo_ano.indexOf(itemAno) > -1;
            }));
    });

    let listaCombustiveisTodos = [];
    _.map(_.uniq(listaVersoesFiltradasParaCombustiveis, true, veiculo => veiculo.combustivel), function (veiculo) {
        listaCombustiveisTodos.push(veiculo.combustivel);
    });

    listaCombustiveis = _.sortBy(listaCombustiveisTodos, combustivel => combustivel);
}
function filtrarMotorizacoes() {
    let listaModelosBaseSelecionadas = _.map(_.uniq(listaModelosSelecionadas, true, veiculo => veiculo.modelo_base), function (veiculo) {
        return veiculo.modelo_base;
    });

    let listaVersoesFiltradasParaMotorizacoes = _.filter(listaVersoes, function (item, index, array) {
        return listaModelosBaseSelecionadas.indexOf(item.modelo_base) >= 0 &&
            (listaAnosSelecionados.length === 0 || _.some(listaAnosSelecionados, function (itemAno) {
                return item.modelo_ano.indexOf(itemAno) > -1;
            }));
    });

    let listaMotorizacoesTodos = [];
    _.map(_.uniq(listaVersoesFiltradasParaMotorizacoes, true, veiculo => veiculo.motorizacao), function (veiculo) {
        listaMotorizacoesTodos.push(veiculo.motorizacao);
    });

    listaMotorizacoes = _.sortBy(listaMotorizacoesTodos, motorizacao => motorizacao);
}
function filtrarTracoes() {
    let listaModelosBaseSelecionadas = _.map(_.uniq(listaModelosSelecionadas, true, veiculo => veiculo.modelo_base), function (veiculo) {
        return veiculo.modelo_base;
    });

    let listaVersoesFiltradasParaTracoes = _.filter(listaVersoes, function (item, index, array) {
        return listaModelosBaseSelecionadas.indexOf(item.modelo_base) >= 0 &&
            (listaAnosSelecionados.length === 0 || _.some(listaAnosSelecionados, function (itemAno) {
                return item.modelo_ano.indexOf(itemAno) > -1;
            }));
    });

    let listaTracoesTodos = [];
    _.map(_.uniq(listaVersoesFiltradasParaTracoes, true, veiculo => veiculo.tracao), function (veiculo) {
        if (veiculo.tracao.trim() !== '') {
            listaTracoesTodos.push(veiculo.tracao);
        }
    });

    listaTracoes = _.sortBy(listaTracoesTodos, tracao => tracao);
}

function split(val) {
    return val.split(/,\s*/);
}
function extractLast(term) {
    return split(term).pop();
}

function isScrollbarBottom(container) {
    var height = container.outerHeight();
    var scrollHeight = container[0].scrollHeight;
    var scrollTop = container.scrollTop();
    if (scrollTop >= scrollHeight - height) {
        return true;
    }
    return false;
};


var loaderGlobais = [];

function exibirLoaderFA(id, identificadorRequisicao) {
    if (typeof id !== 'undefined' && id !== null) {
        $("#" + id, gpDivMaster).fakeLoader({
            mensagem: 'Processando..',
            timeToHide: false, //Time in milliseconds for fakeLoader disappear
            zIndex: 9, // Default zIndex
            spinner: "spinner1",//Options: 'spinner1', 'spinner2', 'spinner3', 'spinner4', 'spinner5', 'spinner6', 'spinner7' 
            //bgColor: "#2ecc71" //Hex, RGB or RGBA colors
            bgColor: "rgba(0, 0, 0, 0.5)"
        });
    } else {
        let iload = loaderGlobais.indexOf(identificadorRequisicao);
        if (iload === -1) {
            //adiciona apenas uma vez
            loaderGlobais.push(identificadorRequisicao);
        }

        //mostra fakeloader Global
        $("#fakeLoader", gpDivMaster).fakeLoader({
            mensagem: 'Aguarde..',
            timeToHide: false, //Time in milliseconds for fakeLoader disappear
            zIndex: 9999999, // Default zIndex
            spinner: "spinner1",//Options: 'spinner1', 'spinner2', 'spinner3', 'spinner4', 'spinner5', 'spinner6', 'spinner7' 
            //bgColor: "#2ecc71" //Hex, RGB or RGBA colors
            bgColor: "rgba(0, 0, 0, 0.5)"
        });
    }
}

function ocultarLoaderFA(id, identificadorRequisicao) {
    if (typeof id !== 'undefined' && id !== null) {
        $("#" + id, gpDivMaster).fadeOut();
    } else {
        let iload = loaderGlobais.indexOf(identificadorRequisicao);
        if (iload !== -1) {
            //remove
            loaderGlobais.splice(iload, 1);
        }
        if (loaderGlobais.length === 0) {
            //se nao tiver mais nenhum entao oculta 
            $("#fakeLoader", gpDivMaster).fadeOut(0);
        }
    }
}

function ehPlaca(texto) {
    let ehPlaca = false;

    if (texto.length === 7 || texto.length === 8) {
        let patt = new RegExp('\\w{3}[\\-]?\\d(\\d|\\w)\\d{2}', "i");
        if (patt.test(texto)) {
            //é um padrao de placa
            ehPlaca = true;
        }
    }
    return ehPlaca;
}

class GpFiltrosAvancados extends HTMLElement {
    constructor(opcoes){
        super()

        this.build(opcoes)
    }

    build(opcoes){
        const shadow = this.attachShadow({ mode: 'open' })
        //const shadow = this.attachShadow({ mode: 'closed' })

        const divMaster = this.createFAView(opcoes)

        shadow.appendChild(divMaster)

        this.gpAlertar = this.alertar
    }

    createFAView(opcoes){
        const divMaster = document.createElement('div')
        
        divMaster.classList.add('gp-filtrosavancados');
        divMaster.classList.add('pagina-webparts');
        let idInterno = this.getAttribute('data-idinterno') || 'gp-filtrosavancados'
        divMaster.setAttribute("id", idInterno);

        //console.log('opcoessssssssssss', opcoes);
        
        let combinacaoCoresfa = 'verde-verde';

        if(typeof opcoes !== 'undefined') {
            if(typeof opcoes.combinacaoCores === 'string') {
                //valida se esta dentro de um dos aceitaveis senao mantem o padrao e apresenta mensagem
                let iCor = ['dispensar', 'azul-azul', 'azul-laranja', 'cinza-cinza', 'laranja-laranja', 'verde-verde', 'vermelho-vermelho'].indexOf(opcoes.combinacaoCores);
                if(iCor !== -1) {
                    combinacaoCoresfa = opcoes.combinacaoCores;
                }
            }
        }









        let cssSweetalert = `<style type="text/css">@-webkit-keyframes swal2-show {
            0% {
              -webkit-transform: scale(0.7);
                      transform: scale(0.7); }
            45% {
              -webkit-transform: scale(1.05);
                      transform: scale(1.05); }
            80% {
              -webkit-transform: scale(0.95);
                      transform: scale(0.95); }
            100% {
              -webkit-transform: scale(1);
                      transform: scale(1); } }
          
          @keyframes swal2-show {
            0% {
              -webkit-transform: scale(0.7);
                      transform: scale(0.7); }
            45% {
              -webkit-transform: scale(1.05);
                      transform: scale(1.05); }
            80% {
              -webkit-transform: scale(0.95);
                      transform: scale(0.95); }
            100% {
              -webkit-transform: scale(1);
                      transform: scale(1); } }
          
          @-webkit-keyframes swal2-hide {
            0% {
              -webkit-transform: scale(1);
                      transform: scale(1);
              opacity: 1; }
            100% {
              -webkit-transform: scale(0.5);
                      transform: scale(0.5);
              opacity: 0; } }
          
          @keyframes swal2-hide {
            0% {
              -webkit-transform: scale(1);
                      transform: scale(1);
              opacity: 1; }
            100% {
              -webkit-transform: scale(0.5);
                      transform: scale(0.5);
              opacity: 0; } }
          
          @-webkit-keyframes swal2-animate-success-line-tip {
            0% {
              top: 1.1875em;
              left: .0625em;
              width: 0; }
            54% {
              top: 1.0625em;
              left: .125em;
              width: 0; }
            70% {
              top: 2.1875em;
              left: -.375em;
              width: 3.125em; }
            84% {
              top: 3em;
              left: 1.3125em;
              width: 1.0625em; }
            100% {
              top: 2.8125em;
              left: .875em;
              width: 1.5625em; } }
          
          @keyframes swal2-animate-success-line-tip {
            0% {
              top: 1.1875em;
              left: .0625em;
              width: 0; }
            54% {
              top: 1.0625em;
              left: .125em;
              width: 0; }
            70% {
              top: 2.1875em;
              left: -.375em;
              width: 3.125em; }
            84% {
              top: 3em;
              left: 1.3125em;
              width: 1.0625em; }
            100% {
              top: 2.8125em;
              left: .875em;
              width: 1.5625em; } }
          
          @-webkit-keyframes swal2-animate-success-line-long {
            0% {
              top: 3.375em;
              right: 2.875em;
              width: 0; }
            65% {
              top: 3.375em;
              right: 2.875em;
              width: 0; }
            84% {
              top: 2.1875em;
              right: 0;
              width: 3.4375em; }
            100% {
              top: 2.375em;
              right: .5em;
              width: 2.9375em; } }
          
          @keyframes swal2-animate-success-line-long {
            0% {
              top: 3.375em;
              right: 2.875em;
              width: 0; }
            65% {
              top: 3.375em;
              right: 2.875em;
              width: 0; }
            84% {
              top: 2.1875em;
              right: 0;
              width: 3.4375em; }
            100% {
              top: 2.375em;
              right: .5em;
              width: 2.9375em; } }
          
          @-webkit-keyframes swal2-rotate-success-circular-line {
            0% {
              -webkit-transform: rotate(-45deg);
                      transform: rotate(-45deg); }
            5% {
              -webkit-transform: rotate(-45deg);
                      transform: rotate(-45deg); }
            12% {
              -webkit-transform: rotate(-405deg);
                      transform: rotate(-405deg); }
            100% {
              -webkit-transform: rotate(-405deg);
                      transform: rotate(-405deg); } }
          
          @keyframes swal2-rotate-success-circular-line {
            0% {
              -webkit-transform: rotate(-45deg);
                      transform: rotate(-45deg); }
            5% {
              -webkit-transform: rotate(-45deg);
                      transform: rotate(-45deg); }
            12% {
              -webkit-transform: rotate(-405deg);
                      transform: rotate(-405deg); }
            100% {
              -webkit-transform: rotate(-405deg);
                      transform: rotate(-405deg); } }
          
          @-webkit-keyframes swal2-animate-error-x-mark {
            0% {
              margin-top: 1.625em;
              -webkit-transform: scale(0.4);
                      transform: scale(0.4);
              opacity: 0; }
            50% {
              margin-top: 1.625em;
              -webkit-transform: scale(0.4);
                      transform: scale(0.4);
              opacity: 0; }
            80% {
              margin-top: -.375em;
              -webkit-transform: scale(1.15);
                      transform: scale(1.15); }
            100% {
              margin-top: 0;
              -webkit-transform: scale(1);
                      transform: scale(1);
              opacity: 1; } }
          
          @keyframes swal2-animate-error-x-mark {
            0% {
              margin-top: 1.625em;
              -webkit-transform: scale(0.4);
                      transform: scale(0.4);
              opacity: 0; }
            50% {
              margin-top: 1.625em;
              -webkit-transform: scale(0.4);
                      transform: scale(0.4);
              opacity: 0; }
            80% {
              margin-top: -.375em;
              -webkit-transform: scale(1.15);
                      transform: scale(1.15); }
            100% {
              margin-top: 0;
              -webkit-transform: scale(1);
                      transform: scale(1);
              opacity: 1; } }
          
          @-webkit-keyframes swal2-animate-error-icon {
            0% {
              -webkit-transform: rotateX(100deg);
                      transform: rotateX(100deg);
              opacity: 0; }
            100% {
              -webkit-transform: rotateX(0deg);
                      transform: rotateX(0deg);
              opacity: 1; } }
          
          @keyframes swal2-animate-error-icon {
            0% {
              -webkit-transform: rotateX(100deg);
                      transform: rotateX(100deg);
              opacity: 0; }
            100% {
              -webkit-transform: rotateX(0deg);
                      transform: rotateX(0deg);
              opacity: 1; } }
          
          body.swal2-toast-shown.swal2-has-input > .swal2-container > .swal2-toast {
            flex-direction: column;
            align-items: stretch; }
            body.swal2-toast-shown.swal2-has-input > .swal2-container > .swal2-toast .swal2-actions {
              flex: 1;
              align-self: stretch;
              justify-content: flex-end;
              height: 2.2em; }
            body.swal2-toast-shown.swal2-has-input > .swal2-container > .swal2-toast .swal2-loading {
              justify-content: center; }
            body.swal2-toast-shown.swal2-has-input > .swal2-container > .swal2-toast .swal2-input {
              height: 2em;
              margin: .3125em auto;
              font-size: 1em; }
            body.swal2-toast-shown.swal2-has-input > .swal2-container > .swal2-toast .swal2-validationerror {
              font-size: 1em; }
          
          body.swal2-toast-shown > .swal2-container {
            position: fixed;
            background-color: transparent; }
            body.swal2-toast-shown > .swal2-container.swal2-shown {
              background-color: transparent; }
            body.swal2-toast-shown > .swal2-container.swal2-top {
              top: 0;
              right: auto;
              bottom: auto;
              left: 50%;
              -webkit-transform: translateX(-50%);
                      transform: translateX(-50%); }
            body.swal2-toast-shown > .swal2-container.swal2-top-end, body.swal2-toast-shown > .swal2-container.swal2-top-right {
              top: 0;
              right: 0;
              bottom: auto;
              left: auto; }
            body.swal2-toast-shown > .swal2-container.swal2-top-start, body.swal2-toast-shown > .swal2-container.swal2-top-left {
              top: 0;
              right: auto;
              bottom: auto;
              left: 0; }
            body.swal2-toast-shown > .swal2-container.swal2-center-start, body.swal2-toast-shown > .swal2-container.swal2-center-left {
              top: 50%;
              right: auto;
              bottom: auto;
              left: 0;
              -webkit-transform: translateY(-50%);
                      transform: translateY(-50%); }
            body.swal2-toast-shown > .swal2-container.swal2-center {
              top: 50%;
              right: auto;
              bottom: auto;
              left: 50%;
              -webkit-transform: translate(-50%, -50%);
                      transform: translate(-50%, -50%); }
            body.swal2-toast-shown > .swal2-container.swal2-center-end, body.swal2-toast-shown > .swal2-container.swal2-center-right {
              top: 50%;
              right: 0;
              bottom: auto;
              left: auto;
              -webkit-transform: translateY(-50%);
                      transform: translateY(-50%); }
            body.swal2-toast-shown > .swal2-container.swal2-bottom-start, body.swal2-toast-shown > .swal2-container.swal2-bottom-left {
              top: auto;
              right: auto;
              bottom: 0;
              left: 0; }
            body.swal2-toast-shown > .swal2-container.swal2-bottom {
              top: auto;
              right: auto;
              bottom: 0;
              left: 50%;
              -webkit-transform: translateX(-50%);
                      transform: translateX(-50%); }
            body.swal2-toast-shown > .swal2-container.swal2-bottom-end, body.swal2-toast-shown > .swal2-container.swal2-bottom-right {
              top: auto;
              right: 0;
              bottom: 0;
              left: auto; }
          
          .swal2-popup.swal2-toast {
            flex-direction: row;
            align-items: center;
            width: auto;
            padding: 0.625em;
            box-shadow: 0 0 0.625em #d9d9d9;
            overflow-y: hidden; }
            .swal2-popup.swal2-toast .swal2-header {
              flex-direction: row; }
            .swal2-popup.swal2-toast .swal2-title {
              justify-content: flex-start;
              margin: 0 .6em;
              font-size: 1em; }
            .swal2-popup.swal2-toast .swal2-close {
              position: initial; }
            .swal2-popup.swal2-toast .swal2-content {
              justify-content: flex-start;
              font-size: 1em; }
            .swal2-popup.swal2-toast .swal2-icon {
              width: 2em;
              min-width: 2em;
              height: 2em;
              margin: 0; }
              .swal2-popup.swal2-toast .swal2-icon-text {
                font-size: 2em;
                font-weight: bold;
                line-height: 1em; }
              .swal2-popup.swal2-toast .swal2-icon.swal2-success .swal2-success-ring {
                width: 2em;
                height: 2em; }
              .swal2-popup.swal2-toast .swal2-icon.swal2-error [class^='swal2-x-mark-line'] {
                top: .875em;
                width: 1.375em; }
                .swal2-popup.swal2-toast .swal2-icon.swal2-error [class^='swal2-x-mark-line'][class$='left'] {
                  left: .3125em; }
                .swal2-popup.swal2-toast .swal2-icon.swal2-error [class^='swal2-x-mark-line'][class$='right'] {
                  right: .3125em; }
            .swal2-popup.swal2-toast .swal2-actions {
              height: auto;
              margin: 0 .3125em; }
            .swal2-popup.swal2-toast .swal2-styled {
              margin: 0 .3125em;
              padding: .3125em .625em;
              font-size: 1em; }
              .swal2-popup.swal2-toast .swal2-styled:focus {
                box-shadow: 0 0 0 0.0625em #fff, 0 0 0 0.125em rgba(50, 100, 150, 0.4); }
            .swal2-popup.swal2-toast .swal2-success {
              border-color: #a5dc86; }
              .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-circular-line'] {
                position: absolute;
                width: 2em;
                height: 2.8125em;
                -webkit-transform: rotate(45deg);
                        transform: rotate(45deg);
                border-radius: 50%; }
                .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-circular-line'][class$='left'] {
                  top: -.25em;
                  left: -.9375em;
                  -webkit-transform: rotate(-45deg);
                          transform: rotate(-45deg);
                  -webkit-transform-origin: 2em 2em;
                          transform-origin: 2em 2em;
                  border-radius: 4em 0 0 4em; }
                .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-circular-line'][class$='right'] {
                  top: -.25em;
                  left: .9375em;
                  -webkit-transform-origin: 0 2em;
                          transform-origin: 0 2em;
                  border-radius: 0 4em 4em 0; }
              .swal2-popup.swal2-toast .swal2-success .swal2-success-ring {
                width: 2em;
                height: 2em; }
              .swal2-popup.swal2-toast .swal2-success .swal2-success-fix {
                top: 0;
                left: .4375em;
                width: .4375em;
                height: 2.6875em; }
              .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-line'] {
                height: .3125em; }
                .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-line'][class$='tip'] {
                  top: 1.125em;
                  left: .1875em;
                  width: .75em; }
                .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-line'][class$='long'] {
                  top: .9375em;
                  right: .1875em;
                  width: 1.375em; }
            .swal2-popup.swal2-toast.swal2-show {
              -webkit-animation: showSweetToast .5s;
                      animation: showSweetToast .5s; }
            .swal2-popup.swal2-toast.swal2-hide {
              -webkit-animation: hideSweetToast .2s forwards;
                      animation: hideSweetToast .2s forwards; }
            .swal2-popup.swal2-toast .swal2-animate-success-icon .swal2-success-line-tip {
              -webkit-animation: animate-toast-success-tip .75s;
                      animation: animate-toast-success-tip .75s; }
            .swal2-popup.swal2-toast .swal2-animate-success-icon .swal2-success-line-long {
              -webkit-animation: animate-toast-success-long .75s;
                      animation: animate-toast-success-long .75s; }
          
          @-webkit-keyframes showSweetToast {
            0% {
              -webkit-transform: translateY(-0.625em) rotateZ(2deg);
                      transform: translateY(-0.625em) rotateZ(2deg);
              opacity: 0; }
            33% {
              -webkit-transform: translateY(0) rotateZ(-2deg);
                      transform: translateY(0) rotateZ(-2deg);
              opacity: .5; }
            66% {
              -webkit-transform: translateY(0.3125em) rotateZ(2deg);
                      transform: translateY(0.3125em) rotateZ(2deg);
              opacity: .7; }
            100% {
              -webkit-transform: translateY(0) rotateZ(0);
                      transform: translateY(0) rotateZ(0);
              opacity: 1; } }
          
          @keyframes showSweetToast {
            0% {
              -webkit-transform: translateY(-0.625em) rotateZ(2deg);
                      transform: translateY(-0.625em) rotateZ(2deg);
              opacity: 0; }
            33% {
              -webkit-transform: translateY(0) rotateZ(-2deg);
                      transform: translateY(0) rotateZ(-2deg);
              opacity: .5; }
            66% {
              -webkit-transform: translateY(0.3125em) rotateZ(2deg);
                      transform: translateY(0.3125em) rotateZ(2deg);
              opacity: .7; }
            100% {
              -webkit-transform: translateY(0) rotateZ(0);
                      transform: translateY(0) rotateZ(0);
              opacity: 1; } }
          
          @-webkit-keyframes hideSweetToast {
            0% {
              opacity: 1; }
            33% {
              opacity: .5; }
            100% {
              -webkit-transform: rotateZ(1deg);
                      transform: rotateZ(1deg);
              opacity: 0; } }
          
          @keyframes hideSweetToast {
            0% {
              opacity: 1; }
            33% {
              opacity: .5; }
            100% {
              -webkit-transform: rotateZ(1deg);
                      transform: rotateZ(1deg);
              opacity: 0; } }
          
          @-webkit-keyframes animate-toast-success-tip {
            0% {
              top: .5625em;
              left: .0625em;
              width: 0; }
            54% {
              top: .125em;
              left: .125em;
              width: 0; }
            70% {
              top: .625em;
              left: -.25em;
              width: 1.625em; }
            84% {
              top: 1.0625em;
              left: .75em;
              width: .5em; }
            100% {
              top: 1.125em;
              left: .1875em;
              width: .75em; } }
          
          @keyframes animate-toast-success-tip {
            0% {
              top: .5625em;
              left: .0625em;
              width: 0; }
            54% {
              top: .125em;
              left: .125em;
              width: 0; }
            70% {
              top: .625em;
              left: -.25em;
              width: 1.625em; }
            84% {
              top: 1.0625em;
              left: .75em;
              width: .5em; }
            100% {
              top: 1.125em;
              left: .1875em;
              width: .75em; } }
          
          @-webkit-keyframes animate-toast-success-long {
            0% {
              top: 1.625em;
              right: 1.375em;
              width: 0; }
            65% {
              top: 1.25em;
              right: .9375em;
              width: 0; }
            84% {
              top: .9375em;
              right: 0;
              width: 1.125em; }
            100% {
              top: .9375em;
              right: .1875em;
              width: 1.375em; } }
          
          @keyframes animate-toast-success-long {
            0% {
              top: 1.625em;
              right: 1.375em;
              width: 0; }
            65% {
              top: 1.25em;
              right: .9375em;
              width: 0; }
            84% {
              top: .9375em;
              right: 0;
              width: 1.125em; }
            100% {
              top: .9375em;
              right: .1875em;
              width: 1.375em; } }
          
          html.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown),
          body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown) {
            height: auto;
            overflow-y: hidden; }
          
          body.swal2-no-backdrop .swal2-shown {
            top: auto;
            right: auto;
            bottom: auto;
            left: auto;
            background-color: transparent; }
            body.swal2-no-backdrop .swal2-shown > .swal2-modal {
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.4); }
            body.swal2-no-backdrop .swal2-shown.swal2-top {
              top: 0;
              left: 50%;
              -webkit-transform: translateX(-50%);
                      transform: translateX(-50%); }
            body.swal2-no-backdrop .swal2-shown.swal2-top-start, body.swal2-no-backdrop .swal2-shown.swal2-top-left {
              top: 0;
              left: 0; }
            body.swal2-no-backdrop .swal2-shown.swal2-top-end, body.swal2-no-backdrop .swal2-shown.swal2-top-right {
              top: 0;
              right: 0; }
            body.swal2-no-backdrop .swal2-shown.swal2-center {
              top: 50%;
              left: 50%;
              -webkit-transform: translate(-50%, -50%);
                      transform: translate(-50%, -50%); }
            body.swal2-no-backdrop .swal2-shown.swal2-center-start, body.swal2-no-backdrop .swal2-shown.swal2-center-left {
              top: 50%;
              left: 0;
              -webkit-transform: translateY(-50%);
                      transform: translateY(-50%); }
            body.swal2-no-backdrop .swal2-shown.swal2-center-end, body.swal2-no-backdrop .swal2-shown.swal2-center-right {
              top: 50%;
              right: 0;
              -webkit-transform: translateY(-50%);
                      transform: translateY(-50%); }
            body.swal2-no-backdrop .swal2-shown.swal2-bottom {
              bottom: 0;
              left: 50%;
              -webkit-transform: translateX(-50%);
                      transform: translateX(-50%); }
            body.swal2-no-backdrop .swal2-shown.swal2-bottom-start, body.swal2-no-backdrop .swal2-shown.swal2-bottom-left {
              bottom: 0;
              left: 0; }
            body.swal2-no-backdrop .swal2-shown.swal2-bottom-end, body.swal2-no-backdrop .swal2-shown.swal2-bottom-right {
              right: 0;
              bottom: 0; }
          
          .swal2-container {
            display: flex;
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            padding: 10px;
            background-color: transparent;
            z-index: 1060;
            overflow-x: hidden;
            -webkit-overflow-scrolling: touch; }
            .swal2-container.swal2-top {
              align-items: flex-start; }
            .swal2-container.swal2-top-start, .swal2-container.swal2-top-left {
              align-items: flex-start;
              justify-content: flex-start; }
            .swal2-container.swal2-top-end, .swal2-container.swal2-top-right {
              align-items: flex-start;
              justify-content: flex-end; }
            .swal2-container.swal2-center {
              align-items: center; }
            .swal2-container.swal2-center-start, .swal2-container.swal2-center-left {
              align-items: center;
              justify-content: flex-start; }
            .swal2-container.swal2-center-end, .swal2-container.swal2-center-right {
              align-items: center;
              justify-content: flex-end; }
            .swal2-container.swal2-bottom {
              align-items: flex-end; }
            .swal2-container.swal2-bottom-start, .swal2-container.swal2-bottom-left {
              align-items: flex-end;
              justify-content: flex-start; }
            .swal2-container.swal2-bottom-end, .swal2-container.swal2-bottom-right {
              align-items: flex-end;
              justify-content: flex-end; }
            .swal2-container.swal2-grow-fullscreen > .swal2-modal {
              display: flex !important;
              flex: 1;
              align-self: stretch;
              justify-content: center; }
            .swal2-container.swal2-grow-row > .swal2-modal {
              display: flex !important;
              flex: 1;
              align-content: center;
              justify-content: center; }
            .swal2-container.swal2-grow-column {
              flex: 1;
              flex-direction: column; }
              .swal2-container.swal2-grow-column.swal2-top, .swal2-container.swal2-grow-column.swal2-center, .swal2-container.swal2-grow-column.swal2-bottom {
                align-items: center; }
              .swal2-container.swal2-grow-column.swal2-top-start, .swal2-container.swal2-grow-column.swal2-center-start, .swal2-container.swal2-grow-column.swal2-bottom-start, .swal2-container.swal2-grow-column.swal2-top-left, .swal2-container.swal2-grow-column.swal2-center-left, .swal2-container.swal2-grow-column.swal2-bottom-left {
                align-items: flex-start; }
              .swal2-container.swal2-grow-column.swal2-top-end, .swal2-container.swal2-grow-column.swal2-center-end, .swal2-container.swal2-grow-column.swal2-bottom-end, .swal2-container.swal2-grow-column.swal2-top-right, .swal2-container.swal2-grow-column.swal2-center-right, .swal2-container.swal2-grow-column.swal2-bottom-right {
                align-items: flex-end; }
              .swal2-container.swal2-grow-column > .swal2-modal {
                display: flex !important;
                flex: 1;
                align-content: center;
                justify-content: center; }
            .swal2-container:not(.swal2-top):not(.swal2-top-start):not(.swal2-top-end):not(.swal2-top-left):not(.swal2-top-right):not(.swal2-center-start):not(.swal2-center-end):not(.swal2-center-left):not(.swal2-center-right):not(.swal2-bottom):not(.swal2-bottom-start):not(.swal2-bottom-end):not(.swal2-bottom-left):not(.swal2-bottom-right) > .swal2-modal {
              margin: auto; }
            @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
              .swal2-container .swal2-modal {
                margin: 0 !important; } }
            .swal2-container.swal2-fade {
              transition: background-color .1s; }
            .swal2-container.swal2-shown {
              background-color: rgba(0, 0, 0, 0.4); }
          
          .swal2-popup {
            display: none;
            position: relative;
            flex-direction: column;
            justify-content: center;
            width: 32em;
            max-width: 100%;
            padding: 1.25em;
            border-radius: 0.3125em;
            background: #fff;
            font-family: inherit;
            font-size: 1rem;
            box-sizing: border-box; }
            .swal2-popup:focus {
              outline: none; }
            .swal2-popup.swal2-loading {
              overflow-y: hidden; }
            .swal2-popup .swal2-header {
              display: flex;
              flex-direction: column;
              align-items: center; }
            .swal2-popup .swal2-title {
              display: block;
              position: relative;
              max-width: 100%;
              margin: 0 0 0.4em;
              padding: 0;
              color: #595959;
              font-size: 1.875em;
              font-weight: 600;
              text-align: center;
              text-transform: none;
              word-wrap: break-word; }
            .swal2-popup .swal2-actions {
              align-items: center;
              justify-content: center;
              margin: 1.25em auto 0; }
              .swal2-popup .swal2-actions:not(.swal2-loading) .swal2-styled[disabled] {
                opacity: .4; }
              .swal2-popup .swal2-actions:not(.swal2-loading) .swal2-styled:hover {
                background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)); }
              .swal2-popup .swal2-actions:not(.swal2-loading) .swal2-styled:active {
                background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)); }
              .swal2-popup .swal2-actions.swal2-loading .swal2-styled.swal2-confirm {
                width: 2.5em;
                height: 2.5em;
                margin: .46875em;
                padding: 0;
                border: .25em solid transparent;
                border-radius: 100%;
                border-color: transparent;
                background-color: transparent !important;
                color: transparent;
                cursor: default;
                box-sizing: border-box;
                -webkit-animation: swal2-rotate-loading 1.5s linear 0s infinite normal;
                        animation: swal2-rotate-loading 1.5s linear 0s infinite normal;
                -webkit-user-select: none;
                   -moz-user-select: none;
                    -ms-user-select: none;
                        user-select: none; }
              .swal2-popup .swal2-actions.swal2-loading .swal2-styled.swal2-cancel {
                margin-right: 30px;
                margin-left: 30px; }
              .swal2-popup .swal2-actions.swal2-loading :not(.swal2-styled).swal2-confirm::after {
                display: inline-block;
                width: 15px;
                height: 15px;
                margin-left: 5px;
                border: 3px solid #999999;
                border-radius: 50%;
                border-right-color: transparent;
                box-shadow: 1px 1px 1px #fff;
                content: '';
                -webkit-animation: swal2-rotate-loading 1.5s linear 0s infinite normal;
                        animation: swal2-rotate-loading 1.5s linear 0s infinite normal; }
            .swal2-popup .swal2-styled {
              margin: 0 .3125em;
              padding: .625em 2em;
              font-weight: 500;
              box-shadow: none; }
              .swal2-popup .swal2-styled:not([disabled]) {
                cursor: pointer; }
              .swal2-popup .swal2-styled.swal2-confirm {
                border: 0;
                border-radius: 0.25em;
                background: initial;
                background-color: #3085d6;
                color: #fff;
                font-size: 1.0625em; }
              .swal2-popup .swal2-styled.swal2-cancel {
                border: 0;
                border-radius: 0.25em;
                background: initial;
                background-color: #aaa;
                color: #fff;
                font-size: 1.0625em; }
              .swal2-popup .swal2-styled:focus {
                outline: none;
                box-shadow: 0 0 0 2px #fff, 0 0 0 4px rgba(50, 100, 150, 0.4); }
              .swal2-popup .swal2-styled::-moz-focus-inner {
                border: 0; }
            .swal2-popup .swal2-footer {
              justify-content: center;
              margin: 1.25em 0 0;
              padding-top: 1em;
              border-top: 1px solid #eee;
              color: #545454;
              font-size: 1em; }
            .swal2-popup .swal2-image {
              max-width: 100%;
              margin: 1.25em auto; }
            .swal2-popup .swal2-close {
              position: absolute;
              top: 0;
              right: 0;
              justify-content: center;
              width: 1.2em;
              height: 1.2em;
              padding: 0;
              transition: color 0.1s ease-out;
              border: none;
              border-radius: 0;
              background: transparent;
              color: #cccccc;
              font-family: serif;
              font-size: 2.5em;
              line-height: 1.2;
              cursor: pointer;
              overflow: hidden; }
              .swal2-popup .swal2-close:hover {
                -webkit-transform: none;
                        transform: none;
                color: #f27474; }
            .swal2-popup > .swal2-input,
            .swal2-popup > .swal2-file,
            .swal2-popup > .swal2-textarea,
            .swal2-popup > .swal2-select,
            .swal2-popup > .swal2-radio,
            .swal2-popup > .swal2-checkbox {
              display: none; }
            .swal2-popup .swal2-content {
              justify-content: center;
              margin: 0;
              padding: 0;
              color: #545454;
              font-size: 1.125em;
              font-weight: 300;
              line-height: normal;
              word-wrap: break-word; }
            .swal2-popup #swal2-content {
              text-align: center; }
            .swal2-popup .swal2-input,
            .swal2-popup .swal2-file,
            .swal2-popup .swal2-textarea,
            .swal2-popup .swal2-select,
            .swal2-popup .swal2-radio,
            .swal2-popup .swal2-checkbox {
              margin: 1em auto; }
            .swal2-popup .swal2-input,
            .swal2-popup .swal2-file,
            .swal2-popup .swal2-textarea {
              width: 100%;
              transition: border-color .3s, box-shadow .3s;
              border: 1px solid #d9d9d9;
              border-radius: 0.1875em;
              font-size: 1.125em;
              box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.06);
              box-sizing: border-box; }
              .swal2-popup .swal2-input.swal2-inputerror,
              .swal2-popup .swal2-file.swal2-inputerror,
              .swal2-popup .swal2-textarea.swal2-inputerror {
                border-color: #f27474 !important;
                box-shadow: 0 0 2px #f27474 !important; }
              .swal2-popup .swal2-input:focus,
              .swal2-popup .swal2-file:focus,
              .swal2-popup .swal2-textarea:focus {
                border: 1px solid #b4dbed;
                outline: none;
                box-shadow: 0 0 3px #c4e6f5; }
              .swal2-popup .swal2-input::-webkit-input-placeholder,
              .swal2-popup .swal2-file::-webkit-input-placeholder,
              .swal2-popup .swal2-textarea::-webkit-input-placeholder {
                color: #cccccc; }
              .swal2-popup .swal2-input:-ms-input-placeholder,
              .swal2-popup .swal2-file:-ms-input-placeholder,
              .swal2-popup .swal2-textarea:-ms-input-placeholder {
                color: #cccccc; }
              .swal2-popup .swal2-input::-ms-input-placeholder,
              .swal2-popup .swal2-file::-ms-input-placeholder,
              .swal2-popup .swal2-textarea::-ms-input-placeholder {
                color: #cccccc; }
              .swal2-popup .swal2-input::placeholder,
              .swal2-popup .swal2-file::placeholder,
              .swal2-popup .swal2-textarea::placeholder {
                color: #cccccc; }
            .swal2-popup .swal2-range input {
              width: 80%; }
            .swal2-popup .swal2-range output {
              width: 20%;
              font-weight: 600;
              text-align: center; }
            .swal2-popup .swal2-range input,
            .swal2-popup .swal2-range output {
              height: 2.625em;
              margin: 1em auto;
              padding: 0;
              font-size: 1.125em;
              line-height: 2.625em; }
            .swal2-popup .swal2-input {
              height: 2.625em;
              padding: 0.75em; }
              .swal2-popup .swal2-input[type='number'] {
                max-width: 10em; }
            .swal2-popup .swal2-file {
              font-size: 1.125em; }
            .swal2-popup .swal2-textarea {
              height: 6.75em;
              padding: 0.75em; }
            .swal2-popup .swal2-select {
              min-width: 50%;
              max-width: 100%;
              padding: .375em .625em;
              color: #545454;
              font-size: 1.125em; }
            .swal2-popup .swal2-radio,
            .swal2-popup .swal2-checkbox {
              align-items: center;
              justify-content: center; }
              .swal2-popup .swal2-radio label,
              .swal2-popup .swal2-checkbox label {
                margin: 0 .6em;
                font-size: 1.125em; }
              .swal2-popup .swal2-radio input,
              .swal2-popup .swal2-checkbox input {
                margin: 0 .4em; }
            .swal2-popup .swal2-validationerror {
              display: none;
              align-items: center;
              justify-content: center;
              padding: 0.625em;
              background: #f0f0f0;
              color: #666666;
              font-size: 1em;
              font-weight: 300;
              overflow: hidden; }
              .swal2-popup .swal2-validationerror::before {
                display: inline-block;
                width: 1.5em;
                height: 1.5em;
                margin: 0 .625em;
                border-radius: 50%;
                background-color: #f27474;
                color: #fff;
                font-weight: 600;
                line-height: 1.5em;
                text-align: center;
                content: '!';
                zoom: normal; }
          
          @supports (-ms-accelerator: true) {
            .swal2-range input {
              width: 100% !important; }
            .swal2-range output {
              display: none; } }
          
          @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
            .swal2-range input {
              width: 100% !important; }
            .swal2-range output {
              display: none; } }
          
          @-moz-document url-prefix() {
            .swal2-close:focus {
              outline: 2px solid rgba(50, 100, 150, 0.4); } }
          
          .swal2-icon {
            position: relative;
            justify-content: center;
            width: 5em;
            height: 5em;
            margin: 1.25em auto 1.875em;
            border: .25em solid transparent;
            border-radius: 50%;
            line-height: 5em;
            cursor: default;
            box-sizing: content-box;
            -webkit-user-select: none;
               -moz-user-select: none;
                -ms-user-select: none;
                    user-select: none;
            zoom: normal; }
            .swal2-icon-text {
              font-size: 3.75em; }
            .swal2-icon.swal2-error {
              border-color: #f27474; }
              .swal2-icon.swal2-error .swal2-x-mark {
                position: relative;
                flex-grow: 1; }
              .swal2-icon.swal2-error [class^='swal2-x-mark-line'] {
                display: block;
                position: absolute;
                top: 2.3125em;
                width: 2.9375em;
                height: .3125em;
                border-radius: .125em;
                background-color: #f27474; }
                .swal2-icon.swal2-error [class^='swal2-x-mark-line'][class$='left'] {
                  left: 1.0625em;
                  -webkit-transform: rotate(45deg);
                          transform: rotate(45deg); }
                .swal2-icon.swal2-error [class^='swal2-x-mark-line'][class$='right'] {
                  right: 1em;
                  -webkit-transform: rotate(-45deg);
                          transform: rotate(-45deg); }
            .swal2-icon.swal2-warning {
              border-color: #facea8;
              color: #f8bb86; }
            .swal2-icon.swal2-info {
              border-color: #9de0f6;
              color: #3fc3ee; }
            .swal2-icon.swal2-question {
              border-color: #c9dae1;
              color: #87adbd; }
            .swal2-icon.swal2-success {
              border-color: #a5dc86; }
              .swal2-icon.swal2-success [class^='swal2-success-circular-line'] {
                position: absolute;
                width: 3.75em;
                height: 7.5em;
                -webkit-transform: rotate(45deg);
                        transform: rotate(45deg);
                border-radius: 50%; }
                .swal2-icon.swal2-success [class^='swal2-success-circular-line'][class$='left'] {
                  top: -.4375em;
                  left: -2.0635em;
                  -webkit-transform: rotate(-45deg);
                          transform: rotate(-45deg);
                  -webkit-transform-origin: 3.75em 3.75em;
                          transform-origin: 3.75em 3.75em;
                  border-radius: 7.5em 0 0 7.5em; }
                .swal2-icon.swal2-success [class^='swal2-success-circular-line'][class$='right'] {
                  top: -.6875em;
                  left: 1.875em;
                  -webkit-transform: rotate(-45deg);
                          transform: rotate(-45deg);
                  -webkit-transform-origin: 0 3.75em;
                          transform-origin: 0 3.75em;
                  border-radius: 0 7.5em 7.5em 0; }
              .swal2-icon.swal2-success .swal2-success-ring {
                position: absolute;
                top: -.25em;
                left: -.25em;
                width: 100%;
                height: 100%;
                border: 0.25em solid rgba(165, 220, 134, 0.3);
                border-radius: 50%;
                z-index: 2;
                box-sizing: content-box; }
              .swal2-icon.swal2-success .swal2-success-fix {
                position: absolute;
                top: .5em;
                left: 1.625em;
                width: .4375em;
                height: 5.625em;
                -webkit-transform: rotate(-45deg);
                        transform: rotate(-45deg);
                z-index: 1; }
              .swal2-icon.swal2-success [class^='swal2-success-line'] {
                display: block;
                position: absolute;
                height: .3125em;
                border-radius: .125em;
                background-color: #a5dc86;
                z-index: 2; }
                .swal2-icon.swal2-success [class^='swal2-success-line'][class$='tip'] {
                  top: 2.875em;
                  left: .875em;
                  width: 1.5625em;
                  -webkit-transform: rotate(45deg);
                          transform: rotate(45deg); }
                .swal2-icon.swal2-success [class^='swal2-success-line'][class$='long'] {
                  top: 2.375em;
                  right: .5em;
                  width: 2.9375em;
                  -webkit-transform: rotate(-45deg);
                          transform: rotate(-45deg); }
          
          .swal2-progresssteps {
            align-items: center;
            margin: 0 0 1.25em;
            padding: 0;
            font-weight: 600; }
            .swal2-progresssteps li {
              display: inline-block;
              position: relative; }
            .swal2-progresssteps .swal2-progresscircle {
              width: 2em;
              height: 2em;
              border-radius: 2em;
              background: #3085d6;
              color: #fff;
              line-height: 2em;
              text-align: center;
              z-index: 20; }
              .swal2-progresssteps .swal2-progresscircle:first-child {
                margin-left: 0; }
              .swal2-progresssteps .swal2-progresscircle:last-child {
                margin-right: 0; }
              .swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep {
                background: #3085d6; }
                .swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep ~ .swal2-progresscircle {
                  background: #add8e6; }
                .swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep ~ .swal2-progressline {
                  background: #add8e6; }
            .swal2-progresssteps .swal2-progressline {
              width: 2.5em;
              height: .4em;
              margin: 0 -1px;
              background: #3085d6;
              z-index: 10; }
          
          [class^='swal2'] {
            -webkit-tap-highlight-color: transparent; }
          
          .swal2-show {
            -webkit-animation: swal2-show 0.3s;
                    animation: swal2-show 0.3s; }
            .swal2-show.swal2-noanimation {
              -webkit-animation: none;
                      animation: none; }
          
          .swal2-hide {
            -webkit-animation: swal2-hide 0.15s forwards;
                    animation: swal2-hide 0.15s forwards; }
            .swal2-hide.swal2-noanimation {
              -webkit-animation: none;
                      animation: none; }
          
          [dir='rtl'] .swal2-close {
            right: auto;
            left: 0; }
          
          .swal2-animate-success-icon .swal2-success-line-tip {
            -webkit-animation: swal2-animate-success-line-tip 0.75s;
                    animation: swal2-animate-success-line-tip 0.75s; }
          
          .swal2-animate-success-icon .swal2-success-line-long {
            -webkit-animation: swal2-animate-success-line-long 0.75s;
                    animation: swal2-animate-success-line-long 0.75s; }
          
          .swal2-animate-success-icon .swal2-success-circular-line-right {
            -webkit-animation: swal2-rotate-success-circular-line 4.25s ease-in;
                    animation: swal2-rotate-success-circular-line 4.25s ease-in; }
          
          .swal2-animate-error-icon {
            -webkit-animation: swal2-animate-error-icon 0.5s;
                    animation: swal2-animate-error-icon 0.5s; }
            .swal2-animate-error-icon .swal2-x-mark {
              -webkit-animation: swal2-animate-error-x-mark 0.5s;
                      animation: swal2-animate-error-x-mark 0.5s; }
          
          @-webkit-keyframes swal2-rotate-loading {
            0% {
              -webkit-transform: rotate(0deg);
                      transform: rotate(0deg); }
            100% {
              -webkit-transform: rotate(360deg);
                      transform: rotate(360deg); } }
          
          @keyframes swal2-rotate-loading {
            0% {
              -webkit-transform: rotate(0deg);
                      transform: rotate(0deg); }
            100% {
              -webkit-transform: rotate(360deg);
                      transform: rotate(360deg); } }



        @media (max-width: 991px) {
            .area-para-banner-filtros-avancados {
                display: none;
            }
        }
</style>`;
        

        let html = `<link href="` + (webparts ? '' : 'https://webparts.gestaoparts.com.br') + `/plugins/alertify/alertify.css" rel="stylesheet" />
<link href="` + (webparts ? '' : 'https://webparts.gestaoparts.com.br') + `/plugins/bootstrap4.0.0/dist/css/bootstrap.css" rel="stylesheet" />

`;
        
        if (contemFontAwesome) {
            if (webparts) {
                html += '<link href="/plugins/font-awesome/css/all.css" rel="stylesheet" />';
            } else {
                if (idUtilizador === 'EXTRACT') {
                    html += `<link href="https://webparts.gestaoparts.com.br/plugins/font-awesome/css/all.css" rel="stylesheet" />`;
                } else {
                    html += `<link href="https://developer.zezinhoautopecas.com.br/catalog/view/javascript/font-awesome/css/font-awesome.min.css" rel="stylesheet" />`;
                }
            }
        } else {
            html += `<link href="` + (webparts ? '/' : 'https://webparts.gestaoparts.com.br/') + `plugins/font-awesome/css/all.css" rel="stylesheet" />`;
        }
        


        html +=
`<link href='https://fonts.googleapis.com/css?family=Righteous' rel='stylesheet' type='text/css' />

<link rel="stylesheet" type="text/css" href="` + (webparts ? '' : 'https://webparts.gestaoparts.com.br') + `/plugins/jquery-ui/themes/base/jquery-ui.css" />

<link rel="stylesheet" type="text/css" href="` + (webparts ? '' : 'https://webparts.gestaoparts.com.br') + `/plugins/slick-1.8.0/slick.css" />
<link rel="stylesheet" type="text/css" href="` + (webparts ? '' : 'https://webparts.gestaoparts.com.br') + `/plugins/slick-1.8.0/slick-theme.css" />

<link rel="stylesheet" href="` + (webparts ? '' : 'https://webparts.gestaoparts.com.br') + `/plugins/fakeloader/fakeLoader.css" />
<script src="` + (webparts ? '/' : '') + `plugins/sweetalert/sweetalert2.all.js"></script>

<link href="` + (webparts ? '' : 'https://webparts.gestaoparts.com.br') + `/node_modules/material-components-web/dist/material-components-web.min.css" rel="stylesheet" />
<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet" />
<link href="` + (webparts ? '' : 'https://webparts.gestaoparts.com.br') + `/css/style_v2.css" rel="stylesheet" />  ` + 
    (webparts ? '<link href="/css/custom/' + combinacaoCores + '" type="text/css" rel="stylesheet">' :
            '<link href="https://webparts.gestaoparts.com.br/css/custom/' + combinacaoCoresfa + '.css" type="text/css" rel="stylesheet">') +
`<!--FIM HEAD PADRAO-->
<!--INICIO HEAD PRODUTOS-->
<!--FIM HEAD PRODUTOS-->` + 
cssSweetalert

        let botaoTipoVeiculoCarro = '';
        if (exfiaTipoVeiculos.indexOf('carros') >= 0) {
            botaoTipoVeiculoCarro = '                <button class="mdc-tab mdc-tab--stacked ' +
                (carrosAtivo ? 'mdc-tab--active' : '') + ' md-avtipo md-avtipocarro" role="tab" data-tipo="CARROS" aria-selected="' + (carrosAtivo ? 'true' : 'false') + '" tabindex="0">' +
                '                    <span class="mdc-tab__content">' +
                '                        <span class="mdc-tab__icon material-icons" aria-hidden="true">directions_car</span>' +
                '                        <span class="mdc-tab__text-label">Carro</span>' +
                '                    </span>' +
                '                    <span class="mdc-tab-indicator ' + (carrosAtivo ? 'mdc-tab-indicator--active' : '') + '">' +
                '                        <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>' +
                '                    </span>' +
                '                    <span class="mdc-tab__ripple"></span>' +
                '                </button>';
        }

        let botaoTipoVeiculoMoto = '';
        if (exfiaTipoVeiculos.indexOf('motos') >= 0) {
            botaoTipoVeiculoMoto = '                <button class="mdc-tab mdc-tab--stacked ' +
                (motosAtivo ? 'mdc-tab--active' : '') + ' md-avtipo md-avtipomoto" role="tab" data-tipo="MOTOS" aria-selected="' + (motosAtivo ? 'true' : 'false') + '" tabindex="0">' +
                '                    <span class="mdc-tab__content">' +
                '                        <span class="mdc-tab__icon material-icons" aria-hidden="true">motorcycle</span>' +
                '                        <span class="mdc-tab__text-label">Moto</span>' +
                '                    </span>' +
                '                    <span class="mdc-tab-indicator ' + (motosAtivo ? 'mdc-tab-indicator--active' : '') + '">' +
                '                        <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>' +
                '                    </span>' +
                '                    <span class="mdc-tab__ripple"></span>' +
                '                </button>';
        }

        let botaoTipoVeiculoCaminhao = '';
        if (exfiaTipoVeiculos.indexOf('caminhões') >= 0) {
            botaoTipoVeiculoCaminhao = '                <button class="mdc-tab mdc-tab--stacked ' +
                (caminhoesAtivo ? 'mdc-tab--active' : '') + ' md-avtipo md-avtipocaminhao" role="tab" data-tipo="CAMINHOES" aria-selected="' + (caminhoesAtivo ? 'true' : 'false') + '" tabindex="0">' +
                '                    <span class="mdc-tab__content">' +
                '                        <span class="mdc-tab__icon material-icons" aria-hidden="true">local_shipping</span>' +
                '                        <span class="mdc-tab__text-label">Caminhão</span>' +
                '                    </span>' +
                '                    <span class="mdc-tab-indicator ' + (caminhoesAtivo ? 'mdc-tab-indicator--active' : '') + '">' +
                '                        <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>' +
                '                    </span>' +
                '                    <span class="mdc-tab__ripple"></span>' +
                '                </button>';
        }

        let tabBarTipoVeiculo = '';
        if (exfiaTipoVeiculos.length > 1) {
            let styleSlim = "";
            if (slim) {
                styleSlim = ' style="display:none;"';
            }
            tabBarTipoVeiculo = '<div class="row mb-1">' +
                '           <div class="area-para-combo-tipoclassificacao col-xl-3" ' + styleSlim + '>' +

                '<div class="mdc-tab-bar mdss-tab-bar-tipoveiculo" role="tablist" data-mdc-auto-initnao="MDCTabBar">' +
                '    <div class="mdc-tab-scroller">' +
                '        <div class="mdc-tab-scroller__scroll-area">' +
                '            <div class="mdc-tab-scroller__scroll-content">' +
                '                <button class="mdc-tab mdc-tab--stacked ' +
                (todosAtivo ? 'mdc-tab--active' : '') + ' md-avtipo md-avtipotodos" role="tab" data-tipo="todos" aria-selected="' + (todosAtivo ? 'true' : 'false') + '" tabindex="0">' +
                '                    <span class="mdc-tab__content">' +
                '                        <span class="mdc-tab__icon material-icons" aria-hidden="true">done_all</span>' +
                '                        <span class="mdc-tab__text-label">Todos</span>' +
                '                    </span>' +
                '                    <span class="mdc-tab-indicator ' + (todosAtivo ? 'mdc-tab-indicator--active' : '') + '">' +
                '                        <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>' +
                '                    </span>' +
                '                    <span class="mdc-tab__ripple"></span>' +
                '                </button>' +
                botaoTipoVeiculoCarro +
                botaoTipoVeiculoMoto +
                botaoTipoVeiculoCaminhao +

                '            </div>' +
                '        </div>' +
                '    </div>' +
                '</div>' +

                '    </div>' +
                '</div>';
        }


        let htmlView = '<div class="row row-area-accordionfiltrosavancados ' + (slim ? 'slim' : '') + ' ' + (visualEstatico ? 'visualestatico' : '') +
            ' ' + (tudoUpperCase ? "tudo-uppercase" : "") +
            '" style="' + (ajusteWidthRowAreaAccordionfiltrosavancados !== null ? 'width: ' + ajusteWidthRowAreaAccordionfiltrosavancados + ';' : '') + '"><div class="col-md-12">' +
        '<div class="accordion accordionfiltrosavancados mb-1" id="accordionfiltrosavancados">' +
        '   <div class="card border-bottom-1">' +
            '       <div class="card-header card-header-aplicacao ' + (iniciarAberto ? '' : 'collapsed') + ' py-0 px-2" id="headerplanilha2" ' +
            '    data-toggle="collapse" data-target="#collapsefiltrosavancadosprodutos" aria-expanded="' + (iniciarAberto ? 'true' : 'false') + '" aria-controls="collapsefiltrosavancadosprodutos" ' +
            '    style="' + (visualEstatico ? 'display:none;': '') + '"' +
            '><div class="row">' +
            '           <div class="col-9"><h6 class="' + (slim ? 'mt-0' : 'mt-2') + '">Filtros Avançados</h6></div><div class="col-3 text-right"><span class="fa fa-angle-up icone-collapse"></span></div></div></div>' +
            '       <div id="collapsefiltrosavancadosprodutos" class="collapse-aplicacao collapse ' + (iniciarAberto ? 'show' : '') + '" ' + 
        'aria-labelledby="headerplanilha2" data-parent="#accordionfiltrosavancados" style=""><div class="card-body">' +


        '<div class="area-geral-filtros-avancados">' +
        '<div class="area-somente-filtros">' +
        '<div class="row">' +
        ' <div class="area-destinada-placa col-md-3 ' +
            (marginBottomCampos !== null ? '' : 'mb-1') + '" style="' +
            (marginBottomCampos !== null ? 'margin-bottom: ' + marginBottomCampos + 'px;' : '') +'"><div class="row">' +
        '           <div class="area-para-campo-placa col-md-12">' +
            '<div class="mdc-text-field mdss-text-field--fullwidth mdc-text-field--fullwidth md-campo-av-placa ' + (slim ? 'mb-0' : 'mb-3') +
            '" style="' + (heightCampos !== null ? 'height: ' + heightCampos + 'px;' : '') + '">' +
        '    <input class="mdc-text-field__input" id="txt-av-placa" ' +
            (fontSize !== null && fontSize > 8 ? 'style="font-size: ' + fontSize + 'px;"' : '') + '>' +
        '        <div class="mdc-line-ripple"></div>' +
        '        <label for="txt-av-placa" class="mdc-floating-label" ' +
            (fontSize !== null && fontSize > 8 ? 'style="font-size: ' + fontSize + 'px;line-height: ' + fontSize + 'px;"' : '') + '>Placa/Chassi</label>' +
        '</div>' +
        '           </div>' +
        
        '<div class="botao-auxiliar-pesqplaca" data-toggle="tooltip" data-placement="right" data-html="true" title="Selecionar Veículos" ' +
        '><span class="pulsating-circle"><span class="fa fa-car"></span></span></div>' +
        ' </div></div>' +


        '           <div class="area-para-label-result-placa col-md-6">' +
        '        <label class="label-selectplaca" ' +
            (fontSize !== null && fontSize > 8 ? 'style="font-size: ' + fontSize + 'px;' +
                (heightCampos !== null ? 'line-height: ' + heightCampos + 'px;' : '') + '"' : '') + '></label>' +
        '           </div>' +
        '</div>' +


        tabBarTipoVeiculo + 

            '<div class="row ' + (slim ? '' : 'mb-3') + '">' +
            '           <div class="area-para-campo-autocomplete col-md-3 ' +
            (marginBottomCampos !== null ? '' : 'mb-1') + '" style="' +
            (marginBottomCampos !== null ? 'margin-bottom: ' + marginBottomCampos + 'px;' : '') +'">' +
        '<div class="mdc-text-field mdss-text-field--fullwidth mdc-text-field--fullwidth md-campo-av-montadora"' +
            ' style="' + (heightCampos !== null ? 'height: ' + heightCampos + 'px;' : '') + '">' +
        '    <input class="mdc-text-field__input" id="txt-av-montadora" ' +
            (fontSize !== null && fontSize > 8 ? 'style="font-size: ' + fontSize + 'px;"' : '') + '>' +
        '        <div class="mdc-line-ripple"></div>' +
        '        <label for="txt-av-montadora" class="mdc-floating-label" ' +
            (fontSize !== null && fontSize > 8 ? 'style="font-size: ' + fontSize + 'px;line-height: ' + fontSize + 'px;"' : '') + '>Montadora</label>' +
        '</div>' +
        '           </div>' +

        '           <div class="area-para-campo-autocomplete col-md-3 ' +
            (marginBottomCampos !== null ? '' : 'mb-1') + '" style="' +
            (marginBottomCampos !== null ? 'margin-bottom: ' + marginBottomCampos + 'px;' : '') +'">' +
        '<div class="mdc-text-field mdss-text-field--fullwidth mdc-text-field--fullwidth md-campo-av-modelo"' +
            ' style="' + (heightCampos !== null ? 'height: ' + heightCampos + 'px;' : '') + '">' +
        '    <input class="mdc-text-field__input" id="txt-av-modelo" ' +
            (fontSize !== null && fontSize > 8 ? 'style="font-size: ' + fontSize + 'px;"' : '') + '>' +
        '        <div class="mdc-line-ripple"></div>' +
        '        <label for="txt-av-modelo" class="mdc-floating-label" ' +
            (fontSize !== null && fontSize > 8 ? 'style="font-size: ' + fontSize + 'px;line-height: ' + fontSize + 'px;"' : '') + '>Modelo</label>' +
        '</div>' +
        '           </div>' +


        '           <div class="area-para-campo-autocomplete col-md-3 ' +
            (marginBottomCampos !== null ? '' : 'mb-1') + '" style="' +
            (marginBottomCampos !== null ? 'margin-bottom: ' + marginBottomCampos + 'px;' : '') +'">' +
        '<div class="mdc-text-field mdss-text-field--fullwidth mdc-text-field--fullwidth md-campo-av-ano"' +
            ' style="' + (heightCampos !== null ? 'height: ' + heightCampos + 'px;' : '') + '">' +
        '    <input class="mdc-text-field__input" id="txt-av-ano" ' +
            (fontSize !== null && fontSize > 8 ? 'style="font-size: ' + fontSize + 'px;"' : '') + '>' +
        '        <div class="mdc-line-ripple"></div>' +
        '        <label for="txt-av-ano" class="mdc-floating-label" ' +
            (fontSize !== null && fontSize > 8 ? 'style="font-size: ' + fontSize + 'px;line-height: ' + fontSize + 'px;"' : '') + '>Anos</label>' +
        '</div>' +
        '           </div>' +


        (exfiaCombustivel ? 
        '           <div class="area-para-campo-autocomplete col-md-3 ' +
            (marginBottomCampos !== null ? '' : 'mb-1') + '" style="' +
            (marginBottomCampos !== null ? 'margin-bottom: ' + marginBottomCampos + 'px;' : '') +'">' +
        '<div class="mdc-text-field mdss-text-field--fullwidth mdc-text-field--fullwidth md-campo-av-combustivel"' +
            ' style="' + (heightCampos !== null ? 'height: ' + heightCampos + 'px;' : '') + '">' +
        '    <input class="mdc-text-field__input" id="txt-av-combustivel" ' +
            (fontSize !== null && fontSize > 8 ? 'style="font-size: ' + fontSize + 'px;"' : '') + '>' +
        '        <div class="mdc-line-ripple"></div>' +
        '        <label for="txt-av-combustivel" class="mdc-floating-label" ' +
            (fontSize !== null && fontSize > 8 ? 'style="font-size: ' + fontSize + 'px;line-height: ' + fontSize + 'px;"' : '') + '>Combustível</label>' +
        '</div>' +
        '           </div>' : '') +


        (exfiaMotorizacao ? 
        '           <div class="area-para-campo-autocomplete col-md-3 ' +
            (marginBottomCampos !== null ? '' : 'mb-1') + '" style="' +
            (marginBottomCampos !== null ? 'margin-bottom: ' + marginBottomCampos + 'px;' : '') +'">' +
        '<div class="mdc-text-field mdss-text-field--fullwidth mdc-text-field--fullwidth md-campo-av-motorizacao"' +
            ' style="' + (heightCampos !== null ? 'height: ' + heightCampos + 'px;' : '') + '">' +
        '    <input class="mdc-text-field__input" id="txt-av-motorizacao" ' +
            (fontSize !== null && fontSize > 8 ? 'style="font-size: ' + fontSize + 'px;"' : '') + '>' +
        '        <div class="mdc-line-ripple"></div>' +
        '        <label for="txt-av-motorizacao" class="mdc-floating-label" ' +
            (fontSize !== null && fontSize > 8 ? 'style="font-size: ' + fontSize + 'px;line-height: ' + fontSize + 'px;"' : '') + '>Motorização</label>' +
        '</div>' +
        '           </div>' : '') +


        (exfiaTracao ?
        '           <div class="area-para-campo-autocomplete col-md-3 ' +
            (marginBottomCampos !== null ? '' : 'mb-1') + '" style="' +
            (marginBottomCampos !== null ? 'margin-bottom: ' + marginBottomCampos + 'px;' : '') +'">' +
        '<div class="mdc-text-field mdss-text-field--fullwidth mdc-text-field--fullwidth md-campo-av-tracao"' +
            ' style="' + (heightCampos !== null ? 'height: ' + heightCampos + 'px;' : '') + '">' +
        '    <input class="mdc-text-field__input" id="txt-av-tracao" ' +
            (fontSize !== null && fontSize > 8 ? 'style="font-size: ' + fontSize + 'px;"' : '') + '>' +
        '        <div class="mdc-line-ripple"></div>' +
        '        <label for="txt-av-tracao" class="mdc-floating-label" ' +
            (fontSize !== null && fontSize > 8 ? 'style="font-size: ' + fontSize + 'px;line-height: ' + fontSize + 'px;"' : '') + '>Tração</label>' +
        '</div>' +
        '           </div>' : '') +



        '           <div class="area-para-campo-autocomplete col-md-3 ' +
            (marginBottomCampos !== null ? '' : 'mb-1') + '" style="' +
            (marginBottomCampos !== null ? 'margin-bottom: ' + marginBottomCampos + 'px;' : '') +'">' +
        '<div class="mdc-text-field mdss-text-field--fullwidth mdc-text-field--fullwidth md-campo-av-versao"' +
            ' style="' + (heightCampos !== null ? 'height: ' + heightCampos + 'px;' : '') + '">' +
        '    <input class="mdc-text-field__input" id="txt-av-versao" ' +
            (fontSize !== null && fontSize > 8 ? 'style="font-size: ' + fontSize + 'px;"' : '') + '>' +
        '        <div class="mdc-line-ripple"></div>' +
        '        <label for="txt-av-versao" class="mdc-floating-label" ' +
            (fontSize !== null && fontSize > 8 ? 'style="font-size: ' + fontSize + 'px;line-height: ' + fontSize + 'px;"' : '') + '>Versão</label>' +
        '</div>' +
        '           </div>' +




        (exfiaSecao ?
        '           <div class="area-para-campo-autocomplete col-md-3 ' +
            (marginBottomCampos !== null ? '' : 'mb-1') + '" style="' +
            (marginBottomCampos !== null ? 'margin-bottom: ' + marginBottomCampos + 'px;' : '') +'">' +
        '<div class="mdc-text-field mdss-text-field--fullwidth mdc-text-field--fullwidth md-campo-av-secao"' +
            ' style="' + (heightCampos !== null ? 'height: ' + heightCampos + 'px;' : '') + '">' +
        '    <input class="mdc-text-field__input" id="txt-av-secao" ' +
            (fontSize !== null && fontSize > 8 ? 'style="font-size: ' + fontSize + 'px;"' : '') + '>' +
        '        <div class="mdc-line-ripple"></div>' +
        '        <label for="txt-av-secao" class="mdc-floating-label" ' +
            (fontSize !== null && fontSize > 8 ? 'style="font-size: ' + fontSize + 'px;line-height: ' + fontSize + 'px;"' : '') + '>Seção</label>' +
        '</div>' +
        '<div class="area-loading-autocomplete area-loading-autocomplete-secao" style="display:none;">' +
        '<span class="fa fa-spinner fa-spin"></span></div>' + 
        '           </div>' : '') +





        (exfiaGrupo ?
        '           <div class="area-para-campo-autocomplete col-md-3 ' +
            (marginBottomCampos !== null ? '' : 'mb-1') + '" style="' +
            (marginBottomCampos !== null ? 'margin-bottom: ' + marginBottomCampos + 'px;' : '') +'">' +
        '<div class="mdc-text-field mdss-text-field--fullwidth mdc-text-field--fullwidth md-campo-av-grupo"' +
            ' style="' + (heightCampos !== null ? 'height: ' + heightCampos + 'px;' : '') + '">' +
        '    <input class="mdc-text-field__input" id="txt-av-grupo" ' +
            (fontSize !== null && fontSize > 8 ? 'style="font-size: ' + fontSize + 'px;"' : '') + '>' +
        '        <div class="mdc-line-ripple"></div>' +
        '        <label for="txt-av-grupo" class="mdc-floating-label" ' +
            (fontSize !== null && fontSize > 8 ? 'style="font-size: ' + fontSize + 'px;line-height: ' + fontSize + 'px;"' : '') + '>Grupo</label>' +
        '</div>' +
        '<div class="area-loading-autocomplete area-loading-autocomplete-grupo" style="display:none;">' +
            '<span class="fa fa-spinner fa-spin"></span></div>' + 
        '           </div>' : '') +

        (slim && exfiaDescricao ?
                '<div class="area-para-campo-peca col-md-3 ' +
            (marginBottomCampos !== null ? '' : 'mb-1') + '" style="' +
            (marginBottomCampos !== null ? 'margin-bottom: ' + marginBottomCampos + 'px;' : '') +'"> ' +
        '<div class="mdc-text-field mdss-text-field--fullwidth mdc-text-field--fullwidth md-campo-av-peca"' +
            ' style="' + (heightCampos !== null ? 'height: ' + heightCampos + 'px;' : '') + '">' +
            '    <input class="mdc-text-field__input" id="txt-av-peca" ' +
            (fontSize !== null && fontSize > 8 ? 'style="font-size: ' + fontSize + 'px;"' : '') + '>' +
            '        <div class="mdc-line-ripple"></div>' +
            '        <label for="txt-av-peca" class="mdc-floating-label" ' +
            (fontSize !== null && fontSize > 8 ? 'style="font-size: ' + fontSize + 'px;line-height: ' + fontSize + 'px;"' : '') + '>Produto - Coxim, Amortecedor, Bandeja</label>' +
            '</div>' +
            '           </div>' : '') +


        (slim ?
            '           <div class="col text-right">' +
            '               <button class="mdc-button mdc-button--raised md-botao-avaplicar"' +
            ' style="' + (heightCampos !== null ? 'height: ' + heightCampos + 'px;' : '') + '">' +
            '                   <div class="mdc-button__ripple"></div>' +
            '                   <span class="mdc-button__label" ' +
            (fontSize !== null && fontSize > 8 ? 'style="font-size: ' + fontSize + 'px;"' : '') + '>Aplicar</span>' +
            '               </button>' +
            '               <button class="mdc-button md-botao-avlimpar"' +
            ' style="' + (heightCampos !== null ? 'height: ' + heightCampos + 'px;' : '') + '">' +
            '                   <div class="mdc-button__ripple"></div>' +
            '                   <span class="mdc-button__label" ' +
            (fontSize !== null && fontSize > 8 ? 'style="font-size: ' + fontSize + 'px;"' : '') + '>Limpar</span>' +
            '               </button>' + '</div>' : '') +








        '</div>' +


        (!slim && exfiaDescricao ?
        '<div class="row">' +
        '           <div class="area-para-campo-peca col-md-3">' +
        '<div class="mdc-text-field mdss-text-field--fullwidth mdc-text-field--fullwidth md-campo-av-peca"' +
            ' style="' + (heightCampos !== null ? 'height: ' + heightCampos + 'px;' : '') + '">' +
        '    <input class="mdc-text-field__input" id="txt-av-peca" ' +
            (fontSize !== null && fontSize > 8 ? 'style="font-size: ' + fontSize + 'px;"' : '') + '>' +
        '        <div class="mdc-line-ripple"></div>' +
        '        <label for="txt-av-peca" class="mdc-floating-label" ' +
            (fontSize !== null && fontSize > 8 ? 'style="font-size: ' + fontSize + 'px;line-height: ' + fontSize + 'px;"' : '') + '>Produto - Coxim, Amortecedor, Bandeja</label>' +
        '</div>' +
        '           </div>' +
        '</div>' : '') +


        (!slim ?
        '<div class="row mt-3">' +
        '           <div class="col-md-12 text-right">' +
        '               <button class="mdc-button mdc-button--raised md-botao-avaplicar"' +
            ' style="' + (heightCampos !== null ? 'height: ' + heightCampos + 'px;' : '') + '">' +
        '                   <div class="mdc-button__ripple"></div>' +
        '                   <span class="mdc-button__label" ' +
            (fontSize !== null && fontSize > 8 ? 'style="font-size: ' + fontSize + 'px;"' : '') + '>Aplicar</span>' +
        '               </button>' +
        '               <button class="mdc-button md-botao-avlimpar"' +
            ' style="' + (heightCampos !== null ? 'height: ' + heightCampos + 'px;' : '') + '">' +
        '                   <div class="mdc-button__ripple"></div>' +
        '                   <span class="mdc-button__label" ' +
            (fontSize !== null && fontSize > 8 ? 'style="font-size: ' + fontSize + 'px;"' : '') + '>Limpar</span>' +
        '               </button>' + '</div>' +
        '</div>' : '') +


        '</div>' +//fecha somente filtros
        '<div class="area-para-banner-filtros-avancados">' +
        '</div>' +
        '       </div>' +//fecha area geral
        '   </div>' +
        '</div>' +
        '</div></div></div>'

        //divMaster.innerHTML = html + '<div class="containermaster"></div>'// + htmlView
        divMaster.innerHTML = html + '<div class="containermaster">'+ htmlView + '</div>' 
        window.gpDivMaster = divMaster

        var thisShadow = this;
        function jqueryPreparado(){
            if (window.innerWidth < 1400) {
                $('.md-avtipotodos').hide();
            } else {
                $('.md-avtipotodos').show();
            }

            
            var script = thisShadow.criarScriptTag((webparts ? '' : 'https://webparts.gestaoparts.com.br') + '/plugins/popper/popper.js', popperJsPreparado)
            divMaster.appendChild( script )
        }

        function bootstrapjsPreparado(){
            var script = thisShadow.criarScriptTag((webparts ? '' : 'https://webparts.gestaoparts.com.br') + '/plugins/alertify/alertify.js', alertifyPreparado)
            divMaster.appendChild( script )
        }
        
        function alertifyPreparado(){
            alertify.parent(gpDivMaster);
            alertify.logPosition("bottom right");
            
            if (typeof $.ui === 'undefined') {
                var script = thisShadow.criarScriptTag((webparts ? '' : 'https://webparts.gestaoparts.com.br') + '/plugins/jquery-ui/jquery-ui.js', jqueryUiPreparado)
                divMaster.appendChild(script)
            } else {
                jqueryUiPreparado();
            }
        }


        function jqueryUiPreparado() {
            jQuery.fn.extend({

                // offset() relates an element's border box to the document origin
                offset: function (options) {

                    // Preserve chaining for setter
                    if (arguments.length) {
                        return options === undefined ?
                            this :
                            this.each(function (i) {
                                jQuery.offset.setOffset(this, options, i);
                            });
                    }

                    var rect, win,
                        elem = this[0];

                    if (!elem) {
                        return;
                    }

                    // Return zeros for disconnected and hidden (display: none) elements (gh-2310)
                    // Support: IE <=11 only
                    // Running getBoundingClientRect on a
                    // disconnected node in IE throws an error
                    if (!elem.getClientRects().length) {
                        return { top: 0, left: 0 };
                    }

                    // Get document-relative position by adding viewport scroll to viewport-relative gBCR
                    rect = elem.getBoundingClientRect();
                    win = elem.ownerDocument.defaultView;
                    return {
                        top: rect.top + win.pageYOffset,
                        left: rect.left + win.pageXOffset
                    };
                },

                // position() relates an element's margin box to its offset parent's padding box
                // This corresponds to the behavior of CSS absolute positioning
                position: function () {
                    if (!this[0]) {
                        return;
                    }

                    var offsetParent, offset, doc,
                        elem = this[0],
                        parentOffset = { top: 0, left: 0 };

                    // position:fixed elements are offset from the viewport, which itself always has zero offset
                    if (jQuery.css(elem, "position") === "fixed") {

                        // Assume position:fixed implies availability of getBoundingClientRect
                        offset = elem.getBoundingClientRect();

                    } else {
                        offset = this.offset();

                        // Account for the *real* offset parent, which can be the document or its root element
                        // when a statically positioned element is identified
                        doc = elem.ownerDocument;
                        offsetParent = elem.offsetParent || doc.documentElement;
                        while (offsetParent &&
                            (offsetParent === doc.body || offsetParent === doc.documentElement) &&
                            jQuery.css(offsetParent, "position") === "static") {

                            offsetParent = offsetParent.parentNode;
                        }
                        if (offsetParent && offsetParent !== elem && offsetParent.nodeType === 1) {

                            // Incorporate borders into its offset, since they are outside its content origin
                            parentOffset = jQuery(offsetParent).offset();
                            parentOffset.top += jQuery.css(offsetParent, "borderTopWidth", true);
                            parentOffset.left += jQuery.css(offsetParent, "borderLeftWidth", true);
                        }
                    }

                    // Subtract parent offsets and element margins
                    return {
                        top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
                        left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
                    };
                },

                // This method will return documentElement in the following cases:
                // 1) For the element inside the iframe without offsetParent, this method will return
                //    documentElement of the parent window
                // 2) For the hidden or detached element
                // 3) For body or html element, i.e. in case of the html node - it will return itself
                //
                // but those exceptions were never presented as a real life use-cases
                // and might be considered as more preferable results.
                //
                // This logic, however, is not guaranteed and can change at any point in the future
                offsetParent: function () {
                    return this.map(function () {
                        var offsetParent = this.offsetParent;

                        while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
                            offsetParent = offsetParent.offsetParent;
                        }

                        return offsetParent || documentElement;
                    });
                }
            });























            /*!
 * jQuery UI Position 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/position/
 */

            //>>label: Position
            //>>group: Core
            //>>description: Positions elements relative to other elements.
            //>>docs: http://api.jqueryui.com/position/
            //>>demos: http://jqueryui.com/position/


            (function () {
                var cachedScrollbarWidth,
                    max = Math.max,
                    abs = Math.abs,
                    rhorizontal = /left|center|right/,
                    rvertical = /top|center|bottom/,
                    roffset = /[\+\-]\d+(\.[\d]+)?%?/,
                    rposition = /^\w+/,
                    rpercent = /%$/,
                    _position = $.fn.position;

                function getOffsets(offsets, width, height) {
                    return [
                        parseFloat(offsets[0]) * (rpercent.test(offsets[0]) ? width / 100 : 1),
                        parseFloat(offsets[1]) * (rpercent.test(offsets[1]) ? height / 100 : 1)
                    ];
                }

                function parseCss(element, property) {
                    return parseInt($.css(element, property), 10) || 0;
                }

                function getDimensions(elem) {
                    var raw = elem[0];
                    if (raw.nodeType === 9) {
                        return {
                            width: elem.width(),
                            height: elem.height(),
                            offset: { top: 0, left: 0 }
                        };
                    }
                    if ($.isWindow(raw)) {
                        return {
                            width: elem.width(),
                            height: elem.height(),
                            offset: { top: elem.scrollTop(), left: elem.scrollLeft() }
                        };
                    }
                    if (raw.preventDefault) {
                        return {
                            width: 0,
                            height: 0,
                            offset: { top: raw.pageY, left: raw.pageX }
                        };
                    }
                    return {
                        width: elem.outerWidth(),
                        height: elem.outerHeight(),
                        offset: elem.offset()
                    };
                }

                $.position = {
                    scrollbarWidth: function () {
                        if (cachedScrollbarWidth !== undefined) {
                            return cachedScrollbarWidth;
                        }
                        var w1, w2,
                            div = $("<div " +
                                "style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'>" +
                                "<div style='height:100px;width:auto;'></div></div>"),
                            innerDiv = div.children()[0];

                        $("body").append(div);
                        w1 = innerDiv.offsetWidth;
                        div.css("overflow", "scroll");

                        w2 = innerDiv.offsetWidth;

                        if (w1 === w2) {
                            w2 = div[0].clientWidth;
                        }

                        div.remove();

                        return (cachedScrollbarWidth = w1 - w2);
                    },
                    getScrollInfo: function (within) {
                        var overflowX = within.isWindow || within.isDocument ? "" :
                            within.element.css("overflow-x"),
                            overflowY = within.isWindow || within.isDocument ? "" :
                                within.element.css("overflow-y"),
                            hasOverflowX = overflowX === "scroll" ||
                                (overflowX === "auto" && within.width < within.element[0].scrollWidth),
                            hasOverflowY = overflowY === "scroll" ||
                                (overflowY === "auto" && within.height < within.element[0].scrollHeight);
                        return {
                            width: hasOverflowY ? $.position.scrollbarWidth() : 0,
                            height: hasOverflowX ? $.position.scrollbarWidth() : 0
                        };
                    },
                    getWithinInfo: function (element) {
                        var withinElement = $(element || window),
                            isWindow = $.isWindow(withinElement[0]),
                            isDocument = !!withinElement[0] && withinElement[0].nodeType === 9,
                            hasOffset = !isWindow && !isDocument;
                        return {
                            element: withinElement,
                            isWindow: isWindow,
                            isDocument: isDocument,
                            offset: hasOffset ? $(element).offset() : { left: 0, top: 0 },
                            scrollLeft: withinElement.scrollLeft(),
                            scrollTop: withinElement.scrollTop(),
                            width: withinElement.outerWidth(),
                            height: withinElement.outerHeight()
                        };
                    }
                };

                $.fn.position = function (options) {
                    if (!options || !options.of) {
                        return _position.apply(this, arguments);
                    }

                    // Make a copy, we don't want to modify arguments
                    options = $.extend({}, options);

                    var atOffset, targetWidth, targetHeight, targetOffset, basePosition, dimensions,
                        target = $(options.of),
                        within = $.position.getWithinInfo(options.within),
                        scrollInfo = $.position.getScrollInfo(within),
                        collision = (options.collision || "flip").split(" "),
                        offsets = {};

                    dimensions = getDimensions(target);
                    if (target[0].preventDefault) {

                        // Force left top to allow flipping
                        options.at = "left top";
                    }
                    targetWidth = dimensions.width;
                    targetHeight = dimensions.height;
                    targetOffset = dimensions.offset;

                    // Clone to reuse original targetOffset later
                    basePosition = $.extend({}, targetOffset);

                    // Force my and at to have valid horizontal and vertical positions
                    // if a value is missing or invalid, it will be converted to center
                    $.each(["my", "at"], function () {
                        var pos = (options[this] || "").split(" "),
                            horizontalOffset,
                            verticalOffset;

                        if (pos.length === 1) {
                            pos = rhorizontal.test(pos[0]) ?
                                pos.concat(["center"]) :
                                rvertical.test(pos[0]) ?
                                    ["center"].concat(pos) :
                                    ["center", "center"];
                        }
                        pos[0] = rhorizontal.test(pos[0]) ? pos[0] : "center";
                        pos[1] = rvertical.test(pos[1]) ? pos[1] : "center";

                        // Calculate offsets
                        horizontalOffset = roffset.exec(pos[0]);
                        verticalOffset = roffset.exec(pos[1]);
                        offsets[this] = [
                            horizontalOffset ? horizontalOffset[0] : 0,
                            verticalOffset ? verticalOffset[0] : 0
                        ];

                        // Reduce to just the positions without the offsets
                        options[this] = [
                            rposition.exec(pos[0])[0],
                            rposition.exec(pos[1])[0]
                        ];
                    });

                    // Normalize collision option
                    if (collision.length === 1) {
                        collision[1] = collision[0];
                    }

                    if (options.at[0] === "right") {
                        basePosition.left += targetWidth;
                    } else if (options.at[0] === "center") {
                        basePosition.left += targetWidth / 2;
                    }

                    if (options.at[1] === "bottom") {
                        basePosition.top += targetHeight;
                    } else if (options.at[1] === "center") {
                        basePosition.top += targetHeight / 2;
                    }

                    atOffset = getOffsets(offsets.at, targetWidth, targetHeight);
                    basePosition.left += atOffset[0];
                    basePosition.top += atOffset[1];

                    return this.each(function () {
                        var collisionPosition, using,
                            elem = $(this),
                            elemWidth = elem.outerWidth(),
                            elemHeight = elem.outerHeight(),
                            marginLeft = parseCss(this, "marginLeft"),
                            marginTop = parseCss(this, "marginTop"),
                            collisionWidth = elemWidth + marginLeft + parseCss(this, "marginRight") +
                                scrollInfo.width,
                            collisionHeight = elemHeight + marginTop + parseCss(this, "marginBottom") +
                                scrollInfo.height,
                            position = $.extend({}, basePosition),
                            myOffset = getOffsets(offsets.my, elem.outerWidth(), elem.outerHeight());

                        if (options.my[0] === "right") {
                            position.left -= elemWidth;
                        } else if (options.my[0] === "center") {
                            position.left -= elemWidth / 2;
                        }

                        if (options.my[1] === "bottom") {
                            position.top -= elemHeight;
                        } else if (options.my[1] === "center") {
                            position.top -= elemHeight / 2;
                        }

                        position.left += myOffset[0];
                        position.top += myOffset[1];

                        collisionPosition = {
                            marginLeft: marginLeft,
                            marginTop: marginTop
                        };

                        $.each(["left", "top"], function (i, dir) {
                            if ($.ui.position[collision[i]]) {
                                $.ui.position[collision[i]][dir](position, {
                                    targetWidth: targetWidth,
                                    targetHeight: targetHeight,
                                    elemWidth: elemWidth,
                                    elemHeight: elemHeight,
                                    collisionPosition: collisionPosition,
                                    collisionWidth: collisionWidth,
                                    collisionHeight: collisionHeight,
                                    offset: [atOffset[0] + myOffset[0], atOffset[1] + myOffset[1]],
                                    my: options.my,
                                    at: options.at,
                                    within: within,
                                    elem: elem
                                });
                            }
                        });

                        if (options.using) {

                            // Adds feedback as second argument to using callback, if present
                            using = function (props) {
                                var left = targetOffset.left - position.left,
                                    right = left + targetWidth - elemWidth,
                                    top = targetOffset.top - position.top,
                                    bottom = top + targetHeight - elemHeight,
                                    feedback = {
                                        target: {
                                            element: target,
                                            left: targetOffset.left,
                                            top: targetOffset.top,
                                            width: targetWidth,
                                            height: targetHeight
                                        },
                                        element: {
                                            element: elem,
                                            left: position.left,
                                            top: position.top,
                                            width: elemWidth,
                                            height: elemHeight
                                        },
                                        horizontal: right < 0 ? "left" : left > 0 ? "right" : "center",
                                        vertical: bottom < 0 ? "top" : top > 0 ? "bottom" : "middle"
                                    };
                                if (targetWidth < elemWidth && abs(left + right) < targetWidth) {
                                    feedback.horizontal = "center";
                                }
                                if (targetHeight < elemHeight && abs(top + bottom) < targetHeight) {
                                    feedback.vertical = "middle";
                                }
                                if (max(abs(left), abs(right)) > max(abs(top), abs(bottom))) {
                                    feedback.important = "horizontal";
                                } else {
                                    feedback.important = "vertical";
                                }
                                options.using.call(this, props, feedback);
                            };
                        }

                        elem.offset($.extend(position, { using: using }));
                    });
                };

                $.ui.position = {
                    fit: {
                        left: function (position, data) {
                            var within = data.within,
                                withinOffset = within.isWindow ? within.scrollLeft : within.offset.left,
                                outerWidth = within.width,
                                collisionPosLeft = position.left - data.collisionPosition.marginLeft,
                                overLeft = withinOffset - collisionPosLeft,
                                overRight = collisionPosLeft + data.collisionWidth - outerWidth - withinOffset,
                                newOverRight;

                            // Element is wider than within
                            if (data.collisionWidth > outerWidth) {

                                // Element is initially over the left side of within
                                if (overLeft > 0 && overRight <= 0) {
                                    newOverRight = position.left + overLeft + data.collisionWidth - outerWidth -
                                        withinOffset;
                                    position.left += overLeft - newOverRight;

                                    // Element is initially over right side of within
                                } else if (overRight > 0 && overLeft <= 0) {
                                    position.left = withinOffset;

                                    // Element is initially over both left and right sides of within
                                } else {
                                    if (overLeft > overRight) {
                                        position.left = withinOffset + outerWidth - data.collisionWidth;
                                    } else {
                                        position.left = withinOffset;
                                    }
                                }

                                // Too far left -> align with left edge
                            } else if (overLeft > 0) {
                                position.left += overLeft;

                                // Too far right -> align with right edge
                            } else if (overRight > 0) {
                                position.left -= overRight;

                                // Adjust based on position and margin
                            } else {
                                position.left = max(position.left - collisionPosLeft, position.left);
                            }
                        },
                        top: function (position, data) {
                            var within = data.within,
                                withinOffset = within.isWindow ? within.scrollTop : within.offset.top,
                                outerHeight = data.within.height,
                                collisionPosTop = position.top - data.collisionPosition.marginTop,
                                overTop = withinOffset - collisionPosTop,
                                overBottom = collisionPosTop + data.collisionHeight - outerHeight - withinOffset,
                                newOverBottom;

                            // Element is taller than within
                            if (data.collisionHeight > outerHeight) {

                                // Element is initially over the top of within
                                if (overTop > 0 && overBottom <= 0) {
                                    newOverBottom = position.top + overTop + data.collisionHeight - outerHeight -
                                        withinOffset;
                                    position.top += overTop - newOverBottom;

                                    // Element is initially over bottom of within
                                } else if (overBottom > 0 && overTop <= 0) {
                                    position.top = withinOffset;

                                    // Element is initially over both top and bottom of within
                                } else {
                                    if (overTop > overBottom) {
                                        position.top = withinOffset + outerHeight - data.collisionHeight;
                                    } else {
                                        position.top = withinOffset;
                                    }
                                }

                                // Too far up -> align with top
                            } else if (overTop > 0) {
                                position.top += overTop;

                                // Too far down -> align with bottom edge
                            } else if (overBottom > 0) {
                                position.top -= overBottom;

                                // Adjust based on position and margin
                            } else {
                                position.top = max(position.top - collisionPosTop, position.top);
                            }
                        }
                    },
                    flip: {
                        left: function (position, data) {
                            var within = data.within,
                                withinOffset = within.offset.left + within.scrollLeft,
                                outerWidth = within.width,
                                offsetLeft = within.isWindow ? within.scrollLeft : within.offset.left,
                                collisionPosLeft = position.left - data.collisionPosition.marginLeft,
                                overLeft = collisionPosLeft - offsetLeft,
                                overRight = collisionPosLeft + data.collisionWidth - outerWidth - offsetLeft,
                                myOffset = data.my[0] === "left" ?
                                    -data.elemWidth :
                                    data.my[0] === "right" ?
                                        data.elemWidth :
                                        0,
                                atOffset = data.at[0] === "left" ?
                                    data.targetWidth :
                                    data.at[0] === "right" ?
                                        -data.targetWidth :
                                        0,
                                offset = -2 * data.offset[0],
                                newOverRight,
                                newOverLeft;

                            if (overLeft < 0) {
                                newOverRight = position.left + myOffset + atOffset + offset + data.collisionWidth -
                                    outerWidth - withinOffset;
                                if (newOverRight < 0 || newOverRight < abs(overLeft)) {
                                    position.left += myOffset + atOffset + offset;
                                }
                            } else if (overRight > 0) {
                                newOverLeft = position.left - data.collisionPosition.marginLeft + myOffset +
                                    atOffset + offset - offsetLeft;
                                if (newOverLeft > 0 || abs(newOverLeft) < overRight) {
                                    position.left += myOffset + atOffset + offset;
                                }
                            }
                        },
                        top: function (position, data) {
                            var within = data.within,
                                withinOffset = within.offset.top + within.scrollTop,
                                outerHeight = within.height,
                                offsetTop = within.isWindow ? within.scrollTop : within.offset.top,
                                collisionPosTop = position.top - data.collisionPosition.marginTop,
                                overTop = collisionPosTop - offsetTop,
                                overBottom = collisionPosTop + data.collisionHeight - outerHeight - offsetTop,
                                top = data.my[1] === "top",
                                myOffset = top ?
                                    -data.elemHeight :
                                    data.my[1] === "bottom" ?
                                        data.elemHeight :
                                        0,
                                atOffset = data.at[1] === "top" ?
                                    data.targetHeight :
                                    data.at[1] === "bottom" ?
                                        -data.targetHeight :
                                        0,
                                offset = -2 * data.offset[1],
                                newOverTop,
                                newOverBottom;
                            if (overTop < 0) {
                                newOverBottom = position.top + myOffset + atOffset + offset + data.collisionHeight -
                                    outerHeight - withinOffset;
                                if (newOverBottom < 0 || newOverBottom < abs(overTop)) {
                                    position.top += myOffset + atOffset + offset;
                                }
                            } else if (overBottom > 0) {
                                newOverTop = position.top - data.collisionPosition.marginTop + myOffset + atOffset +
                                    offset - offsetTop;
                                if (newOverTop > 0 || abs(newOverTop) < overBottom) {
                                    position.top += myOffset + atOffset + offset;
                                }
                            }
                        }
                    },
                    flipfit: {
                        left: function () {
                            $.ui.position.flip.left.apply(this, arguments);
                            $.ui.position.fit.left.apply(this, arguments);
                        },
                        top: function () {
                            $.ui.position.flip.top.apply(this, arguments);
                            $.ui.position.fit.top.apply(this, arguments);
                        }
                    }
                };

            })();

            var position = $.ui.position;















            /*!
             * jQuery UI Autocomplete 1.12.1
             * http://jqueryui.com
             *
             * Copyright jQuery Foundation and other contributors
             * Released under the MIT license.
             * http://jquery.org/license
             */

            //>>label: Autocomplete
            //>>group: Widgets
            //>>description: Lists suggested words as the user is typing.
            //>>docs: http://api.jqueryui.com/autocomplete/
            //>>demos: http://jqueryui.com/autocomplete/
            //>>css.structure: ../../themes/base/core.css
            //>>css.structure: ../../themes/base/autocomplete.css
            //>>css.theme: ../../themes/base/theme.css



            $.widget("ui.uiautocomplete", {
                version: "1.12.1",
                defaultElement: "<input>",
                options: {
                    appendTo: null,
                    autoFocus: false,
                    delay: 300,
                    minLength: 1,
                    position: {
                        my: "left top",
                        at: "left bottom",
                        collision: "none"
                    },
                    source: null,

                    // Callbacks
                    change: null,
                    close: null,
                    focus: null,
                    open: null,
                    response: null,
                    search: null,
                    select: null
                },

                requestIndex: 0,
                pending: 0,

                _create: function () {

                    // Some browsers only repeat keydown events, not keypress events,
                    // so we use the suppressKeyPress flag to determine if we've already
                    // handled the keydown event. #7269
                    // Unfortunately the code for & in keypress is the same as the up arrow,
                    // so we use the suppressKeyPressRepeat flag to avoid handling keypress
                    // events when we know the keydown event was used to modify the
                    // search term. #7799
                    var suppressKeyPress, suppressKeyPressRepeat, suppressInput,
                        nodeName = this.element[0].nodeName.toLowerCase(),
                        isTextarea = nodeName === "textarea",
                        isInput = nodeName === "input";

                    // Textareas are always multi-line
                    // Inputs are always single-line, even if inside a contentEditable element
                    // IE also treats inputs as contentEditable
                    // All other element types are determined by whether or not they're contentEditable
                    this.isMultiLine = isTextarea || !isInput && this._isContentEditable(this.element);

                    this.valueMethod = this.element[isTextarea || isInput ? "val" : "text"];
                    this.isNewMenu = true;

                    this._addClass("ui-autocomplete-input");
                    this.element.attr("uiautocomplete", "off");

                    this._on(this.element, {
                        keydown: function (event) {
                            if (this.element.prop("readOnly")) {
                                suppressKeyPress = true;
                                suppressInput = true;
                                suppressKeyPressRepeat = true;
                                return;
                            }

                            suppressKeyPress = false;
                            suppressInput = false;
                            suppressKeyPressRepeat = false;
                            var keyCode = $.ui.keyCode;
                            switch (event.keyCode) {
                                case keyCode.PAGE_UP:
                                    suppressKeyPress = true;
                                    this._move("previousPage", event);
                                    break;
                                case keyCode.PAGE_DOWN:
                                    suppressKeyPress = true;
                                    this._move("nextPage", event);
                                    break;
                                case keyCode.UP:
                                    suppressKeyPress = true;
                                    this._keyEvent("previous", event);
                                    break;
                                case keyCode.DOWN:
                                    suppressKeyPress = true;
                                    this._keyEvent("next", event);
                                    break;
                                case keyCode.ENTER:

                                    // when menu is open and has focus
                                    if (this.menu.active) {

                                        // #6055 - Opera still allows the keypress to occur
                                        // which causes forms to submit
                                        suppressKeyPress = true;
                                        event.preventDefault();
                                        this.menu.select(event);
                                    }
                                    break;
                                case keyCode.TAB:
                                    if (this.menu.active) {
                                        this.menu.select(event);
                                    }
                                    break;
                                case keyCode.ESCAPE:
                                    if (this.menu.element.is(":visible")) {
                                        if (!this.isMultiLine) {
                                            this._value(this.term);
                                        }
                                        this.close(event);

                                        // Different browsers have different default behavior for escape
                                        // Single press can mean undo or clear
                                        // Double press in IE means clear the whole form
                                        event.preventDefault();
                                    }
                                    break;
                                default:
                                    suppressKeyPressRepeat = true;

                                    // search timeout should be triggered before the input value is changed
                                    this._searchTimeout(event);
                                    break;
                            }
                        },
                        keypress: function (event) {
                            if (suppressKeyPress) {
                                suppressKeyPress = false;
                                if (!this.isMultiLine || this.menu.element.is(":visible")) {
                                    event.preventDefault();
                                }
                                return;
                            }
                            if (suppressKeyPressRepeat) {
                                return;
                            }

                            // Replicate some key handlers to allow them to repeat in Firefox and Opera
                            var keyCode = $.ui.keyCode;
                            switch (event.keyCode) {
                                case keyCode.PAGE_UP:
                                    this._move("previousPage", event);
                                    break;
                                case keyCode.PAGE_DOWN:
                                    this._move("nextPage", event);
                                    break;
                                case keyCode.UP:
                                    this._keyEvent("previous", event);
                                    break;
                                case keyCode.DOWN:
                                    this._keyEvent("next", event);
                                    break;
                            }
                        },
                        input: function (event) {
                            if (suppressInput) {
                                suppressInput = false;
                                event.preventDefault();
                                return;
                            }
                            this._searchTimeout(event);
                        },
                        focus: function () {
                            this.selectedItem = null;
                            this.previous = this._value();
                        },
                        blur: function (event) {
                            if (this.cancelBlur) {
                                delete this.cancelBlur;
                                return;
                            }

                            clearTimeout(this.searching);
                            this.close(event);
                            this._change(event);
                        }
                    });

                    this._initSource();
                    this.menu = $("<ul>")
                        .appendTo(this._appendTo())
                        .menu({

                            // disable ARIA support, the live region takes care of that
                            role: null
                        })
                        .hide()
                        .menu("instance");

                    this._addClass(this.menu.element, "ui-autocomplete", "ui-front");
                    this._on(this.menu.element, {
                        mousedown: function (event) {

                            // prevent moving focus out of the text field
                            event.preventDefault();

                            // IE doesn't prevent moving focus even with event.preventDefault()
                            // so we set a flag to know when we should ignore the blur event
                            this.cancelBlur = true;
                            this._delay(function () {
                                delete this.cancelBlur;

                                // Support: IE 8 only
                                // Right clicking a menu item or selecting text from the menu items will
                                // result in focus moving out of the input. However, we've already received
                                // and ignored the blur event because of the cancelBlur flag set above. So
                                // we restore focus to ensure that the menu closes properly based on the user's
                                // next actions.
                                if (this.element[0] !== $.ui.safeActiveElement(this.document[0])) {
                                    this.element.trigger("focus");
                                }
                            });
                        },
                        menufocus: function (event, ui) {
                            var label, item;

                            // support: Firefox
                            // Prevent accidental activation of menu items in Firefox (#7024 #9118)
                            if (this.isNewMenu) {
                                this.isNewMenu = false;
                                if (event.originalEvent && /^mouse/.test(event.originalEvent.type)) {
                                    this.menu.blur();

                                    this.document.one("mousemove", function () {
                                        $(event.target).trigger(event.originalEvent);
                                    });

                                    return;
                                }
                            }

                            item = ui.item.data("ui-autocomplete-item");
                            if (false !== this._trigger("focus", event, { item: item })) {

                                // use value to match what will end up in the input, if it was a key event
                                if (event.originalEvent && /^key/.test(event.originalEvent.type)) {
                                    this._value(item.value);
                                }
                            }

                            // Announce the value in the liveRegion
                            label = ui.item.attr("aria-label") || item.value;
                            if (label && $.trim(label).length) {
                                this.liveRegion.children().hide();
                                $("<div>").text(label).appendTo(this.liveRegion);
                            }
                        },
                        menuselect: function (event, ui) {
                            var item = ui.item.data("ui-autocomplete-item"),
                                previous = this.previous;

                            // Only trigger when focus was lost (click on menu)
                            if (this.element[0] !== $.ui.safeActiveElement(this.document[0])) {
                                this.element.trigger("focus");
                                this.previous = previous;

                                // #6109 - IE triggers two focus events and the second
                                // is asynchronous, so we need to reset the previous
                                // term synchronously and asynchronously :-(
                                this._delay(function () {
                                    this.previous = previous;
                                    this.selectedItem = item;
                                });
                            }

                            if (false !== this._trigger("select", event, { item: item })) {
                                this._value(item.value);
                            }

                            // reset the term after the select event
                            // this allows custom select handling to work properly
                            this.term = this._value();

                            this.close(event);
                            this.selectedItem = item;
                        }
                    });

                    this.liveRegion = $("<div>", {
                        role: "status",
                        "aria-live": "assertive",
                        "aria-relevant": "additions"
                    })
                        .appendTo(this.document[0].body);

                    this._addClass(this.liveRegion, null, "ui-helper-hidden-accessible");

                    // Turning off autocomplete prevents the browser from remembering the
                    // value when navigating through history, so we re-enable autocomplete
                    // if the page is unloaded before the widget is destroyed. #7790
                    this._on(this.window, {
                        beforeunload: function () {
                            this.element.removeAttr("uiautocomplete");
                        }
                    });
                },

                _destroy: function () {
                    clearTimeout(this.searching);
                    this.element.removeAttr("uiautocomplete");
                    this.menu.element.remove();
                    this.liveRegion.remove();
                },

                _setOption: function (key, value) {
                    this._super(key, value);
                    if (key === "source") {
                        this._initSource();
                    }
                    if (key === "appendTo") {
                        this.menu.element.appendTo(this._appendTo());
                    }
                    if (key === "disabled" && value && this.xhr) {
                        this.xhr.abort();
                    }
                },

                _isEventTargetInWidget: function (event) {
                    var menuElement = this.menu.element[0];

                    return event.target === this.element[0] ||
                        event.target === menuElement ||
                        $.contains(menuElement, event.target);
                },

                _closeOnClickOutside: function (event) {
                    if (!this._isEventTargetInWidget(event)) {
                        this.close();
                    }
                },

                _appendTo: function () {
                    var element = this.options.appendTo;

                    if (element) {
                        element = element.jquery || element.nodeType ?
                            $(element) :
                            this.document.find(element).eq(0);
                    }

                    if (!element || !element[0]) {
                        element = this.element.closest(".ui-front, dialog");
                    }

                    if (!element.length) {
                        element = this.document[0].body;
                    }

                    return element;
                },

                _initSource: function () {
                    var array, url,
                        that = this;
                    if ($.isArray(this.options.source)) {
                        array = this.options.source;
                        this.source = function (request, response) {
                            response($.ui.uiautocomplete.filter(array, request.term));
                        };
                    } else if (typeof this.options.source === "string") {
                        url = this.options.source;
                        this.source = function (request, response) {
                            if (that.xhr) {
                                that.xhr.abort();
                            }
                            that.xhr = $.ajax({
                                url: url,
                                data: request,
                                dataType: "json",
                                success: function (data) {
                                    response(data);
                                },
                                error: function () {
                                    response([]);
                                }
                            });
                        };
                    } else {
                        this.source = this.options.source;
                    }
                },

                _searchTimeout: function (event) {
                    clearTimeout(this.searching);
                    this.searching = this._delay(function () {

                        // Search if the value has changed, or if the user retypes the same value (see #7434)
                        var equalValues = this.term === this._value(),
                            menuVisible = this.menu.element.is(":visible"),
                            modifierKey = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;

                        if (!equalValues || (equalValues && !menuVisible && !modifierKey)) {
                            this.selectedItem = null;
                            this.search(null, event);
                        }
                    }, this.options.delay);
                },

                search: function (value, event) {
                    value = value != null ? value : this._value();

                    // Always save the actual value, not the one passed as an argument
                    this.term = this._value();

                    if (value.length < this.options.minLength) {
                        return this.close(event);
                    }

                    if (this._trigger("search", event) === false) {
                        return;
                    }

                    return this._search(value);
                },

                _search: function (value) {
                    this.pending++;
                    this._addClass("ui-autocomplete-loading");
                    this.cancelSearch = false;

                    this.source({ term: value }, this._response());
                },

                _response: function () {
                    var index = ++this.requestIndex;

                    return $.proxy(function (content) {
                        if (index === this.requestIndex) {
                            this.__response(content);
                        }

                        this.pending--;
                        if (!this.pending) {
                            this._removeClass("ui-autocomplete-loading");
                        }
                    }, this);
                },

                __response: function (content) {
                    if (content) {
                        content = this._normalize(content);
                    }
                    this._trigger("response", null, { content: content });
                    if (!this.options.disabled && content && content.length && !this.cancelSearch) {
                        this._suggest(content);
                        this._trigger("open");
                    } else {

                        // use ._close() instead of .close() so we don't cancel future searches
                        this._close();
                    }
                },

                close: function (event) {
                    this.cancelSearch = true;
                    this._close(event);
                },

                _close: function (event) {

                    // Remove the handler that closes the menu on outside clicks
                    this._off(this.document, "mousedown");

                    if (this.menu.element.is(":visible")) {
                        this.menu.element.hide();
                        this.menu.blur();
                        this.isNewMenu = true;
                        this._trigger("close", event);
                    }
                },

                _change: function (event) {
                    if (this.previous !== this._value()) {
                        this._trigger("change", event, { item: this.selectedItem });
                    }
                },

                _normalize: function (items) {

                    // assume all items have the right format when the first item is complete
                    if (items.length && items[0].label && items[0].value) {
                        return items;
                    }
                    return $.map(items, function (item) {
                        if (typeof item === "string") {
                            return {
                                label: item,
                                value: item
                            };
                        }
                        return $.extend({}, item, {
                            label: item.label || item.value,
                            value: item.value || item.label
                        });
                    });
                },

                _suggest: function (items) {
                    var ul = this.menu.element.empty();
                    this._renderMenu(ul, items);
                    this.isNewMenu = true;
                    this.menu.refresh();

                    // Size and position menu
                    ul.show();
                    this._resizeMenu();
                    ul.position($.extend({
                        of: this.element
                    }, this.options.position));

                    if (this.options.autoFocus) {
                        this.menu.next();
                    }

                    // Listen for interactions outside of the widget (#6642)
                    this._on(this.document, {
                        mousedown: "_closeOnClickOutside"
                    });
                },

                _resizeMenu: function () {
                    var ul = this.menu.element;
                    ul.outerWidth(Math.max(

                        // Firefox wraps long text (possibly a rounding bug)
                        // so we add 1px to avoid the wrapping (#7513)
                        ul.width("").outerWidth() + 1,
                        this.element.outerWidth()
                    ));
                },

                _renderMenu: function (ul, items) {
                    var that = this;
                    $.each(items, function (index, item) {
                        that._renderItemData(ul, item);
                    });
                },

                _renderItemData: function (ul, item) {
                    return this._renderItem(ul, item).data("ui-autocomplete-item", item);
                },

                _renderItem: function (ul, item) {
                    return $("<li>")
                        .append($("<div>").text(item.label))
                        .appendTo(ul);
                },

                _move: function (direction, event) {
                    if (!this.menu.element.is(":visible")) {
                        this.search(null, event);
                        return;
                    }
                    if (this.menu.isFirstItem() && /^previous/.test(direction) ||
                        this.menu.isLastItem() && /^next/.test(direction)) {

                        if (!this.isMultiLine) {
                            this._value(this.term);
                        }

                        this.menu.blur();
                        return;
                    }
                    this.menu[direction](event);
                },

                widget: function () {
                    return this.menu.element;
                },

                _value: function () {
                    return this.valueMethod.apply(this.element, arguments);
                },

                _keyEvent: function (keyEvent, event) {
                    if (!this.isMultiLine || this.menu.element.is(":visible")) {
                        this._move(keyEvent, event);

                        // Prevents moving cursor to beginning/end of the text field in some browsers
                        event.preventDefault();
                    }
                },

                // Support: Chrome <=50
                // We should be able to just use this.element.prop( "isContentEditable" )
                // but hidden elements always report false in Chrome.
                // https://code.google.com/p/chromium/issues/detail?id=313082
                _isContentEditable: function (element) {
                    if (!element.length) {
                        return false;
                    }

                    var editable = element.prop("contentEditable");

                    if (editable === "inherit") {
                        return this._isContentEditable(element.parent());
                    }

                    return editable === "true";
                }
            });

            $.extend($.ui.uiautocomplete, {
                escapeRegex: function (value) {
                    return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
                },
                filter: function (array, term) {
                    var matcher = new RegExp($.ui.uiautocomplete.escapeRegex(term), "i");
                    return $.grep(array, function (value) {
                        return matcher.test(value.label || value.value || value);
                    });
                }
            });

            // Live region extension, adding a `messages` option
            // NOTE: This is an experimental API. We are still investigating
            // a full solution for string manipulation and internationalization.
            $.widget("ui.uiautocomplete", $.ui.uiautocomplete, {
                options: {
                    messages: {
                        noResults: "No search results.",
                        results: function (amount) {
                            return amount + (amount > 1 ? " results are" : " result is") +
                                " available, use up and down arrow keys to navigate.";
                        }
                    }
                },

                __response: function (content) {
                    var message;
                    this._superApply(arguments);
                    if (this.options.disabled || this.cancelSearch) {
                        return;
                    }
                    if (content && content.length) {
                        message = this.options.messages.results(content.length);
                    } else {
                        message = this.options.messages.noResults;
                    }
                    this.liveRegion.children().hide();
                    $("<div>").text(message).appendTo(this.liveRegion);
                }
            });

            //var widgetsAutocomplete = $.ui.autocomplete;


            $.fn.uiuiautocomplete = $.ui.uiautocomplete;

            var script = thisShadow.criarScriptTag((webparts ? '' : 'https://webparts.gestaoparts.com.br') + '/plugins/underscore/underscore.js', underscorePreparado)
            divMaster.appendChild( script )
        }

        function underscorePreparado(){
            var script = thisShadow.criarScriptTag((webparts ? '' : 'https://webparts.gestaoparts.com.br') + '/node_modules/material-components-web/dist/material-components-web.js', materialDesingjsPreparado)
            divMaster.appendChild( script )
        }

        function materialDesingjsPreparado() {
            var script = thisShadow.criarScriptTag((webparts ? '' : 'https://webparts.gestaoparts.com.br') + '/plugins/fakeloader/fakeLoader.js', fakeloaderjsPreparado)
            divMaster.appendChild( script )
        }

        
        function fakeloaderjsPreparado() {
            //verificar se swal ja existe se existe usa o que tem
            //se nao existe vincula o proximo e seta targetSwal = gpDivMaster
            
            var script = thisShadow.criarScriptTag((webparts ? '' : 'https://webparts.gestaoparts.com.br') + '/plugins/slick-1.8.0/slick.min.js', slickjsPreparado)
            divMaster.appendChild( script )
        }

        function slickjsPreparado() {
            if (typeof swal === 'undefined') {
                targetSwal = gpDivMaster;
                var script = thisShadow.criarScriptTag((webparts ? '' : 'https://webparts.gestaoparts.com.br') + '/plugins/sweetalert/sweetalert2.all.js', sweetalertjsPreparado)
                divMaster.appendChild(script)
            } else {
                sweetalertjsPreparado();
            }
        }

        function sweetalertjsPreparado() {
            setView()
        }

        function popperJsPreparado(){
            var script = thisShadow.criarScriptTag((webparts ? '' : 'https://webparts.gestaoparts.com.br') + '/plugins/bootstrap4.0.0/dist/js/bootstrap.js', bootstrapjsPreparado)
            divMaster.appendChild( script )
        }
        
        if(typeof $ === "undefined") {
            var script = this.criarScriptTag((webparts ? '' : 'https://webparts.gestaoparts.com.br') + '/plugins/jquery/jquery-3.6.1.js', jqueryPreparado)
            divMaster.appendChild( script )
        } else {
            if(typeof window.gpConsiderarContextoGpFiltrosAvancados !== 'undefined') {
                jqueryPreparado()    
            } else {
                alert('GpFiltrosAvancados: Essa página já esta fazendo uso de uma versão do Jquery não compativel com os filtros avançados, contate o suporte da Gestão Parts para o fornecimento da versão compativel')
            }
        }
        
        function setView(){
            recuperarDadosPropagandasFiltrosAvancados();
            carregarDadosVeiculos();

            $('#collapsefiltrosavancadosprodutos', gpDivMaster).on('show.bs.collapse', function () {
                //mostra filtros avancados e seta que usara filtros avancados
                setTimeout(function () {
                    mdTextPlaca.focus();
                    inicializarSliderFiltrosAvancados();
                }, 500);
                gpDivMaster.dispatchEvent(new CustomEvent('filtrosshow', {
                    bubbles: true,
                    composed: true,
                    detail: {
                        status: true
                    },
                }));
            });
            $('#collapsefiltrosavancadosprodutos', gpDivMaster).on('hide.bs.collapse', function () {
                //esconde filtros avancados e seta que nao usara filtros avancados
                //usandoFiltrosAvancados = false;
                gpDivMaster.dispatchEvent(new CustomEvent('filtroshide', {
                    bubbles: true,
                    composed: true,
                    detail: {
                        status: true
                    },
                }));
            });

            gpDivMaster.body = gpDivMaster

            $(gpDivMaster).mousedown(function (e) {
                // The latest element clicked
                ultimoTargetClicado = $(e.target);
            });
            
            // when 'clicky == null' on blur, we know it was not caused by a click
            // but maybe by pressing the tab key
            $(document).mouseup(function (e) {
                ultimoTargetClicado = null;
            });
            
            window.addEventListener('resize', function (ev) {
                if (window.innerWidth < 1400) {
                    $('.md-avtipotodos').hide();
                } else {
                    $('.md-avtipotodos').show();
                }
            });

            $('.mdss-tab-bar-tipoveiculo .mdc-tab').on('click', function (ev) {
                let $btn = $(this);
                //se o botao for "todos" sem marca todos nunca desmarca
                if ($btn.attr('data-tipo') === 'todos') {
                    tipoClassificacaoVeiculos = [];
                    if (exfiaTipoVeiculos.indexOf('carros') >= 0) {
                        tipoClassificacaoVeiculos.push('CARROS');
                    }
                    if (exfiaTipoVeiculos.indexOf('motos') >= 0) {
                        tipoClassificacaoVeiculos.push('MOTOS');
                    }
                    if (exfiaTipoVeiculos.indexOf('caminhões') >= 0) {
                        tipoClassificacaoVeiculos.push('CAMINHOES');
                    }
    
                    localStorage.setItem(chavetipsel, JSON.stringify(tipoClassificacaoVeiculos));
    
                    $btn.addClass('mdc-tab--active');
                    $btn.attr('aria-selected', 'true');
                    $btn.attr('tabIndex', '0');
                    $btn.find('.mdc-tab-indicator').addClass("mdc-tab-indicator--active");
    
                    let outros = $('.md-avtipo');
                    outros.addClass('mdc-tab--active');
                    outros.attr('aria-selected', 'true');
                    outros.attr('tabIndex', '0');
                    outros.find('.mdc-tab-indicator').addClass("mdc-tab-indicator--active");
    
                    $btn.attr('tabIndex', '0');
                } else {
                    //se o botao for quaisquer outros desmarca todos e mantem apenas o clicado marcado
                    let outros = $('.md-avtipo');
                    outros.removeClass('mdc-tab--active');
                    outros.attr('aria-selected', 'false');
                    outros.attr('tabIndex', '-1');
                    outros.find('.mdc-tab-indicator').removeClass("mdc-tab-indicator--active");
    
                    tipoClassificacaoVeiculos = [];
                    tipoClassificacaoVeiculos.push($btn.attr('data-tipo'));
                    localStorage.setItem(chavetipsel, JSON.stringify(tipoClassificacaoVeiculos));
                  
                    $btn.addClass('mdc-tab--active');
                    $btn.attr('aria-selected', 'true');
                    $btn.attr('tabIndex', '0');
                    $btn.find('.mdc-tab-indicator').addClass("mdc-tab-indicator--active");
                }
    
                //mdBotaoModelo.disabled = true;
                mdBotaoVersao.disabled = true;
                mdBotaoAno.disabled = true;
                if (exfiaCombustivel) {
                    mdBotaoCombustivel.disabled = true;
                }
                if (exfiaMotorizacao) {
                    mdBotaoMotorizacao.disabled = true;
                }
                if (exfiaTracao) {
                    mdBotaoTracao.disabled = true;
                }
                if (exfiaSecao) {
                    mdBotaoSecao.disabled = true;
                }
                if (exfiaGrupo) {
                    mdBotaoGrupo.disabled = true;
                }
                ultimoTermoPesquisadoMontadora = '';
                ultimoTermoPesquisadoModelo = '';
                ultimoTermoPesquisadoVersao = '';
                ultimoTermoPesquisadoAno = '';
                ultimoTermoPesquisadoCombustivel = '';
                ultimoTermoPesquisadoMotorizacao = '';
                ultimoTermoPesquisadoTracao = '';
    
                ultimoTermoPesquisadoSecao = '';
                ultimoTermoPesquisadoGrupo = '';
    
    
                carregarDadosVeiculos(function () {
                    //$('#txt-av-placa').val('');
                    mdTextPlaca.value = '';
                    $('.label-selectplaca').html('');
    
                    listaMontadorasSelecionadas = [];
                    mostrarAvMontadorasSelecionadas();
                    listaModelosSelecionadas = [];
                    mostrarAvModelosSelecionadas();
                    listaVersoesSelecionadas = [];
                    mostrarAvVersaosSelecionadas();
                    listaAnosSelecionados = [];
                    mostrarAvAnosSelecionadas();
                    listaCombustiveisSelecionadas = [];
                    if (exfiaCombustivel) {
                        mostrarAvCombustivelsSelecionadas();
                    }
                    listaMotorizacoesSelecionadas = [];
                    if (exfiaMotorizacao) {
                        mostrarAvMotorizacoesSelecionadas();
                    }
                    listaTracoesSelecionadas = [];
                    if (exfiaTracao) {
                        mostrarAvTracoesSelecionadas();
                    }
    
                    listaSecoesSelecionadas = [];
                    listaGruposSelecionadas = [];
                    if (exfiaSecao) {
                        mostrarAvSecoesSelecionadas();
                        if (exfiaGrupo) {
                            mostrarAvGruposSelecionadas();
                        }
                    }
                });
            });
    
    
            //checarEstadoTutoriais();
            mdc.ripple.MDCRipple.attachTo(gpDivMaster.querySelector('.md-botao-avlimpar'));

            mdBotaoAplicar = new mdc.ripple.MDCRipple(gpDivMaster.querySelector('.md-botao-avaplicar'));
            if (versaoVeiculoObrigatoria) {
                mdBotaoAplicar.disabled = true;
            }
    
            mdTextPlaca = new mdc.textField.MDCTextField(gpDivMaster.querySelector('.md-campo-av-placa'));
            mdTextPlaca.disabled = true;

            if (exfiaDescricao) {
                mdTextProduto = new mdc.textField.MDCTextField(gpDivMaster.querySelector('.md-campo-av-peca'));
            }
            mdBotaoMontadora = new mdc.textField.MDCTextField(gpDivMaster.querySelector('.md-campo-av-montadora'));
            mdBotaoModelo = new mdc.textField.MDCTextField(gpDivMaster.querySelector('.md-campo-av-modelo'));
            
            mdBotaoVersao = new mdc.textField.MDCTextField(gpDivMaster.querySelector('.md-campo-av-versao'));
            mdBotaoVersao.disabled = true;
            mdBotaoAno = new mdc.textField.MDCTextField(gpDivMaster.querySelector('.md-campo-av-ano'));
            mdBotaoAno.disabled = true;
            if (exfiaCombustivel) {
                mdBotaoCombustivel = new mdc.textField.MDCTextField(gpDivMaster.querySelector('.md-campo-av-combustivel'));
                mdBotaoCombustivel.disabled = true;
            }
            if (exfiaMotorizacao) {
                mdBotaoMotorizacao = new mdc.textField.MDCTextField(gpDivMaster.querySelector('.md-campo-av-motorizacao'));
                mdBotaoMotorizacao.disabled = true;
            }
            if (exfiaTracao) {
                mdBotaoTracao = new mdc.textField.MDCTextField(gpDivMaster.querySelector('.md-campo-av-tracao'));
                mdBotaoTracao.disabled = true;
            }
    
            if (exfiaSecao) {
                mdBotaoSecao = new mdc.textField.MDCTextField(gpDivMaster.querySelector('.md-campo-av-secao'));
                mdBotaoSecao.disabled = true;
            }
            if (exfiaGrupo) {
                mdBotaoGrupo = new mdc.textField.MDCTextField(gpDivMaster.querySelector('.md-campo-av-grupo'));
                mdBotaoGrupo.disabled = true;
            }




            //INICIOOOOOOOOOOOOOOOOOOOOOOOOOOO
            

        $('#txt-av-placa').on('change', function () {
            if (!carregouDadosVeiculos) {
                alertify.log('Modelos de Veículos em carregamento. Tente novamente em alguns instantes.');
                return;
            }
            exibirLoaderFA(null, "/Produto/GetDtModeloFipe");
            $('.label-selectplaca').html('');
            let valor = $(this).val().trim();
            if (valor !== '' || clicouBotaoPesqPlaca) {
                clicouBotaoPesqPlaca = false;
                let valehChassis = validateVinChassi(valor);

                let valEhPlaca = !valehChassis && ehPlaca(valor);

                if (!valEhPlaca && valor.length <= 8) {
                    swal({
                        title: "",
                        html: 'Placa inválida',
                        confirmButtonText: "Ok",
                        allowOutsideClick: true,
                        target: targetSwal,
                        onClose: () => {

                        }
                        //timer: 7000
                    });
                    ocultarLoaderFA(null, "/Produto/GetDtModeloFipe");
                    return;
                } else if (!valehChassis && valor.length > 8) {
                    swal({
                        title: "",
                        html: 'Chassi inválido',
                        confirmButtonText: "Ok",
                        allowOutsideClick: true,
                        target: targetSwal,
                        onClose: () => {

                        }
                        //timer: 7000
                    });
                    ocultarLoaderFA(null, "/Produto/GetDtModeloFipe");
                    return;
                } else {
                    ocultarLoaderFA(null, "/Produto/GetDtModeloFipe");
                    procurarPlacaChassis(valor, valEhPlaca, function (montadora, modelo, restanteModeloVersao, ano, ano_modelo, termoPesquisa) {
                        exibirLoaderFA(null, "/Produto/GetDtModeloFipe");
                        $('.label-selectplaca').html(montadora + ' ' + modelo + ' ' + ano + '/' + ano_modelo);

                        let dados = {
                            ClientParameters: JSON.stringify({
                                draw: 1,
                                start: 0,
                                length: 100,
                                search: {
                                    value: termoPesquisa
                                }
                            })
                        };
                        //Cahamada AJAX
                        $.ajax({
                            //URL da página com o WebMethod 
                            //"https://localhost:44363/Produto/GetDtModeloFipe?key=" + keyGpFiltrosAvancados
                            url: webparts ? "/Produto/GetDtModeloFipe" : "https://webparts.gestaoparts.com.br/Produto/GetDtModeloFipe?key=" + keyGpFiltrosAvancados,
                            data: JSON.stringify(dados),
                            type: "POST",
                            dataType: "json",
                            contentType: "application/json; charset=utf-8",
                            success: function (parsedJson) {
                                if (parsedJson.data.length > 0) {
                                    listaSecoesSelecionadas = [];
                                    listaGruposSelecionadas = [];
                                    if (exfiaSecao) {
                                        mostrarAvSecoesSelecionadas();
                                        mdBotaoSecao.disabled = true;

                                        if (exfiaGrupo) {
                                            mostrarAvGruposSelecionadas();
                                            mdBotaoGrupo.disabled = true;
                                        }
                                    }


                                    let fabricante = parsedJson.data[0].fabricante;
                                    if (fabricante !== '') {
                                        listaMontadorasSelecionadas = [];
                                        listaMontadorasSelecionadas.push(fabricante);

                                        mostrarAvMontadorasSelecionadas();


                                        filtrarModelos();
                                        mdBotaoModelo.disabled = false;

                                        let modeloBase = parsedJson.data[0].modeloBase;
                                        if (modeloBase !== '') {
                                            let listaModeloEncontrados = listaModelosFiltradas.filter(function (item, index, array) { return item.modelo_base === modeloBase; });
                                            if (listaModeloEncontrados.length > 0) {
                                                listaModelosSelecionadas = [];
                                                listaModelosSelecionadas.push(listaModeloEncontrados[0]);

                                                mostrarAvModelosSelecionadas();
                                                filtrarAnos();

                                                mdBotaoAno.disabled = false;

                                                //para ano
                                                let menorAno = parseInt(ano, 10);
                                                let maiorAno = parseInt(ano_modelo, 10);
                                                if (maiorAno < menorAno) {
                                                    menorAno = parseInt(ano_modelo, 10);
                                                    maiorAno = parseInt(ano, 10);
                                                }

                                                listaAnosSelecionados = [];
                                                for (var x = menorAno; x <= maiorAno; x++) {
                                                    let listaAnosEncontrados = listaAnos.filter(function (item, index, array) { return item === x.toString(); });
                                                    if (listaAnosEncontrados.length > 0) {
                                                        listaAnosSelecionados.push(x.toString());
                                                    }
                                                }

                                                mostrarAvAnosSelecionadas();
                                                filtrarVersoes();

                                                if (exfiaCombustivel) {
                                                    mdBotaoCombustivel.disabled = false;
                                                }
                                                if (exfiaMotorizacao) {
                                                    mdBotaoMotorizacao.disabled = false;
                                                }
                                                if (exfiaTracao) {
                                                    mdBotaoTracao.disabled = false;
                                                }
                                                mdBotaoVersao.disabled = false;

                                                listaCombustiveisSelecionadas = [];
                                                if (exfiaCombustivel) {
                                                    mostrarAvCombustivelsSelecionadas();
                                                    filtrarCombustiveis();
                                                }
                                                listaMotorizacoesSelecionadas = [];
                                                if (exfiaMotorizacao) {
                                                    mostrarAvMotorizacoesSelecionadas();
                                                    filtrarMotorizacoes();
                                                }
                                                listaTracoesSelecionadas = [];
                                                if (exfiaTracao) {
                                                    mostrarAvTracoesSelecionadas();
                                                    filtrarTracoes();
                                                }


                                                //Para versoes
                                                let listaModeloVersaoEncontrados = listaVersoesFiltradas.filter(function (item, index, array) {
                                                    return _.some(parsedJson.data, function (itemModeloEncontrado) {
                                                        return itemModeloEncontrado.codigo === item.codigo;
                                                    });
                                                });

                                                if (listaModeloVersaoEncontrados.length > 0) {
                                                    listaVersoesSelecionadas = [];
                                                    listaVersoesSelecionadas = listaModeloVersaoEncontrados;
                                                } else {
                                                    listaVersoesSelecionadas = [];
                                                }

                                                mostrarAvVersaosSelecionadas();

                                                if (versaoVeiculoObrigatoria) {
                                                    if (listaVersoesSelecionadas.length > 0) {
                                                        mdBotaoAplicar.disabled = false;
                                                        mdBotaoAplicar.root_.disabled = false;
                                                    } else {
                                                        mdBotaoAplicar.disabled = true;
                                                        mdBotaoAplicar.root_.disabled = true;
                                                    }
                                                }

                                                if (exfiaSecao) {
                                                    if (listaVersoesSelecionadas.length > 0) {
                                                        mdBotaoSecao.disabled = false;
                                                        filtrarSecoes();
                                                    }
                                                }

                                                setTimeout(function () {
                                                    //se pela pesquisa de placa selecionar mais de uma versão abre o combobox automaticamente para o usuario escolher, se deseja filtrar
                                                    if (listaVersoesSelecionadas.length > 1) {
                                                        setTimeout(function () {
                                                            mdBotaoVersao.focus();
                                                        }, 500);
                                                    } else {
                                                        if (exfiaDescricao) {
                                                            mdTextProduto.focus();
                                                        } else {
                                                            if (versaoVeiculoObrigatoria) {
                                                                if (listaVersoesSelecionadas.length > 0) {
                                                                    mdBotaoAplicar.root_.focus();
                                                                }
                                                            } else {
                                                                mdBotaoAplicar.root_.focus();
                                                            }
                                                            
                                                        }
                                                    }
                                                }, 500);
                                            }
                                        }
                                    }

                                }
                                ocultarLoaderFA(null, "/Produto/GetDtModeloFipe");
                            },
                            error: function (req, status, error) {
                                ocultarLoaderFA(null, "/Produto/GetDtModeloFipe");
                                console.log('erro: ', error);
                                /*let errortext = errorText(req, status, error);
                                console.log(errortext);
                                if (errortext === "Sessão expirada") {
                                    window.location = '/Home/Login';
                                } else {*/
                                    swal({
                                        title: "",
                                        type: 'error',
                                        html: error !== '' ? error : "Não foi possível realizar a busca. Tente novamente, se o problema persistir contate o suporte",
                                        confirmButtonText: "Ok",
                                        allowOutsideClick: true,
                                        target: targetSwal,
                                        onClose: () => {

                                        }
                                        //timer: 7000
                                    });
                                //}
                            }
                        });
                    }, function () {
                        ocultarLoaderFA(null, "/Produto/GetDtModeloFipe");
                    });
                }
            } else {
                if (valor === '') {
                    clicouBotaoPesqPlaca = false;
                    
                    swal({
                        title: "",
                        html: 'Placa inválida',
                        confirmButtonText: "Ok",
                        allowOutsideClick: true,
                        target: targetSwal,
                        onClose: () => {

                        }
                        //timer: 7000
                    });
                    ocultarLoaderFA(null, "/Produto/GetDtModeloFipe");
                    return;
                }
            }
        });

        $('#txt-av-peca').on('keyup', function (e) {
            if (e.which === 13) {
                if ($(this).val() !== '') {
                    $('.md-botao-avaplicar').click();
                }
            }
        });


        aplicarFiltrosInterno = function () {

            if (((listaMontadorasSelecionadas.length > 0 || listaModelosSelecionadas.length > 0 ||
                listaAnosSelecionados.length > 0 || listaCombustiveisSelecionadas.length > 0 ||
                listaMotorizacoesSelecionadas.length > 0 || listaTracoesSelecionadas.length > 0) || versaoVeiculoObrigatoria) &&
                listaVersoesSelecionadas.length === 0) {
                alertify.error('Selecione ao menos uma versão');
                setTimeout(function () {
                    mdBotaoVersao.focus();
                }, 500);
            } else {
                let valProduto = $('#txt-av-peca', gpDivMaster).val();
                if (typeof valProduto === 'undefined') {
                    valProduto = '';
                }

                gpDivMaster.dispatchEvent(new CustomEvent('filtrosaplicados', {
                    bubbles: true,
                    composed: true,
                    detail: {
                        montadoras: listaMontadorasSelecionadas,
                        modelos: listaModelosSelecionadas,
                        anos: listaAnosSelecionados,
                        combustiveis: listaCombustiveisSelecionadas,
                        motorizacao: listaMotorizacoesSelecionadas,
                        tracoes: listaTracoesSelecionadas,
                        versoes: listaVersoesSelecionadas,
                        termoPesquisado: valProduto,
                        placa: mdTextPlaca.value,
                        labelPlaca: $('.label-selectplaca').html()
                    },
                }));
            }
        };

            setFiltrosInterno = function (filtros, aplicarFiltros = true) {
                if (typeof filtros === "undefined" || filtros === null) {
                    fnlimparFiltros(aplicarFiltros);
                    return;
                }

                if (typeof filtros.placa === "undefined" || filtros.placa === null || filtros.placa.trim() === '') {
                    mdTextPlaca.value = '';
                    $('.label-selectplaca').html('');
                } else {
                    mdTextPlaca.value = filtros.placa;
                    if (typeof filtros.labelPlaca === "undefined" || filtros.labelPlaca === null || filtros.labelPlaca.trim() === '') {
                        $('.label-selectplaca').html('');
                    } else {
                        $('.label-selectplaca').html(filtros.labelPlaca);
                    }
                }
                
                if (typeof filtros.montadoras === "undefined" || filtros.montadoras.length === 0) {
                    listaMontadorasSelecionadas = [];
                } else {
                    listaMontadorasSelecionadas = filtros.montadoras;
                }

                if (typeof filtros.modelos === "undefined" || filtros.modelos.length === 0) {
                    listaModelosSelecionadas = [];
                } else {
                    listaModelosSelecionadas = filtros.modelos;
                }

                if (typeof filtros.anos === "undefined" || filtros.anos.length === 0) {
                    listaAnosSelecionados = [];
                } else {
                    listaAnosSelecionados = filtros.anos;
                }

                if (typeof filtros.combustiveis === "undefined" || filtros.combustiveis.length === 0) {
                    listaCombustiveisSelecionadas = [];
                } else {
                    listaCombustiveisSelecionadas = filtros.combustiveis;
                }

                if (typeof filtros.motorizacao === "undefined" || filtros.motorizacao.length === 0) {
                    listaMotorizacoesSelecionadas = [];
                } else {
                    listaMotorizacoesSelecionadas = filtros.motorizacao;
                }

                if (typeof filtros.tracoes === "undefined" || filtros.tracoes.length === 0) {
                    listaTracoesSelecionadas = [];
                } else {
                    listaTracoesSelecionadas = filtros.tracoes;
                }

                if (typeof filtros.versoes === "undefined" || filtros.versoes.length === 0) {
                    listaVersoesSelecionadas = [];
                } else {
                    listaVersoesSelecionadas = filtros.versoes;
                }

                if (versaoVeiculoObrigatoria) {
                    if (listaVersoesSelecionadas.length > 0) {
                        mdBotaoAplicar.disabled = false;
                        mdBotaoAplicar.root_.disabled = false;
                    } else {
                        mdBotaoAplicar.disabled = true;
                        mdBotaoAplicar.root_.disabled = true;
                    }
                }

                if (exfiaDescricao) {
                    if (typeof filtros.termoPesquisado === "undefined" || filtros.termoPesquisado === null || filtros.termoPesquisado.trim() === '') {
                        mdTextProduto.value = '';
                    } else {
                        mdTextProduto.value = filtros.termoPesquisado;
                    }
                }

                //reenderiza os filtros mantidos
                ultimoTermoPesquisadoMontadora = '';
                ultimoTermoPesquisadoModelo = '';
                ultimoTermoPesquisadoVersao = '';
                ultimoTermoPesquisadoAno = '';
                ultimoTermoPesquisadoCombustivel = '';
                ultimoTermoPesquisadoMotorizacao = '';
                ultimoTermoPesquisadoTracao = '';

                ultimoTermoPesquisadoSecao = '';
                ultimoTermoPesquisadoGrupo = '';

                mostrarAvMontadorasSelecionadas();
                mostrarAvModelosSelecionadas();
                mostrarAvVersaosSelecionadas();
                mostrarAvAnosSelecionadas();
                if (exfiaCombustivel) {
                    mostrarAvCombustivelsSelecionadas();
                }
                if (exfiaMotorizacao) {
                    mostrarAvMotorizacoesSelecionadas();
                }
                if (exfiaTracao) {
                    mostrarAvTracoesSelecionadas();
                }

                if (exfiaSecao) {
                    mostrarAvSecoesSelecionadas();
                    if (exfiaGrupo) {
                        mostrarAvGruposSelecionadas();
                    }
                }

                mdBotaoMontadora.disabled = false;
                mdBotaoModelo.disabled = false;
                filtrarModelos();
                
                mdBotaoVersao.disabled = false;
                mdBotaoAno.disabled = false;
                filtrarAnos();
                if (exfiaCombustivel) {
                    mdBotaoCombustivel.disabled = false;
                    filtrarCombustiveis();
                }
                if (exfiaMotorizacao) {
                    mdBotaoMotorizacao.disabled = false;
                    filtrarMotorizacoes();
                }
                if (exfiaTracao) {
                    mdBotaoTracao.disabled = false;
                    filtrarTracoes();
                }

                if (exfiaSecao) {
                    mdBotaoSecao.disabled = false;
                    if (exfiaGrupo) {
                        mdBotaoGrupo.disabled = true;
                    }
                }

                filtrarVersoes();

                if (aplicarFiltros) {
                    aplicarFiltrosInterno();
                }
            }

            let fnlimparFiltros = function (aplicarFiltros = true) {
                mdTextPlaca.value = '';
                $('.label-selectplaca').html('');

                listaMontadorasSelecionadas = [];
                listaModelosSelecionadas = [];
                listaVersoesSelecionadas = [];
                listaAnosSelecionados = [];
                listaCombustiveisSelecionadas = [];
                listaMotorizacoesSelecionadas = [];
                listaTracoesSelecionadas = [];

                listaSecoesSelecionadas = [];
                listaGruposSelecionadas = [];


                ultimoTermoPesquisadoMontadora = '';
                ultimoTermoPesquisadoModelo = '';
                ultimoTermoPesquisadoVersao = '';
                ultimoTermoPesquisadoAno = '';
                ultimoTermoPesquisadoCombustivel = '';
                ultimoTermoPesquisadoMotorizacao = '';
                ultimoTermoPesquisadoTracao = '';

                ultimoTermoPesquisadoSecao = '';
                ultimoTermoPesquisadoGrupo = '';

                mostrarAvMontadorasSelecionadas();
                mostrarAvModelosSelecionadas();
                mostrarAvVersaosSelecionadas();
                mostrarAvAnosSelecionadas();
                if (exfiaCombustivel) {
                    mostrarAvCombustivelsSelecionadas();
                }
                if (exfiaMotorizacao) {
                    mostrarAvMotorizacoesSelecionadas();
                }
                if (exfiaTracao) {
                    mostrarAvTracoesSelecionadas();
                }

                if (exfiaSecao) {
                    mostrarAvSecoesSelecionadas();
                    if (exfiaGrupo) {
                        mostrarAvGruposSelecionadas();
                    }
                }

                mdBotaoMontadora.disabled = false;
                mdBotaoModelo.disabled = false;
                mdBotaoVersao.disabled = true;
                mdBotaoAno.disabled = true;
                if (exfiaCombustivel) {
                    mdBotaoCombustivel.disabled = true;
                }
                if (exfiaMotorizacao) {
                    mdBotaoMotorizacao.disabled = true;
                }
                if (exfiaTracao) {
                    mdBotaoTracao.disabled = true;
                }

                if (exfiaSecao) {
                    mdBotaoSecao.disabled = true;
                    if (exfiaGrupo) {
                        mdBotaoGrupo.disabled = true;
                    }
                }

                if (exfiaDescricao) {
                    mdTextProduto.value = '';
                }

                let valProduto = $('#txt-av-peca', gpDivMaster).val();
                if (typeof valProduto === 'undefined') {
                    valProduto = '';
                }

                if (versaoVeiculoObrigatoria) {
                    if (listaVersoesSelecionadas.length > 0) {
                        mdBotaoAplicar.disabled = false;
                        mdBotaoAplicar.root_.disabled = false;
                    } else {
                        mdBotaoAplicar.disabled = true;
                        mdBotaoAplicar.root_.disabled = true;
                    }
                }

                if (aplicarFiltros) {
                    gpDivMaster.dispatchEvent(new CustomEvent('filtroslimpados', {
                        bubbles: true,
                        composed: true,
                        detail: {
                            montadoras: listaMontadorasSelecionadas,
                            modelos: listaModelosSelecionadas,
                            anos: listaAnosSelecionados,
                            combustiveis: listaCombustiveisSelecionadas,
                            motorizacao: listaMotorizacoesSelecionadas,
                            tracoes: listaTracoesSelecionadas,
                            versoes: listaVersoesSelecionadas,
                            termoPesquisado: valProduto
                        },
                    }));
                }
            };

        $(gpDivMaster).on('click', '.md-botao-avaplicar', aplicarFiltrosInterno);
        $(gpDivMaster).on('click', '.md-botao-avlimpar', fnlimparFiltros);


        setFocusPlacaInterno = function () {
            if (mdTextPlaca !== null && !mdTextPlaca.disabled) {
                setTimeout(function () {
                    mdTextPlaca.focus();
                }, 500);
            } else {
                setTimeout(function () {
                    mdTextPlaca.focus();
                }, 1500);
            }
        };

        $(gpDivMaster).on('click', '.botao-auxiliar-pesqveiculo', function () {
            var input = $('#gridproduto_wrapper .dataTables_filter input');
    
            let searchValueAtual = input.val();
            let idxHashTag = searchValueAtual.indexOf('#');
    
            tratarPesquisaBasicaHashtag(searchValueAtual, idxHashTag);
        });
    
        $(gpDivMaster).on('click', '.botao-auxiliar-pesqplaca', function () {
            clicouBotaoPesqPlaca = true;
            $('#txt-av-placa', gpDivMaster).trigger("change");
        });



        

        $.extend($.ui.autocomplete.prototype, {
            _renderMenu: function (ul, items) {
                //remove scroll event to prevent attaching multiple scroll events to one container element
                $(ul).unbind("scroll");

                var self = this;
                self._scrollMenu(ul, items);
            },

            _scrollMenu: function (ul, items) {
                var self = this;
                var maxShow = 50;
                var results = [];
                var pages = Math.ceil(items.length / maxShow);
                results = items.slice(0, maxShow);

                if (pages > 1) {
                    $(ul).scroll(function () {
                        if (isScrollbarBottom($(ul))) {
                            ++window.pageIndex;
                            if (window.pageIndex >= pages) return;

                            results = items.slice(window.pageIndex * maxShow, window.pageIndex * maxShow + maxShow);

                            //append item to ul
                            $.each(results, function (index, item) {
                                item.index = (window.pageIndex * maxShow) + index;
                                self._renderItemData(ul, item);
                                //self._renderItem(ul, item);
                            });
                            //refresh menu
                            //self.menu.deactivate();
                            self.menu.refresh();
                            // size and position menu
                            ul.show();
                            self._resizeMenu();
                            ul.position($.extend({
                                of: self.element
                            }, self.options.position));
                            if (self.options.autoFocus) {
                                self.menu.next(new $.Event("mouseover"));
                            }
                        }
                    });
                }

                $.each(results, function (index, item) {
                    item.index = (window.pageIndex * maxShow) + index;
                    self._renderItemData(ul, item);
                    //self._renderItem(ul, item);
                });
            }
        });









            $.extend($.ui.uiautocomplete.prototype, {
                _renderMenu: function (ul, items) {
                    //remove scroll event to prevent attaching multiple scroll events to one container element
                    $(ul).unbind("scroll");

                    var self = this;
                    self._scrollMenu(ul, items);
                },

                _scrollMenu: function (ul, items) {
                    var self = this;
                    var maxShow = 50;
                    var results = [];
                    var pages = Math.ceil(items.length / maxShow);
                    results = items.slice(0, maxShow);

                    if (pages > 1) {
                        $(ul).scroll(function () {
                            if (isScrollbarBottom($(ul))) {
                                ++window.pageIndex;
                                if (window.pageIndex >= pages) return;

                                results = items.slice(window.pageIndex * maxShow, window.pageIndex * maxShow + maxShow);

                                //append item to ul
                                $.each(results, function (index, item) {
                                    item.index = (window.pageIndex * maxShow) + index;
                                    self._renderItemData(ul, item);
                                    //self._renderItem(ul, item);
                                });
                                //refresh menu
                                //self.menu.deactivate();
                                self.menu.refresh();
                                // size and position menu
                                ul.show();
                                self._resizeMenu();
                                ul.position($.extend({
                                    of: self.element
                                }, self.options.position));
                                if (self.options.autoFocus) {
                                    self.menu.next(new $.Event("mouseover"));
                                }
                            }
                        });
                    }

                    $.each(results, function (index, item) {
                        item.index = (window.pageIndex * maxShow) + index;
                        self._renderItemData(ul, item);
                        //self._renderItem(ul, item);
                    });
                }
            });








        //Inicio - Funcoes reaproveitadas pra todos os combobox autocomplete´s
        let gp_suggest = function( items ) {
            
                var ul = this.menu.element.empty();
                this._renderMenu( ul, items );
                this.isNewMenu = true;
                this.menu.refresh();
        
                // Size and position menu
                ul.show();
                this._resizeMenu();
                ul.position( $.extend( {
                    of: this.element
                }, this.options.position ) );
        
                if ( this.options.autoFocus ) {
                    this.menu.next();
                }
        
                // Listen for interactions outside of the widget (#6642)
                /*this._on( this.document, {
                    mousedown: "_closeOnClickOutside"
                } );*/
                this._on( gpDivMaster, {
                    mousedown: "_closeOnClickOutside"
                } );
            };

        //Fim - Funcoes reaproveitadas pra todos os combobox autocomplete´s


        //Combobox autocomplete de Montadora
        let menuMontadoraAberto = false;

        let sTxtAvMontadora = $("#txt-av-montadora", gpDivMaster);

            // don't navigate away from the field on tab when selecting an item
            sTxtAvMontadora.on("focus", function () {
                if (!menuMontadoraAberto) {
                    sTxtAvMontadora.val(ultimoTermoPesquisadoMontadora);
                    //let instance = $.ui.autocomplete("instance", sTxtAvMontadora);
                    //instance.search(sTxtAvMontadora.val());
                    //$.ui.autocomplete("search", sTxtAvMontadora, sTxtAvMontadora.val());
                    sTxtAvMontadora.uiautocomplete("search", sTxtAvMontadora.val());
                }
            }).on("blur", function () {
                mostrarAvMontadorasSelecionadas();
            }).on("keydown", function (event) {
                if (event.keyCode === $.ui.keyCode.TAB &&
                    $(this).uiautocomplete("instance").menu.active) {
                    event.preventDefault();
                }
            });
            
            sTxtAvMontadora.uiuiautocomplete({
                appendTo: window.gpDivMaster,
                messages: {
                    noResults: 'no results',
                    results: function(amount) {
                        return 'no results';
                        //return amount + 'results.'
                    }
                },
                minLength: 0,
                //source: availableTags,

                source: function (request, response) {
                    // delegate back to autocomplete, but extract the last term
                    if (!carregouDadosVeiculos) {
                        alertify.log('Modelos de Veículos em carregamento. Tente novamente em alguns instantes.');
                        response([]);
                        return;
                    }

                    let termo = request.term.trim();
                    //console.log('em montadora source');
                    ultimoTermoPesquisadoMontadora = termo;
                    let termos = termo.split(' ');
                    let padroes = [];
                    for (var x = 0; x < termos.length; x++) {
                        let patt = new RegExp($.ui.autocomplete.escapeRegex(extractLast(termos[x])), "i");
                        padroes.push(patt);
                    }


                    let novaLista = _.filter(listaMontadoras, function (item, index, array) {
                        for (var x = 0; x < padroes.length; x++) {
                            if (!padroes[x].test(item)) {
                                return false;
                            }
                        }
                        return true;
                    })

                    response(novaLista);

                    if (novaLista.length === 0) {
                        //console.log('tentou fechar ');
                        $(sTxtAvMontadora.uiautocomplete("instance").menu.activeMenu).unbind("scroll"); 
                        setTimeout(function () {
                            //console.log('tentou fechar definitivo');
                            sTxtAvMontadora.uiautocomplete("close");
                        }, 50);
                    }
                },
                focus: function (event, ui) {
                    // prevent value inserted on focus
                    return false;
                },
                wrapFocus: true,
                select: function (event, ui) {
                    this.value = "";

                    let iMontSel = listaMontadorasSelecionadas.findIndex(function (montSel) {
                        return montSel === ui.item.label;
                    });
                    if (iMontSel === -1) {
                        //soh permite um selecionado entao desmarca a montadora anterior automaticamente
                        listaMontadorasSelecionadas = [];

                        mdBotaoVersao.disabled = true;
                        mdBotaoAno.disabled = true;
                        if (exfiaCombustivel) {
                            mdBotaoCombustivel.disabled = true;
                        }
                        if (exfiaMotorizacao) {
                            mdBotaoMotorizacao.disabled = true;
                        }
                        if (exfiaTracao) {
                            mdBotaoTracao.disabled = true;
                        }

                        ultimoTermoPesquisadoModelo = '';
                        ultimoTermoPesquisadoVersao = '';
                        listaModelosSelecionadas = [];
                        mostrarAvModelosSelecionadas();
                        listaVersoesSelecionadas = [];
                        mostrarAvVersaosSelecionadas();
                        listaAnosSelecionados = [];
                        mostrarAvAnosSelecionadas();

                        listaCombustiveisSelecionadas = [];
                        mostrarAvCombustivelsSelecionadas();
                        listaMotorizacoesSelecionadas = [];
                        mostrarAvMotorizacoesSelecionadas();
                        listaTracoesSelecionadas = [];
                        mostrarAvTracoesSelecionadas();
                        //}

                        let $itemMontadora = $('.item-montadora-' + ui.item.label.replaceAll(' ', ''), gpDivMaster);
                        let $checkItemMontadora = $('#list-checkbox-item-montadora-' + ui.item.label.replaceAll(' ', ''), gpDivMaster);
                        setTimeout(function () {
                            $itemMontadora.addClass('mdc-list-item--selected');
                            $checkItemMontadora.prop("checked", true);
                        }, 10);
                        listaMontadorasSelecionadas.push(ui.item.label);
                    } else {
                        let $itemMontadora = $('.item-montadora-' + ui.item.label.replaceAll(' ', ''), gpDivMaster);
                        let $checkItemMontadora = $('#list-checkbox-item-montadora-' + ui.item.label.replaceAll(' ', ''), gpDivMaster);
                        setTimeout(function () {
                            $itemMontadora.removeClass('mdc-list-item--selected');
                            $checkItemMontadora.prop("checked", false);
                        }, 10);
                        listaMontadorasSelecionadas.splice(iMontSel, 1);

                    }
                    mostrarAvMontadorasSelecionadas();

                    if (listaMontadorasSelecionadas.length === 0) {
                        mdBotaoVersao.disabled = true;
                        mdBotaoAno.disabled = true;

                        ultimoTermoPesquisadoModelo = '';
                        filtrarModelos();

                        ultimoTermoPesquisadoVersao = '';
                        listaModelosSelecionadas = [];
                        mostrarAvModelosSelecionadas();
                        listaVersoesSelecionadas = [];
                        mostrarAvVersaosSelecionadas();
                        listaAnosSelecionados = [];
                        mostrarAvAnosSelecionadas();

                        listaCombustiveisSelecionadas = [];
                        mostrarAvCombustivelsSelecionadas();
                        listaMotorizacoesSelecionadas = [];
                        mostrarAvMotorizacoesSelecionadas();
                        listaTracoesSelecionadas = [];
                        mostrarAvTracoesSelecionadas();
                    } else {
                        filtrarModelos();

                        mdBotaoModelo.disabled = false;
                        setTimeout(function () {
                            mdBotaoModelo.focus();
                        }, 500);
                    }

                    listaSecoesSelecionadas = [];
                    if (exfiaSecao) {
                        mostrarAvSecoesSelecionadas();
                        mdBotaoSecao.disabled = true;
                    }

                    listaGruposSelecionadas = [];
                    if (exfiaSecao && exfiaGrupo) {
                        mostrarAvGruposSelecionadas();
                        mdBotaoGrupo.disabled = true;
                    }

                    return false;
                },
                open: function (event, ui) {
                    menuMontadoraAberto = true;
                }
            }, sTxtAvMontadora);
        let avMontadoraAutoCompleteInstance = sTxtAvMontadora.uiautocomplete("instance");
        avMontadoraAutoCompleteInstance._suggest = gp_suggest;
        avMontadoraAutoCompleteInstance.close = function (e) {
            //return false;
            //if (readyToClose)
            let self = this;
            setTimeout(function () {
                //clearTimeout(self.closing),
                self.menu.element.is(":visible") && (
                    /*self.menu.element.slideUp(),*/
                    self.menu.element.hide(), (typeof self.menu.deactivate === 'function' ? self.menu.deactivate() : true), self._trigger("close", e)
                );
                menuMontadoraAberto = false;
            }, 400);
        };
            sTxtAvMontadora.uiautocomplete("instance")._renderMenu = function (ul, items) {
            var that = this;

            if (ultimoTermoPesquisadoMontadora === '') {
                $(ul).unbind("scroll");

                //console.log('em montadora rendermenu');
                //reset paginacao para scroll load
                window.pageIndex = 0;

                var self = this;
                self._scrollMenu(ul, items);
            } else {
                $(ul).unbind("scroll");

                $.each(items, function (index, item) {
                    if (index === 0) {
                        primeiroRenderItemAutoC = true;
                    } else {
                        primeiroRenderItemAutoC = false;
                    }
                    item.index = index;
                    that._renderItemData(ul, item);
                });
            }
            
            let $ul = $(ul);
            $ul.addClass("mdc-list mdc-elevation--z3 mdss-list mdss-list-montadora");
            $ul.attr("data-mdc-auto-init", "MDCList");
            $ul.attr("role", "group");
            $ul.find("li:odd").addClass("odd");
            mdc.autoInit();
        };
        sTxtAvMontadora.uiautocomplete("instance")._renderItem = function (ul, item) {
            let objLi = { class: "mdc-list-item p-0 item-montadora-" + item.label.replaceAll(' ', ''), tabIndex: "0" };
            if (primeiroRenderItemAutoC) {
                //objLi = { class: "mdc-list-item p-0 item-montadora-" + item.label, tabIndex: "0"};
            }
            let $li = $("<li>", objLi)
                .attr("role", "checkbox")
                //.attr('data-mdc-auto-init', "MDCRipple")
                .attr('aria-checked', listaMontadorasSelecionadas.indexOf(item.label) >= 0 ? 'true' : 'false')
                .attr('aria-label', item.label);
            if (listaMontadorasSelecionadas.indexOf(item.label) >= 0) {
                $li.addClass('mdc-list-item--selected');
            }

            $li.append('<span class="area-conteudo-item-lista"><span class="mdc-list-item__graphic">' +
                '<div class= "mdc-checkbox">' +
                '<input type="checkbox"' +
                '    class= "mdc-checkbox__native-control"' +
                '    id="list-checkbox-item-montadora-' + item.label.replaceAll(' ', '') + '" ' +
                (listaMontadorasSelecionadas.indexOf(item.label) >= 0 ? 'checked' : '') + ' /> ' +
                '<div class="mdc-checkbox__background">' +
                '    <svg class="mdc-checkbox__checkmark"' +
                '        viewBox="0 0 24 24">' +
                '        <path class="mdc-checkbox__checkmark-path"' +
                '            fill="none"' +
                '            d="M1.73,12.91 8.1,19.28 22.79,4.59" />' +
                '    </svg>' +
                '    <div class="mdc-checkbox__mixedmark"></div>' +
                '</div>' +
                '</div>' +
                '</span>' +
                '<label class="mdc-list-item__text" for="list-checkbox-item-montadora-' + item.label.replaceAll(' ', '') + '" style="' +
            (fontSize !== null && fontSize > 8 ? 'font-size: ' + fontSize + 'px;' : '') + 
            (ajusteMarginItemLista !== null ? 'margin: ' + ajusteMarginItemLista + ';' : '') + '">' + item.label + '</label></span>');


            return $li.appendTo(ul);
        };



        
        //Combobox autocomplete de Modelo
        let menuModeloAberto = false;

        let sTxtAvModelo = $("#txt-av-modelo", gpDivMaster);
        
        sTxtAvModelo
            // don't navigate away from the field on tab when selecting an item
            .on("focus", function () {
                if(!menuModeloAberto){
                    sTxtAvModelo.val(ultimoTermoPesquisadoModelo);
                    sTxtAvModelo.uiautocomplete("search", sTxtAvModelo.val());
                }
            }).on("blur", function () {
                mostrarAvModelosSelecionadas();
            }).on("keydown", function (event) {
                if (event.keyCode === $.ui.keyCode.TAB &&
                    $(this).uiautocomplete("instance").menu.active) {
                    event.preventDefault();
                }
            })
            .uiautocomplete({
                appendTo: window.gpDivMaster,
                minLength: 0,
                //source: availableTags,

                source: function (request, response) {
                    // delegate back to autocomplete, but extract the last term
                    if (!carregouDadosVeiculos) {
                        alertify.log('Modelos de Veículos em carregamento. Tente novamente em alguns instantes.');
                        response([]);
                        return;
                    }

                    let termo = request.term.trim();
                    ultimoTermoPesquisadoModelo = termo;
                    let termos = termo.split(' ');
                    let padroes = [];
                    for (var x = 0; x < termos.length; x++) {
                        let patt = new RegExp($.ui.autocomplete.escapeRegex(extractLast(termos[x])), "i");
                        padroes.push(patt);
                    }

                    let novaLista = [];
                    if (listaMontadorasSelecionadas.length === 0 && termo === '') {
                        novaLista = listaModelosFiltradas;
                    } else {
                        novaLista = _.filter(listaModelosFiltradas, function (item, index, array) {
                            if (listaMontadorasSelecionadas.length > 0 && listaMontadorasSelecionadas.indexOf(item.fabricante) < 0) {
                                return false;
                            }
                            for (var x = 0; x < padroes.length; x++) {
                                if (!padroes[x].test(item.modelo_base)) {
                                    return false;
                                }
                            }
                            return true;

                            //return listaMontadorasSelecionadas.indexOf(item.fabricante) >= 0 && patt.test(item.modelo_base);
                            //return item.id.indexOf(extractLast(request.term)) >= 0;
                        });
                    }

                    response(novaLista);

                    if (novaLista.length === 0) {
                        //console.log('tentou fechar ');
                        $(sTxtAvModelo.uiautocomplete("instance").menu.activeMenu).unbind("scroll");
                        setTimeout(function () {
                            //console.log('tentou fechar definitivo');
                            sTxtAvModelo.uiautocomplete("close");
                        }, 50);
                    }
                    /*response($.ui.autocomplete.filter(
                        availableTags, extractLast(request.term)));*/
                },
                focus: function (event, ui) {
                    // prevent value inserted on focus
                    return false;
                },
                select: function (event, ui) {
                    this.value = "";

                    let iModSel = listaModelosSelecionadas.findIndex(function (modSel) {
                        return modSel.fabricante === ui.item.fabricante &&
                            modSel.modelo_base === ui.item.modelo_base;
                    });
                    if (iModSel === -1) {
                        if (listaModelosSelecionadas.length > 0) {
                            //soh permite um selecionado entao desmarca o modelo anterior automaticamente
                            listaModelosSelecionadas = [];

                            mdBotaoVersao.disabled = true;
                            mdBotaoAno.disabled = true;

                            listaVersoesSelecionadas = [];
                            mostrarAvVersaosSelecionadas();
                            listaAnosSelecionados = [];
                            mostrarAvAnosSelecionadas();
                        }
                        //se a montadora nao estiver selecionada ainda seleciona a montadora automaticamente
                        if(listaMontadorasSelecionadas.length === 0){
                            listaMontadorasSelecionadas.push(ui.item.fabricante);
                            mostrarAvMontadorasSelecionadas();
                        }

                        let $itemModelo = $('.item-modelo-' + ui.item.codigo.toString().replace('@', 'arroba').replace('!', 'exclamacao').replaceAll(' ', ''), gpDivMaster);
                        let $checkItemModelo = $('#list-checkbox-item-modelo-' + ui.item.codigo.toString().replace('@', 'arroba').replace('!', 'exclamacao').replaceAll(' ', ''), gpDivMaster);

                        setTimeout(function () {
                            $itemModelo.addClass('mdc-list-item--selected');
                            $checkItemModelo.prop("checked", true);
                        }, 10);
                        listaModelosSelecionadas.push(ui.item);
                    } else {
                        let $itemModelo = $('.item-modelo-' + ui.item.codigo.toString().replace('@', 'arroba').replace('!', 'exclamacao').replaceAll(' ', ''), gpDivMaster);
                        let $checkItemModelo = $('#list-checkbox-item-modelo-' + ui.item.codigo.toString().replace('@', 'arroba').replace('!', 'exclamacao').replaceAll(' ', ''), gpDivMaster);
                        setTimeout(function () {
                            $itemModelo.removeClass('mdc-list-item--selected');
                            $checkItemModelo.prop("checked", false);
                        }, 10);
                        listaModelosSelecionadas.splice(iModSel, 1);
                    }

                    ultimoTermoPesquisadoVersao = '';
                    mostrarAvModelosSelecionadas();

                    if (listaModelosSelecionadas.length === 0) {
                        mdBotaoAno.disabled = true;
                        if (exfiaCombustivel) {
                            mdBotaoCombustivel.disabled = true;
                        }
                        if (exfiaMotorizacao) {
                            mdBotaoMotorizacao.disabled = true;
                        }
                        if (exfiaTracao) {
                            mdBotaoTracao.disabled = true;
                        }
                        mdBotaoVersao.disabled = true;


                        listaAnosSelecionados = [];
                        mostrarAvAnosSelecionadas();

                        listaVersoesSelecionadas = [];
                        mostrarAvVersaosSelecionadas();

                        listaCombustiveisSelecionadas = [];
                        mostrarAvCombustivelsSelecionadas();
                        listaMotorizacoesSelecionadas = [];
                        mostrarAvMotorizacoesSelecionadas();
                        listaTracoesSelecionadas = [];
                        mostrarAvTracoesSelecionadas();

                    } else {
                        filtrarAnos();
                        setTimeout(function () {
                            if (exfiaCombustivel) {
                                filtrarCombustiveis();
                            }
                            if (exfiaMotorizacao) {
                                filtrarMotorizacoes();
                            }
                            if (exfiaTracao) {
                                filtrarTracoes();
                            }
                            
                            filtrarVersoes();
                        }, 10);

                        mdBotaoAno.disabled = false;
                        if (exfiaCombustivel) {
                            mdBotaoCombustivel.disabled = false;
                        }
                        if (exfiaMotorizacao) {
                            mdBotaoMotorizacao.disabled = false;
                        }
                        if (exfiaTracao) {
                            mdBotaoTracao.disabled = false;
                        }
                                                
                        mdBotaoVersao.disabled = false;

                        

                        setTimeout(function () {
                            mdBotaoAno.focus();
                        }, 500);
                    }

                    listaSecoesSelecionadas = [];
                    if (exfiaSecao) {
                        mostrarAvSecoesSelecionadas();
                        mdBotaoSecao.disabled = true;
                    }

                    listaGruposSelecionadas = [];
                    if (exfiaSecao && exfiaGrupo) {
                        mostrarAvGruposSelecionadas();
                        mdBotaoGrupo.disabled = true;
                    }

                    return false;
                },
                open: function (event, ui) {
                    menuModeloAberto = true;
                }
            });
        let avModeloAutoCompleteInstance = sTxtAvModelo.uiautocomplete("instance");
        avModeloAutoCompleteInstance._suggest = gp_suggest;
        avModeloAutoCompleteInstance.close = function (e) {
            //if (readyToClose)
            let self = this;
            setTimeout(function () {
                //clearTimeout(self.closing),
                self.menu.element.is(":visible") && (
                    //self.menu.element.slideUp(),
                    self.menu.element.hide(), (typeof self.menu.deactivate === 'function' ? self.menu.deactivate() : true), self._trigger("close", e)
                );
                menuModeloAberto = false;
            }, 400);
        };
        sTxtAvModelo.uiautocomplete("instance")._renderMenu = function (ul, items) {
            var that = this;

            if (ultimoTermoPesquisadoModelo === '') {
                $(ul).unbind("scroll");

                //reset paginacao para scroll load
                window.pageIndex = 0;

                var self = this;
                self._scrollMenu(ul, items);
            } else {
                $(ul).unbind("scroll");

                $.each(items, function (index, item) {
                    if (index === 0) {
                        primeiroRenderItemAutoC = true;
                    } else {
                        primeiroRenderItemAutoC = false;
                    }
                    item.index = index;
                    that._renderItemData(ul, item);
                });
            }

            let $ul = $(ul);
            $ul.addClass("mdc-list mdc-elevation--z3 mdss-list mdss-list-modelo");
            $ul.attr("data-mdc-auto-init", "MDCList");
            $ul.attr("role", "group");
            $ul.find("li:odd").addClass("odd");
            mdc.autoInit();
        };
        sTxtAvModelo.uiautocomplete("instance")._renderItem = function (ul, item) {
            if (typeof item.codigo === 'undefined') {
                //console.log(item);
            }
            let objLi = { class: "mdc-list-item p-0 item-modelo-" + item.codigo.toString().replace('@', 'arroba').replace('!', 'exclamacao').replaceAll(' ', ''), tabIndex: "0" };
            if (primeiroRenderItemAutoC) {
                //objLi = { class: "mdc-list-item p-0", tabIndex: "0" };
            }
            let indexSelecionado = listaModelosSelecionadas.findIndex(function (modSel) {
                return modSel.fabricante === item.fabricante &&
                    modSel.modelo_base === item.modelo_base;
            });
            let $li = $("<li>", objLi)
                .attr("role", "checkbox")
                //.attr('data-mdc-auto-init', "MDCRipple")
                .attr('aria-checked', indexSelecionado >= 0 ? 'true' : 'false')
                .attr('aria-label', item.fabricante + item.modelo_base);
            if (indexSelecionado >= 0) {
                $li.addClass('mdc-list-item--selected');
            }

            $li.append('<span class="area-conteudo-item-lista"><span class="mdc-list-item__graphic">' +
                '<div class= "mdc-checkbox">' +
                '<input type="checkbox"' +
                '    class= "mdc-checkbox__native-control"' +
                '    id="list-checkbox-item-modelo-' + item.codigo.toString().replace('@', 'arroba').replace('!', 'exclamacao').replaceAll(' ', '') + '" ' +
                (indexSelecionado >= 0 ? 'checked' : '') + ' /> ' +
                '<div class="mdc-checkbox__background">' +
                '    <svg class="mdc-checkbox__checkmark"' +
                '        viewBox="0 0 24 24">' +
                '        <path class="mdc-checkbox__checkmark-path"' +
                '            fill="none"' +
                '            d="M1.73,12.91 8.1,19.28 22.79,4.59" />' +
                '    </svg>' +
                '    <div class="mdc-checkbox__mixedmark"></div>' +
                '</div>' +
                '</div>' +
                '</span>' +
                '<label class="mdc-list-item__text" for="list-checkbox-item-modelo-' + item.codigo.toString().replace('@', 'arroba').replace('!', 'exclamacao').replaceAll(' ', '') + '" style="' +
                (fontSize !== null && fontSize > 8 ? 'font-size: ' + fontSize + 'px;' : '') +
                (ajusteMarginItemLista !== null ? 'margin: ' + ajusteMarginItemLista + ';' : '') + '">' +
                item.modelo_base + '</label></span>');

            return $li.appendTo(ul);
        };







        let ultimaListaAnos = [];
        let ultimoLiRenderItemAnosTodos = null;
        let todosAnosMarcados = false;
        let executouSelectAntesCloseAno = false;
        let menuAnosAberto = false;

        //Combobox autocomplete de Anos
        let sTxtAvAno = $("#txt-av-ano", gpDivMaster);

        sTxtAvAno
            // don't navigate away from the field on tab when selecting an item
            .on("focus", function () {
                if(!menuAnosAberto){
                    sTxtAvAno.val('');
                    sTxtAvAno.uiautocomplete("search", sTxtAvAno.val());
                }
            }).on("blur", function () {
                //console.log('blur ano');
                mostrarAvAnosSelecionadas();
            }).on("keydown", function (event) {
                if (event.keyCode === $.ui.keyCode.TAB &&
                    $(this).uiautocomplete("instance").menu.active) {
                    event.preventDefault();
                }
            }).uiautocomplete({
                appendTo: window.gpDivMaster,
                minLength: 0,
                //source: availableTags,

                source: function (request, response) {
                    // delegate back to autocomplete, but extract the last term
                    let patt = new RegExp($.ui.autocomplete.escapeRegex(extractLast(request.term.trim())), "i");

                    let novaLista = _.filter(listaAnos, function (item, index, array) {
                        return patt.test(item);
                        //return item.id.indexOf(extractLast(request.term)) >= 0;
                    });

                    ultimaListaAnos = novaLista;
                    if (novaLista.length > 0) {
                        novaLista.unshift("TODOS");
                    } else {
                        let novoElemento = $('.area-rodape-menu-autocomplete-ano');
                        novoElemento.hide();
                    }

                    response(novaLista);
                },
                focus: function () {
                    // prevent value inserted on focus
                    
                    return false;
                },
                select: function (event, ui) {
                    //console.log('tentando EXECUTAR SELECTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT')
                    executouSelectAntesCloseAno = true;
                    this.value = "";
                    
                    if (ui.item.label === 'TODOS') {
                        let $itemAnoTodos = $('.item-ano-TODOS', gpDivMaster);
                        let $checkItemAnoTodos = $('#list-checkbox-item-ano-TODOS', gpDivMaster);
                        if ($itemAnoTodos.hasClass("mdc-list-item--selected")) {
                            //desmarca todos
                            
                            setTimeout(function () {
                                $('.item-ano', gpDivMaster).removeClass('mdc-list-item--selected');
                                $('.list-checkbox-item-ano', gpDivMaster).prop("checked", false);
                            }, 10);
                            listaAnosSelecionadosTemp = [];
                        } else {
                            //Marca todos
                            setTimeout(function () {
                                $itemAnoTodos.addClass("mdc-list-item--selected");
                                $checkItemAnoTodos.prop("checked", true);
                            }, 10);
                            for (var x = 0; x < ultimaListaAnos.length; x++) {
                                if (ultimaListaAnos[x] === 'TODOS') {
                                    continue;
                                }
                                let iSel = listaAnosSelecionadosTemp.findIndex(function (sel) {
                                    return sel === ultimaListaAnos[x];
                                });
                                let $itemAno = $('.item-ano-' + ultimaListaAnos[x], gpDivMaster);
                                let $checkItemAno = $('#list-checkbox-item-ano-' + ultimaListaAnos[x], gpDivMaster);
                                if (iSel === -1) {
                                    setTimeout(function () {
                                        $itemAno.addClass('mdc-list-item--selected');
                                        $checkItemAno.prop("checked", true);
                                    }, 10);
                                    listaAnosSelecionadosTemp.push(ultimaListaAnos[x]);
                                } else {
                                    //se ja esta na lista nao faz nada apenas mantem
                                }
                            }
                        }
                    } else {
                        let iSel = listaAnosSelecionadosTemp.findIndex(function (sel) {
                            return sel === ui.item.label;
                        });
                        let $itemAno = $('.item-ano-' + ui.item.label.replaceAll(' ', ''), gpDivMaster);
                        let $checkItemAno = $('#list-checkbox-item-ano-' + ui.item.label.replaceAll(' ', ''), gpDivMaster);
                        if (iSel === -1) {
                            setTimeout(function () {
                                $itemAno.addClass('mdc-list-item--selected');
                                $checkItemAno.prop("checked", true);
                            }, 10);
                            listaAnosSelecionadosTemp.push(ui.item.label);
                        } else {
                            setTimeout(function () {
                                $itemAno.removeClass('mdc-list-item--selected');
                                $checkItemAno.prop("checked", false);
                            }, 10);
                            listaAnosSelecionadosTemp.splice(iSel, 1);
                        }
                        let todosMarcados = true;
                        for (var y = 0; y < ultimaListaAnos.length; y++) {
                            if (ultimaListaAnos[y] === 'TODOS') {
                                continue;
                            }
                            let iSel = listaAnosSelecionadosTemp.findIndex(function (sel) {
                                return sel === ultimaListaAnos[y];
                            });
                            if (iSel === -1) {
                                todosMarcados = false;
                            }
                        }
                        let $itemAnoTodos = $('.item-ano-TODOS', gpDivMaster);
                        let $checkItemAnoTodos = $('#list-checkbox-item-ano-TODOS', gpDivMaster);
                        if (todosMarcados) {
                            $itemAnoTodos.addClass('mdc-list-item--selected');
                            $checkItemAnoTodos.prop("checked", true);
                        } else {
                            $itemAnoTodos.removeClass('mdc-list-item--selected');
                            $checkItemAnoTodos.prop("checked", false);
                        }
                    }


                    return false;
                },
                open: function (event, ui) {
                    menuAnosAberto = true;
                    

                    var $menu = sTxtAvAno.uiautocomplete("instance").menu.element;

                    let novoElemento = $('.area-rodape-menu-autocomplete-ano');
                    let jaExiste = true;
                    if (novoElemento.length === 0) {
                        novoElemento = $('<div/>').addClass('ui-front area-rodape-menu-autocomplete area-rodape-menu-autocomplete-ano ui-widget ui-widget-content mdc-elevation--z3 pertence-confirmar-combobox')
                            .html('               <div class="col-md-12 pt-2 pb-2 pertence-confirmar-combobox">' +
                            '<button class="mdc-button mdc-button--raised md-botao-cbautocomplete-aplicar col-md-12 pertence-confirmar-combobox">' +
                            '                   <div class="mdc-button__ripple pertence-confirmar-combobox"></div>' +
                            '                   <span class="mdc-button__label pertence-confirmar-combobox">Confirmar</span>' +
                            '               </button></div>').css({
                                'border-top': 0,
                                'margin-bottom': '-46px'
                            });
                        jaExiste = false;
                    }

                    novoElemento.outerWidth($menu.outerWidth());
                    if (!jaExiste) {
                        novoElemento
                            .insertAfter($menu);
                            
                    }
                    novoElemento.position({
                        my: 'right top-1',
                        at: 'right bottom',
                        of: $menu,
                        collision: "none"
                    });
                    setTimeout(function () {
                        novoElemento.position({
                            my: 'right top-1',
                            at: 'right bottom',
                            of: $menu,
                            collision: "none"
                        });
                    },50);
                    
                    novoElemento.show();
                    mdc.autoInit();

                    setTimeout(function () {
                        let scrollTopAtual = $('html').scrollTop();
                        let windowHeight = window.innerHeight;
                        let yScroll = $('.area-rodape-menu-autocomplete-ano').offset().top;
                        let diferencaY = (yScroll + 50) - (windowHeight + scrollTopAtual);
                        if (diferencaY > 0) {
                            let novoScrollTop = (yScroll + 50) - windowHeight;
                            $('html, body').animate({ scrollTop: novoScrollTop }, 100);
                        }
                    }, 100);
                }
            });
        $(gpDivMaster).on('click', '.area-rodape-menu-autocomplete-ano .md-botao-cbautocomplete-aplicar', function () {
            //console.log('click confirmar combobox');
            listaAnosSelecionados = [];
            for (var x = 0; x < listaAnosSelecionadosTemp.length; x++) {
                listaAnosSelecionados.push(listaAnosSelecionadosTemp[x]);
            }
            sTxtAvAno.uiautocomplete("instance").close();

            mostrarAvAnosSelecionadas();

            listaCombustiveisSelecionadas = [];
            if (exfiaCombustivel) {
                mostrarAvCombustivelsSelecionadas();
            }
            listaMotorizacoesSelecionadas = [];
            if (exfiaMotorizacao) {
                mostrarAvMotorizacoesSelecionadas();
            }
            listaTracoesSelecionadas = [];
            if (exfiaTracao) {
                mostrarAvTracoesSelecionadas();
            }
            listaVersoesSelecionadas = [];
            mostrarAvVersaosSelecionadas();


            if (exfiaCombustivel) {
                filtrarCombustiveis();
            }
            if (exfiaMotorizacao) {
                filtrarMotorizacoes();
            }
            if (exfiaTracao) {
                filtrarTracoes();
            }
            filtrarVersoes();

            if (exfiaCombustivel) {
                mdBotaoCombustivel.disabled = false;
            }
            if (exfiaMotorizacao) {
                mdBotaoMotorizacao.disabled = false;
            }
            if (exfiaTracao) {
                mdBotaoTracao.disabled = false;
            }
            mdBotaoVersao.disabled = false;

            setTimeout(function () {
                if (exfiaCombustivel) {
                    mdBotaoCombustivel.focus();
                } else if (exfiaMotorizacao) {
                    mdBotaoMotorizacao.focus();
                } else if (exfiaTracao) {
                    mdBotaoTracao.focus();
                } else {
                    mdBotaoVersao.focus();
                }
            }, 500);
        });
        let avAnoAutoCompleteInstance = sTxtAvAno.uiautocomplete("instance");
        avAnoAutoCompleteInstance._suggest = gp_suggest;
        avAnoAutoCompleteInstance.close = function (e) {
            //return false;
            if (ultimoTargetClicado !== null && ultimoTargetClicado.hasClass('pertence-confirmar-combobox')) {
                return false;
            }
            console.log('close-autocomplete');
            if (executouSelectAntesCloseAno) {
                //nao fecha,
                executouSelectAntesCloseAno = false;
                return false;
            } else {
                mantemAnosTemp = false;
                console.log('zerou a lista listaAnosSelecionadosTemp')
                listaAnosSelecionadosTemp = [];
                let self = this;
                setTimeout(function () {
                    //clearTimeout(self.closing),
                    let novoElemento = $('.area-rodape-menu-autocomplete-ano');
                    novoElemento.hide();
                    self.menu.element.is(":visible") && (
                        //self.menu.element.slideUp(),
                        self.menu.element.hide(), (typeof self.menu.deactivate === 'function' ? self.menu.deactivate() : true), self._trigger("close", e)
                    );
                    menuAnosAberto = false;
                }, 300);
            }
        };
        sTxtAvAno.uiautocomplete("instance")._renderMenu = function (ul, items) {
            var that = this;

            if (!mantemAnosTemp) {
                for (var x = 0; x < listaAnosSelecionados.length; x++) {
                    listaAnosSelecionadosTemp.push(listaAnosSelecionados[x]);
                }
                mantemAnosTemp = true;
            }

            todosAnosMarcados = true;
            $.each(items, function (index, item) {
                if (index === 0) {
                    primeiroRenderItemAutoC = true;
                } else {
                    primeiroRenderItemAutoC = false;
                }
                item.index = index;
                that._renderItemData(ul, item);
            });

            if (todosAnosMarcados) {
                ultimoLiRenderItemAnosTodos.addClass('mdc-list-item--selected');
                ultimoLiRenderItemAnosTodos.find('#list-checkbox-item-ano-TODOS').prop('checked', true);
            }

            let $ul = $(ul);
            $ul.addClass("mdc-list mdc-elevation--z3 mdss-list mdss-list-ano");
            $ul.attr("data-mdc-auto-init", "MDCList");
            $ul.attr("role", "group");
            $ul.find("li:odd").addClass("odd");
            mdc.autoInit();
        };
        sTxtAvAno.uiautocomplete("instance")._renderItem = function (ul, item) {
            let objLi = { class: "mdc-list-item p-0 item-ano item-ano-" + item.label.replaceAll(' ', ''), tabIndex: "0" };
            if (primeiroRenderItemAutoC) {
                //objLi = { class: "mdc-list-item p-0", tabIndex: "0" };
            }
            let indexSelecionado = listaAnosSelecionadosTemp.findIndex(function (sel) {
                return sel === item.label;
            });

            let $li = $("<li>", objLi)
                .attr("role", "checkbox")
                .attr('aria-checked', indexSelecionado >= 0 ? 'true' : 'false');
            if (item.label === 'TODOS') {
                ultimoLiRenderItemAnosTodos = $li;
            }

            if (indexSelecionado >= 0) {
                $li.addClass('mdc-list-item--selected');
            } else {
                if (item.label !== 'TODOS') {
                    todosAnosMarcados = false;
                }
            }

            $li.append('<span class="area-conteudo-item-lista"><span class="mdc-list-item__graphic">' +
                '<div class= "mdc-checkbox">' +
                '<input type="checkbox"' +
                '    class= "mdc-checkbox__native-control list-checkbox-item-ano"' +
                '    id="list-checkbox-item-ano-' + item.label.replaceAll(' ', '') + '" ' +
                (indexSelecionado >= 0 ? 'checked' : '') + ' /> ' +
                '<div class="mdc-checkbox__background">' +
                '    <svg class="mdc-checkbox__checkmark"' +
                '        viewBox="0 0 24 24">' +
                '        <path class="mdc-checkbox__checkmark-path"' +
                '            fill="none"' +
                '            d="M1.73,12.91 8.1,19.28 22.79,4.59" />' +
                '    </svg>' +
                '    <div class="mdc-checkbox__mixedmark"></div>' +
                '</div>' +
                '</div>' +
                '</span>' +
                '<label class="mdc-list-item__text" for="list-checkbox-item-ano-' + item.label.replaceAll(' ', '') + '" style="' +
                (fontSize !== null && fontSize > 8 ? 'font-size: ' + fontSize + 'px;' : '') +
                (ajusteMarginItemLista !== null ? 'margin: ' + ajusteMarginItemLista + ';' : '') + '">' +
                item.label + '</label></span>');

            return $li.appendTo(ul);
        };




        let ultimaListaCombustivels = [];
        let ultimoLiRenderItemCombustivelsTodos = null;
        let todosCombustivelMarcados = false;
        let executouSelectAntesCloseCombustivel = false;
        let menuCombustivelAberto = false;

        if (exfiaCombustivel) {

            //Combobox autocomplete de Anos
            let sTxtAvCombustivel = $("#txt-av-combustivel", gpDivMaster);

            //Combustivel
            sTxtAvCombustivel
                // don't navigate away from the field on tab when selecting an item
                .on("focus", function () {
                    if(!menuCombustivelAberto){
                        sTxtAvCombustivel.val('');
                        sTxtAvCombustivel.uiautocomplete("search", sTxtAvCombustivel.val());
                    }
                }).on("blur", function () {
                    mostrarAvCombustivelsSelecionadas();
                }).on("keydown", function (event) {
                    if (event.keyCode === $.ui.keyCode.TAB &&
                        $(this).uiautocomplete("instance").menu.active) {
                        event.preventDefault();
                    }
                })
                .uiautocomplete({
                    appendTo: window.gpDivMaster,
                    minLength: 0,
                    //source: availableTags,

                    source: function (request, response) {
                        // delegate back to autocomplete, but extract the last term
                        let patt = new RegExp($.ui.autocomplete.escapeRegex(extractLast(request.term.trim())), "i");

                        let novaLista = _.filter(listaCombustiveis, function (item, index, array) {
                            return patt.test(item);
                        });

                        ultimaListaCombustivels = novaLista;
                        if (novaLista.length > 0) {
                            novaLista.unshift("TODOS");
                        } else {
                            let novoElemento = $('.area-rodape-menu-autocomplete-combustivel');
                            novoElemento.hide();
                        }

                        response(novaLista);
                    },
                    focus: function () {
                        // prevent value inserted on focus
                        return false;
                    },
                    select: function (event, ui) {
                        executouSelectAntesCloseCombustivel = true;
                        this.value = "";

                        if (ui.item.label === 'TODOS') {
                            let $itemTodos = $('.item-combustivel-TODOS', gpDivMaster);
                            let $checkItemTodos = $('#list-checkbox-item-combustivel-TODOS', gpDivMaster);
                            if ($itemTodos.hasClass("mdc-list-item--selected")) {
                                //desmarca todos
                                setTimeout(function () {
                                    $('.item-combustivel', gpDivMaster).removeClass('mdc-list-item--selected');
                                    $('.list-checkbox-item-combustivel', gpDivMaster).prop("checked", false);
                                }, 10);
                                listaCombustiveisSelecionadasTemp = [];
                            } else {
                                //Marca todos
                                setTimeout(function () {
                                    $itemTodos.addClass("mdc-list-item--selected");
                                    $checkItemTodos.prop("checked", true);
                                }, 10);
                                for (var x = 0; x < ultimaListaCombustivels.length; x++) {
                                    if (ultimaListaCombustivels[x] === 'TODOS') {
                                        continue;
                                    }
                                    let iSel = listaCombustiveisSelecionadasTemp.findIndex(function (sel) {
                                        return sel === ultimaListaCombustivels[x];
                                    });
                                    let $item = $('.item-combustivel-' + ultimaListaCombustivels[x], gpDivMaster);
                                    let $checkItem = $('#list-checkbox-item-combustivel-' + ultimaListaCombustivels[x], gpDivMaster);
                                    if (iSel === -1) {
                                        setTimeout(function () {
                                            $item.addClass('mdc-list-item--selected');
                                            $checkItem.prop("checked", true);
                                        }, 10);
                                        listaCombustiveisSelecionadasTemp.push(ultimaListaCombustivels[x]);
                                    } else {
                                        //se ja esta na lista nao faz nada apenas mantem
                                    }
                                }
                            }
                        } else {
                            let iSel = listaCombustiveisSelecionadasTemp.findIndex(function (sel) {
                                return sel === ui.item.label;
                            });
                            let $item = $('.item-combustivel-' + ui.item.label.replaceAll(' ', ''), gpDivMaster);
                            let $checkItem = $('#list-checkbox-item-combustivel-' + ui.item.label.replaceAll(' ', ''), gpDivMaster);
                            if (iSel === -1) {
                                setTimeout(function () {
                                    $item.addClass('mdc-list-item--selected');
                                    $checkItem.prop("checked", true);
                                }, 10);
                                listaCombustiveisSelecionadasTemp.push(ui.item.label);
                            } else {
                                setTimeout(function () {
                                    $item.removeClass('mdc-list-item--selected');
                                    $checkItem.prop("checked", false);
                                }, 10);
                                listaCombustiveisSelecionadasTemp.splice(iSel, 1);
                            }
                            let todosMarcados = true;
                            for (var y = 0; y < ultimaListaCombustivels.length; y++) {
                                if (ultimaListaCombustivels[y] === 'TODOS') {
                                    continue;
                                }
                                let iSel = listaCombustiveisSelecionadasTemp.findIndex(function (sel) {
                                    return sel === ultimaListaCombustivels[y];
                                });
                                if (iSel === -1) {
                                    todosMarcados = false;
                                }
                            }
                            let $itemTodos = $('.item-combustivel-TODOS', gpDivMaster);
                            let $checkItemTodos = $('#list-checkbox-item-combustivel-TODOS', gpDivMaster);
                            if (todosMarcados) {
                                $itemTodos.addClass('mdc-list-item--selected');
                                $checkItemTodos.prop("checked", true);
                            } else {
                                $itemTodos.removeClass('mdc-list-item--selected');
                                $checkItemTodos.prop("checked", false);
                            }
                        }

                        return false;
                    },
                    open: function (event, ui) {
                        menuCombustivelAberto = true;
                        console.log('open-autocomplete');

                        let $menu = sTxtAvCombustivel.uiautocomplete("instance").menu.element;


                        let novoElemento = $('.area-rodape-menu-autocomplete-combustivel');
                        let jaExiste = true;
                        if (novoElemento.length === 0) {
                            novoElemento = $('<div/>').addClass('ui-front area-rodape-menu-autocomplete area-rodape-menu-autocomplete-combustivel ui-widget ui-widget-content mdc-elevation--z3 pertence-confirmar-combobox')
                                .html('               <div class="col-md-12 pt-2 pb-2 pertence-confirmar-combobox">' +
                                    '<button class="mdc-button mdc-button--raised md-botao-cbautocomplete-aplicar col-md-12 pertence-confirmar-combobox">' +
                                    '                   <div class="mdc-button__ripple pertence-confirmar-combobox"></div>' +
                                    '                   <span class="mdc-button__label pertence-confirmar-combobox">Confirmar</span>' +
                                    '               </button></div>').css({
                                        'border-top': 0,
                                        'margin-bottom': '-46px'
                                    });
                            jaExiste = false;
                        }

                        novoElemento.outerWidth($menu.outerWidth());
                        if (!jaExiste) {
                            novoElemento
                                .insertAfter($menu);

                        }
                        novoElemento.position({
                            my: 'right top-1',
                            at: 'right bottom',
                            of: $menu,
                            collision: "none"
                        });
                        setTimeout(function () {
                            novoElemento.position({
                                my: 'right top-1',
                                at: 'right bottom',
                                of: $menu,
                                collision: "none"
                            });
                        }, 50);

                        novoElemento.show();
                        mdc.autoInit();

                        setTimeout(function () {
                            let scrollTopAtual = $('html').scrollTop();
                            let windowHeight = window.innerHeight;
                            let yScroll = $('.area-rodape-menu-autocomplete-combustivel').offset().top;
                            let diferencaY = (yScroll + 50) - (windowHeight + scrollTopAtual);
                            if (diferencaY > 0) {
                                let novoScrollTop = (yScroll + 50) - windowHeight;
                                $('html, body').animate({ scrollTop: novoScrollTop }, 100);
                            }
                        }, 100);
                    }
                });
            $(gpDivMaster).on('click', '.area-rodape-menu-autocomplete-combustivel .md-botao-cbautocomplete-aplicar', function () {
                console.log('click confirmar combobox');
                listaCombustiveisSelecionadas = [];
                for (var x = 0; x < listaCombustiveisSelecionadasTemp.length; x++) {
                    listaCombustiveisSelecionadas.push(listaCombustiveisSelecionadasTemp[x]);
                }
                sTxtAvCombustivel.uiautocomplete("instance").close();

                mostrarAvCombustivelsSelecionadas();

                listaMotorizacoesSelecionadas = [];
                if (exfiaMotorizacao) {
                    mostrarAvMotorizacoesSelecionadas();
                }
                
                listaTracoesSelecionadas = [];
                if (exfiaTracao) {
                    mostrarAvTracoesSelecionadas();
                }
                listaVersoesSelecionadas = [];
                mostrarAvVersaosSelecionadas();
                if (exfiaMotorizacao) {
                    filtrarMotorizacoes();
                }
                if (exfiaTracao) {
                    filtrarTracoes();
                }
                filtrarVersoes();

                if (exfiaMotorizacao) {
                    mdBotaoMotorizacao.disabled = false;
                } else if (exfiaTracao) {
                    mdBotaoTracao.disabled = false;
                }

                setTimeout(function () {
                    if (exfiaMotorizacao) {
                        mdBotaoMotorizacao.focus();
                    } else if (exfiaTracao) {
                        mdBotaoTracao.focus();
                    } else {
                        mdBotaoVersao.focus();
                    }
                }, 500);
            });
            let avCombustivelAutoCompleteInstance = sTxtAvCombustivel.uiautocomplete("instance");
            avCombustivelAutoCompleteInstance._suggest = gp_suggest;
            avCombustivelAutoCompleteInstance.close = function (e) {
                //return false;
                if (ultimoTargetClicado !== null && ultimoTargetClicado.hasClass('pertence-confirmar-combobox')) {
                    return false;
                }
                console.log('close-autocomplete');
                if (executouSelectAntesCloseCombustivel) {
                    //nao fecha,
                    executouSelectAntesCloseCombustivel = false;
                    return false;
                } else {
                    mantemCombustiveisTemp = false;
                    listaCombustiveisSelecionadasTemp = [];
                    let self = this;
                    setTimeout(function () {
                        //clearTimeout(self.closing),
                        let novoElemento = $('.area-rodape-menu-autocomplete-combustivel');
                        novoElemento.hide();
                        self.menu.element.is(":visible") && (
                            //self.menu.element.slideUp(),
                            self.menu.element.hide(), (typeof self.menu.deactivate === 'function' ? self.menu.deactivate() : true), self._trigger("close", e)
                        );
                        menuCombustivelAberto = false;
                    }, 300);
                }
            };
            sTxtAvCombustivel.uiautocomplete("instance")._renderMenu = function (ul, items) {
                var that = this;

                if (!mantemCombustiveisTemp) {
                    for (var x = 0; x < listaCombustiveisSelecionadas.length; x++) {
                        listaCombustiveisSelecionadasTemp.push(listaCombustiveisSelecionadas[x]);
                    }
                    mantemCombustiveisTemp = true;
                }

                todosCombustivelMarcados = true;
                $.each(items, function (index, item) {
                    if (index === 0) {
                        primeiroRenderItemAutoC = true;
                    } else {
                        primeiroRenderItemAutoC = false;
                    }
                    item.index = index;
                    that._renderItemData(ul, item);
                });

                if (todosCombustivelMarcados) {
                    ultimoLiRenderItemCombustivelsTodos.addClass('mdc-list-item--selected');
                    ultimoLiRenderItemCombustivelsTodos.find('#list-checkbox-item-combustivel-TODOS').prop('checked', true);
                }

                let $ul = $(ul);
                $ul.addClass("mdc-list mdc-elevation--z3 mdss-list mdss-list-combustivel");
                $ul.attr("data-mdc-auto-init", "MDCList");
                $ul.attr("role", "group");
                $ul.find("li:odd").addClass("odd");
                mdc.autoInit();
            };
            sTxtAvCombustivel.uiautocomplete("instance")._renderItem = function (ul, item) {
                let objLi = { class: "mdc-list-item p-0 item-combustivel item-combustivel-" + item.label.replaceAll(' ', ''), tabIndex: "0" };
                if (primeiroRenderItemAutoC) {
                    //objLi = { class: "mdc-list-item p-0", tabIndex: "0" };
                }
                let indexSelecionado = listaCombustiveisSelecionadasTemp.findIndex(function (sel) {
                    return sel === item.label;
                });

                let $li = $("<li>", objLi)
                    .attr("role", "checkbox")
                    //.attr('data-mdc-auto-init', "MDCRipple")
                    .attr('aria-checked', indexSelecionado >= 0 ? 'true' : 'false');
                if (item.label === 'TODOS') {
                    ultimoLiRenderItemCombustivelsTodos = $li;
                }

                if (indexSelecionado >= 0) {
                    $li.addClass('mdc-list-item--selected');
                } else {
                    if (item.label !== 'TODOS') {
                        todosCombustivelMarcados = false;
                    }
                }

                $li.append('<span class="area-conteudo-item-lista"><span class="mdc-list-item__graphic">' +
                    '<div class= "mdc-checkbox">' +
                    '<input type="checkbox"' +
                    '    class= "mdc-checkbox__native-control list-checkbox-item-combustivel"' +
                    '    id="list-checkbox-item-combustivel-' + item.label.replaceAll(' ', '') + '" ' +
                    (indexSelecionado >= 0 ? 'checked' : '') + ' /> ' +
                    '<div class="mdc-checkbox__background">' +
                    '    <svg class="mdc-checkbox__checkmark"' +
                    '        viewBox="0 0 24 24">' +
                    '        <path class="mdc-checkbox__checkmark-path"' +
                    '            fill="none"' +
                    '            d="M1.73,12.91 8.1,19.28 22.79,4.59" />' +
                    '    </svg>' +
                    '    <div class="mdc-checkbox__mixedmark"></div>' +
                    '</div>' +
                    '</div>' +
                    '</span>' +
                    '<label class="mdc-list-item__text" for="list-checkbox-item-combustivel-' + item.label.replaceAll(' ', '') + '" style="' +
                    (fontSize !== null && fontSize > 8 ? 'font-size: ' + fontSize + 'px;' : '') +
                    (ajusteMarginItemLista !== null ? 'margin: ' + ajusteMarginItemLista + ';' : '') + '">' +
                    item.label + '</label></span>');

                return $li.appendTo(ul);
            };
            sTxtAvCombustivel.uiautocomplete("instance")._resizeMenu = function () {
                var ul = this.menu.element;

                ul.outerWidth(Math.max(

                    // Firefox wraps long text (possibly a rounding bug)
                    // so we add 1px to avoid the wrapping (#7513)
                    ul.width("").outerWidth() + 51,
                    this.element.outerWidth()
                ));
            };
        }
      




        let ultimaListaMotorizacoes = [];
        let ultimoLiRenderItemMotorizacoesTodos = null;
        let todosMotorizacaoMarcados = false;
        let executouSelectAntesCloseMotorizacao = false;
        let menuMotorizacaoAberto = false;
        if (exfiaMotorizacao) {
            //Combobox autocomplete de Motorizacao
            let sTxtAvMotorizacao = $("#txt-av-motorizacao", gpDivMaster);
            
            sTxtAvMotorizacao
                // don't navigate away from the field on tab when selecting an item
                .on("focus", function () {
                    if(!menuMotorizacaoAberto){
                        sTxtAvMotorizacao.val('');
                        sTxtAvMotorizacao.uiautocomplete("search", sTxtAvMotorizacao.val());
                    }
                }).on("blur", function () {
                    mostrarAvMotorizacoesSelecionadas();
                }).on("keydown", function (event) {
                    if (event.keyCode === $.ui.keyCode.TAB &&
                        $(this).uiautocomplete("instance").menu.active) {
                        event.preventDefault();
                    }
                })
                .uiautocomplete({
                    appendTo: window.gpDivMaster,
                    minLength: 0,
                    //source: availableTags,

                    source: function (request, response) {
                        // delegate back to autocomplete, but extract the last term
                        let patt = new RegExp($.ui.autocomplete.escapeRegex(extractLast(request.term.trim())), "i");

                        let novaLista = _.filter(listaMotorizacoes, function (item, index, array) {
                            return patt.test(item);
                        })

                        ultimaListaMotorizacoes = novaLista;
                        if (novaLista.length > 0) {
                            novaLista.unshift("TODOS");
                        } else {
                            let novoElemento = $('.area-rodape-menu-autocomplete-motorizacao');
                            novoElemento.hide();
                        }

                        response(novaLista);
                    },
                    focus: function () {
                        // prevent value inserted on focus
                        return false;
                    },
                    select: function (event, ui) {
                        executouSelectAntesCloseMotorizacao = true;
                        this.value = "";

                        if (ui.item.label === 'TODOS') {
                            let $itemTodos = $('.item-motorizacao-TODOS', gpDivMaster);
                            let $checkItemTodos = $('#list-checkbox-item-motorizacao-TODOS', gpDivMaster);
                            if ($itemTodos.hasClass("mdc-list-item--selected")) {
                                //desmarca todos

                                setTimeout(function () {
                                    $('.item-motorizacao', gpDivMaster).removeClass('mdc-list-item--selected');
                                    $('.list-checkbox-item-motorizacao', gpDivMaster).prop("checked", false);
                                }, 10);
                                listaMotorizacoesSelecionadasTemp = [];
                            } else {
                                //Marca todos
                                setTimeout(function () {
                                    $itemTodos.addClass("mdc-list-item--selected");
                                    $checkItemTodos.prop("checked", true);
                                }, 10);
                                for (var x = 0; x < ultimaListaMotorizacoes.length; x++) {
                                    if (ultimaListaMotorizacoes[x] === 'TODOS') {
                                        continue;
                                    }
                                    let iSel = listaMotorizacoesSelecionadasTemp.findIndex(function (sel) {
                                        return sel === ultimaListaMotorizacoes[x];
                                    });
                                    let $item = $('.item-motorizacao-' + ultimaListaMotorizacoes[x].replaceAll(' ', '').replaceAll('[\.]', 'ponto'), gpDivMaster);
                                    let $checkItem = $('#list-checkbox-item-motorizacao-' + ultimaListaMotorizacoes[x].replaceAll(' ', '').replaceAll('[\.]', 'ponto'), gpDivMaster);
                                    if (iSel === -1) {
                                        setTimeout(function () {
                                            $item.addClass('mdc-list-item--selected');
                                            $checkItem.prop("checked", true);
                                        }, 10);
                                        listaMotorizacoesSelecionadasTemp.push(ultimaListaMotorizacoes[x]);
                                    } else {
                                        //se ja esta na lista nao faz nada apenas mantem
                                    }
                                }
                            }
                        } else {
                            let iSel = listaMotorizacoesSelecionadasTemp.findIndex(function (sel) {
                                return sel === ui.item.label;
                            });
                            let $item = $('.item-motorizacao-' + ui.item.label.replaceAll(' ', '').replaceAll('[\.]', 'ponto'), gpDivMaster);
                            let $checkItem = $('#list-checkbox-item-motorizacao-' + ui.item.label.replaceAll(' ', '').replaceAll('[\.]', 'ponto'), gpDivMaster);
                            if (iSel === -1) {
                                setTimeout(function () {
                                    $item.addClass('mdc-list-item--selected');
                                    $checkItem.prop("checked", true);
                                }, 10);
                                listaMotorizacoesSelecionadasTemp.push(ui.item.label);
                            } else {
                                setTimeout(function () {
                                    $item.removeClass('mdc-list-item--selected');
                                    $checkItem.prop("checked", false);
                                }, 10);
                                listaMotorizacoesSelecionadasTemp.splice(iSel, 1);
                            }
                            let todosMarcados = true;
                            for (var y = 0; y < ultimaListaMotorizacoes.length; y++) {
                                if (ultimaListaMotorizacoes[y] === 'TODOS') {
                                    continue;
                                }
                                let iSel = listaMotorizacoesSelecionadasTemp.findIndex(function (sel) {
                                    return sel === ultimaListaMotorizacoes[y];
                                });
                                if (iSel === -1) {
                                    todosMarcados = false;
                                }
                            }
                            let $itemTodos = $('.item-motorizacao-TODOS', gpDivMaster);
                            let $checkItemTodos = $('#list-checkbox-item-motorizacao-TODOS', gpDivMaster);
                            if (todosMarcados) {
                                $itemTodos.addClass('mdc-list-item--selected');
                                $checkItemTodos.prop("checked", true);
                            } else {
                                $itemTodos.removeClass('mdc-list-item--selected');
                                $checkItemTodos.prop("checked", false);
                            }
                        }

                        return false;
                    },
                    open: function (event, ui) {
                        menuMotorizacaoAberto = true;
                        console.log('open-autocomplete');

                        var $menu = sTxtAvMotorizacao.uiautocomplete("instance").menu.element;

                        let novoElemento = $('.area-rodape-menu-autocomplete-motorizacao');
                        let jaExiste = true;
                        if (novoElemento.length === 0) {
                            novoElemento = $('<div/>').addClass('ui-front area-rodape-menu-autocomplete area-rodape-menu-autocomplete-motorizacao ui-widget ui-widget-content mdc-elevation--z3 pertence-confirmar-combobox')
                                .html('               <div class="col-md-12 pt-2 pb-2 pertence-confirmar-combobox">' +
                                    '<button class="mdc-button mdc-button--raised md-botao-cbautocomplete-aplicar col-md-12 pertence-confirmar-combobox">' +
                                    '                   <div class="mdc-button__ripple pertence-confirmar-combobox"></div>' +
                                    '                   <span class="mdc-button__label pertence-confirmar-combobox">Confirmar</span>' +
                                    '               </button></div>').css({
                                        'border-top': 0,
                                        'margin-bottom': '-46px'
                                    });
                            jaExiste = false;
                        }

                        novoElemento.outerWidth($menu.outerWidth());
                        if (!jaExiste) {
                            novoElemento
                                .insertAfter($menu);

                        }
                        novoElemento.position({
                            my: 'right top-1',
                            at: 'right bottom',
                            of: $menu,
                            collision: "none"
                        });
                        setTimeout(function () {
                            novoElemento.position({
                                my: 'right top-1',
                                at: 'right bottom',
                                of: $menu,
                                collision: "none"
                            });
                        }, 50);

                        novoElemento.show();
                        mdc.autoInit();

                        setTimeout(function () {
                            let scrollTopAtual = $('html').scrollTop();
                            let windowHeight = window.innerHeight;
                            let yScroll = $('.area-rodape-menu-autocomplete-motorizacao').offset().top;
                            let diferencaY = (yScroll + 50) - (windowHeight + scrollTopAtual);
                            if (diferencaY > 0) {
                                let novoScrollTop = (yScroll + 50) - windowHeight;
                                $('html, body').animate({ scrollTop: novoScrollTop }, 100);
                            }
                        }, 100);
                    }
                });
            $(gpDivMaster).on('click', '.area-rodape-menu-autocomplete-motorizacao .md-botao-cbautocomplete-aplicar', function () {
                console.log('click confirmar combobox');
                listaMotorizacoesSelecionadas = [];
                for (var x = 0; x < listaMotorizacoesSelecionadasTemp.length; x++) {
                    listaMotorizacoesSelecionadas.push(listaMotorizacoesSelecionadasTemp[x]);
                }
                sTxtAvMotorizacao.uiautocomplete("instance").close();

                mostrarAvMotorizacoesSelecionadas();

                listaTracoesSelecionadas = [];
                if (exfiaTracao) {
                    mostrarAvTracoesSelecionadas();
                }
                listaVersoesSelecionadas = [];
                mostrarAvVersaosSelecionadas();

                if (exfiaTracao) {
                    filtrarTracoes();
                }
                filtrarVersoes();

                if (exfiaTracao) {
                    mdBotaoTracao.disabled = false;
                }


                setTimeout(function () {
                    if (exfiaTracao) {
                        mdBotaoTracao.focus();
                    } else {
                        mdBotaoVersao.focus();
                    }
                }, 500);
            });
            let avMotorizacaoAutoCompleteInstance = sTxtAvMotorizacao.uiautocomplete("instance");
            avMotorizacaoAutoCompleteInstance._suggest = gp_suggest;
            avMotorizacaoAutoCompleteInstance.close = function (e) {
                //return false;
                if (ultimoTargetClicado !== null && ultimoTargetClicado.hasClass('pertence-confirmar-combobox')) {
                    return false;
                }
                console.log('close-autocomplete');
                if (executouSelectAntesCloseMotorizacao) {
                    //nao fecha,
                    executouSelectAntesCloseMotorizacao = false;
                    return false;
                } else {
                    mantemMotorizacoesTemp = false;
                    listaMotorizacoesSelecionadasTemp = [];
                    let self = this;
                    setTimeout(function () {
                        //clearTimeout(self.closing),
                        let novoElemento = $('.area-rodape-menu-autocomplete-motorizacao');
                        novoElemento.hide();
                        self.menu.element.is(":visible") && (
                            //self.menu.element.slideUp(),
                            self.menu.element.hide(), (typeof self.menu.deactivate === 'function' ? self.menu.deactivate() : true), self._trigger("close", e)
                        );
                        menuMotorizacaoAberto = false;
                    }, 300);
                }
            };
            sTxtAvMotorizacao.uiautocomplete("instance")._renderMenu = function (ul, items) {
                var that = this;

                if (!mantemMotorizacoesTemp) {
                    for (var x = 0; x < listaMotorizacoesSelecionadas.length; x++) {
                        listaMotorizacoesSelecionadasTemp.push(listaMotorizacoesSelecionadas[x]);
                    }
                    mantemMotorizacoesTemp = true;
                }

                todosMotorizacaoMarcados = true;
                $.each(items, function (index, item) {
                    if (index === 0) {
                        primeiroRenderItemAutoC = true;
                    } else {
                        primeiroRenderItemAutoC = false;
                    }
                    item.index = index;
                    that._renderItemData(ul, item);
                });

                if (todosMotorizacaoMarcados) {
                    ultimoLiRenderItemMotorizacoesTodos.addClass('mdc-list-item--selected');
                    ultimoLiRenderItemMotorizacoesTodos.find('#list-checkbox-item-motorizacao-TODOS').prop('checked', true);
                }

                let $ul = $(ul);
                $ul.addClass("mdc-list mdc-elevation--z3 mdss-list mdss-list-motorizacao");
                $ul.attr("data-mdc-auto-init", "MDCList");
                $ul.attr("role", "group");
                $ul.find("li:odd").addClass("odd");
                mdc.autoInit();
            };
            sTxtAvMotorizacao.uiautocomplete("instance")._renderItem = function (ul, item) {
                let objLi = { class: "mdc-list-item p-0 item-motorizacao item-motorizacao-" + item.label.replaceAll(' ', '').replaceAll('[\.]', 'ponto'), tabIndex: "0" };
                if (primeiroRenderItemAutoC) {
                    //objLi = { class: "mdc-list-item p-0", tabIndex: "0" };
                }
                let indexSelecionado = listaMotorizacoesSelecionadasTemp.findIndex(function (sel) {
                    return sel === item.label;
                });

                let $li = $("<li>", objLi)
                    .attr("role", "checkbox")
                    .attr('aria-checked', indexSelecionado >= 0 ? 'true' : 'false');
                if (item.label === 'TODOS') {
                    ultimoLiRenderItemMotorizacoesTodos = $li;
                }

                if (indexSelecionado >= 0) {
                    $li.addClass('mdc-list-item--selected');
                } else {
                    if (item.label !== 'TODOS') {
                        todosMotorizacaoMarcados = false;
                    }
                }

                $li.append('<span class="area-conteudo-item-lista"><span class="mdc-list-item__graphic">' +
                    '<div class= "mdc-checkbox">' +
                    '<input type="checkbox"' +
                    '    class= "mdc-checkbox__native-control list-checkbox-item-motorizacao"' +
                    '    id="list-checkbox-item-motorizacao-' + item.label.replaceAll(' ', '').replaceAll('[\.]', 'ponto') + '" ' +
                    (indexSelecionado >= 0 ? 'checked' : '') + ' /> ' +
                    '<div class="mdc-checkbox__background">' +
                    '    <svg class="mdc-checkbox__checkmark"' +
                    '        viewBox="0 0 24 24">' +
                    '        <path class="mdc-checkbox__checkmark-path"' +
                    '            fill="none"' +
                    '            d="M1.73,12.91 8.1,19.28 22.79,4.59" />' +
                    '    </svg>' +
                    '    <div class="mdc-checkbox__mixedmark"></div>' +
                    '</div>' +
                    '</div>' +
                    '</span>' +
                    '<label class="mdc-list-item__text" for="list-checkbox-item-motorizacao-' + item.label.replaceAll(' ', '').replaceAll('[\.]', 'ponto') + '" style="' +
                    (fontSize !== null && fontSize > 8 ? 'font-size: ' + fontSize + 'px;' : '') +
                    (ajusteMarginItemLista !== null ? 'margin: ' + ajusteMarginItemLista + ';' : '') + '">' +
                    item.label + '</label></span>');

                return $li.appendTo(ul);
            };
        }






        let ultimaListaTracoes = [];
        let ultimoLiRenderItemTracoesTodos = null;
        let todosTracaoMarcados = false;
        let executouSelectAntesCloseTracao = false;
        let menuTracaoAberto = false;
        if (exfiaTracao) {
            //Combobox autocomplete de Tracao
            let sTxtAvTracao = $("#txt-av-tracao", gpDivMaster);

            sTxtAvTracao
                // don't navigate away from the field on tab when selecting an item
                .on("focus", function () {
                    if(!menuTracaoAberto){
                        sTxtAvTracao.val('');
                        sTxtAvTracao.uiautocomplete("search", sTxtAvTracao.val());
                    }
                }).on("blur", function () {
                    mostrarAvTracoesSelecionadas();
                }).on("keydown", function (event) {
                    if (event.keyCode === $.ui.keyCode.TAB &&
                        $(this).uiautocomplete("instance").menu.active) {
                        event.preventDefault();
                    }
                })
                .uiautocomplete({
                    appendTo: window.gpDivMaster,
                    minLength: 0,
                    //source: availableTags,

                    source: function (request, response) {
                        // delegate back to autocomplete, but extract the last term
                        let patt = new RegExp($.ui.autocomplete.escapeRegex(extractLast(request.term.trim())), "i");

                        let novaLista = _.filter(listaTracoes, function (item, index, array) {
                            return patt.test(item);
                        });

                        ultimaListaTracoes = novaLista;
                        if (novaLista.length > 0) {
                            novaLista.unshift("TODOS");
                        } else {
                            let novoElemento = $('.area-rodape-menu-autocomplete-tracao');
                            novoElemento.hide();
                        }

                        response(novaLista);
                    },
                    focus: function () {
                        // prevent value inserted on focus
                        return false;
                    },
                    select: function (event, ui) {
                        executouSelectAntesCloseTracao = true;
                        this.value = "";

                        if (ui.item.label === 'TODOS') {
                            let $itemTodos = $('.item-tracao-TODOS', gpDivMaster);
                            let $checkItemTodos = $('#list-checkbox-item-tracao-TODOS', gpDivMaster);
                            if ($itemTodos.hasClass("mdc-list-item--selected")) {
                                //desmarca todos

                                setTimeout(function () {
                                    $('.item-tracao', gpDivMaster).removeClass('mdc-list-item--selected');
                                    $('.list-checkbox-item-tracao', gpDivMaster).prop("checked", false);
                                }, 10);
                                listaTracoesSelecionadasTemp = [];
                            } else {
                                //Marca todos
                                setTimeout(function () {
                                    $itemTodos.addClass("mdc-list-item--selected");
                                    $checkItemTodos.prop("checked", true);
                                }, 10);
                                for (var x = 0; x < ultimaListaTracoes.length; x++) {
                                    if (ultimaListaTracoes[x] === 'TODOS') {
                                        continue;
                                    }
                                    let iSel = listaTracoesSelecionadasTemp.findIndex(function (sel) {
                                        return sel === ultimaListaTracoes[x];
                                    });
                                    let $item = $('.item-tracao-' + ultimaListaTracoes[x], gpDivMaster);
                                    let $checkItem = $('#list-checkbox-item-tracao-' + ultimaListaTracoes[x], gpDivMaster);
                                    if (iSel === -1) {
                                        setTimeout(function () {
                                            $item.addClass('mdc-list-item--selected');
                                            $checkItem.prop("checked", true);
                                        }, 10);
                                        listaTracoesSelecionadasTemp.push(ultimaListaTracoes[x]);
                                    } else {
                                        //se ja esta na lista nao faz nada apenas mantem
                                    }
                                }
                            }
                        } else {
                            let iSel = listaTracoesSelecionadasTemp.findIndex(function (sel) {
                                return sel === ui.item.label;
                            });
                            let $item = $('.item-tracao-' + ui.item.label.replaceAll(' ', ''), gpDivMaster);
                            let $checkItem = $('#list-checkbox-item-tracao-' + ui.item.label.replaceAll(' ', ''), gpDivMaster);
                            if (iSel === -1) {
                                setTimeout(function () {
                                    $item.addClass('mdc-list-item--selected');
                                    $checkItem.prop("checked", true);
                                }, 10);
                                listaTracoesSelecionadasTemp.push(ui.item.label);
                            } else {
                                setTimeout(function () {
                                    $item.removeClass('mdc-list-item--selected');
                                    $checkItem.prop("checked", false);
                                }, 10);
                                listaTracoesSelecionadasTemp.splice(iSel, 1);
                            }
                            let todosMarcados = true;
                            for (var y = 0; y < ultimaListaTracoes.length; y++) {
                                if (ultimaListaTracoes[y] === 'TODOS') {
                                    continue;
                                }
                                let iSel = listaTracoesSelecionadasTemp.findIndex(function (sel) {
                                    return sel === ultimaListaTracoes[y];
                                });
                                if (iSel === -1) {
                                    todosMarcados = false;
                                }
                            }
                            let $itemTodos = $('.item-tracao-TODOS', gpDivMaster);
                            let $checkItemTodos = $('#list-checkbox-item-tracao-TODOS', gpDivMaster);
                            if (todosMarcados) {
                                $itemTodos.addClass('mdc-list-item--selected');
                                $checkItemTodos.prop("checked", true);
                            } else {
                                $itemTodos.removeClass('mdc-list-item--selected');
                                $checkItemTodos.prop("checked", false);
                            }
                        }

                        return false;
                    },
                    open: function (event, ui) {
                        menuTracaoAberto = true;
                        console.log('open-autocomplete');


                        var $menu = sTxtAvTracao.uiautocomplete("instance").menu.element;

                        let novoElemento = $('.area-rodape-menu-autocomplete-tracao');
                        let jaExiste = true;
                        if (novoElemento.length === 0) {
                            novoElemento = $('<div/>').addClass('ui-front area-rodape-menu-autocomplete area-rodape-menu-autocomplete-tracao ui-widget ui-widget-content mdc-elevation--z3 pertence-confirmar-combobox')
                                .html('               <div class="col-md-12 pt-2 pb-2 pertence-confirmar-combobox">' +
                                    '<button class="mdc-button mdc-button--raised md-botao-cbautocomplete-aplicar col-md-12 pertence-confirmar-combobox">' +
                                    '                   <div class="mdc-button__ripple pertence-confirmar-combobox"></div>' +
                                    '                   <span class="mdc-button__label pertence-confirmar-combobox">Confirmar</span>' +
                                    '               </button></div>').css({
                                        'border-top': 0,
                                        'margin-bottom': '-46px'
                                    });
                            jaExiste = false;
                        }

                        novoElemento.outerWidth($menu.outerWidth());
                        if (!jaExiste) {
                            novoElemento
                                .insertAfter($menu);

                        }
                        novoElemento.position({
                            my: 'right top-1',
                            at: 'right bottom',
                            of: $menu,
                            collision: "none"
                        });
                        setTimeout(function () {
                            novoElemento.position({
                                my: 'right top-1',
                                at: 'right bottom',
                                of: $menu,
                                collision: "none"
                            });
                        }, 50);

                        novoElemento.show();
                        mdc.autoInit();

                        setTimeout(function () {
                            let scrollTopAtual = $('html').scrollTop();
                            let windowHeight = window.innerHeight;
                            let yScroll = $('.area-rodape-menu-autocomplete-tracao').offset().top;
                            let diferencaY = (yScroll + 50) - (windowHeight + scrollTopAtual);
                            if (diferencaY > 0) {
                                let novoScrollTop = (yScroll + 50) - windowHeight;
                                $('html, body').animate({ scrollTop: novoScrollTop }, 100);
                            }
                        }, 100);
                    }
                });
            $(gpDivMaster).on('click', '.area-rodape-menu-autocomplete-tracao .md-botao-cbautocomplete-aplicar', function () {
                console.log('click confirmar combobox');
                listaTracoesSelecionadas = [];
                for (var x = 0; x < listaTracoesSelecionadasTemp.length; x++) {
                    listaTracoesSelecionadas.push(listaTracoesSelecionadasTemp[x]);
                }
                sTxtAvTracao.uiautocomplete("instance").close();

                mostrarAvTracoesSelecionadas();

                listaVersoesSelecionadas = [];
                mostrarAvVersaosSelecionadas();

                filtrarVersoes();

                setTimeout(function () {
                    mdBotaoVersao.focus();
                }, 500);
            });
            let avTracaoAutoCompleteInstance = sTxtAvTracao.uiautocomplete("instance");
            avTracaoAutoCompleteInstance._suggest = gp_suggest;
            avTracaoAutoCompleteInstance.close = function (e) {
                //return false;
                if (ultimoTargetClicado !== null && ultimoTargetClicado.hasClass('pertence-confirmar-combobox')) {
                    return false;
                }
                console.log('close-autocomplete');
                if (executouSelectAntesCloseTracao) {
                    //nao fecha,
                    executouSelectAntesCloseTracao = false;
                    return false;
                } else {
                    mantemTracoesTemp = false;
                    listaTracoesSelecionadasTemp = [];
                    let self = this;
                    setTimeout(function () {
                        //clearTimeout(self.closing),
                        let novoElemento = $('.area-rodape-menu-autocomplete-tracao');
                        novoElemento.hide();
                        self.menu.element.is(":visible") && (
                            //self.menu.element.slideUp(),
                            self.menu.element.hide(), (typeof self.menu.deactivate === 'function' ? self.menu.deactivate() : true), self._trigger("close", e)
                        );
                        menuTracaoAberto = false;
                    }, 300);
                }
            };
            sTxtAvTracao.uiautocomplete("instance")._renderMenu = function (ul, items) {
                var that = this;

                if (!mantemTracoesTemp) {
                    for (var x = 0; x < listaTracoesSelecionadas.length; x++) {
                        listaTracoesSelecionadasTemp.push(listaTracoesSelecionadas[x]);
                    }
                    mantemTracoesTemp = true;
                }

                todosTracaoMarcados = true;
                $.each(items, function (index, item) {
                    if (index === 0) {
                        primeiroRenderItemAutoC = true;
                    } else {
                        primeiroRenderItemAutoC = false;
                    }
                    item.index = index;
                    that._renderItemData(ul, item);
                });

                if (todosTracaoMarcados) {
                    ultimoLiRenderItemTracoesTodos.addClass('mdc-list-item--selected');
                    ultimoLiRenderItemTracoesTodos.find('#list-checkbox-item-tracao-TODOS').prop('checked', true);
                }

                let $ul = $(ul);
                $ul.addClass("mdc-list mdc-elevation--z3 mdss-list mdss-list-tracao");
                $ul.attr("data-mdc-auto-init", "MDCList");
                $ul.attr("role", "group");
                $ul.find("li:odd").addClass("odd");
                mdc.autoInit();
            };
            sTxtAvTracao.uiautocomplete("instance")._renderItem = function (ul, item) {
                let objLi = { class: "mdc-list-item p-0 item-tracao item-tracao-" + item.label.replaceAll(' ', ''), tabIndex: "0" };
                if (primeiroRenderItemAutoC) {
                    //objLi = { class: "mdc-list-item p-0", tabIndex: "0" };
                }
                let indexSelecionado = listaTracoesSelecionadasTemp.findIndex(function (sel) {
                    return sel === item.label;
                });

                let $li = $("<li>", objLi)
                    .attr("role", "checkbox")
                    .attr('aria-checked', indexSelecionado >= 0 ? 'true' : 'false');
                if (item.label === 'TODOS') {
                    ultimoLiRenderItemTracoesTodos = $li;
                }

                if (indexSelecionado >= 0) {
                    $li.addClass('mdc-list-item--selected');
                } else {
                    if (item.label !== 'TODOS') {
                        todosTracaoMarcados = false;
                    }
                }

                $li.append('<span class="area-conteudo-item-lista"><span class="mdc-list-item__graphic">' +
                    '<div class= "mdc-checkbox">' +
                    '<input type="checkbox"' +
                    '    class= "mdc-checkbox__native-control list-checkbox-item-tracao"' +
                    '    id="list-checkbox-item-tracao-' + item.label.replaceAll(' ', '') + '" ' +
                    (indexSelecionado >= 0 ? 'checked' : '') + ' /> ' +
                    '<div class="mdc-checkbox__background">' +
                    '    <svg class="mdc-checkbox__checkmark"' +
                    '        viewBox="0 0 24 24">' +
                    '        <path class="mdc-checkbox__checkmark-path"' +
                    '            fill="none"' +
                    '            d="M1.73,12.91 8.1,19.28 22.79,4.59" />' +
                    '    </svg>' +
                    '    <div class="mdc-checkbox__mixedmark"></div>' +
                    '</div>' +
                    '</div>' +
                    '</span>' +
                    '<label class="mdc-list-item__text" for="list-checkbox-item-tracao-' + item.label.replaceAll(' ', '') + '" style="' +
                    (fontSize !== null && fontSize > 8 ? 'font-size: ' + fontSize + 'px;' : '') +
                    (ajusteMarginItemLista !== null ? 'margin: ' + ajusteMarginItemLista + ';' : '') + '">' +
                    item.label + '</label></span>');

                return $li.appendTo(ul);
            };
        }






        let ultimaListaVersoes = [];
        let ultimoLiRenderItemTodos = null;
        let todosVersaoMarcados = false;
        let executouSelectAntesCloseVersao = false;
        let menuVersaoAberto = false;
        //Combobox autocomplete de Versao
        let sTxtAvVersao = $("#txt-av-versao", gpDivMaster);

        sTxtAvVersao
            // don't navigate away from the field on tab when selecting an item
            .on("focus", function () {
                if(!menuVersaoAberto){
                    sTxtAvVersao.val(ultimoTermoPesquisadoVersao);
                    sTxtAvVersao.uiautocomplete("search", sTxtAvVersao.val());
                }
            }).on("blur", function () {
                mostrarAvVersaosSelecionadas();
            }).on("keydown", function (event) {
                if (event.keyCode === $.ui.keyCode.TAB &&
                    $(this).uiautocomplete("instance").menu.active) {
                    event.preventDefault();
                }
            })
            .uiautocomplete({
                appendTo: window.gpDivMaster,
                minLength: 0,
                //source: availableTags,
                position: {
                    //my: "left top", 
                    my: "right top",
                    //at: "left bottom",
                    at: "right bottom",
                    collision: "none"
                },
                source: function (request, response) {
                    // delegate back to autocomplete, but extract the last term
                    let termo = request.term.trim();
                    ultimoTermoPesquisadoVersao = termo;
                    let termos = termo.split(' ');
                    let padroes = [];
                    for (var x = 0; x < termos.length; x++) {
                        let patt = new RegExp($.ui.autocomplete.escapeRegex(extractLast(termos[x])), "i");
                        padroes.push(patt);
                    }

                    let novaLista = _.filter(listaVersoesFiltradas, function (item, index, array) {
                        for (var x = 0; x < padroes.length; x++) {
                            if (!padroes[x].test(item.modelo_versao)) {
                                return false;
                            }
                        }
                        return true;
                    })

                    ultimaListaVersoes = novaLista;
                    if (novaLista.length > 0) {
                        novaLista.unshift({
                            codigo: "todos",
                            fabricante: "",
                            modelo_base: "TODOS",
                            modelo_versao: "TODOS",
                            modelo_ano: ""
                        });
                    } else {
                        let novoElemento = $('.area-rodape-menu-autocomplete-versao');
                        novoElemento.hide();
                    }

                    response(novaLista);
                },
                focus: function () {
                    // prevent value inserted on focus
                    return false;
                },
                select: function (event, ui) {
                    executouSelectAntesCloseVersao = true;
                    this.value = "";

                    if (ui.item.codigo === 'todos') {
                        let $itemTodos = $('.item-versao-todos', gpDivMaster);
                        let $checkItemTodos = $('#list-checkbox-item-versao-todos', gpDivMaster);
                        if ($itemTodos.hasClass("mdc-list-item--selected")) {
                            //desmarca todos

                            setTimeout(function () {
                                $('.item-versao', gpDivMaster).removeClass('mdc-list-item--selected');
                                $('.list-checkbox-item-versao', gpDivMaster).prop("checked", false);
                            }, 10);
                            listaVersoesSelecionadasTemp = [];
                        } else {
                            //Marca todos
                            setTimeout(function () {
                                $itemTodos.addClass("mdc-list-item--selected");
                                $checkItemTodos.prop("checked", true);
                            }, 10);
                            for (var x = 0; x < ultimaListaVersoes.length; x++) {
                                if (ultimaListaVersoes[x].codigo === 'todos') {
                                    continue;
                                }
                                let iSel = listaVersoesSelecionadasTemp.findIndex(function (sel) {
                                    return sel.codigo === ultimaListaVersoes[x].codigo &&
                                        sel.fabricante === ultimaListaVersoes[x].fabricante &&
                                        sel.modelo_base === ultimaListaVersoes[x].modelo_base &&
                                        sel.modelo_versao === ultimaListaVersoes[x].modelo_versao;
                                });
                                let $itemVersao = $('.item-versao-' + ultimaListaVersoes[x].codigo.toString().replace('@', 'arroba').replace('!', 'exclamacao').replaceAll(' ', ''), gpDivMaster);
                                let $checkItemVersao = $('#list-checkbox-item-versao-' + ultimaListaVersoes[x].codigo.toString().replace('@', 'arroba').replace('!', 'exclamacao').replaceAll(' ', ''), gpDivMaster);
                                if (iSel === -1) {
                                    setTimeout(function () {
                                        $itemVersao.addClass('mdc-list-item--selected');
                                        $checkItemVersao.prop("checked", true);
                                    }, 10);
                                    listaVersoesSelecionadasTemp.push(ultimaListaVersoes[x]);
                                } else {
                                    //se ja esta na lista nao faz nada apenas mantem
                                }
                            }
                        }
                    } else {
                        let iSel = listaVersoesSelecionadasTemp.findIndex(function (sel) {
                            return sel.codigo === ui.item.codigo &&
                                sel.fabricante === ui.item.fabricante &&
                                sel.modelo_base === ui.item.modelo_base &&
                                sel.modelo_versao === ui.item.modelo_versao;
                        });
                        let $itemVersao = $('.item-versao-' + ui.item.codigo.toString().replace('@', 'arroba').replace('!', 'exclamacao').replaceAll(' ', ''), gpDivMaster);
                        let $checkItemVersao = $('#list-checkbox-item-versao-' + ui.item.codigo.toString().replace('@', 'arroba').replace('!', 'exclamacao').replaceAll(' ', ''), gpDivMaster);
                        
                        if (iSel === -1) {
                            setTimeout(function () {
                                $itemVersao.addClass('mdc-list-item--selected');
                                $checkItemVersao.prop("checked", true);
                            }, 10);
                            listaVersoesSelecionadasTemp.push(ui.item);
                        } else {
                            setTimeout(function () {
                                $itemVersao.removeClass('mdc-list-item--selected');
                                $checkItemVersao.prop("checked", false);
                            }, 10);
                            listaVersoesSelecionadasTemp.splice(iSel, 1);
                        }
                        let todosMarcados = true;
                        for (var y = 0; y < ultimaListaVersoes.length; y++) {
                            if (ultimaListaVersoes[y].codigo === 'todos') {
                                continue;
                            }
                            let iSel = listaVersoesSelecionadasTemp.findIndex(function (sel) {
                                return sel.codigo === ultimaListaVersoes[y].codigo &&
                                    sel.fabricante === ultimaListaVersoes[y].fabricante &&
                                    sel.modelo_base === ultimaListaVersoes[y].modelo_base &&
                                    sel.modelo_versao === ultimaListaVersoes[y].modelo_versao;
                            });
                            if (iSel === -1) {
                                todosMarcados = false;
                            }
                        }
                        let $itemTodos = $('.item-versao-todos', gpDivMaster);
                        let $checkItemTodos = $('#list-checkbox-item-versao-todos', gpDivMaster);
                        if (todosMarcados) {
                            $itemTodos.addClass('mdc-list-item--selected');
                            $checkItemTodos.prop("checked", true);
                        } else {
                            $itemTodos.removeClass('mdc-list-item--selected');
                            $checkItemTodos.prop("checked", false);
                        }
                    }

                    return false;
                },
                open: function (event, ui) {
                    menuVersaoAberto = true;
                    console.log('open-autocomplete');

                    var $menu = sTxtAvVersao.uiautocomplete("instance").menu.element;

                    let novoElemento = $('.area-rodape-menu-autocomplete-versao');
                    let jaExiste = true;
                    if (novoElemento.length === 0) {
                        novoElemento = $('<div/>').addClass('ui-front area-rodape-menu-autocomplete area-rodape-menu-autocomplete-versao ui-widget ui-widget-content mdc-elevation--z3 pertence-confirmar-combobox')
                            .html('               <div class="col-md-12 pt-2 pb-2 pertence-confirmar-combobox">' +
                                '<button class="mdc-button mdc-button--raised md-botao-cbautocomplete-aplicar col-md-12 pertence-confirmar-combobox">' +
                                '                   <div class="mdc-button__ripple pertence-confirmar-combobox"></div>' +
                                '                   <span class="mdc-button__label pertence-confirmar-combobox">Confirmar</span>' +
                                '               </button></div>').css({
                                    'border-top': 0,
                                    'margin-bottom': '-46px'
                                });
                        jaExiste = false;
                    }

                    novoElemento.outerWidth($menu.outerWidth());
                    if (!jaExiste) {
                        novoElemento
                            .insertAfter($menu);

                    }
                    novoElemento.position({
                        my: 'right top-1',
                        at: 'right bottom',
                        of: $menu,
                        collision: "none"
                    });
                    setTimeout(function () {
                        novoElemento.position({
                            my: 'right top-1',
                            at: 'right bottom',
                            of: $menu,
                            collision: "none"
                        });
                    }, 50);

                    novoElemento.show();
                    mdc.autoInit();

                    setTimeout(function () {
                        let scrollTopAtual = $('html').scrollTop();
                        let windowHeight = window.innerHeight;
                        let yScroll = $('.area-rodape-menu-autocomplete-versao').offset().top;
                        let diferencaY = (yScroll + 50) - (windowHeight + scrollTopAtual);
                        if (diferencaY > 0) {
                            let novoScrollTop = (yScroll + 50) - windowHeight;
                            $('html, body').animate({ scrollTop: novoScrollTop }, 100);
                        }
                    }, 100);
                }
            });
        $(gpDivMaster).on('click', '.area-rodape-menu-autocomplete-versao .md-botao-cbautocomplete-aplicar', function () {
            console.log('click confirmar combobox');
            listaVersoesSelecionadas = [];
            for (var x = 0; x < listaVersoesSelecionadasTemp.length; x++) {
                listaVersoesSelecionadas.push(listaVersoesSelecionadasTemp[x]);
            }
            sTxtAvVersao.uiautocomplete("instance").close();

            mostrarAvVersaosSelecionadas();

            listaSecoesSelecionadas = [];
            if (exfiaSecao) {
                mostrarAvSecoesSelecionadas();
            }
            listaGruposSelecionadas = [];
            if (exfiaSecao && exfiaGrupo) {
                mostrarAvGruposSelecionadas();
            }

            if (versaoVeiculoObrigatoria) {
                if (listaVersoesSelecionadas.length > 0) {
                    mdBotaoAplicar.disabled = false;
                    mdBotaoAplicar.root_.disabled = false;
                } else {
                    mdBotaoAplicar.disabled = true;
                    mdBotaoAplicar.root_.disabled = true;
                }
            }

            if (exfiaSecao) {
                filtrarSecoes(function () {
                    if (listaSecoes.length > 0) {
                        mdBotaoSecao.disabled = false;
                    } else {
                        mdBotaoSecao.disabled = true;
                        mdBotaoGrupo.disabled = true;
                    }
                });
            } else {
                setTimeout(function () {
                    if (exfiaDescricao) {
                        mdTextProduto.focus();
                    } else {
                        if (versaoVeiculoObrigatoria) {
                            if (listaVersoesSelecionadas.length > 0) {
                                mdBotaoAplicar.root_.focus();
                            }
                        } else {
                            mdBotaoAplicar.root_.focus();
                        }
                    }
                }, 500);
            }

             

            
        });
        let avVersaoAutoCompleteInstance = sTxtAvVersao.uiautocomplete("instance");
        avVersaoAutoCompleteInstance._suggest = gp_suggest;
        avVersaoAutoCompleteInstance.close = function (e) {
            //return false;
            if (ultimoTargetClicado !== null && ultimoTargetClicado.hasClass('pertence-confirmar-combobox')) {
                return false;
            }
            console.log('close-autocomplete');
            if (executouSelectAntesCloseVersao) {
                //nao fecha,
                executouSelectAntesCloseVersao = false;
                return false;
            } else {
                mantemVersoesTemp = false;
                listaVersoesSelecionadasTemp = [];
                let self = this;
                setTimeout(function () {
                    //clearTimeout(self.closing),
                    let novoElemento = $('.area-rodape-menu-autocomplete-versao');
                    novoElemento.hide();
                    self.menu.element.is(":visible") && (
                        //self.menu.element.slideUp(),
                        self.menu.element.hide(), (typeof self.menu.deactivate === 'function' ? self.menu.deactivate() : true), self._trigger("close", e)
                    );
                    menuVersaoAberto = false;
                }, 300);
            }
        };
        sTxtAvVersao.uiautocomplete("instance")._renderMenu = function (ul, items) {
            var that = this;

            if (!mantemVersoesTemp) {
                for (var x = 0; x < listaVersoesSelecionadas.length; x++) {
                    listaVersoesSelecionadasTemp.push(listaVersoesSelecionadas[x]);
                }
                mantemVersoesTemp = true;
            }

            todosVersaoMarcados = true;
            $.each(items, function (index, item) {
                if (index === 0) {
                    primeiroRenderItemAutoC = true;
                } else {
                    primeiroRenderItemAutoC = false;
                }
                item.index = index;
                that._renderItemData(ul, item);
            });

            if (todosVersaoMarcados) {
                setTimeout(function () { 
                    ultimoLiRenderItemTodos.addClass('mdc-list-item--selected');
                    ultimoLiRenderItemTodos.find('#list-checkbox-item-versao-todos').prop('checked', true);
                }, 100);
            }

            let $ul = $(ul);
            $ul.addClass("mdc-list mdc-elevation--z3 mdss-list mdss-list-versao");
            $ul.attr("data-mdc-auto-init", "MDCList");
            $ul.attr("role", "group");
            $ul.find("li:odd").addClass("odd");
            mdc.autoInit();
        };
        sTxtAvVersao.uiautocomplete("instance")._renderItem = function (ul, item) {
            let objLi = { class: "mdc-list-item p-0 item-versao item-versao-" + item.codigo.toString().replace('@', 'arroba').replace('!', 'exclamacao').replaceAll(' ', ''), tabIndex: "0" };
            if (primeiroRenderItemAutoC) {
                //objLi = { class: "mdc-list-item p-0", tabIndex: "0" };
            }

            let indexSelecionado = listaVersoesSelecionadasTemp.findIndex(function (modSel) {
                return modSel.codigo === item.codigo &&
                    modSel.fabricante === item.fabricante &&
                    modSel.modelo_base === item.modelo_base &&
                    modSel.modelo_versao === item.modelo_versao;
            });
            let $li = $("<li>", objLi)
                .attr("role", "checkbox")
                .attr('aria-checked', indexSelecionado >= 0 ? 'true' : 'false');
            if (item.codigo === 'todos') {
                ultimoLiRenderItemTodos = $li;
            }

            if (indexSelecionado >= 0) {
                $li.addClass('mdc-list-item--selected');
            } else {
                if (item.codigo !== 'todos') {
                    todosVersaoMarcados = false;
                }
            }

            $li.append('<span class="area-conteudo-item-lista"><span class="mdc-list-item__graphic">' +
                '<div class= "mdc-checkbox">' +
                '<input type="checkbox"' +
                '    class= "mdc-checkbox__native-control list-checkbox-item-versao"' +
                '    id="list-checkbox-item-versao-' + item.codigo.toString().replace('@', 'arroba').replace('!', 'exclamacao').replaceAll(' ', '') + '" ' +
                (indexSelecionado >= 0 ? 'checked' : '') + ' /> ' +
                '<div class="mdc-checkbox__background">' +
                '    <svg class="mdc-checkbox__checkmark"' +
                '        viewBox="0 0 24 24">' +
                '        <path class="mdc-checkbox__checkmark-path"' +
                '            fill="none"' +
                '            d="M1.73,12.91 8.1,19.28 22.79,4.59" />' +
                '    </svg>' +
                '    <div class="mdc-checkbox__mixedmark"></div>' +
                '</div>' +
                '</div>' +
                '</span>' +
                '<label class="mdc-list-item__text" for="list-checkbox-item-versao-' + item.codigo.toString().replace('@', 'arroba').replace('!', 'exclamacao').replaceAll(' ', '') + '" style="' +
                (fontSize !== null && fontSize > 8 ? 'font-size: ' + fontSize + 'px;' : '') +
                (ajusteMarginItemLista !== null ? 'margin: ' + ajusteMarginItemLista + ';' : '') + '">' +
                item.modelo_versao + '</label></span>');

            return $li.appendTo(ul);
        };










        let ultimaListaSecoes = [];
        let ultimoLiRenderItemSecaoTodos = null;
        let todosSecaoMarcados = false;
        let executouSelectAntesCloseSecao = false;
        let menuSecaoAberto = false;
        if (exfiaSecao) {

            //Combobox autocomplete de Secao
            let sTxtAvSecao = $("#txt-av-secao", gpDivMaster);
            
            sTxtAvSecao
                // don't navigate away from the field on tab when selecting an item
                .on("focus", function () {
                    if(!menuSecaoAberto){
                        sTxtAvSecao.val(ultimoTermoPesquisadoSecao);
                        sTxtAvSecao.uiautocomplete("search", sTxtAvSecao.val());
                    }
                }).on("blur", function () {
                    mostrarAvSecoesSelecionadas();
                }).on("keydown", function (event) {
                    if (event.keyCode === $.ui.keyCode.TAB &&
                        $(this).uiautocomplete("instance").menu.active) {
                        event.preventDefault();
                    }
                })
                .uiautocomplete({
                    appendTo: window.gpDivMaster,
                    minLength: 0,
                    //source: availableTags,
                    position: {
                        //my: "left top", 
                        my: "right top",
                        //at: "left bottom",
                        at: "right bottom",
                        collision: "none"
                    },
                    source: function (request, response) {
                        // delegate back to autocomplete, but extract the last term
                        let termo = request.term.trim();
                        ultimoTermoPesquisadoSecao = termo;
                        let termos = termo.split(' ');
                        let padroes = [];
                        for (var x = 0; x < termos.length; x++) {
                            let patt = new RegExp($.ui.autocomplete.escapeRegex(extractLast(termos[x])), "i");
                            padroes.push(patt);
                        }

                        let novaLista = _.filter(listaSecoes, function (item, index, array) {
                            for (var x = 0; x < padroes.length; x++) {
                                if (!padroes[x].test(item.descricao)) {
                                    return false;
                                }
                            }
                            return true;
                        })

                        ultimaListaSecoes = novaLista;
                        if (novaLista.length > 0) {
                            novaLista.unshift({
                                codigo: "todos",
                                descricao: "TODAS",
                            });
                        } else {
                            let novoElemento = $('.area-rodape-menu-autocomplete-secao');
                            novoElemento.hide();
                        }

                        response(novaLista);
                    },
                    focus: function () {
                        // prevent value inserted on focus
                        return false;
                    },
                    select: function (event, ui) {
                        executouSelectAntesCloseSecao = true;
                        this.value = "";

                        if (ui.item.codigo === 'todos') {
                            let $itemTodos = $('.item-secao-todos', gpDivMaster);
                            let $checkItemTodos = $('#list-checkbox-item-secao-todos', gpDivMaster);
                            if ($itemTodos.hasClass("mdc-list-item--selected")) {
                                //desmarca todos

                                setTimeout(function () {
                                    $('.item-secao', gpDivMaster).removeClass('mdc-list-item--selected');
                                    $('.list-checkbox-item-secao', gpDivMaster).prop("checked", false);
                                }, 10);
                                listaSecoesSelecionadasTemp = [];
                            } else {
                                //Marca todos
                                setTimeout(function () {
                                    $itemTodos.addClass("mdc-list-item--selected");
                                    $checkItemTodos.prop("checked", true);
                                }, 10);
                                for (var x = 0; x < ultimaListaSecoes.length; x++) {
                                    if (ultimaListaSecoes[x].codigo === 'todos') {
                                        continue;
                                    }
                                    let iSel = listaSecoesSelecionadasTemp.findIndex(function (sel) {
                                        return sel.codigo === ultimaListaSecoes[x].codigo &&
                                            sel.descricao === ultimaListaSecoes[x].descricao;
                                    });
                                    let $itemSecao = $('.item-secao-' + ultimaListaSecoes[x].codigo.toString().replace('@', 'arroba').replace('!', 'exclamacao').replaceAll(' ', ''), gpDivMaster);
                                    let $checkItemSecao = $('#list-checkbox-item-secao-' + ultimaListaSecoes[x].codigo.toString().replace('@', 'arroba').replace('!', 'exclamacao').replaceAll(' ', ''), gpDivMaster);
                                    if (iSel === -1) {
                                        setTimeout(function () {
                                            $itemSecao.addClass('mdc-list-item--selected');
                                            $checkItemSecao.prop("checked", true);
                                        }, 10);
                                        listaSecoesSelecionadasTemp.push(ultimaListaSecoes[x]);
                                    } else {
                                        //se ja esta na lista nao faz nada apenas mantem
                                    }
                                }
                            }
                        } else {
                            let iSel = listaSecoesSelecionadasTemp.findIndex(function (sel) {
                                return sel.codigo === ui.item.codigo &&
                                    sel.descricao === ui.item.descricao;
                            });
                            let $itemSecao = $('.item-secao-' + ui.item.codigo.toString().replace('@', 'arroba').replace('!', 'exclamacao').replaceAll(' ', ''), gpDivMaster);
                            let $checkItemSecao = $('#list-checkbox-item-secao-' + ui.item.codigo.toString().replace('@', 'arroba').replace('!', 'exclamacao').replaceAll(' ', ''), gpDivMaster);
                            if (iSel === -1) {
                                setTimeout(function () {
                                    $itemSecao.addClass('mdc-list-item--selected');
                                    $checkItemSecao.prop("checked", true);
                                }, 10);
                                listaSecoesSelecionadasTemp.push(ui.item);
                            } else {
                                setTimeout(function () {
                                    $itemSecao.removeClass('mdc-list-item--selected');
                                    $checkItemSecao.prop("checked", false);
                                }, 10);
                                listaSecoesSelecionadasTemp.splice(iSel, 1);
                            }
                            let todosMarcados = true;
                            for (var y = 0; y < ultimaListaSecoes.length; y++) {
                                if (ultimaListaSecoes[y].codigo === 'todos') {
                                    continue;
                                }
                                let iSel = listaSecoesSelecionadasTemp.findIndex(function (sel) {
                                    return sel.codigo === ultimaListaSecoes[y].codigo &&
                                        sel.descricao === ultimaListaSecoes[y].descricao;
                                });
                                if (iSel === -1) {
                                    todosMarcados = false;
                                }
                            }
                            let $itemTodos = $('.item-secao-todos', gpDivMaster);
                            let $checkItemTodos = $('#list-checkbox-item-secao-todos', gpDivMaster);
                            if (todosMarcados) {
                                $itemTodos.addClass('mdc-list-item--selected');
                                $checkItemTodos.prop("checked", true);
                            } else {
                                $itemTodos.removeClass('mdc-list-item--selected');
                                $checkItemTodos.prop("checked", false);
                            }
                        }

                        return false;
                    },
                    open: function (event, ui) {
                        menuSecaoAberto = true;
                        console.log('open-autocomplete');

                        var $menu = sTxtAvSecao.uiautocomplete("instance").menu.element;

                        let novoElemento = $('.area-rodape-menu-autocomplete-secao');
                        let jaExiste = true;
                        if (novoElemento.length === 0) {
                            novoElemento = $('<div/>').addClass('ui-front area-rodape-menu-autocomplete area-rodape-menu-autocomplete-secao ui-widget ui-widget-content mdc-elevation--z3 pertence-confirmar-combobox')
                                .html('               <div class="col-md-12 pt-2 pb-2 pertence-confirmar-combobox">' +
                                    '<button class="mdc-button mdc-button--raised md-botao-cbautocomplete-aplicar col-md-12 pertence-confirmar-combobox">' +
                                    '                   <div class="mdc-button__ripple pertence-confirmar-combobox"></div>' +
                                    '                   <span class="mdc-button__label pertence-confirmar-combobox">Confirmar</span>' +
                                    '               </button></div>').css({
                                        'border-top': 0,
                                        'margin-bottom': '-46px'
                                    });
                            jaExiste = false;
                        }

                        novoElemento.outerWidth($menu.outerWidth());
                        if (!jaExiste) {
                            novoElemento
                                .insertAfter($menu);

                        }
                        novoElemento.position({
                            my: 'right top-1',
                            at: 'right bottom',
                            of: $menu,
                            collision: "none"
                        });
                        setTimeout(function () {
                            novoElemento.position({
                                my: 'right top-1',
                                at: 'right bottom',
                                of: $menu,
                                collision: "none"
                            });
                        }, 50);

                        novoElemento.show();
                        mdc.autoInit();

                        setTimeout(function () {
                            let scrollTopAtual = $('html').scrollTop();
                            let windowHeight = window.innerHeight;
                            let yScroll = $('.area-rodape-menu-autocomplete-secao').offset().top;
                            let diferencaY = (yScroll + 50) - (windowHeight + scrollTopAtual);
                            if (diferencaY > 0) {
                                let novoScrollTop = (yScroll + 50) - windowHeight;
                                $('html, body').animate({ scrollTop: novoScrollTop }, 100);
                            }
                        }, 100);
                    }
                });
            $(gpDivMaster).on('click', '.area-rodape-menu-autocomplete-secao .md-botao-cbautocomplete-aplicar', function () {
                console.log('click confirmar combobox');
                listaSecoesSelecionadas = [];
                for (var x = 0; x < listaSecoesSelecionadasTemp.length; x++) {
                    listaSecoesSelecionadas.push(listaSecoesSelecionadasTemp[x]);
                }
                sTxtAvSecao.uiautocomplete("instance").close();

                mostrarAvSecoesSelecionadas();

                listaGruposSelecionadas = [];
                if (exfiaGrupo) {
                    mostrarAvGruposSelecionadas();
                }

                if (exfiaGrupo) {
                    filtrarGrupos(function () {
                        if (listaGrupos.length > 0) {
                            mdBotaoGrupo.disabled = false;
                        } else {
                            mdBotaoGrupo.disabled = true;
                        }
                    });
                } else {
                    setTimeout(function () {
                        mdBotaoAplicar.root_.focus();
                    }, 500);
                }

            });
            let avSecaoAutoCompleteInstance = sTxtAvSecao.uiautocomplete("instance");
            avSecaoAutoCompleteInstance._suggest = gp_suggest;
            avSecaoAutoCompleteInstance.close = function (e) {
                //return false;
                if (ultimoTargetClicado !== null && ultimoTargetClicado.hasClass('pertence-confirmar-combobox')) {
                    return false;
                }
                console.log('close-autocomplete');
                if (executouSelectAntesCloseSecao) {
                    //nao fecha,
                    executouSelectAntesCloseSecao = false;
                    return false;
                } else {
                    mantemSecoesTemp = false;
                    listaSecoesSelecionadasTemp = [];
                    let self = this;
                    setTimeout(function () {
                        //clearTimeout(self.closing),
                        let novoElemento = $('.area-rodape-menu-autocomplete-secao');
                        novoElemento.hide();
                        self.menu.element.is(":visible") && (
                            //self.menu.element.slideUp(),
                            self.menu.element.hide(), (typeof self.menu.deactivate === 'function' ? self.menu.deactivate() : true), self._trigger("close", e)
                        );
                        menuSecaoAberto = false;
                    }, 300);
                }
            };
            sTxtAvSecao.uiautocomplete("instance")._renderMenu = function (ul, items) {
                var that = this;

                if (!mantemSecoesTemp) {
                    for (var x = 0; x < listaSecoesSelecionadas.length; x++) {
                        listaSecoesSelecionadasTemp.push(listaSecoesSelecionadas[x]);
                    }
                    mantemSecoesTemp = true;
                }

                todosSecaoMarcados = true;
                $.each(items, function (index, item) {
                    if (index === 0) {
                        primeiroRenderItemAutoC = true;
                    } else {
                        primeiroRenderItemAutoC = false;
                    }
                    item.index = index;
                    that._renderItemData(ul, item);
                });

                if (todosSecaoMarcados) {
                    setTimeout(function () {
                        ultimoLiRenderItemTodos.addClass('mdc-list-item--selected');
                        ultimoLiRenderItemTodos.find('#list-checkbox-item-secao-todos').prop('checked', true);
                    }, 100);
                }

                let $ul = $(ul);
                $ul.addClass("mdc-list mdc-elevation--z3 mdss-list mdss-list-secao");
                $ul.attr("data-mdc-auto-init", "MDCList");
                $ul.attr("role", "group");
                $ul.find("li:odd").addClass("odd");
                mdc.autoInit();
            };
            sTxtAvSecao.uiautocomplete("instance")._renderItem = function (ul, item) {
                let objLi = { class: "mdc-list-item p-0 item-secao item-secao-" + item.codigo.toString().replace('@', 'arroba').replace('!', 'exclamacao').replaceAll(' ', ''), tabIndex: "0" };
                if (primeiroRenderItemAutoC) {
                    //objLi = { class: "mdc-list-item p-0", tabIndex: "0" };
                }

                let indexSelecionado = listaSecoesSelecionadasTemp.findIndex(function (modSel) {
                    return modSel.codigo === item.codigo &&
                        modSel.descricao === item.descricao;
                });
                let $li = $("<li>", objLi)
                    .attr("role", "checkbox")
                    .attr('aria-checked', indexSelecionado >= 0 ? 'true' : 'false');
                if (item.codigo === 'todos') {
                    ultimoLiRenderItemTodos = $li;
                }

                if (indexSelecionado >= 0) {
                    $li.addClass('mdc-list-item--selected');
                } else {
                    if (item.codigo !== 'todos') {
                        todosSecaoMarcados = false;
                    }
                }

                $li.append('<span class="area-conteudo-item-lista"><span class="mdc-list-item__graphic">' +
                    '<div class= "mdc-checkbox">' +
                    '<input type="checkbox"' +
                    '    class= "mdc-checkbox__native-control list-checkbox-item-secao"' +
                    '    id="list-checkbox-item-secao-' + item.codigo.toString().replace('@', 'arroba').replace('!', 'exclamacao').replaceAll(' ', '') + '" ' +
                    (indexSelecionado >= 0 ? 'checked' : '') + ' /> ' +
                    '<div class="mdc-checkbox__background">' +
                    '    <svg class="mdc-checkbox__checkmark"' +
                    '        viewBox="0 0 24 24">' +
                    '        <path class="mdc-checkbox__checkmark-path"' +
                    '            fill="none"' +
                    '            d="M1.73,12.91 8.1,19.28 22.79,4.59" />' +
                    '    </svg>' +
                    '    <div class="mdc-checkbox__mixedmark"></div>' +
                    '</div>' +
                    '</div>' +
                    '</span>' +
                    '<label class="mdc-list-item__text" for="list-checkbox-item-secao-' + item.codigo.toString().replace('@', 'arroba').replace('!', 'exclamacao').replaceAll(' ', '') + '" style="' +
                    (fontSize !== null && fontSize > 8 ? 'font-size: ' + fontSize + 'px;' : '') +
                    (ajusteMarginItemLista !== null ? 'margin: ' + ajusteMarginItemLista + ';' : '') + '">' +
                    item.descricao + '</label></span>');

                return $li.appendTo(ul);
            };
        }








        let ultimaListaGrupos = [];
        let ultimoLiRenderItemGrupoTodos = null;
        let todosGrupoMarcados = false;
        let executouSelectAntesCloseGrupo = false;
        let menuGrupoAberto = false;
        if (exfiaSecao && exfiaGrupo) {
            //Combobox autocomplete de Grupo
            let sTxtAvGrupo = $("#txt-av-grupo", gpDivMaster);

            sTxtAvGrupo
                // don't navigate away from the field on tab when selecting an item
                .on("focus", function () {
                    if(!menuGrupoAberto){
                        sTxtAvGrupo.val(ultimoTermoPesquisadoGrupo);
                        sTxtAvGrupo.uiautocomplete("search", sTxtAvGrupo.val());
                    }
                }).on("blur", function () {
                    mostrarAvGruposSelecionadas();
                }).on("keydown", function (event) {
                    if (event.keyCode === $.ui.keyCode.TAB &&
                        $(this).uiautocomplete("instance").menu.active) {
                        event.preventDefault();
                    }
                })
                .uiautocomplete({
                    appendTo: window.gpDivMaster,
                    minLength: 0,
                    //source: availableTags,
                    position: {
                        //my: "left top", 
                        my: "right top",
                        //at: "left bottom",
                        at: "right bottom",
                        collision: "none"
                    },
                    source: function (request, response) {
                        // delegate back to autocomplete, but extract the last term
                        let termo = request.term.trim();
                        ultimoTermoPesquisadoGrupo = termo;
                        let termos = termo.split(' ');
                        let padroes = [];
                        for (var x = 0; x < termos.length; x++) {
                            let patt = new RegExp($.ui.autocomplete.escapeRegex(extractLast(termos[x])), "i");
                            padroes.push(patt);
                        }

                        let novaLista = _.filter(listaGrupos, function (item, index, array) {
                            for (var x = 0; x < padroes.length; x++) {
                                if (!padroes[x].test(item.descricao)) {
                                    return false;
                                }
                            }
                            return true;
                        })

                        ultimaListaGrupos = novaLista;
                        if (novaLista.length > 0) {
                            novaLista.unshift({
                                codigo: "todos",
                                descricao: "TODOS",
                            });
                        } else {
                            let novoElemento = $('.area-rodape-menu-autocomplete-grupo');
                            novoElemento.hide();
                        }

                        response(novaLista);
                    },
                    focus: function () {
                        // prevent value inserted on focus
                        return false;
                    },
                    select: function (event, ui) {
                        executouSelectAntesCloseGrupo = true;
                        this.value = "";

                        if (ui.item.codigo === 'todos') {
                            let $itemTodos = $('.item-grupo-todos', gpDivMaster);
                            let $checkItemTodos = $('#list-checkbox-item-grupo-todos', gpDivMaster);
                            if ($itemTodos.hasClass("mdc-list-item--selected")) {
                                //desmarca todos

                                setTimeout(function () {
                                    $('.item-grupo', gpDivMaster).removeClass('mdc-list-item--selected');
                                    $('.list-checkbox-item-grupo', gpDivMaster).prop("checked", false);
                                }, 10);
                                listaGruposSelecionadasTemp = [];
                            } else {
                                //Marca todos
                                setTimeout(function () {
                                    $itemTodos.addClass("mdc-list-item--selected");
                                    $checkItemTodos.prop("checked", true);
                                }, 10);
                                for (var x = 0; x < ultimaListaGrupos.length; x++) {
                                    if (ultimaListaGrupos[x].codigo === 'todos') {
                                        continue;
                                    }
                                    let iSel = listaGruposSelecionadasTemp.findIndex(function (sel) {
                                        return sel.codigo === ultimaListaGrupos[x].codigo &&
                                            sel.descricao === ultimaListaGrupos[x].descricao;
                                    });
                                    let $itemGrupo = $('.item-grupo-' + ultimaListaGrupos[x].codigo.toString().replace('@', 'arroba').replace('!', 'exclamacao').replaceAll(' ', ''), gpDivMaster);
                                    let $checkItemGrupo = $('#list-checkbox-item-grupo-' + ultimaListaGrupos[x].codigo.toString().replace('@', 'arroba').replace('!', 'exclamacao').replaceAll(' ', ''), gpDivMaster);
                                    if (iSel === -1) {
                                        setTimeout(function () {
                                            $itemGrupo.addClass('mdc-list-item--selected');
                                            $checkItemGrupo.prop("checked", true);
                                        }, 10);
                                        listaGruposSelecionadasTemp.push(ultimaListaGrupos[x]);
                                    } else {
                                        //se ja esta na lista nao faz nada apenas mantem
                                    }
                                }
                            }
                        } else {
                            let iSel = listaGruposSelecionadasTemp.findIndex(function (sel) {
                                return sel.codigo === ui.item.codigo &&
                                    sel.descricao === ui.item.descricao;
                            });
                            let $itemGrupo = $('.item-grupo-' + ui.item.codigo.toString().replace('@', 'arroba').replace('!', 'exclamacao').replaceAll(' ', ''), gpDivMaster);
                            let $checkItemGrupo = $('#list-checkbox-item-grupo-' + ui.item.codigo.toString().replace('@', 'arroba').replace('!', 'exclamacao').replaceAll(' ', ''), gpDivMaster);
                            if (iSel === -1) {
                                setTimeout(function () {
                                    $itemGrupo.addClass('mdc-list-item--selected');
                                    $checkItemGrupo.prop("checked", true);
                                }, 10);
                                listaGruposSelecionadasTemp.push(ui.item);
                            } else {
                                setTimeout(function () {
                                    $itemGrupo.removeClass('mdc-list-item--selected');
                                    $checkItemGrupo.prop("checked", false);
                                }, 10);
                                listaGruposSelecionadasTemp.splice(iSel, 1);
                            }
                            let todosMarcados = true;
                            for (var y = 0; y < ultimaListaGrupos.length; y++) {
                                if (ultimaListaGrupos[y].codigo === 'todos') {
                                    continue;
                                }
                                let iSel = listaGruposSelecionadasTemp.findIndex(function (sel) {
                                    return sel.codigo === ultimaListaGrupos[y].codigo &&
                                        sel.descricao === ultimaListaGrupos[y].descricao;
                                });
                                if (iSel === -1) {
                                    todosMarcados = false;
                                }
                            }
                            let $itemTodos = $('.item-grupo-todos', gpDivMaster);
                            let $checkItemTodos = $('#list-checkbox-item-grupo-todos', gpDivMaster);
                            if (todosMarcados) {
                                $itemTodos.addClass('mdc-list-item--selected');
                                $checkItemTodos.prop("checked", true);
                            } else {
                                $itemTodos.removeClass('mdc-list-item--selected');
                                $checkItemTodos.prop("checked", false);
                            }
                        }

                        return false;
                    },
                    open: function (event, ui) {
                        menuGrupoAberto = true;
                        console.log('open-autocomplete');


                        var $menu = sTxtAvGrupo.uiautocomplete("instance").menu.element;

                        let novoElemento = $('.area-rodape-menu-autocomplete-grupo');
                        let jaExiste = true;
                        if (novoElemento.length === 0) {
                            novoElemento = $('<div/>').addClass('ui-front area-rodape-menu-autocomplete area-rodape-menu-autocomplete-grupo ui-widget ui-widget-content mdc-elevation--z3 pertence-confirmar-combobox')
                                .html('               <div class="col-md-12 pt-2 pb-2 pertence-confirmar-combobox">' +
                                    '<button class="mdc-button mdc-button--raised md-botao-cbautocomplete-aplicar col-md-12 pertence-confirmar-combobox">' +
                                    '                   <div class="mdc-button__ripple pertence-confirmar-combobox"></div>' +
                                    '                   <span class="mdc-button__label pertence-confirmar-combobox">Confirmar</span>' +
                                    '               </button></div>').css({
                                        'border-top': 0,
                                        'margin-bottom': '-46px'
                                    });
                            jaExiste = false;
                        }

                        novoElemento.outerWidth($menu.outerWidth());
                        if (!jaExiste) {
                            novoElemento
                                .insertAfter($menu);

                        }
                        novoElemento.position({
                            my: 'right top-1',
                            at: 'right bottom',
                            of: $menu,
                            collision: "none"
                        });
                        setTimeout(function () {
                            novoElemento.position({
                                my: 'right top-1',
                                at: 'right bottom',
                                of: $menu,
                                collision: "none"
                            });
                        }, 50);

                        novoElemento.show();
                        mdc.autoInit();

                        setTimeout(function () {
                            let scrollTopAtual = $('html').scrollTop();
                            let windowHeight = window.innerHeight;
                            let yScroll = $('.area-rodape-menu-autocomplete-grupo').offset().top;
                            let diferencaY = (yScroll + 50) - (windowHeight + scrollTopAtual);
                            if (diferencaY > 0) {
                                let novoScrollTop = (yScroll + 50) - windowHeight;
                                $('html, body').animate({ scrollTop: novoScrollTop }, 100);
                            }
                        }, 100);
                    }
                });
            $(gpDivMaster).on('click', '.area-rodape-menu-autocomplete-grupo .md-botao-cbautocomplete-aplicar', function () {
                console.log('click confirmar combobox');
                listaGruposSelecionadas = [];
                for (var x = 0; x < listaGruposSelecionadasTemp.length; x++) {
                    listaGruposSelecionadas.push(listaGruposSelecionadasTemp[x]);
                }
                sTxtAvGrupo.uiautocomplete("instance").close();

                mostrarAvGruposSelecionadas();

                setTimeout(function () {
                    if (exfiaDescricao) {
                        mdTextProduto.focus();
                    } else {
                        mdBotaoAplicar.root_.focus();
                    }
                }, 500);
            });
            let avGrupoAutoCompleteInstance = sTxtAvGrupo.uiautocomplete("instance");
            avGrupoAutoCompleteInstance._suggest = gp_suggest;
            avGrupoAutoCompleteInstance.close = function (e) {
                //return false;
                if (ultimoTargetClicado !== null && ultimoTargetClicado.hasClass('pertence-confirmar-combobox')) {
                    return false;
                }
                console.log('close-autocomplete');
                if (executouSelectAntesCloseGrupo) {
                    //nao fecha,
                    executouSelectAntesCloseGrupo = false;
                    return false;
                } else {
                    mantemGruposTemp = false;
                    listaGruposSelecionadasTemp = [];
                    let self = this;
                    setTimeout(function () {
                        //clearTimeout(self.closing),
                        let novoElemento = $('.area-rodape-menu-autocomplete-grupo');
                        novoElemento.hide();
                        self.menu.element.is(":visible") && (
                            //self.menu.element.slideUp(),
                            self.menu.element.hide(), (typeof self.menu.deactivate === 'function' ? self.menu.deactivate() : true), self._trigger("close", e)
                        );
                        menuGrupoAberto = false;
                    }, 300);
                }
            };
            sTxtAvGrupo.uiautocomplete("instance")._renderMenu = function (ul, items) {
                var that = this;

                if (!mantemGruposTemp) {
                    for (var x = 0; x < listaGruposSelecionadas.length; x++) {
                        listaGruposSelecionadasTemp.push(listaGruposSelecionadas[x]);
                    }
                    mantemGruposTemp = true;
                }

                todosGrupoMarcados = true;
                $.each(items, function (index, item) {
                    if (index === 0) {
                        primeiroRenderItemAutoC = true;
                    } else {
                        primeiroRenderItemAutoC = false;
                    }
                    item.index = index;
                    that._renderItemData(ul, item);
                });

                if (todosGrupoMarcados) {
                    setTimeout(function () {
                        ultimoLiRenderItemTodos.addClass('mdc-list-item--selected');
                        ultimoLiRenderItemTodos.find('#list-checkbox-item-grupo-todos').prop('checked', true);
                    }, 100);
                }

                let $ul = $(ul);
                $ul.addClass("mdc-list mdc-elevation--z3 mdss-list mdss-list-grupo");
                $ul.attr("data-mdc-auto-init", "MDCList");
                $ul.attr("role", "group");
                $ul.find("li:odd").addClass("odd");
                mdc.autoInit();
            };
            sTxtAvGrupo.uiautocomplete("instance")._renderItem = function (ul, item) {
                let objLi = { class: "mdc-list-item p-0 item-grupo item-grupo-" + item.codigo.toString().replace('@', 'arroba').replace('!', 'exclamacao').replaceAll(' ', ''), tabIndex: "0" };
                if (primeiroRenderItemAutoC) {
                    //objLi = { class: "mdc-list-item p-0", tabIndex: "0" };
                }

                let indexSelecionado = listaGruposSelecionadasTemp.findIndex(function (modSel) {
                    return modSel.codigo === item.codigo &&
                        modSel.descricao === item.descricao;
                });
                let $li = $("<li>", objLi)
                    .attr("role", "checkbox")
                    .attr('aria-checked', indexSelecionado >= 0 ? 'true' : 'false');
                if (item.codigo === 'todos') {
                    ultimoLiRenderItemTodos = $li;
                }

                if (indexSelecionado >= 0) {
                    $li.addClass('mdc-list-item--selected');
                } else {
                    if (item.codigo !== 'todos') {
                        todosGrupoMarcados = false;
                    }
                }

                $li.append('<span class="area-conteudo-item-lista"><span class="mdc-list-item__graphic">' +
                    '<div class= "mdc-checkbox">' +
                    '<input type="checkbox"' +
                    '    class= "mdc-checkbox__native-control list-checkbox-item-grupo"' +
                    '    id="list-checkbox-item-grupo-' + item.codigo.toString().replace('@', 'arroba').replace('!', 'exclamacao').replaceAll(' ', '') + '" ' +
                    (indexSelecionado >= 0 ? 'checked' : '') + ' /> ' +
                    '<div class="mdc-checkbox__background">' +
                    '    <svg class="mdc-checkbox__checkmark"' +
                    '        viewBox="0 0 24 24">' +
                    '        <path class="mdc-checkbox__checkmark-path"' +
                    '            fill="none"' +
                    '            d="M1.73,12.91 8.1,19.28 22.79,4.59" />' +
                    '    </svg>' +
                    '    <div class="mdc-checkbox__mixedmark"></div>' +
                    '</div>' +
                    '</div>' +
                    '</span>' +
                    '<label class="mdc-list-item__text" for="list-checkbox-item-grupo-' + item.codigo.toString().replace('@', 'arroba').replace('!', 'exclamacao').replaceAll(' ', '') + '" style="' +
                    (fontSize !== null && fontSize > 8 ? 'font-size: ' + fontSize + 'px;' : '') +
                    (ajusteMarginItemLista !== null ? 'margin: ' + ajusteMarginItemLista + ';' : '') + '">' +
                    item.descricao + '</label></span>');

                return $li.appendTo(ul);
            };
        }



            mdc.autoInit();
            //FIMMMMMMMMMMMMMMMMMMMMMMMMMMM
        }
        
        return divMaster
    }

    criarScriptTag(src, fnloaded = () => {}, content){
        var script = document.createElement( 'script' )
        if(typeof src !== 'undefined' && src !== null) {
            script.setAttribute(
                'src',
                src
            );
            script.setAttribute('async', '');
            
        }

        script.setAttribute('scoped', 'scoped');

        if(typeof content !== 'undefined') {
            script.type = 'text/javascript';
            script.text = content;
        }

        script.onload = function handleScriptLoaded() {
            //console.log('script has loaded');
            fnloaded();
        };
        script.onerror = function handleScriptError() {
            console.log('error loading script: ' + src);
        };
        return script
    }

    alertar(){
        alert('testando')
    }

    aplicarFiltros() {
        aplicarFiltrosInterno()
    }

    setFiltros(filtros, aplicarFiltros = true) {
        setFiltrosInterno(filtros, aplicarFiltros);
        //aplicarFiltrosInterno()
    }

    setFocusPlaca() {
        setFocusPlacaInterno();
    }
}

customElements.define('gp-filtrosavancados', GpFiltrosAvancados)

const gerarToken = async function(username, password) {
    keyGpFiltrosAvancados = '';
    let returnPromise = new Promise((resolve, reject) => {
        $.ajax({
            //URL da página com o WebMethod 
            url: "https://api.gestaoparts.com.br:9093/token?username=" + username + "&password=" + password,
            data: {username, password},
            type: "POST"    ,
            //dataType: "json",
            //contentType: "application/json; charset=utf-8",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            success: function (data) {
                if (typeof data.access_token !== 'undefined') {
                    keyGpFiltrosAvancados = data.access_token;
                    resolve(true)
                } else {
                    resolve(false)
                }
            },
            error: function (req, status, error) {
                console.log('erro ao gerar token: ', error);
                resolve(false)        
            }
        });
    });
    await returnPromise 
    return keyGpFiltrosAvancados;
}

const carregarDadosSecao = async function () {

}

const criarGpFiltrosAvancados = async function (opcoes) {
    //validarFontCarregada()
    let combinacaoCores = 'verde-verde';



    function setarCssPersonalizado(combinacaoCores) {
        let headHTML = document.head.innerHTML;
        headHTML += '<link rel="stylesheet" href="' + (webparts ? '' : 'https://webparts.gestaoparts.com.br') + '/css/custom/' + combinacaoCores + '.css">';
        document.head.innerHTML = headHTML;
    }

    if (typeof opcoes !== 'undefined') {
        if (typeof opcoes.username !== 'undefined' &&
            typeof opcoes.password !== 'undefined'
            /*typeof opcoes.chave !== 'undefined'*/) {
            keyGpFiltrosAvancados = await gerarToken(opcoes.username, opcoes.password);
            if (keyGpFiltrosAvancados === '') {
                alert('Não foi possível gerar os filtros avançados. Tente novamente');
                const divInvalido = document.createElement('div');
                divInvalido.innerHTML = 'Nenhum parametro informado para Filtros Avançados';
                return divInvalido;
            }
        }
        //keyGpFiltrosAvancados = opcoes.chave;
        if (typeof opcoes.slim === 'boolean') {
            slim = opcoes.slim;
        }
        if (typeof opcoes.imagensSlider !== 'undefined') {
            imagensSlider = opcoes.imagensSlider;
        }

        if (typeof opcoes.fontSize === 'number') {
            fontSize = opcoes.fontSize
        }
        //fontSize = 16;

        if (typeof opcoes.ajusteMarginItemLista === 'string') {
            ajusteMarginItemLista = opcoes.ajusteMarginItemLista
        }
        //ajusteMarginItemLista = '0 0 5px 0';

        if (typeof opcoes.ajusteWidthRowAreaAccordionfiltrosavancados === 'string') {
            ajusteWidthRowAreaAccordionfiltrosavancados = opcoes.ajusteWidthRowAreaAccordionfiltrosavancados
        } 
        //ajusteWidthRowAreaAccordionfiltrosavancados = 'calc(100% + 30px)';

        if (typeof opcoes.heightCampos === 'number') {
            heightCampos = opcoes.heightCampos
        }
        //heightCampos = 36;

        if (typeof opcoes.marginBottomCampos === 'number') {
            marginBottomCampos = opcoes.marginBottomCampos
        }
        //marginBottomCampos = 5;
        /*
        fontSize: 16,
        ajusteMarginItemLista: '0 0 5px 0',
        ajusteWidthRowAreaAccordionfiltrosavancados: 'calc(100% + 30px)',
        heightCampos: 36,
        */
        if (typeof opcoes.atributosVeiculoExibir !== 'undefined') {
            atributosVeiculoExibir = $.extend(atributosVeiculoExibir, opcoes.atributosVeiculoExibir);
        }
        //se for obrigatoria botao aplicar fica desabilitado enquanto nao tiver nenhuma versao selecionada
        if (typeof opcoes.versaoVeiculoObrigatoria === 'boolean') {
            versaoVeiculoObrigatoria = opcoes.versaoVeiculoObrigatoria;
        }
        

        if (typeof opcoes.webparts === 'boolean') {
            webparts = opcoes.webparts;
        }
        if (typeof opcoes.exibirCampoDescricao === 'boolean') {
            exfiaDescricao = opcoes.exibirCampoDescricao;
        }
        if (typeof opcoes.tudoUpperCase === 'boolean') {
            tudoUpperCase = opcoes.tudoUpperCase;
        }

        if(typeof opcoes.combinacaoCores === 'string') {
            //valida se esta dentro de um dos aceitaveis senao mantem o padrao e apresenta mensagem
            let iCor = ['dispensar', 'azul-azul', 'azul-laranja', 'cinza-cinza', 'laranja-laranja', 'verde-verde', 'vermelho-vermelho'].indexOf(opcoes.combinacaoCores);
            if(iCor === -1) {
                alert('Combinação de cor não existente. Contate o Suporte da Gestão parts')
            } else {
                combinacaoCores = opcoes.combinacaoCores;
            }
        }

        if(typeof opcoes.secoes === 'object') {
            exfiaSecao = true;
            if(typeof opcoes.secoes.url === 'string') {
                urlSecoes = opcoes.secoes.url;
                methodSecoes = opcoes.secoes.method;
            } else if (typeof opcoes.secoes.getData === 'function' || typeof opcoes.secoes.getData === 'string') {
                paramGetDataSecoes = opcoes.secoes.getData;
            }

            if(typeof opcoes.secoes.campoCodigo === 'string') {
                paramSecoesCampoCodigo = opcoes.secoes.campoCodigo;
            }
            if(typeof opcoes.secoes.campoDescricao === 'string') {
                paramSecoesCampoDescricao = opcoes.secoes.campoDescricao;
            }
            
            if(typeof opcoes.secoes.grupos === 'object') {
                exfiaGrupo = true;
                if(typeof opcoes.secoes.grupos.url === 'string') {
                    urlGrupos = opcoes.secoes.grupos.url;
                    methodGrupos = opcoes.secoes.grupos.method;
                } else if (typeof opcoes.secoes.grupos.getData === 'function' || typeof opcoes.secoes.grupos.getData === 'string') {
                    paramGetDataGrupos = opcoes.secoes.grupos.getData;
                }

                if(typeof opcoes.secoes.grupos.campoCodigo === 'string') {
                    paramGruposCampoCodigo = opcoes.secoes.grupos.campoCodigo;
                }
                if(typeof opcoes.secoes.grupos.campoDescricao === 'string') {
                    paramGruposCampoDescricao = opcoes.secoes.grupos.campoDescricao;
                }
            }   
        }

        if (typeof opcoes.idUtilizador !== 'undefined') {
            idUtilizador = opcoes.idUtilizador;
        }
        if (typeof opcoes.iniciarAberto !== 'undefined') {
            iniciarAberto = opcoes.iniciarAberto;
        }
        if (typeof opcoes.visualEstatico !== 'undefined' && opcoes.visualEstatico) {
            iniciarAberto = true;
            visualEstatico = true;
        }

        if(typeof opcoes.tiposAceitos !== 'undefined'){
            if(!opcoes.tiposAceitos.carros && !opcoes.tiposAceitos.motos && !opcoes.tiposAceitos.caminhoes) {
                alert('Nenhum tipo de veiculo configurado')
                const divInvalido = document.createElement('div');
                divInvalido.innerHTML = 'Nenhum parametro informado para Filtros Avançados';
                return divInvalido;
            }
            exfiaTipoVeiculos = [];
            if(opcoes.tiposAceitos.carros) {
                exfiaTipoVeiculos.push('carros');
            }
            if(opcoes.tiposAceitos.motos) {
                exfiaTipoVeiculos.push('motos');
            }
            if(opcoes.tiposAceitos.caminhoes) {
                exfiaTipoVeiculos.push('caminhões');
            }
        }
    } else {
        alert('Nenhum parametro informado para Filtros Avançados');
        const divInvalido = document.createElement('div');
        divInvalido.innerHTML = 'Nenhum parametro informado para Filtros Avançados';
        return divInvalido;
    }

    const criarSpanParaTesteFonte = function(classeFonte) {
        let span = document.createElement('span');
  
        span.className = classeFonte;
        span.style.display = 'none';
        document.body.insertBefore(span, document.body.firstChild);

        return span;
    }

    let span = criarSpanParaTesteFonte('fa');
    
    function css(element, property) {
        return window.getComputedStyle(element, null).getPropertyValue(property);
    }
    
    let ff = css(span, 'font-family');
    if (!(ff.indexOf('Font') >= 0 && ff.indexOf('Awesome') >= 0)) {
        //alert('nao tem fontawesome vai ser add ' + ff)
        let headHTML = document.head.innerHTML;
        headHTML += '<link rel="stylesheet" href="' + (webparts ? '/' : '') + 'plugins/font-awesome/css/all.css">';
        document.head.innerHTML = headHTML;
    } else {
        contemFontAwesome = true;
    }
    
    document.body.removeChild(span);

    //Verifica se tem a fonte do material design carregada no dom
    span = criarSpanParaTesteFonte('material-icons');

    ff = css(span, 'font-family');
    if (!(ff.indexOf('Material') >= 0 && ff.indexOf('Icons') >= 0)) {
        //alert('nao tem fontawesome vai ser add ' + ff)
        let headHTML = document.head.innerHTML;
        headHTML += '<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">';
        document.head.innerHTML = headHTML;
    } 
    
    document.body.removeChild(span);


    //Verifica se tem a fonte do slick carregada no dom
    //span = criarSpanParaTesteFonte('slick');

    //ff = css(span, 'font-family');
    //if (!(ff.indexOf('slick') >= 0)) {
        //alert('nao tem fontawesome vai ser add ' + ff)
        let headHTML = document.head.innerHTML;
    headHTML += '<link rel="stylesheet" href="' + (webparts ? '/' : 'https://webparts.gestaoparts.com.br/') + 'plugins/slick-1.8.0/slick-theme.css">';
        document.head.innerHTML = headHTML;
    //} 
    
    //document.body.removeChild(span);
    //Fim de validações para fontes necessarias no dom



    var elementoNovo = new GpFiltrosAvancados(opcoes)

    //valida se tem bootstrapjs
    function jqueryDomPreparado(){
        /*if (typeof $.fn.popover === 'undefined') { 
            var script = elementoNovo.criarScriptTag('plugins/bootstrap4.0.0/dist/js/bootstrap.bundle.min.js')
            document.getElementsByTagName('head')[0].appendChild(script)
        }*/
    }
    if(typeof $ === "undefined") {
        var script = elementoNovo.criarScriptTag((webparts ? '' : 'https://webparts.gestaoparts.com.br') + '/plugins/jquery/jquery-3.6.1.js', jqueryDomPreparado)
        document.getElementsByTagName('head')[0].appendChild(script)
    }
    

    var cssEstilosParaDom = '.ui-helper-hidden-accessible { display: none; }',
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

    head.appendChild(style);

    style.type = 'text/css';
    if (style.styleSheet) {
        // This is required for IE8 and below.
        style.styleSheet.cssText = cssEstilosParaDom;
    } else {
        style.appendChild(document.createTextNode(cssEstilosParaDom));
    }
    
    if(typeof opcoes !== 'undefined') {
        if(typeof opcoes.container === 'string') {
            document.querySelector(opcoes.container).append(elementoNovo);
        }
    }

    if (combinacaoCores !== 'dispensar') {
        setarCssPersonalizado(combinacaoCores);
    }

    if(typeof opcoes !== 'undefined' && typeof opcoes.callback !== 'undefined') {
        opcoes.callback(elementoNovo);
    }

    return elementoNovo;
}

const validarFontCarregada = function(){

}
