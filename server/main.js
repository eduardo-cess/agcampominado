import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
 //  iniciarPopulacao(200);
	// avaliar();
	// //console.log(populacaoFitness);
	// for(geracao in _.range(100)){
	// 	contGeracao = geracao + 1;
	// 	reproduzir();
	// 	avaliar();
	// 	console.log("geração: "+geracao+" , melhor indivíduo: "+melhorFitness);
	// }
});
// var contGeracao = 0;
// var populacao = [], populacaoFitness = [], normFitnessArray = [];
// var arraySomaFitness = [], somaFitness = 0; 
// var pais = [], filhos = [];
// var qtdCromossomos = 81, qtdBombas = 19;
// var taxaMutacao = 0.05, taxaCruzamento = 0.8;
// var melhorFitness = 0;
// var mineField = [
//   1,  2, -1,  1, 1, -1, 2, -1, 1,
//   2, -1,  4,  2, 1,  1, 3,  2, 2,
//   3, -1,  4, -1, 2,  1, 2, -1, 1,
//   3, -1,  4,  2, 3, -1, 2,  1, 1,
//   2, -1,  3,  2,-1,  3, 3,  1, 1,
//   1,  1,  2, -1, 3, -1, 2, -1, 1,
//   1,  1,  2,  1, 3,  2, 4,  2, 2,
//   1, -1,  1,  1, 2, -1, 3, -1, 2,
//   1,  1,  1,  1,-1,  2, 3, -1, 2 // -1 == bomba
// ];


// function iniciarPopulacao(qtdIndividuos){
// 	for(i in _.range(qtdIndividuos)){
// 		individuo = [];
// 		for(j in _.range(qtdCromossomos))
// 			individuo.push(0);
// 		for(j in _.range(qtdBombas)){
// 			posicaoBomba = math.randomInt(qtdCromossomos);
// 			individuo[posicaoBomba] = 1;
// 		}
// 		populacao.push(individuo);
// 	}
// }

// function avaliar(){
// 	for(i in populacao){
// 		var fitness = 0;
// 		for(j in populacao[i]){
// 			if(populacao[i][j]==1 && mineField[j]==-1)
// 				fitness++;
// 			if(populacao[i][j]==0 && mineField[j]!=-1)
// 				fitness++;
// 		}
// 		if(fitness > melhorFitness)
// 			melhorFitness = fitness;
// 		populacaoFitness.push(fitness);
// 	}
// }

// function selecao(somaFitness){
// 	var rand = math.random(0,somaFitness);

// 	for(i in arraySomaFitness){
// 		if (arraySomaFitness[i] >= rand){
// 			pais.push(populacao[i]);
// 			rand = math.random(0,somaFitness);
// 		}
// 		if(pais.length == 2)
// 			break;
// 	}
// 	if(pais.length < 2)
// 		selecao(somaFitness);
// }

// function roleta(){
// 	arraySomaFitness = [];

// 	somaFitness = 0;
// 	for(i in populacaoFitness){
// 		somaFitness += populacaoFitness[i];
// 		arraySomaFitness.push(somaFitness);
// 	}
// }

// function cruzamento(){//cruxamento binário
// 	var filho1 = [], filho2 =[];
// 		for(i in _.range(qtdCromossomos)){
// 			var padrao = math.randomInt(2);
// 			if(padrao == 1){
// 				filho1.push(pais[0][i]);
// 				filho2.push(pais[1][i]);
// 			}else{
// 				filho1.push(pais[1][i]);
// 				filho2.push(pais[0][i]);
// 			}
// 		}
// 		filhos.push(filho1);
// 		filhos.push(filho2);
// 		pais = [];
// }

// function reproduzir(){
// 	filhos=[];
// 	roleta();
// 	selecao(somaFitness);

// 	while(filhos.length < populacao.length){
// 		if(Math.random() <= taxaCruzamento){
// 			cruzamento();
// 			selecao(somaFitness);
// 		}
// 	}

// 	// if (tipo_ag == 2 || tipo_ag == 4 || tipo_ag == 6)
// 	// 	this.filhos[0] = this.mais_apto;//elitismo
// 	bubbleSortPopulacao(populacaoFitness);
// 	console.log(populacaoFitness);
// 	filhos[0] = populacao[qtdCromossomos-1];
// 	populacaoFitness = [];
// 	populacao = [];
// 	populacao = filhos;

// 	mutacao();
// }

// function mutacao(){
// 	for(i in populacao){
// 		//if(i > 0){
// 			for(j in populacao[i]){
// 				if(Math.random() <= taxaMutacao)
// 					populacao[i][j] = (populacao[i][j] == 0) ? 1 : 0;
// 			}
// 		//}
// 	}
// }

// function bubbleSortPopulacao(a){
// 	var swapped, temp, temp_pop;
// 	do {
// 		swapped = false;
// 		for (var i=0; i < a.length-1; i++) {
// 			if (a[i] > a[i+1]) {
// 				temp = a[i];
// 				a[i] = a[i+1];
// 				a[i+1] = temp;
				
// 				temp_pop = populacao[i];
// 				populacao[i] = populacao[i+1];
// 				populacao[i+1] = temp_pop;

// 				swapped = true;
// 			}
// 		}
// 	} while (swapped);
// }

// function normLinear(){
// 	var min=1,max=1.001;
// 	for(i in _.range(qtdIndividuos))
// 		normFitnessArray.push(min+(max-min)/(qtdIndividuos-1)*(i-1));
// }