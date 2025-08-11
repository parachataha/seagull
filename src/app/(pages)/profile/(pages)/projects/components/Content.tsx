"use client"
// Hooks
import { RootState } from "@/app/redux/store";

// Components
import Timeline from "@/components/timeline/Timeline";
import { Button } from "@/components/ui/button";
import {
Modal,
ModalBody,
ModalContent,
ModalFooter,
ModalTrigger,
} from "@/components/ui/animated-modal";

// Hooks
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import NewTimelineDialog from "@/components/dialogs/user/projects/NewTimelineDialog";
import { Input, Label } from "@/components/ui/input";

export default function Content( { 
    className = ""
} : { 
    className?: string 
} ) {

    // Hooks
    const dispatch = useDispatch();
    const user = useSelector((state : RootState) => state.user);
    
    return ( <div className="mt-7"> 
        
        {user.timelines.length === 0 ?
            <Modal>
                <ModalTrigger asChild>
                    <Button className="w-full" variant="neutral"> Create Timeline </Button> 
                </ModalTrigger>
                <ModalBody>
                    <NewTimelineDialog />
                </ModalBody>
            </Modal>
        : 
            <Timeline timelines={user.timelines} isOwner/>
        }


    </div>
    );
}