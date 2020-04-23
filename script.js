function calculateValues() {
    const amplitude = document.getElementById('amplitudeInput')
    const distance = document.getElementById('distanceInput')
    const magnitude = document.getElementById('magnitudeInput')

    const amplitudeValue = amplitude.value
    const distanceValue = distance.value

    if (!amplitudeValue || !distanceValue) {
        magnitude.value = null
        return
    }

    magnitude.value = magnitudeFormula(amplitudeValue, distanceValue)
}

function xyAxis(n) {
    const coordinateSystem = document.getElementById('coordinateSystem')

    for (let i = 0; i <= n; i++) {
        const yLine = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        const xLine = document.createElementNS('http://www.w3.org/2000/svg', 'path')

        //  y axis line
        yLine.setAttributeNS(null, 'd', `M200 ${400 - i * 10} H195`)
        yLine.setAttributeNS(null, 'stroke', `black`)
        yLine.setAttributeNS(null, 'stroke-width', `0.2%`)

        //  x axis line
        xLine.setAttributeNS(null, 'd', `M${400 - i * 10} 200  V195`)
        xLine.setAttributeNS(null, 'stroke', `black`)
        xLine.setAttributeNS(null, 'stroke-width', `0.2%`)

        coordinateSystem.appendChild(yLine)
        coordinateSystem.appendChild(xLine)
    }
}


function graphCurve({ value }) {
    const distanceValue = value
    const coordinateSystem = document.getElementById('coordinateSystem')
    const amplitudeMax = 20;

    const axesArray = []

    for (let i = 0.1; i <= amplitudeMax; i += 0.1) {
        const yAxis = magnitudeFormula(i, distanceValue)

        axesArray.push([i, yAxis])
        const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
        dot.setAttributeNS(null,'cx', i * 10 + 200)
        dot.setAttributeNS(null,'cy', 200 - yAxis * 10)
        dot.setAttributeNS(null,'r', 1)
        dot.setAttributeNS(null,'fill', 'blue')

        coordinateSystem.appendChild(dot)
    }

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    line.setAttributeNS(null, 'd', `M200 ${200 - magnitudeFormula(0.000001, distanceValue) * 10} V${200 - axesArray[0][1] * 10}`)
    line.setAttributeNS(null, 'stroke', `blue`)
    line.setAttributeNS(null, 'stroke-width', `0.5%`)
    coordinateSystem.appendChild(line)
    console.table(axesArray);

}

function magnitudeFormula(amplitudeValue, distanceValue) {
    return Math.log10(amplitudeValue) + 1.449 * Math.log10(distanceValue) + 2.554
}


//  Functions called on page load
xyAxis(40)