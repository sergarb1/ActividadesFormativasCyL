<template>
  <q-page class="flex-top q-ma-lg">
    <q-item-tile label class="q-mb-md">
      <strong>Charlas</strong>
    </q-item-tile>
    <q-alert v-if="this.actividades.length==0" type="info">No hay actividades disponibles.</q-alert>

    <q-card class="q-mb-md" v-for="act in actividades" :key="act.nombre+act.centro+act.fechaInicio">
      <q-card-title>
        <q-checkbox
          v-model="act.favorito"
          checked-icon="star"
          unchecked-icon="star_border"
          @input="$guardarFavoritos(actividades,'favoritos-charlas');   if(act.favorito)$q.notify({message: 'Agregado a favoritos: '+act.nombre,timeout: 3000, type: 'positive'});"
        />
        {{ act.nombre }}
        <span slot="subtitle">
          <q-icon v-bind:name="$mostrarIcono(act.tematica)" size="16px"/>&nbsp;
          <small>{{act.tematica}}</small>
        </span>
      </q-card-title>
      <q-card-main>
        <pre class="text-faded">Fecha inicio matriculación: {{ $parsearFecha(act.fechaInicioMatriculacion) }}</pre>
        <pre class="text-faded">Fecha fin matriculación: {{ $parsearFecha(act.fechaFinMatriculacion) }}</pre>
        <pre class="text-faded">Fecha inicio actividad: {{ $parsearFecha(act.fechaInicio) }}</pre>
        <pre class="text-faded">Fecha fin actividad: {{ $parsearFecha(act.fechaFin) }}</pre>
        <pre class="text-faded">Centro: {{ act.centro }}</pre>
        <q-item-main/>
      </q-card-main>
      <q-card-separator/>
      <q-card-actions>
        <q-icon name="event"/>&nbsp;&nbsp;
      </q-card-actions>
      <q-card-actions align="between">
        <div>
          <q-chip v-for="miTag in act.tagsGenerados" :key="miTag" color="primary">{{ miTag }}</q-chip>
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
import sw from "stopword";
// Importamos para procesamiento del lenguaje natural
import natural from "natural";

export default {
  name: "Index",
  // Definimos las variables en Vue
  data() {
    return {
      // URL para obtener datos JSON de ValenBisi
      endpoint:
        "https://admin.sigecyl.es/servicios/actividades/actividadesPresenciales?tipoActividad=charla",
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
            console.log(centroTMP);
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
          var miJson = JSON.parse(JSON.stringify(response.data));

          // Pasamos el contenido al array "actividades"
          for (var x in miJson.actividades) {
            //Formamos el dato
            var dato;
            // Array de palabras tras eliminar stopwords y realizar stemming
            var arrayMineria = [];
            // Array para palabras solo eliminado stopwords y simbolos extraños
            var arrayTags = [];
            // Obtenemos texto sin acentos y sin minusculas
            var textoMineria = miJson.actividades[x].nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
            // solo dejamos letras y espacios. Si hay varios espacios o tabuladores, saltos, etc..
            // se convierten en un solo espacio
            textoMineria = textoMineria.replace(/[^a-z ]+/g, "").replace(/\s\s+/g, " ");

            // Eliminamos stop word generales mas algunas que ponemos custom
            arrayTags = sw.removeStopwords(textoMineria.split(" "), sw.es);
            arrayTags=sw.removeStopwords(arrayTags,this.$misStopWords);

         

            // Eliminamos duplicados
            arrayTags = this.$eliminarDuplicados(arrayTags);
            arrayTags.sort();
            // Aplicamos Stemming a cada palabra
            for (var i in arrayTags) {
              arrayMineria[i] = natural.PorterStemmerEs.stem(arrayTags[i]);
            }

            // Aplicamos Stemming a cada palabra
            for (var i in arrayTags) {
              arrayMineria[i] = natural.PorterStemmerEs.stem(arrayTags[i]);
            }


            // Tratamos la descripcion elimiando CDATA y HTML
            // Eliminamos CDATA
            var miDescripcion = miJson.actividades[x].descripcion
              .replace("<![CDATA[", "")
              .replace("]]>", "");
            // Truco para eliminar el texto en formato HTML y tenerlo normal
            var parser = new DOMParser();
            var dom = parser.parseFromString(
              "<!doctype html><body>" + miDescripcion,
              "text/html"
            );
            miDescripcion = dom.body.textContent;

            dato = {
              nombre: miJson.actividades[x].nombre,
              centro: miJson.actividades[x].centro,
              descripcion: miDescripcion,
              tematica: miJson.actividades[x].tematica,
              fechaInicio: miJson.actividades[x].fechaInicio,
              fechaInicioMatriculacion:
                miJson.actividades[x].fechaInicioMatriculacion,
              fechaFin: miJson.actividades[x].fechaFin,
              fechaFinMatriculacion:
                miJson.actividades[x].fechaFinMatriculacion,
              tagsGenerados: arrayTags,
              bolsaDePalabras: arrayMineria,
              favorito: false
            };
            // Lo metemos en un array
            this.actividades.push(dato);
          }
          // actualizamos favoritos
          this.cargarFavoritos("favoritos-charlas");
          // Salvo en localstorage
          localStorage.setItem("datos-charlas",JSON.stringify(this.actividades));
        })
        // En caso de error, mostramos el error para facilitar depuración
        .catch(error => {
          console.log("-----error-------");
          console.log(error);
        });
    },

 
        // Función que carga del localStorage un texto en formato JSON
    // con los favoritos de cursos
    cargarFavoritos(idLocalStorage) {
      if (localStorage.getItem(idLocalStorage)) {
        var fav = JSON.parse(localStorage.getItem(idLocalStorage));
        // Rellenamos los favoritos
        for (var x in fav) {
          for (var y in this.actividades) {
            if (
              fav[x].nombre == this.actividades[y].nombre &&
              fav[x].centro == this.actividades[y].centro &&
              fav[x].fechaInicio == this.actividades[y].fechaInicio
            ) {
              this.actividades[y].favorito = true;
            }
          }
        }
      }
    }
  }
};
</script>
