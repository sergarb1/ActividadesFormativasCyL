<template>
  <q-page class="flex-top q-ma-lg">
    <q-item-tile label class="q-mb-md">
      <strong>Actividades Online</strong>
    </q-item-tile>
    <q-alert v-if="this.actividades.length==0" type="info">No hay actividades disponibles.</q-alert>

    <q-card class="q-mb-md" v-for="act in actividades" :key="act.nombre">
      <q-card-title>
        {{ act.nombre }}
        <span slot="subtitle">
          <q-icon v-bind:name="$mostrarIcono(act.tematica)" size="16px"/> &nbsp;
          <small>{{act.tematica}}</small>
        </span>
      </q-card-title>
      <q-card-main>
        <pre class="text-faded">Fecha inicio actividad: {{ $parsearFecha(act.fechaInicio) }}</pre>
        <pre class="text-faded">Fecha fin actividad: {{ $parsearFecha(act.fechaFin) }}</pre>
        <pre class="text-faded">Tags generados: {{ act.tagsGenerados }}</pre>
        <pre class="text-faded">Bolsa de palabras para recomendado: {{ act.bolsaDePalabras }}</pre>
        <div class="group">
          <q-chip v-for='miTag in act.tagsGenerados'  :key="miTag"  color="primary">{{ miTag }}</q-chip>
        </div>
        <q-item-main/>
      </q-card-main>
      <q-card-separator/>
      <q-card-actions>
        <q-icon name="event"/>&nbsp;&nbsp;
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
        "https://admin.sigecyl.es/servicios/actividades/actividadesOnline",
      // Array con información de cada uno de las estacione
      actividades: [],
   
    };
  },
  // Acciones al realizar al acabar de montarse Vue en el componente
  mounted() {
    this.getEstadoActividades();
  },
  // Metodos accesibles desde Vue
  methods: {
    // Funcion que mediante axios, obtiene el estado del ValenBisi y rellena el array Estaciones
    getEstadoActividades() {
      // Para que nos devuelvan los datos en JSON
      axios.defaults.headers = {
        Accept: "application/json"
      };
      // Definimos el comportamiento de Axios
      axios
        .get(this.endpoint)
        .then(response => {

          // Si, para coger este JSON debo hacer esta pirula
          console.log(response.data);
          var miJson = JSON.parse(JSON.stringify(response.data));

          // Vaciamos el array
          this.actividades = [];
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
            // solo dejamos letras y espacios
            textoMineria=textoMineria.replace(/[^a-z ]+/g, '');
           
            // Aplicamos stemming a cada palabra
            arrayTags=sw.removeStopwords(textoMineria.split(" "),sw.es)
            // Aplicamos Stemming a cada palabra
            for(var i in arrayTags){
              arrayMineria[i]=natural.PorterStemmerEs.stem(arrayTags[i]);
            }


            dato = {
              nombre: miJson.actividades[x].nombre,
              descripcion: miJson.actividades[x].descripcion.replace(/<[^>]+>/g, ''),
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
    }
  }
};
</script>
