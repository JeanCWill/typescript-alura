System.register(["../views/index", "../models/index", "../helpers/decorators/index", "../service/index", "../helpers/Utils"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __moduleName = context_1 && context_1.id;
    var index_1, index_2, index_3, index_4, Utils_1, NegociacaoController, DiasDaSemana;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (index_2_1) {
                index_2 = index_2_1;
            },
            function (index_3_1) {
                index_3 = index_3_1;
            },
            function (index_4_1) {
                index_4 = index_4_1;
            },
            function (Utils_1_1) {
                Utils_1 = Utils_1_1;
            }
        ],
        execute: function () {
            NegociacaoController = class NegociacaoController {
                constructor() {
                    this._negociacoes = new index_2.Negociacoes();
                    this._negociacoesView = new index_1.NegociacoesView("#negociacoesView");
                    this._mensagemView = new index_1.MensagemView("#mensagemView");
                    this._negociacaoService = new index_4.NegociacaiService();
                    this._negociacoesView.update(this._negociacoes);
                }
                adiciona() {
                    let data = new Date(this._inputData.val().replace(/-/g, ","));
                    if (!this._ehDiaUtil(data)) {
                        this._mensagemView.update("Somente negociações em dias úteis, por favor!");
                        return;
                    }
                    const negociacao = new index_2.Negociacao(data, parseInt(this._inputQuantidade.val()), parseFloat(this._inputValor.val()));
                    this._negociacoes.adiciona(negociacao);
                    Utils_1.imprime(negociacao, this._negociacoes);
                    this._negociacoesView.update(this._negociacoes);
                    this._mensagemView.update("Negociação adicionada com sucesso");
                }
                importaDados() {
                    return __awaiter(this, void 0, void 0, function* () {
                        try {
                            const negociacoesParaImportar = yield this._negociacaoService
                                .obterNegociacoes(res => {
                                if (res.ok) {
                                    return res;
                                }
                                else {
                                    throw new Error(res.statusText);
                                }
                            });
                            const negociacoesImportadas = this._negociacoes.paraArray();
                            negociacoesParaImportar
                                .filter(negociacao => !negociacoesImportadas.some(jaImportada => negociacao.ehIgual(jaImportada)))
                                .forEach(negociacao => this._negociacoes.adiciona(negociacao));
                            this._negociacoesView.update(this._negociacoes);
                        }
                        catch (err) {
                            this._mensagemView.update(err.message);
                        }
                    });
                }
                _ehDiaUtil(data) {
                    return data.getDay() != DiasDaSemana.Sabado && data.getDay() != DiasDaSemana.Domingo;
                }
            };
            __decorate([
                index_3.domInject("#data")
            ], NegociacaoController.prototype, "_inputData", void 0);
            __decorate([
                index_3.domInject("#quantidade")
            ], NegociacaoController.prototype, "_inputQuantidade", void 0);
            __decorate([
                index_3.domInject("#valor")
            ], NegociacaoController.prototype, "_inputValor", void 0);
            __decorate([
                index_3.throttle()
            ], NegociacaoController.prototype, "adiciona", null);
            __decorate([
                index_3.throttle()
            ], NegociacaoController.prototype, "importaDados", null);
            exports_1("NegociacaoController", NegociacaoController);
            (function (DiasDaSemana) {
                DiasDaSemana[DiasDaSemana["Domingo"] = 0] = "Domingo";
                DiasDaSemana[DiasDaSemana["Segunda"] = 1] = "Segunda";
                DiasDaSemana[DiasDaSemana["Terca"] = 2] = "Terca";
                DiasDaSemana[DiasDaSemana["Quarta"] = 3] = "Quarta";
                DiasDaSemana[DiasDaSemana["Quinta"] = 4] = "Quinta";
                DiasDaSemana[DiasDaSemana["Sexta"] = 5] = "Sexta";
                DiasDaSemana[DiasDaSemana["Sabado"] = 6] = "Sabado";
            })(DiasDaSemana || (DiasDaSemana = {}));
        }
    };
});
