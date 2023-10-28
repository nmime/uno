name = English
#description must be less than 512 characters
description = Welcome to the UNO Bot for Telegram! Here, you can enjoy the classic card game UNO in a convenient online format.
    Invite friends or play with random opponents, competing in logic and strategy.

    Ready to play UNO? Click the button below and start the game!
#shortDescription must be less than 120 characters
shortDescription = Play UNO with people from all over the world! 🌍

    Follow @unonwsww & @unogrpww.
commands = Commands
    .admin = Admin Panel
    .start = Main Menu
    .uno = Start Game
    .language = Change Language
language = Change Language
start = 👋 Welcome to <b>UNO!</b>

    Join the game or add it to your group and enjoy the legendary UNO!
    .openWebApp = Play! 🚀
    .addGroup = Add to Group
    .profile = 💼 Profile
uno = UNO game is open for registration!

    🕹 To join the game, press the button below.
    .key = Play! 🚀
group = 👋 Hello to the whole group!

    🕹 Use the /uno command to start the game.
profile = <b>🌟 Your Profile 🌟</b>

    <b>Balance</b> { $balance } 💰

    <b>🎮 Number of Games</b>: { $gamesQuantity }
    <b>🏆 Number of Wins</b>: { $win }
    <b>💔 Number of Losses</b>: { $lose }

    <b>👥 Number of Referrals</b>: { $referralCounter }
    <b>🎁 Referral Bonus</b>: { $referralAccrual } 💰 (<i>issued after playing a game</i>)
    <b>🔗 Your Referral Link</b>: <code>{ $referralLink }</code>
    .key = Open Profile
language = 🏳️ Choose a Language
    .changed = 🏁 Language set
back = ‹ Back
admin = Admin Panel
    .statistics = 📊 Statistics
    .adRef = 📃 Promotion
    .botStat = 🤖 BotStat.io
statistics = <b>📊 Statistics</b>

    <b>Total</b>: {$all}
    <b>Alive</b>: {$alive} ({$alivePercent}%)
    <b>Without Referral</b>: {$withoutRef} ({$withoutRefPercent}%)

    <b>DAU</b>: {$dau} ({$dauPercent}%)  <b>YAU</b>: {$yau} ({$yauPercent}%)
    <b>WAU</b>: {$wau} ({$wauPercent}%)  <b>MAU</b>: {$mau} ({$mauPercent}%)

    <b>New Users:</b> <i>(total / alive / without referral)</i>
    <b>Yesterday</b>: {$forYesterday} {$aliveForYesterday} {$withoutRefForYesterday}  <b>Today</b>: {$forDay} {$aliveForDay} {$withoutRefForDay}
    <b>Week</b>: {$forWeek} {$aliveForWeek} {$withoutRefForWeek}  <b>Month</b>: {$forMonth} {$aliveForMonth} {$withoutRefForMonth}

    <b>Games</b>:
    <b>Started</b>: {$gameStarted}  <b>Completed</b>: {$gameEnded}
    <b>Currently Playing</b>: {$gameNow}
    <b>Yesterday</b>: {$gameForYesterday}  <b>Today</b>: {$gameForDay}
    <b>Week</b>: {$gameForWeek}  <b>Month</b>: {$gameForMonth}

    <b>Languages:</b>
    {$langCodesString}
    .getting = Getting statistics...
    .langCode = {$code}: {$count} ({$percent}%)
adRef = <b>{$name}</b>

    <b>Total Clicks</b>: {$total}
    <b>Unique Clicks</b>: {$uniqueCounter} ({$uniqueCounterPercent}%)
    <b>New Users</b>: {$newCounter} ({$newCounterPercent}%)
    <b>Alive Users</b>: {$aliveCounter} ({$aliveCounterPercent}%)
    <b>Games Won and Lost</b>: {$gameWin} & {$gameLose} <i>games are not unique</i>

    <b>First Usage</b>: {$firstUsage}
    <b>Last Usage</b>: {$lastUsage}

    <b>Link</b>: <code>{$link}</code>
    .empty = Campaigns not found.
                Use <code>t.me/{ $botUsername }?start=ref-AD_CODE</code>.
    .cant = Cannot
    .list = <b>📃 Promotion</b>:

                { $list }
    .listPoint = {$name}: {$total} {$uniqueCounter}
botStat = <b>BotStat.io Setup</b>

    <b>Current Key</b>: {$botStatKey}
    .send = Send to BotStat
    .key = Key
    .botMan = Send to BotMan
    .alive = Only Alive
    .enter = Enter the key for BotStat.io
                <i><a href='https://botstat.io/dashboard/api'>get the key</a></i>
updateCommands = ✅ Commands updated
updateDescriptions = ✅ Descriptions updated
update = 🔄 Refresh
