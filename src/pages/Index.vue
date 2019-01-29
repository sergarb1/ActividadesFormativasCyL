<template>
  <q-page class="flex flex-center">
    <!-- Elemento colapsable https://quasar-framework.org/components/collapsible.html -->
    <q-collapsible icon="account_balance" label="Actividades CyL" opened class="col-lg">
      <q-list highlight separator>
        <q-list-header>
          Datos actualizados {{ ultimaActualizacion }}
          <!-- Boton que actualiza los datos de ValenBisi, que se ve como un iconito
              https://quasar-framework.org/components/button.html
          -->
          <q-btn @click="getEstadoActividades" icon="update"/>
        </q-list-header>
      </q-list>

      <!-- Usamos el componente q-table
              En el definimos:
                - Fuente de datos
                - Como organizamos las columnas
                - Key (campo con valor unico)
                https://quasar-framework.org/components/datatable.html
      -->
      <q-table :data="actividades" :columns="columns" class="col-lg"></q-table>
    </q-collapsible>
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
        "https://admin.sigecyl.es/servicios/actividades/actividadesPresenciales?tipoActividad=charla&tipoActividad=curso&tipoActividad=taller&centro=leon",
      // Array con información de cada uno de las estacione
      actividades: [],
      // Fecha de ultima actualizacion en formato Cadena
      ultimaActualizacion: "",

      // Array que define las columnas de la tabla
      columns: [
        {
          name: "Nombre",
          required: true,
          label: "Nombre actividad",
          align: "left",
          field: "nombre",
          sortable: true
          //classes: '',
          //style: 'width: 500px'
        }
      ]
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
          var miJson = JSON.parse(JSON.stringify(response.data));

          var x;
          // Vaciamos el array
          this.actividades = [];
          // Pasamos el contenido al array "actividades"
          for (x in miJson.actividades) {
            //Formamos el dato
            var dato;
            dato = {
              nombre: miJson.actividades[x].nombre
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
