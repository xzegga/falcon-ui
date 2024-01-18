"use client";

const topicOptions = {
      isFuzzyMatch: true,
      bestMatchOnly: true
}

export const topics = [
    {
      command: ["Credit Card","Account","Item"],
      callback: (command: string) => console.log(`Best matching topic for ${command}: Product`),
      ...topicOptions,
    },
    {
      command: ["Company","Contractor","Provider"],
      callback: (command: string) => console.log(`Best matching topic for ${command}: Company`),
      ...topicOptions,
    },
    {
      command: ["Agent","Associate","Representative"],
      callback: (command: string) => console.log(`Best matching topic for ${command}: Associate`),
      ...topicOptions,
    },
]