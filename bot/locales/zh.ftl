name = 俄语
start = 👋 欢迎来到 <b>UNO!</b>

    加入游戏或加入群组，享受传奇UNO的乐趣！
    .openWebApp = 玩游戏！🚀
    .addGroup = 加入群组
    .profile = 💼 个人资料
uno = UNO游戏开放报名！

    🕹 要加入游戏，请点击下面的按钮。
    .key = 玩游戏！🚀
group = 👋 欢迎所有群组成员！

    🕹 使用/uno命令开始游戏。
profile = <b>🌟 你的个人资料 🌟</b>

    <b>余额</b> { $balance } 💰

    <b>🎮 游戏次数</b>: { $gamesQuantity }
    <b>🏆 胜利次数</b>: { $win }
    <b>💔 失败次数</b>: { $lose }

    <b>👥 推荐人数</b>: { $referralCounter }
    <b>🎁 推荐奖金</b>: { $referralAccrual } 💰 (<i>游戏结束后发放</i>)
    <b>🔗 你的推荐链接</b>: <code>{ $referralLink }</code>
    .key = 打开个人资料
language = 🏳️ 选择语言
    .changed = 🏁 语言设置完成
back = ‹ 返回
admin = 管理员面板
    .statistics = 📊 统计信息
    .adRef = 📃 推广
    .botStat = 🤖 BotStat.io
statistics = <b>📊 统计信息</b>

    <b>总计</b>: {$all}
    <b>活跃</b>: {$alive} ({$alivePercent}%)
    <b>无推荐的活跃用户</b>: {$withoutRef} ({$withoutRefPercent}%)

    <b>DAU</b>: {$dau} ({$dauPercent}%)  <b>YAU</b>: {$yau} ({$yauPercent}%)
    <b>WAU</b>: {$wau} ({$wauPercent}%)  <b>MAU</b>: {$mau} ({$mauPercent}%)

    <b>新增用户:</b> <i>(总计 / 活跃 / 无推荐的活跃用户)</i>
    <b>昨天</b>: {$forYesterday} {$aliveForYesterday} {$withoutRefForYesterday}  <b>今天</b>: {$forDay} {$aliveForDay} {$withoutRefForDay}
    <b>本周</b>: {$forWeek} {$aliveForWeek} {$withoutRefForWeek}  <b>本月</b>: {$forMonth} {$aliveForMonth} {$withoutRefForMonth}

    <b>游戏:</b>
    <b>开始的游戏</b>: {$gameStarted}  <b>结束的游戏</b>: {$gameEnded}
    <b>正在进行的游戏</b>: {$gameNow}
    <b>昨天</b>: {$gameForYesterday}  <b>今天</b>: {$gameForDay}
    <b>本周</b>: {$gameForWeek}  <b>本月</b>: {$gameForMonth}

    <b>语言:</b>
    {$langCodesString}
    .getting = 获取统计信息...
    .langCode = {$code}: {$count} ({$percent}%)
adRef = <b>{$name}</b>

    <b>总点击次数</b>: {$total}
    <b>独立点击次数</b>: {$uniqueCounter} ({$uniqueCounterPercent}%)
    <b>新增用户数</b>: {$newCounter} ({$newCounterPercent}%)
    <b>活跃用户数</b>: {$aliveCounter} ({$aliveCounterPercent}%)
    <b>游戏赢和输的次数</b>: {$gameWin} & {$gameLose} <i>这些游戏不是唯一的</i>

    <b>第一次点击</b>: {$firstUsage}
    <b>最后一次点击</b>: {$lastUsage}

    <b>链接</b>: <code>{$link}</code>
    .empty = 未找到任何推广活动。
                使用<code>t.me/{ $botUsername }?start=ref-AD_CODE</code>。
    .cant = 无法完成
    .list = <b>📃 推广</b>:

                { $list }
    .listPoint = {$name}: {$total} {$uniqueCounter}
botStat = <b>BotStat.io 设置</b>

    <b>当前密钥</b>: {$botStatKey}
    .send = 发送到 BotStat
    .key = 密钥
    .botMan = 发送到 BotMan
    .alive = 仅活跃用户
    .enter = 输入 BotStat.io 密钥
                <i><a href='https://botstat.io/dashboard/api'>获取密钥</a></i>
update = 🔄 更新
