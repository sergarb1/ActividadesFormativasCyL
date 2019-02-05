<template>
  <q-page class="flex-top q-ma-lg">
    <!-- Collapsible Cursos -->
    <q-collapsible icon="school" label="Act. Presenciales">
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
            checked-icon="favorite"
            unchecked-icon="favorite_border"
            @input="$guardarFavoritos(actividadesCursos,'favoritos-presenciales'); this.getEstadoActividades();  if(act.favorito)$q.notify({message: 'Agregado a favoritos: '+act.nombre,timeout: 3000, type: 'positive'});"
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
    <!-- Collapsible online -->
    <q-collapsible icon="cloud" label="Online">
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
            @input="$guardarFavoritos(actividadesOnline,'favoritos-online'); this.getEstadoActividades();  if(act.favorito)$q.notify({message: 'Agregado a favoritos: '+act.nombre,timeout: 3000, type: 'positive'});"
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

      if (localStorage.getItem("favoritos-presenciales")) {
        var tmp = JSON.parse(localStorage.getItem("favoritos-presenciales"));
        for (var x in tmp) {
          this.actividadesCursos.push(tmp[x]);
        }
      }

      if (localStorage.getItem("favoritos-online")) {
        var tmp = JSON.parse(localStorage.getItem("favoritos-online"));
        for (var x in tmp) {
          this.actividadesOnline.push(tmp[x]);
        }
      }
    }
  }
};
</script>
