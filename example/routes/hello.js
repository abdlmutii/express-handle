module.exports = {

name: '/hello',

method: 'GET',

description: 'Returns a hello message',

disabled: false,

run: (req, res) => {

   res.send('Hello World!');

  }

}
