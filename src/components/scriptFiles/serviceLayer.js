let YT = null;
function initiate() {
  if (YT) {
    return Promise.resolve(YT);
  } else {
    return new Promise(resolve => {
      function start() {
        window.gapi.client
          .init({
            apiKey: "AIzaSyDXKk9k1aAecAdIaIkhGG5zUFUhlauHnHg",
            discoveryDocs: [
              "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"
            ]
          })
          .then(() => {
            YT = true;
            resolve();
          });
      }
      gapi.load("client", start);
    });
  }
}
function search(searchText) {
  return initiate().then(() => {
    return Promise.resolve(
      window.gapi.client.youtube.search.list({
        q: searchText,
        part: "snippet"
      })
    )
      .then(response => {
        return response.result;
      })
      .catch(reason => {
        return reason.result.error.message;
      });
  });
}
export default {
  search
};
