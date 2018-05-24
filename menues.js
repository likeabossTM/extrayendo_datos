
  function haciendoMenu() {
      //creando las referencias para ubicar lo que se quiere copiar
      var h2 = document.getElementsByTagName("h2");
      var h1 = document.getElementsByTagName("h1");
      var li = document.getElementsByTagName("li");
      //creando el div donde iran los elementos del menu
      var menu = document.createElement("div");
      //anadiendo el ul dentro del div con appendchild
      var menuUL = document.createElement("ul");
      menu.appendChild(menuUL);
      //creando un ciclo para que valla iterando cada vez
      //que encuentre un elemento ira anadiendolo hasta
      //que termine


      for (var i = 0; i < h1.length; i++) {

        var nodoDeTexto = h1[i].childNodes[0].nodeValue;
        //anadiendo un item a la lista cada vez
        var menuLI = document.createElement("li");
        //ingresandolo dentro del ul
        menuUL.appendChild(menuLI);
        //creando el enlace
        var menuLIA = document.createElement("a");
        menuLIA = menuLI.appendChild(menuLIA);
        //configurando el href de enlace
        menuLIA.setAttribute("href", "#item" + i);
        //configurando el texto del enlace
        var menuText = document.createTextNode(nodoDeTexto);
        menuLIA.appendChild(menuText);
        //var anc
        var anc = document.createElement("a");
        anc.setAttribute("name", "item" + i);
        //anadir anchor antes de la cabeszera
        document.body.insertBefore(anc, h1[i]);

      }

      for (var i = 0; i < h2.length; i++) {
        //obteniendo el nodo de texto de h2
        var nodoDeTexto = h2[i].childNodes[0].nodeValue;
        //anadiendo un item a la lista cada vez
        var menuLI = document.createElement("li");
        //ingresandolo dentro del ul
        menuUL.appendChild(menuLI);
        //creando el enlace
        var menuLIA = document.createElement("a");
        menuLIA = menuLI.appendChild(menuLIA);
        //configurando el href de enlace
        menuLIA.setAttribute("href", "#item" + i);
        //configurando el texto del enlace
        var menuText = document.createTextNode(nodoDeTexto);
        menuLIA.appendChild(menuText);
        //var anc
        var anc = document.createElement("a");
        anc.setAttribute("name", "item" + i);
        //anadir anchor antes de la cabeszera
        document.body.insertBefore(anc, h2[i]);


      }

      document.body.insertBefore(menu, document.body.firstChild);


  }

window.onload = haciendoMenu;
