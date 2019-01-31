// Archivo de funciones que podemos reutilizar en diferentes archivos
export default ({ Vue }) => {
    // Función que devuelve un icono en función del tipo y área recibida
    Vue.prototype.$mostrarIcono = function (tipo) {
        if (tipo==='Dispositivos e infraestructura') return 'devices'
        else if (tipo==='Seguridad') return 'lock'
        else if (tipo==='Redes sociales y marketing digital') return 'people'
        else if (tipo==='Navegación y trámites por internet') return 'public'
        else if (tipo==='Creación de contenidos digitales') return 'brush'
        else if (tipo==='Comunicación y colaboración') return 'question_answer'
        else if (tipo==='Empleo') return 'work'
        else return 'group_work'
      }
  
    // Función que permite generar notificaciones locales para dispositivos móviles
    /*Vue.prototype.$notificar = function (array) {
      var hoy = new Date()
      // Hay que recordar que el mes es un número del 0 al 11
      var dia = hoy.getDate().toString()
      var mes = ''
      if (hoy.getMonth() + 1 <= 9) mes = '0' + (hoy.getMonth() + 1)
      else mes = (hoy.getMonth() + 1).toString()
      var anio = hoy.getFullYear().toString()
      var fecha = dia + mes + anio
      var i = 0
      if (localStorage.getItem('hoy') !== fecha) {
        localStorage.setItem('hoy', fecha)
        var notificaciones = []
        for (i = 0; i < array.length; i++) {
          notificaciones.push({id: i, title: array[i].hora + ' ' + array[i].titulo, text: array[i].descripcion, foreground: true, vibrate: true, smallIcon: '../assets/logo.png'})
        }
        cordova.plugins.notification.local.schedule(notificaciones)
      } else {
        for (i = 0; i < array.length; i++) {
          console.log(array[i].titulo + array[i].hora)
          cordova.plugins.notification.local.schedule({
            title: 'Evento en Ataulfo Argenta',
            // trigger: { at: new Date(anio, mes, dia, 9, 30) },
            text: 'Este es el texto del evento',
            // smallIcon: 'res://icon.ataulfo.png',
            foreground: true,
            vibrate: true
          })
        }
      }
    }*/
  
    // Función que parsea una fecha dada a una cadena en formato dd/mm/aaaa
    Vue.prototype.$parsearFecha = function (fecha) { // La fecha se pasa en modo texto
      if (!fecha) return ''
      else {
        var anio = new Date(fecha).getFullYear()
        var mes = parseInt(new Date(fecha).getMonth()) + 1
        var dia = parseInt(new Date(fecha).getDate())
        return (dia + '/' + mes + '/' + anio)
      }
    }
  
    // Función que comprueba si la fecha de inicio y fin de un evento son distintas; de lo contrario se muestra una única fecha
    Vue.prototype.$fechaInicioFinDistintas = function (ini, fin) {
      if (new Date(ini).getTime() !== new Date(fin).getTime()) {
        return true
      } else {
        return false
      }
    }
  
    // Función que comprueba si el valor a está en el array para hacer check en los checkbox de Suscripciones
    Vue.prototype.$isInArray = function (array, a) {
      return (array.includes(a.toString()))
    }
  }
  