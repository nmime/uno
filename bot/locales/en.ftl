name = English
start = 👋 Welcome to <b>UNO!</b>

    Join the game or add it to your group and enjoy the legendary UNO!
    .openWebApp = Play! 🚀
    .addGroup = Add to Group
    .profile = 💼 Profile
uno = Open registration for UNO!

    🕹 To join the game, click the button below.
    .key = Play! 🚀
group = 👋 Hello to the entire group!

    🕹 Use the /uno command to start the game.
profile = <b>🌟 Your Profile 🌟</b>

    <b>Balance</b> { $balance } 💰

    <b>🎮 Number of Games</b>: { $gamesQuantity }
    <b>🏆 Number of Wins</b>: { $win }
    <b>💔 Number of Losses</b>: { $lose }

    <b>👥 Number of Referrals</b>: { $referralCounter }
    <b>🎁 Referral Bonus</b>: { $referralAccrual } 💰 (<i>awarded after playing a game</i>)
    <b>🔗 Your Referral Link</b>: <code>{ $referralLink }</code>
    .key = Open Profile
language = 🏳️ Choose a language
    .changed = 🏁 Language set
back = ‹ Back
admin = Admin Panel
    .statistics = 📊 Statistics
    .adRef = 📃 Promotion
    .botStat = 🤖 BotStat.io
statistics = <b>📊 Statistics</b>

    <b>Total</b>: {$all}
    <b>Active</b>: {$alive} ({$alivePercent}%)
    <b>Without Referrals</b>: {$withoutRef} ({$withoutRefPercent}%)

    <b>DAU</b>: {$dau} ({$dauPercent}%)  <b>YAU</b>: {$yau} ({$yauPercent}%)
    <b>WAU</b>: {$wau} ({$wauPercent}%)  <b>MAU</b>: {$mau} ({$mauPercent}%)

    <b>New Users:</b> <i>(Total / Active / Without Referrals)</i>
    <b>Yesterday</b>: {$forYesterday} {$aliveForYesterday} {$withoutRefForYesterday}  <b>Today</b>: {$forDay} {$aliveForDay} {$withoutRefForDay}
    <b>Week</b>: {$forWeek} {$aliveForWeek} {$withoutRefForWeek}  <b>Month</b>: {$forMonth} {$aliveForMonth} {$withoutRefForMonth}

    <b>Games:</b>
    <b>Started</b>: {$gameStarted}  <b>Ended</b>: {$gameEnded}
    <b>Currently Playing</b>: {$gameNow}
    <b>Yesterday</b>: {$gameForYesterday}  <b>Today</b>: {$gameForDay}
    <b>Week</b>: {$gameForWeek}  <b>Month</b>: {$gameForMonth}

    <b>Languages:</b>
    {$langCodesString}
    .getting = Fetching statistics...
    .langCode = {$code}: {$count} ({$percent}%)
adRef = <b>{$name}</b>

    <b>Total Clicks</b>: {$total}
    <b>Unique Clicks</b>: {$uniqueCounter} ({$uniqueCounterPercent}%)
    <b>New Users</b>: {$newCounter} ({$newCounterPercent}%)
    <b>Active Users</b>: {$aliveCounter} ({$aliveCounterPercent}%)
    <b>Games Won and Lost</b>: {$gameWin} & {$gameLose} <i>games are not unique</i>

    <b>First Click</b>: {$firstUsage}
    <b>Last Click</b>: {$lastUsage}

    <b>Link</b>: <code>{$link}</code>
    .empty = No campaigns found.
                Use <code>t.me/{ $botUsername }?start=ref-AD_CODE</code>.
    .cant = Cannot
    .list = <b>📃 Promotion</b>:

                { $list }
    .listPoint = {$name}: {$total} {$uniqueCounter}
botStat = <b>BotStat.io Settings</b>

    <b>Current Key</b>: {$botStatKey}
    .send = Send to BotStat
    .key = Key
    .botMan = Send to BotMan
    .alive = Only active users
    .enter = Enter the key for BotStat.io
                <i><a href='https://botstat.io/dashboard/api'>get the key</a></i>
update = 🔄 Update
