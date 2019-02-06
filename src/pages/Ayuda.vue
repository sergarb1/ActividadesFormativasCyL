<!-- Página de ayuda -->
<template>
<q-page>
  <div class="q-ma-lg"> <!-- Indico un (m)argen a (all) todas las dimensiones grande (lg) -->
    <div class="col-auto">
      <strong class="q-mb-md">Ayuda sobre la aplicación</strong><br/><br/>
      <q-list>
        <q-collapsible icon="school" label="<strong>Visualizar actividades</strong>">
          <div class="q-ma-lg">
            <p>En la parte superior de la aplicación encontrarás varias pestañas:</p>
                <ul>
                    <li><q-icon name="school" size="16px"/> &nbsp;
                        <strong>Actividades presenciales:</strong> muestra todas las actividades presenciales de las provincias seleccionadas</li>
                    <li><q-icon name="cloud" size="16px"/> &nbsp;
                        <strong>Actividades online:</strong> muestra todas las actividades online</li>
                    <li><q-icon name="favorite" size="16px"/> &nbsp;
                        <strong>Favoritos:</strong> recoge todas las actividades presenciales y online que han sido marcadas como favoritas</li>
                    <li><q-icon name="thumb_up" size="16px"/> &nbsp;
                        <strong>Recomendaciones:</strong> hace una selección de actividades recomendadas en función de una serie de criterios.</li>
                </ul>
            Además, junto al título se encuentra el botón <q-icon name="search" size="16px"/> <strong>Buscar</strong> que permite filtrar las actividades según una serie de parámetros.
          </div>
        </q-collapsible>
         <q-collapsible icon="remove_red_eye" label="<strong>Mostrar una actividad</strong>">
          <div>
            <p>En las pestañas <strong><q-icon name="school" size="16px"/> &nbsp;Act.Presenciales</strong> y <strong><q-icon name="cloud" size="16px"/> &nbsp;Act.online</strong> se muestra una serie de tarjetas con eventos. </p>
            <p>En cada una de ellas se puede ver el título de la actividad, la localización (si es presencial), el nivel de dificultad, el número de horas y el número de solicitudes y plazas disponibles.</p>
            <p>Para ver la información detalla de cada uno de ellos pulsa el desplegable "Ver información" y podrás ver la descripción de la actividad, si tiene algún tipo de aviso o requisito previo, las fechas de matrícula y realización del curso, en el caso de eventos online los horarios de webinar, y un botón para poder acceder a la página de matriculación de CyL Digital.</p>
          </div>
        </q-collapsible>
         <q-collapsible icon="favorite" label="<strong>Marcar una actividad como favorita</strong>">
          <div>
            <p>En las pestañas <strong><q-icon name="school" size="16px"/> &nbsp;Act.Presenciales</strong> y <strong><q-icon name="cloud" size="16px"/> &nbsp;Act.online</strong> se muestra una serie de tarjetas con eventos. </p>
            <p>En cada una de ellas, en la parte superior derecha, se encuentra un icono con un corazón<q-icon name="favorite" size="16px"/> &nbsp;. Si pulsas sobre él guardarás la actividad como favorita. </p>
            <p>Para ver todas las actividades favoritas solamente hay que pulsar sobre la pestaña "Favoritas" y se mostrarán todas las actividades marcadas como favoritas en cada una de las dos categorías</p>fechas de matrícula y realización del curso y un botón para poder acceder a la página de matriculación de CyL Digital.</p>
          </div>
        </q-collapsible>
        <q-collapsible icon="thumb_up" label="<strong>Recomendaciones</strong>">
          <div>
            <p>La opción de <strong>Recomendaciones</strong> ofrece la posibilidad de visualizar los cursos más atractivos para el usuario.</p>
            <p>Para ello tiene en cuenta la información detallada de la descripción de cada actividad y las actividades seleccionadas como favoritas.</p>
          </div>
        </q-collapsible>
        <q-collapsible icon="edit" label="<strong>Gestionar Suscripciones / Notificaciones</strong>">
          <div>
            <p>Abre el menú lateral en el botón de la parte superior izquierda y elige la opción <strong>Suscripciones / Notificaciones</strong></p>
             <p>   Aquí podrás elegir a qué provincias suscribirte, de manera que únicamente se mostrarán en la pestaña Act.Presenciales los cursos de las provincias seleccionadas.</p>
             <p>   También podrás activar y desactivar las notificaciones por cada provincia de modo que recibirás una notificación en tu teléfono el día que se abra la matrícula de algún curso en las provincias seleccionadas.</p>
          </div>
        </q-collapsible>
      </q-list>
    </div>
    </div>
  </q-page>
</template>
