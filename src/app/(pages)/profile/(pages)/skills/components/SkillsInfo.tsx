import { CardSpotlight } from "@/components/ui/card-spotlight"

export default function SkillsInfo( {advancedMode} : {advancedMode: boolean} ) {


    return (             
        <CardSpotlight className="p-8">

                <h3 className="font-semibold"> Update your skills </h3>
                <p className="text-foreground/60 mt-1">  
                    {advancedMode ? 
                        "Skills let people know what you do. Skills can be categories by parent skills and child skills. Child skills are grouped under their parent and share the share the same colors."
                        : 
                        "Skills are used to let people know what skills you have" 
                    }
                </p>
                {advancedMode && <div className="bg-foreground/2.5 mt-3 rounded-lg p-2 w-fit">
                    <img 
                        src="/images/assets/skills-vector.svg" 
                        alt="Help"
                        width={400} height={40}
                    />
                </div>}
            
        </CardSpotlight>
    );
}