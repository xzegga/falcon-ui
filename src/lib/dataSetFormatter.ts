
export function dataSetFormatter(dataset: Array<any>) {
    const [first] = dataset;
    if(!first) return []
    const headers = Object.keys(first)
    const values = dataset.map((Items ) => {
        const value = []
        for (const key in Items) {
            value.push(Items[key])
        }
        return value;
    }
    );

    const dataSetEchart = [headers, ...values]

    return dataSetEchart;
}

export function dataSetTotals(dataset: Array<any>) {
    dataset.shift()
    const summary: any = {}
    for (const value of dataset){
        const [emotion]=value
        summary[emotion] ? summary[emotion]++ : summary[emotion] = 1
    }
    const pieDataSet = []
    for(const val of Object.keys(summary)){
        pieDataSet.push({value:summary[val],name: val})
    }

    return pieDataSet;
}

export function topicsFormat(topics: any){
    const topicValues: Array<any> = []
    topics.forEach((item: any)=>{
      topicValues.push(item)
    })
    const topicsDataSet: any = dataSetFormatter(topicValues)
    return {
      topicDataSet: topicsDataSet,
      topicValues: topicValues
    }
  }

  export function correlationTopicEmotion(topics: any, emotions: any){
    if(topics){
        const topicData=topicsFormat(topics).topicValues
        const correlationEmotions = topicData.map((item: any) => {
            const emotionsTopic = emotions.filter((emotion: any) => {
                return (new Date(emotion.date).getTime() - 5000) <= (new Date(item.date).getTime()) && (new Date(emotion.date).getTime() + 5000) > (new Date(item.date).getTime());
            });
            return {
             topic: item.topic,
             date: item.date,
             emotions: emotionsTopic
            }
        });
       return correlationEmotions
    }
  }