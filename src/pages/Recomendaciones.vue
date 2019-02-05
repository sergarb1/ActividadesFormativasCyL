<template>
  <q-page class="flex-top q-ma-lg">
    <!-- Collapsible Cursos -->
    <q-collapsible icon="school" label="Cursos">
      <q-item-tile label class="q-mb-md">
        <strong>Recomendaciones</strong>
      </q-item-tile>
      <q-alert v-if="this.recomCursos.length==0" type="info">No hay actividades disponibles.</q-alert>

      <q-card
        class="q-mb-md"
        v-for="act in recomCursos"
        :key="act.nombre+act.centro+act.fechaInicio"
      >
        <q-card-title>
          {{ act.nombre }}
          <span slot="subtitle">
            <q-icon v-bind:name="$mostrarIcono(act.tematica)" size="16px"/>&nbsp;
            <small>{{act.tematica}}</small>
          </span>
        </q-card-title>
        <q-card-main>
          {{ act.descripcion }}
          <q-item-main/>
        </q-card-main>
        <q-card-separator/>
        <q-card-actions align="between">
          <div>
            <q-icon name="event_note"/>&nbsp;&nbsp;
            <small>
              <strong>Matrícula: {{ $parsearFecha(act.fechaInicioMatriculacion) }} - {{ $parsearFecha(act.fechaFinMatriculacion) }}</strong>
            </small>
          </div>
          <div>
            <q-icon name="trending_up"/>&nbsp;&nbsp;
            <small>
              <strong>Nivel: {{ act.nivel }}</strong>
            </small>
          </div>
        </q-card-actions>
        <q-card-actions align="between">
          <div>
            <q-icon name="event"/>&nbsp;&nbsp;
            <small>
              <strong>Fechas: {{ $parsearFecha(act.fechaInicio) }} - {{ $parsearFecha(act.fechaFin) }}</strong>
            </small>
          </div>
          <div>
            <q-icon name="watch_later"/>&nbsp;&nbsp;
            <small>
              <strong>Nº horas: {{ act.numeroHoras }}</strong>
            </small>
          </div>
        </q-card-actions>
        <q-card-actions align="between">
          <div>
            <q-chip v-for="miTag in act.tagsGenerados" :key="miTag" color="primary">{{ miTag }}</q-chip>
          </div>
        </q-card-actions>
      </q-card>
    </q-collapsible>
    <!-- fin collapsible cursos -->
    <!-- Collapsible charlas -->
    <q-collapsible icon="mode_comment" label="Charlas">
      <q-item-tile label class="q-mb-md">
        <strong>Recomendaciones</strong>
      </q-item-tile>
      <q-alert v-if="this.recomCharlas.length==0" type="info">No hay actividades disponibles.</q-alert>

      <q-card
        class="q-mb-md"
        v-for="act in recomCharlas"
        :key="act.nombre+act.centro+act.fechaInicio"
      >
        <q-card-title>
          {{ act.nombre }}
          <span slot="subtitle">
            <q-icon v-bind:name="$mostrarIcono(act.tematica)" size="16px"/>&nbsp;
            <small>{{act.tematica}}</small>
          </span>
        </q-card-title>
        <q-card-main>
          {{ act.descripcion }}
          <q-item-main/>
        </q-card-main>
        <q-card-separator/>
        <q-card-actions align="between">
          <div>
            <q-icon name="event_note"/>&nbsp;&nbsp;
            <small>
              <strong>Matrícula: {{ $parsearFecha(act.fechaInicioMatriculacion) }} - {{ $parsearFecha(act.fechaFinMatriculacion) }}</strong>
            </small>
          </div>
          <div>
            <q-icon name="trending_up"/>&nbsp;&nbsp;
            <small>
              <strong>Nivel: {{ act.nivel }}</strong>
            </small>
          </div>
        </q-card-actions>
        <q-card-actions align="between">
          <div>
            <q-icon name="event"/>&nbsp;&nbsp;
            <small>
              <strong>Fechas: {{ $parsearFecha(act.fechaInicio) }} - {{ $parsearFecha(act.fechaFin) }}</strong>
            </small>
          </div>
          <div>
            <q-icon name="watch_later"/>&nbsp;&nbsp;
            <small>
              <strong>Nº horas: {{ act.numeroHoras }}</strong>
            </small>
          </div>
        </q-card-actions>
        <q-card-actions align="between">
          <div>
            <q-chip v-for="miTag in act.tagsGenerados" :key="miTag" color="primary">{{ miTag }}</q-chip>
          </div>
        </q-card-actions>
      </q-card>
    </q-collapsible>
    <!-- fin collapsible charlas -->
    <!-- Collapsible talleres -->
    <q-collapsible icon="extension" label="Talleres">
      <q-item-tile label class="q-mb-md">
        <strong>Recomendaciones</strong>
      </q-item-tile>
      <q-alert v-if="this.recomTalleres.length==0" type="info">No hay actividades disponibles.</q-alert>

      <q-card
        class="q-mb-md"
        v-for="act in recomTalleres"
        :key="act.nombre+act.centro+act.fechaInicio"
      >
        <q-card-title>
          {{ act.nombre }}
          <span slot="subtitle">
            <q-icon v-bind:name="$mostrarIcono(act.tematica)" size="16px"/>&nbsp;
            <small>{{act.tematica}}</small>
          </span>
        </q-card-title>
        <q-card-main>
          {{ act.descripcion }}
          <q-item-main/>
        </q-card-main>
        <q-card-separator/>
        <q-card-actions align="between">
          <div>
            <q-icon name="event_note"/>&nbsp;&nbsp;
            <small>
              <strong>Matrícula: {{ $parsearFecha(act.fechaInicioMatriculacion) }} - {{ $parsearFecha(act.fechaFinMatriculacion) }}</strong>
            </small>
          </div>
          <div>
            <q-icon name="trending_up"/>&nbsp;&nbsp;
            <small>
              <strong>Nivel: {{ act.nivel }}</strong>
            </small>
          </div>
        </q-card-actions>
        <q-card-actions align="between">
          <div>
            <q-icon name="event"/>&nbsp;&nbsp;
            <small>
              <strong>Fechas: {{ $parsearFecha(act.fechaInicio) }} - {{ $parsearFecha(act.fechaFin) }}</strong>
            </small>
          </div>
          <div>
            <q-icon name="watch_later"/>&nbsp;&nbsp;
            <small>
              <strong>Nº horas: {{ act.numeroHoras }}</strong>
            </small>
          </div>
        </q-card-actions>
        <q-card-actions align="between">
          <div>
            <q-chip v-for="miTag in act.tagsGenerados" :key="miTag" color="primary">{{ miTag }}</q-chip>
          </div>
        </q-card-actions>
      </q-card>
    </q-collapsible>
    <!-- fin collapsible talleres -->
    <!-- Collapsible online -->
    <q-collapsible icon="cloud" label="Online">
      <q-item-tile label class="q-mb-md">
        <strong>Recomendaciones</strong>
      </q-item-tile>
      <q-alert v-if="this.recomOnline.length==0" type="info">No hay actividades disponibles.</q-alert>

      <q-card
        class="q-mb-md"
        v-for="act in recomOnline"
        :key="act.nombre+act.centro+act.fechaInicio"
      >
        <q-card-title>
          {{ act.nombre }}
          <span slot="subtitle">
            <q-icon v-bind:name="$mostrarIcono(act.tematica)" size="16px"/>&nbsp;
            <small>{{act.tematica}}</small>
          </span>
        </q-card-title>
        <q-card-main>
          {{ act.descripcion }}
          <q-item-main/>
        </q-card-main>
        <q-card-separator/>
        <q-card-actions align="between">
          <div>
            <q-icon name="event_note"/>&nbsp;&nbsp;
            <small>
              <strong>Matrícula: {{ $parsearFecha(act.fechaInicioMatriculacion) }} - {{ $parsearFecha(act.fechaFinMatriculacion) }}</strong>
            </small>
          </div>
          <div>
            <q-icon name="trending_up"/>&nbsp;&nbsp;
            <small>
              <strong>Nivel: {{ act.nivel }}</strong>
            </small>
          </div>
        </q-card-actions>
        <q-card-actions align="between">
          <div>
            <q-icon name="event"/>&nbsp;&nbsp;
            <small>
              <strong>Fechas: {{ $parsearFecha(act.fechaInicio) }} - {{ $parsearFecha(act.fechaFin) }}</strong>
            </small>
          </div>
          <div>
            <q-icon name="watch_later"/>&nbsp;&nbsp;
            <small>
              <strong>Nº horas: {{ act.numeroHoras }}</strong>
            </small>
          </div>
        </q-card-actions>
        <q-card-actions align="between">
          <div>
            <q-chip v-for="miTag in act.tagsGenerados" :key="miTag" color="primary">{{ miTag }}</q-chip>
          </div>
        </q-card-actions>
      </q-card>
    </q-collapsible>
    <!-- fin collapsible online -->
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

