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

function graphAxes() {
    const distanceValue = document.getElementById('distanceInput').value
    const coordinateSystem = document.getElementById('coordinateSystem')
    const amplitudeMax = 20;

    const axesArray = []

    for (let i = 1; i <= amplitudeMax; i++) {
        const yAxis = magnitudeFormula(i, distanceValue)

        axesArray.push([i, yAxis])
        const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        dot.setAttributeNS(null,'cx', i * 10 + 100)
        dot.setAttributeNS(null,'cy', 100 - yAxis * 10)
        dot.setAttributeNS(null,'r', 1)
        dot.setAttributeNS(null,'fill', 'blue')

        coordinateSystem.appendChild(dot)
    }

}

function magnitudeFormula(amplitudeValue, distanceValue) {
    return Math.log10(amplitudeValue) + 1.449 * Math.log10(distanceValue) + 2.554
}