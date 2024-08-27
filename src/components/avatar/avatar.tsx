//import './avatar.css'

export type AvatarProps = {
  firstName: string
  lastName: string
  userId: string
  className?: string
}

export default function Avatar({
  firstName = '',
  lastName = '',
  userId = '',
  className,
}: AvatarProps) {
  const first = firstName.slice(0, 1)
  const last = lastName.slice(0, 1)
  const style = className !== undefined ? className : 'user'

  return (
    <span className={style}>
      <span
        title={userId}
        className={'initial'}
      >{`${first.toUpperCase()}${last.toUpperCase()}`}</span>
    </span>
  )
}
