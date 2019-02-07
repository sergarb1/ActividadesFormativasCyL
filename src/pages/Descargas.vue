<!-- Aqui template, donde ira el HTML que Vue renderizara -->
<template>
  <div class="fixed-center text-center">
    <p>Descarga esta aplicación para las siguientes plataformas</p>
    <q-list a>
      <q-item>
        <q-btn
          push
          rounded
          size="sm"
          color="secondary"
          icon-right="android_phone"
          label="Descargar para Android"
        />
      </q-item>
      <q-item>
        <q-btn
          push
          rounded
          size="sm"
          color="secondary"
          icon-right="computer"
          label="Descargar para PC Windows"
        />
      </q-item>
      <q-item>
        <q-btn
          push
          rounded
          size="sm"
          color="secondary"
          icon-right="computer"
          label="Descargar para PC Linux"
        />
      </q-item>
    </q-list>
  </div>
</template>
<!-- Aqui script, donde irá el Javascript (métodos, funciones, etc) -->
<script>
export default {
  name: "Descargas",
  // Metodos accesibles desde Vue
  methods: {
  }
};
</script>
