name = Español
#description must be less than 512 characters
description = ¡Bienvenido al Bot UNO para Telegram! Aquí puedes disfrutar del clásico juego de cartas UNO en un formato en línea conveniente.
    Invita a amigos o juega con oponentes al azar, compitiendo en lógica y estrategia.

    ¿Listo para jugar UNO? ¡Haz clic en el botón de abajo y comienza la partida!
#shortDescription must be less than 120 characters
shortDescription = ¡Juega al UNO con personas de todo el mundo! 🌍

    Sigue a @unonwsww y @unogrpww.
commands = Comandos
    .admin = Panel de administración
    .start = Menú principal
    .uno = Iniciar juego
    .language = Cambiar idioma
language = Cambiar idioma
start = 👋 Bienvenido a <b>UNO!</b>

    Únete al juego o agrégalo a tu grupo y disfruta del legendario UNO.
    .openWebApp = ¡Jugar! 🚀
    .addGroup = Agregar al grupo
    .profile = 💼 Perfil
    .share = 🆕 Invitar al juego
uno = El juego UNO está abierto para inscripciones.

    🕹 Para unirte al juego, presiona el botón de abajo.
    .key = ¡Jugar! 🚀
group = 👋 ¡Hola a todo el grupo!

    🕹 Usa el comando /uno para iniciar el juego.
profile = <b>🌟 Tu perfil 🌟</b>

    <b>Saldo</b> { $balance } 💰

    <b>🎮 Número de partidas</b>: { $gamesQuantity }
    <b>🏆 Número de victorias</b>: { $win }
    <b>💔 Número de derrotas</b>: { $lose }

    <b>👥 Número de referidos</b>: { $referralCounter }
    <b>🎁 Bono de referido</b>: { $referralAccrual } 💰 (<i>emitido después de jugar una partida</i>)
    <b>🔗 Tu enlace de referido</b>: <code>{ $referralLink }</code>
    .key = Abrir perfil
language = 🏳️ Elija un idioma
    .changed = 🏁 Idioma establecido
back = ‹ Atrás
inlineShare = 🎮 ¡Apertura de inscripciones en el juego de UNO!

    🕹 Para unirte al juego, haz clic en el botón de abajo.
    .title = 🆕 Invitar al juego
    .key = ¡Jugar! 🚀
admin = Panel de administración
    .statistics = 📊 Estadísticas
    .adRef = Promoción
    .botStat = Configuración de BotStat.io
statistics = <b>📊 Estadísticas</b>

    <b>Total</b>: {$all}
    <b>Activos</b>: {$alive} ({$alivePercent}%)
    <b>Sin referidos</b>: {$withoutRef} ({$withoutRefPercent}%)

    <b>DAU</b>: {$dau} ({$dauPercent}%)  <b>YAU</b>: {$yau} ({$yauPercent}%)
    <b>WAU</b>: {$wau} ({$wauPercent}%)  <b>MAU</b>: {$mau} ({$mauPercent}%)

    <b>Nuevos usuarios:</b> <i>(total / activos / sin referidos)</i>
    <b>Ayer</b>: {$forYesterday} {$aliveForYesterday} {$withoutRefForYesterday}  <b>Hoy</b>: {$forDay} {$aliveForDay} {$withoutRefForDay}
    <b>Semana</b>: {$forWeek} {$aliveForWeek} {$withoutRefForWeek}  <b>Mes</b>: {$forMonth} {$aliveForMonth} {$withoutRefForMonth}

    <b>Juegos</b>:
    <b>Iniciados</b>: {$gameStarted}  <b>Completados</b>: {$gameEnded}
    <b>Actualmente en juego</b>: {$gameNow}
    <b>Ayer</b>: {$gameForYesterday}  <b>Hoy</b>: {$gameForDay}
    <b>Semana</b>: {$gameForWeek}  <b>Mes</b>: {$gameForMonth}

    <b>Idiomas:</b>
    {$langCodesString}
    .getting = Obteniendo estadísticas...
    .langCode = {$code}: {$count} ({$percent}%)
adRef = <b>{$name}</b>

    <b>Clicks totales</b>: {$total}
    <b>Clicks únicos</b>: {$uniqueCounter} ({$uniqueCounterPercent}%)
    <b>Nuevos usuarios</b>: {$newCounter} ({$newCounterPercent}%)
    <b>Usuarios activos</b>: {$aliveCounter} ({$aliveCounterPercent}%)
    <b>Juegos ganados y perdidos</b>: {$gameWin} & {$gameLose} <i>los juegos no son únicos</i>

    <b>Primera utilización</b>: {$firstUsage}
    <b>Última utilización</b>: {$lastUsage}

    <b>Enlace</b>: <code>{$link}</code>
    .empty = No se encontraron campañas.
                        Usa <code>t.me/{ $botUsername }?start=ref-AD_CODE</code>.
    .cant = No se puede
    .list = <b>📃 Promoción</b>:

                        { $list }
    .listPoint = {$name}: {$total} {$uniqueCounter}
botStat = <b>Configuración de BotStat.io</b>

    <b>Clave actual</b>: {$botStatKey}
    .send = Enviar a BotStat
    .key = Clave
    .botMan = Enviar a BotMan
    .alive = Solo usuarios activos
    .enter = Ingresa la clave para BotStat.io
                        <i><a href='https://botstat.io/dashboard/api'>obtener la clave</a></i>
updateCommands = ✅ Comandos actualizados
updateDescriptions = ✅ Descripciones actualizadas
update = 🔄 Actualizar
