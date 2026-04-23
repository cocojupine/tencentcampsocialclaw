import { useEffect, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { ConversationList } from './components/ConversationList'
import { Sidebar } from './components/Sidebar'
import { ChatArea } from './components/chat/ChatArea'
import type {
  AgentCard,
  AgentCardAction,
  Conversation,
  Message,
  QClawTrackedCard,
  Scenario,
  ScenarioId,
  ThreadComment
} from './types/chat'

const conversations: Conversation[] = [
  {
    id: 'industrial-camp',
    name: '工业设计大本营',
    preview: '洪老师：附件 2 已经放群文件，记得今晚前提交报名表。',
    time: '10:26',
    unreadCount: 0,
    avatar: '工',
    muted: true
  },
  {
    id: 'otaku-group',
    name: '二次元吃土群',
    preview: '阿满：今晚先挂王者缺一，后面还有剧透贴和立牌拼团贴。',
    time: '22:41',
    unreadCount: 4,
    avatar: '二',
    description: '围绕周边、游戏、番剧和线下活动的长期群聊。',
    active: true
  },
  {
    id: 'figure-buddies',
    name: '川川邦邦同好会',
    preview: '彩立方：限定徽章已经开预订了，谁来做个统计？',
    time: '22:14',
    unreadCount: 1,
    avatar: '川'
  },
  {
    id: 'music-club',
    name: '梶浦音乐共享会',
    preview: '青苔草圆：周五 LIVE 场贩准备抢哪一套？',
    time: '21:45',
    unreadCount: 0,
    avatar: '梶'
  },
  {
    id: 'weekend-plan',
    name: '周末去哪玩',
    preview: '不想加班：天气好的话要不要去看展然后吃火锅。',
    time: '20:18',
    unreadCount: 2,
    avatar: '周'
  }
]

const scenarioMap: Record<ScenarioId, Scenario> = {
  'team-up': {
    id: 'team-up',
    name: '王者缺一',
    triggerLine: '先挂顶栏入口，再进入贴内组队讨论。',
    summary: '把一句“缺一”变成一个可加入、可追踪的组队入口。',
    messages: [
      {
        id: 'team-m1',
        senderId: 'aman',
        sender: '阿满',
        avatar:
          'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=120&q=80',
        content: '今晚十点后有人在线吗？我们四排还差一个打野位。',
        time: '21:36',
        isSelf: false
      },
      {
        id: 'team-m2',
        senderId: 'rise',
        sender: 'Rise',
        avatar:
          'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=80',
        content: '我辅助位已经锁了，如果有人补上就能直接开。',
        time: '21:38',
        isSelf: false
      },
      {
        id: 'team-m3',
        senderId: 'self',
        sender: '我',
        avatar:
          'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=120&q=80',
        content: '要不我挂个“王者缺一”入口，看到的人直接点进去补位就行。',
        time: '21:40',
        isSelf: true
      }
    ],
    suggestion: {
      id: 'team-s1',
      sourceMessageId: 'team-m3',
      title: '龙虾建议',
      body: '这句话适合转成顶部悬挂入口，群里的人会先看到入口，再决定要不要进贴补位。',
      confirmLabel: '挂组队入口',
      dismissLabel: '先不挂'
    },
    card: {
      id: 'team-card',
      templateId: 'team-up-post',
      sourceMessageId: 'team-m3',
      title: '今晚开黑缺一',
      description: '入口挂上去后，群友点开就能看到坑位、节奏和龙虾的追踪建议。',
      statusText: '4/5 人，缺 1 个打野',
      status: 'suggested',
      accent: 'from-sky-500 via-cyan-500 to-emerald-400',
      badge: '组队贴',
      metaLabel: '王者荣耀 · 今晚 22:00',
      progress: { current: 4, total: 5, unit: '人' },
      tags: ['打野位', '即时开局'],
      actions: [
        { id: 'join_team', label: '加入', style: 'primary' },
        { id: 'remind_team', label: '提醒我', style: 'secondary' },
        { id: 'close_team', label: '结束', style: 'ghost' }
      ],
      note: '入口挂上后，主群不需要重复刷屏。'
    },
    thread: {
      title: '今晚王者缺一',
      subtitle: '补位、确认和追踪都在贴内完成，主群只保留一个入口。',
      statusPill: '顶栏悬挂中',
      entry: {
        label: '王者缺一',
        summary: '4/5 人，缺打野，点开直接补位',
        pill: '组队贴'
      },
      comments: [
        {
          id: 'team-c1',
          author: '阿满',
          role: 'user',
          content: '我这边射手位已经就绪，主要缺一个打野位，能来就直接开。',
          time: '21:41'
        },
        {
          id: 'team-c2',
          author: 'Rise',
          role: 'user',
          content: '我可以帮忙盯一下还差什么位置，有人点入口就提醒我。',
          time: '21:42'
        },
        {
          id: 'team-c3',
          author: 'QClaw',
          role: 'qclaw',
          content:
            '当前最适合继续保留顶栏入口，直到最后一个坑位补满。我可以继续帮你追踪是否还差打野。',
          time: '21:42'
        }
      ],
      qclawPrompts: [
        {
          id: 'team-q1',
          label: '@Qclaw 还差什么位置？',
          ask: '@Qclaw 现在还差什么位置，适不适合继续挂顶栏？',
          response: '现在只差一个打野位，入口继续挂在顶栏最有效。建议保留到第五人加入或到 22:00。'
        },
        {
          id: 'team-q2',
          label: '@Qclaw 要不要再提醒一次？',
          ask: '@Qclaw 帮我判断一下，要不要再提醒群里一次？',
          response: '适合再提醒一次，但不需要刷主群。继续依赖顶部入口，会比发第二条消息更自然。'
        }
      ]
    }
  },
  'spoiler-thread': {
    id: 'spoiler-thread',
    name: '剧透聊天贴',
    triggerLine: '先挂顶栏入口，再把真正的剧情讨论收进贴里。',
    summary: '让想聊的人有地方聊，也让不想看的人只看到边界。',
    messages: [
      {
        id: 'spoiler-m1',
        senderId: 'yuzu',
        sender: '柚子',
        avatar:
          'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=80',
        content: '你们看完最新一话了吗？我真的很想聊结尾那个反转。',
        time: '20:55',
        isSelf: false
      },
      {
        id: 'spoiler-m2',
        senderId: 'aman',
        sender: '阿满',
        avatar:
          'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=120&q=80',
        content: '先别直接在群里聊，我还没补到那一话，真的会被扎心。',
        time: '20:56',
        isSelf: false
      },
      {
        id: 'spoiler-m3',
        senderId: 'self',
        sender: '我',
        avatar:
          'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=120&q=80',
        content: '我把这段挂成顶部剧透入口吧，想聊的人点进去，不想看的人只看到入口。',
        time: '20:57',
        isSelf: true
      }
    ],
    suggestion: {
      id: 'spoiler-s1',
      sourceMessageId: 'spoiler-m3',
      title: '龙虾建议',
      body: '这句话适合转成剧透入口。挂在顶栏后，主群只看到边界，不会直接看到剧情内容。',
      confirmLabel: '挂剧透入口',
      dismissLabel: '继续原聊'
    },
    card: {
      id: 'spoiler-card',
      templateId: 'spoiler-thread-post',
      sourceMessageId: 'spoiler-m3',
      title: '最新一话剧透贴',
      description: '这不是把讨论删掉，而是给它一个有边界的容器。入口在顶栏，内容在贴内。',
      statusText: '主群只见入口，不见剧透内容',
      status: 'suggested',
      accent: 'from-fuchsia-500 via-violet-500 to-indigo-400',
      badge: '剧透贴',
      metaLabel: '最新一话 · 安全分流',
      tags: ['防剧透', '边界入口'],
      actions: [
        { id: 'open_thread', label: '进入贴子', style: 'primary' },
        { id: 'mute_thread', label: '不看剧透', style: 'secondary' },
        { id: 'close_thread', label: '结束', style: 'ghost' }
      ],
      note: '重点是把讨论安放好，而不是用 AI 打断聊天。'
    },
    thread: {
      title: '最新一话剧透讨论',
      subtitle: '主群只留入口，真正的剧情讨论在这里继续，也可以直接 @QClaw 请求整理。',
      statusPill: '安全分流中',
      entry: {
        label: '最新一话剧透贴',
        summary: '点开进入贴内聊反转，主群不展示内容',
        pill: '剧透贴'
      },
      comments: [
        {
          id: 'spoiler-c1',
          author: '柚子',
          role: 'user',
          content: '终于有地方聊了，我最想说的是结尾那个镜头真的把前面所有线索都串起来了。',
          time: '20:58'
        },
        {
          id: 'spoiler-c2',
          author: 'QClaw',
          role: 'qclaw',
          content:
            '目前主群仍只展示入口。如果你们想继续聊细节，我可以在贴内帮你们整理时间线或关键伏笔。',
          time: '20:59'
        }
      ],
      qclawPrompts: [
        {
          id: 'spoiler-q1',
          label: '@Qclaw 整理时间线',
          ask: '@Qclaw 帮我整理一下这一话的关键时间线，发在贴里。',
          response:
            '我整理了一版不跳出当前讨论范围的时间线：前半段埋线，后半段回收，再用结尾镜头完成反转闭环。'
        },
        {
          id: 'spoiler-q2',
          label: '@Qclaw 给后来的人提示',
          ask: '@Qclaw 如果后面有人点进来，帮我写一句安全提示。',
          response: '可以在贴首加一句：以下内容默认已看完最新一话，未补完的人建议先退出。'
        }
      ]
    }
  },
  'standee-group-buy': {
    id: 'standee-group-buy',
    name: '立牌拼团',
    triggerLine: '先挂顶栏入口，再在贴里追踪意向和提醒。',
    summary: '只收集意向和追踪，不碰支付与交易。',
    messages: [
      {
        id: 'standee-m1',
        senderId: 'aman',
        sender: '阿满',
        avatar:
          'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=120&q=80',
        content: '月底那套角色立牌要开了，有没有人想一起拼团减邮？',
        time: '21:37',
        isSelf: false
      },
      {
        id: 'standee-m2',
        senderId: 'yuzu',
        sender: '柚子',
        avatar:
          'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=80',
        content: '我有兴趣，但想先看看大概能凑到几个人，不想最后只有两个人硬拼。',
        time: '21:39',
        isSelf: false
      },
      {
        id: 'standee-m3',
        senderId: 'self',
        sender: '我',
        avatar:
          'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=120&q=80',
        content: '那我挂个立牌拼团入口吧，只追踪意向和提醒，不做付款。',
        time: '21:40',
        isSelf: true
      }
    ],
    suggestion: {
      id: 'standee-s1',
      sourceMessageId: 'standee-m3',
      title: '龙虾建议',
      body: '这句话适合转成顶部立牌拼团入口。先让意向可见，再在贴内持续追踪，不碰交易。',
      confirmLabel: '挂拼团入口',
      dismissLabel: '先口头聊'
    },
    card: {
      id: 'standee-card',
      templateId: 'standee-group-buy-post',
      sourceMessageId: 'standee-m3',
      title: '角色立牌拼团追踪',
      description: '入口挂上去后，群友能先表达意向、继续追踪人数，也能问龙虾下一步怎么做更自然。',
      statusText: '目标 6 人，目前 2 人感兴趣',
      status: 'suggested',
      accent: 'from-amber-400 via-orange-400 to-rose-400',
      badge: '拼团贴',
      metaLabel: '立牌拼团 · 仅追踪意向',
      progress: { current: 2, total: 6, unit: '人' },
      tags: ['立牌', '只统计意向'],
      actions: [
        { id: 'mark_interested', label: '我有兴趣', style: 'primary' },
        { id: 'remind_group_buy', label: '成团提醒', style: 'secondary' },
        { id: 'view_tracker', label: '查看进度', style: 'ghost' }
      ],
      note: '把“想买”从一句话变成可追踪的公共结构。'
    },
    thread: {
      title: '角色立牌拼团追踪',
      subtitle: '这里只聚合意向、备注和提醒。后续是否真的拼团，仍由群友自己决定。',
      statusPill: '追踪中',
      entry: {
        label: '立牌拼团',
        summary: '2/6 人感兴趣，点开继续追踪',
        pill: '拼团贴'
      },
      comments: [
        {
          id: 'standee-c1',
          author: '阿满',
          role: 'user',
          content: '我比较想拼主角和双人款，如果人数够我愿意继续跟。',
          time: '21:41'
        },
        {
          id: 'standee-c2',
          author: 'QClaw',
          role: 'qclaw',
          content:
            '当前贴子只做意向追踪，不涉及收款。你们可以继续在这里问我人数、提醒时机和追踪建议。',
          time: '21:42'
        }
      ],
      qclawPrompts: [
        {
          id: 'standee-q1',
          label: '@Qclaw 现在多少人了？',
          ask: '@Qclaw 目前有多少人表达了兴趣，离目标还差多少？',
          response:
            '当前有 2 人明确感兴趣，离 6 人目标还差 4 人。继续挂在顶栏会比重复在主群里提醒更自然。'
        },
        {
          id: 'standee-q2',
          label: '@Qclaw 什么时候适合提醒？',
          ask: '@Qclaw 什么时候再提醒大家比较合适，不会显得太打扰？',
          response: '建议在新增 1 到 2 人后再提醒一次，或者等临近截单时间再做一轮轻提醒。'
        }
      ]
    }
  }
}

const scenarioTabs: Array<{ id: ScenarioId; name: string }> = [
  { id: 'team-up', name: '王者缺一' },
  { id: 'spoiler-thread', name: '剧透聊天贴' },
  { id: 'standee-group-buy', name: '立牌拼团' }
]

function cloneCard(card: AgentCard): AgentCard {
  return {
    ...card,
    progress: card.progress ? { ...card.progress } : undefined,
    tags: card.tags ? [...card.tags] : undefined,
    actions: [...card.actions]
  }
}

function cloneThreadComments(comments: ThreadComment[]): ThreadComment[] {
  return comments.map((comment) => ({ ...comment }))
}

function buildManualQclawReply(scenarioId: ScenarioId, message: string): string {
  if (scenarioId === 'team-up') {
    if (message.includes('位置') || message.includes('还差')) {
      return '现在还差一个打野位，继续挂在顶栏最有效。'
    }
    return '这张组队贴最适合继续悬挂到补满为止，我会优先帮你追踪坑位变化。'
  }

  if (scenarioId === 'spoiler-thread') {
    if (message.includes('整理') || message.includes('时间线')) {
      return '我可以先在贴内整理一版时间线摘要，再让后来进入的人快速跟上讨论。'
    }
    return '这类讨论保持在贴内最安全，主群继续只展示入口即可。'
  }

  if (message.includes('提醒') || message.includes('多少人')) {
    return '现在最适合继续追踪意向，不要着急催单。等新增 1 到 2 人后再提醒会更自然。'
  }

  return '当前这张贴仍然适合保留在顶栏，用来持续聚拢意向和追踪状态。'
}

function App(): React.JSX.Element {
  const [selectedConversationId, setSelectedConversationId] = useState('otaku-group')
  const [scenarioId, setScenarioId] = useState<ScenarioId>('team-up')
  const [privateSuggestionVisible, setPrivateSuggestionVisible] = useState(true)
  const [entryVisible, setEntryVisible] = useState(false)
  const [threadOpen, setThreadOpen] = useState(false)
  const [activeCard, setActiveCard] = useState<AgentCard>(() =>
    cloneCard(scenarioMap['team-up'].card)
  )
  const [threadComments, setThreadComments] = useState<ThreadComment[]>(() =>
    cloneThreadComments(scenarioMap['team-up'].thread.comments)
  )
  const [qclawTrackedCards, setQClawTrackedCards] = useState<QClawTrackedCard[]>([])
  const [trackerMessages, setTrackerMessages] = useState<Message[]>([]) // 新增：追踪中心的消息流状态

  const selectedConversation = useMemo(() => {
    if (selectedConversationId === 'qclaw-tracker') {
      return {
        id: 'qclaw-tracker',
        name: 'QClaw 追踪中心',
        preview: '追踪你订阅的卡片信息',
        time: '',
        unreadCount: 0,
        avatar: 'Q',
        description: '你订阅的卡片信息将在这里聚合展示。',
        active: true
      }
    }
    return conversations.find((conversation) => conversation.id === selectedConversationId) ?? conversations[0]
  }, [selectedConversationId, conversations])

  const activeScenario = useMemo(() => {
    if (selectedConversationId === 'qclaw-tracker') {
      // 为 QClaw 追踪中心创建一个虚拟的 Scenario
      return {
        id: 'qclaw-tracker' as ScenarioId,
        name: 'QClaw 追踪中心',
        triggerLine: '你订阅的卡片信息将在这里聚合展示。',
        summary: '聚合追踪卡片',
        messages: [
          ...qclawTrackedCards.map((trackedCard) => ({
            id: trackedCard.id,
            senderId: 'qclaw',
            sender: 'QClaw',
            avatar: 'Q',
            content: `正在追踪来自 [${
              conversations.find((c) => c.id === trackedCard.conversationId)?.name || '未知群聊'
            }] 的卡片：`,
            time: dayjs(trackedCard.subscribedAt).format('HH:mm'),
            isSelf: false,
            card: trackedCard.card
          })),
          ...trackerMessages
        ],
        suggestion: {
          id: 'qclaw-s1',
          sourceMessageId: '',
          title: 'QClaw 提示',
          body: '这里展示你订阅的卡片信息。',
          confirmLabel: '好的',
          dismissLabel: '关闭'
        },
        card: {
          id: 'qclaw-card',
          templateId: 'team-up-post', // 可以是任意一个模板，这里只是为了结构完整
          sourceMessageId: '',
          title: 'QClaw 追踪中心',
          description: '你订阅的卡片信息将在这里聚合展示。',
          statusText: `${qclawTrackedCards.length} 张卡片`,
          status: 'active',
          accent: 'from-blue-500 via-indigo-500 to-purple-400',
          badge: '追踪',
          metaLabel: '实时更新',
          actions: []
        },
        thread: {
          title: 'QClaw 追踪中心',
          subtitle: '你订阅的卡片信息将在这里聚合展示。',
          statusPill: '追踪中',
          entry: {
            label: '追踪中心',
            summary: '你订阅的卡片信息将在这里聚合展示。',
            pill: '追踪'
          },
          comments: [],
          qclawPrompts: []
        }
      }
    }
    return scenarioMap[scenarioId]
  }, [scenarioId, selectedConversationId, qclawTrackedCards, trackerMessages])

  useEffect(() => {
    setPrivateSuggestionVisible(true)
    setEntryVisible(false)
    setThreadOpen(false)
    setActiveCard(cloneCard(activeScenario.card))
    setThreadComments(cloneThreadComments(activeScenario.thread.comments))
  }, [selectedConversationId, scenarioId])

  const handleResetScenario = (): void => {
    setPrivateSuggestionVisible(true)
    setEntryVisible(false)
    setThreadOpen(false)
    setActiveCard(cloneCard(activeScenario.card))
    setThreadComments(cloneThreadComments(activeScenario.thread.comments))
  }

  const handleConfirmSuggestion = (): void => {
    setPrivateSuggestionVisible(false)
    setEntryVisible(true)
    setThreadOpen(false)
    setActiveCard((current) => ({
      ...current,
      status:
        current.templateId === 'team-up-post'
          ? 'active'
          : current.templateId === 'spoiler-thread-post'
            ? 'open'
            : 'tracking'
    }))
  }

  const handleDismissSuggestion = (): void => {
    setPrivateSuggestionVisible(false)
  }

  const handleCardAction = (actionId: AgentCardAction): void => {
    setActiveCard((current) => {
      if (current.templateId === 'team-up-post' && current.progress) {
        if (actionId === 'join_team') {
          const nextCurrent = Math.min(current.progress.current + 1, current.progress.total)
          const isFull = nextCurrent >= current.progress.total
          return {
            ...current,
            progress: { ...current.progress, current: nextCurrent },
            status: isFull ? 'full' : 'active',
            statusText: isFull
              ? '5/5 人，队伍已满'
              : `${nextCurrent}/${current.progress.total} 人，还差打野`
          }
        }

        if (actionId === 'remind_team') {
          return {
            ...current,
            following: !current.following,
            statusText: current.following ? '4/5 人，缺 1 个打野' : '已为你开启开局提醒'
          }
        }

        if (actionId === 'close_team') {
          setEntryVisible(false)
          setThreadOpen(false)
          return {
            ...current,
            status: 'expired',
            statusText: '组队贴已结束'
          }
        }
      }

      if (current.templateId === 'spoiler-thread-post') {
        if (actionId === 'open_thread') {
          setThreadOpen(true)
          return {
            ...current,
            status: 'open',
            statusText: '讨论已进入贴内继续'
          }
        }

        if (actionId === 'mute_thread') {
          setThreadOpen(false)
          return {
            ...current,
            status: 'muted',
            statusText: '你已折叠剧透贴'
          }
        }

        if (actionId === 'close_thread') {
          setEntryVisible(false)
          setThreadOpen(false)
          return {
            ...current,
            status: 'closed',
            statusText: '剧透贴已结束'
          }
        }
      }

      if (current.templateId === 'standee-group-buy-post' && current.progress) {
        if (actionId === 'mark_interested') {
          const nextCurrent = Math.min(current.progress.current + 1, current.progress.total)
          const reached = nextCurrent >= current.progress.total
          return {
            ...current,
            progress: { ...current.progress, current: nextCurrent },
            status: reached ? 'threshold_reached' : 'tracking',
            statusText: reached
              ? `${nextCurrent}/${current.progress.total} 人，人数达标`
              : `${nextCurrent}/${current.progress.total} 人，继续追踪中`
          }
        }

        if (actionId === 'remind_group_buy') {
          return {
            ...current,
            following: !current.following,
            statusText: current.following ? '2/6 人，继续追踪中' : '达到阈值时会提醒你'
          }
        }

        if (actionId === 'view_tracker') {
          setThreadOpen(true)
          return {
            ...current,
            expanded: !current.expanded,
            statusText: current.expanded ? '2/6 人，继续追踪中' : '贴内展示更完整的追踪备注'
          }
        }
      }

      if (actionId === 'subscribe') {
        setQClawTrackedCards((currentCards) => {
          const newCard: QClawTrackedCard = {
            id: current.id,
            conversationId: selectedConversationId,
            scenarioId: scenarioId,
            card: { ...current, actions: current.actions.filter((a) => a.id !== 'subscribe') }, // 移除订阅按钮
            subscribedAt: new Date().toISOString()
          }
          return [...currentCards, newCard]
        })
        return { ...current, actions: current.actions.filter((a) => a.id !== 'subscribe') }
      }

      return current
    })
  }

  // 环境检测：是否在 Electron 环境中
  const isElectron = useMemo(() => !!window.api?.qclaw, [])

  const callChatApi = async (payload: any) => {
    if (isElectron) {
      return window.api.qclaw.chat(payload)
    } else {
      // Vercel Web 环境调用
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      return response.json()
    }
  }

  const handleSendMessage = (message: string): void => {
    if (selectedConversationId === 'qclaw-tracker') {
      const userMessage: Message = {
        id: `tracker-user-${Date.now()}`,
        senderId: 'user',
        sender: '我',
        avatar: '我',
        content: message,
        time: dayjs().format('HH:mm'),
        isSelf: true
      }

      const thinkingMessageId = `tracker-qclaw-${Date.now()}`
      const thinkingMessage: Message = {
        id: thinkingMessageId,
        senderId: 'qclaw',
        sender: 'QClaw',
        avatar: 'Q',
        content: '正在分析追踪数据...',
        time: dayjs().format('HH:mm'),
        isSelf: false
      }

      setTrackerMessages((current) => [...current, userMessage, thinkingMessage])

      callChatApi({
          scenarioId: 'qclaw-tracker' as any,
          message,
          history: trackerMessages.map((m) => ({
            author: m.sender,
            role: m.isSelf ? 'user' : 'qclaw',
            content: m.content
          })),
          trackedCards: qclawTrackedCards
        })
        .then((result) => {
          setTrackerMessages((current) =>
            current.map((m) =>
              m.id === thinkingMessageId
                ? { ...m, content: result.success ? result.response ?? '完成' : `错误: ${result.error}` }
                : m
            )
          )
        })
        .catch((err) => {
          setTrackerMessages((current) =>
            current.map((m) => (m.id === thinkingMessageId ? { ...m, content: `错误: ${err.message}` } : m))
          )
        })
    }
  }

  const handleSelectPinnedEntry = (): void => {
    if (!entryVisible) return
    setThreadOpen(true)
  }

  const handleRunQClawPrompt = (promptId: string): void => {
    const prompt = activeScenario.thread.qclawPrompts.find((item) => item.id === promptId)
    if (!prompt) return

    setThreadOpen(true)
    setThreadComments((current) => {
      const userComment: ThreadComment = {
        id: `${promptId}-ask`,
        author: '我',
        role: 'user',
        content: prompt.ask,
        time: '刚刚'
      }

      const thinkingComment: ThreadComment = {
        id: `${promptId}-reply`,
        author: 'QClaw',
        role: 'qclaw',
        content: 'QClaw 正在思考...',
        time: '刚刚'
      }

      return [...current, userComment, thinkingComment]
    })

    callChatApi({
        scenarioId,
        message: prompt.ask,
        history: threadComments.map((c) => ({
          author: c.author,
          role: c.role,
          content: c.content
        })),
        trackedCards: scenarioId === ('qclaw-tracker' as any) ? qclawTrackedCards : undefined
      })
      .then((result) => {
        setThreadComments((current) =>
          current.map((c) =>
            c.id === `${promptId}-reply`
              ? {
                  ...c,
                  content: result.success
                    ? (result.response ?? prompt.response)
                    : `调用失败: ${result.error}`
                }
              : c
          )
        )
      })
      .catch(() => {
        setThreadComments((current) =>
          current.map((c) =>
            c.id === `${promptId}-reply` ? { ...c, content: prompt.response } : c
          )
        )
      })
  }

  const handleSendThreadMessage = (message: string): void => {
    if (!message.trim()) return

    const isQClawMention = message.toLowerCase().includes('@qclaw')
    const userCommentId = `manual-user-${Date.now()}`
    const userComment: ThreadComment = {
      id: userCommentId,
      author: '我',
      role: 'user',
      content: message,
      time: '刚刚'
    }

    if (!isQClawMention) {
      setThreadOpen(true)
      setThreadComments((current) => [...current, userComment])
      return
    }

    setThreadOpen(true)
    const qClawCommentId = `manual-qclaw-${Date.now()}`
    const thinkingComment: ThreadComment = {
      id: qClawCommentId,
      author: 'QClaw',
      role: 'qclaw',
      content: 'QClaw 正在思考...',
      time: '刚刚'
    }

    setThreadComments((current) => [...current, userComment, thinkingComment])

    callChatApi({
        scenarioId,
        message,
        history: threadComments.map((c) => ({
          author: c.author,
          role: c.role,
          content: c.content
        })),
        trackedCards: scenarioId === ('qclaw-tracker' as any) ? qclawTrackedCards : undefined
      })
      .then((result) => {
        setThreadComments((current) =>
          current.map((c) =>
            c.id === qClawCommentId
              ? {
                  ...c,
                  content: result.success
                    ? (result.response ?? buildManualQclawReply(scenarioId, message))
                    : `调用失败: ${result.error}`
                }
              : c
          )
        )
      })
      .catch(() => {
        setThreadComments((current) =>
          current.map((c) => (c.id === qClawCommentId ? { ...c, content: buildManualQclawReply(scenarioId, message) } : c))
        )
      })
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#dfe5ef] p-3 text-slate-900">
      <div className="flex h-full min-h-0 overflow-hidden rounded-[24px] border border-white/70 bg-white/90 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl">
        <Sidebar />
        <ConversationList
          conversations={conversations}
          selectedConversationId={selectedConversationId}
          onSelectConversation={setSelectedConversationId}
          qclawSubscriptionCount={qclawTrackedCards.length}
        />
        <ChatArea
          conversation={selectedConversation}
          activeScenario={activeScenario}
          activeCard={activeCard}
          privateSuggestionVisible={privateSuggestionVisible}
          entryVisible={entryVisible}
          threadOpen={threadOpen}
          threadComments={threadComments}
          scenarioTabs={scenarioTabs}
          onConfirmSuggestion={handleConfirmSuggestion}
          onDismissSuggestion={handleDismissSuggestion}
          onCardAction={handleCardAction}
          onOpenPinnedEntry={handleSelectPinnedEntry}
          onRunQClawPrompt={handleRunQClawPrompt}
          onSendThreadMessage={handleSendThreadMessage}
          onSendMessage={handleSendMessage}
          onSelectScenario={setScenarioId}
          onResetScenario={handleResetScenario}
        />
      </div>
    </div>
  )
}

export default App
