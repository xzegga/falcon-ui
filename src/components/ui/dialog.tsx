
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Button } from "@/components/ui/button";
import { Radio } from "lucide-react";
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";

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
        <Modal
            size={'2xl'}
            isOpen={showModal}
            onClose={() => setShowModal(false)}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Thank you for submitting</ModalHeader>
                        <ModalBody>
                            <video controls autoPlay onEnded={handleVideoEnd}>
                                <source src="/assets/video.mp4" />
                            </video>
                            <div className="mt-4 mb-6">
                                <div className="flex w-full text-center">
                                    <Button onClick={() => router.push(`/client/record-feedback/${uuidv4()}/${selected}`)}
                                        className="mx-auto cursor-pointer" disabled={hasEnded}>
                                        <Radio className="mr-2 h-4 w-4" />
                                        {buttonText}
                                    </Button>
                                </div>
                            </div>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>


    );
}