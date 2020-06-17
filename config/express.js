// Carrega através da função require, o módulo do express.
var express = require('express');

// Carrega o módulo responsável por converter o conteúdo enviado pelo cliente em um objeto JSON
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var cors = require('cors');

// Carrega o módulo para autenticação.
var session = require('express-session');
var passport = require('passport');

// Carrega o módulo para segurança.
var helmet = require('helmet');

// Carrega o módulo Express-load 
var load = require('express-load');

// Exports é um objeto no qual guarda informações que são visíveis fora do módulo.
// Ele será responsável por retornar uma instância do Express.
module.exports = function() {
    var app = express();

    app.use(cors({
            credentials: true, 
            origin: '*',
            methods : ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
            allowedHeaders : ['Content-Type', 'Accept']
        }));
    
    // Configuração do ambiente
    app.set('port', 3000);
    
    // Middlewares de Autenticação e Sessão
    app.use(cookieParser());
    app.use(session(
        {
            secret: 'palavra secreta',
            resave: true,
            saveUninitialized: true,
            cookie: { maxAge : 3600000 }
        }
    ));
    
    app.use(passport.initialize());
    app.use(passport.session());
    
    app.use(helmet());
    /* Troca no Header de resposta do servidor, qual é a tecnologia utilizada.
    Muito útil para atrapalhar Hackers que queiram explorar vulnerabilidades. */
    app.use(helmet.hidePoweredBy({setTo : 'PHP 5.5.14'})); 
    //app.disable('x-powered-by');    
    // Evita que as páginas sejam referênciadas por frame ou iframe.
    app.use(helmet.xframe());    
    // Não permite que o atacante inclua um script malicioso dentro de uma postagem de um blog (Por exemplo).
    app.use(helmet.xssFilter());    
    // Não permite que o navegador inclua arquivos com MIME-TYPE diferentes de text/css ou text/js
    app.use(helmet.nosniff());

    // Middleware
    app.use(express.static('./public'));
    app.set('view engine', 'ejs');
    app.set('views','./app/views');
    
    // Novos Middlewares (Para utilizar os métodos PUT e DELETE) e obter dados da requisição em req.body
    app.use(bodyParser.urlencoded({extended : true}));
    app.use(bodyParser.json());
    app.use(require('method-override')());
    
    // Carrega os Modelos, Controladores e Rotas no ExpressJS via Expess-load
    load('models', {cwd:'app'})
        .then('controllers')
        .then('routes')
        .into(app); 
    
    // Se nenhuma rota atender, direciona para a página 404
    app.get('*', function (req, res) {
        res.status(404).render('404');
    });
    
    return app;    
};