let apiList = "./api/index.json"

fetch(apiList)
  .then(response => response.json())
  .then(data => console.log(data))