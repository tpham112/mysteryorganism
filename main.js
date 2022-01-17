// @ts-check

// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Returns a new specimen object
const pAequorFactory = (number, array) => {
  return {
    specimenNum: number,
    dna: array,
    mutate() {
      const randomIndex = Math.floor(Math.random() * this.dna.length);
      let newBase = returnRandBase();
      while (this.dna[randomIndex] === newBase) { // if newBase is equal to the randomly selected dna from the array
        newBase = returnRandBase(); // we run returnRandBase() on newBase again and again until it breaks the condition in the while loop
      }
      this.dna[randomIndex] = newBase;
      return this.dna;
    },
    compareDna(otherSpecimen) {
      let dnaMatches = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === otherSpecimen.dna[i]) { // checks at index i for both arrays and if there is a match, we will increment the match counter
          dnaMatches ++
        }
      }
      const percentageCalculation = (dnaMatches / this.dna.length) * 100;
      const percentageCalculationTo2 = percentageCalculation.toFixed(2);
      console.log(`Specimen ${this.specimenNum} and Specimen ${otherSpecimen.specimenNum} have ${percentageCalculationTo2}% DNA in common.`)
    },
    willLikelySurvive() {
      let dnaCounter = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === 'C' || this.dna[i] === 'G') {
          dnaCounter ++;
        }
      }
      const survivabilityPercentage = (dnaCounter / this.dna.length) * 100;
      if (survivabilityPercentage >= 60) {
        return true
      } else {
        return false;
      }
    }
  }
}

// Returns array of 30 specimens likely to survive
const forStudy = () => {
  const newList = [];
  let specimenCounter = 1;
  while (newList.length < 30) {
    let newSpecimen = pAequorFactory(specimenCounter, mockUpStrand());
    if (newSpecimen.willLikelySurvive() === true) {
      newList.push(newSpecimen);
    }
    specimenCounter ++;
  }
  return newList;
}

console.log(forStudy())