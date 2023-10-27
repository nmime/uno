name = Русский
start = 👋 Benvenuto in <b>UNO!</b>

    Entra nel gioco o unisciti a un gruppo e goditi il leggendario UNO!
    .openWebApp = Gioca! 🚀
    .addGroup = Aggiungi al gruppo
    .profile = 💼 Profilo
uno = Apertura registrazione a UNO!

    🕹 Premi il pulsante qui sotto per unirti al gioco.
    .key = Gioca! 🚀
group = 👋 Benvenuti nel gruppo!

    🕹 Usa il comando /uno per avviare una partita.
profile = <b>🌟 Il tuo profilo 🌟</b>

    <b>Bilancio</b> { $balance } 💰

    <b>🎮 Numero di partite</b>: { $gamesQuantity }
    <b>🏆 Numero di vittorie</b>: { $win }
    <b>💔 Numero di sconfitte</b>: { $lose }

    <b>👥 Numero di referral</b>: { $referralCounter }
    <b>🎁 Bonus referral</b>: { $referralAccrual } 💰 (<i>concesso dopo una partita giocata</i>)
    <b>🔗 Il tuo link referral</b>: <code>{ $referralLink }</code>
    .key = Apri profilo
language = 🏳️ Scegli una lingua
    .changed = 🏁 Lingua impostata
back = ‹ Indietro
admin = Pannello di amministrazione
    .statistics = 📊 Statistiche
    .adRef = 📃 Promozione
    .botStat = 🤖 BotStat.io
statistics = <b>📊 Statistiche</b>

    <b>Totale</b>: {$all}
    <b>Vivi</b>: {$alive} ({$alivePercent}%)
    <b>Senza referral</b>: {$withoutRef} ({$withoutRefPercent}%)

    <b>DAU</b>: {$dau} ({$dauPercent}%)  <b>YAU</b>: {$yau} ({$yauPercent}%)
    <b>WAU</b>: {$wau} ({$wauPercent}%)  <b>MAU</b>: {$mau} ({$mauPercent}%)

    <b>Nuovi utenti:</b> <i>(totale / vivi / senza referral)</i>
    <b>Ieri</b>: {$forYesterday} {$aliveForYesterday} {$withoutRefForYesterday}  <b>Oggi</b>: {$forDay} {$aliveForDay} {$withoutRefForDay}
    <b>Settimana</b>: {$forWeek} {$aliveForWeek} {$withoutRefForWeek}  <b>Mese</b>: {$forMonth} {$aliveForMonth} {$withoutRefForMonth}

    <b>Partite</b>:
    <b>Iniziate</b>: {$gameStarted}  <b>Concluse</b>: {$gameEnded}
    <b>In corso</b>: {$gameNow}
    <b>Ieri</b>: {$gameForYesterday}  <b>Oggi</b>: {$gameForDay}
    <b>Settimana</b>: {$gameForWeek}  <b>Mese</b>: {$gameForMonth}

    <b>Lingue:</b>
    {$langCodesString}
    .getting = Recupero statistiche...
    .langCode = {$code}: {$count} ({$percent}%)
adRef = <b>{$name}</b>

    <b>Accessi totali</b>: {$total}
    <b>Accessi unici</b>: {$uniqueCounter} ({$uniqueCounterPercent}%)
    <b>Nuovi utenti</b>: {$newCounter} ({$newCounterPercent}%)
    <b>Utenti attivi</b>: {$aliveCounter} ({$aliveCounterPercent}%)
    <b>Partite vinte e perse</b>: {$gameWin} & {$gameLose} <i>partite non uniche</i>

    <b>Primo accesso</b>: {$firstUsage}
    <b>Ultimo accesso</b>: {$lastUsage}

    <b>Link</b>: <code>{$link}</code>
    .empty = Nessuna campagna trovata.
                Usa <code>t.me/{ $botUsername }?start=ref-AD_CODE</code>.
    .cant = Impossibile
    .list = <b>📃 Promozione</b>:

                { $list }
    .listPoint = {$name}: {$total} {$uniqueCounter}
botStat = <b>Impostazioni BotStat.io</b>

    <b>Chiave attuale</b>: {$botStatKey}
    .send = Invia a BotStat
    .key = Chiave
    .botMan = Invia a BotMan
    .alive = Solo utenti attivi
    .enter = Inserisci la chiave per BotStat.io
                <i><a href='https://botstat.io/dashboard/api'>Ottieni la chiave</a></i>
update = 🔄 Aggiorna
