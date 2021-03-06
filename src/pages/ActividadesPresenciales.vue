<template>
  <q-page class="flex-top q-ma-lg">
    <q-item-tile label class="q-mb-md">
      <strong>Actividades presenciales</strong>
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
            @input="$guardarFavoritos(actividades,'favoritos-presenciales');  if(act.favorito)$q.notify({message: 'Agregado a favoritos: '+act.nombre,timeout: 1000, type: 'positive', position: 'center'});"
          />
        </div>
        <div slot="subtitle">
          <q-icon name="room" size="16px"/>&nbsp;
          <small>{{act.centro}}</small> &nbsp;&nbsp;&nbsp;
          <q-icon v-bind:name="$mostrarIcono(act.tipo)" size="20px"/>&nbsp;
          <small>{{ act.tipo }}</small>
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
          <q-icon name="trending_up"/>
          <small>
            <strong>{{ act.nivel }}</strong>
          </small>
        </div>
        <div>
          <q-icon name="watch_later"/>
          <small>
            <strong>{{ act.numeroHoras }} h</strong>
          </small>
        </div>
        <div>
          <q-icon name="person"/>
          <small>
            <strong>{{ act.numeroSolicitudes }} solicitudes/{{ act.numeroPlazas }} plazas</strong>
          </small>
        </div>
      </q-card-actions>
      <q-card-separator/>
      <!-- q-card-actions align="between">
        <div>
          <q-chip v-for="miTag in act.tagsGenerados" :key="miTag" color="tertiary" small>{{ miTag }}</q-chip>
        </div>
      </q-card-actions-->
    </q-card>
  </q-page>
</template>

<style>
</style>


<!-- Aqui script, donde irá el Javascript (métodos, funciones, etc) -->
<script>
// Para poder abrir url con openURL
import { openURL } from "quasar";
// Para la pantalla de carga
import { Loading, QSpinnerGears } from "quasar";

export default {
  name: "Index",
  // Definimos las variables en Vue
  data() {
    return {
      // Array con información de cada uno de los eventos
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
              message: 'Carga inicial de Actividades, espere...',
              messageColor: 'white',
              spinnerSize: 250, // in pixels
              spinnerColor: 'white',
              customClass : 'bg-primary'
      });

    // Timeout para que a los 10 segundos cargue
    setTimeout( function(){
      this.obtieneInformacionCentrosMarcados();
      this.cargarFavoritos("favoritos-presenciales");
      Loading.hide();      
      // Ponemos fecha de actualizacion y la guardamos localStorage
      this.$ultimaActualizacion = new Date();
      localStorage.setItem(
        "ultimaActualizacion",
        JSON.stringify(this.$ultimaActualizacion.toISOString())
      );
    }.bind(this),9000);
    
    // Timeout para que a los 16 segundos re-intente
    setTimeout( function(){
      this.obtieneInformacionCentrosMarcados();
      this.cargarFavoritos("favoritos-presenciales");
      Loading.hide(); 
      this.$notificar();
    }.bind(this),15000);
    


    } // Si no hay que actualizar, entonces cargamos y notificamos
    else {
      
      this.obtieneInformacionCentrosMarcados();
      this.cargarFavoritos("favoritos-presenciales");
      // Notificamos tanto escritorio como movil (si procede)
      this.$notificar();
    }

   

  },

  // Metodos accesibles desde Vue
  methods: {
    abrirURL(url) {
      openURL(url);
    },

    // Funcion que obtiene de LocalStorage los centros y los anyade a la consulta
    obtieneInformacionCentrosMarcados() {
      // vaciamos las activiades
      this.actividades = [];
      // Obtenemos inforacion de las provincias
      var provTmp;
      if (localStorage.getItem("provincias")) {
        provTmp = JSON.parse(localStorage.getItem("provincias"));
      } else {
        provTmp = this.$provincias;
      }

      // Recorremos las provincias
      for (var x in provTmp) {
        // Si la provincia esta marcada
        if (provTmp[x].marcado) {
          // Adaptamos el nombre del centro al formato establecido
          var centroTMP = this.$eliminarAcentos(
            provTmp[x].nombre
          ).toLowerCase();
          // Obtenemos de LocalStorage actividade de los  distintos centros y los
          // vamos uniendo en un array
          this.actividades = this.$unirArrays(
            this.actividades,
            JSON.parse(localStorage.getItem("presenciales-" + centroTMP))
          );
        }
      }

      // Ordeno array actividades presenciales
      this.actividades.sort(function(a, b) {
        return a.fechaInicio.localeCompare(b.fechaInicio);
      });
    },
    // Función que carga del localStorage un texto en formato JSON
    // con los favoritos de cursos
    cargarFavoritos(idLocalStorage) {
      if (localStorage.getItem(idLocalStorage)) {
        var fav = JSON.parse(localStorage.getItem(idLocalStorage));
        // Recorremos favoritos y actividades
        // Marcamos aquellos que coinciden como favoritos
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
