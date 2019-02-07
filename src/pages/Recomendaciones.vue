<template>
  <q-page class="flex-top q-ma-lg">
    <strong>Recomendaciones</strong>
    <br>
    <br>
    <!-- Collapsible Cursos -->
    <q-collapsible icon="school" label="Act. Presenciales">
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
          <div slot="right" class="row items-center">
            <q-checkbox
              v-model="act.favorito"
              checked-icon="favorite"
              unchecked-icon="favorite_border"
              @input="$guardarFavoritos(datosCursos,'favoritos-presenciales');  if(act.favorito)$q.notify({message: 'Agregado a favoritos: '+act.nombre,timeout: 1000, type: 'positive', position: 'center'});"
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
      </q-card>
    </q-collapsible>
    <!-- fin collapsible cursos -->
    <!-- Collapsible online -->
    <q-collapsible icon="cloud" label="Online">
      <q-item-tile label class="q-mb-md">
        <strong>Recomendaciones</strong>
      </q-item-tile>
      <q-alert v-if="this.recomOnline.length==0" type="info">No hay actividades disponibles.</q-alert>

      <q-card class="q-mb-md" v-for="act in recomOnline" :key="act.nombre+act.fechaInicio">
        <q-card-title>
          {{ act.nombre }}
          <div slot="right" class="row items-center">
            <q-checkbox
              v-model="act.favorito"
              checked-icon="favorite"
              unchecked-icon="favorite_border"
              @input="$guardarFavoritos(datosOnline,'favoritos-online');  if(act.favorito)$q.notify({message: 'Agregado a favoritos: '+act.nombre,timeout: 1000, type: 'positive', position: 'center'});"
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
// Para poder usar openURL
import { openURL } from "quasar";
export default {
  name: "Index",
  // Definimos las variables en Vue
  data() {
    return {
      // Arrays con información de actividades, favoritos y finalmente recomendaciones
      actividadesCursos: [],
      actividadesCursosPalabras: [],
      actividadesOnlinePalabras: [],
      datosCursos: [],
      datosOnline: [],
      // Usados para recomendar
      recomCursos: [],
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
    // Funcion que recibe un URL y la abre
    abrirURL(url) {
      openURL(url);
    },
    // Funcion que mediante axios, obtiene el estado del ValenBisi y rellena el array Estaciones
    getEstadoActividades() {
      // Vaciamos datos de las actividades disponibles
      this.datosCursos = [];

      // Obtenemos las provincias si no las tenemos
      var provTmp;
      if (localStorage.getItem("provincias")) {
        provTmp = JSON.parse(localStorage.getItem("provincias"));
      } else {
        provTmp = this.$provincias;
      }

      // Recorremos las provincias
      for (var x in provTmp) {
        // Si la provincia esta marcada, la unimos en un array de datos presenciales
        if (provTmp[x].marcado) {
          var centroTMP = this.$eliminarAcentos(
            provTmp[x].nombre
          ).toLowerCase();
          this.datosCursos = this.$unirArrays(
            this.datosCursos,
            JSON.parse(localStorage.getItem("presenciales-" + centroTMP))
          );
        }
      }

      //Obtenemos datos online
      this.datosOnline = JSON.parse(
        localStorage.getItem("presenciales-online")
      );
      // Vaciamos favoritos y bolsa de palabras generada en base a mis favoritos
      this.actividadesCursos = [];
      this.actividadesCursosPalabras = [];
      this.actividadesOnline = [];
      this.actividadesOnlinePalabras = [];

      // Si estan disponibles los favoritos presenciales
      if (localStorage.getItem("favoritos-presenciales")) {
        var tmp = JSON.parse(localStorage.getItem("favoritos-presenciales"));
        for (var x in tmp) {
          this.actividadesCursos.push(tmp[x]);
          // Cada favorito influye en la creacion de la Bolsa de palabras
          for (var y in tmp[x].bolsaDePalabras)
            this.actividadesCursosPalabras.push(tmp[x].bolsaDePalabras[y]);
        }
      }

      // Si estan disponibles los favoritos online
      if (localStorage.getItem("favoritos-online")) {
        var tmp = JSON.parse(localStorage.getItem("favoritos-online"));
        for (var x in tmp) {
          this.actividadesOnline.push(tmp[x]);
          // Cada favorito influye en la creacion de la Bolsa de palabras
          for (var y in tmp[x].bolsaDePalabras)
            this.actividadesOnlinePalabras.push(tmp[x].bolsaDePalabras[y]);
        }
      }

      // Generamos recomendaciones cursos presenciales
      this.recomendacionesCursos();
      this.cargarFavoritosPresenciales("favoritos-presenciales");

      // Generamos recomendaciones cursos online
      this.recomendacionesOnline();
      this.cargarFavoritosOnline("favoritos-online");
    },
    //Genera recomendaciones de cursos
    recomendacionesCursos() {
      this.recomCursos = [];
      // Recorremos los cursos y le damos una puntuacion basada en
      // coincidencias de palabras con la bolsa de palabras construida
      for (var i in this.datosCursos) {
        this.datosCursos[i].puntosRecomendacion = 0;
        for (var j in this.actividadesCursos) {
          // Si el curso ya esta en favoritos, no se recomienda (se le da puntuacion -1)
          if (this.datosCursos[i].nombre == this.actividadesCursos[j].nombre) {
            this.datosCursos[i].puntosRecomendacion = -1;
            break;
          }
        }
        // Si tiene puntuacion 0 (es decir, no esta en favoritos)
        if (this.datosCursos[i].puntosRecomendacion == 0) {
          // Se compara con la bolsa de palabras y se le da una puntacion
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

      // Metemos las recomendaciones (Maximo 3)
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
      // Nos quedamos con las 3 primeras recomendaciones
      this.recomCursos = this.recomCursos.slice(0, 3);
    },
    //Genera recomendaciones de talleres
    recomendacionesOnline() {
      this.recomOnline = [];

      // Recorremos los cursos y le damos una puntuacion basada en
      // coincidencias de palabras con la bolsa de palabras construida
      for (var i in this.datosOnline) {
        this.datosOnline[i].puntosRecomendacion = 0;
        // Si el curso ya esta en favoritos, no se recomienda (se le da puntuacion -1)
        for (var j in this.actividadesOnline) {
          if (this.datosOnline[i].nombre == this.actividadesOnline[j].nombre) {
            this.datosOnline[i].puntosRecomendacion = -1;
            break;
          }
        }
        // Si tiene puntuacion 0 (es decir, no esta en favoritos)
        if (this.datosOnline[i].puntosRecomendacion == 0) {
          // Se le da una puntuacion comparandol con la bolsa de palabras
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

      // Metemos las recomendaciones
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

      // Nos quedamos con las 3 primeras recomendaciones
      this.recomOnline = this.recomOnline.slice(0, 3);
    },
    // Función que carga del localStorage un texto en formato JSON
    // con los favoritos de cursos
    cargarFavoritosPresenciales(idLocalStorage) {
      if (localStorage.getItem(idLocalStorage)) {
        var fav = JSON.parse(localStorage.getItem(idLocalStorage));
        // Rellenamos los favoritos
        for (var x in fav) {
          for (var y in this.datosCursos) {
            if (
              fav[x].nombre == this.datosCursos[y].nombre &&
              fav[x].centro == this.datosCursos[y].centro &&
              fav[x].fechaInicio == this.datosCursos[y].fechaInicio
            ) {
              this.datosCursos[y].favorito = true;
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
          for (var y in this.datosOnline) {
            if (
              fav[x].nombre == this.datosOnline[y].nombre &&
              fav[x].centro == this.datosOnline[y].centro &&
              fav[x].fechaInicio == this.datosOnline[y].fechaInicio
            ) {
              this.datosOnline[y].favorito = true;
            }
          }
        }
      }
    }
  }
};
</script>
