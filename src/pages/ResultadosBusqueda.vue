<template>
  <q-page class="flex-top q-ma-lg">
    <!-- Collapsible Cursos -->
    <q-item-tile label class="q-mb-md">
      <q-btn color="primary" label="Cambiar filtros" to="/buscador"/>
    </q-item-tile>
    <q-item-tile label class="q-mb-md">
      <strong>Resultados busqueda</strong>
    </q-item-tile>
    <q-collapsible icon="school" label="Act. Presenciales" opened>
      <q-alert
        v-if="this.actividadesPresenciales.length==0"
        type="info"
      >No hay actividades disponibles.</q-alert>

      <q-card
        class="q-mb-md"
        v-for="act in actividadesPresenciales"
        :key="act.nombre+act.centro+act.fechaInicio"
      >
        <q-card-title>
          {{ act.nombre }}
          <div slot="right" class="row items-center">
            <q-checkbox
              v-model="act.favorito"
              checked-icon="favorite"
              unchecked-icon="favorite_border"
              @input="$guardarFavoritos(actividadesPresenciales,'favoritos-presenciales');  if(act.favorito)$q.notify({message: 'Agregado a favoritos: '+act.nombre,timeout: 1000, type: 'positive', position: 'center'});"
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
    <q-collapsible icon="cloud" label="Online" opened>
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
// Importamos para eliminar StopWords
import sw from "stopword";
// Importamos para procesamiento del lenguaje natural
import natural from "natural";

