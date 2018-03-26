let YT = null

function initiate(){
  if(YT)
  {
    return Promise.resolve(YT);
  }
  else
  {
    
    return new Promise((resolve)=>{ 

      function start(){
        window.gapi.client.init({
          'apiKey': 'AIzaSyDXKk9k1aAecAdIaIkhGG5zUFUhlauHnHg',
          'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
        }).then(()=>{
          YT =true;
          resolve();
        })
        
      }
      gapi.load('client',start);

    })
  }
}

function search(searchText){
  initiate().then(()=>{
    Promise.resolve(window.gapi.client.youtube.search.list({
      q:searchText,
      part:'snippet'
    })).then((response)=>{ console.log(response.result)},
    (reason)=>{console.log(`Error: ${reason.result.error.message}`)})
  })
}
export default {
  search
  // 2. Initialize the JavaScript client library.
    // window.gapi.client.init({
    //   'apiKey': 'AIzaSyDXKk9k1aAecAdIaIkhGG5zUFUhlauHnHg',
    //   // Your API key will be automatically added to the Discovery Document URLs.
    //   'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
    // }).then(function search () {
    //   return window.gapi.client.youtube.search.list({
    //     q: searchText1,
    //     part: 'snippet'
    //   })
    // }).then(function (response) {
    //   console.log(response.result)
    // }, function (reason) {
    //   console.log('Error: ' + reason.result.error.message)
    // })
}
