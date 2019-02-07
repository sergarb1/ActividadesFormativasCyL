<!-- Aqui template, donde ira el HTML que Vue renderizara -->
<template>
    <q-card class="q-mb-md" >
      <q-card-title>
        Descarga esta aplicación para las siguientes plataformas
      </q-card-title>
      <q-card-main>
  
        <p><q-btn
          push
          rounded
          size="sm"
          color="secondary"
          icon="android"
          label="Descargar para Android"
        /></p>
        <p><q-btn
          push
          rounded
          size="sm"
          color="secondary"
          icon="computer"
          label="Descargar para PC Windows"
        /></p>
        <p>

        <q-btn
          push
          rounded
          size="sm"
          color="secondary"
          icon="computer"
          label="Descargar para PC Linux"
        />
        </p>
      </q-card-main>
      <q-card-separator/>
    </q-card>
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
