const notFoundRoute = (req,res) => {
 res.status(404).send(`
 <div style="display:flex;flex-direction:column;justify-content:center;align-items:center;">
  <h1>404!</h1>
  <strong>Requested Page does not exist!</strong>
 </div>
 
 `)
};

module.exports = notFoundRoute