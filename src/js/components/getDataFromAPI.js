const status = function (response) {
    if (response.status !== 200) {
      return Promise.reject(new Error(response.statusText))
    }
    return Promise.resolve(response)
  }

const myInit = {
    method: 'GET',
    mode: 'cors',
    cache: 'default',
    data: 'JSON'
};

export class getData {
    
    fetch() {
        var data = fetch('https://ws.warframestat.us/pc', myInit)
        .then(status)
        .then((data) => data.json())
        .catch((error) => {
            console.log('error', error)
          })
    return data;
    }
}