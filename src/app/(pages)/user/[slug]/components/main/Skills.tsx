import { Card, CardContent } from "@/components/ui/card";
import Skill from "@/components/ui/Skill";
import sortSkills from "@/lib/skills/sortSkills";
import { PublicSafeUser } from "@/lib/types/User";

export default function Skills( { user, className } : { user: PublicSafeUser, className?: string } ) {
    
    return ( <Card className="bg-card">

        <CardContent>
            <article>
                <h3 className="text-foreground/30 font-semibold"> Skills </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                    {user.skills && user.skills?.length > 0 && <>
                        {sortSkills(user.skills).map(skill => (
                            <Skill
                                key={skill.id}
                                skill={skill}
                            />
                        ))}
                    </>}
                </div>
            </article>
        </CardContent>

    </Card>
    );
}