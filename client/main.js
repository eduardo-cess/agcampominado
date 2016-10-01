import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';


var contGeracao = 0;
var populacao = new Array(), populacaoFitness = [], normFitness = [], individuoMaisApto = [];
var melhoresPorGeracao = [], pioresPorGeracao = [];
var arraySomaFitness = [], somaFitness = 0; 
var pais = [], filhos = [];
var qtdCromossomos = 81, qtdBombas = 19;
var taxaMutacao = 0.05, taxaCruzamento = 0.8;
var melhorFitness = 0;
var mineField = [
  1,  2, -1,  1, 1, -1, 2, -1, 1,
  2, -1,  4,  2, 1,  1, 3,  2, 2,
  3, -1,  4, -1, 2,  1, 2, -1, 1,
  3, -1,  4,  2, 3, -1, 2,  1, 1,
  2, -1,  3,  2,-1,  3, 3,  1, 1,
  1,  1,  2, -1, 3, -1, 2, -1, 1,
  1,  1,  2,  1, 3,  2, 4,  2, 2,
  1, -1,  1,  1, 2, -1, 3, -1, 2,
  1,  1,  1,  1,-1,  2, 3, -1, 2 // -1 == bomba
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
	populacaoFitness = [];
	for(i in populacao){
		var fitness = 0;
		for(j in populacao[i]){
			if(populacao[i][j]==1 && mineField[j]==-1)
				fitness++;
			if(populacao[i][j]==0 && mineField[j]!=-1)
				fitness++;
		}
		if(fitness > melhorFitness){
			melhorFitness = fitness;
			individuoMaisApto = populacao[i];
		}
		populacaoFitness.push(fitness);
	}
}

function selecao(somaFitness){
	var rand = math.random(0,somaFitness);
	for(i in arraySomaFitness){
		if (arraySomaFitness[i] >= rand){
			pais.push(populacao[i]);
			rand = math.random(0,somaFitness);
		}
		if(pais.length == 2)
			break;
	}
	if(pais.length < 2)
		selecao(somaFitness);
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

function reproduzir(){
	filhos=[];
	roleta();
	selecao(somaFitness);
	while(filhos.length < populacao.length){
		if(Math.random() <= taxaCruzamento){
			cruzamento();
			selecao(somaFitness);
		}
	}
	filhos[0] = individuoMaisApto;//elitismo
	//console.log(individuoMaisApto);
	populacao = [];
	populacao = filhos;
	mutacao();
	retirarExcessoBombasPopulacao();
}

function mutacao(){
	for(i in populacao){
		if(populacaoFitness[i] != qtdCromossomos){
			if(i>0 && populacaoFitness[i] < 79){
				for(j in populacao[i]){
					if(Math.random() <= taxaMutacao)
						populacao[i][j] = (populacao[i][j] == 0) ? 1 : 0;
				}
			}	
		}else break;
	}
}

function retirarExcessoBombasPopulacao(){
	for(i in populacao){
		if(populacaoFitness[i] != qtdCromossomos)
			retiraBombasIndividuo(populacao[i]);
		else break;
	}
}

function retiraBombasIndividuo(individuo){
	var bombas = countBombasIndividuo(individuo);
	if(bombas > qtdBombas)
		while(bombas > qtdBombas){
			var random = math.randomInt(qtdCromossomos);
			if(individuo[random] == 1){
				if(mineField[random] != -1)
					individuo[random] = 0;
			}
			bombas = countBombasIndividuo(individuo);
		}			
}

function countBombasIndividuo(individuo){
	count = 0;
	for(i in individuo){
		if(individuo[i] == 1)
			count++;
	}
	return count;
}


Template.main.onCreated(function mainOnCreated() {
});

Template.main.events({
	'click .iniciarAg'(event, instance) {
		var start = new Date();
		iniciarPopulacao(100);
		avaliar();
		for(geracao in _.range(200)){
			contGeracao = geracao + 1;
			reproduzir();
			avaliar();
			if(melhorFitness == 81)
				var time = new Date() - start;
			$('#statusAg').html("geração: "+geracao+" , melhor indivíduo: "+melhorFitness);
		}
		if(!time)
			$('#statusAg').html("Não achou a solução");
		else
			$('#statusAg').html("Tempo até encontrar a solução: "+time/1000+" segundos");
    for(i in populacao[0]){
    	var id = '#'+i;
    	if(populacao[0][i] != 1)
    		$(id).trigger('click');
    }
  },
});
