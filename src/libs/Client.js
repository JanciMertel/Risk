class Client {
  connect(authData) {
    return fetch('http://localhost:3000/', {
      credentials: "include"
    }).then((response) => {
      console.log('connecting? ');
      const socket = io.connect('localhost:3000', {
        query: 'login=' + JSON.stringify(authData)
      });
      return new Promise((resolve, reject) => {
        socket.on('connect', () => {
          console.log('connected')
          resolve();
        });
      })
    });
  }
}

export default new Client();
