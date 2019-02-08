<template>
  <q-page class="flex-center">
    <div class="q-ma-lg">
      <!-- Indico un (m)argen a (all) todas las dimensiones grande (lg) -->
      <q-item-tile label class="q-ma-md">
        <strong>Gestión de suscripciones y notificaciones</strong>
      </q-item-tile>
      <q-list link>
        <q-list-header>Marca las provincias a las que quieres suscribirte para visualizar actividades presenciales.<br/>
                      Activa el interruptor de aquellas provincias de las que quieres recibir notificaciones cuando se abran matrículas de cursos.</q-list-header>
        <!-- Utilizamos un list para meter etiquetas con checkbox y toggle button
        Este primero es un caso especial para marcar todas-->
        <q-item tag="label">
          <q-item-main>
            <q-item-tile label>
              <!-- q-checkbox v-model="check2" color="primary" v-bind:label="curso.area"/ -->
              <q-checkbox
                color="primary"
                label="Todas"
                v-model="estadoTodas"
                @input="marcarTodas();guardar();"
              />
            </q-item-tile>
          </q-item-main>
          <q-item-side right>
            <q-toggle
              class="primary"
              v-model="estadoTodasNotificaciones"
              unchecked-icon="notifications_off"
              checked-icon="notifications_active"
              @input="marcarTodasNotificaciones();guardar();"
            />
          </q-item-side>
        </q-item>

        <!-- Utilizamos un list para meter etiquetas con checkbox y toggle button -->
        <q-item tag="label" v-for="prov in provincias" :key="prov.nombre">
          <q-item-main>
            <q-item-tile label>
              <!-- q-checkbox v-model="check2" color="primary" v-bind:label="curso.area"/ -->
              <q-checkbox
                color="primary"
                v-bind:label="prov.nombre"
                v-model="prov.marcado"
                @input="guardar()"
              />
            </q-item-tile>
          </q-item-main>
          <q-item-side right>
            <q-toggle
              v-if="prov.marcado"
              class="primary"
              v-model="prov.notificado"
              unchecked-icon="notifications_off"
              checked-icon="notifications_active"
              @input="guardar()"
            />
          </q-item-side>
        </q-item>
      </q-list>
    </div>
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
      provincias: [],
      // Variables para la opcion "Todas" de las suscripciones y notificaciones
      estadoTodas: false,
      estadoTodasNotificaciones: false
    };
  },
  // Acciones al realizar al acabar de montarse Vue en el componente
  mounted() {
    if (localStorage.getItem("provincias")) {
      this.provincias = JSON.parse(localStorage.getItem("provincias"));
    } else {
      this.provincias = this.$provincias;
    }
    // Codigo para marcar las de TODOS segun el estado
    this.estadoTodas = true;
    this.estadoTodasNotificaciones = true;

    for (var i in this.provincias) {
      if (this.provincias[i].marcado == false) this.estadoTodas = false;
      if (this.provincias[i].notificado == false)
        this.estadoTodasNotificaciones = false;
    }
  },
  // Metodos accesibles desde Vue
  methods: {
    // Funcion que marca/desmarca todas
    marcarTodas() {
      for (var i in this.provincias) {
        this.provincias[i].marcado = this.estadoTodas;
        // Si se desmarcan todas, tambien se desmarcan sus notificaciones
        if (!this.estadoTodas) {
          this.provincias[i].notificado = false;
        }
      }
    }, // Funcion que marca todas las notificaciones de eventos marcados
    marcarTodasNotificaciones() {
      for (var i in this.provincias) {
        if (this.provincias[i].marcado)
          this.provincias[i].notificado = this.estadoTodasNotificaciones;
      }
    },
    // Función que guarda en localStorage un texto en formato JSON con el estado de las provincias
    guardar() {
      // Codigo para marcar las de TODOS segun el estado
      this.estadoTodas = true;
      this.estadoTodasNotificaciones = true;
      localStorage.setItem("provincias", JSON.stringify(this.provincias));
      for (var i in this.provincias) {
        if (this.provincias[i].marcado == false) this.estadoTodas = false;
        if (this.provincias[i].notificado == false)
          this.estadoTodasNotificaciones = false;
      }
    }
  }
};
</script>
