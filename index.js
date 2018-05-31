const Server = require('./server.js');
const mongoose = require('mongoose');
const Archivos = require('./archivos/archivos.js');
const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true});
const BrowserWindow = require('events');
const colors = require('colors');
var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');




/*

//este pedaso de codigo pertenece al motor de navegador nightmare.js no se le encontro utilidad para esta aplicacion
nightmare
  .useragent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36')
  .goto('https://adsrt.com/wakeate0106')
  .type('#lst-ib', 'github nightmare')
  .mouseover('#hplogo')
  .select('a.gb_b.gb_hc', '#gb78')
  .click('#gb78')
  .wait('a.card-click-target')
  .type('#gbqfq', 'whatsapp')
  .click('#gbqfb')
  .click('a[href="/store/apps/details?id=com.whatsapp"]')
  .wait('#AHFaub')
  .wait('a[href="http://dolar.mas.tienda/dolares-precio-del-bigmac-en-el-mundo-el-dolares/"]')
  .click('a[href="http://dolar.mas.tienda/dolares-precio-del-bigmac-en-el-mundo-el-dolares/"]')
  .wait('title')
  .mouseover('h1')
  .click('h1')
  .wait(selectorAdshort)
  .check(selectorAdshort)
  .click(selectorAdshort)
  .wait(buttonAdshort)
  .click(buttonAdshort)
  .wait('a.btn.btn-success.btn-lg.get-link')
  .click('a.btn.btn-success.btn-lg.get-link')
  .evaluate(() => document.querySelector('title').innertext)
  .end()
  .then(console.log)
  .catch(error => {
    console.error('Search failed:', error)
  })


  nightmare
  .useragent(useragent)
  .goto('')
  .end()




Archivos.archivos;
Server.server;

cuando en venezuela son las 20 en rusia son las 3*/

//estos son paths globales de la tabla de grupos
var PATH_PJ = 'td[class="fi-table__matchplayed"]'; //partidos jugados     [tabla grupo]
var PATH_PG = 'td[class="fi-table__win"]';         //partidos ganados     [tabla grupo]
var PATH_PE = 'td[class="fi-table__draw"]';        //partidos empatados   [tabla grupo]
var PATH_PP = 'td[class="fi-table__lost"]';        //partidos perdidos    [tabla grupo]
var PATH_GF = 'td[class="fi-table__goalfor"]';     //goles a favor        [tabla grupo]
var PATH_GC = 'td[class="fi-table__goalagainst"]'; //goles en contra      [tabla grupo]
var PATH_DFG = 'td[class="fi-table__diffgoal"]';   //diferencia de goles  [tabla grupo]
var PATH_PTS = 'td[class="fi-table__pts"]';        //puntos totales       [tabla grupo]
var PATH_AV = 'span[class="fi-t__nTri"]';          //abreviatura          [tabla grupo]
var PATH_EQ =  'span[class="fi-t__nText "]';       //nombre del equipo    [tabla grupo]
var grupo_NAME = 'p[class="fi-table__caption__title"]'; //nombre de grupo [tabla grupo]

/* 

    estos son los path directos con id de tabla de cada nombre de equipo y la abreviatura
    y esta claramente identificados por nombre de equipo, cada uno de estos es una direccion
    que el scraper cheerio seguira dependiendo con que path general o amplio se conjuguen

*/

/*paths del grupo A */
var grupoA_PATH = 'table[id="275075"]';

var rusiaPATH_G = 'tr[data-team-id="43965"]';

var arabiaPATH_G = 'tr[data-team-id="43835"]';

var egyptoPATH_G = 'tr[data-team-id="43855"]';

var uruguayPATH_G = 'tr[data-team-id="43930"]';

/*paths del grupo B*/
var grupoB_PATH = 'table[id="275077"]'; 

var portugalPATH_G = 'tr[data-team-id="43963"]';

var espanaPATH_G = 'tr[data-team-id="43969"]';

var marruecosPATH_G = 'tr[data-team-id="43872"]';

var iranPATH_G = 'tr[data-team-id="43817"]';

/*paths del grupo C*/
var grupoC_PATH = 'table[id="275079"]';

var franciaPATH_G = 'tr[data-team-id="43946"]';

