// Importamos axios para realizar el Ajax
import axios from "axios";
// Importamos para eliminar StopWords
import sw from "stopword";
// Importamos para procesamiento del lenguaje natural
import natural from "natural";

// Archivo de funciones que podemos reutilizar en diferentes archivos
export default ({
  Vue
}) => {
  // Función que devuelve un icono en función del tipo y área recibida
  Vue.prototype.$mostrarIcono = function (tipo) {
    if (tipo === "Dispositivos e infraestructura") return "devices";
    else if (tipo === "Seguridad") return "lock";
    else if (tipo === "Redes sociales y marketing digital") return "people";
    else if (tipo === "Navegación y trámites por internet") return "public";
    else if (tipo === "Creación de contenidos digitales") return "brush";
    else if (tipo === "Comunicación y colaboración") return "question_answer";
    else if (tipo === "Empleo") return "work";
    else return "group_work";
  };

  // Función que permite generar notificaciones locales para dispositivos móviles
  /*Vue.prototype.$notificar = function (array) {
    var hoy = new Date()
    // Hay que recordar que el mes es un número del 0 al 11
    var dia = hoy.getDate().toString()
    var mes = ''
    if (hoy.getMonth() + 1 <= 9) mes = '0' + (hoy.getMonth() + 1)
    else mes = (hoy.getMonth() + 1).toString()
    var anio = hoy.getFullYear().toString()
    var fecha = dia + mes + anio
    var i = 0
    if (localStorage.getItem('hoy') !== fecha) {
      localStorage.setItem('hoy', fecha)
      var notificaciones = []
      for (i = 0; i < array.length; i++) {
        notificaciones.push({id: i, title: array[i].hora + ' ' + array[i].titulo, text: array[i].descripcion, foreground: true, vibrate: true, smallIcon: '../assets/logo.png'})
      }
      cordova.plugins.notification.local.schedule(notificaciones)
    } else {
      for (i = 0; i < array.length; i++) {
        console.log(array[i].titulo + array[i].hora)
        cordova.plugins.notification.local.schedule({
          title: 'Evento en Ataulfo Argenta',
          // trigger: { at: new Date(anio, mes, dia, 9, 30) },
          text: 'Este es el texto del evento',
          // smallIcon: 'res://icon.ataulfo.png',
          foreground: true,
          vibrate: true
        })
      }
    }
  }*/

  // Función que parsea una fecha dada a una cadena en formato dd/mm/aaaa
  Vue.prototype.$parsearFecha = function (fecha) {
    // La fecha se pasa en modo texto
    if (!fecha) return "";
    else {
      var anio = new Date(fecha).getFullYear();
      var mes = parseInt(new Date(fecha).getMonth()) + 1;
      if (mes < 10) {
        mes = "0" + mes;
      }
      var dia = parseInt(new Date(fecha).getDate());
      if (dia < 10) {
        dia = "0" + dia;
      }
      return dia + "/" + mes + "/" + anio;
    }
  };

  // Función que comprueba si la fecha de inicio y fin de un evento son distintas; de lo contrario se muestra una única fecha
  Vue.prototype.$fechaInicioFinDistintas = function (ini, fin) {
    if (new Date(ini).getTime() !== new Date(fin).getTime()) {
      return true;
    } else {
      return false;
    }
  };

  // Función que comprueba si el valor a está en el array para hacer check en los checkbox de Suscripciones
  Vue.prototype.$isInArray = function (array, a) {
    return array.includes(a.toString());
  };

  // Funcion para eliminar duplicados de un array
  // Funcion que recibe un array y elimina duplicados
  Vue.prototype.$eliminarDuplicados = function (names) {
    return names
      .slice()
      .sort(function (a, b) {
        return a > b;
      })
      .reduce(function (a, b) {
        if (a.slice(-1)[0] !== b) a.push(b);
        return a;
      }, []);
  };

  // Función que guarda en localStorage un texto en formato JSON
  // con los favoritos que reciba
  Vue.prototype.$guardarFavoritos = function (misActividades, idLocalStorage) {
    var actividadesFavoritas = [];

    for (var x in misActividades) {
      if (misActividades[x].favorito == true) {
        actividadesFavoritas.push(misActividades[x]);
      }
    }
    localStorage.setItem(idLocalStorage, JSON.stringify(actividadesFavoritas));
  };

  // Función que elimina acentos
  Vue.prototype.$eliminarAcentos = function (cadena) {
    return cadena.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };
  // Función que solo deja letras minúsculas y espacios
  Vue.prototype.$soloMinusculasYEspacios = function (cadena) {
    return cadena.replace(/[^a-z ]+/g, "").replace(/\s\s+/g, " ");
  };

  Vue.prototype.$CDATAToText = function (cadena) {
    cadena = cadena.replace("<![CDATA[", "").replace("]]>", "");
    // Truco para eliminar el texto en formato HTML y tenerlo normal
    var parser = new DOMParser();
    var dom = parser.parseFromString(
      "<!doctype html><body>" + cadena,
      "text/html"
    );
    return dom.body.textContent;
  };

  // Variable con la ultima actualizacion
  Vue.prototype.$ultimaActualizacion = undefined;

  // Variable que comprueba si hace falta actualizar
  Vue.prototype.$hayQueActualizar = function () {
    console.log("entro en hayqueactualizar")
    // Si esta en localStorage, la cogemos de ahi
    if (localStorage.getItem("ultimaActualizacion"))
      this.$ultimaActualizacion = new Date(
        JSON.parse(localStorage.getItem("ultimaActualizacion"))
      );
    // Fecha de ultima actualizacion
    var date1 = this.$ultimaActualizacion;
    // Si no se ha actualizado nunca
    if (date1 == undefined) {
      return true;
    }
    // Fecha actual;
    var date2 = new Date();
    // Calculamos la diferencia entre horas
    var difHoras = Math.abs(date1 - date2) / (60 * 60 * 1000);
    console.log("salgo de hayqueactualizar")

    // Caso que la diferencia de horas sea mayor que 2
    if (difHoras > 2) {
      return true;
    }
    // Caso que la diferencia de horas sea mayor, devolver falso
    return false;
  };

  Vue.prototype.$actualizarDatos = function () {
    var provTmp;
    var actividades = [];

    var url =
      "https://admin.sigecyl.es/servicios/actividades/actividadesPresenciales?tipoActividad=curso&tipoActividad=taller&tipoActividad=charla";
    var urlOnline =
      "https://admin.sigecyl.es/servicios/actividades/actividadesOnline";

    // Si no tenemos las provincias en localStorage, tomamos el valor por defecto
    if (localStorage.getItem("provincias")) {
      provTmp = JSON.parse(localStorage.getItem("provincias"));
    } else {
      provTmp = this.$provincias;
    }

    // Actividades presenciales

    // Recorremos las provincias
    for (var x in provTmp) {
      // Si la provincia esta marcada
      if (provTmp[x].marcado) {
        // Pasamos el centro sin acentos y en minusculas
        var centroTMP = this.$eliminarAcentos(provTmp[x].nombre).toLowerCase();
        this.$getEstadoActividades(centroTMP, url);
      }
    }
    // Obtenemos la informacion de las actividades online
    this.$getEstadoActividades("online", urlOnline);
  };

  // Funcion que mediante axios, obtiene el estado del ValenBisi y rellena el array Estaciones
  Vue.prototype.$getEstadoActividades = function (centro, url) {
    // Para que nos devuelvan los datos en JSON
    axios.defaults.headers = {
      Accept: "application/json"
    };

    var urlLlamada = url + "&centro=" + centro;
    if (centro == "online") {
      urlLlamada = url;
    }
    console.log("URL LLamada " + urlLlamada);
    axios
      .get(urlLlamada)
      .then(response => {
        var actividades = [];
        var miJson = JSON.parse(JSON.stringify(response.data));
        // Si hay actividades...
        if (typeof miJson.actividades !== "undefined") {
          // Pasamos el contenido al array "actividades"
          for (var x in miJson.actividades) {
            //Formamos el dato
            var dato;
            // Array de palabras tras eliminar stopwords y realizar stemming
            var arrayMineria = [];
            // Array para palabras solo eliminado stopwords y simbolos extraños
            var arrayTags = [];
            // Obtenemos texto sin acentos y sin minusculas
            var textoMineria = this.$eliminarAcentos(
              miJson.actividades[x].nombre
            ).toLowerCase();
            // solo dejamos letras y espacios. Si hay varios espacios o tabuladores, saltos, etc..
            // se convierten en un solo espacio
            textoMineria = this.$soloMinusculasYEspacios(textoMineria);

            // Eliminamos stop word generales mas algunas que ponemos custom
            arrayTags = sw.removeStopwords(textoMineria.split(" "), sw.es);
            arrayTags = sw.removeStopwords(arrayTags, this.$misStopWords);

            // Eliminamos duplicados
            arrayTags = this.$eliminarDuplicados(arrayTags);
            arrayTags.sort();
            // Aplicamos Stemming a cada palabra
            for (var i in arrayTags) {
              arrayMineria[i] = natural.PorterStemmerEs.stem(arrayTags[i]);
            }

            // Tratamos la descripcion elimiando CDATA y HTML
            // Eliminamos CDATA

            var miDescripcion = this.$CDATAToText(
              miJson.actividades[x].descripcion
            );

            var miAviso = this.$CDATAToText(miJson.actividades[x].aviso);

            // Construimos el dato
            dato = {
              nombre: miJson.actividades[x].nombre,
              centro: miJson.actividades[x].centro,
              descripcion: miDescripcion,
              tematica: miJson.actividades[x].tematica,
              nivel: miJson.actividades[x].nivel,
              numeroHoras: miJson.actividades[x].numeroHoras,
              fechaInicio: miJson.actividades[x].fechaInicio,
              fechaInicioMatriculacion: miJson.actividades[x].fechaInicioMatriculacion,
              fechaFin: miJson.actividades[x].fechaFin,
              fechaFinMatriculacion: miJson.actividades[x].fechaFinMatriculacion,
              numeroPlazas: miJson.actividades[x].numeroPlazas,
              numeroSolicitudes: miJson.actividades[x].numeroSolicitudes,
              aviso: miAviso,
              tagsGenerados: arrayTags,
              bolsaDePalabras: arrayMineria,
              favorito: false
            };

            //Caso especial del online
            if (centro == "online") {
              dato.horaInicioWebinar = miJson.actividades[i].horaInicioWebinar;
              dato.horaFinWebinar = miJson.actividades[i].horaFinWebinar;
            }

            // Lo metemos en un array
            actividades.push(dato);
          }
        }
        // Salvo en localstorage
        localStorage.setItem(
          "presenciales-" + centro,
          JSON.stringify(actividades)
        );
      })
      // En caso de error, mostramos el error para facilitar depuración
      .catch(error => {
        console.log("-----error-------");
        console.log(error);
      });
  };

  // Funcion que recibe dos arrays y devuelve la union, eliminado nulos
  Vue.prototype.$unirArrays = function (a, b) {
    var x = [];

    for (var i in a) {
      if (a[i] != null) x.push(a[i]);
    }
    for (var i in b) {
      if (b[i] != null) x.push(b[i]);
    }
    return x;
  };


  //Array con las provincias
  Vue.prototype.$provincias = [{
      nombre: "Ávila",
      marcado: true,
      notificado: true
    },
    {
      nombre: "Burgos",
      marcado: true,
      notificado: true
    },
    {
      nombre: "León",
      marcado: true,
      notificado: true
    },
    {
      nombre: "Palencia",
      marcado: true,
      notificado: true
    },
    {
      nombre: "Salamanca",
      marcado: true,
      notificado: true
    },
    {
      nombre: "Segovia",
      marcado: true,
      notificado: true
    },
    {
      nombre: "Soria",
      marcado: true,
      notificado: true
    },
    {
      nombre: "Valladolid",
      marcado: true,
      notificado: true
    },
    {
      nombre: "Zamora",
      marcado: true,
      notificado: true
    }
  ];
  // Array con StopWords en castellano
  Vue.prototype.$misStopWords = ["", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "_", "a", "actualmente", "acuerdo", "adelante", "ademas", "además", "adrede", "afirmó", "agregó", "ahi", "ahora", "ahí", "al", "algo", "alguna", "algunas", "alguno", "algunos", "algún", "alli", "allí", "alrededor", "ambos", "ampleamos", "antano", "antaño", "ante", "anterior", "antes", "apenas", "aproximadamente", "aquel", "aquella", "aquellas", "aquello", "aquellos", "aqui", "aquél", "aquélla", "aquéllas", "aquéllos", "aquí", "arriba", "arribaabajo", "aseguró", "asi", "así", "atras", "aun", "aunque", "ayer", "añadió", "aún", "b", "bajo", "bastante", "bien", "breve", "buen", "buena", "buenas", "bueno", "buenos", "c", "cada", "casi", "cerca", "cierta", "ciertas", "cierto", "ciertos", "cinco", "claro", "comentó", "como", "con", "conmigo", "conocer", "conseguimos", "conseguir", "considera", "consideró", "consigo", "consigue", "consiguen", "consigues", "contigo", "contra", "cosas", "creo", "cual", "cuales", "cualquier", "cuando", "cuanta", "cuantas", "cuanto", "cuantos", "cuatro", "cuenta", "cuál", "cuáles", "cuándo", "cuánta", "cuántas", "cuánto", "cuántos", "cómo", "d", "da", "dado", "dan", "dar", "de", "debajo", "debe", "deben", "debido", "decir", "dejó", "del", "delante", "demasiado", "demás", "dentro", "deprisa", "desde", "despacio", "despues", "después", "detras", "detrás", "dia", "dias", "dice", "dicen", "dicho", "dieron", "diferente", "diferentes", "dijeron", "dijo", "dio", "donde", "dos", "durante", "día", "días", "dónde", "e", "ejemplo", "el", "ella", "ellas", "ello", "ellos", "embargo", "empleais", "emplean", "emplear", "empleas", "empleo", "en", "encima", "encuentra", "enfrente", "enseguida", "entonces", "entre", "era", "erais", "eramos", "eran", "eras", "eres", "es", "esa", "esas", "ese", "eso", "esos", "esta", "estaba", "estabais", "estaban", "estabas", "estad", "estada", "estadas", "estado", "estados", "estais", "estamos", "estan", "estando", "estar", "estaremos", "estará", "estarán", "estarás", "estaré", "estaréis", "estaría", "estaríais", "estaríamos", "estarían", "estarías", "estas", "este", "estemos", "esto", "estos", "estoy", "estuve", "estuviera", "estuvierais", "estuvieran", "estuvieras", "estuvieron", "estuviese", "estuvieseis", "estuviesen", "estuvieses", "estuvimos", "estuviste", "estuvisteis", "estuviéramos", "estuviésemos", "estuvo", "está", "estábamos", "estáis", "están", "estás", "esté", "estéis", "estén", "estés", "ex", "excepto", "existe", "existen", "explicó", "expresó", "f", "fin", "final", "fue", "fuera", "fuerais", "fueran", "fueras", "fueron", "fuese", "fueseis", "fuesen", "fueses", "fui", "fuimos", "fuiste", "fuisteis", "fuéramos", "fuésemos", "g", "general", "gran", "grandes", "gueno", "h", "ha", "haber", "habia", "habida", "habidas", "habido", "habidos", "habiendo", "habla", "hablan", "habremos", "habrá", "habrán", "habrás", "habré", "habréis", "habría", "habríais", "habríamos", "habrían", "habrías", "habéis", "había", "habíais", "habíamos", "habían", "habías", "hace", "haceis", "hacemos", "hacen", "hacer", "hacerlo", "haces", "hacia", "haciendo", "hago", "han", "has", "hasta", "hay", "haya", "hayamos", "hayan", "hayas", "hayáis", "he", "hecho", "hemos", "hicieron", "hizo", "horas", "hoy", "hube", "hubiera", "hubierais", "hubieran", "hubieras", "hubieron", "hubiese", "hubieseis", "hubiesen", "hubieses", "hubimos", "hubiste", "hubisteis", "hubiéramos", "hubiésemos", "hubo", "i", "igual", "incluso", "indicó", "informo", "informó", "intenta", "intentais", "intentamos", "intentan", "intentar", "intentas", "intento", "ir", "j", "junto", "k", "l", "la", "lado", "largo", "las", "le", "lejos", "les", "llegó", "lleva", "llevar", "lo", "los", "luego", "lugar", "m", "mal", "manera", "manifestó", "mas", "mayor", "me", "mediante", "medio", "mejor", "mencionó", "menos", "menudo", "mi", "mia", "mias", "mientras", "mio", "mios", "mis", "misma", "mismas", "mismo", "mismos", "modo", "momento", "mucha", "muchas", "mucho", "muchos", "muy", "más", "mí", "mía", "mías", "mío", "míos", "n", "nada", "nadie", "ni", "ninguna", "ningunas", "ninguno", "ningunos", "ningún", "no", "nos", "nosotras", "nosotros", "nuestra", "nuestras", "nuestro", "nuestros", "nueva", "nuevas", "nuevo", "nuevos", "nunca", "o", "ocho", "os", "otra", "otras", "otro", "otros", "p", "pais", "para", "parece", "parte", "partir", "pasada", "pasado", "paìs", "peor", "pero", "pesar", "poca", "pocas", "poco", "pocos", "podeis", "podemos", "poder", "podria", "podriais", "podriamos", "podrian", "podrias", "podrá", "podrán", "podría", "podrían", "poner", "por", "por qué", "porque", "posible", "primer", "primera", "primero", "primeros", "principalmente", "pronto", "propia", "propias", "propio", "propios", "proximo", "próximo", "próximos", "pudo", "pueda", "puede", "pueden", "puedo", "pues", "q", "qeu", "que", "quedó", "queremos", "quien", "quienes", "quiere", "quiza", "quizas", "quizá", "quizás", "quién", "quiénes", "qué", "r", "raras", "realizado", "realizar", "realizó", "repente", "respecto", "s", "sabe", "sabeis", "sabemos", "saben", "saber", "sabes", "sal", "salvo", "se", "sea", "seamos", "sean", "seas", "segun", "segunda", "segundo", "según", "seis", "ser", "sera", "seremos", "será", "serán", "serás", "seré", "seréis", "sería", "seríais", "seríamos", "serían", "serías", "seáis", "señaló", "si", "sido", "siempre", "siendo", "siete", "sigue", "siguiente", "sin", "sino", "sobre", "sois", "sola", "solamente", "solas", "solo", "solos", "somos", "son", "soy", "soyos", "su", "supuesto", "sus", "suya", "suyas", "suyo", "suyos", "sé", "sí", "sólo", "t", "tal", "tambien", "también", "tampoco", "tan", "tanto", "tarde", "te", "temprano", "tendremos", "tendrá", "tendrán", "tendrás", "tendré", "tendréis", "tendría", "tendríais", "tendríamos", "tendrían", "tendrías", "tened", "teneis", "tenemos", "tener", "tenga", "tengamos", "tengan", "tengas", "tengo", "tengáis", "tenida", "tenidas", "tenido", "tenidos", "teniendo", "tenéis", "tenía", "teníais", "teníamos", "tenían", "tenías", "tercera", "ti", "tiempo", "tiene", "tienen", "tienes", "toda", "todas", "todavia", "todavía", "todo", "todos", "total", "trabaja", "trabajais", "trabajamos", "trabajan", "trabajar", "trabajas", "trabajo", "tras", "trata", "través", "tres", "tu", "tus", "tuve", "tuviera", "tuvierais", "tuvieran", "tuvieras", "tuvieron", "tuviese", "tuvieseis", "tuviesen", "tuvieses", "tuvimos", "tuviste", "tuvisteis", "tuviéramos", "tuviésemos", "tuvo", "tuya", "tuyas", "tuyo", "tuyos", "tú", "u", "ultimo", "un", "una", "unas", "uno", "unos", "usa", "usais", "usamos", "usan", "usar", "usas", "uso", "usted", "ustedes", "v", "va", "vais", "valor", "vamos", "van", "varias", "varios", "vaya", "veces", "ver", "verdad", "verdadera", "verdadero", "vez", "vosotras", "vosotros", "voy", "vuestra", "vuestras", "vuestro", "vuestros", "w", "x", "y", "ya", "yo", "z", "él", "éramos", "ésa", "ésas", "ése", "ésos", "ésta", "éstas", "éste", "éstos", "última", "últimas", "último", "últimos"];

// Función que permite generar notificaciones locales para dispositivos móviles
Vue.prototype.$notificar = function () {
  console.log('Entro en notificar')
  console.log(localStorage.getItem("presenciales-burgos")
  )
  var hoy = new Date()
  // Hay que recordar que el mes es un número del 0 al 11
  var dia = hoy.getDate().toString()
  var mes = ''
  if (hoy.getMonth() + 1 <= 9) mes = '0' + (hoy.getMonth() + 1)
  else mes = (hoy.getMonth() + 1).toString()
  var anio = hoy.getFullYear().toString()
  var fecha = dia + mes + anio
  var i = 0
  if (localStorage.getItem('hoy') !== fecha) {
    localStorage.setItem('hoy', fecha)
    var notificaciones = []
    for (i = 0; i < array.length; i++) {
      notificaciones.push({id: i, title: 'Actividades CyL Digital', text: 'Abierta la matrícula para el curso ' + array[i].titulo, foreground: true, vibrate: true})
    }
    cordova.plugins.notification.local.schedule(notificaciones)
  } /* else {
    for (i = 0; i < array.length; i++) {
      console.log(array[i].titulo + array[i].hora)
      cordova.plugins.notification.local.schedule({
        title: 'Evento en Ataulfo Argenta',
        // trigger: { at: new Date(anio, mes, dia, 9, 30) },
        text: 'Este es el texto del evento',
        // smallIcon: 'res://icon.ataulfo.png',
        foreground: true,
        vibrate: true
      })
    }
  } */
}
};
