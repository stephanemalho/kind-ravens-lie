import { Button, Popover } from 'antd'
import CustomAvatar from '../custom-avatar'
import { useGetIdentity } from '@refinedev/core'

import type { User } from '@/graphql/schema.types'
import { Text } from '../Text'
import { SettingOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { AccountSettings } from './account-setting'

const CurrentUser = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { data: user } = useGetIdentity<User>();

  const content = (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Text
        strong
        style={{
          padding: '12px 20px',
        }}
      >
        {user?.name}
      </Text>
      <div style={{
        borderTop: '1px solid #D9D9D9',
        padding: '4px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
      }}>
        <Button
          icon={<SettingOutlined />}
          type="text"
          style={{
            textAlign: 'left',
          }}
          onClick={() => setIsOpen(true)}
        >
          Account Settings
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <Popover
        placement="bottomRight"
        content={content}
        trigger="click"
        overlayInnerStyle={{ padding: 0 }}
        overlayStyle={{ zIndex: 999 }}
      >
        <CustomAvatar name={user?.name} src={user?.avatarUrl} style={{ cursor: 'pointer' }} />
      </Popover>
      {user && <AccountSettings
        userId={user.id}
        opened={isOpen}
        setOpened={setIsOpen}
      />}
    </>
  )
}

export default CurrentUser