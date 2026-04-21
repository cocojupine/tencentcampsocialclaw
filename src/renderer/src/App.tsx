import { useMemo, useState } from 'react'
import { ConversationList } from './components/ConversationList'
import { Sidebar } from './components/Sidebar'
import { ChatArea } from './components/chat/ChatArea'
import type { Conversation, Message } from './types/chat'

function App(): React.JSX.Element {
  const conversations = useMemo<Conversation[]>(
    () => [
      {
        id: 'industrial-camp',
        name: '工业设计大本营',
        preview: '洪歆慧老师：附件2：福州大学大学生工业设计大赛报名表',
        time: '10:26',
        unreadCount: 0,
        avatar:
          'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=120&q=80',
        muted: true
      },
      {
        id: 'otaku-group',
        name: '二次元吃土群',
        preview: '阿满：周末去静安寺谷子店吗，我已经列好补款清单了',
        time: '22:41',
        unreadCount: 4,
        avatar:
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
        active: true
      },
      {
        id: 'figure-buddies',
        name: '川川邦邦同好会',
        preview: '彩立方：新出的限定徽章已经开预订了',
        time: '22:14',
        unreadCount: 1,
        avatar:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80'
      },
      {
        id: 'music-club',
        name: '梶浦音乐共享会',
        preview: '青苔草圆：周五的 LIVE 场贩大家准备抢哪一套？',
        time: '21:45',
        unreadCount: 0,
        avatar:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80'
      },
      {
        id: 'weekend-plan',
        name: '周末去哪玩',
        preview: '不想加班：如果天气好，要不要去滨江看展顺便吃火锅',
        time: '20:18',
        unreadCount: 2,
        avatar:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
      }
    ],
    []
  )

  const mockMessages = useMemo<Message[]>(
    () => [
      {
        id: 'm1',
        sender: '阿满',
        avatar:
          'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=120&q=80',
        content: '月底要发售的那套女仆主题立牌，你们有人准备拼邮吗？',
        time: '21:37',
        isSelf: false
      },
      {
        id: 'm2',
        sender: '柚子',
        avatar:
          'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=80',
        content: '我想冲，但是预算快见底了，最近还想买演唱会的场贩毛巾。',
        time: '21:39',
        isSelf: false
      },
      {
        id: 'm3',
        sender: '我',
        avatar:
          'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=120&q=80',
        content: '如果你们都要，我可以整理一个表，看看能不能一起凑满减。',
        time: '21:40',
        isSelf: true
      },
      {
        id: 'm4',
        sender: '阿满',
        avatar:
          'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=120&q=80',
        content: '好耶，那顺便把周末去静安寺和谷子店的路线也一起规划一下。',
        time: '21:42',
        isSelf: false
      },
      {
        id: 'm5',
        sender: '柚子',
        avatar:
          'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=80',
        content: '我投看展+火锅，晚上还能继续去抓娃娃，拍照也会很好看。',
        time: '21:43',
        isSelf: false
      },
      {
        id: 'm6',
        sender: '我',
        avatar:
          'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=120&q=80',
        content: '那我晚点发个投票，顺便把想买的周边也汇总进去，别再重复下单啦。',
        time: '21:45',
        isSelf: true
      }
    ],
    []
  )

  const [selectedConversationId, setSelectedConversationId] = useState('otaku-group')

  const selectedConversation =
    conversations.find((conversation) => conversation.id === selectedConversationId) ?? conversations[0]

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#dfe5ef] p-3 text-slate-900">
      <div className="flex h-full min-h-0 overflow-hidden rounded-[24px] border border-white/70 bg-white/90 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl">
        <Sidebar />
        <ConversationList
          conversations={conversations}
          selectedConversationId={selectedConversationId}
          onSelectConversation={setSelectedConversationId}
        />
        <ChatArea conversation={selectedConversation} messages={mockMessages} />
      </div>
    </div>
  )
}

export default App
