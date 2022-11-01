//Exercicio: Distância de Edição (DE)

const ultimaLetra = (palavra: string): string => palavra[palavra.length - 1];
const menosLetra = (palavra: string): string =>
  palavra.substring(0, palavra.length - 1);

// Versão recursiva simples
let countRS = 0;
const distEdicaoRS = (a: string, b: string): number => {
  countRS += 1;
  if (a === '' && b === '') return 0;
  if (a === '' && b !== '') return b.length;
  if (a !== '' && b === '') return a.length;
  if (ultimaLetra(a) === ultimaLetra(b))
    return distEdicaoRS(menosLetra(a), menosLetra(b));

  return (
    Math.min(
      distEdicaoRS(menosLetra(a), menosLetra(b)), // substituir
      distEdicaoRS(menosLetra(a), b), // apagar
      distEdicaoRS(a, menosLetra(b)) // inserir
    ) + 1
  );
};

const distanciaRS = distEdicaoRS('kitten', 'sitting');
console.log(distanciaRS, countRS);

// Versão recursiva memoizada (top-down)
let countTD = 0;
interface Memo {
  [key: string]: number;
}
const distEdicaoTD = (a: string, b: string, memo = {} as Memo): number => {
  countTD += 1;
  let cost = 0;
  if (memo[a + b] !== undefined) return memo[a + b];
  if (a === '' && b === '') return 0;
  if (a === '' && b !== '') return b.length;
  if (a !== '' && b === '') return a.length;
  if (ultimaLetra(a) === ultimaLetra(b)) {
    cost = distEdicaoTD(menosLetra(a), menosLetra(b), memo);
  } else {
    cost =
      Math.min(
        distEdicaoTD(menosLetra(a), menosLetra(b), memo), // substituir
        distEdicaoTD(menosLetra(a), b, memo), // apagar
        distEdicaoTD(a, menosLetra(b), memo) // inserir
      ) + 1;
  }
  memo[a + b] = cost;
  return cost;
};

const distanciaTD = distEdicaoTD('kitten', 'sitting');
console.log(distanciaTD, countTD);

// Versão tabulação (bottom-up)
let countBU = 0;
const distEdicaoBU = (a: string, b: string): number => {
  let costTable: number[][] = Array(a.length + 1)
    .fill(0)
    .map(() => Array(b.length + 1).fill(0));

  for (var i = 0; i <= a.length; i++) {
    countBU += 1;
    costTable[i][0] = i;
  }

  for (var i = 0; i <= b.length; i++) {
    countBU += 1;
    costTable[0][i] = i;
  }

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      countBU += 1;
      if (a.charAt(i - 1) == b.charAt(j - 1)) {
        costTable[i][j] = costTable[i - 1][j - 1];
      } else {
        costTable[i][j] =
          Math.min(
            costTable[i - 1][j - 1], // substituir
            costTable[i - 1][j], // apagar
            costTable[i][j - 1] // inserir
          ) + 1;
      }
    }
  }
  return costTable[a.length][b.length];
};

const distanciaBU = distEdicaoBU('kitten', 'sitting');
console.log(distanciaBU, countBU);

// Referência: https://en.wikipedia.org/wiki/Levenshtein_distance
