<!-- Aqui template, donde ira el HTML que Vue renderizara -->
<template>
  <div class="fixed-center text-center">
    <p>
      <img src="~assets/redondo.jpg">
    </p>
    <p>Round Teachers Software</p>
    <q-btn
      push
      rounded
      size="sm"
      color="secondary"
      icon-right="settings_backup_restore"
      label="Restaurar datos"
      @click="restaurarLocalStorage()"
    />
  </div>
</template>
<!-- Aqui script, donde irá el Javascript (métodos, funciones, etc) -->
<script>
export default {
  name: "AcercaDe",
  // Metodos accesibles desde Vue
  methods: {
    restaurarLocalStorage() {
      localStorage.clear();
    }
  }
};
</script>