var australiaPATH_G = 'tr[data-team-id="43976"]';

var peruPATH_G = 'tr[data-team-id="43929"]';

var dinamarcaPATH_G = 'tr[data-team-id="43941"]';
/*


esta es la funcion request que otorga los datos scraping


*/
request({url: 'http://es.fifa.com/worldcup/groups/', encoding: 'utf-8'}, function(err, resp, body){
    if(!err && resp.statusCode == 200){
      var $ = cheerio.load(body);
      $('div[class="col-xs-12 col-sm-12 col-md-12 col-lg-12 "]').each(function(){
        //esta variable abarca un espacio grande en el body en este caso un table que es la tabla completa
        var a_grupo = $(grupoA_PATH).find(grupo_NAME).text();

        /*
        estos conjuntos de variables obtienen los datos de la pagina http://es.fifa.com/worldcup/groups/
        esto debe tenerce claro para no perderse
        */

        /*grupo A */
        //equipo rusia
        var a_equipoRusia = $(rusiaPATH_G).find(PATH_EQ).text();
        var a_equipoRusia_AV = $(rusiaPATH_G).find(PATH_AV).text();
        var a_equipoRusia_PJ = $(rusiaPATH_G).find(PATH_PJ).text();
        var a_equipoRusia_PG = $(rusiaPATH_G).find(PATH_PG).text();
        var a_equipoRusia_PE = $(rusiaPATH_G).find(PATH_PE).text();
        var a_equipoRusia_PP = $(rusiaPATH_G).find(PATH_PP).text();
        var a_equipoRusia_GF = $(rusiaPATH_G).find(PATH_GF).text();
        var a_equipoRusia_GC = $(rusiaPATH_G).find(PATH_GC).text();
        var a_equipoRusia_DFG = $(rusiaPATH_G).find(PATH_DFG).text();
        var a_equipoRusia_PTS = $(rusiaPATH_G).find(PATH_PTS).text();


        //equipo arabia saudita
        var a_equipoArabiaS = $(arabiaPATH_G).find(PATH_EQ).text();
        var a_equipoArabiaS_AV = $(arabiaPATH_G).find(PATH_AV).text();
        var a_equipoArabiaS_PJ = $(arabiaPATH_G).find(PATH_PJ).text();
        var a_equipoArabiaS_PG = $(arabiaPATH_G).find(PATH_PG).text();
        var a_equipoArabiaS_PE = $(arabiaPATH_G).find(PATH_PE).text();
        var a_equipoArabiaS_PP = $(arabiaPATH_G).find(PATH_PP).text();
        var a_equipoArabiaS_GF = $(arabiaPATH_G).find(PATH_GF).text();
        var a_equipoArabiaS_GC = $(arabiaPATH_G).find(PATH_GC).text();
        var a_equipoArabiaS_DFG = $(arabiaPATH_G).find(PATH_DFG).text();
        var a_equipoArabiaS_PTS = $(arabiaPATH_G).find(PATH_PTS).text();


        //equipo egypto
        var a_equipoEgypto = $(egyptoPATH_G).find(PATH_EQ).text();
        var a_equipoEgypto_AV = $(egyptoPATH_G).find(PATH_AV).text();
        var a_equipoEgypto_PJ = $(egyptoPATH_G).find(PATH_PJ).text();
        var a_equipoEgypto_PG = $(egyptoPATH_G).find(PATH_PG).text();
        var a_equipoEgypto_PE = $(egyptoPATH_G).find(PATH_PE).text();
        var a_equipoEgypto_PP = $(egyptoPATH_G).find(PATH_PP).text();
        var a_equipoEgypto_GF = $(egyptoPATH_G).find(PATH_GF).text();
        var a_equipoEgypto_GC = $(egyptoPATH_G).find(PATH_GC).text();
        var a_equipoEgypto_DFG = $(egyptoPATH_G).find(PATH_DFG).text();
        var a_equipoEgypto_PTS = $(egyptoPATH_G).find(PATH_PTS).text();


        //equipo uruguay
        var a_equipoUruguay = $(uruguayPATH_G).find(PATH_EQ).text();
        var a_equipoUruguay_AV = $(uruguayPATH_G).find(PATH_AV).text();
        var a_equipoUruguay_PJ = $(uruguayPATH_G).find(PATH_PJ).text();
        var a_equipoUruguay_PG = $(uruguayPATH_G).find(PATH_PG).text();
        var a_equipoUruguay_PE = $(uruguayPATH_G).find(PATH_PE).text();
        var a_equipoUruguay_PP = $(uruguayPATH_G).find(PATH_PP).text();
        var a_equipoUruguay_GF = $(uruguayPATH_G).find(PATH_GF).text();
        var a_equipoUruguay_GC = $(uruguayPATH_G).find(PATH_GC).text();
        var a_equipoUruguay_DFG = $(uruguayPATH_G).find(PATH_DFG).text();
        var a_equipoUruguay_PTS = $(uruguayPATH_G).find(PATH_PTS).text();
       


        //debug en consola de los datos para rusia
        console.log(a_grupo.yellow.bold.inverse);
        console.log('-------******-------');
        console.log('equipo: '+ a_equipoRusia + ', abreviatura: ' +  a_equipoRusia_AV);
        console.log('partidos jugados: '.red + a_equipoRusia_PJ);        
        console.log('partidos ganados: '.red + a_equipoRusia_PG);
        console.log('partidos empatados: '.red + a_equipoRusia_PE);
        console.log('partidos perdidos: '.red + a_equipoRusia_PP);
        console.log('goles a favor: '.red + a_equipoRusia_GF);
        console.log('goles en contra: '.red + a_equipoRusia_GC);
        console.log('diferencia de goles: '.red + a_equipoRusia_DFG);
        console.log('puntos totales: '.red + a_equipoRusia_PTS);
        console.log('-------******-------');
        //debug en consola de los datos para arabia saudita
        console.log('equipo: '+ a_equipoArabiaS + ', abreviatura: ' + a_equipoArabiaS_AV);
        console.log('partidos jugados: '.red + a_equipoArabiaS_PJ);
        console.log('partidos ganados: '.red  + a_equipoArabiaS_PG);
        console.log('partidos empatados: '.red + a_equipoArabiaS_PE);
        console.log('partidos perdidos: '.red + a_equipoArabiaS_PP);
        console.log('goles a favor: '.red + a_equipoArabiaS_GF);
        console.log('goles en contra: '.red + a_equipoArabiaS_GC);
        console.log('diferencia de goles: '.red + a_equipoArabiaS_DFG);
        console.log('puntos totales: '.red + a_equipoArabiaS_PTS);
        console.log('-------******-------');
        //debug en consola de los datos para egypto
        console.log('equipo: '+ a_equipoEgypto + ', abreviatura: ' + a_equipoEgypto_AV);
        console.log('partidos jugados: '.red + a_equipoEgypto_PJ);        
        console.log('partidos ganados: '.red + a_equipoEgypto_PG);
        console.log('partidos empatados: '.red + a_equipoRusia_PE);
        console.log('partidos perdidos: '.red + a_equipoEgypto_PP);
        console.log('goles a favor: '.red + a_equipoEgypto_GF);
        console.log('goles en contra: '.red + a_equipoEgypto_GC);
        console.log('diferencia de goles: '.red + a_equipoEgypto_DFG);
        console.log('puntos totales: '.red + a_equipoEgypto_PTS);  
        console.log('-------******-------');
        //debug en consola de los datos para uruguay
        console.log('equipo: '+ a_equipoUruguay + ', abreviatura: ' + a_equipoUruguay_AV);
        console.log('partidos jugados: '.red + a_equipoUruguay_PJ);        
        console.log('partidos ganados: '.red + a_equipoUruguay_PG);
        console.log('partidos empatados: '.red + a_equipoUruguay_PE);
        console.log('partidos perdidos: '.red + a_equipoUruguay_PP);
        console.log('goles a favor: '.red + a_equipoUruguay_GF);
        console.log('goles en contra: '.red + a_equipoUruguay_GC);
        console.log('diferencia de goles: '.red + a_equipoUruguay_DFG);
        console.log('puntos totales: '.red + a_equipoUruguay_PTS); 


         /*grupo B */

        var b_grupo = $(grupoB_PATH).find(grupo_NAME).text();
        
        //equipo portugal
        var b_equipoPortugal = $(portugalPATH_G).find(PATH_EQ).text();
        var b_equipoPortugal_AV = $(portugalPATH_G).find(PATH_AV).text();
        var b_equipoPortugal_PJ = $(portugalPATH_G).find(PATH_PJ).text();
        var b_equipoPortugal_PG = $(portugalPATH_G).find(PATH_PG).text();
        var b_equipoPortugal_PE = $(portugalPATH_G).find(PATH_PE).text();
        var b_equipoPortugal_PP = $(portugalPATH_G).find(PATH_PP).text();
        var b_equipoPortugal_GF = $(portugalPATH_G).find(PATH_GF).text();
        var b_equipoPortugal_GC = $(portugalPATH_G).find(PATH_GC).text();
        var b_equipoPortugal_DFG = $(portugalPATH_G).find(PATH_DFG).text();
        var b_equipoPortugal_PTS = $(portugalPATH_G).find(PATH_PTS).text();

        //equipo espana
        var b_equipoEspana = $(espanaPATH_G).find(PATH_EQ).text();
        var b_equipoEspana_AV = $(espanaPATH_G).find(PATH_AV).text();
        var b_equipoEspana_PJ = $(espanaPATH_G).find(PATH_PJ).text();
        var b_equipoEspana_PG = $(espanaPATH_G).find(PATH_PG).text();
        var b_equipoEspana_PE = $(espanaPATH_G).find(PATH_PE).text();
        var b_equipoEspana_PP = $(espanaPATH_G).find(PATH_PP).text();
        var b_equipoEspana_GF = $(espanaPATH_G).find(PATH_GF).text();
        var b_equipoEspana_GC = $(espanaPATH_G).find(PATH_GC).text();
        var b_equipoEspana_DFG = $(espanaPATH_G).find(PATH_DFG).text();
        var b_equipoEspana_PTS = $(espanaPATH_G).find(PATH_PTS).text();

        //equipo marruecos
        var b_equipoMarruecos = $(marruecosPATH_G).find(PATH_EQ).text();
        var b_equipoMarruecos_AV = $(marruecosPATH_G).find(PATH_AV).text();
        var b_equipoMarruecos_PJ = $(marruecosPATH_G).find(PATH_PJ).text();
        var b_equipoMarruecos_PG = $(marruecosPATH_G).find(PATH_PG).text();
        var b_equipoMarruecos_PE = $(marruecosPATH_G).find(PATH_PE).text();
        var b_equipoMarruecos_PP = $(marruecosPATH_G).find(PATH_PP).text();
        var b_equipoMarruecos_GF = $(marruecosPATH_G).find(PATH_GF).text();
        var b_equipoMarruecos_GC = $(marruecosPATH_G).find(PATH_GC).text();
        var b_equipoMarruecos_DFG = $(marruecosPATH_G).find(PATH_DFG).text();
        var b_equipoMarruecos_PTS = $(marruecosPATH_G).find(PATH_PTS).text();

        //equipo iran
        var b_equipoIran = $(iranPATH_G).find(PATH_EQ).text();
        var b_equipoIran_AV = $(iranPATH_G).find(PATH_AV).text();
        var b_equipoIran_PJ = $(iranPATH_G).find(PATH_PJ).text();
        var b_equipoIran_PG = $(iranPATH_G).find(PATH_PG).text();
        var b_equipoIran_PE = $(iranPATH_G).find(PATH_PE).text();
        var b_equipoIran_PP = $(iranPATH_G).find(PATH_PP).text();
        var b_equipoIran_GF = $(iranPATH_G).find(PATH_GF).text();
        var b_equipoIran_GC = $(iranPATH_G).find(PATH_GC).text();
        var b_equipoIran_DFG = $(iranPATH_G).find(PATH_DFG).text();
        var b_equipoIran_PTS = $(iranPATH_G).find(PATH_PTS).text();

        console.log('-------******-------');
        console.log(b_grupo.yellow);
        console.log('-------******-------');
        console.log('equipo: '+ b_equipoPortugal + ', abreviatura: '  + b_equipoPortugal_AV );
        console.log('partidos jugados: '.red + b_equipoPortugal_PJ );   
        console.log('partidos ganados: '.red + b_equipoPortugal_PG );
        console.log('partidos empatados: '.red + b_equipoPortugal_PE);
        console.log('partidos perdidos: '.red + b_equipoPortugal_PP);
        console.log('goles a favor: '.red + b_equipoPortugal_GF);
        console.log('goles en contra: '.red + b_equipoPortugal_GC);
        console.log('diferencia de goles: '.red + b_equipoPortugal_DFG);
        console.log('puntos totales: '.red + b_equipoPortugal_PTS);
        console.log('-------******-------');
        console.log('equipo: '+ b_equipoEspana + ', abreviatura: '  + b_equipoEspana_AV );
        console.log('partidos jugados: '.red + b_equipoEspana_PJ );   
        console.log('partidos ganados: '.red + b_equipoEspana_PG );
        console.log('partidos empatados: '.red + b_equipoEspana_PE);
        console.log('partidos perdidos: '.red + b_equipoEspana_PP);
        console.log('goles a favor: '.red + b_equipoEspana_GF);
        console.log('goles en contra: '.red + b_equipoEspana_GC);
        console.log('diferencia de goles: '.red + b_equipoEspana_DFG);
        console.log('puntos totales: '.red + b_equipoEspana_PTS);
        console.log('-------******-------');
        console.log('equipo: '+ b_equipoMarruecos + ', abreviatura: '  + b_equipoMarruecos_AV );
        console.log('partidos jugados: '.red + b_equipoMarruecos_PJ );   
        console.log('partidos ganados: '.red + b_equipoMarruecos_PG );
        console.log('partidos empatados: '.red + b_equipoMarruecos_PE);
        console.log('partidos perdidos: '.red + b_equipoMarruecos_PP);
        console.log('goles a favor: '.red + b_equipoMarruecos_GF);
        console.log('goles en contra: '.red + b_equipoMarruecos_GC);
        console.log('diferencia de goles: '.red + b_equipoMarruecos_DFG);
        console.log('puntos totales: '.red + b_equipoMarruecos_PTS);
        console.log('-------******-------');
        console.log('equipo: '+ b_equipoIran + ', abreviatura: '  + b_equipoIran_AV );
        console.log('partidos jugados: '.red + b_equipoIran_PJ );   
        console.log('partidos ganados: '.red + b_equipoIran_PG );
        console.log('partidos empatados: '.red + b_equipoIran_PE);
        console.log('partidos perdidos: '.red + b_equipoIran_PP);
        console.log('goles a favor: '.red + b_equipoIran_GF);
        console.log('goles en contra: '.red + b_equipoIran_GC);
        console.log('diferencia de goles: '.red + b_equipoIran_DFG);
        console.log('puntos totales: '.red + b_equipoIran_PTS);
        console.log('-------******-------');


        /*grupo C*/
        //equipo francia
        var c_equipoFrancia = $(franciaPATH_G).find(PATH_EQ).text();
        var c_equipoFrancia_AV = $(franciaPATH_G).find(PATH_AV).text();
        var c_equipoFrancia_PJ = $(franciaPATH_G).find(PATH_PJ).text();
        var c_equipoFrancia_PG = $(franciaPATH_G).find(PATH_PG).text();
        var c_equipoFrancia_PE = $(franciaPATH_G).find(PATH_PE).text();
        var c_equipoFrancia_PP = $(franciaPATH_G).find(PATH_PP).text();
        var c_equipoFrancia_GF = $(franciaPATH_G).find(PATH_GF).text();
        var c_equipoFrancia_GC = $(franciaPATH_G).find(PATH_GC).text();
        var c_equipoFrancia_DFG = $(franciaPATH_G).find(PATH_DFG).text();
        var c_equipoFrancia_PTS = $(franciaPATH_G).find(PATH_PTS).text();
        //equipo australia
        //equipo peru
        //equipo dinamarca


        console.log('equipo: '+ c_equipoFrancia + ', abreviatura: '  + c_equipoFrancia_AV );
        console.log('-------******-------');



        fs.writeFile('./scraper/1.txt', a_grupo+a_equipoEgypto+a_equipoRusia+a_equipoArabiaS, function (err) {
          // body...
          if (err) {throw err}
            console.log('se guardo!');
        } )


      });

    }
});

Server.server;