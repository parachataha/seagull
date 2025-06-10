
interface PropsTypes {
    children?: React.ReactNode,
    className?: string
}

export default function Widget( {children, className} : PropsTypes ) {

    return ( <div className={`bg-secondary border-2 border-tertiary rounded-3xl p-3 m-5 ${className}`}>

        {children}

    </div> )

}