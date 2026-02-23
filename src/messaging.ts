import type { ChatChannel, ChatMessage } from './types';
import { generateChannels, generateMessages } from './demoData';
import { $, showToast, formatDate } from './utils';

let channels: ChatChannel[] = [];
let activeChannelId: string | null = null;
let messageInput = '';

function render(): void {
  const container = $('#messagingContent');
  if (!container) return;

  const totalUnread = channels.reduce((s, c) => s + c.unreadCount, 0);

  container.innerHTML = `
    <div class="msg-layout">
      <div class="msg-sidebar">
        <div class="msg-sidebar-header">
          <h5>💬 Mesajlar ${totalUnread > 0 ? `<span class="msg-badge">${totalUnread}</span>` : ''}</h5>
          <button class="sp-btn sp-btn-sm sp-btn-primary" id="msgNewChat">+</button>
        </div>
        <div class="msg-channel-list">
          ${channels.map(ch => `
            <div class="msg-channel ${ch.id === activeChannelId ? 'active' : ''} ${ch.unreadCount > 0 ? 'unread' : ''}" data-id="${ch.id}">
              <div class="msg-ch-avatar ${ch.type}">${ch.avatar}</div>
              <div class="msg-ch-info">
                <div class="msg-ch-name">${ch.name}${ch.unreadCount > 0 ? `<span class="msg-unread-dot">${ch.unreadCount}</span>` : ''}</div>
                <div class="msg-ch-preview">${ch.lastMessage.substring(0, 40)}${ch.lastMessage.length > 40 ? '...' : ''}</div>
              </div>
              <div class="msg-ch-time">${formatDate(ch.lastMessageTime)}</div>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="msg-main">
        ${activeChannelId ? renderChat() : renderEmpty()}
      </div>
    </div>`;

  bindEvents(container);
}

function renderEmpty(): string {
  return `
    <div class="msg-empty">
      <div class="msg-empty-icon">💬</div>
      <h4>Mesajlaşma Merkezi</h4>
      <p>Şoförler, veliler ve ekip üyeleriyle hızlıca iletişim kurun.</p>
      <small>Sol panelden bir sohbet seçin veya yeni sohbet başlatın.</small>
    </div>`;
}

function renderChat(): string {
  const channel = channels.find(c => c.id === activeChannelId);
  if (!channel) return renderEmpty();

  const messages = generateMessages(activeChannelId!);
  const typeLabel = { direct: '🔒 Özel', group: '👥 Grup', announcement: '📢 Duyuru' }[channel.type];

  return `
    <div class="msg-chat-header">
      <button class="sp-btn sp-btn-sm sp-btn-outline msg-back-btn" id="msgBackBtn">←</button>
      <div class="msg-chat-info">
        <strong>${channel.name}</strong>
        <small>${typeLabel} · ${channel.participants.length} katılımcı</small>
      </div>
      <div class="msg-chat-actions">
        <button class="sp-btn sp-btn-sm sp-btn-outline" id="msgSearch" title="Ara">🔍</button>
        <button class="sp-btn sp-btn-sm sp-btn-outline" id="msgInfo" title="Bilgi">ℹ️</button>
      </div>
    </div>
    <div class="msg-messages" id="msgMessages">
      ${messages.map(m => `
        <div class="msg-bubble ${m.senderRole === 'admin' ? 'outgoing' : 'incoming'}">
          ${m.senderRole !== 'admin' ? `<div class="msg-bubble-avatar">${m.senderAvatar}</div>` : ''}
          <div class="msg-bubble-content">
            ${m.senderRole !== 'admin' ? `<div class="msg-sender">${m.sender}</div>` : ''}
            <div class="msg-text">${m.text}</div>
            <div class="msg-time">${formatDate(m.timestamp)} ${m.read ? '✓✓' : '✓'}</div>
          </div>
        </div>
      `).join('')}
    </div>
    <div class="msg-input-area">
      <button class="msg-attach-btn" id="msgAttach" title="Dosya Ekle">📎</button>
      <input type="text" class="msg-input" id="msgInput" placeholder="Mesajınızı yazın..." value="${messageInput}" autocomplete="off">
      <button class="msg-send-btn" id="msgSend" title="Gönder">➤</button>
    </div>`;
}

function bindEvents(container: HTMLElement): void {
  container.querySelectorAll<HTMLElement>('.msg-channel').forEach(el => {
    el.addEventListener('click', () => {
      activeChannelId = el.dataset.id!;
      const ch = channels.find(c => c.id === activeChannelId);
      if (ch) ch.unreadCount = 0;
      messageInput = '';
      render();
      const msgArea = document.getElementById('msgMessages');
      if (msgArea) msgArea.scrollTop = msgArea.scrollHeight;
    });
  });

  container.querySelector('#msgNewChat')?.addEventListener('click', () => showToast('Yeni sohbet oluşturma ekranı açılıyor...', 'info'));
  container.querySelector('#msgBackBtn')?.addEventListener('click', () => { activeChannelId = null; render(); });
  container.querySelector('#msgSearch')?.addEventListener('click', () => showToast('Mesaj arama...', 'info'));
  container.querySelector('#msgInfo')?.addEventListener('click', () => showToast('Sohbet bilgileri görüntüleniyor...', 'info'));
  container.querySelector('#msgAttach')?.addEventListener('click', () => showToast('Dosya ekleme özelliği yakında!', 'info'));

  const input = container.querySelector('#msgInput') as HTMLInputElement | null;
  const sendBtn = container.querySelector('#msgSend');

  const sendMessage = () => {
    const text = input?.value.trim();
    if (!text) return;

    const ch = channels.find(c => c.id === activeChannelId);
    if (ch) {
      ch.lastMessage = text;
      ch.lastMessageTime = new Date();
    }

    messageInput = '';
    showToast('Mesaj gönderildi.', 'success');
    render();
    const msgArea = document.getElementById('msgMessages');
    if (msgArea) msgArea.scrollTop = msgArea.scrollHeight;
  };

  sendBtn?.addEventListener('click', sendMessage);
  input?.addEventListener('keypress', e => { if (e.key === 'Enter') sendMessage(); });
  input?.addEventListener('input', () => { messageInput = input.value; });
}

export function initMessaging(): void {
  channels = generateChannels();
  render();
}
