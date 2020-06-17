var passport = require('passport');

module.exports = function(app) {
    
    app.route('/auth').get(verificaAutenticacao, function (req, res) {
        res.status(200).json(['Authorized']);
    });        
    
    app.post('/auth', passport.authenticate('local', 
        { successRedirect : '/#/app/dashboard' }));
    
    app.get('/auth/github', passport.authenticate('github'));
    
    app.get('/auth/github/callback', passport.authenticate('github', {
        successRedirect : '/#/app/dashboard'
    }));
    
    app.get('/logout', function(req, res) {
        console.log('### Logout');
        req.logOut(); //Exposto pelo passport
        res.redirect('/');
    });
    
};

//Middleware
function verificaAutenticacao(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status('401').json('Não autorizado');
    }
}