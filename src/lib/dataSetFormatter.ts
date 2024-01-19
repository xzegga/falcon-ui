
export function dataSetFormatter(dataset: Array<any>) {
    const [first] = dataset;
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