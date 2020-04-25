let zoom = 20;
let maxAmplitude = 35;
let magnitudeDotSize = 2
const graphPrecision = 0.05

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

function xyAxis() {
    const coordinateSystem = document.getElementById('coordinateSystem')
    coordinateSystem.innerHTML = ''

    const xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    const yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'path')

    xAxis.setAttributeNS(null, 'd', 'M100 0 V400')
    xAxis.setAttributeNS(null, 'stroke', 'black')
    xAxis.setAttributeNS(null, 'stroke-width', '0.2%')

    yAxis.setAttributeNS(null, 'd', 'M0 200 H400')
    yAxis.setAttributeNS(null, 'stroke', 'black')
    yAxis.setAttributeNS(null, 'stroke-width', '0.2%')

    coordinateSystem.appendChild(xAxis)
    coordinateSystem.appendChild(yAxis)

    for (let i = 0; i <= maxAmplitude; i++) {
        const yLine = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        const xLine = document.createElementNS('http://www.w3.org/2000/svg', 'path')

        //  y axis line
        yLine.setAttributeNS(null, 'd', `M100 ${400 - i * zoom} H97`)
        yLine.setAttributeNS(null, 'stroke', `black`)
        yLine.setAttributeNS(null, 'stroke-width', `0.1%`)

        //  x axis line
        xLine.setAttributeNS(null, 'd', `M${400 - i * zoom} 200  V203`)
        xLine.setAttributeNS(null, 'stroke', `black`)
        xLine.setAttributeNS(null, 'stroke-width', `0.1%`)

        coordinateSystem.appendChild(yLine)
        coordinateSystem.appendChild(xLine)
    }
}


function graphCurve() {
    const distanceValue = document.getElementById('distanceInput').value
    const amplitudeValue = document.getElementById('amplitudeInput').value
    const coordinateSystem = document.getElementById('coordinateSystem')

    //  Reset graph
    xyAxis()

    if (!distanceValue) return


    //  Create logarithmic curve
    const axesArray = []
    let currIndex = 0;
    for (let i = 0; i <= maxAmplitude; i += graphPrecision) {

        //  Calculates x, y of current dot
        const yAxis = magnitudeFormula(i, distanceValue)

        axesArray.push([i, yAxis])
        const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
        dot.setAttributeNS(null,'cx', i * zoom + 100)
        dot.setAttributeNS(null,'cy', 200 - yAxis * zoom)
        dot.setAttributeNS(null,'r', 0.4)
        dot.setAttributeNS(null,'fill', 'red')

        coordinateSystem.appendChild(dot)

        //  Connect 2 dots with a line
        if (currIndex !== 0 && i !== maxAmplitude) {

            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
            line.setAttributeNS(null, 'x1', axesArray[currIndex-1][0] * zoom + 100)
            line.setAttributeNS(null, 'y1', 200 - axesArray[currIndex-1][1] * zoom)
            line.setAttributeNS(null, 'x2', axesArray[currIndex][0] * zoom + 100)
            line.setAttributeNS(null, 'y2', 200 - axesArray[currIndex][1] * zoom)
            line.setAttributeNS(null, 'stroke', 'red')
            line.setAttributeNS(null, 'stroke-width', '1')

            coordinateSystem.appendChild(line)
        }
        currIndex++
    }

    //  Show result dot
    if (amplitudeValue) {
        const dotY = magnitudeFormula(amplitudeValue, distanceValue)

        const magnitudeDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle')

        magnitudeDot.setAttributeNS(null,'cx', amplitudeValue * zoom + 100)
        magnitudeDot.setAttributeNS(null,'cy', 200 - dotY * zoom)
        magnitudeDot.setAttributeNS(null,'r', magnitudeDotSize)
        magnitudeDot.setAttributeNS(null,'fill', 'blue')
        magnitudeDot.setAttribute('class', 'magnitudeDot')

        coordinateSystem.appendChild(magnitudeDot)
    }

}

function changeZoom(value) {
    zoom += value
    value > 0 ? magnitudeDotSize += 0.2 : magnitudeDotSize -= 0.2;
    xyAxis()
    graphCurve()
}

function clearGraph() {
}

function magnitudeFormula(amplitudeValue, distanceValue) {
    if (amplitudeValue === 0 || distanceValue === 0) return -4
    return Math.log10(amplitudeValue) + 1.449 * Math.log10(distanceValue) + 2.554
}

//  Functions called on page load
xyAxis()