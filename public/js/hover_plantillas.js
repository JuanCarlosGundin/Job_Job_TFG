    /* Store the element in el */
    let el = document.getElementsByClassName('tilt')

    /* Get the height and width of the element */
    for (let i = 0; i < el.length; i++) {
        console.log(el[i])
            /* Define function a */
        function handleMove(e) {
            /*
             * Get position of mouse cursor
             * With respect to the element
             * On mouseover
             */
            /* Store the x position */
            const xVal = e.layerX
                /* Store the y position */
            const yVal = e.layerY

            /*
             * Calculate rotation valuee along the Y-axis
             * Here the multiplier 20 is to
             * Control the rotation
             * You can change the value and see the results
             */
            const yRotation = 15 * ((xVal - width / 2) / width)

            /* Calculate the rotation along the X-axis */
            const xRotation = -15 * ((yVal - height / 2) / height)

            /* Generate string for CSS transform property */
            const string = 'perspective(500px) scale(1.05) rotateX(' + xRotation + 'deg) rotateY(' + yRotation + 'deg)'

            /* Apply the calculated transformation */
            el[i].style.transform = string
        }
        const height = el[i].clientHeight
        const width = el[i].clientWidth

        /*
         * Add a listener for mousemove event
         * Which will trigger function 'handleMove'
         * On mousemove
         */
        el[i].addEventListener('mousemove', handleMove)
            /* Add listener for mouseout event, remove the rotation */

        el[i].addEventListener('mouseout', function() {
            el[i].style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)'
        })

        /* Add listener for mousedown event, to simulate click */
        el[i].addEventListener('mousedown', function() {
            el[i].style.transform = 'perspective(500px) scale(0.9) rotateX(0) rotateY(0)'
        })

        /* Add listener for mouseup, simulate release of mouse click */
        el[i].addEventListener('mouseup', function() {
            el[i].style.transform = 'perspective(500px) scale(1.1) rotateX(0) rotateY(0)'
        })

    }