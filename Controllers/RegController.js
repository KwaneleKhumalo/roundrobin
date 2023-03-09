const register = (req, res) => {
 console.log(req.body);
 res.send('Registration')
}


module.exports = {
 register
}