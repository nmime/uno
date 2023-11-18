name = Deutsch
# Die Beschreibung muss weniger als 512 Zeichen haben
description = Willkommen bei UNO-Bot für Telegram! Hier kannst du das klassische Kartenspiel UNO in einem bequemen Online-Format genießen.
    Fordere Freunde heraus oder spiele gegen zufällige Gegner und messe dich in Logik und Strategie.

    Bereit für UNO? Drücke unten auf die Schaltfläche und beginne das Spiel!
# Die Kurzbeschreibung muss weniger als 120 Zeichen haben
shortDescription = Spiele UNO mit Menschen aus der ganzen Welt! 🌍

    Folge @unonwsww & @unogrpww.
commands = Befehle
    .admin = Admin-Panel
    .start = Hauptmenü
    .uno = Spiel starten
    .language = Sprache ändern
    .profile = Profil
language = Sprache ändern
start = 👋 Willkommen bei <b>UNO!</b>

    Folge @unonwsww und besuche @unogrpww.

    Betrete das Spiel oder füge es deiner Gruppe hinzu und genieße das legendäre UNO!
    .openWebApp = Spielen! 🚀
    .addGroup = Zur Gruppe hinzufügen
    .profile = 💼 Profil
    .share = 🆕 Zum Spiel einladen
uno = <b>🎮 UNO-Spiel beitreten!</b>

    🔆 { $status }
    <b>💼 Einsatz</b>: { $bet } 💰
    <b>👥 Spieler</b> { $playersCount } von { $maxPlayers }

    🕹 Klicke unten, um dem Spiel beizutreten.
    .key = Spielen! 🚀
    .waiting = Warte auf Spieler...
    .playing = Spiel läuft!
    .ended = Spiel beendet, du kannst dich erneut anschließen!
    .update = 🔄 Aktualisieren
group = 👋 Hallo an alle in der Gruppe!

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
language = 🏳️ Sprache auswählen
    .changed = 🏁 Sprache festgelegt
back = ‹ Zurück
inlineShare = 🎮 UNO-Spiel beitreten!

    🕹 Klicke unten, um dem Spiel beizutreten.
    .title = 🆕 Zum Spiel einladen
    .key = Spielen! 🚀
admin = Admin-Panel
    .statistics = 📊 Statistiken
    .adRef = 📃 Werbung
    .botStat = 🤖 BotStat.io
statistics = <b>📊 Statistiken</b>
    <b><u>Benutzer</u></b>:
    <b>Insgesamt</b>: {$all}
    <b>Aktiv</b>: {$alive} ({$alivePercent}%)
    <b>Ohne Empfehlungen</b>: {$withoutRef} ({$withoutRefPercent}%)

    <b>DAU</b>: {$dau} ({$dauPercent}%)  <b>YAU</b>: {$yau} ({$yauPercent}%)
    <b>WAU</b>: {$wau} ({$wauPercent}%)  <b>MAU</b>: {$mau} ({$mauPercent}%)

    <b>Neue:</b> <i>(insgesamt / aktiv / ohne Empfehlungen)</i>
    <b>Gestern</b>: {$forYesterday}|{$aliveForYesterday}|{$withoutRefForYesterday}  <b>Heute</b>: {$forDay}|{$aliveForDay}|{$withoutRefForDay}
    <b>Woche</b>: {$forWeek}|{$aliveForWeek}|{$withoutRefForWeek}  <b>Monat</b>: {$forMonth}|{$aliveForMonth}|{$withoutRefForMonth}

    <b>Sprachen</b>:
    {$langCodesString}

    <b><u>Gruppen</u></b>:
    <b>Insgesamt</b>: {$allGroups}
    <b>Aktiv</b>: {$aliveGroups} ({$alivePercentGroups}%)

    <b>DAU</b>: {$dauGroups} ({$dauPercentGroups}%)  <b>YAU</b>: {$yauGroups} ({$yauPercentGroups}%)
    <b>WAU</b>: {$wauGroups} ({$wauPercentGroups}%)  <b>MAU</b>: {$mauGroups} ({$mauPercentGroups}%)

    <b>Neue:</b> <i>(insgesamt / aktiv)</i>
    <b>Gestern</b>: {$forYesterdayGroups}|{$aliveForYesterdayGroups}  <b>Heute</b>: {$forDayGroups}|{$aliveForDayGroups}
    <b>Woche</b>: {$forWeekGroups}|{$aliveForWeekGroups}  <b>Monat</b>: {$forMonthGroups}|{$aliveForMonthGroups}

    <b><u>Spiele</u></b>:
    <b>Gestartet</b>: {$gameStarted}  <b>Beendet</b>: {$gameEnded}
    <b>Aktuell</b>: {$gameNow}
    <b>Gestern</b>: {$gameForYesterday}  <b>Heute</b>: {$gameForDay}
    <b>Woche</b>: {$gameForWeek}  <b>Monat</b>: {$gameForMonth}
    .getting = Statistiken werden abgerufen...
    .langCode = {$code}: {$count} ({$percent}%)
    .update = ⚠️ Statistiken aktualisieren
    .updating = ⚠️ Statistiken werden aktualisiert... Dies kann einige Zeit in Anspruch nehmen.
adRef = <b>{$name}</b>

    <b>Gesamtzugriffe</b>: {$total}
    <b>Eindeutige Zugriffe</b>: {$uniqueCounter} ({$uniqueCounterPercent}%)
    <b>Neue Benutzer</b>: {$newCounter} ({$newCounterPercent}%)
    <b>Aktive Benutzer</b>: {$aliveCounter} ({$aliveCounterPercent}%)
    <b>Gewonnene und verlorene Spiele</b>: {$gameWin} & {$gameLose} <i>Spiele sind nicht eindeutig</i>

    <b>Erster Zugriff</b>: {$firstUsage}
    <b>Letzter Zugriff</b>: {$lastUsage}

    <b>Link</b>: <code>{$link}</code>
    .empty = Keine Kampagnen gefunden.
                Verwende <code>t.me/{ $botUsername }?start=ref-AD_CODE</code>.
    .cant = Nicht möglich
    .list = <b>📃 Werbung</b>:

                { $list }
    .listPoint = {$name}: {$total}|{$uniqueCounter}
botStat = <b>BotStat.io Konfiguration</b>

    <b>Aktueller Schlüssel</b>: {$botStatKey}
    .send = An BotStat senden
    .key = Schlüssel
    .botMan = An BotMan senden
    .alive = Nur aktive
    .enter = Gib den Schlüssel für BotStat.io ein
                <i><a href='https://botstat.io/dashboard/api'>Schlüssel erhalten</a></i>
    .update = ⚠️ BotStat aktualisieren
    .updating = ⚠️ Daten werden gesendet... Dies kann einige Zeit dauern.
updateCommands = ✅ Befehle aktualisiert
updateDescriptions = ✅ Beschreibungen aktualisiert
update = 🔄 Aktualisieren
 <b>UNO!</b>

    Trete dem Spiel bei oder füge es deiner Gruppe hinzu und genieße das legendäre UNO!
    .openWebApp = Spielen! 🚀
    .addGroup = Zur Gruppe hinzufügen
    .profile = 💼 Profil
    .share = 🆕 Zum Spiel einladen
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
