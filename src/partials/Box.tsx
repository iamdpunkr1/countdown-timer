type BoxProps = {
    time: number;
    label: string;
}
const Box = ({time, label}:BoxProps) => {
  return (
    <div className='flex flex-col justify-center items-center z-1 p-4 my-custom-class'>
            <h1 className='text-gray-600 text-6xl font-bold'>{String(time).padStart(2,'0') }</h1>
            <p className="text-gray-600">{label}</p>
    </div>
  )
}

export default Box