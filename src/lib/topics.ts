"use client";

const topicOptions = {
      isFuzzyMatch: true,
      matchInterim: true,
      fuzzyMatchingThreshold: 0.5,
}
export interface TopicValue {
  date: Date;
  topic: string
}

export const topics: Set<TopicValue> = new Set();

export const topicsKeys = [
    {
      command: ["/*credit card*/","/*account*/","/*item*/"],
      callback: (command: string) => {console.log(`Best matching topic for ${command}: Product`); topics.add({date:new Date(),topic:'Product'})},
      ...topicOptions,
    },
    {
      command: ["/*company*/","/*contractor*/","/*provider*/"],
      callback: (command: string) => {console.log(`Best matching topic for ${command}: Company`); topics.add({date:new Date(),topic:'Company'})},
      ...topicOptions,
    },
    {
      command: ["/*Agent*/","/*associate*/","/*representative*/"],
      callback: (command: string) => {console.log(`Best matching topic for ${command}: Associate`), topics.add({date:new Date(),topic:'Associate'})},
      ...topicOptions,
    },
]