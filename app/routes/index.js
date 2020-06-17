module.exports = function(app) {
    app.get('/', function(req, res) {
        var email = '';
        if (req.user) {
            email = req.user.email;
        }
        res.render('index', {"usuarioLogado" : email}); 
    });
};