export default {
  name: "Index",
  // Definimos las variables en Vue
  data() {
    return {
      // Array con información de cada uno de las estacione
      actividadesPresenciales: [],
      actividadesOnline: [],
      filtro: []
    };
  },
  // Acciones al realizar al acabar de montarse Vue en el componente
  mounted() {
    // Comprobar si hay que actualizar y si se debe hacer, se hace
    if (this.$hayQueActualizar()) {
      this.$actualizarDatos();
      //Esperar 8s a que se actualice
      var start = new Date().getTime();
      var end = start;
      while (end < start + 8000) {
        end = new Date().getTime();
      }
      // Fin del esperar

      // Ponemos fecha de actualizacion y la guardamos localStorage
      this.$ultimaActualizacion = new Date();
      localStorage.setItem(
        "ultimaActualizacion",
        JSON.stringify(this.$ultimaActualizacion.toISOString())
      );
    }

    // Obtenemos la informacion de los centros marcados
    this.getEstadoActividades();

    // Obtenemos los filtros de busqueda y los aplicamos
    this.aplicaFiltro();

    // Recargamos favoritos
    this.cargarFavoritos("favoritos-presenciales");
    this.cargarFavoritosOnline("favoritos-online");
  },
  // Metodos accesibles desde Vue
  methods: {
    // Funcion que mediante axios, obtiene el estado del ValenBisi y rellena el array Estaciones
    getEstadoActividades() {
      this.actividadesPresenciales = [];
      this.actividadesOnline = [];

      this.actividades = [];
      var provTmp;

      if (localStorage.getItem("provincias")) {
        provTmp = JSON.parse(localStorage.getItem("provincias"));
      } else {
        provTmp = this.$provincias;
      }

      // Recorremos las provincias
      for (var x in provTmp) {
        // Si la provincia esta marcada
        if (provTmp[x].marcado) {
          var centroTMP = this.$eliminarAcentos(
            provTmp[x].nombre
          ).toLowerCase();
          this.actividadesPresenciales = this.$unirArrays(
            this.actividadesPresenciales,
            JSON.parse(localStorage.getItem("presenciales-" + centroTMP))
          );
        }
      }
      // Ordeno array actividades presenciales
      this.actividadesPresenciales.sort(function(a, b) {
        return a.fechaInicio.localeCompare(b.fechaInicio);
      });

      if (localStorage.getItem("presenciales-online")) {
        var tmp = JSON.parse(localStorage.getItem("presenciales-online"));
        for (var x in tmp) {
          this.actividadesOnline.push(tmp[x]);
        }
      }

      // Ordeno array actividades online
      this.actividadesOnline.sort(function(a, b) {
        return a.fechaInicio.localeCompare(b.fechaInicio);
      });
    },

    // Funcion que recupera los filtros y los aplica
    aplicaFiltro() {
      if (localStorage.getItem("filtro")) {
        this.filtro = JSON.parse(localStorage.getItem("filtro"));
        // Aplicamos los filtros
        this.aplicarFiltroProvincias();
        this.aplicarFiltroTematicas();
        this.aplicarFiltroNiveles();
        this.aplicarFiltroHoras();
        this.aplicarFiltroFechas();
        this.aplicarFiltroBusqueda();
      }
    },
    // Aplicamos el filtro de las provincias
    aplicarFiltroProvincias() {
      var arrayTmp = [];

      for (var i in this.filtro.provincias) {
        for (var j in this.actividadesPresenciales) {
          if (
            this.actividadesPresenciales[j].centro == this.filtro.provincias[i]
          ) {
            arrayTmp.push(this.actividadesPresenciales[j]);
          }
        }
      }
      // Asignamos el array temporal construido a actividades cursos
      this.actividadesPresenciales = arrayTmp.slice();
    },
    // Aplicamos el filtro de las tematicas
    aplicarFiltroTematicas() {
      var arrayTmp = [];
      // Filtra presencial
      for (var i in this.filtro.tematicas) {
        for (var j in this.actividadesPresenciales) {
          if (
            this.actividadesPresenciales[j].tematica == this.filtro.tematicas[i]
          ) {
            arrayTmp.push(this.actividadesPresenciales[j]);
          }
        }
      }
      // Asignamos el array temporal construido a actividades cursos
      this.actividadesPresenciales = arrayTmp.slice();
      // Filtra online
      arrayTmp = [];
      for (var i in this.filtro.tematicas) {
        for (var j in this.actividadesOnline) {
          if (this.actividadesOnline[j].tematica == this.filtro.tematicas[i]) {
            arrayTmp.push(this.actividadesOnline[j]);
          }
        }
      }
      // Asignamos el array temporal construido a actividades cursos
      this.actividadesOnline = arrayTmp.slice();
    },
    // Aplicamos el filtro de las tematicas
    aplicarFiltroNiveles() {
      var arrayTmp = [];
      // Filtra presencial
      for (var i in this.filtro.niveles) {
        for (var j in this.actividadesPresenciales) {
          if (this.actividadesPresenciales[j].nivel == this.filtro.niveles[i]) {
            arrayTmp.push(this.actividadesPresenciales[j]);
          }
        }
      }
      // Asignamos el array temporal construido a actividades cursos
      this.actividadesPresenciales = arrayTmp.slice();

      //Filtra online
      arrayTmp = [];

      for (var i in this.filtro.niveles) {
        for (var j in this.actividadesOnline) {
          if (this.actividadesOnline[j].nivel == this.filtro.niveles[i]) {
            arrayTmp.push(this.actividadesOnline[j]);
          }
        }
      }
      // Asignamos el array temporal construido a actividades cursos
      this.actividadesOnline = arrayTmp.slice();
    },
    // Aplicamos el filtro de las horas
    aplicarFiltroHoras() {
      var arrayTmp = [];
      var horasMin, horasMax, horas;
      // Establecemos horasMin
      if (this.filtro.horasMin === undefined) {
        horasMin = -1.0;
      } else {
        horasMin = parseFloat(this.filtro.horasMin);
      }
      // Establecemos horasMax
      if (this.filtro.horasMax === undefined) {
        horasMax = 10000.0;
      } else {
        horasMax = parseFloat(this.filtro.horasMax);
      }

      // Filtramos presencial
      for (var j in this.actividadesPresenciales) {
        // establecemos las horas
        horas = parseFloat(this.actividadesPresenciales[j].numeroHoras);
        if (horas > horasMin && horas < horasMax) {
          arrayTmp.push(this.actividadesPresenciales[j]);
        }
      }
      // Asignamos el array temporal construido a actividades cursos
      this.actividadesPresenciales = arrayTmp.slice();
      // Filtramos online
      arrayTmp = [];
      for (var j in this.actividadesOnline) {
        // establecemos las horas
        horas = parseFloat(this.actividadesPresenciales[j].numeroHoras);
        if (horas > horasMin && horas < horasMax) {
          arrayTmp.push(this.actividadesOnline[j]);
        }
      }
      // Asignamos el array temporal construido a actividades cursos
      this.actividadesOnline = arrayTmp.slice();
    },
    // Aplicamos el filtro de las fechas
    aplicarFiltroFechas() {
      var arrayTmp = [];
      var fechaMin, fecha;
      // Establecemos fechaMin
      if (this.filtro.fechaIni === undefined) {
        fechaMin = "1900/01/01";
      } else {
        fechaMin = this.filtro.fechaIni;
      }

      // Filtramos presencial
      for (var j in this.actividadesPresenciales) {
        // establecemos las horas
        fecha = this.actividadesPresenciales[j].fechaInicio;
        if (fecha.localeCompare(fechaMin) >= 1) {
          arrayTmp.push(this.actividadesPresenciales[j]);
        }
      }
      // Asignamos el array temporal construido a actividades cursos
      this.actividadesPresenciales = arrayTmp.slice();
      // Filtramos online
      arrayTmp = [];
      for (var j in this.actividadesOnline) {
        // establecemos las horas
        fecha = this.actividadesOnline[j].fechaInicio;
        if (fecha.localeCompare(fechaMin) >= 1) {
          arrayTmp.push(this.actividadesOnline[j]);
        }
      }
      // Asignamos el array temporal construido a actividades cursos
      this.actividadesOnline = arrayTmp.slice();
    },
    // Aplicamos el filtro de las busquedas
    aplicarFiltroBusqueda() {
      var arrayTmp = [];

      // Si el texto esta vacio, no filtrasmo
      if (this.filtro.busqueda.trim() === "") {
        return;
      }
      // Proceso la busqueda
      var textoMineria = this.$soloMinusculasYEspacios(
        this.filtro.busqueda.trim()
      );
      var arrayMineria = [];
      // Eliminamos stop word generales mas algunas que ponemos custom
      var arrayTags = sw.removeStopwords(textoMineria.split(" "), sw.es);
      arrayTags = sw.removeStopwords(arrayTags, this.$misStopWords);

      // Eliminamos duplicados
      arrayTags = this.$eliminarDuplicados(arrayTags);
      arrayTags.sort();
      // Aplicamos Stemming a cada palabra
      for (var i in arrayTags) {
        arrayMineria[i] = natural.PorterStemmerEs.stem(arrayTags[i]);
      }

      // Filtramos presencial
      var encontrado = false;

      for (var i in this.actividadesPresenciales) {
        encontrado = false;
        console.log(i);
        for (var j in this.actividadesPresenciales[i].bolsaDePalabras) {
          for (var k in arrayMineria) {
            console.log(
              "comparo " +
                arrayMineria[k] +
                " con " +
                this.actividadesPresenciales[i].bolsaDePalabras[j]
            );
            if (
              arrayMineria[k] ==
              this.actividadesPresenciales[i].bolsaDePalabras[j]
            ) {
              encontrado = true;
              break;
            }
          }
          if (encontrado == true) {
            break;
          }
        }
        if (encontrado == true) {
          arrayTmp.push(this.actividadesPresenciales[i]);
        }
      }
      // Asignamos el array temporal construido a actividades cursos
      this.actividadesPresenciales = arrayTmp.slice();

      // Filtramos online
      arrayTmp = [];

      for (var i in this.actividadesOnline) {
        var encontrado = false;
        for (var j in this.actividadesOnline[i].tagsGenerados) {
          for (var k in arrayTags) {
            if (arrayTags[k] == this.actividadesOnline[i].tagsGenerados[j]) {
              encontrado = true;
              break;
            }
          }
          if (encontrado == true) {
            break;
          }
        }
        if (encontrado == true) {
          arrayTmp.push(this.actividadesOnline[i]);
        }
      }
      // Asignamos el array temporal construido a actividades cursos
      this.actividadesOnline = arrayTmp.slice();
    },

    // Función que carga del localStorage un texto en formato JSON
    // con los favoritos de cursos
    cargarFavoritos(idLocalStorage) {
      if (localStorage.getItem(idLocalStorage)) {
        var fav = JSON.parse(localStorage.getItem(idLocalStorage));
        // Rellenamos los favoritos
        for (var x in fav) {
          for (var y in this.actividadesPresenciales) {
            if (
              fav[x].nombre == this.actividadesPresenciales[y].nombre &&
              fav[x].centro == this.actividadesPresenciales[y].centro &&
              fav[x].fechaInicio == this.actividadesPresenciales[y].fechaInicio
            ) {
              this.actividadesPresenciales[y].favorito = true;
            }
          }
        }
      }
    },
    // Función que carga del localStorage un texto en formato JSON
    // con los favoritos de cursos
    cargarFavoritosOnline(idLocalStorage) {
      if (localStorage.getItem(idLocalStorage)) {
        var fav = JSON.parse(localStorage.getItem(idLocalStorage));
        // Rellenamos los favoritos
        for (var x in fav) {
          for (var y in this.actividadesOnline) {
            if (
              fav[x].nombre == this.actividadesOnline[y].nombre &&
              fav[x].centro == this.actividadesOnline[y].centro &&
              fav[x].fechaInicio == this.actividadesOnline[y].fechaInicio
            ) {
              this.actividadesOnline[y].favorito = true;
            }
          }
        }
      }
    }
  }
};
</script>
