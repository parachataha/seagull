import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import EditSkills from "./components/EditSkills";

export default function SkillsPage() {
    
    return ( <Card>

        <CardContent className="flex flex-col gap-4">

            <div>
                <h3 className="text-lg font-medium mb-0.5"> Edit skills </h3>
                <p className="text-foreground/50">  Skills are used to tell others what you do </p>
            </div>


            <Card className="bg-popover">
                <CardContent>
                    Skills can be categorized in either primary and child skills. Primary skills can be used to group child skills.
                    <div className="bg-foreground/2.5 mt-3 rounded-lg p-2 w-fit">
                        <img 
                            src="/images/assets/skills-vector.svg" 
                            alt="Help"
                            width={400} height={40}
                        />
                    </div>
                </CardContent>
            </Card>

            <EditSkills />

        </CardContent>
        
    </Card>
    );
}