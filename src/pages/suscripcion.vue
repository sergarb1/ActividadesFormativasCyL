<template>
  <q-page class="flex-center">
    <div class="q-ma-lg">
      <!-- Indico un (m)argen a (all) todas las dimensiones grande (lg) -->
      <q-item-tile label class="q-ma-md">
        <strong>Gestión de suscripciones y notificaciones</strong>
      </q-item-tile>
      <q-list class="q-ma-md">
        <!-- Utilizamos un q-list para poner tres elementos collapsible -->
        <q-collapsible group="somegroup" icon="face" label="Suscripciones" opened>
          <q-list link>
            <q-list-header>Marca las provincias a las que quieres suscribirte:</q-list-header>
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
        </q-collapsible>
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
      provincias: [
        { nombre: "León", marcado: false, notificado: false },
        { nombre: "Zamora", marcado: false, notificado: false },
        { nombre: "Ávila", marcado: false, notificado: false }
      ]
    };
  },
  // Acciones al realizar al acabar de montarse Vue en el componente
  mounted() {
   if (localStorage.getItem("provincias")) {
      this.provincias = JSON.parse(localStorage.getItem("provincias"));
    }
  },
  // Metodos accesibles desde Vue
  methods: {
    guardar() {
      localStorage.setItem("provincias", JSON.stringify(this.provincias));
    }
  }
};
</script>
