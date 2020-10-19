
//APIs calls
class APIcalls {

  // const acssesToken = 'PqkcgwjM19loWLf_mmid8W6UOm8jtwWwnWn8RWO8IuM';
  // const allPlantsURL = 'https://trefle.io/api/v1/plants?token='+acssesToken;
    constructor() {
        this.acssesToken = 'PqkcgwjM19loWLf_mmid8W6UOm8jtwWwnWn8RWO8IuM';
        this.allPlantsURL = 'http://trefle.io/api/v1/genus?token='+this.acssesToken;
      }


}
//Functions 

//Get family name
var getAllPlants =  (callback) => {

  const acssesToken = 'PqkcgwjM19loWLf_mmid8W6UOm8jtwWwnWn8RWO8IuM';
  const allPlantsURL = 'http://trefle.io/api/v1/genus?token='+acssesToken;


  const fetch = require('node-fetch') ;
  
  (async () => {

    const response = await fetch(allPlantsURL);
    const json = await response.json();

    var genusName = new Array();

    for (var i = 0; i < json.data.length; i++) {
        var counter = json.data[i];
        genusName[i]=counter.name;
    }
    
   console.log(genusName);
   callback(genusName);
   
  
  })();
}

export default getAllPlants;

//exports functions
// module.exports = {
//   functions: APIcalls
// };
