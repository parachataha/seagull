type Props = {
    params: Promise<{ user: string, page: string }>
}

export default async function UserTab( {params} : Props ) {

    const page = (await params).page

    return (
        <p> {page} </p>
    )
}