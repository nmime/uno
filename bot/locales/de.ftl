name = Deutsch
start = 👋 Willkommen bei <b>UNO!</b>

    Tritt dem Spiel bei oder füge es deiner Gruppe hinzu und genieße das legendäre UNO!
    .openWebApp = Spielen! 🚀
    .addGroup = Zur Gruppe hinzufügen
    .profile = 💼 Profil
uno = Die Anmeldung für UNO ist geöffnet!

    🕹 Um dem Spiel beizutreten, klicke auf die Schaltfläche unten.
    .key = Spielen! 🚀
group = 👋 Hallo an die ganze Gruppe!

    🕹 Verwende den Befehl /uno, um das Spiel zu starten.
profile = <b>🌟 Dein Profil 🌟</b>

    <b>Guthaben</b> { $balance } 💰

    <b>🎮 Anzahl der Spiele</b>: { $gamesQuantity }
    <b>🏆 Anzahl der Siege</b>: { $win }
    <b>💔 Anzahl der Niederlagen</b>: { $lose }

    <b>👥 Anzahl der Empfehlungen</b>: { $referralCounter }
    <b>🎁 Empfehlungsbonus</b>: { $referralAccrual } 💰 (<i>wird nach einem gespielten Spiel ausgezahlt</i>)
    <b>🔗 Dein Empfehlungslink</b>: <code>{ $referralLink }</code>
    .key = Profil öffnen
language = 🏳️ Wähle eine Sprache aus
    .changed = 🏁 Sprache eingestellt
back = ‹ Zurück
admin = Administrationsbereich
    .statistics = 📊 Statistiken
    .adRef = 📃 Werbung
    .botStat = 🤖 BotStat.io
statistics = <b>📊 Statistiken</b>

    <b>Gesamt</b>: {$all}
    <b>Aktive</b>: {$alive} ({$alivePercent}%)
    <b>Ohne Empfehlungen</b>: {$withoutRef} ({$withoutRefPercent}%)

    <b>DAU</b>: {$dau} ({$dauPercent}%)  <b>YAU</b>: {$yau} ({$yauPercent}%)
    <b>WAU</b>: {$wau} ({$wauPercent}%)  <b>MAU</b>: {$mau} ({$mauPercent}%)

    <b>Neue Benutzer:</b> <i>(Gesamt / Aktive / Ohne Empfehlungen)</i>
    <b>Gestern</b>: {$forYesterday} {$aliveForYesterday} {$withoutRefForYesterday}  <b>Heute</b>: {$forDay} {$aliveForDay} {$withoutRefForDay}
    <b>Woche</b>: {$forWeek} {$aliveForWeek} {$withoutRefForWeek}  <b>Monat</b>: {$forMonth} {$aliveForMonth} {$withoutRefForMonth}

    <b>Spiele:</b>
    <b>Gestartet</b>: {$gameStarted}  <b>Beendet</b>: {$gameEnded}
    <b>Aktuell am Spielen</b>: {$gameNow}
    <b>Gestern</b>: {$gameForYesterday}  <b>Heute</b>: {$gameForDay}
    <b>Woche</b>: {$gameForWeek}  <b>Monat</b>: {$gameForMonth}

    <b>Sprachen:</b>
    {$langCodesString}
    .getting = Statistiken werden abgerufen...
    .langCode = {$code}: {$count} ({$percent}%)
adRef = <b>{$name}</b>

    <b>Gesamte Klicks</b>: {$total}
    <b>Eindeutige Klicks</b>: {$uniqueCounter} ({$uniqueCounterPercent}%)
    <b>Neue Benutzer</b>: {$newCounter} ({$newCounterPercent}%)
    <b>Aktive Benutzer</b>: {$aliveCounter} ({$aliveCounterPercent}%)
    <b>Gewonnene und Verlorene Spiele</b>: {$gameWin} & {$gameLose} <i>Spiele sind nicht eindeutig</i>

    <b>Erster Klick</b>: {$firstUsage}
    <b>Letzter Klick</b>: {$lastUsage}

    <b>Link</b>: <code>{$link}</code>
    .empty = Keine Kampagnen gefunden.
                Verwende <code>t.me/{ $botUsername }?start=ref-AD_CODE</code>.
    .cant = Nicht möglich
    .list = <b>📃 Werbung</b>:

                { $list }
    .listPoint = {$name}: {$total} {$uniqueCounter}
botStat = <b>BotStat.io Einstellungen</b>

    <b>Aktueller Schlüssel</b>: {$botStatKey}
    .send = An BotStat senden
    .key = Schlüssel
    .botMan = An BotMan senden
    .alive = Nur aktive Benutzer
    .enter = Gib den Schlüssel für BotStat.io ein
                <i><a href='https://botstat.io/dashboard/api'>Schlüssel erhalten</a></i>
update = 🔄 Aktualisieren
