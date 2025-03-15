export type Experience = {

    id?: number,
    experience_id?: number,

    user_id?: number,
    team_id?: number,
    organization_id?: number,

    title: string,
    description: string,
    public: boolean,
    type: 'gallery' | 'timeline',
    created_at: string | Date | null,

    item_id?: number,

    item_title?: string,
    item_description?: string,
    item_link?: string | null,
    item_attachments?: JSON | null,
    item_created_at?: string | Date | null,
    item_date_start?: string | Date | null,
    item_date_end?: string | Date | null;

} | undefined