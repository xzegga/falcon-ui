import { TopicValue } from "@/lib/topics";

type DisplayTopicsProps = {
    topics: Set<TopicValue> | undefined,
}


export default function Topics({ topics }: DisplayTopicsProps) {

    return (
        <div className="p-6 my-2 mb-0 mx-4 text-sm w-[450px] h-full rounded-lg bg-gray-100/80">
            <div className="flex mb-4">
                <h2 className="text-2xl text-orange-300">Topics</h2>
            </div>
            {
                topics?.size && (
                    <ul className="pl-4 list-disc">
                        {Array.from(topics).map((topic) => (
                            <li key={topic.date.toISOString()} className="font-semibold">
                                {topic.topic}
                            </li>
                        ))}
                    </ul>
                )
            }
        </div>
    );
}