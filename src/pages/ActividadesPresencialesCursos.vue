<template>
  <q-page class="flex-top q-ma-lg">
    <q-item-tile label class="q-mb-md">
      <strong>Cursos presenciales</strong>
    </q-item-tile>
    <q-alert v-if="this.actividades.length==0" type="info">No hay actividades disponibles.</q-alert>

    <q-card class="q-mb-md" v-for="act in actividades" :key="act.nombre+act.centro+act.fechaInicio">
      <q-card-title>
        {{ act.nombre }}
        <span slot="subtitle">
          <q-icon v-bind:name="$mostrarIcono(act.tematica)" size="16px"/>&nbsp;
          <small>{{act.tematica}}</small>
        </span>
      </q-card-title>
      <q-card-main>
        {{ act.descripcion }}
        <q-item-main/>
      </q-card-main>
      <q-card-separator/>
      <q-card-actions align="between">
        <div>
          <q-icon name="event_note"/>&nbsp;&nbsp;
          <small>
            <strong>Matrícula: {{ $parsearFecha(act.fechaInicioMatriculacion) }} - {{ $parsearFecha(act.fechaFinMatriculacion) }}</strong>
          </small>
        </div>
        <div>
          <q-icon name="trending_up"/>&nbsp;&nbsp;
          <small>
            <strong>Nivel: {{ act.nivel }}</strong>
          </small>
        </div>
      </q-card-actions>
      <q-card-actions align="between">
        <div>
          <q-icon name="event"/>&nbsp;&nbsp;
          <small>
            <strong>Fechas: {{ $parsearFecha(act.fechaInicio) }} - {{ $parsearFecha(act.fechaFin) }}</strong>
          </small>
        </div>
        <div>
          <q-icon name="watch_later"/>&nbsp;&nbsp;
          <small>
            <strong>Nº horas: {{ act.numeroHoras }}</strong>
          </small>
        </div>
      </q-card-actions>
      <q-card-actions align="between">
        <div >
          <q-chip v-for='miTag in act.tagsGenerados'  :key="miTag"  color="primary">{{ miTag }}</q-chip>
        </div>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<style>
</style>


<!-- Aqui script, donde irá el Javascript (métodos, funciones, etc) -->
<script>
// Importamos axios para realizar el Ajax
import axios from "axios";
// Importamos para eliminar StopWords
import sw from 'stopword';
// Importamos para procesamiento del lenguaje natural
import natural from 'natural';

