<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar color="primary" :glossy="$q.theme === 'mat'" :inverted="$q.theme === 'ios'">
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu">
          <q-icon name="menu"/>
        </q-btn>

        <q-toolbar-title>
            <img src="../assets/sigecyl.png" style="height:30px"/>
          Castilla y León Digital
          <!--div slot="subtitle">Para todos los públicos</div-->
          <q-btn dense flat size="md" icon="search" label="Buscar" to="/buscador"  class="float-right"/>
        </q-toolbar-title>
      </q-toolbar>
      <q-tabs color="primary">
         <q-route-tab
          icon="school"
          to="/actpresenciales"
          exact
          slot="title"
          name="actpresenciales"
          label="Act. presenciales"
        />
        <!-- q-route-tab
          icon="school"
          to="/actprescursos"
          exact
          slot="title"
          name="actprescursos"
          label="Cursos"
        />
       <q-route-tab
          icon="mode_comment"
          to="/actprescharlas"
          exact
          slot="title"
          name="actprescharlas"
          label="Charlas"
        />

        <q-route-tab
          icon="extension"
          to="/actprestalleres"
          exact
          slot="title"
          name="actprestalleres"
          label="Talleres"
        / -->
        <q-route-tab
          icon="cloud"
          to="/actonline"
          exact
          slot="title"
          name="actonline"
          label="Act. online"
        />
        <q-route-tab
          icon="star"
          to="/favoritos"
          exact
          slot="title"
          name="favoritos"
          label="Favoritos"
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
          <q-item-main label="Suscripciones" sublabel="Selección de cursos por provincia"/>
        </q-item>
        <!-- q-item to="/buscador">
          <q-item-side icon="search"/>
          <q-item-main label="Buscador" sublabel="Filtra eventos"/>
        </q-item -->
        <q-item to="/acercade">
          <q-item-side icon="help_outline"/>
          <q-item-main label="Acerca de" sublabel="Profes redondos"/>
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from "quasar";

export default {
  name: "MyLayout",
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    };
  },
  methods: {
    openURL
  }
};
</script>

<style>
</style>
