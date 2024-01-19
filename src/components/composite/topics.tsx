import { TopicValue } from "@/lib/topics";

type DisplayTopicsProps = {
    topics: Set<TopicValue> | undefined,
}


export default function Topics({ topics }: DisplayTopicsProps) {
    
    return (
        <div>
            <h2>Topics</h2>
            {topics?.size && (
                <ul>
                    {Array.from(topics).map((topic) => (
                        <li key={topic.date.toISOString()}>
                            {topic.topic}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}