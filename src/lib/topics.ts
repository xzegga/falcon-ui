"use client";

const topicOptions = {
      isFuzzyMatch: true,
      bestMatchOnly: true
}
interface TopicValue {
  date: Date;
  topic: string
}

export const topics: Set<TopicValue> = new Set();

export const topicsKeys = [
    {
      command: ["Credit Card","Account","Item"],
      callback: (command: string) => {console.log(`Best matching topic for ${command}: Product`); topics.add({date:new Date(),topic:'Product'})},
      ...topicOptions,
    },
    {
      command: ["Company","Contractor","Provider"],
      callback: (command: string) => {console.log(`Best matching topic for ${command}: Company`); topics.add({date:new Date(),topic:'Company'})},
      ...topicOptions,
    },
    {
      command: ["Agent","Associate","Representative"],
      callback: (command: string) => {console.log(`Best matching topic for ${command}: Associate`), topics.add({date:new Date(),topic:'Associate'})},
      ...topicOptions,
    },
]