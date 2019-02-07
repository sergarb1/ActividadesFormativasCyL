<template>
  <q-page class="flex-top q-ma-lg">
    <q-item-tile label class="q-mb-md">
      <strong>Actividades online</strong>
    </q-item-tile>
    <q-alert v-if="this.actividades.length==0" icon="info" color="tertiary">
      No hay actividades de este tipo disponibles.
      Comprueba en el menú Suscripciones las provincias que deseas mostrar.
    </q-alert>

    <q-card class="q-mb-md" v-for="act in actividades" :key="act.nombre+act.fechaInicio">
      <q-card-title>
        {{ act.nombre }}
        <div slot="right" class="row items-center">
          <q-checkbox
            v-model="act.favorito"
            checked-icon="favorite"
            unchecked-icon="favorite_border"
            @input="$guardarFavoritos(actividades,'favoritos-online');  if(act.favorito)$q.notify({message: 'Agregado a favoritos: '+act.nombre,timeout: 1000, type: 'positive', position: 'center'});"
          />
        </div>
        <div slot="subtitle">
          <q-icon name="cloud" size="16px"/>&nbsp;
          <small>Online</small>
        </div>
      </q-card-title>
      <q-card-main>
        <q-collapsible label="Ver información" style="background-color: #e4b6d5">
          <div>
            <q-icon v-bind:name="$mostrarIcono(act.tematica)" size="20px"/>&nbsp;
            <small>{{act.tematica}}</small>
          </div>
          <br>
          {{ act.descripcion }}
          <br>
          <br>
          <!-- He incluido aviso y requisitos aunque no hay ninguna actividad online que los tenga de momento-->
          <p v-if="act.aviso">
            <q-icon name="warning" style="font-size: 20px"/>&nbsp;&nbsp;
            <strong>{{ act.aviso }}</strong>
          </p>
          <p v-if="act.requisitos">
            <q-icon name="warning" style="font-size: 20px"/>&nbsp;&nbsp;
            <strong>{{ act.requisitos }}</strong>
          </p>
          <p>
            <q-icon name="event"/>&nbsp;&nbsp;
            <small>
              <strong>Fechas: {{ $parsearFecha(act.fechaInicio) }} - {{ $parsearFecha(act.fechaFin) }}</strong>
            </small>
          </p>
          <p v-if="act.horaInicioWebinar">
            <q-icon name="video_call"/>&nbsp;&nbsp;
            <small>
              <strong>Horario webinar: {{ act.horaInicioWebinar }}h. - {{ act.horaFinWebinar }}h.</strong>
            </small>
          </p>
          <q-btn
            push
            rounded
            size="sm"
            color="secondary"
            icon-right="directions"
            label="Matricularse"
            @click="abrirURL('https://www.cyldigital.es/user/login')"
          />
        </q-collapsible>
        <q-item-main/>
      </q-card-main>
      <q-card-separator/>
      <q-card-actions align="between">
        <div>
          <q-icon name="watch_later"/>&nbsp;&nbsp;
          <small>
            <strong>{{ act.numeroHoras }} h</strong>
          </small>
        </div>
        <div>
          <q-icon name="person"/>&nbsp;&nbsp;
          <small>
            <strong>{{ act.numeroSolicitudes }} solicitudes / {{ act.numeroPlazas }} plazas</strong>
          </small>
        </div>
      </q-card-actions>
      <q-card-separator/>
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
// Para poder usar openUrl
import { openURL } from "quasar";
// Para la pantalla de carga
import { Loading, QSpinnerGears } from "quasar";

export default {
  name: "Index",
  // Definimos las variables en Vue
  data() {
    return {
      // Array con información de cada uno de las estacione
      actividades: []
    };
  },
  // Acciones al realizar al acabar de montarse Vue en el componente
  mounted() {
    // Comprobar si hay que actualizar y si se debe hacer, se hace
    if (this.$hayQueActualizar()) {
      //Actualizamos los datos
      this.$actualizarDatos();

      Loading.show({
        spinner: QSpinnerGears,
        message: "Carga inicial de Actividades, espere...",
        messageColor: "blue",
        spinnerSize: 250, // in pixels
        spinnerColor: "white",
        customClass: "bg-primary"
      });

      // Timeout para que a los 10 segundos cargue
      setTimeout(
        function() {
          this.obtieneInformacionCentrosMarcados();
          this.cargarFavoritos("favoritos-presenciales");
          Loading.hide();
          // Ponemos fecha de actualizacion y la guardamos localStorage
          this.$ultimaActualizacion = new Date();
          localStorage.setItem(
            "ultimaActualizacion",
            JSON.stringify(this.$ultimaActualizacion.toISOString())
          );
        }.bind(this),
        10000
      );

      // Timeout para que a los 16 segundos re-intente
      setTimeout(
        function() {
          this.obtieneInformacionCentrosMarcados();
          this.cargarFavoritos("favoritos-online");
          Loading.hide();
          this.$notificar();
        }.bind(this),
        16000
      );
    } // Si no hay que actualizar, entonces cargamos y notificamos
    else {
      this.obtieneInformacionCentrosMarcados();
      this.cargarFavoritos("favoritos-online");
      // Notificamos tanto escritorio como movil (si procede)
      this.$notificar();
    }
  },
  // Metodos accesibles desde Vue
  methods: {
    // Funcion que recibe un URL y la abre
    abrirURL(url) {
      openURL(url);
    },

    // Funcion que obtiene de LocalStorage los centros y los anyade a la consulta
    obtieneInformacionCentrosMarcados() {
      // Obtengo del LocalStorage la información cargada de las actividades online
      this.actividades = JSON.parse(
        localStorage.getItem("presenciales-online")
      );
      // Ordeno array actividades online por fecha de inicio
      this.actividades.sort(function(a, b) {
        return a.fechaInicio.localeCompare(b.fechaInicio);
      });
    },

    // Función que carga del LocalStorage un texto en formato JSON
    // con los favoritos de cursos y rellena los cursos cargados
    cargarFavoritos(idLocalStorage) {
      // Si el favorito esta disponible, lo cargamos
      if (localStorage.getItem(idLocalStorage)) {
        var fav = JSON.parse(localStorage.getItem(idLocalStorage));
        // Recorremos los favoritos y las activiades
        for (var x in fav) {
          for (var y in this.actividades) {
            // Si coinciden las actividades, se marca como favorito
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
