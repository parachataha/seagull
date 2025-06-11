
interface PropsTypes {
    children?: React.ReactNode,
    className?: string
}

export default function Widget( {children, className} : PropsTypes ) {

    return ( <div className={`bg-secondary border-2 border-tertiary rounded-lg p-3 ${className}`}>

        {children}

    </div> )

}