<template>
  <q-page class="flex-top q-ma-lg">
    <q-item-tile label class="q-mb-md">
      <strong>Actividades Online</strong>
    </q-item-tile>
    <q-card class="q-mb-md" v-for="act in actividades" :key="act.nombre">
      <q-card-title>
        {{ act.nombre }}
        <div slot="right" class="row items-center">
          <q-icon size="16px"/>&nbsp;
          <small>{{act.tematica}}</small>
        </div>
      </q-card-title>
      <q-card-main>
        <pre class="text-faded">Fecha inicio matriculación {{ act.fechaInicioMatriculacion }}</pre>
        <pre class="text-faded">Fecha fin matriculación {{ act.fechaFinMatriculacion }}</pre>
        <pre class="text-faded">Fecha inicio actividad{{ act.fechaInicio }}</pre>
        <pre class="text-faded">Fecha fin actividad {{ act.fechaFin }}</pre>
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

          var x;
          // Vaciamos el array
          this.actividades = [];
          // Pasamos el contenido al array "actividades"
          for (x in miJson.actividades) {
            //Formamos el dato
            var dato;
            dato = {
              nombre: miJson.actividades[x].nombre,
              descripcion: miJson.actividades[x].descripcion.replace(/<[^>]+>/g, ''),
              tematica: miJson.actividades[x].tematica,
              fechaInicio: miJson.actividades[x].fechaInicio,
              fechaInicioMatriculacion: miJson.actividades[x].fechaInicioMatriculacion,
              fechaFin: miJson.actividades[x].temafechaFin,
              fechaFinMatriculacion: miJson.actividades[x].fechaFinMatriculacion,
              
              
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
