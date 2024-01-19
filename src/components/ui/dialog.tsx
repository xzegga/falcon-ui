
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Button } from "@/components/ui/button";
import { Radio } from "lucide-react";
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';

type AssistantType = {
    showModal: boolean,
    selected: number | null,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Assistant(
    { showModal, setShowModal, selected }: AssistantType
) {

    const [hasEnded, setHasEnded] = useState(true);
    const [buttonText, setButtonText] = useState('Please wait...');
    const router = useRouter();

    const handleVideoEnd = () => {
        setHasEnded(false);
        setButtonText('Begin Feedback');
    };
    return (
        <Dialog.Root open={showModal} onOpenChange={setShowModal}>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[650px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
                        <video controls width="600" autoPlay onEnded={handleVideoEnd}>
                            <source src="/assets/video.mp4" />
                        </video>
                        <div className="mt-10">
                            <div className="flex w-full text-center">
                                <Button onClick={() => router.push(`/client/record-feedback/${uuidv4()}/${selected}`)}
                                    className="mx-auto cursor-pointer" disabled={hasEnded}>
                                    <Radio className="mr-2 h-4 w-4" />
                                    {buttonText}
                                </Button>
                            </div>
                        </div>
                    </Dialog.Description>
                    <Dialog.Close asChild>
                        <button
                            className="text-violet11 hover:bg-violet4 
                                    shadow-gray absolute top-[-4px] 
                                    right-[-8px] inline-flex h-[25px] 
                                    w-[25px] appearance-none items-center 
                                    justify-center rounded-full shadow-[0_0_0_1px] 
                                    focus:outline-none bg-white"
                            aria-label="Close"
                        >
                            <Cross2Icon />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}