export default {
  name: "Index",
  // Definimos las variables en Vue
  data() {
    return {
      // URL para obtener datos JSON de ValenBisi
      endpoint:
        "https://admin.sigecyl.es/servicios/actividades/actividadesPresenciales?tipoActividad=curso",
      // Array con información de cada uno de las estacione
      actividadesCursos: [],
      actividadesCursosPalabras: [],

      actividadesCharlas: [],
      actividadesCharlasPalabras: [],
      actividadesTalleres: [],
      actividadesTalleresPalabras: [],
      actividadesOnline: [],
      actividadesOnlinePalabras: [],
      datosCursos: [],
      datosCharlas: [],
      datosTalleres: [],
      datosOnline: [],

      recomCursos: [],
      recomCharlas: [],
      recomTalleres: [],
      recomOnline: []
    };
  },
  // Acciones al realizar al acabar de montarse Vue en el componente
  mounted() {
    // Obtenemos la informacion de los centros marcados
    this.getEstadoActividades();
  },
  // Metodos accesibles desde Vue
  methods: {
    // Funcion que mediante axios, obtiene el estado del ValenBisi y rellena el array Estaciones
    getEstadoActividades() {
      this.datosCursos = [];
      this.datosCharlas = [];
      this.datosTalleres = [];
      this.datosOnline = [];

      if (localStorage.getItem("datos-cursos")) {
        var tmp = JSON.parse(localStorage.getItem("datos-cursos"));
        for (var x in tmp) {
          this.datosCursos.push(tmp[x]);
        }
      }

      if (localStorage.getItem("datos-charlas")) {
        var tmp = JSON.parse(localStorage.getItem("datos-charlas"));
        for (var x in tmp) {
          this.datosCharlas.push(tmp[x]);
        }
      }
      if (localStorage.getItem("datos-talleres")) {
        var tmp = JSON.parse(localStorage.getItem("datos-talleres"));
        for (var x in tmp) {
          this.datosTalleres.push(tmp[x]);
        }
      }
      if (localStorage.getItem("presenciales-online")) {
        var tmp = JSON.parse(localStorage.getItem("presenciales-online"));
        for (var x in tmp) {
          this.datosOnline.push(tmp[x]);
        }
      }

      this.actividadesCursos = [];
      this.actividadesCursosPalabras = [];
      this.actividadesCharlas = [];
      this.actividadesTalleres = [];
      this.actividadesOnline = [];

      if (localStorage.getItem("favoritos-cursos")) {
        var tmp = JSON.parse(localStorage.getItem("favoritos-cursos"));
        for (var x in tmp) {
          this.actividadesCursos.push(tmp[x]);
          for (var y in tmp[x].bolsaDePalabras)
            this.actividadesCursosPalabras.push(tmp[x].bolsaDePalabras[y]);
        }
      }

      if (localStorage.getItem("favoritos-charlas")) {
        var tmp = JSON.parse(localStorage.getItem("favoritos-charlas"));
        for (var x in tmp) {
          this.actividadesCharlas.push(tmp[x]);

          for (var y in tmp[x].bolsaDePalabras)
            this.actividadesCharlasPalabras.push(tmp[x].bolsaDePalabras[y]);
        }
      }
      if (localStorage.getItem("favoritos-talleres")) {
        var tmp = JSON.parse(localStorage.getItem("favoritos-talleres"));
        for (var x in tmp) {
          this.actividadesTalleres.push(tmp[x]);
          for (var y in tmp[x].bolsaDePalabras)
            this.actividadesTalleresPalabras.push(tmp[x].bolsaDePalabras[y]);
        }
      }
      if (localStorage.getItem("favoritos-online")) {
        var tmp = JSON.parse(localStorage.getItem("favoritos-online"));
        for (var x in tmp) {
          this.actividadesOnline.push(tmp[x]);
          for (var y in tmp[x].bolsaDePalabras)
            this.actividadesOnlinePalabras.push(tmp[x].bolsaDePalabras[y]);
        }
      }

      // Generamos recomendaciones cursos
      this.recomendacionesCursos();
      this.recomendacionesCharlas();
      this.recomendacionesTalleres();
      this.recomendacionesOnline();
    },
    //Genera recomendaciones de cursos
    recomendacionesCursos() {
      this.recomCursos = [];

      for (var i in this.datosCursos) {
        this.datosCursos[i].puntosRecomendacion = 0;
        for (var j in this.actividadesCursos) {
          if (this.datosCursos[i].nombre == this.actividadesCursos[j].nombre) {
            this.datosCursos[i].puntosRecomendacion = -1;
            break;
          }
        }
        if (this.datosCursos[i].puntosRecomendacion == 0) {
          for (var k in this.datosCursos[i].bolsaDePalabras) {
            for (var j in this.actividadesCursosPalabras) {
              if (
                this.actividadesCursosPalabras[j] ==
                this.datosCursos[i].bolsaDePalabras[k]
              ) {
                this.datosCursos[i].puntosRecomendacion++;
                break;
              }
            }
          }
        }
      }

      // Ordenamos para obtener primero los elementos con mayor puntuacion de recomendacion
      this.datosCursos.sort(function(a, b) {
        if (a.puntosRecomendacion > b.puntosRecomendacion) return -1;
        if (a.puntosRecomendacion < b.puntosRecomendacion) return 1;
        return 0;
      });

      // MEtemos las recomendaciones
      var alcanzados = 0;
      for (var i = 0; alcanzados < 3 && i < this.datosCursos.length; i++) {
        var encontrado = false;
        for (var j in this.recomCursos) {
          // Ya recomendado uno con nombre igual
          if (this.recomCursos[j].nombre == this.datosCursos[i].nombre) {
            encontrado = true;
            break;
          }
        }
        if (!encontrado) {
          this.recomCursos.push(this.datosCursos[i]);
          alcanzados++;
        }
      }
    },
    //Genera recomendaciones de charlas
    recomendacionesCharlas() {
      this.recomCharlas = [];

      for (var i in this.datosCharlas) {
        this.datosCharlas[i].puntosRecomendacion = 0;
        for (var j in this.actividadesCharlas) {
          if (
            this.datosCharlas[i].nombre == this.actividadesCharlas[j].nombre
          ) {
            this.datosCharlas[i].puntosRecomendacion = -1;
            break;
          }
        }
        if (this.datosCharlas[i].puntosRecomendacion == 0) {
          for (var k in this.datosCharlas[i].bolsaDePalabras) {
            for (var j in this.actividadesCharlasPalabras) {
              if (
                this.actividadesCharlasPalabras[j] ==
                this.datosCharlas[i].bolsaDePalabras[k]
              ) {
                this.datosCharlas[i].puntosRecomendacion++;
                break;
              }
            }
          }
        }
      }

      // Ordenamos para obtener primero los elementos con mayor puntuacion de recomendacion
      this.datosCharlas.sort(function(a, b) {
        if (a.puntosRecomendacion > b.puntosRecomendacion) return -1;
        if (a.puntosRecomendacion < b.puntosRecomendacion) return 1;
        return 0;
      });

      // MEtemos las recomendaciones
      var alcanzados = 0;
      for (var i = 0; alcanzados < 3 && i < this.datosCharlas.length; i++) {
        var encontrado = false;
        for (var j in this.recomCharlas) {
          // Ya recomendado uno con nombre igual
          if (this.recomCharlas[j].nombre == this.datosCharlas[i].nombre) {
            encontrado = true;
            break;
          }
        }
        if (!encontrado) {
          this.recomCharlas.push(this.datosCharlas[i]);
          alcanzados++;
        }
      }
    },
    //Genera recomendaciones de talleres
    recomendacionesTalleres() {
      this.recomTalleres = [];

      for (var i in this.datosTalleres) {
        this.datosTalleres[i].puntosRecomendacion = 0;
        for (var j in this.actividadesTalleres) {
          if (
            this.datosTalleres[i].nombre == this.actividadesTalleres[j].nombre
          ) {
            this.datosTalleres[i].puntosRecomendacion = -1;
            break;
          }
        }
        if (this.datosTalleres[i].puntosRecomendacion == 0) {
          for (var k in this.datosTalleres[i].bolsaDePalabras) {
            for (var j in this.actividadesTalleresPalabras) {
              if (
                this.actividadesTalleresPalabras[j] ==
                this.datosTalleres[i].bolsaDePalabras[k]
              ) {
                this.datosTalleres[i].puntosRecomendacion++;
                break;
              }
            }
          }
        }
      }

      // Ordenamos para obtener primero los elementos con mayor puntuacion de recomendacion
      this.datosTalleres.sort(function(a, b) {
        if (a.puntosRecomendacion > b.puntosRecomendacion) return -1;
        if (a.puntosRecomendacion < b.puntosRecomendacion) return 1;
        return 0;
      });

      // MEtemos las recomendaciones
      var alcanzados = 0;
      for (var i = 0; alcanzados < 3 && i < this.datosTalleres.length; i++) {
        var encontrado = false;
        for (var j in this.recomTalleres) {
          // Ya recomendado uno con nombre igual
          if (this.recomTalleres[j].nombre == this.datosTalleres[i].nombre) {
            encontrado = true;
            break;
          }
        }
        if (!encontrado) {
          this.recomTalleres.push(this.datosTalleres[i]);
          alcanzados++;
        }
      }
    },
    //Genera recomendaciones de talleres
    recomendacionesOnline() {
      this.recomOnline = [];

      for (var i in this.datosOnline) {
        this.datosOnline[i].puntosRecomendacion = 0;
        for (var j in this.actividadesOnline) {
          if (this.datosOnline[i].nombre == this.actividadesOnline[j].nombre) {
            this.datosOnline[i].puntosRecomendacion = -1;
            break;
          }
        }
        if (this.datosOnline[i].puntosRecomendacion == 0) {
          for (var k in this.datosOnline[i].bolsaDePalabras) {
            for (var j in this.actividadesOnlinePalabras) {
              if (
                this.actividadesOnlinePalabras[j] ==
                this.datosOnline[i].bolsaDePalabras[k]
              ) {
                this.datosOnline[i].puntosRecomendacion++;
                break;
              }
            }
          }
        }
      }
      // Ordenamos para obtener primero los elementos con mayor puntuacion de recomendacion
      this.datosOnline.sort(function(a, b) {
        if (a.puntosRecomendacion > b.puntosRecomendacion) return -1;
        if (a.puntosRecomendacion < b.puntosRecomendacion) return 1;
        return 0;
      });

      // MEtemos las recomendaciones
      var alcanzados = 0;
      for (var i = 0; alcanzados < 3 && i < this.datosOnline.length; i++) {
        var encontrado = false;
        for (var j in this.recomOnline) {
          // Ya recomendado uno con nombre igual
          if (this.recomOnline[j].nombre == this.datosOnline[i].nombre) {
            encontrado = true;
            break;
          }
        }
        if (!encontrado) {
          this.recomOnline.push(this.datosOnline[i]);
          alcanzados++;
        }
      }
    }
  }
};
</script>
