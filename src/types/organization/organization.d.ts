
export interface Organization {
    id: number,

    owner_id: number,
    owner_slug: string,
    owner_first_name: string,
    owner_last_name: string

    name: string,
    slug: string, 
    
    logo_id: number,
    logo_url: string,

    created_at: string | null | Date,
    about: string | null,
}