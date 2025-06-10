import Image from "next/image";

interface PropTypes {
    customization?: {
        size?: number
    },
    className?: string
}

export default function Avatar( {customization, className} : PropTypes ) {


    return (
        <Image 
            src='/images/defaults/avatar.png' 
            alt='avatar' width={customization?.size ?? 70} height={customization?.size ?? 70}
            className={`rounded-full ${className}`}
        />
    )
}