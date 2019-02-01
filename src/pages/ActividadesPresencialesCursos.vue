<template>
  <q-page class="flex-top q-ma-lg">
    <q-item-tile label class="q-mb-md">
      <strong>Cursos presenciales</strong>
    </q-item-tile>
    <q-alert v-if="this.actividades.length==0" icon="info" color="tertiary">
      No hay actividades de este tipo disponibles.
      Comprueba en el menú Suscripciones las provincias que deseas mostrar.
    </q-alert>

    <q-card class="q-mb-md" v-for="act in actividades" :key="act.nombre+act.centro+act.fechaInicio">
      <q-card-title>
        {{ act.nombre }}
        <div slot="right" class="row items-center">
          <q-checkbox
            v-model="act.favorito"
            checked-icon="favorite"
            unchecked-icon="favorite_border"
            @input="$guardarFavoritos(actividades,'favoritos-cursos');  if(act.favorito)$q.notify({message: 'Agregado a favoritos: '+act.nombre,timeout: 1000, type: 'positive', position: 'center'});"
          /> 
        </div>
        <div slot="subtitle">
          <q-icon name="room" size="16px"/>&nbsp;
          <small>{{act.centro}}</small>
        </div>
      </q-card-title>
      <q-card-main>
        <q-collapsible label="Ver información" style="background-color: #e4b6d5">
          <div>
            <q-icon v-bind:name="$mostrarIcono(act.tematica)" size="20px"/>&nbsp;
            <small>{{act.tematica}}</small>
          </div>
            <br/>
            {{ act.descripcion }}
            <br/><br/>
            <p v-if="act.aviso">
          <q-icon name="warning" style="font-size: 20px"/>&nbsp;&nbsp;
            <strong>{{ act.aviso }}</strong>
            </p>
            <p>
          <q-icon name="event_note"/>&nbsp;&nbsp;
          <small>
            <strong>Matrícula: {{ $parsearFecha(act.fechaInicioMatriculacion) }} - {{ $parsearFecha(act.fechaFinMatriculacion) }}</strong>
          </small>
        </p>
        <p>
          <q-icon name="event"/>&nbsp;&nbsp;
          <small>
            <strong>Fechas: {{ $parsearFecha(act.fechaInicio) }} - {{ $parsearFecha(act.fechaFin) }}</strong>
          </small>
        </p>
            <q-btn push rounded size="sm" color="secondary" icon-right="directions" label="Matricularse"/>
        </q-collapsible>
        <q-item-main/>
      </q-card-main>
      <q-card-separator/>
      <!-- q-card-actions align="between">
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
        <div>
        </div>
        <div>
          <q-icon name="person"/>&nbsp;&nbsp;
          <small>
            <strong>{{ act.numeroSolicitudes }} solicitudes /  {{ act.numeroPlazas }} plazas</strong>
          </small>
        </div>
      </q-card-actions-->
      <q-card-actions align="between">
        <div>
          <q-icon name="trending_up"/>&nbsp;&nbsp;
          <small>
            <strong>{{ act.nivel }}</strong>
          </small>
        </div>
        <div>
          <q-icon name="watch_later"/>&nbsp;&nbsp;
          <small>
            <strong>{{ act.numeroHoras }} h</strong>
          </small>
        </div>        
        <div>
          <q-icon name="person"/>&nbsp;&nbsp;
          <small>
            <strong>{{ act.numeroSolicitudes }} solicitudes /  {{ act.numeroPlazas }} plazas</strong>
          </small>
        </div>
      </q-card-actions>
      <q-card-separator/>
      <q-card-actions align="between">
        <div>
          <q-chip v-for="miTag in act.tagsGenerados" :key="miTag" color="tertiary" small>{{ miTag }}</q-chip>
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
            var centroTMP = this.$eliminarAcentos(
              provTmp[x].nombre
            ).toLowerCase();

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

              var miAviso = this.$CDATAToText(
                miJson.actividades[x].aviso
              );
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
              // Lo metemos en un array
              this.actividades.push(dato);
            }
          }
          // actualizamos favoritos
          this.cargarFavoritos("favoritos-cursos");

          // Salvo en localstorage
          localStorage.setItem(
            "datos-cursos",
            JSON.stringify(this.actividades)
          );
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
