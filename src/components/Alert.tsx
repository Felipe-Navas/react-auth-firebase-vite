interface Props {
  message: string
}
export const Alert = ({ message }: Props) => {
  return <span>{message}</span>
}
