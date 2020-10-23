
//Functions 

export async function getAllPlants () {

  const acssesToken = 'PqkcgwjM19loWLf_mmid8W6UOm8jtwWwnWn8RWO8IuM';
  const allPlantsURL = 'http://trefle.io/api/v1/plants?token='+acssesToken;

  var genusName = new Array();
  const fetch = require('node-fetch') ;

    const response = await fetch(allPlantsURL);
    const json = await response.json();


    // if(!json.data[0].name)
    if (response.status>=200 && response.status<=299){

      if(!json.data[0].common_name){
        return []
      }

    for (var i = 0; i < json.data.length; i++) {
        var counter = json.data[i];
        if(counter.common_name==null){
          continue
        }
        
        genusName[i]=counter.common_name;
    }   
 

  return genusName;
    }else{ return [];
    }
}


//exports functions
// module.exports = {
//   functions: APIcalls
// };
