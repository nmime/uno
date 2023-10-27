name = Русский
start = 👋 Bienvenido a <b>UNO!</b>

    Únete al juego o agrégalo a un grupo y disfruta del legendario UNO!
    .openWebApp = ¡Jugar! 🚀
    .addGroup = Agregar al grupo
    .profile = 💼 Perfil
uno = Abierto para unirse al juego UNO!

    🕹 Para unirte al juego, presiona el botón de abajo.
    .key = ¡Jugar! 🚀
group = 👋 ¡Hola a todo el grupo!

    🕹 Usa el comando /uno para comenzar el juego.
profile = <b>🌟 Tu perfil 🌟</b>

    <b>Saldo</b> { $balance } 💰

    <b>🎮 Cantidad de juegos</b>: { $gamesQuantity }
    <b>🏆 Cantidad de victorias</b>: { $win }
    <b>💔 Cantidad de derrotas</b>: { $lose }

    <b>👥 Cantidad de referidos</b>: { $referralCounter }
    <b>🎁 Bonificación por referidos</b>: { $referralAccrual } 💰 (<i>se otorga después de jugar una partida</i>)
    <b>🔗 Tu enlace de referido</b>: <code>{ $referralLink }</code>
    .key = Abrir perfil
language = 🏳️ Selecciona el idioma
    .changed = 🏁 Idioma configurado
back = ‹ Atrás
admin = Panel de administrador
    .statistics = 📊 Estadísticas
    .adRef = 📃 Promoción
    .botStat = 🤖 BotStat.io
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
    <b>Iniciados</b>: {$gameStarted}  <b>Terminados</b>: {$gameEnded}
    <b>En juego ahora</b>: {$gameNow}
    <b>Ayer</b>: {$gameForYesterday}  <b>Hoy</b>: {$gameForDay}
    <b>Semana</b>: {$gameForWeek}  <b>Mes</b>: {$gameForMonth}

    <b>Idiomas:</b>
    {$langCodesString}
    .getting = Obteniendo estadísticas...
    .langCode = {$code}: {$count} ({$percent}%)
adRef = <b>{$name}</b>

    <b>Total de clics</b>: {$total}
    <b>Clics únicos</b>: {$uniqueCounter} ({$uniqueCounterPercent}%)
    <b>Nuevos usuarios</b>: {$newCounter} ({$newCounterPercent}%)
    <b>Usuarios activos</b>: {$aliveCounter} ({$aliveCounterPercent}%)
    <b>Juegos ganados y perdidos</b>: {$gameWin} & {$gameLose} <i>juegos no son únicos</i>

    <b>Primer clic</b>: {$firstUsage}
    <b>Último clic</b>: {$lastUsage}

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
    .enter = Ingresa la clave de BotStat.io
                <i><a href='https://botstat.io/dashboard/api'>obtener clave</a></i>
update = 🔄 Actualizar
