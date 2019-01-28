<template>
  <q-page class="flex flex-center">
    <q-list>
    <!-- Elemento colapsable con Estaciones ValenBisi -->
      <q-item class="justify-center">
        <!-- Elemento colapsable https://quasar-framework.org/components/collapsible.html -->
        <q-collapsible icon="account_balance" label="Nombres de cursos" opened class="col-lg" >
          <q-list highlight separator >
            <q-list-header>Datos actualizados {{ ultimaActualizacion }}

              <!-- Boton que actualiza los datos de ValenBisi, que se ve como un iconito
              https://quasar-framework.org/components/button.html
              -->
              <q-btn @click="getEstadoActividades" icon="update" />
            </q-list-header>
            <q-item>
              <!-- Usamos el componente q-table
              En el definimos:
                - Fuente de datos
                - Como organizamos las columnas
                - Key (campo con valor unico)
                https://quasar-framework.org/components/datatable.html
              -->
              <q-table
                :data="estaciones"
                :columns="columns"
                row-key="nombre"
                 class="col-lg"
              >

              </q-table>
            </q-item>
          </q-list>
        </q-collapsible>
      </q-item>
      </q-list>
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
      endpoint: "https://admin.sigecyl.es/servicios/actividades/actividadesPresenciales?tipoActividad=charla&tipoActividad=curso&tipoActividad=taller&centro=leon&numActividades=3&fechaInicio=01/10/2013&fechaFin=20/11/2014",
      // Array con información de cada uno de las estacione
      estaciones: [],
      // Fecha de ultima actualizacion en formato Cadena
      ultimaActualizacion:'',

      // Array que define las columnas de la tabla
      columns: [
      {
        name: 'Nombre',
        required: true,
        label: 'Nombre estación',
        align: 'left',
        field: 'nombre',
        sortable: true,
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
      axios.defaults.headers={
        'Accept':'application/json'
        };
      // Definimos el comportamiento de Axios
      axios.get(this.endpoint)
        .then(response => {
          console.log(response.data);
          var x;
          // Vaciamos el array
          this.estaciones=[];
          // Pasamos el contenido al array "estaciones"
          for (x in response.data.wsRespuestaActividadesPresenciales.actividades) {
            //Formamos el dato
            var dato;

            dato={
              nombre: response.data.wsRespuestaActividadesPresenciales.actividades[x].nombre,
            }
            // Lo metemos en un array
            this.estaciones.push(dato);
          }
          // Actualizamos la ultima fecha de actualizacion
          this.ultimaActualizacion=new Date().toLocaleString();

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
