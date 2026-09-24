import React, { useState, useRef, useEffect } from 'react';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Cpu,
  Check,
  ArrowRight,
  Inbox
} from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';
import { useInspection } from '../../context/InspectionContext';
import { formatRelativeTime, formatExactDateTime } from '../../services/notificationService';
import { NotificationType } from '../../types/inspection';

interface NotificationDropdownProps {
  onNavigate?: (page: string) => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const { loadInspectionById } = useInspection();

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleNotificationClick = (notification: {
    id: string;
    inspectionId?: string;
    productId?: string;
  }) => {
    markAsRead(notification.id);
    if (notification.inspectionId) {
      loadInspectionById(notification.inspectionId);
      if (onNavigate) {
        onNavigate('inspection-history');
      }
    }
    setIsOpen(false);
  };

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'inspection_completed':
        return <CheckCircle2 size={16} color="var(--status-pass-text)" />;
      case 'review_required':
        return <AlertTriangle size={16} color="var(--status-warning-text)" />;
      case 'potential_violation':
      case 'error':
        return <XCircle size={16} color="var(--status-violation-text)" />;
      case 'analysis_completed':
      default:
        return <Cpu size={16} color="var(--primary)" />;
    }
  };

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        title={unreadCount > 0 ? `${unreadCount} unread notifications` : 'Notifications'}
        aria-label="Notifications"
        style={{
          width: '38px',
          height: '38px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: isOpen ? 'var(--bg-card-subtle)' : 'var(--bg-card)',
          border: `1px solid ${isOpen ? 'var(--primary)' : 'var(--border-default)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: unreadCount > 0 ? 'var(--text-primary)' : 'var(--text-secondary)',
          cursor: 'pointer',
          position: 'relative',
          transition: 'all var(--transition-fast)'
        }}
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              minWidth: '18px',
              height: '18px',
              padding: '0 4px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--primary)',
              color: 'var(--primary-text)',
              fontSize: '0.68rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid var(--bg-header)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
            }}
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '46px',
            right: 0,
            width: '390px',
            maxWidth: '90vw',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'fadeIn 150ms ease-out'
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '0.9rem 1.15rem',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: 'var(--bg-card-subtle)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                Notifications
              </span>
              {unreadCount > 0 && (
                <span
                  className="badge badge-neutral"
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 600,
                    padding: '0.15rem 0.45rem'
                  }}
                >
                  {unreadCount} unread
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  markAllAsRead();
                }}
                className="btn btn-secondary"
                style={{
                  padding: '0.25rem 0.6rem',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  color: 'var(--primary)'
                }}
              >
                <Check size={13} />
                Mark all as read
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div
            style={{
              maxHeight: '390px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {notifications.length === 0 ? (
              <div
                style={{
                  padding: '2.5rem 1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  gap: '0.6rem'
                }}
              >
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--bg-card-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-muted)'
                  }}
                >
                  <Inbox size={22} />
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                  You're all caught up.
                </div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', maxWidth: '240px' }}>
                  New inspection events and review items will appear here.
                </div>
              </div>
            ) : (
              notifications.map((n, idx) => (
                <div
                  key={n.id}
                  onClick={() => handleNotificationClick(n)}
                  style={{
                    padding: '0.85rem 1.15rem',
                    borderBottom: idx < notifications.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                    backgroundColor: n.read ? 'transparent' : 'var(--bg-card-subtle)',
                    cursor: 'pointer',
                    display: 'flex',
                    gap: '0.85rem',
                    transition: 'background-color var(--transition-fast)',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)')}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = n.read ? 'transparent' : 'var(--bg-card-subtle)')
                  }
                >
                  {/* Unread Indicator Bar */}
                  {!n.read && (
                    <div
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: '3.5px',
                        backgroundColor: 'var(--primary)'
                      }}
                    />
                  )}

                  {/* Icon */}
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px'
                    }}
                  >
                    {getNotificationIcon(n.type)}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                      <span
                        style={{
                          fontWeight: n.read ? 600 : 700,
                          fontSize: '0.83rem',
                          color: 'var(--text-primary)'
                        }}
                      >
                        {n.title}
                      </span>
                      <span
                        title={formatExactDateTime(n.createdAt)}
                        style={{
                          fontSize: '0.68rem',
                          color: 'var(--text-muted)',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {formatRelativeTime(n.createdAt)}
                      </span>
                    </div>

                    <p
                      style={{
                        fontSize: '0.76rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.4,
                        margin: 0
                      }}
                    >
                      {n.message}
                    </p>

                    {/* Metadata Footer */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: '0.25rem',
                        paddingTop: '0.25rem'
                      }}
                    >
                      {n.inspectionId ? (
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.68rem',
                            fontWeight: 600,
                            color: 'var(--primary)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                          }}
                        >
                          {n.inspectionId} <ArrowRight size={10} />
                        </span>
                      ) : (
                        <span />
                      )}

                      {!n.read && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsRead(n.id);
                          }}
                          title="Mark as read"
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--text-muted)',
                            fontSize: '0.68rem',
                            cursor: 'pointer',
                            padding: '2px 4px',
                            borderRadius: 'var(--radius-sm)'
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                        >
                          Mark read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
