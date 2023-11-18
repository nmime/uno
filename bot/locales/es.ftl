name = Español
# La descripción debe tener menos de 512 caracteres
description = ¡Bienvenido al bot de UNO para Telegram! Aquí puedes disfrutar del clásico juego de cartas UNO en un cómodo formato en línea.
    Invita a tus amigos o juega con oponentes al azar, compitiendo en lógica y estrategia.

    ¿Listo para jugar UNO? ¡Presiona el botón de abajo y comienza el juego!
# La descripción breve debe tener menos de 120 caracteres
shortDescription = ¡Juega a UNO con personas de todo el mundo! 🌍

    Síguenos en @unonwsww y @unogrpww.
commands = Comandos
    .admin = Panel de administración
    .start = Menú principal
    .uno = Comenzar el juego
    .language = Cambiar el idioma
    .profile = Perfil
language = Cambiar el idioma
start = 👋 ¡Bienvenido a <b>UNO!</b>

    Síguenos en @unonwsww y únete a @unogrpww.

    ¡Únete al juego o agrégalo a un grupo y disfruta del legendario UNO!
    .openWebApp = ¡Jugar! 🚀
    .addGroup = Agregar al grupo
    .profile = 💼 Perfil
    .share = 🆕 Invitar al juego
uno = <b>🎮 ¡Se abre la inscripción para jugar a UNO!</b>

    🔆 { $status }
    <b>💼 Apuesta</b>: { $bet } 💰
    <b>👥 Jugadores</b> { $playersCount } de { $maxPlayers }

    🕹 Para unirte al juego, presiona el botón de abajo.
    .key = ¡Jugar! 🚀
    .waiting = Esperando a los jugadores...
    .playing = ¡El juego ha comenzado!
    .ended = El juego ha terminado, ¡puedes unirte de nuevo!
    .update = 🔄 Actualizar
group = 👋 ¡Hola a todos en el grupo!

    🕹 Usa el comando /uno para empezar el juego.
profile = <b>🌟 Tu perfil 🌟</b>

    <b>Saldo</b> { $balance } 💰

    <b>🎮 Cantidad de juegos</b>: { $gamesQuantity }
    <b>🏆 Cantidad de victorias</b>: { $win }
    <b>💔 Cantidad de derrotas</b>: { $lose }

    <b>👥 Cantidad de referidos</b>: { $referralCounter }
    <b>🎁 Bono por referidos</b>: { $referralAccrual } 💰 (<i>se otorga después de jugar una partida</i>)
    <b>🔗 Tu enlace de referido</b>: <code>{ $referralLink }</code>
    .key = Abrir perfil
language = 🏳️ Elige un idioma
    .changed = 🏁 Idioma configurado
back = ‹ Atrás
inlineShare = 🎮 ¡Se abre la inscripción para jugar a UNO!

    🕹 Para unirte al juego, presiona el botón de abajo.
    .title = 🆕 Invitar al juego
    .key = ¡Jugar! 🚀
admin = Panel de administración
    .statistics = 📊 Estadísticas
    .adRef = 📃 Promoción
    .botStat = 🤖 BotStat.io
statistics = <b>📊 Estadísticas</b>
    <b><u>Usuarios</u></b>:
    <b>Total</b>: {$all}
    <b>En línea</b>: {$alive} ({$alivePercent}%)
    <b>Sin referidos</b>: {$withoutRef} ({$withoutRefPercent}%)

    <b>DAU</b>: {$dau} ({$dauPercent}%)  <b>YAU</b>: {$yau} ({$yauPercent}%)
    <b>WAU</b>: {$wau} ({$wauPercent}%)  <b>MAU</b>: {$mau} ({$mauPercent}%)

    <b>Nuevos:</b> <i>(total / en línea / sin referidos)</i>
    <b>Ayer</b>: {$forYesterday}|{$aliveForYesterday}|{$withoutRefForYesterday}  <b>Hoy</b>: {$forDay}|{$aliveForDay}|{$withoutRefForDay}
    <b>Semana</b>: {$forWeek}|{$aliveForWeek}|{$withoutRefForWeek}  <b>Mes</b>: {$forMonth}|{$aliveForMonth}|{$withoutRefForMonth}

    <b>Idiomas</b>:
    {$langCodesString}

    <b><u>Grupos</u></b>:
    <b>Total</b>: {$allGroups}
    <b>En línea</b>: {$aliveGroups} ({$alivePercentGroups}%)

    <b>DAU</b>: {$dauGroups} ({$dauPercentGroups}%)  <b>YAU</b>: {$yauGroups} ({$yauPercentGroups}%)
    <b>WAU</b>: {$wauGroups} ({$wauPercentGroups}%)  <b>MAU</b>: {$mauGroups} ({$mauPercentGroups}%)

    <b>Nuevos:</b> <i>(total / en línea)</i>
    <b>Ayer</b>: {$forYesterdayGroups}|{$aliveForYesterdayGroups}  <b>Hoy</b>: {$forDayGroups}|{$aliveForDayGroups}
    <b>Semana</b>: {$forWeekGroups}|{$aliveForWeekGroups}  <b>Mes</b>: {$forMonthGroups}|{$aliveForMonthGroups}

    <b><u>Juegos</u></b>:
    <b>Iniciados</b>: {$gameStarted}  <b>Terminados</b>: {$gameEnded}
    <b>En curso</b>: {$gameNow}
    <b>Ayer</b>: {$gameForYesterday}  <b>Hoy</b>: {$gameForDay}
    <b>Semana</b>: {$gameForWeek}  <b>Mes</b>: {$gameForMonth}
    .getting = Obteniendo estadísticas...
    .langCode = {$code}: {$count} ({$percent}%)
    .update = ⚠️ Recalcular estadísticas
    .updating = ⚠️ Actualizando estadísticas... Esto puede llevar mucho tiempo.
adRef = <b>{$name}</b>

    <b>Total de clics</b>: {$total}
    <b>Clics únicos</b>: {$uniqueCounter} ({$uniqueCounterPercent}%)
    <b>Nuevos usuarios</b>: {$newCounter} ({$newCounterPercent}%)
    <b>Usuarios en línea</b>: {$aliveCounter} ({$aliveCounterPercent}%)
    <b>Juegos ganados y perdidos</b>: {$gameWin} & {$gameLose} <i>los juegos no son únicos</i>

    <b>Primer clic</b>: {$firstUsage}
    <b>Último clic</b>: {$lastUsage}

    <b>Enlace</b>: <code>{$link}</code>
    .empty = No se encontraron campañas.
                Usa <code>t.me/{ $botUsername }?start=ref-AD_CODE</code>.
    .cant = No se puede
    .list = <b>📃 Promoción</b>:

                { $list }
    .listPoint = {$name}: {$total}|{$uniqueCounter}
botStat = <b>Configuración de BotStat.io</b>

    <b>Clave actual</b>: {$botStatKey}
    .send = Enviar a BotStat
    .key = Clave
    .botMan = Enviar a BotMan
    .alive = Solo usuarios activos
    .enter = Ingresa la clave de BotStat.io
                <i><a href='https://botstat.io/dashboard/api'>obtener la clave</a></i>
    .update = ⚠️ Actualizar BotStat
    .updating = ⚠️ Enviando datos... Esto puede llevar algún tiempo.
updateCommands = ✅ Comandos actualizados
updateDescriptions = ✅ Descripciones actualizadas
update = 🔄 Actualizar