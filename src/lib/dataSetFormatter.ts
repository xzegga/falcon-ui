export function dataSetFormatter(dataset: Array<any>) {
  if (dataset.length > 1) {
    const [first] = dataset;
    if (first) {
      const headers = Object.keys(first);
      const values = dataset.map((item: any) => [item.emotion, item.date]);
      return [headers, ...values];
    }
  }
}

export function dataSetTotals(dataset: Array<any>) {
  dataset.shift();
  const summary: any = {};
  for (const value of dataset) {
    const [emotion] = value;
    summary[emotion] ? summary[emotion]++ : (summary[emotion] = 1);
  }
  const pieDataSet = [];
  for (const val of Object.keys(summary)) {
    pieDataSet.push({ value: summary[val], name: val });
  }

  return pieDataSet;
}

export function topicsFormat(topics: any) {
  const topicValues: Array<any> = [];
  topics.forEach((item: any) => {
    topicValues.push(item);
  });
  const topicsDataSet: any = dataSetFormatter(topicValues);
  return {
    topicDataSet: topicsDataSet,
    topicValues: topicValues,
  };
}
