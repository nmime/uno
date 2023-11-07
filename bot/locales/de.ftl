name = Deutsch
#description must be less than 512 characters
description = Willkommen beim UNO-Bot für Telegram! Hier kannst du das klassische Kartenspiel UNO bequem online genießen.
    Lade Freunde ein oder spiele gegen zufällige Gegner und trete in Logik und Strategie gegeneinander an.

    Bereit für eine Runde UNO? Klicke auf den Button unten und starte das Spiel!
#shortDescription must be less than 120 characters
shortDescription = Spiele UNO mit Menschen aus der ganzen Welt! 🌍

    Folge @unonwsww & @unogrpww.
commands = Befehle
    .admin = Admin-Panel
    .start = Hauptmenü
    .uno = Spiel starten
    .language = Sprache ändern
language = Sprache ändern
start = 👋 Willkommen bei <b>UNO!</b>

    Trete dem Spiel bei oder füge es deiner Gruppe hinzu und genieße das legendäre UNO!
    .openWebApp = Spielen! 🚀
    .addGroup = Zur Gruppe hinzufügen
    .profile = 💼 Profil
uno = Das UNO-Spiel ist zur Anmeldung geöffnet!

    🕹 Um dem Spiel beizutreten, drücke den Button unten.
    .key = Spielen! 🚀
group = 👋 Hallo an die gesamte Gruppe!

    🕹 Verwende den Befehl /uno, um das Spiel zu starten.
profile = <b>🌟 Dein Profil 🌟</b>

    <b>Guthaben</b> { $balance } 💰

    <b>🎮 Anzahl der Spiele</b>: { $gamesQuantity }
    <b>🏆 Anzahl der Siege</b>: { $win }
    <b>💔 Anzahl der Niederlagen</b>: { $lose }

    <b>👥 Anzahl der Empfehlungen</b>: { $referralCounter }
    <b>🎁 Empfehlungsbonus</b>: { $referralAccrual } 💰 (<i>wird nach einem Spiel ausgezahlt</i>)
    <b>🔗 Dein Empfehlungslink</b>: <code>{ $referralLink }</code>
    .key = Profil öffnen
language = 🏳️ Sprache wählen
    .changed = 🏁 Sprache festgelegt
back = ‹ Zurück
inlineShare = 🎮 UNO-Spiel geöffnet!

    🕹 Um dem Spiel beizutreten, drücken Sie unten auf die Schaltfläche.
    .title = 🆕 Zum Spiel einladen
    .key = Spielen! 🚀
admin = Admin-Panel
    .statistics = 📊 Statistiken
    .adRef = Promotion
    .botStat = BotStat.io
statistics = <b>📊 Statistiken</b>

    <b>Gesamt</b>: {$all}
    <b>Aktiv</b>: {$alive} ({$alivePercent}%)
    <b>Ohne Empfehlung</b>: {$withoutRef} ({$withoutRefPercent}%)

    <b>DAU</b>: {$dau} ({$dauPercent}%)  <b>YAU</b>: {$yau} ({$yauPercent}%)
    <b>WAU</b>: {$wau} ({$wauPercent}%)  <b>MAU</b>: {$mau} ({$mauPercent}%)

    <b>Neue Nutzer:</b> <i>(gesamt / aktiv / ohne Empfehlung)</i>
    <b>Gestern</b>: {$forYesterday} {$aliveForYesterday} {$withoutRefForYesterday}  <b>Heute</b>: {$forDay} {$aliveForDay} {$withoutRefForDay}
    <b>Woche</b>: {$forWeek} {$aliveForWeek} {$withoutRefForWeek}  <b>Monat</b>: {$forMonth} {$aliveForMonth} {$withoutRefForMonth}

    <b>Spiele</b>:
    <b>Gestartet</b>: {$gameStarted}  <b>Abgeschlossen</b>: {$gameEnded}
    <b>Aktuell am Spielen</b>: {$gameNow}
    <b>Gestern</b>: {$gameForYesterday}  <b>Heute</b>: {$gameForDay}
    <b>Woche</b>: {$gameForWeek}  <b>Monat</b>: {$gameForMonth}

    <b>Sprachen:</b>
    {$langCodesString}
    .getting = Statistiken werden abgerufen...
    .langCode = {$code}: {$count} ({$percent}%)
adRef = <b>{$name}</b>

    <b>Gesamtklicks</b>: {$total}
    <b>Eindeutige Klicks</b>: {$uniqueCounter} ({$uniqueCounterPercent}%)
    <b>Neue Nutzer</b>: {$newCounter} ({$newCounterPercent}%)
    <b>Aktive Nutzer</b>: {$aliveCounter} ({$aliveCounterPercent}%)
    <b>Spiele Gewonnen und Verloren</b>: {$gameWin} & {$gameLose} <i>Spiele sind nicht eindeutig</i>

    <b>Erstmalige Nutzung</b>: {$firstUsage}
    <b>Letzte Nutzung</b>: {$lastUsage}

    <b>Link</b>: <code>{$link}</code>
    .empty = Kampagnen nicht gefunden.
                    Verwende <code>t.me/{ $botUsername }?start=ref-AD_CODE</code>.
    .cant = Kann nicht
    .list = <b>📃 Promotion</b>:

                    { $list }
    .listPoint = {$name}: {$total} {$uniqueCounter}
botStat = <b>BotStat.io Einrichtung</b>

    <b>Aktueller Schlüssel</b>: {$botStatKey}
    .send = An BotStat senden
    .key = Schlüssel
    .botMan = An BotMan senden
    .alive = Nur aktive Nutzer
    .enter = Gib den Schlüssel für BotStat.io ein
                    <i><a href='https://botstat.io/dashboard/api'>Hole dir den Schlüssel</a></i>
updateCommands = ✅ Befehle aktualisiert
updateDescriptions = ✅ Beschreibungen aktualisiert
update = 🔄 Aktualisieren
