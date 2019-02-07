<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar color="primary" :glossy="$q.theme === 'mat'" :inverted="$q.theme === 'ios'">
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu">
          <q-icon name="menu"/>
        </q-btn>

        <q-toolbar-title>
          <img src="../assets/sigecyl.png" style="height:30px">
          CyL Digital
          <!--div slot="subtitle">Para todos los públicos</div-->
          <q-btn
            dense
            flat
            size="md"
            icon="search"
            label="Buscar"
            to="/buscador"
            class="float-right"
          />
        </q-toolbar-title>
      </q-toolbar>
      <q-tabs color="primary">
        <q-route-tab
          icon="school"
          to="/actpresenciales"
          exact
          slot="title"
          name="actpresenciales"
          label="Presenciales"
        />

        <q-route-tab
          icon="cloud"
          to="/actonline"
          exact
          slot="title"
          name="actonline"
          label="Online"
        />
        <q-route-tab
          icon="favorite"
          to="/favoritos"
          exact
          slot="title"
          name="favoritos"
          label="Favoritas"
        />
        <q-route-tab
          icon="thumb_up"
          to="/recomendaciones"
          exact
          slot="title"
          name="recomendaciones"
          label="Recomendaciones"
        />
      </q-tabs>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list no-border link inset-delimiter>
        <q-list-header>Enlaces</q-list-header>

        <q-item to="/suscripciones">
          <q-item-side icon="edit"/>
          <q-item-main
            label="Suscripciones"
            sublabel="Selección de cursos por provincia"
          />
        </q-item>
        
        <q-item to="/descargas">
          <q-item-side icon="cloud_download"/>
          <q-item-main label="Descargas" sublabel="Descarga esta aplicación para Android y PC"/>
        </q-item>
        <q-item to="/ayuda">
          <q-item-side icon="help_outline"/>
          <q-item-main label="Ayuda" sublabel="Ayuda sobre la aplicación"/>
        </q-item>
        <q-item to="/acercade">
          <q-item-side icon="info"/>
          <q-item-main label="Acerca de" sublabel="Sobre nosotros"/>
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
// Para poder usar openURL
import { openURL } from "quasar";

export default {
  name: "MyLayout",
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    };
  },
  methods: {  
    // Funcion que recibe un URL y la abre
    abrirURL(url) {
      openURL(url);
    },
  }
};
</script>

<style>
</style>
