<template>
  <q-page class="flex-top q-ma-lg">

    <!-- Collapsible Cursos -->
    <q-collapsible icon="school" label="Cursos">
      <q-item-tile label class="q-mb-md">
        <strong>Favoritos</strong>
      </q-item-tile>
      <q-alert v-if="this.actividadesCursos.length==0" type="info">No hay actividades disponibles.</q-alert>

      <q-card
        class="q-mb-md"
        v-for="act in actividadesCursos"
        :key="act.nombre+act.centro+act.fechaInicio"
      >
        <q-card-title>
          <q-checkbox
            v-model="act.favorito"
            checked-icon="star"
            unchecked-icon="star_border"
            @input="guardarFavoritosCursos();   if(act.favorito)$q.notify({message: 'Agregado a favoritos: '+act.nombre,timeout: 3000, type: 'positive'});"
          />
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
        <strong>Favoritos</strong>
      </q-item-tile>
      <q-alert v-if="this.actividadesCharlas.length==0" type="info">No hay actividades disponibles.</q-alert>

      <q-card
        class="q-mb-md"
        v-for="act in actividadesCharlas"
        :key="act.nombre+act.centro+act.fechaInicio"
      >
        <q-card-title>
          <q-checkbox
            v-model="act.favorito"
            checked-icon="star"
            unchecked-icon="star_border"
            @input="guardarFavoritosCharlas();   if(act.favorito)$q.notify({message: 'Agregado a favoritos: '+act.nombre,timeout: 3000, type: 'positive'});"
          />
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
        <strong>Favoritos</strong>
      </q-item-tile>
      <q-alert v-if="this.actividadesTalleres.length==0" type="info">No hay actividades disponibles.</q-alert>

      <q-card
        class="q-mb-md"
        v-for="act in actividadesTalleres"
        :key="act.nombre+act.centro+act.fechaInicio"
      >
        <q-card-title>
          <q-checkbox
            v-model="act.favorito"
            checked-icon="star"
            unchecked-icon="star_border"
            @input="guardarFavoritosTalleres();   if(act.favorito)$q.notify({message: 'Agregado a favoritos: '+act.nombre,timeout: 3000, type: 'positive'});"
          />
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
    <q-collapsible  icon="cloud" label="Online">
      <q-item-tile label class="q-mb-md">
        <strong>Favoritos</strong>
      </q-item-tile>
      <q-alert v-if="this.actividadesOnline.length==0" type="info">No hay actividades disponibles.</q-alert>

      <q-card
        class="q-mb-md"
        v-for="act in actividadesOnline"
        :key="act.nombre+act.centro+act.fechaInicio"
      >
        <q-card-title>
          <q-checkbox
            v-model="act.favorito"
            checked-icon="star"
            unchecked-icon="star_border"
            @input="guardarFavoritosOnline();   if(act.favorito)$q.notify({message: 'Agregado a favoritos: '+act.nombre,timeout: 3000, type: 'positive'});"
          />
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
      actividadesCharlas: [],
      actividadesTalleres: [],
      actividadesOnline: []
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
      this.actividadesCursos = [];
      this.actividadesCharlas = [];
      this.actividadesTalleres = [];
      this.actividadesOnline = [];

      if (localStorage.getItem("favoritos-cursos")) {
        var tmp = JSON.parse(localStorage.getItem("favoritos-cursos"));
        for (var x in tmp) {
          this.actividadesCursos.push(tmp[x]);
        }
      }
      if (localStorage.getItem("favoritos-charlas")) {
        var tmp = JSON.parse(localStorage.getItem("favoritos-charlas"));
        for (var x in tmp) {
          this.actividadesCharlas.push(tmp[x]);
        }
      }
      if (localStorage.getItem("favoritos-talleres")) {
        var tmp = JSON.parse(localStorage.getItem("favoritos-talleres"));
        for (var x in tmp) {
          this.actividadesTalleres.push(tmp[x]);
        }
      }
      if (localStorage.getItem("favoritos-online")) {
        var tmp = JSON.parse(localStorage.getItem("favoritos-online"));
        for (var x in tmp) {
          this.actividadesOnline.push(tmp[x]);
        }
      }
    },
    // Funcion que recibe un array y elimina duplicados
    eliminarDuplicados(names) {
      return names
        .slice()
        .sort(function(a, b) {
          return a > b;
        })
        .reduce(function(a, b) {
          if (a.slice(-1)[0] !== b) a.push(b);
          return a;
        }, []);
    },
    // Función que guarda en localStorage un texto en formato JSON
    // con los favoritos de cursos
    guardarFavoritosCursos() {
      var actividadesFavoritas = [];

      for (var x in this.actividadesCursos) {
        if (this.actividadesCursos[x].favorito == true) {
          actividadesFavoritas.push(this.actividadesCursos[x]);
        }
      }
      localStorage.setItem(
        "favoritos-cursos",
        JSON.stringify(actividadesFavoritas)
      );
      this.getEstadoActividades();
    },
    // Función que guarda en localStorage un texto en formato JSON
    // con los favoritos de cursos
    guardarFavoritosCharlas() {
      var actividadesFavoritas = [];

      for (var x in this.actividadesCharlas) {
        if (this.actividadesCharlas[x].favorito == true) {
          actividadesFavoritas.push(this.actividadesCharlas[x]);
        }
      }
      localStorage.setItem(
        "favoritos-charlas",
        JSON.stringify(actividadesFavoritas)
      );
      this.getEstadoActividades();
    },
    // Función que guarda en localStorage un texto en formato JSON
    // con los favoritos de cursos
    guardarFavoritosTalleres() {
      var actividadesFavoritas = [];

      for (var x in this.actividadesTalleres) {
        if (this.actividadesTalleres[x].favorito == true) {
          actividadesFavoritas.push(this.actividadesTalleres[x]);
        }
      }
      localStorage.setItem(
        "favoritos-talleres",
        JSON.stringify(actividadesFavoritas)
      );
      this.getEstadoActividades();
    },
    // Función que guarda en localStorage un texto en formato JSON
    // con los favoritos de cursos
    guardarFavoritosOnline() {
      var actividadesFavoritas = [];

      for (var x in this.actividadesOnline) {
        if (this.actividadesOnline[x].favorito == true) {
          actividadesFavoritas.push(this.actividadesOnline[x]);
        }
      }
      localStorage.setItem(
        "favoritos-online",
        JSON.stringify(actividadesFavoritas)
      );
      this.getEstadoActividades();
    }
  }
};
</script>
