"use client";

const topicOptions = {
      isFuzzyMatch: true,
      bestMatchOnly: true
}

export const topics: Set<string> = new Set();

export const topicsKeys = [
    {
      command: ["Credit Card","Account","Item"],
      callback: (command: string) => {console.log(`Best matching topic for ${command}: Product`); topics.add('Product')},
      ...topicOptions,
    },
    {
      command: ["Company","Contractor","Provider"],
      callback: (command: string) => {console.log(`Best matching topic for ${command}: Company`); topics.add('Company')},
      ...topicOptions,
    },
    {
      command: ["Agent","Associate","Representative"],
      callback: (command: string) => {console.log(`Best matching topic for ${command}: Associate`), topics.add('Associate')},
      ...topicOptions,
    },
]