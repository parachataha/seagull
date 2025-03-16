import { query } from "@/lib/database"

// Types
import { Organization } from "@/types/organization/organization"
type Result = {
    success: false,
    msg: string,
    status: number,
} | {
    success: true,
    msg: string,
    status: number,
    data: Organization
}

export default async function getOrganization(slug : string) : Promise<Result> {

    if (!slug) return { success: false, msg: "Invalid slug", status: 404 }
    if (slug.trim().length < 2) return { success: false, msg: "Invalid slug", status: 404 }
    if (slug.length > 99) return { success: false, msg: "Invalid slug", status: 404 }

    try {

        const cols = [slug.trim().toLowerCase()]
        const rows = await query(`
            SELECT
                o.id,
                o.owner_id,
                    u.slug AS owner_slug,
                    u.first_name AS owner_first_name,
                    u.last_name AS owner_last_name,
                o.name,
                o.slug,
                    o.logo_id,
                i.url AS logo_url,
                o.created_at,
                o.about
            FROM organizations o
            INNER JOIN images i
                ON i.id = o.logo_id
            INNER JOIN users u
                ON u.id = o.owner_id
            WHERE o.slug = $1
            LIMIT 1
        `, cols)

        if (!rows) throw "A database error occurred"
        if (rows.rowCount !== 1) return { success: false, msg: "Not found", status: 404 }

        const organization : Organization | any = rows.rows[0]

        return {
            success: true,
            msg: "Organization found",
            status: 200,
            data: organization
        }

    } catch (error) {

        return { 
            success: false, 
            msg: error ? `${`${error}`.includes("error: ") ? `${error}`.split("error: ")[1].trim() : error}` : "A server error occurred",
            status: 505
        }

    }

}