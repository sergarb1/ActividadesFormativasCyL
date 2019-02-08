<!-- Aqui template, donde ira el HTML que Vue renderizara -->
<template>
  <div class="q-ma-lg">
    <!-- Indico un (m)argen a (all) todas las dimensiones grande (lg) -->
    <div class="col-auto">
      <strong class="q-mb-md">Descargar aplicación para Android y PC</strong>
      <br>
      <br>
      <q-list no-border>
        <q-card class="q-mb-md">
          <q-card-main>
            <p>
              <q-btn
                push
                rounded
                size="md"
                color="primary"
                icon="cloud"
                label="Web oficial de descargas"
                @click="abrirURL('https://github.com/sergarb1/CyLDigital')"
              />
            </p>
            <p>
              <q-btn
                push
                rounded
                size="sm"
                color="secondary"
                icon="android"
                label="Descargar para Android"
                @click="abrirURL('https://github.com/sergarb1/CyLDigital/raw/master/CyLDigital.apk');"
              />
            </p>

            <p>
              <q-btn
                push
                rounded
                size="sm"
                color="secondary"
                icon="computer"
                label="Descargar para PC Linux x86"
                @click="abrirURL('https://github.com/sergarb1/CyLDigital/raw/master/CyLDigital-linux32.zip');"
              />
            </p>
            <p>
              <q-btn
                push
                rounded
                size="sm"
                color="secondary"
                icon="computer"
                label="Descargar para PC Linux x64"
                @click="abrirURL('https://github.com/sergarb1/CyLDigital/raw/master/CyLDigital-linux64.zip');"
              />
            </p>
            <p>
              <q-btn
                push
                rounded
                size="sm"
                color="secondary"
                icon="computer"
                label="Descargar para PC Windows x86"
                @click="abrirURL('https://github.com/sergarb1/CyLDigital/raw/master/CyLDigital-win32.zip');"
              />
            </p>
            <p>
              <q-btn
                push
                rounded
                size="sm"
                color="secondary"
                icon="computer"
                label="Descargar para macOS"
                @click="abrirURL('https://github.com/sergarb1/CyLDigital/raw/master/CyLDigital-macos.zip');"
              />
            </p>
          </q-card-main>
          <q-card-separator/>
        </q-card>
      </q-list>
    </div>
  </div>
</template>
<!-- Aqui script, donde irá el Javascript (métodos, funciones, etc) -->
<script>
// Para poder abrir url con openURL
import { openURL } from "quasar";

export default {
  name: "Descargas",
  // Metodos accesibles desde Vue
  methods: {
    // Funcion que recibe un URL y la abre
    abrirURL(url) {
      openURL(url);
    }
  }
};
</script>