export default {
  name: "Index",
  // Definimos las variables en Vue
  data() {
    return {
      // URL para obtener datos JSON de ValenBisi
      endpoint:
        "https://admin.sigecyl.es/servicios/actividades/actividadesPresenciales?tipoActividad=curso",
      // Array con información de cada uno de las estacione
      actividades: []
    };
  },
  // Acciones al realizar al acabar de montarse Vue en el componente
  mounted() {
    // Obtenemos la informacion de los centros marcados
    this.obtieneInformacionCentrosMarcados();
  },
  // Metodos accesibles desde Vue
  methods: {
    // Funcion que obtiene de LocalStorage los centros y los anyade a la consulta
    obtieneInformacionCentrosMarcados() {
      var provTmp;
      if (localStorage.getItem("provincias")) {
        // Vaciamos las actividades
        this.actividades = [];
        console.log(localStorage.getItem("provincias"));
        provTmp = JSON.parse(localStorage.getItem("provincias"));
        var x;
        for (x in provTmp) {
          if (provTmp[x].marcado) {
            // Pasamos el centro sin acentos y en minusculas
            var centroTMP = provTmp[x].nombre
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .toLowerCase();
            this.getEstadoActividades(centroTMP);
          }
        }
      }
    },
    // Funcion que mediante axios, obtiene el estado del ValenBisi y rellena el array Estaciones
    getEstadoActividades(centro) {
      // Para que nos devuelvan los datos en JSON
      axios.defaults.headers = {
        Accept: "application/json"
      };
      // Definimos el comportamiento de Axios
      axios
        .get(this.endpoint + "&centro=" + centro)
        .then(response => {
          // Si, para coger este JSON debo hacer esta pirula
          console.log(response.data);
          var miJson = JSON.parse(JSON.stringify(response.data));

                   // Pasamos el contenido al array "actividades"
          for (var x in miJson.actividades) {
            //Formamos el dato
            var dato;
            // Array de palabras tras eliminar stopwords y realizar stemming
            var arrayMineria=[];
            // Array para palabras solo eliminado stopwords y simbolos extraños
            var arrayTags=[];
            // Obtenemos texto sin acentos y sin minusculas
            var textoMineria=miJson.actividades[x].nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
            // solo dejamos letras y espacios. Si hay varios espacios o tabuladores, saltos, etc..
            // se convierten en un solo espacio
            textoMineria=textoMineria.replace(/[^a-z ]+/g, '').replace(/\s\s+/g, ' ');
           

             // Eliminamos stop word generales mas algunas que ponemos custom
            arrayTags=sw.removeStopwords(textoMineria.split(" "),sw.es);
            arrayTags=sw.removeStopwords(arrayTags,["0","1","2","3","4","5","6","7","8","9","_","a","actualmente","acuerdo","adelante","ademas","además","adrede","afirmó","agregó","ahi","ahora","ahí","al","algo","alguna","algunas","alguno","algunos","algún","alli","allí","alrededor","ambos","ampleamos","antano","antaño","ante","anterior","antes","apenas","aproximadamente","aquel","aquella","aquellas","aquello","aquellos","aqui","aquél","aquélla","aquéllas","aquéllos","aquí","arriba","arribaabajo","aseguró","asi","así","atras","aun","aunque","ayer","añadió","aún","b","bajo","bastante","bien","breve","buen","buena","buenas","bueno","buenos","c","cada","casi","cerca","cierta","ciertas","cierto","ciertos","cinco","claro","comentó","como","con","conmigo","conocer","conseguimos","conseguir","considera","consideró","consigo","consigue","consiguen","consigues","contigo","contra","cosas","creo","cual","cuales","cualquier","cuando","cuanta","cuantas","cuanto","cuantos","cuatro","cuenta","cuál","cuáles","cuándo","cuánta","cuántas","cuánto","cuántos","cómo","d","da","dado","dan","dar","de","debajo","debe","deben","debido","decir","dejó","del","delante","demasiado","demás","dentro","deprisa","desde","despacio","despues","después","detras","detrás","dia","dias","dice","dicen","dicho","dieron","diferente","diferentes","dijeron","dijo","dio","donde","dos","durante","día","días","dónde","e","ejemplo","el","ella","ellas","ello","ellos","embargo","empleais","emplean","emplear","empleas","empleo","en","encima","encuentra","enfrente","enseguida","entonces","entre","era","erais","eramos","eran","eras","eres","es","esa","esas","ese","eso","esos","esta","estaba","estabais","estaban","estabas","estad","estada","estadas","estado","estados","estais","estamos","estan","estando","estar","estaremos","estará","estarán","estarás","estaré","estaréis","estaría","estaríais","estaríamos","estarían","estarías","estas","este","estemos","esto","estos","estoy","estuve","estuviera","estuvierais","estuvieran","estuvieras","estuvieron","estuviese","estuvieseis","estuviesen","estuvieses","estuvimos","estuviste","estuvisteis","estuviéramos","estuviésemos","estuvo","está","estábamos","estáis","están","estás","esté","estéis","estén","estés","ex","excepto","existe","existen","explicó","expresó","f","fin","final","fue","fuera","fuerais","fueran","fueras","fueron","fuese","fueseis","fuesen","fueses","fui","fuimos","fuiste","fuisteis","fuéramos","fuésemos","g","general","gran","grandes","gueno","h","ha","haber","habia","habida","habidas","habido","habidos","habiendo","habla","hablan","habremos","habrá","habrán","habrás","habré","habréis","habría","habríais","habríamos","habrían","habrías","habéis","había","habíais","habíamos","habían","habías","hace","haceis","hacemos","hacen","hacer","hacerlo","haces","hacia","haciendo","hago","han","has","hasta","hay","haya","hayamos","hayan","hayas","hayáis","he","hecho","hemos","hicieron","hizo","horas","hoy","hube","hubiera","hubierais","hubieran","hubieras","hubieron","hubiese","hubieseis","hubiesen","hubieses","hubimos","hubiste","hubisteis","hubiéramos","hubiésemos","hubo","i","igual","incluso","indicó","informo","informó","intenta","intentais","intentamos","intentan","intentar","intentas","intento","ir","j","junto","k","l","la","lado","largo","las","le","lejos","les","llegó","lleva","llevar","lo","los","luego","lugar","m","mal","manera","manifestó","mas","mayor","me","mediante","medio","mejor","mencionó","menos","menudo","mi","mia","mias","mientras","mio","mios","mis","misma","mismas","mismo","mismos","modo","momento","mucha","muchas","mucho","muchos","muy","más","mí","mía","mías","mío","míos","n","nada","nadie","ni","ninguna","ningunas","ninguno","ningunos","ningún","no","nos","nosotras","nosotros","nuestra","nuestras","nuestro","nuestros","nueva","nuevas","nuevo","nuevos","nunca","o","ocho","os","otra","otras","otro","otros","p","pais","para","parece","parte","partir","pasada","pasado","paìs","peor","pero","pesar","poca","pocas","poco","pocos","podeis","podemos","poder","podria","podriais","podriamos","podrian","podrias","podrá","podrán","podría","podrían","poner","por","por qué","porque","posible","primer","primera","primero","primeros","principalmente","pronto","propia","propias","propio","propios","proximo","próximo","próximos","pudo","pueda","puede","pueden","puedo","pues","q","qeu","que","quedó","queremos","quien","quienes","quiere","quiza","quizas","quizá","quizás","quién","quiénes","qué","r","raras","realizado","realizar","realizó","repente","respecto","s","sabe","sabeis","sabemos","saben","saber","sabes","sal","salvo","se","sea","seamos","sean","seas","segun","segunda","segundo","según","seis","ser","sera","seremos","será","serán","serás","seré","seréis","sería","seríais","seríamos","serían","serías","seáis","señaló","si","sido","siempre","siendo","siete","sigue","siguiente","sin","sino","sobre","sois","sola","solamente","solas","solo","solos","somos","son","soy","soyos","su","supuesto","sus","suya","suyas","suyo","suyos","sé","sí","sólo","t","tal","tambien","también","tampoco","tan","tanto","tarde","te","temprano","tendremos","tendrá","tendrán","tendrás","tendré","tendréis","tendría","tendríais","tendríamos","tendrían","tendrías","tened","teneis","tenemos","tener","tenga","tengamos","tengan","tengas","tengo","tengáis","tenida","tenidas","tenido","tenidos","teniendo","tenéis","tenía","teníais","teníamos","tenían","tenías","tercera","ti","tiempo","tiene","tienen","tienes","toda","todas","todavia","todavía","todo","todos","total","trabaja","trabajais","trabajamos","trabajan","trabajar","trabajas","trabajo","tras","trata","través","tres","tu","tus","tuve","tuviera","tuvierais","tuvieran","tuvieras","tuvieron","tuviese","tuvieseis","tuviesen","tuvieses","tuvimos","tuviste","tuvisteis","tuviéramos","tuviésemos","tuvo","tuya","tuyas","tuyo","tuyos","tú","u","ultimo","un","una","unas","uno","unos","usa","usais","usamos","usan","usar","usas","uso","usted","ustedes","v","va","vais","valor","vamos","van","varias","varios","vaya","veces","ver","verdad","verdadera","verdadero","vez","vosotras","vosotros","voy","vuestra","vuestras","vuestro","vuestros","w","x","y","ya","yo","z","él","éramos","ésa","ésas","ése","ésos","ésta","éstas","éste","éstos","última","últimas","último","últimos"]);


            // Eliminamos duplicados
            arrayTags=this.eliminarDuplicados(arrayTags);            
            arrayTags.sort()
            // Aplicamos Stemming a cada palabra
            for(var i in arrayTags){
              arrayMineria[i]=natural.PorterStemmerEs.stem(arrayTags[i]);
            }

            // Tratamos la descripcion elimiando CDATA y HTML
            // Eliminamos CDATA
            var miDescripcion= miJson.actividades[x].descripcion.replace("<![CDATA[", "").replace("]]>", "");
            // Truco para eliminar el texto en formato HTML y tenerlo normal
            var parser = new DOMParser;
            var dom = parser.parseFromString('<!doctype html><body>' + miDescripcion,'text/html');
            miDescripcion = dom.body.textContent;
            // Construimos el dato
            dato = {
              nombre: miJson.actividades[x].nombre,
              centro: miJson.actividades[x].centro,
              descripcion: miDescripcion,
              tematica: miJson.actividades[x].tematica,
              fechaInicio: miJson.actividades[x].fechaInicio,
              fechaInicioMatriculacion: miJson.actividades[x].fechaInicioMatriculacion,
              fechaFin: miJson.actividades[x].fechaFin,
              fechaFinMatriculacion: miJson.actividades[x].fechaFinMatriculacion,
              tagsGenerados: arrayTags,
              bolsaDePalabras: arrayMineria
            };
            // Lo metemos en un array
            this.actividades.push(dato);
          }
         })
        // En caso de error, mostramos el error para facilitar depuración
        .catch(error => {
          console.log("-----error-------");
          console.log(error);
        });
    },
    // Funcion que recibe un array y elimina duplicados
    eliminarDuplicados(names){
      return names.slice().sort(function(a,b){return a > b}).reduce(function(a,b){if (a.slice(-1)[0] !== b) a.push(b);return a;},[]);
    }
  }
};
</script>
