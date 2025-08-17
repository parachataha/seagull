

export default function H1( { 
    children,
    className = "",
} : {
    children?: React.ReactNode,
    className?: string
} ) {
  return (
    <h2
        className={`
            ${className}
            scroll-m-20 text-2xl font-semibold tracking-tight
        `}>
        {children}
    </h2>
  )
}
