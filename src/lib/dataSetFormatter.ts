
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