interface Props {
  message: string
}
export const Alert = ({ message }: Props) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-400 px-4 py-3 rounded relative mb-2 text-center">
      <span className="sm:inline block">{message}</span>
    </div>
  )
}
