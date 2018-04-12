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
        part: "snippet",
        maxResults: 24,
        regionCode: 'IN'
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
function searchCharts(searchChartText) {
  var categoryId=''
    switch(searchChartText.toLowerCase()){
      case "music":
        categoryId = 10
        break;
        case "most popular":
        categoryId = null;
        break;
        case "sports":
        categoryId = 17;
        break;
        case "technology":
        categoryId = 28;
        break;
        case "movies":
        categoryId = 1;
        break;
        default:
        categoryId = null;
        break;
  }
  
  return initiate().then(() => {
    return Promise.resolve(
      window.gapi.client.youtube.videos.list({
        chart: 'mostpopular',
        part: "snippet,contentDetails,statistics",
        maxResults: 24,
        videoCategoryId : categoryId
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
function fetchStats(videoIdList) {
  return initiate().then(() => {
    return Promise.resolve(
      window.gapi.client.youtube.videos.list({
        part: "statistics",
        id:videoIdList
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


function fetchComments(videoId) {
  return initiate().then(() => {
    return Promise.resolve(
      window.gapi.client.youtube.commentThreads.list({
        part: "snippet",
        maxResults: 10,
        videoId : videoId
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
  search,searchCharts, fetchComments, fetchStats
};
