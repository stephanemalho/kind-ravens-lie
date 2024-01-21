
import { getNameInitials } from '@/utilities'
import { Avatar as AntdAvatar } from 'antd'

type CustomAvatarProps = {
  name?: string
  style?: React.CSSProperties
  src?: string | null
  shape?: 'circle' | 'square'
}

const CustomAvatar = ({ name, style , ...rest}: CustomAvatarProps) => {
  return (
    <AntdAvatar
      alt={name}
      size="small"
      style={{backgroundColor: "#f56a00",
      display: "flex",
      alignItems: "center",
      border: "none",
      ...style
    }}
      {...rest}      
    >
      {getNameInitials(name || '')}
    </AntdAvatar>
  )
}

export default CustomAvatar