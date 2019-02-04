<!-- Página que permite buscar un evento  -->
<template>
  <q-page class="flex-center on-right on-left">
    <div class="q-ma-lg"> <!-- Indico un (m)argen a (all) todas las dimensiones grande (lg) -->
    <q-item-tile label class="q-mb-md"><strong>Buscar evento</strong></q-item-tile>
    <!-- q-input
      float-label="Titulo"
      placeholder="Introduzca aquí el titulo del evento"
    / -->
    <br/>
      <q-collapsible
        icon="room"
        label="Provincias"
      >
    <q-list link>
        <q-list-header>Marca las provincias de las que quieres buscar eventos:</q-list-header>
            <!-- Utilizamos un list para meter etiquetas con checkbox y toggle button
            Este primero es un caso especial para marcar todas-->
            <q-item tag="label">
              <q-item-main>
                <q-item-tile label>
                  <!-- q-checkbox v-model="check2" color="primary" v-bind:label="curso.area"/ -->
                  <q-checkbox
                    color="primary"
                    label="Todas"
                    @input="marcarTodas();guardar();"
                  />
                </q-item-tile>
              </q-item-main>
            </q-item>

            <!-- Utilizamos un list para meter etiquetas con checkbox y toggle button -->
            <q-item tag="label" v-for="prov in form.provincias" :key="prov.nombre">
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
            </q-item>
          </q-list>

        </q-collapsible>
        <q-collapsible
        icon="games"
        label="Temáticas"
      >
          <q-list link>
            <q-list-header>Marca las temáticas que te interesan:</q-list-header>
            <!-- Utilizamos un list para meter etiquetas con checkbox y toggle button
            Este primero es un caso especial para marcar todas-->
            <q-item tag="label">
              <q-item-main>
                <q-item-tile label>
                  <!-- q-checkbox v-model="check2" color="primary" v-bind:label="curso.area"/ -->
                  <q-checkbox
                    color="primary"
                    label="Todas"
                    @input="marcarTodas();guardar();"
                  />
                </q-item-tile>
              </q-item-main>
            </q-item>

            <!-- Utilizamos un list para meter etiquetas con checkbox y toggle button -->
            <q-item tag="label" v-for="tema in form.tematicas" :key="tema.nombre">
              <q-item-main>
                <q-item-tile label>
                  <!-- q-checkbox v-model="check2" color="primary" v-bind:label="curso.area"/ -->
                  <q-checkbox
                    color="primary"
                    v-bind:label="tema.nombre"
                    v-model="tema.marcado"
                    @input="guardar()"
                  />
                </q-item-tile>
              </q-item-main>
            </q-item>
          </q-list>
        </q-collapsible>
        <q-collapsible
        icon="trending_up"
        label="Niveles"
      >
          <q-list link>
            <q-list-header>Marca los niveles que te interesan:</q-list-header>
            <!-- Utilizamos un list para meter etiquetas con checkbox y toggle button
            Este primero es un caso especial para marcar todas-->
            <q-item tag="label">
              <q-item-main>
                <q-item-tile label>
                  <!-- q-checkbox v-model="check2" color="primary" v-bind:label="curso.area"/ -->
                  <q-checkbox
                    color="primary"
                    label="Todas"
                    @input="marcarTodas();guardar();"
                  />
                </q-item-tile>
              </q-item-main>
            </q-item>

            <!-- Utilizamos un list para meter etiquetas con checkbox y toggle button -->
            <q-item tag="label" v-for="niv in form.niveles" :key="niv.nombre">
              <q-item-main>
                <q-item-tile label>
                  <!-- q-checkbox v-model="check2" color="primary" v-bind:label="curso.area"/ -->
                  <q-checkbox
                    color="primary"
                    v-bind:label="niv.nombre"
                    v-model="niv.marcado"
                    @input="guardar()"
                  />
                </q-item-tile>
              </q-item-main>
            </q-item>
          </q-list>
        </q-collapsible>
    <q-input v-model="horasMin" type="number" stack-label="Nº horas mínimo" />
    <q-input v-model="horasMax" type="number" stack-label="Nº horas máximo" />
    <q-datetime v-model="form.fechaini" type="date" float-label="Fecha de inicio posterior a"/>
    <q-datetime v-model="form.fechafin" type="date" float-label="Fecha de fin anterior a"/>
    <!-- q-input
      v-model="form.hora"
      float-label="Hora"
      placeholder="Introduzca aquí la hora o rango de horas del evento"
    /-->
    <q-btn color="primary" @click="simulateSubmit" :loading="this.form.grabando" label='Guardar' :disabled='this.form.desactivado'>
      <!-- Para elegir otro spinner, tengo que cargar en quasar.conf.js el que sea -->
      <q-spinner-dots slot="loading" />
    </q-btn>
    <br/><br/>
    <q-alert
          v-if="form.alertaVisible"
          :type="form.alertaType"
    >{{this.form.alertaMensaje}}</q-alert>
    </div>
  </q-page>
</template>

<script>

import axios from 'axios'

export default{
  data () {
    return {
      form: {
        // provincias: [{label: 'Ávila', value: 'avila'}, {label: 'Burgos', value: 'burgos'}, {label:  'León', value: 'leon'}, {label:  'Palencia', value: 'palencia'}, {label:  'Salamanca', value: 'salamanca'}, {label:  'Segovia', value: 'segovia'}, {label:  'Soria', value: 'soria'}, {label: 'Valladolid', value: 'valladolid'}, {label:  'Zamora', value: 'zamora'}],
        provincias: [
        { nombre: "Ávila", marcado: false},
        { nombre: "Burgos", marcado: false },
        { nombre: "León", marcado: false},
        { nombre: "Palencia", marcado: false},
        { nombre: "Salamanca", marcado: false},
        { nombre: "Segovia", marcado: false},
        { nombre: "Soria", marcado: false },
        { nombre: "Valladolid", marcado: false},
        { nombre: "Zamora", marcado: false}
        ],  
        tematicas: [
        { nombre: "Dispositivos e infraestructura", marcado: false},
        { nombre: "Seguridad", marcado: false},
        { nombre: "Redes sociales y marketing digital", marcado: false},
        { nombre: "Navegación y trámites por internet", marcado: false},
        { nombre: "Creación de contenidos digitales", marcado: false},
        { nombre: "Comunicación y colaboración", marcado: false},
        { nombre: "Empleo", marcado: false}],
        niveles: [
        { nombre: "Básico", marcado: false},
        { nombre: "Medio", marcado: false},
        { nombre: "Avanzado", marcado: false}],
      estadoTodas: false,
      },
    }
  },
  created () {

  },
  methods: {
  }
}
</script>
