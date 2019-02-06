<!-- Página que permite buscar un evento  -->
<template>
  <q-page class="flex-center on-right on-left">
    <div class="q-ma-lg">
      <!-- Indico un (m)argen a (all) todas las dimensiones grande (lg) -->
      <q-item-tile label class="q-mb-md">
        <strong>Buscar evento</strong>
      </q-item-tile>
      <!-- q-input
      float-label="Titulo"
      placeholder="Introduzca aquí el titulo del evento"
      /-->
      <q-input
        v-model="filtro.busqueda"
        @input="guardar()"
        placeholder="Introduzca cadena de busqueda"
      />
      <br>
      <q-collapsible icon="room" label="Provincias">
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
                  v-model="provinciasEstadoTodas"
                  label="Todas"
                  @input="marcarTodasProvincias();guardar();"
                />
              </q-item-tile>
            </q-item-main>
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
                  @input="guardar();"
                />
              </q-item-tile>
            </q-item-main>
          </q-item>
        </q-list>
      </q-collapsible>
      <q-collapsible icon="games" label="Temáticas">
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
                  v-model="tematicasEstadoTodas"
                  label="Todas"
                  @input="marcarTodasTematicas();guardar();"
                />
              </q-item-tile>
            </q-item-main>
          </q-item>

          <!-- Utilizamos un list para meter etiquetas con checkbox y toggle button -->
          <q-item tag="label" v-for="tema in tematicas" :key="tema.nombre">
            <q-item-main>
              <q-item-tile label>
                <!-- q-checkbox v-model="check2" color="primary" v-bind:label="curso.area"/ -->
                <q-checkbox
                  color="primary"
                  v-bind:label="tema.nombre"
                  v-model="tema.marcado"
                  @input="guardar"
                />
              </q-item-tile>
            </q-item-main>
          </q-item>
        </q-list>
      </q-collapsible>
      <q-collapsible icon="trending_up" label="Niveles">
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
                  v-model="nivelesEstadoTodas"
                  label="Todas"
                  @input="marcarTodasNiveles();guardar();"
                />
              </q-item-tile>
            </q-item-main>
          </q-item>

          <!-- Utilizamos un list para meter etiquetas con checkbox y toggle button -->
          <q-item tag="label" v-for="niv in niveles" :key="niv.nombre">
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
      <q-input
        v-model="filtro.horasMin"
        @input="guardar()"
        type="number"
        stack-label="Nº horas mínimo"
      />
      <q-input
        v-model="filtro.horasMax"
        @input="guardar()"
        type="number"
        stack-label="Nº horas máximo"
      />
      <q-datetime
        v-model="filtro.fechaIni"
        @input="guardar()"
        type="date"
        float-label="Fecha de inicio posterior a"
      />
      <!--
        <q-datetime
        v-model="filtro.fechaFin"
        @input="guardar()"
        type="date"
        float-label="Fecha de fin anterior a"
      />-->
      <!-- q-input
      v-model="form.hora"
      float-label="Hora"
      placeholder="Introduzca aquí la hora o rango de horas del evento"
      /-->
      <q-btn
        color="primary"
        to="/resultadobusqueda"
        :loading="this.grabando"
        label="Buscar"
        :disabled="this.desactivado"
      >
        <!-- Para elegir otro spinner, tengo que cargar en quasar.conf.js el que sea -->
        <q-spinner-dots slot="loading"/>
      </q-btn>
      <br>
      <br>
      <q-alert v-if="alertaVisible" :type="alertaType">{{this.alertaMensaje}}</q-alert>
    </div>
  </q-page>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      provinciasEstadoTodas: false,

      tematicasEstadoTodas: false,

      nivelesEstadoTodas: false,
      grabando: false,
      desactivado: false,
      alertaVisible: false,
      alertaType: false,
      alertaMensaje: "prueba",
      provincias: [
        { nombre: "Ávila", marcado: false },
        { nombre: "Burgos", marcado: false },
        { nombre: "León", marcado: false },
        { nombre: "Palencia", marcado: false },
        { nombre: "Salamanca", marcado: false },
        { nombre: "Segovia", marcado: false },
        { nombre: "Soria", marcado: false },
        { nombre: "Valladolid", marcado: false },
        { nombre: "Zamora", marcado: false }
      ],
      tematicas: [
        { nombre: "Dispositivos e infraestructura", marcado: false },
        { nombre: "Seguridad", marcado: false },
        { nombre: "Redes sociales y marketing digital", marcado: false },
        { nombre: "Navegación y trámites por internet", marcado: false },
        { nombre: "Creación de contenidos digitales", marcado: false },
        { nombre: "Comunicación y colaboración", marcado: false },
        { nombre: "Empleo", marcado: false }
      ],
      niveles: [
        { nombre: "Básico", marcado: false },
        { nombre: "Medio", marcado: false },
        { nombre: "Avanzado", marcado: false }
      ],

      filtro: {
        horasMin: undefined,
        horasMax: undefined,
        fechaIni: undefined,
        fechaFin: undefined,
        provincias: [],
        tematicas: [],
        niveles: [],
        busqueda: ""
      }
    };
  },
  mounted() {
    //Recuperamos estado de los filtros
    this.recuperarFiltro();
  },
  methods: {
    guardar() {
      // Movemos el "Todas" de provincias
      this.provinciasEstadoTodas = true;
      for (var i in this.provincias) {
        if (this.provincias[i].marcado == false)
          this.provinciasEstadoTodas = false;
      }
      // Movemos el "Todas" de tematicas
      this.tematicasEstadoTodas = true;
      for (var i in this.tematicas) {
        if (this.tematicas[i].marcado == false)
          this.tematicasEstadoTodas = false;
      }

      // Movemos el "Todas" de niveles
      this.nivelesEstadoTodas = true;
      for (var i in this.niveles) {
        if (this.niveles[i].marcado == false)
          this.nivelesEstadoTodas = false;
      }

      // Guardamos los filtros
      this.filtro.provincias = [];
      for (var i in this.provincias) {
        if (this.provincias[i].marcado) {
          this.filtro.provincias.push(this.provincias[i].nombre);
        }
      }
      this.filtro.tematicas = [];
      for (var i in this.tematicas) {
        if (this.tematicas[i].marcado) {
          this.filtro.tematicas.push(this.tematicas[i].nombre);
        }
      }
      this.filtro.niveles = [];
      for (var i in this.niveles) {
        if (this.niveles[i].marcado) {
          this.filtro.niveles.push(this.niveles[i].nombre);
        }
      }
      localStorage.setItem("filtro", JSON.stringify(this.filtro));
    },
    // Funcion que recupera los filtros
    recuperarFiltro(){
      if(localStorage.getItem('filtro')){
        this.filtro=JSON.parse(localStorage.getItem('filtro'));

        // Cargamos parte de los filtros
        for (var i in this.filtro.provincias) {
          for(var j in this.provincias){
            if(this.filtro.provincias[i]==this.provincias[j].nombre){
                this.provincias[j].marcado=true;
            }
          }
        }
for (var i in this.filtro.tematicas) {
          for(var j in this.tematicas){
            if(this.filtro.tematicas[i]==this.tematicas[j].nombre){
                this.tematicas[j].marcado=true;
            }
          }
        }
        for (var i in this.filtro.niveles) {
          for(var j in this.niveles){
            if(this.filtro.niveles[i]==this.niveles[j].nombre){
                this.niveles[j].marcado=true;
            }
          }
        }

        // Guardamos para recargar
        this.guardar();
      }
      
    },

    // Funcion que marca/desmarca todas las provincias
    marcarTodasProvincias() {
      for (var i in this.provincias) {
        this.provincias[i].marcado = this.provinciasEstadoTodas;
      }
    },
    // Funcion que marca/desmarca todas las tematicas
    marcarTodasTematicas() {
      for (var i in this.tematicas) {
        this.tematicas[i].marcado = this.tematicasEstadoTodas;
      }
    },
    // Funcion que marca/desmarca todas las niveles
    marcarTodasNiveles() {
      for (var i in this.niveles) {
        this.niveles[i].marcado = this.nivelesEstadoTodas;
      }
    }
  }
};
</script>
