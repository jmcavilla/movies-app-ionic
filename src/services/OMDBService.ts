const API_URL = 'https://api.themoviedb.org/3/authentication';
const API_KEY = '41615ead4daffb5e616878a03340a3ce';


export function callApi() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTYxNWVhZDRkYWZmYjVlNjE2ODc4YTAzMzQwYTNjZSIsInN1YiI6IjY2MjAwYzZjYTZmZGFhMDE2MzZiM2MyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1xQWyvnnakBMtl1yEnBaSam-sqH8cc39VrViDcKu3kU'
    }
  };
  
    fetch(`${API_URL}`, options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
  }
  