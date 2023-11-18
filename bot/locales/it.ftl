name = Italiano
# La descrizione deve essere inferiore a 512 caratteri
description = Benvenuto nel bot UNO per Telegram! Qui puoi goderti il classico gioco di carte UNO in un comodo formato online.
    Invita i tuoi amici o gioca con avversari casuali, gareggia in logica e strategia.

    Pronto per giocare a UNO? Premi il pulsante qui sotto e inizia la partita!
# La descrizione breve deve essere inferiore a 120 caratteri
shortDescription = Gioca a UNO con persone da tutto il mondo! 🌍

    Seguici su @unonwsww e @unogrpww.
commands = Comandi
    .admin = Pannello di amministrazione
    .start = Menu principale
    .uno = Inizia il gioco
    .language = Cambia lingua
    .profile = Profilo
language = Cambia lingua
start = 👋 Benvenuto a <b>UNO!</b>

    Seguici su @unonwsww e unisciti a @unogrpww.

    Entra nel gioco o aggiungilo a un gruppo e goditi l'epico UNO!
    .openWebApp = Gioca! 🚀
    .addGroup = Aggiungi al gruppo
    .profile = 💼 Profilo
    .share = 🆕 Invita a giocare
uno = <b>🎮 Iscrizioni aperte per giocare a UNO!</b>

    🔆 { $status }
    <b>💼 Puntata</b>: { $bet } 💰
    <b>👥 Giocatori</b> { $playersCount } su { $maxPlayers }

    🕹 Per unirti al gioco, premi il pulsante qui sotto.
    .key = Gioca! 🚀
    .waiting = In attesa di giocatori...
    .playing = Il gioco è iniziato!
    .ended = Il gioco è terminato, puoi unirti di nuovo!
    .update = 🔄 Aggiorna
group = 👋 Ciao a tutti nel gruppo!

    🕹 Usa il comando /uno per iniziare una partita.
profile = <b>🌟 Il tuo profilo 🌟</b>

    <b>Saldo</b> { $balance } 💰

    <b>🎮 Numero di partite</b>: { $gamesQuantity }
    <b>🏆 Numero di vittorie</b>: { $win }
    <b>💔 Numero di sconfitte</b>: { $lose }

    <b>👥 Numero di referenti</b>: { $referralCounter }
    <b>🎁 Bonus referenti</b>: { $referralAccrual } 💰 (<i>concesso dopo una partita giocata</i>)
    <b>🔗 Il tuo link di riferimento</b>: <code>{ $referralLink }</code>
    .key = Apri il profilo
language = 🏳️ Scegli una lingua
    .changed = 🏁 Lingua impostata
back = ‹ Indietro
inlineShare = 🎮 Iscrizioni aperte per giocare a UNO!

    🕹 Per unirti al gioco, premi il pulsante qui sotto.
    .title = 🆕 Invita a giocare
    .key = Gioca! 🚀
admin = Pannello di amministrazione
    .statistics = 📊 Statistiche
    .adRef = 📃 Promozione
    .botStat = 🤖 BotStat.io
statistics = <b>📊 Statistiche</b>
    <b><u>Utenti</u></b>:
    <b>Totale</b>: {$all}
    <b>Online</b>: {$alive} ({$alivePercent}%)
    <b>Senza referenti</b>: {$withoutRef} ({$withoutRefPercent}%)

    <b>DAU</b>: {$dau} ({$dauPercent}%)  <b>YAU</b>: {$yau} ({$yauPercent}%)
    <b>WAU</b>: {$wau} ({$wauPercent}%)  <b>MAU</b>: {$mau} ({$mauPercent}%)

    <b>Nuovi:</b> <i>(totale / online / senza referenti)</i>
    <b>Ieri</b>: {$forYesterday}|{$aliveForYesterday}|{$withoutRefForYesterday}  <b>Oggi</b>: {$forDay}|{$aliveForDay}|{$withoutRefForDay}
    <b>Settimana</b>: {$forWeek}|{$aliveForWeek}|{$withoutRefForWeek}  <b>Mese</b>: {$forMonth}|{$aliveForMonth}|{$withoutRefForMonth}

    <b>Lingue</b>:
    {$langCodesString}

    <b><u>Gruppi</u></b>:
    <b>Totale</b>: {$allGroups}
    <b>Online</b>: {$aliveGroups} ({$alivePercentGroups}%)

    <b>DAU</b>: {$dauGroups} ({$dauPercentGroups}%)  <b>YAU</b>: {$yauGroups} ({$yauPercentGroups}%)
    <b>WAU</b>: {$wauGroups} ({$wauPercentGroups}%)  <b>MAU</b>: {$mauGroups} ({$mauPercentGroups}%)

    <b>Nuovi:</b> <i>(totale / online)</i>
    <b>Ieri</b>: {$forYesterdayGroups}|{$aliveForYesterdayGroups}  <b>Oggi</b>: {$forDayGroups}|{$aliveForDayGroups}
    <b>Settimana</b>: {$forWeekGroups}|{$aliveForWeekGroups}  <b>Mese</b>: {$forMonthGroups}|{$aliveForMonthGroups}

    <b><u>Giochi</u></b>:
    <b>Iniziati</b>: {$gameStarted}  <b>Terminati</b>: {$gameEnded}
    <b>In corso</b>: {$gameNow}
    <b>Ieri</b>: {$gameForYesterday}  <b>Oggi</b>: {$gameForDay}
    <b>Settimana</b>: {$gameForWeek}  <b>Mese</b>: {$gameForMonth}
    .getting = Recupero delle statistiche...
    .langCode = {$code}: {$count} ({$percent}%)
    .update = ⚠️ Ricarica le statistiche
    .updating = ⚠️ Aggiornamento delle statistiche... Questo potrebbe richiedere del tempo.
adRef = <b>{$name}</b>

    <b>Totale clic</b>: {$total}
    <b>Clic unici</b>: {$uniqueCounter} ({$uniqueCounterPercent}%)
    <b>Nuovi utenti</b>: {$newCounter} ({$newCounterPercent}%)
    <b>Utenti online</b>: {$aliveCounter} ({$aliveCounterPercent}%)
    <b>Partite vinte e perse</b>: {$gameWin} & {$gameLose} <i>le partite non sono uniche</i>

    <b>Primo clic</b>: {$firstUsage}
    <b>Ultimo clic</b>: {$lastUsage}

    <b>Link</b>: <code>{$link}</code>
    .empty = Nessuna campagna trovata.
                    Usa <code>t.me/{ $botUsername }?start=ref-AD_CODE</code>.
    .cant = Impossibile
    .list = <b>📃 Promozione</b>:

                    { $list }
    .listPoint = {$name}: {$total}|{$uniqueCounter}
botStat = <b>Impostazioni di BotStat.io</b>

    <b>Chiave attuale</b>: {$botStatKey}
    .send = Invia a BotStat
    .key = Chiave
    .botMan = Invia a BotMan
    .alive = Solo utenti attivi
    .enter = Inserisci la chiave per BotStat.io
                    <i><a href='https://botstat.io/dashboard/api'>ottenere la chiave</a></i>
    .update = ⚠️ Aggiorna BotStat
    .updating = ⚠️ Invio dei dati... Questo potrebbe richiedere del tempo.
updateCommands = ✅ Comandi aggiornati
updateDescriptions = ✅ Descrizioni aggiornate
update = 🔄 Aggiorna