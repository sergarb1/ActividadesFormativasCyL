<template>
  <q-page class="flex-top q-ma-lg">
    <q-item-tile label class="q-mb-md">
      <strong>Charlas</strong>
    </q-item-tile>
    <q-alert v-if="this.actividades.length==0" type="info">No hay actividades disponibles.</q-alert>

    <q-card class="q-mb-md" v-for="act in actividades" :key="act.nombre">
      <q-card-title>
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
    </q-card>
  </q-page>
</template>

<style>
</style>


<!-- Aqui script, donde irá el Javascript (métodos, funciones, etc) -->
<script>
// Importamos axios para realizar el Ajax
import axios from "axios";

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

          var x;
          // Pasamos el contenido al array "actividades"
          for (x in miJson.actividades) {
            //Formamos el dato
            var dato;
            dato = {
              nombre: miJson.actividades[x].nombre,
              descripcion: miJson.actividades[x].descripcion.replace(
                /<[^>]+>/g,
                ""
              ),
              tematica: miJson.actividades[x].tematica,
              fechaInicio: miJson.actividades[x].fechaInicio,
              fechaInicioMatriculacion: miJson.actividades[x].fechaInicioMatriculacion,
              fechaFin: miJson.actividades[x].fechaFin,
              fechaFinMatriculacion: miJson.actividades[x].fechaFinMatriculacion,
              numeroHoras: miJson.actividades[x].numeroHoras,
              centro: miJson.actividades[x].centro
              
            };
            // Lo metemos en un array
            this.actividades.push(dato);
          }
          // Actualizamos la ultima fecha de actualizacion
          this.ultimaActualizacion = new Date().toLocaleString();
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
