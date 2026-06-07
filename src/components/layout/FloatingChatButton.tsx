import { useState } from 'react';
import { Drawer } from 'antd';
import { colors } from '@/theme';

export function FloatingChatButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: colors.primary,
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(138,79,255,0.40)',
          zIndex: 1000,
          transition: 'transform 0.15s, box-shadow 0.15s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 6px 28px rgba(138,79,255,0.55)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(138,79,255,0.40)';
        }}
      >
        <span className="material-symbols-outlined" style={{ color: 'white', fontSize: 24 }}>
          chat
        </span>
      </button>

      <Drawer
        title={
          <span style={{ fontFamily: colors.fontDisplay, color: colors.textPrimary, fontSize: 18 }}>
            LINQ Assistant
          </span>
        }
        placement="right"
        width={420}
        open={open}
        onClose={() => setOpen(false)}
        styles={{ body: { background: colors.surface }, header: { background: colors.surface, borderBottom: `1px solid ${colors.border}` }, mask: { backdropFilter: 'blur(2px)' } }}
      >
        <p style={{ color: colors.textSecondary, marginTop: 24, textAlign: 'center' }}>
          Chat functionality coming soon.
        </p>
      </Drawer>
    </>
  );
}
