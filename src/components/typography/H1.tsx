

export default function H1( { 
    children,
    className = "",
} : {
    children?: React.ReactNode,
    className?: string
} ) {
  return (
    <h1 
        className={`
            ${className}
            scroll-m-20 text-3xl font-extrabold tracking-tight
        `}>
        {children}
    </h1>
  )
}
