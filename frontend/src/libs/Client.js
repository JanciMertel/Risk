class Client {
  connect(authData) {
    return fetch('http://localhost:3000/', {
      credentials: "include"
    }).then((response) => {
      this.socket = io.connect('localhost:3000', {
        query: 'login=' + JSON.stringify(authData)
      });
      return new Promise((resolve, reject) => {
        this.socket.on('connect', () => {
          console.log('connected')
          resolve();
        });
      })
    });
  }

  on() {
    if(this.socket) {
      this.socket.on.apply(this.socket, arguments);
    }
  }

  emit() {
    if(this.socket) {
      this.socket.emit.apply(this.socket, arguments);
    }
  }

  join() {
    if(this.socket) {
      this.socket.join.apply(this.socket, arguments);
    }
  }
}

export default new Client();
