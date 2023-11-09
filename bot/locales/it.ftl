name = Italiano
# La descrizione deve essere inferiore a 512 caratteri
description = Benvenuto in UNO-Bot per Telegram! Qui puoi goderti il classico gioco di carte UNO in un comodo formato online.
    Invita i tuoi amici o gioca con avversari casuali, gareggiando in logica e strategia.

    Sei pronto per giocare a UNO? Clicca il pulsante qui sotto e inizia la partita!
# La descrizione breve deve essere inferiore a 120 caratteri
shortDescription = Gioca a UNO con persone da tutto il mondo! 🌍

    Segui @unonwsww e @unogrpww.
commands = Comandi
    .admin = Pannello di amministrazione
    .start = Menu principale
    .uno = Inizia il gioco
    .language = Cambia lingua
language = Cambia lingua
start = 👋 Benvenuto in <b>UNO!</b>

    Entra nel gioco o aggiungilo a un gruppo e goditi l'epico UNO!
    .openWebApp = Gioca! 🚀
    .addGroup = Aggiungi al gruppo
    .profile = 💼 Profilo
    .share = 🆕 Invita al gioco
uno = Aperta la registrazione per il gioco UNO!

    🕹 Per unirti al gioco, premi il pulsante qui sotto.
    .key = Gioca! 🚀
group = 👋 Ciao a tutti nel gruppo!

    Usa il comando /uno per iniziare una partita.
profile = <b>🌟 Il tuo profilo 🌟</b>

    <b>Saldo</b> { $balance } 💰

    <b>🎮 Numero di partite</b>: { $gamesQuantity }
    <b>🏆 Numero di vittorie</b>: { $win }
    <b>💔 Numero di sconfitte</b>: { $lose }

    <b>👥 Numero di referenti</b>: { $referralCounter }
    <b>🎁 Bonus referenti</b>: { $referralAccrual } 💰 (<i>concesso dopo una partita giocata</i>)
    <b>🔗 Il tuo link di riferimento</b>: <code>{ $referralLink }</code>
    .key = Apri il profilo
language = 🏳️ Scegli la lingua
    .changed = 🏁 Lingua impostata
back = ‹ Indietro
inlineShare = 🎮 Iscrizioni aperte al gioco UNO!

    🕹 Per unirti al gioco, clicca il pulsante qui sotto.
    .title = 🆕 Invita al gioco
    .key = Gioca! 🚀
admin = Pannello di amministrazione
    .statistics = 📊 Statistiche
    .adRef = 📃 Promozione
    .botStat = 🤖 BotStat.io
statistics = <b>📊 Statistiche</b>

    <b>Totale</b>: {$all}
    <b>Attivi</b>: {$alive} ({$alivePercent}%)
    <b>Senza referenti</b>: {$withoutRef} ({$withoutRefPercent}%)

    <b>DAU</b>: {$dau} ({$dauPercent}%)  <b>YAU</b>: {$yau} ({$yauPercent}%)
    <b>WAU</b>: {$wau} ({$wauPercent}%)  <b>MAU</b>: {$mau} ({$mauPercent}%)

    <b>Nuovi utenti:</b> <i>(totale / attivi / senza referenti)</i>
    <b>Ieri</b>: {$forYesterday} {$aliveForYesterday} {$withoutRefForYesterday}  <b>Oggi</b>: {$forDay} {$aliveForDay} {$withoutRefForDay}
    <b>Settimana</b>: {$forWeek} {$aliveForWeek} {$withoutRefForWeek}  <b>Mese</b>: {$forMonth} {$aliveForMonth} {$withoutRefForMonth}

    <b>Giochi</b>:
    <b>Iniziati</b>: {$gameStarted}  <b>Terminati</b>: {$gameEnded}
    <b>In corso</b>: {$gameNow}
    <b>Ieri</b>: {$gameForYesterday}  <b>Oggi</b>: {$gameForDay}
    <b>Settimana</b>: {$gameForWeek}  <b>Mese</b>: {$gameForMonth}

    <b>Lingue:</b>
    {$langCodesString}
    .getting = Recupero statistiche...
    .langCode = {$code}: {$count} ({$percent}%)
adRef = <b>{$name}</b>

    <b>Totale clic</b>: {$total}
    <b>Clic unici</b>: {$uniqueCounter} ({$uniqueCounterPercent}%)
    <b>Nuovi utenti</b>: {$newCounter} ({$newCounterPercent}%)
    <b>Utenti attivi</b>: {$aliveCounter} ({$aliveCounterPercent}%)
    <b>Partite vinte e perse</b>: {$gameWin} & {$gameLose} <i>le partite non sono uniche</i>

    <b>Primo clic</b>: {$firstUsage}
    <b>Ultimo clic</b>: {$lastUsage}

    <b>Link</b>: <code>{$link}</code>
    .empty = Nessuna campagna trovata.
                    Usa <code>t.me/{ $botUsername }?start=ref-AD_CODE</code>.
    .cant = Impossibile
    .list = <b>📃 Promozione</b>:

                    { $list }
botStat = <b>Impostazioni BotStat.io</b>

    <b>Chiave corrente</b>: {$botStatKey}
    .send = Invia a BotStat
    .key = Chiave
    .botMan = Invia a BotMan
    .alive = Solo utenti attivi
    .enter = Inserisci la chiave per BotStat.io
                    <i><a href='https://botstat.io/dashboard/api'>ottieni una chiave</a></i>
updateCommands = ✅ Comandi aggiornati
updateDescriptions = ✅ Descrizioni aggiornate
update = 🔄 Aggiorna
