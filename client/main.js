import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';


Template.main.onCreated(function mainOnCreated() {
	iniciarPopulacao(2);
	console.log(populacao);

});

Template.main.events({
	// 'click .reiniciar'(event, instance) {
    
 //  },
});

var populacao = [], populacaoFitness = [];
var arraySomaFitness = [], somaFitness = 0; 
var pais = [], filhos = [];
var qtdCromossomos = 81, qtdBombas = 19;
var taxaMutacao = 0.05, taxaCruzamento = 0.8;
var melhorFitness = 0;
var mineField = [
  [1,  2, -1,  1, 1, -1, 2, -1, 1],
  [2, -1,  4,  2, 1,  1, 3,  2, 2],
  [3, -1,  4, -1, 2,  1, 2, -1, 1],
  [3, -1,  4,  2, 3, -1, 2,  1, 1],
  [2, -1,  3,  2,-1,  3, 3,  1, 1],
  [1,  1,  2, -1, 3, -1, 2, -1, 1],
  [1,  1,  2,  1, 3,  2, 4,  2, 2],
  [1, -1,  1,  1, 2, -1, 3, -1, 2],
  [1,  1,  1,  1,-1,  2, 3, -1, 2] // -1 == bomba
];


function iniciarPopulacao(qtdIndividuos){
	for(i in _.range(qtdIndividuos)){
		individuo = [];
		for(j in _.range(qtdCromossomos))
			individuo.push(0);
		for(j in _.range(qtdBombas)){
			posicaoBomba = math.randomInt(qtdCromossomos);
			individuo[posicaoBomba] = 1;
		}
		populacao.push(individuo);
	}
}

function avaliar(){
	for(i in populacao){
		var fitness = 0;
		for(j in populacao[i]){
			if(populacao[j]==1 && mineField[j]==-1)
				fitness++;
			if(populacao[j]==0 && mineField[j]!=-1)
				fitness++;
		}
		if(fitness > melhorFitness)
			melhorFitness = fitness;
		populacaoFitness.push(fitness);
	}
}

function selecao(somaFitness){
	var rand = m.random(0,somaFitness);

	for(i in arraySomaFitness){
		if (arraySomaFitness[i] >= rand){
			pais.push(populacao[i]);
			rand = m.random(0,somaFitness);
		}
		if(pais.length == 2)
			break;
	}
	if(pais.length < 2)
		selecionar(somaFitness);
}

function roleta(){
	arraySomaFitness = [];
	somaFitness = 0;
	for(i in populacaoFitness){
		somaFitness += populacaoFitness[i];
		arraySomaFitness.push(somaFitness);
	}
}

function cruzamento(){//cruxamento binário
	var filho1 = [], filho2 =[];
		for(i in _.range(qtdCromossomos)){
			var padrao = math.randomInt(2);
			if(padrao == 1){
				filho1.push(pais[0][i]);
				filho2.push(pais[1][i]);
			}else{
				filho1.push(pais[1][i]);
				filho2.push(pais[0][i]);
			}
		}
		filhos.push(filho1);
		filhos.push(filho2);
		pais = [];
}

function reproducao(){
	filhos=[];
	roleta();
	selecionar(somaFitness);

	while(filhos.length < populacao.length){
		if(Math.random() <= taxaCruzamento){
			cruzamento();
			selecionar(somaFitness);
		}
	}

	// if (tipo_ag == 2 || tipo_ag == 4 || tipo_ag == 6)
	// 	this.filhos[0] = this.mais_apto;//elitismo

	populacaoFitness = [];
	populacao = [];
	populacao = filhos;

	mutacao();
}

function mutacao(){
	for(i in populacao){
		//if(i > 0){
			for(j in populacao[i]){
				if(Math.random() <= taxaMutacao)
					populacao[i][j] = (populacao[i][j] == 0) ? 1 : 0;
			}
		//}
	}
}

