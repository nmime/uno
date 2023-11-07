name = 简体中文
# 描述必须少于512个字符
description = 欢迎使用Telegram的UNO-Bot！在这里，您可以在便捷的在线模式下享受经典的UNO纸牌游戏。
    邀请您的朋友或与随机对手一起玩，竞争智力和策略。

    准备好玩UNO了吗？点击下面的按钮开始游戏！
# 简短描述必须少于120个字符
shortDescription = 与来自世界各地的人玩UNO！🌍

    关注 @unonwsww 和 @unogrpww。
commands = 命令
    .admin = 管理员面板
    .start = 主菜单
    .uno = 开始游戏
    .language = 切换语言
language = 切换语言
start = 👋 欢迎来到<b>UNO！</b>

    加入游戏或将其添加到群组中，享受传奇的UNO！
    .openWebApp = 玩游戏！🚀
    .addGroup = 添加到群组
    .profile = 💼 个人资料
uno = 开放UNO游戏注册！

    🕹 要加入游戏，请点击下面的按钮。
    .key = 玩游戏！🚀
group = 👋 各位群组成员，你好！

    使用/uno命令开始游戏。
profile = <b>🌟 你的个人资料 🌟</b>

    <b>余额</b> { $balance } 💰

    <b>🎮 游戏次数</b>: { $gamesQuantity }
    <b>🏆 胜利次数</b>: { $win }
    <b>💔 失败次数</b>: { $lose }

    <b>👥 推荐人数</b>: { $referralCounter }
    <b>🎁 推荐奖金</b>: { $referralAccrual } 💰（<i>在玩游戏后发放</i>）
    <b>🔗 你的推荐链接</b>: <code>{ $referralLink }</code>
    .key = 打开个人资料
language = 🏳️ 选择语言
    .changed = 🏁 语言已设置
back = ‹ 返回
inlineShare = 🎮 UNO游戏招新中！

    🕹 要加入游戏，请点击下面的按钮。
    .title = 🆕 邀请加入游戏
    .key = 玩游戏！🚀
admin = 管理员面板
    .statistics = 📊 统计数据
    .adRef = 📃 推广
    .botStat = 🤖 BotStat.io
statistics = <b>📊 统计数据</b>

    <b>总数</b>: {$all}
    <b>活跃</b>: {$alive}（{$alivePercent}%）
    <b>无推荐人</b>: {$withoutRef}（{$withoutRefPercent}%）

    <b>DAU</b>: {$dau}（{$dauPercent}%）  <b>YAU</b>: {$yau}（{$yauPercent}%）
    <b>WAU</b>: {$wau}（{$wauPercent}%）  <b>MAU</b>: {$mau}（{$mauPercent}%）

    <b>新用户：</b> <i>（总数 / 活跃 / 无推荐人）</i>
    <b>昨天</b>: {$forYesterday} {$aliveForYesterday} {$withoutRefForYesterday}  <b>今天</b>: {$forDay} {$aliveForDay} {$withoutRefForDay}
    <b>一周</b>: {$forWeek} {$aliveForWeek} {$withoutRefForWeek}  <b>一个月</b>: {$forMonth} {$aliveForMonth} {$withoutRefForMonth}

    <b>游戏：</b>
    <b>已开始</b>: {$gameStarted}  <b>已结束</b>: {$gameEnded}
    <b>当前进行中</b>: {$gameNow}
    <b>昨天</b>: {$gameForYesterday}  <b>今天</b>: {$gameForDay}
    <b>一周</b>: {$gameForWeek}  <b>一个月</b>: {$gameForMonth}

    <b>语言：</b>
    {$langCodesString}
    .getting = 获取统计数据...
    .langCode = {$code}: {$count}（{$percent}%）
adRef = <b>{$name}</b>

    <b>总点击次数</b>: {$total}
    <b>唯一点击次数</b>: {$uniqueCounter}（{$uniqueCounterPercent}%）
    <b>新用户</b>: {$newCounter}（{$newCounterPercent}%）
    <b>活跃用户</b>: {$aliveCounter}（{$aliveCounterPercent}%）
    <b>赢得和失去的游戏</b>: {$gameWin} & {$gameLose} <i>游戏不唯一</i>

    <b>首次点击</b>: {$firstUsage}
    <b>最后点击</b>: {$lastUsage}

    <b>链接</b>: <code>{$link}</code>
    .empty = 未找到任何推广活动。
                使用<code>t.me/{ $botUsername }?start=ref-AD_CODE</code>。
    .cant = 无法
    .list = <b>📃 推广</b>:

                { $list }
botStat = <b>BotStat.io 设置</b>

    <b>当前密钥</b>: {$botStatKey}
    .send = 发送到BotStat
    .key = 密钥
    .botMan = 发送到BotMan
    .alive = 仅活跃用户
    .enter = 输入BotStat.io的密钥
                <i><a href='https://botstat.io/dashboard/api'>获取密钥</a></i>
updateCommands = ✅ 更新命令
updateDescriptions = ✅ 更新描述
update = 🔄 更新
