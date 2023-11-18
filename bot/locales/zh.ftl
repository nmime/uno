name = 简体中文
# 描述必须少于512个字符
description = 欢迎使用Telegram上的UNO机器人！在这里，您可以在便捷的在线模式下享受经典的UNO纸牌游戏。
    召唤朋友或与随机对手对战，在逻辑和策略上竞争。

    准备好玩UNO了吗？点击下面的按钮开始游戏！
# 简短描述必须少于120个字符
shortDescription = 与全球玩家一起玩UNO！ 🌍

    订阅 @unonwsww 和 @unogrpww。
commands = 命令
    .admin = 管理面板
    .start = 主菜单
    .uno = 开始游戏
    .language = 切换语言
    .profile = 个人资料
language = 切换语言
start = 👋 欢迎来到 <b>UNO！</b>

    订阅 @unonwsww 并加入 @unogrpww.

    参与游戏或将其添加到群组中，享受传奇UNO！
    .openWebApp = 玩游戏！ 🚀
    .addGroup = 添加到群组
    .profile = 💼 个人资料
    .share = 🆕 邀请游戏
uno = <b>🎮 UNO游戏已开放报名！</b>

    🔆 { $status }
    <b>💼 押注</b>: { $bet } 💰
    <b>👥 玩家</b> { $playersCount } / { $maxPlayers }

    🕹 点击下面的按钮加入游戏。
    .key = 玩游戏！ 🚀
    .waiting = 等待玩家...
    .playing = 游戏已开始！
    .ended = 游戏结束，您可以再次加入！
    .update = 🔄 更新
group = 👋 向所有群组成员打招呼！

    使用 /uno 命令开始游戏。
profile = <b>🌟 您的个人资料 🌟</b>

    <b>余额</b> { $balance } 💰

    <b>🎮 游戏数量</b>: { $gamesQuantity }
    <b>🏆 胜利次数</b>: { $win }
    <b>💔 失败次数</b>: { $lose }

    <b>👥 推荐人数量</b>: { $referralCounter }
    <b>🎁 推荐奖励</b>: { $referralAccrual } 💰 (<i>游戏结束后发放</i>)
    <b>🔗 您的推荐链接</b>: <code>{ $referralLink }</code>
    .key = 打开个人资料
language = 🏳️ 选择语言
    .changed = 🏁 语言已设置
back = ‹ 返回
inlineShare = <b>UNO游戏已开放报名！</b>

    🕹 点击下面的按钮加入游戏。
    .title = 🆕 邀请游戏
    .key = 玩游戏！ 🚀
admin = 管理面板
    .statistics = 📊 统计信息
    .adRef = 📃 推广
    .botStat = 🤖 BotStat.io
statistics = <b>📊 统计信息</b>
    <b><u>用户</u></b>:
    <b>总数</b>: {$all}
    <b>在线</b>: {$alive} ({$alivePercent}%)
    <b>没有推荐人</b>: {$withoutRef} ({$withoutRefPercent}%)

    <b>DAU</b>: {$dau} ({$dauPercent}%)  <b>YAU</b>: {$yau} ({$yauPercent}%)
    <b>WAU</b>: {$wau} ({$wauPercent}%)  <b>MAU</b>: {$mau} ({$mauPercent}%)

    <b>新用户:</b> <i>(总数 / 在线 / 没有推荐人)</i>
    <b>昨天</b>: {$forYesterday}|{$aliveForYesterday}|{$withoutRefForYesterday}  <b>今天</b>: {$forDay}|{$aliveForDay}|{$withoutRefForDay}
    <b>本周</b>: {$forWeek}|{$aliveForWeek}|{$withoutRefForWeek}  <b>本月</b>: {$forMonth}|{$aliveForMonth}|{$withoutRefForMonth}

    <b>语言</b>:
    {$langCodesString}

    <b><u>群组</u></b>:
    <b>总数</b>: {$allGroups}
    <b>在线</b>: {$aliveGroups} ({$alivePercentGroups}%)

    <b>DAU</b>: {$dauGroups} ({$dauPercentGroups}%)  <b>YAU</b>: {$yauGroups} ({$yauPercentGroups}%)
    <b>WAU</b>: {$wauGroups} ({$wauPercentGroups}%)  <b>MAU</b>: {$mauGroups} ({$mauPercentGroups}%)

    <b>新用户:</b> <i>(总数 / 在线)</i>
    <b>昨天</b>: {$forYesterdayGroups}|{$aliveForYesterdayGroups}  <b>今天</b>: {$forDayGroups}|{$aliveForDayGroups}
    <b>本周</b>: {$forWeekGroups}|{$aliveForWeekGroups}  <b>本月</b>: {$forMonthGroups}|{$aliveForMonthGroups}

    <b><u>游戏</u></b>:
    <b>已开始</b>: {$gameStarted}  <b>已结束</b>: {$gameEnded}
    <b>当前游戏</b>: {$gameNow}
    <b>昨天</b>: {$gameForYesterday}  <b>今天</b>: {$gameForDay}
    <b>本周</b>: {$gameForWeek}  <b>本月</b>: {$gameForMonth}
    .getting = 获取统计信息...
    .langCode = {$code}: {$count} ({$percent}%)
    .update = ⚠️ 重新计算统计信息
    .updating = ⚠️ 正在更新数据... 这可能需要一些时间。
adRef = <b>{$name}</b>

    <b>总跳转</b>: {$total}
    <b>唯一跳转</b>: {$uniqueCounter} ({$uniqueCounterPercent}%)
    <b>新用户跳转</b>: {$newCounter} ({$newCounterPercent}%)
    <b>活跃用户跳转</b>: {$aliveCounter} ({$aliveCounterPercent}%)
    <b>游戏胜利和失败</b>: {$gameWin} & {$gameLose} <i>游戏不是唯一的</i>

    <b>第一次跳转</b>: {$firstUsage}
    <b>最后一次跳转</b>: {$lastUsage}

    <b>链接</b>: <code>{$link}</code>
    .empty = 没有找到广告。
                    使用 <code>t.me/{ $botUsername }?start=ref-AD_CODE</code>。
    .cant = 无法
    .list = <b>📃 推广</b>:

                { $list }
    .listPoint = {$name}: {$total}|{$uniqueCounter}
botStat = <b>BotStat.io 设置</b>

    <b>当前密钥</b>: {$botStatKey}
    .send = 发送到 BotStat
    .key = 密钥
    .botMan = 发送到 BotMan
    .alive = 仅活动用户
    .enter = 输入 BotStat.io 密钥
                <i><a href='https://botstat.io/dashboard/api'>获取密钥</a></i>
    .update = ⚠️ 更新 BotStat
    .updating = ⚠️ 正在发送数据... 这可能需要一些时间。
updateCommands = ✅ 更新命令
updateDescriptions = ✅ 更新描述
update = 🔄 更新