<template>
  <q-page class="flex-top q-ma-lg">
    <strong>Favoritos</strong>
    <!-- Collapsible Cursos -->
    <q-collapsible icon="school" label="Act. Presenciales">
      <q-item-tile label class="q-mb-md"></q-item-tile>
      <q-alert v-if="this.actividadesCursos.length==0" type="info">No hay actividades disponibles.</q-alert>

      <q-card
        class="q-mb-md"
        v-for="act in actividadesCursos"
        :key="act.nombre+act.centro+act.fechaInicio"
      >
        <q-card-title>
          {{ act.nombre }}
          <div slot="right" class="row items-center">
            <q-checkbox
              v-model="act.favorito"
              checked-icon="favorite"
              unchecked-icon="favorite_border"
              @input="$guardarFavoritos(actividadesCursos,'favoritos-presenciales');  if(act.favorito)$q.notify({message: 'Agregado a favoritos: '+act.nombre,timeout: 1000, type: 'positive', position: 'center'});"
            />
          </div>
          <div slot="subtitle">
            <q-icon name="room" size="16px"/>&nbsp;
            <small>{{act.centro}}</small>
          </div>
        </q-card-title>
        <q-card-main>
          <q-collapsible label="Ver información" style="background-color: #e4b6d5">
            <div>
              <q-icon v-bind:name="$mostrarIcono(act.tematica)" size="20px"/>&nbsp;
              <small>{{act.tematica}}</small>
            </div>
            <br>
            {{ act.descripcion }}
            <br>
            <br>
            <p v-if="act.aviso">
              <q-icon name="warning" style="font-size: 20px"/>&nbsp;&nbsp;
              <strong>{{ act.aviso }}</strong>
            </p>
            <p>
              <q-icon name="event_note"/>&nbsp;&nbsp;
              <small>
                <strong>Matrícula: {{ $parsearFecha(act.fechaInicioMatriculacion) }} - {{ $parsearFecha(act.fechaFinMatriculacion) }}</strong>
              </small>
            </p>
            <p>
              <q-icon name="event"/>&nbsp;&nbsp;
              <small>
                <strong>Fechas: {{ $parsearFecha(act.fechaInicio) }} - {{ $parsearFecha(act.fechaFin) }}</strong>
              </small>
            </p>
            <q-btn
              push
              rounded
              size="sm"
              color="secondary"
              icon-right="directions"
              label="Matricularse"
              @click="abrirURL('https://www.cyldigital.es/user/login')"
            />
          </q-collapsible>
          <q-item-main/>
        </q-card-main>
        <q-card-separator/>
        <!-- q-card-actions align="between">
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
        </div>
        <div>
          <q-icon name="person"/>&nbsp;&nbsp;
          <small>
            <strong>{{ act.numeroSolicitudes }} solicitudes /  {{ act.numeroPlazas }} plazas</strong>
          </small>
        </div>
        </q-card-actions-->
        <q-card-actions align="between">
          <div>
            <q-icon name="trending_up"/>&nbsp;&nbsp;
            <small>
              <strong>{{ act.nivel }}</strong>
            </small>
          </div>
          <div>
            <q-icon name="watch_later"/>&nbsp;&nbsp;
            <small>
              <strong>{{ act.numeroHoras }} h</strong>
            </small>
          </div>
          <div>
            <q-icon name="person"/>&nbsp;&nbsp;
            <small>
              <strong>{{ act.numeroSolicitudes }} solicitudes / {{ act.numeroPlazas }} plazas</strong>
            </small>
          </div>
        </q-card-actions>
        <q-card-separator/>
        <!-- q-card-actions align="between">
        <div>
          <q-chip v-for="miTag in act.tagsGenerados" :key="miTag" color="tertiary" small>{{ miTag }}</q-chip>
        </div>
        </q-card-actions-->
      </q-card>
    </q-collapsible>
    <!-- fin collapsible cursos -->
    <!-- Collapsible online -->
    <q-collapsible icon="cloud" label="Online">
      <q-item-tile label class="q-mb-md"></q-item-tile>
      <q-alert v-if="this.actividadesOnline.length==0" type="info">No hay actividades disponibles.</q-alert>

      <q-card class="q-mb-md" v-for="act in actividadesOnline" :key="act.nombre+act.fechaInicio">
        <q-card-title>
          {{ act.nombre }}
          <div slot="right" class="row items-center">
            <q-checkbox
              v-model="act.favorito"
              checked-icon="favorite"
              unchecked-icon="favorite_border"
              @input="$guardarFavoritos(actividadesOnline,'favoritos-online');  if(act.favorito)$q.notify({message: 'Agregado a favoritos: '+act.nombre,timeout: 1000, type: 'positive', position: 'center'});"
            />
          </div>
          <div slot="subtitle">
            <q-icon name="cloud" size="16px"/>&nbsp;
            <small>Online</small>
          </div>
        </q-card-title>
        <q-card-main>
          <q-collapsible label="Ver información" style="background-color: #e4b6d5">
            <div>
              <q-icon v-bind:name="$mostrarIcono(act.tematica)" size="20px"/>&nbsp;
              <small>{{act.tematica}}</small>
            </div>
            <br>
            {{ act.descripcion }}
            <br>
            <br>
            <!-- He incluido aviso y requisitos aunque no hay ninguna actividad online que los tenga de momento-->
            <p v-if="act.aviso">
              <q-icon name="warning" style="font-size: 20px"/>&nbsp;&nbsp;
              <strong>{{ act.aviso }}</strong>
            </p>
            <p v-if="act.requisitos">
              <q-icon name="warning" style="font-size: 20px"/>&nbsp;&nbsp;
              <strong>{{ act.requisitos }}</strong>
            </p>
            <p>
              <q-icon name="event"/>&nbsp;&nbsp;
              <small>
                <strong>Fechas: {{ $parsearFecha(act.fechaInicio) }} - {{ $parsearFecha(act.fechaFin) }}</strong>
              </small>
            </p>
            <p v-if="act.horaInicioWebinar">
              <q-icon name="video_call"/>&nbsp;&nbsp;
              <small>
                <strong>Horario webinar: {{ act.horaInicioWebinar }}h. - {{ act.horaFinWebinar }}h.</strong>
              </small>
            </p>
            <q-btn
              push
              rounded
              size="sm"
              color="secondary"
              icon-right="directions"
              label="Matricularse"
              @click="abrirURL('https://www.cyldigital.es/user/login')"
            />
          </q-collapsible>
          <q-item-main/>
        </q-card-main>
        <q-card-separator/>
        <q-card-actions align="between">
          <div>
            <q-icon name="watch_later"/>&nbsp;&nbsp;
            <small>
              <strong>{{ act.numeroHoras }} h</strong>
            </small>
          </div>
          <div>
            <q-icon name="person"/>&nbsp;&nbsp;
            <small>
              <strong>{{ act.numeroSolicitudes }} solicitudes / {{ act.numeroPlazas }} plazas</strong>
            </small>
          </div>
        </q-card-actions>
        <q-card-separator/>
        <!-- q-card-actions align="between">
        <div>
          <q-chip v-for="miTag in act.tagsGenerados" :key="miTag" color="tertiary" small>{{ miTag }}</q-chip>
        </div>
        </q-card-actions-->
      </q-card>
    </q-collapsible>
    <!-- fin collapsible online -->
  </q-page>
</template>

<style>
</style>


<!-- Aqui script, donde irá el Javascript (métodos, funciones, etc) -->
<script>
export default {
  name: "Index",
  // Definimos las variables en Vue
  data() {
    return {
      // Array con información de cada uno de las estacione
      actividadesCursos: [],
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
      this.actividadesOnline = [];

      if (localStorage.getItem("favoritos-presenciales")) {
        var tmp = JSON.parse(localStorage.getItem("favoritos-presenciales"));
        for (var x in tmp) {
          this.actividadesCursos.push(tmp[x]);
        }
      }

      // Ordeno array actividades presenciales
      this.actividadesCursos.sort(function(a, b) {
        return a.fechaInicio.localeCompare(b.fechaInicio);
      });

      if (localStorage.getItem("favoritos-online")) {
        var tmp = JSON.parse(localStorage.getItem("favoritos-online"));
        for (var x in tmp) {
          this.actividadesOnline.push(tmp[x]);
        }
      }
      // Ordeno array actividades online
      this.actividadesOnline.sort(function(a, b) {
        return a.fechaInicio.localeCompare(b.fechaInicio);
      });
    }
  }
};
</script>
