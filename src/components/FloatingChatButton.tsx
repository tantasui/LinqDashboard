import React from 'react';
import { FloatButton } from 'antd';
import { CommentOutlined } from '@ant-design/icons';

export const FloatingChatButton: React.FC = () => {
  return (
    <FloatButton
      icon={<CommentOutlined />}
      type="primary"
      style={{ right: 24, bottom: 24 }}
      tooltip={<div>Ask AI (Coming soon)</div>}
      onClick={() => {
        // LINQ-03 panel toggle logic goes here later
        console.log('Chat clicked');
      }}
    />
  );
};
